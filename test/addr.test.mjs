// Адрес сервера: итог проверки доступности, перевод входящего адреса в конфиге и в настройках установки, запасной вход в сайте nginx
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { verdict } from '../server/watch.mjs';
import { listenOf, moveListen } from '../server/manage.mjs';
import { Xray } from '../server/xray.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const posix = (p) => p.replace(/\\/g, '/').replace(/^([A-Za-z]):/, (_, d) => '/' + d.toLowerCase());
const pt = (ok, healthy = true) => ({ ok, healthy, answered: true });

test('доступность: не открыла хотя бы одна исправная точка в России — адрес режут', () => {
  // 26.11.2026: Москва открывала, Петербург нет, третья точка без связи — раньше это считалось «открывается»
  assert.equal(verdict([pt(true), pt(false, false), pt(false)], [pt(true), pt(true)]), 'blocked');
  assert.equal(verdict([pt(true), pt(true)], [pt(true)]), 'ok');
  assert.equal(verdict([pt(false), pt(false)], [pt(true)]), 'blocked');
});
test('доступность: сломанная точка check-host блокировкой не считается', () => {
  assert.equal(verdict([pt(true), pt(false, false)], [pt(true)]), 'ok');
  assert.equal(verdict([pt(false, false)], [pt(true)]), 'unknown');
});
test('доступность: не открывается и из-за границы — сервер лежит, а не заблокирован', () => {
  assert.equal(verdict([pt(false)], [pt(false), pt(false)]), 'down');
});

const cfg = () => ({ inbounds: [
  { tag: 'vsRAWtlsVISION', listen: '203.0.113.8', port: 443, protocol: 'vless', streamSettings: { network: 'raw', security: 'tls' } },
  { tag: 'Hysteria2', listen: '203.0.113.8', port: 443, protocol: 'hysteria' },
  { tag: 'vsXHTTPtls', listen: '127.0.0.1', port: 3333, protocol: 'vless', streamSettings: { network: 'xhttp' } },
  { tag: 'socks5', listen: '0.0.0.0', port: 1080, protocol: 'mixed' }] });
const x = new Xray({});

test('входящий адрес: берётся из входа Vision, общий 0.0.0.0 адресом не считается', () => {
  assert.equal(listenOf(cfg(), x), '203.0.113.8');
  const all = cfg(); all.inbounds[0].listen = '0.0.0.0';
  assert.equal(listenOf(all, x), '');
});
test('входящий адрес: переезжают Vision и Hysteria2, XHTTP и SOCKS остаются где были', () => {
  const src = cfg(), out = moveListen(src, '203.0.113.8', '203.0.113.9');
  assert.deepEqual(out.inbounds.map((i) => i.listen), ['203.0.113.9', '203.0.113.9', '127.0.0.1', '0.0.0.0']);
  assert.equal(src.inbounds[0].listen, '203.0.113.8');   // исходный конфиг не тронут
});

test('помощник: новый адрес записывается в настройки установки вместе с подписью', () => {
  const dir = mkdtempSync(join(tmpdir(), 'mp-addr-')), f = join(dir, 'monolit.env');
  writeFileSync(f, 'MP_DOMAIN=vpn.example.ru\nMP_MODE=ip2\nMP_IP2=203.0.113.8\nMP_APPLY_SIG="ip2|vpn.example.ru|203.0.113.8|/etc/c.pem|7380|3333|abc||"\nMP_ALT=\n');
  const r = spawnSync('bash', [posix(join(ROOT, 'agent', 'agent.sh'))], { input: 'ipmove env 203.0.113.9\n', encoding: 'utf8', env: { ...process.env, MP_ENVF: posix(f) } });
  assert.match(r.stdout, /__EXIT 0/, r.stdout + r.stderr);
  assert.match(r.stdout, /^ip2\|vpn\.example\.ru\|203\.0\.113\.9\|\/etc\/c\.pem\|7380\|3333\|abc\|\|$/m);
  const t = readFileSync(f, 'utf8');
  assert.match(t, /^MP_IP2=203\.0\.113\.9$/m);
  assert.match(t, /^MP_APPLY_SIG="ip2\|vpn\.example\.ru\|203\.0\.113\.9\|/m);
  assert.match(t, /^MP_DOMAIN=vpn\.example\.ru$/m);
  assert.match(readFileSync(f + '.before-ipmove', 'utf8'), /^MP_IP2=203\.0\.113\.8$/m);
});
test('помощник: мусор вместо адреса не принимается', () => {
  for (const line of ['ipmove env 1.2.3.4;id', 'ipmove fwd 1.2.3.4 1.2.3.4', 'ipmove check abc', 'entry set a;b.ru']) {
    const r = spawnSync('bash', [posix(join(ROOT, 'agent', 'agent.sh'))], { input: line + '\n', encoding: 'utf8', env: { ...process.env, MP_ENVF: '/nonexistent' } });
    assert.doesNotMatch(r.stdout, /__EXIT 0/, line);
  }
});

const SITE = `server {
    listen 203.0.113.7:443 ssl;
    server_name shop.example.ru;
    ssl_certificate /etc/ssl/shop.pem;
    ssl_certificate_key /etc/ssl/shop.key;
    location / { return 200 ok; }
}
server {
    listen 203.0.113.7:443 ssl;
    server_name blog.example.ru;
    location / { return 200 ok; }
}
`;
function nginxDir() {
  const dir = mkdtempSync(join(tmpdir(), 'mp-ngx-'));
  mkdirSync(join(dir, 'conf.d'));
  writeFileSync(join(dir, 'conf.d', 'sites.conf'), SITE);
  writeFileSync(join(dir, 'monolit.conf'), 'location ^~ /adm/ { proxy_pass http://127.0.0.1:7380; }\n');
  return dir;
}
const init = (dir, ...a) => spawnSync(process.execPath, [join(ROOT, 'server', 'init.mjs'), ...a], { encoding: 'utf8', env: { ...process.env, MP_NGINX_DIR: dir, MP_NGINX_FILES: '' } });
const inc = (dir) => `include ${dir}/monolit.conf;`;

test('запасной вход: локации monolit включаются в сайт на основном адресе и убираются', () => {
  const dir = nginxDir().replace(/\\/g, '/'), f = join(dir, 'conf.d', 'sites.conf');
  assert.equal(init(dir, 'entry', '--domain', 'shop.example.ru').status, 0);
  let t = readFileSync(f, 'utf8');
  assert.equal(t.split(inc(dir)).length - 1, 1);
  assert.ok(t.indexOf(inc(dir)) < t.indexOf('server_name shop.example.ru'));   // в блоке первого сайта
  // сменили сайт: в прежнем include убран
  assert.equal(init(dir, 'entry', '--domain', 'blog.example.ru').status, 0);
  t = readFileSync(f, 'utf8');
  assert.equal(t.split(inc(dir)).length - 1, 1);
  assert.ok(t.indexOf(inc(dir)) > t.indexOf('server_name shop.example.ru'));
  assert.equal(init(dir, 'entry', '--domain', '').status, 0);
  assert.equal(readFileSync(f, 'utf8'), SITE);
});
test('запасной вход: сайта с таким именем нет — код 4, файлы не тронуты', () => {
  const dir = nginxDir().replace(/\\/g, '/');
  assert.equal(init(dir, 'entry', '--domain', 'nope.example.ru').status, 4);
  assert.equal(readFileSync(join(dir, 'conf.d', 'sites.conf'), 'utf8'), SITE);
});

// 26.11.2026: адрес вернули окном «Изменить адрес», а пересылка «старый → новый» осталась и уводила все подключения
// на адрес, где Xray уже не слушал
test('пересылка со старого адреса снимается, когда Xray слушает не там, куда она ведёт', async () => {
  const { staleFwd } = await import('../server/manage.mjs');
  assert.equal(staleFwd('203.0.113.8>203.0.113.9', '203.0.113.9'), '');                 // всё на месте
  assert.match(staleFwd('203.0.113.8>203.0.113.9', '203.0.113.8'), /снова слушает/);    // вернулись на старый адрес
  assert.match(staleFwd('203.0.113.8>203.0.113.9', '203.0.113.7'), /слушает на 203\.0\.113\.7/);   // ушли на третий
  assert.equal(staleFwd('', '203.0.113.9'), '');
  assert.equal(staleFwd('203.0.113.8>203.0.113.9', ''), '');                            // адрес неизвестен — не трогаем
});

test('API Xray включается вместе с RoutingService: правила выходов меняются без перезапуска', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'mp-api-')), f = join(dir, 'config.json');
  writeFileSync(f, JSON.stringify({ api: { tag: 'monolit-api', listen: '127.0.0.1:10085', services: ['HandlerService', 'StatsService'] }, stats: {}, policy: { levels: { 0: { statsUserUplink: true, statsUserDownlink: true, statsUserOnline: true } } }, inbounds: [] }));
  const x = new Xray({ config: f });
  assert.equal(x.ensureApi('127.0.0.1:10085'), true);    // старая установка: сервис дописывается
  assert.deepEqual(JSON.parse(readFileSync(f, 'utf8')).api, { tag: 'monolit-api', listen: '127.0.0.1:10085', services: ['HandlerService', 'StatsService', 'RoutingService'] });
  assert.equal(x.ensureApi('127.0.0.1:10085'), false);   // второй раз менять нечего
});

test('настройки сети правятся сами: рабочий адрес дописывается сразу, пропавший убирается через 5 минут', async () => {
  const { netsaveDue } = await import('../server/manage.mjs');
  const st = (o) => ({ tool: 'ifupdown', missing: [], stale: [], manual: '', ...o });
  assert.equal(netsaveDue(st({}), 0, 1000), 'none');
  assert.equal(netsaveDue(st({ missing: ['203.0.113.9'] }), 0, 1000), 'fix');
  assert.equal(netsaveDue(st({ missing: ['203.0.113.9'], stale: ['203.0.113.8'] }), 0, 1000), 'fix');
  // 26.11.2026: хостер забрал адрес — в настройках он остался. Убираем, только если его нет и через 5 минут
  assert.equal(netsaveDue(st({ stale: ['31.59.153.210'] }), 0, 1000), 'mark');
  assert.equal(netsaveDue(st({ stale: ['31.59.153.210'] }), 1000, 1200), 'wait');
  assert.equal(netsaveDue(st({ stale: ['31.59.153.210'] }), 1000, 1300), 'fix');
  // сами не можем: сеть настроена незнакомым способом или нужна ручная правка
  assert.equal(netsaveDue(st({ tool: 'none', missing: ['203.0.113.9'] }), 0, 1000), 'none');
  assert.equal(netsaveDue(st({ manual: 'поправьте сами', stale: ['203.0.113.8'] }), 0, 1000), 'none');
  assert.equal(netsaveDue(null, 0, 1000), 'none');
});
