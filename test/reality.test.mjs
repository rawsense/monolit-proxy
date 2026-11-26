// Reality на основном сервере: сайт nginx с TLS, переключение входа в конфиге Xray и обратно, подписки, ссылки и мосты нод
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:net';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { realityGroups, realitySite, SOCK_TLS, scan } from '../server/nginx.mjs';
import { Xray, OLD_TAG, OLD_SOCK } from '../server/xray.mjs';
import { openDb, setSetting, getSetting } from '../server/db.mjs';
import { createExits } from '../server/exits.mjs';
import { createNodes } from '../server/nodes.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

test('сайт Reality: запасной домен со своим сертификатом получает свой блок, без сертификата не попадает', () => {
  const g = realityGroups('vpn.example.ru', '/c/main.pem', '/c/main.key', 'old.example.ru:/c/old.pem:/c/old.key,same.example.ru:/c/main.pem:/c/main.key,bare.example.ru::');
  assert.deepEqual(g, [{ names: ['vpn.example.ru', 'same.example.ru'], cert: '/c/main.pem', key: '/c/main.key' }, { names: ['old.example.ru'], cert: '/c/old.pem', key: '/c/old.key' }]);
  const t = realitySite(g, { port: 7380 });
  assert.equal(t.split('server {').length - 1, 2);
  assert.equal(t.split('default_server').length - 1, 1);
  assert.match(t, new RegExp(`listen unix:${SOCK_TLS} ssl http2 proxy_protocol default_server;`));
  assert.match(t, /real_ip_header proxy_protocol;/);            // адрес посетителя Xray передаёт строкой PROXY
  assert.match(t, /include \/etc\/nginx\/monolit\.conf;/);        // админка, подписки и XHTTP — те же локации
  assert.deepEqual(realityGroups('vpn.example.ru', '', ''), []);
});

test('сайт Reality пишется установкой и не считается сайтом пользователя', () => {
  const dir = mkdtempSync(join(tmpdir(), 'mp-rl-')).replace(/\\/g, '/');
  mkdirSync(join(dir, 'conf.d'));
  const run = (...a) => spawnSync(process.execPath, [join(ROOT, 'server', 'init.mjs'), ...a], { encoding: 'utf8', env: { ...process.env, MP_NGINX_DIR: dir, MP_NGINX_FILES: '' } });
  const r = run('tlssite', '--domain', 'vpn.example.ru', '--port', '7380', '--cert', '/c/main.pem', '--key', '/c/main.key', '--alt', '');
  assert.equal(r.status, 0, r.stderr);
  assert.deepEqual(JSON.parse(r.stdout).names, ['vpn.example.ru']);
  assert.match(readFileSync(join(dir, 'conf.d', 'monolit-reality.conf'), 'utf8'), /server_name vpn\.example\.ru;/);
  assert.deepEqual(scan(dir), []);
  assert.equal(run('tlssite', '--domain', 'vpn.example.ru', '--port', '7380', '--cert', '', '--key', '').status, 3);   // без сертификата Reality не включить
});

test('основной вход Reality узнаётся по своему тегу, чужой вход Reality своим не считается', () => {
  const x = new Xray({});
  const ib = (tag, security) => ({ tag, listen: '0.0.0.0', port: 443, protocol: 'vless', streamSettings: { network: 'raw', security } });
  assert.deepEqual(x.detect({ inbounds: [ib('vsRAWtlsVISION', 'reality')] }).vision, { tag: 'vsRAWtlsVISION', port: 443, listen: '0.0.0.0', reality: true });
  assert.equal(x.detect({ inbounds: [ib('vsRAWtlsVISION', 'tls')] }).vision.reality, false);
  assert.equal(x.detect({ inbounds: [ib('reality-in', 'reality')] }).vision, null);
});

// ---------- переключение: менеджер с поддельным помощником ----------
const PIPE = process.platform === 'win32' ? `\\\\.\\pipe\\mp-test-agent-${process.pid}` : join(mkdtempSync(join(tmpdir(), 'mp-ag-')), 'agent.sock');
const asked = [];
let agentSrv, fail = '';
before(async () => {
  agentSrv = createServer((c) => { c.setEncoding('utf8'); c.on('data', (line) => { const cmd = line.trim(); asked.push(cmd); const bad = fail && cmd.startsWith(fail); c.end(`${bad ? 'сломано' : cmd === 'xray-restart' ? 'active' : 'ok'}\n__EXIT ${bad ? 1 : 0}\n`) }) });
  await new Promise((r) => agentSrv.listen(PIPE, r));
});
after(() => agentSrv.close());

const TLS_IN = () => ({ tag: 'vsRAWtlsVISION', listen: '0.0.0.0', port: 443, protocol: 'vless',
  settings: { clients: [], decryption: 'none', fallbacks: [{ alpn: 'h2', dest: '/dev/shm/monolit-h2.sock', xver: 1 }, { dest: '/dev/shm/monolit-h1.sock', xver: 1 }] },
  streamSettings: { network: 'raw', security: 'tls', tlsSettings: { minVersion: '1.2', alpn: ['h2', 'http/1.1'], certificates: [{ certificateFile: '/c/main.pem', keyFile: '/c/main.key' }] } },
  sniffing: { enabled: true, destOverride: ['http', 'tls', 'quic'] } });

async function manager(mode, listen = '0.0.0.0') {
  const dir = mkdtempSync(join(tmpdir(), 'mp-mg-')), cfgFile = join(dir, 'config.json');
  writeFileSync(cfgFile, JSON.stringify({ inbounds: [{ ...TLS_IN(), listen }, { tag: 'Hysteria2', listen, port: 443, protocol: 'hysteria', settings: { version: 2, clients: [] }, streamSettings: { network: 'hysteria' } }],
    outbounds: [{ tag: 'direct', protocol: 'freedom' }, { tag: 'block', protocol: 'blackhole' }], routing: { rules: [] } }, null, 2));
  process.env.MP_AGENT_SOCK = PIPE; process.env.MP_MODE = mode; process.env.MP_ALT = '';
  const { createManager } = await import('../server/manage.mjs?' + mode);   // путь к помощнику читается при загрузке модуля
  const db = openDb(join(dir, 'm.db')); setSetting(db, 'domain', 'vpn.example.ru');
  const xray = new Xray({ config: cfgFile });
  let syncing = Promise.resolve();
  const queue = (fn) => { const p = syncing.then(fn); syncing = p.catch(() => {}); return p };
  const mgr = createManager({ db, xray, queue, log: () => {}, activeUsers: () => [{ id: 1, uuid: '11111111-1111-4111-8111-111111111111', hy2: 'h' }] });
  const wait = async (r) => { if (r.pending) for (let i = 0; i < 100 && mgr.server.job().running; i++) await new Promise((x) => setTimeout(x, 50)); return r };
  return { mgr, db, xray, wait, cfgFile, createManager, queue, read: () => JSON.parse(readFileSync(cfgFile, 'utf8')) };
}

test('переключатель: Vision → Reality → Vision, вход возвращается таким же, люди на месте', async () => {
  const m = await manager('bare'), was = m.read().inbounds[0];
  asked.length = 0;
  let r = await m.wait(await m.mgr.proto.set({ reality: true }));
  assert.equal(r.ok, true, r.error);
  assert.deepEqual(asked.filter((c) => !c.startsWith('journal')), ['tlssite', 'xray-test config.monolit-candidate.json', 'xray-restart']);   // сначала сайт nginx, потом Xray
  const keys = JSON.parse(getSetting(m.db, 'reality_keys'));
  let vi = m.read().inbounds[0];
  // мягкий переход: неделю Reality отдаёт «не своих» прежнему Vision на внутреннем сокете — старые ключи работают
  assert.deepEqual(vi.streamSettings, { network: 'raw', security: 'reality', realitySettings: { dest: OLD_SOCK, xver: 1, serverNames: ['vpn.example.ru'], privateKey: keys.priv, shortIds: [keys.sid] } });
  assert.equal(vi.settings.fallbacks, undefined);
  let old = m.read().inbounds.find((i) => i.tag === OLD_TAG);
  assert.equal(old.listen, OLD_SOCK + ',0666');
  assert.deepEqual(old.streamSettings, { ...was.streamSettings, rawSettings: { acceptProxyProtocol: true } });   // тот же сертификат, адрес посетителя — строкой PROXY
  assert.deepEqual(old.settings.fallbacks, was.settings.fallbacks);                                               // сайт и XHTTP идут в nginx как раньше
  assert.deepEqual(old.settings.clients.map((c) => c.email), ['mp-1']);                                           // старый ключ человека принят
  assert.ok(m.mgr.stateForAdmin().proto.reality_soft > Date.now() / 1000 + 6 * 86400);
  assert.equal(m.xray.detect().vision.tag, 'vsRAWtlsVISION');   // переходный вход основным не считается
  assert.equal(m.xray.detect().visionOld, true);
  // не все обновили подписку — переход продолжается; все обновили — заканчивается сам
  await m.mgr.soft.tick(false);
  assert.equal(m.read().inbounds.some((i) => i.tag === OLD_TAG), true);
  await m.mgr.soft.tick(true);
  for (let i = 0; i < 100 && m.mgr.server.job().running; i++) await new Promise((x) => setTimeout(x, 50));
  vi = m.read().inbounds[0];
  assert.equal(vi.streamSettings.realitySettings.dest, SOCK_TLS);   // посторонним снова отвечает nginx
  assert.equal(m.read().inbounds.some((i) => i.tag === OLD_TAG), false);
  assert.equal(m.mgr.stateForAdmin().proto.reality_soft, 0);
  assert.equal(m.xray.detect().visionOld, false);
  assert.deepEqual(vi.settings.clients.map((c) => [c.email, c.flow]), [['mp-1', 'xtls-rprx-vision']]);
  assert.equal(vi.tag, 'vsRAWtlsVISION');
  assert.deepEqual(m.mgr.reality(), { pub: keys.pub, sid: keys.sid });
  assert.equal(m.mgr.stateForAdmin().proto.reality, true);
  assert.equal(m.read().inbounds[1].tag, 'Hysteria2');   // Hysteria2 не тронут
  // повторное включение ключи не меняет: подписки людей остаются рабочими
  r = await m.wait(await m.mgr.proto.set({ hy2: false }));
  assert.equal(JSON.parse(getSetting(m.db, 'reality_keys')).pub, keys.pub);
  assert.equal(m.read().inbounds[0].streamSettings.security, 'reality');
  r = await m.wait(await m.mgr.proto.set({ reality: false }));
  assert.equal(r.ok, true, r.error);
  vi = m.read().inbounds[0];
  assert.deepEqual(vi.streamSettings, was.streamSettings);
  assert.deepEqual(vi.settings.fallbacks, was.settings.fallbacks);
  assert.equal(m.mgr.reality(), null);
});

test('переключатель: nginx не принял сайт — Xray не трогаем', async () => {
  const m = await manager('ip2'), before = JSON.stringify(m.read());
  fail = 'tlssite'; asked.length = 0;
  const r = await m.mgr.proto.set({ reality: true });
  fail = '';
  assert.equal(r.ok, false);
  assert.deepEqual(asked, ['tlssite']);
  assert.equal(JSON.stringify(m.read()), before);
  assert.equal(m.mgr.stateForAdmin().proto.reality, false);
});

test('переключатель: Xray не запустился с Reality — конфиг и состояние возвращаются', async () => {
  const m = await manager('bare'), before = JSON.stringify(m.read());
  fail = 'xray-restart';
  const r = await m.wait(await m.mgr.proto.set({ reality: true }));
  fail = '';
  assert.equal(r.pending, true);
  assert.equal(m.mgr.server.job().ok, false);
  assert.equal(JSON.stringify(m.read()), before);
  assert.equal(m.mgr.stateForAdmin().proto.reality, false);
});

test('переключатель: рядом с сайтами Reality не включается', async () => {
  const m = await manager('front');
  asked.length = 0;
  const r = await m.mgr.proto.set({ reality: true });
  assert.equal(r.ok, false);
  assert.match(r.error, /443 только monolit/);
  assert.deepEqual(asked, []);
  assert.equal(m.mgr.stateForAdmin().proto.reality_can, false);
});

// ---------- подписки, ссылки, мосты ----------
function nodesWith(db, reality) {
  const vision = { tag: 'vsRAWtlsVISION', port: 443, listen: '0.0.0.0', reality: !!reality };
  const xray = { detect: () => ({ vision }), addClient: async () => {}, removeClient: async () => {} };
  const exits = createExits({ db, log: () => {} });
  const users = () => db.prepare('SELECT * FROM users ORDER BY id').all();
  const srv = { name: 'main', domain: 'vpn.example.ru', fp: 'firefox', xhttpPath: '', ports: { vision: 443, hy2: 443, xhttp: 443 }, reality };
  const nodes = createNodes({ db, xray, log: () => {}, dayOf: () => '2026-11-26', users, exits, server: () => srv, awg: { ready: () => false } });
  exits.migrate?.();
  return { nodes, srv, users };
}
const TPL = { version: '1', tpl: '{"remarks":"${REMARK}","outbounds":[$PROXY_OUTBOUND]}', outbounds: {
  vision: '{"tag":"proxy","protocol":"vless","settings":{"vnext":[{"address":"$DOMAIN","port":443,"users":[{"id":"$xray_uuid_vrv","flow":"xtls-rprx-vision","encryption":"none"}]}]},"streamSettings":{"network":"raw","security":"tls","tlsSettings":{"serverName":"$DOMAIN","fingerprint":"$fpBro"}}}',
  hy2: '{"tag":"proxy","protocol":"hysteria","settings":{"version":2,"address":"$DOMAIN","port":443},"streamSettings":{"network":"hysteria","security":"tls","tlsSettings":{"serverName":"$DOMAIN"},"hysteriaSettings":{"version":2,"auth":"$xray_shortIds_vrv"}}}' } };

test('подписка и ссылка: подключение Vision основного сервера при Reality отдаётся как Reality с тем же ключом человека', () => {
  const db = openDb(join(mkdtempSync(join(tmpdir(), 'mp-nd-')), 'm.db'));
  db.prepare("INSERT INTO users (name, token, uuid, hy2, created_at) VALUES ('a', 'tok0000000000000', '11111111-1111-4111-8111-111111111111', 'h', 1)").run();
  const K = { pub: 'PUBKEY', sid: 'abcd1234' };
  const tls = nodesWith(db, null), u = tls.users()[0];
  const before = tls.nodes.render(TPL, u, tls.srv)[0].outbounds[0];
  assert.equal(before.streamSettings.security, 'tls');
  assert.match(tls.nodes.links(u, tls.srv)[0], /security=tls/);

  const rl = nodesWith(db, K);
  const ob = rl.nodes.render(TPL, u, rl.srv)[0].outbounds[0];
  assert.deepEqual(ob.streamSettings, { network: 'raw', security: 'reality', realitySettings: { serverName: 'vpn.example.ru', fingerprint: 'firefox', publicKey: 'PUBKEY', shortId: 'abcd1234' } });
  assert.deepEqual(ob.settings.vnext[0], before.settings.vnext[0]);   // адрес, порт и ключ человека те же
  const [link] = rl.nodes.linkList(u, rl.srv);
  assert.equal(link.proto, 'Reality');
  assert.equal(link.url.split('#')[0], 'vless://11111111-1111-4111-8111-111111111111@vpn.example.ru:443?encryption=none&security=reality&type=tcp&flow=xtls-rprx-vision&sni=vpn.example.ru&fp=firefox&pbk=PUBKEY&sid=abcd1234');
  assert.equal(rl.nodes.state().main.reality, true);
  assert.equal(tls.nodes.state().main.reality, false);
});

test('мост ноды на основной сервер при Reality ходит по Reality', () => {
  const db = openDb(join(mkdtempSync(join(tmpdir(), 'mp-nb-')), 'm.db'));
  db.prepare("INSERT INTO users (name, token, uuid, hy2, created_at) VALUES ('a', 'tok0000000000000', '11111111-1111-4111-8111-111111111111', 'h', 1)").run();
  const K = { pub: 'PUBKEY', sid: 'abcd1234' };
  const mk = (reality) => {
    const n = nodesWith(db, reality);
    if (!db.prepare('SELECT 1 FROM nodes').get()) {
      db.prepare("INSERT INTO nodes (name, addr, key_hash, priv, pub, sid, link_uuid, created_at) VALUES ('msk', '203.0.113.50', 'k', 'p', 'NPUB', 'nsid', '22222222-2222-4222-8222-222222222222', 1)").run();
      const kit = db.prepare('SELECT id FROM kits LIMIT 1').get().id;
      db.prepare("INSERT INTO kit_lines (kit_id, pos, name, out, via, proto) VALUES (?, 9, 'через мост', 0, 1, 'reality')").run(kit);
    }
    return n.nodes.nodeConfig(db.prepare('SELECT * FROM nodes WHERE id = 1').get()).outbounds.find((o) => o.tag === 'to-0');
  };
  const viaTls = mk(null), viaReality = mk(K);
  assert.equal(viaTls.streamSettings.security, 'tls');
  assert.deepEqual(viaReality.streamSettings, { network: 'raw', security: 'reality', realitySettings: { serverName: 'vpn.example.ru', fingerprint: 'firefox', publicKey: 'PUBKEY', shortId: 'abcd1234' } });
  assert.deepEqual(viaReality.settings, viaTls.settings);
});

// ---------- то, что 26.11.2026 уронило VPN или могло уронить ----------
test('применение конфига: ошибка посреди дела отвечает ошибкой, а не вешает запрос и очередь', async () => {
  const m = await manager('bare');
  rmSync(m.cfgFile);   // конфиг пропал: раньше обещание не выполнялось никогда, и всё, что стояло в очереди следом, ждало вечно
  const r = await Promise.race([m.mgr.proto.set({ hy2: false }), new Promise((ok) => setTimeout(() => ok('висит'), 3000))]);
  assert.notEqual(r, 'висит');
  assert.equal(r.ok, false);
  assert.match(r.error, /Не получилось применить/);
  assert.equal(m.mgr.stateForAdmin().proto.hy2, true);   // состояние вернулось
  // очередь свободна: следующее действие проходит
  assert.equal(await Promise.race([m.queue(async () => 'свободна'), new Promise((ok) => setTimeout(() => ok('занята'), 2000))]), 'свободна');
});

test('откат в «Истории» возвращает настройки, но не прежний входящий адрес', async () => {
  const m = await manager('ip2', '203.0.113.8');
  await m.wait(await m.mgr.proto.set({ hy2: false }));                       // запись истории с адресом .8 и включённым Hysteria2
  const moved = await m.mgr.inbound.set('203.0.113.9');
  assert.deepEqual(await m.mgr.server.wait(moved.job), { ok: true, error: '' });   // дождаться своей задачи по номеру
  assert.equal(m.mgr.inbound.current(), '203.0.113.9');
  const first = m.mgr.stateForAdmin().history.at(-1).id;
  await m.wait(await m.mgr.history.rollback(first));
  const cfg = m.read();
  assert.deepEqual(cfg.inbounds.map((i) => [i.tag, i.listen]), [['vsRAWtlsVISION', '203.0.113.9'], ['Hysteria2', '203.0.113.9']]);   // Hysteria2 вернулся, адрес нынешний
  assert.equal(m.mgr.stateForAdmin().proto.hy2, true);
});

test('подпись установки сравнивается без кавычек, снимок настроек живёт час', async () => {
  const { unquote, freshKeep } = await import('../server/manage.mjs');
  assert.equal(unquote('"ip2|d|1.2.3.4|c"'), 'ip2|d|1.2.3.4|c');
  assert.equal(unquote('ip2|d|1.2.3.4|c'), 'ip2|d|1.2.3.4|c');
  assert.equal(unquote(undefined), '');
  const snap = { routes: [] };
  assert.equal(freshKeep({ at: 1000, s: snap }, 1500), snap);
  assert.equal(freshKeep({ at: 1000, s: snap }, 1000 + 3601), null);   // от смены адреса, которая не дошла до конца
  assert.equal(freshKeep({ routes: [] }, 1500), null);                 // снимок старого вида, без времени
  assert.equal(freshKeep(null, 1500), null);
});

test('запуск после перевода адреса кнопкой: установка не считается новой, история цела, залежавшийся снимок не применяется', async () => {
  const m = await manager('ip2', '203.0.113.8');
  await m.wait(await m.mgr.proto.set({ hy2: false }));
  const hist = m.mgr.stateForAdmin().history.length;
  // помощник записал подпись без кавычек, а контейнер получает её из env-файла с кавычками
  setSetting(m.db, 'apply_sig', 'ip2|vpn.example.ru|203.0.113.9|c'); setSetting(m.db, 'managed', '1');
  process.env.MP_APPLY_SIG = '"ip2|vpn.example.ru|203.0.113.9|c"';
  // снимок от давней неудачной смены адреса: в нём Hysteria2 ещё включён
  setSetting(m.db, 'pre_reconf', JSON.stringify({ at: Math.floor(Date.now() / 1000) - 86400, s: { ...JSON.parse('{"routes":[],"proto":{"hy2":true,"xhttp":true},"stash":{}}') } }));
  const again = m.createManager({ db: m.db, xray: m.xray, queue: m.queue, log: () => {}, activeUsers: () => [] });
  await again.start();
  assert.equal(again.stateForAdmin().history.length, hist);    // история не стёрта
  assert.equal(again.stateForAdmin().proto.hy2, false);        // выключенное осталось выключенным
  assert.equal(getSetting(m.db, 'pre_reconf', ''), '');        // снимок использован или выброшен, не лежит до следующего раза
  delete process.env.MP_APPLY_SIG;
});

test('обновление: Hysteria2 без маскировки получает её при сборке конфига, заданную не трогаем', async () => {
  const m = await manager('bare');
  await m.wait(await m.mgr.proto.set({ socks: { on: true, port: 18080, user: 'usr', pass: 'password1' } }));   // любая правка пересобирает конфиг
  const hy = m.read().inbounds.find((i) => i.tag === 'Hysteria2');
  assert.deepEqual(hy.streamSettings.hysteriaSettings?.masquerade, undefined);   // у тестового входа нет hysteriaSettings: чужое описание не дополняем
  const m2 = await manager('bare');
  const c = m2.read(); c.inbounds[1].streamSettings.hysteriaSettings = { version: 2 };
  writeFileSync(m2.cfgFile, JSON.stringify(c, null, 2));
  await m2.wait(await m2.mgr.proto.set({ socks: { on: true, port: 18080, user: 'usr', pass: 'password1' } }));
  assert.deepEqual(m2.read().inbounds.find((i) => i.tag === 'Hysteria2').streamSettings.hysteriaSettings, { version: 2, masquerade: { type: 'proxy', url: 'http://127.0.0.1:7380/_h3', rewriteHost: false } });
  // свою прежнюю маскировку (без пометки /_h3) обновляем, чужую — нет
  for (const [url, want] of [['http://127.0.0.1:7380', 'http://127.0.0.1:7380/_h3'], ['https://example.com', 'https://example.com']]) {
    const m3 = await manager('bare');
    const c3 = m3.read(); c3.inbounds[1].streamSettings.hysteriaSettings = { version: 2, masquerade: { type: 'proxy', url, rewriteHost: false } };
    writeFileSync(m3.cfgFile, JSON.stringify(c3, null, 2));
    await m3.wait(await m3.mgr.proto.set({ socks: { on: true, port: 18080, user: 'usr', pass: 'password1' } }));
    assert.equal(m3.read().inbounds.find((i) => i.tag === 'Hysteria2').streamSettings.hysteriaSettings.masquerade.url, want);
  }
});

test('смена домена: нода четвёртой версии получает адрес сервера и будущий адрес, старая — прежнюю строку', async () => {
  const { createHash } = await import('node:crypto');
  const db = openDb(join(mkdtempSync(join(tmpdir(), 'mp-nu-')), 'm.db'));
  const { nodes } = nodesWith(db, null);
  const key = 'k'.repeat(24), t = Math.floor(Date.now() / 1000);
  db.prepare("INSERT INTO nodes (name, addr, key_hash, priv, pub, sid, link_uuid, created_at, seen_at) VALUES ('msk', '203.0.113.50', ?, 'p', 'NPUB', 'nsid', '22222222-2222-4222-8222-222222222222', 1, ?)").run(createHash('sha256').update(key).digest('hex'), t - 20);
  const id = db.prepare('SELECT id FROM nodes').get().id;
  const sync = async (body) => {
    let out = '';
    await nodes.http({ method: 'POST', headers: { 'x-node-key': `${id}.${key}` } }, {}, 'sync',
      { send: (res, code, text) => { out = text }, readRaw: async () => JSON.stringify(body), ipOf: () => '203.0.113.50', changed: () => {} });
    return out.split('\n')[0].split(' ');
  };
  let h = await sync({ v: 4, url: 'https://vpn.example.ru/s/_n', sig: '-' });
  assert.equal(h.length, 5);
  assert.deepEqual(h.slice(3), ['https://vpn.example.ru/s/_n', '-']);          // переезда нет
  assert.equal((await sync({ v: 3, sig: '-' })).length, 3);                      // прежний агент: строка прежняя
  // домен меняют: будущий адрес уходит ноде; «все узнали» — только когда отчёт пришёл после объявления и агент новый
  setSetting(db, 'next_domain', 'new.example.ru');
  const since = Math.floor(Date.now() / 1000);
  db.prepare('UPDATE nodes SET seen_at = ?').run(since - 5);
  assert.equal(nodes.announced(since), false);
  h = await sync({ v: 4, url: 'https://vpn.example.ru/s/_n', sig: '-' });
  assert.deepEqual(h.slice(3), ['https://vpn.example.ru/s/_n', 'https://new.example.ru/s/_n']);
  assert.equal(nodes.announced(since), true);
  await sync({ v: 3, sig: '-' });
  assert.equal(nodes.announced(since), false);                                   // старый агент будущего адреса не понял
  // нода не на связи переезду не мешает: ждать её незачем
  db.prepare('UPDATE nodes SET seen_at = ?').run(since - 1000);
  assert.equal(nodes.announced(since), true);
  setSetting(db, 'next_domain', 'vpn.example.ru');                               // тот же домен — не переезд
  assert.equal((await sync({ v: 4, sig: '-' }))[4], '-');
});

test('агент ноды: адрес сервера принимается только вида https://домен/s/_n', () => {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../server/node-agent.sh'), 'utf8');
  const fn = src.split('\n').find((l) => l.startsWith('okurl() {'));
  assert.ok(fn);
  const ok = (u) => spawnSync('bash', ['-c', `${fn}\nokurl "$1"`, 'x', u], { timeout: 10000 }).status === 0;
  assert.equal(ok('https://new.example.ru/s/_n'), true);
  for (const bad of ['http://new.example.ru/s/_n', 'https://new.example.ru/s/_n/x', 'https://new.example.ru/s/_n;id', 'https://a b/s/_n', 'https://$(id)/s/_n', '-', '', 'https://new.example.ru|x/s/_n'])
    assert.equal(ok(bad), false, bad);
});
