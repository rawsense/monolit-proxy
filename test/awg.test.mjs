// AmneziaWG: сверка пользователей с устройством, учёт трафика, клиентские конфиги.
// Вместо настоящего устройства — сервер на сокете, который отвечает на «get=1» и «set=1» как amneziawg-go.
// Запуск: node --test --test-timeout=30000 --test-force-exit test/awg.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:net';
import { DatabaseSync } from 'node:sqlite';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SOCK = process.platform === 'win32' ? `\\\\.\\pipe\\monolit-awg-test-${process.pid}` : join(tmpdir(), `monolit-awg-test-${process.pid}.sock`);
process.env.MP_AWG_SOCK = SOCK;
const { createAwg, parseGet, userIp } = await import('../server/awg.mjs');

// ---------- устройство-заглушка ----------
const dev = { fields: {}, peers: new Map(), sets: [] };
const server = createServer((c) => {
  let buf = '';
  c.setEncoding('utf8');
  c.on('data', (d) => {
    buf += d; if (!buf.endsWith('\n\n')) return;
    const lines = buf.trim().split('\n'); buf = '';
    if (lines[0] === 'get=1') {
      const out = Object.entries(dev.fields).map(([k, v]) => `${k}=${v}`);
      for (const [pub, p] of dev.peers) out.push(`public_key=${pub}`, `preshared_key=${p.psk}`, ...(p.endpoint ? [`endpoint=${p.endpoint}`] : []), `last_handshake_time_sec=${p.hs}`, `tx_bytes=${p.tx}`, `rx_bytes=${p.rx}`, ...p.allowed.map((a) => `allowed_ip=${a}`));
      return c.end(out.join('\n') + '\nerrno=0\n\n');
    }
    dev.sets.push(lines.slice(1)); let p = null;
    for (const l of lines.slice(1)) {
      const i = l.indexOf('='), k = l.slice(0, i), v = l.slice(i + 1);
      if (k === 'public_key') { p = dev.peers.get(v) || { psk: '', allowed: [], rx: 0, tx: 0, hs: 0, endpoint: '' }; dev.peers.set(v, p); p.key = v }
      else if (!p) dev.fields[k] = v;
      else if (k === 'remove') dev.peers.delete(p.key);
      else if (k === 'preshared_key') p.psk = v;
      else if (k === 'replace_allowed_ips') p.allowed = [];
      else if (k === 'allowed_ip') p.allowed.push(v);
    }
    c.end('errno=0\n\n');
  });
});
await new Promise((ok) => server.listen(SOCK, ok));

// ---------- админка-заглушка ----------
const db = new DatabaseSync(':memory:');
db.exec("CREATE TABLE settings (k TEXT PRIMARY KEY, v TEXT NOT NULL); CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)");
for (const n of ['Аня', 'Боря', 'Вика']) db.prepare('INSERT INTO users (name) VALUES (?)').run(n);
const users = () => db.prepare('SELECT * FROM users ORDER BY id').all();
const calls = [];
const agent = async (line) => { calls.push(line); return { code: 0, out: '' } };
let outIp = '';
const awg = createAwg({ db, log: () => {}, agent, domain: () => 'vpn.example.com', outIp: () => outIp });
const hexOf = (b) => Buffer.from(b, 'base64').toString('hex');
const tick = () => new Promise((ok) => setTimeout(ok, 30));

test('адреса людей', () => {
  assert.equal(userIp(1), '10.13.0.2');
  assert.equal(userIp(254), '10.13.0.255');
  assert.equal(userIp(255), '10.13.1.0');
  assert.equal(userIp(65533), '10.13.255.254');
  assert.equal(userIp(65534), '');
});

test('выключен — ничего не делает', async () => {
  assert.equal(awg.ready(), false);
  assert.deepEqual(await awg.sync(users()), { traffic: {}, online: {} });
  assert.equal(awg.outbound(users()[0]), null);
  assert.equal(awg.confText(users()[0], 'x'), '');
  assert.equal(calls.length, 0);
});

test('включение: помощник, ключи сервера, настройка устройства', async () => {
  assert.deepEqual(await awg.set({ on: true, port: 80 }), { error: 'Порт от 1024 до 65535' });
  assert.deepEqual(await awg.set({ on: true, port: 46200 }), { ok: true });
  await tick();
  assert.deepEqual(calls, ['port-free 46200', 'awg on 46200 - -']);
  assert.deepEqual(awg.stateForAdmin(), { on: true, port: 46200, ip: '', state: 'on', error: '' });
  const r = await awg.sync(users());
  assert.deepEqual(r, { traffic: {}, online: {} });
  const c = awg.conf();
  assert.equal(dev.fields.private_key, hexOf(c.priv));
  assert.equal(dev.fields.listen_port, '46200');
  assert.equal(dev.fields.header_protection_key, hexOf(c.hpk));
  assert.equal(dev.fields.random_trailers, 'true');
  assert.equal(dev.fields.s1, '12');
  assert.equal(dev.peers.size, 3);
  const u = users();
  assert.ok(u.every((x) => x.awg_priv && x.awg_pub && x.awg_psk));
  assert.deepEqual(dev.peers.get(hexOf(u[1].awg_pub)).allowed, ['10.13.0.3/32']);
  assert.equal(dev.peers.get(hexOf(u[1].awg_pub)).psk, hexOf(u[1].awg_psk));
});

test('повторная сверка ничего не трогает', async () => {
  const n = dev.sets.length;
  await awg.sync(users());
  assert.equal(dev.sets.length, n);
});

test('трафик считается разницей, перезапуск устройства не даёт отрицательных чисел', async () => {
  const u = users(), a = dev.peers.get(hexOf(u[0].awg_pub));
  a.rx = 1000; a.tx = 5000; a.hs = Math.floor(Date.now() / 1000) - 5; a.endpoint = '203.0.113.7:51000';
  let r = await awg.sync(u);
  assert.deepEqual(r.traffic, { 1: { up: 1000, down: 5000 } });
  assert.deepEqual(Object.keys(r.online), ['1']);
  assert.deepEqual(Object.keys(r.online[1]), ['203.0.113.7']);
  a.rx = 1500; a.tx = 5000;
  r = await awg.sync(u);
  assert.deepEqual(r.traffic, { 1: { up: 500, down: 0 } });
  a.rx = 40; a.tx = 70;   // устройство перезапустили: счётчики с нуля
  r = await awg.sync(u);
  assert.deepEqual(r.traffic, { 1: { up: 40, down: 70 } });
  a.hs = Math.floor(Date.now() / 1000) - 600;
  r = await awg.sync(u);
  assert.deepEqual(r, { traffic: {}, online: {} });
});

test('кого нет в списке — убирается с устройства, остальные не затронуты', async () => {
  const u = users(), n = dev.sets.length;
  await awg.sync([u[0], u[2]]);
  assert.equal(dev.peers.size, 2);
  assert.ok(!dev.peers.has(hexOf(u[1].awg_pub)));
  assert.deepEqual(dev.sets.slice(n), [[`public_key=${hexOf(u[1].awg_pub)}`, 'remove=true']]);
});

test('новые ключи человека: старый ключ уходит, новый приходит', async () => {
  const before = users()[0].awg_pub;
  awg.dropKeys(1);
  await awg.sync(users());
  const after = users()[0].awg_pub;
  assert.notEqual(after, before);
  assert.ok(!dev.peers.has(hexOf(before)));
  assert.deepEqual(dev.peers.get(hexOf(after)).allowed, ['10.13.0.2/32']);
  assert.equal(dev.peers.size, 3);
});

test('устройство потеряло настройки (перезапуск контейнера) — всё возвращается', async () => {
  dev.fields = {}; dev.peers.clear();
  await awg.sync(users());
  assert.equal(dev.fields.private_key, hexOf(awg.conf().priv));
  assert.equal(dev.peers.size, 3);
});

test('конфиг для клиента monolit и файл .conf', () => {
  const u = users()[1], c = awg.conf(), ob = awg.outbound(u);
  assert.equal(ob.protocol, 'wireguard');
  assert.equal(ob.tag, 'proxy');
  assert.deepEqual(ob.settings.address, ['10.13.0.3']);
  assert.equal(ob.settings.secretKey, u.awg_priv);
  assert.deepEqual(ob.settings.peers, [{ publicKey: c.pub, preSharedKey: u.awg_psk, endpoint: 'vpn.example.com:46200', allowedIPs: ['0.0.0.0/0'], keepAlive: 25 }]);
  assert.equal(ob.settings.awg.HeaderProtectionKey, c.hpk);
  assert.equal(ob.settings.awg.Jc, String(c.jc));
  assert.ok(Object.values(ob.settings.awg).every((v) => typeof v === 'string'));
  const text = awg.confText(u, 'Stockholm\nAmneziaWG');
  assert.ok(text.startsWith('# Stockholm AmneziaWG\n[Interface]\n'));
  for (const line of [`PrivateKey = ${u.awg_priv}`, 'Address = 10.13.0.3/32', `HeaderProtectionKey = ${c.hpk}`, 'RandomTrailers = on', 'S4 = 12', `PublicKey = ${c.pub}`, 'Endpoint = vpn.example.com:46200']) assert.ok(text.includes(line + '\n'), line);
});

test('ссылка vpn:// для AmneziaVPN: сжатый JSON приложения с теми же ключами и параметрами', async () => {
  const { inflateSync } = await import('node:zlib');
  const u = users()[1], c = awg.conf(), link = awg.vpnLink(u, 'Stockholm');
  assert.ok(link.startsWith('vpn://'));
  const raw = Buffer.from(link.slice(6), 'base64url'), json = inflateSync(raw.subarray(4));
  assert.equal(raw.readUInt32BE(0), json.length);   // как qCompress: длина несжатого в первых 4 байтах
  const cfg = JSON.parse(json);
  assert.equal(cfg.defaultContainer, 'amnezia-awg');
  assert.equal(cfg.description, 'Stockholm');
  assert.equal(cfg.hostName, 'vpn.example.com');
  assert.deepEqual([cfg.dns1, cfg.dns2], ['1.1.1.1', '8.8.8.8']);
  const box = cfg.containers[0];
  assert.equal(box.container, 'amnezia-awg');
  assert.deepEqual({ ...box.awg, last_config: undefined }, { last_config: undefined, isThirdPartyConfig: true, port: '46200', transport_proto: 'udp' });
  const last = JSON.parse(box.awg.last_config);
  assert.equal(last.config, awg.confText(u, 'Stockholm'));
  assert.equal(last.hostName, 'vpn.example.com'); assert.equal(last.port, 46200);
  assert.equal(last.client_priv_key, u.awg_priv); assert.equal(last.psk_key, u.awg_psk); assert.equal(last.server_pub_key, c.pub);
  assert.equal(last.client_ip, '10.13.0.3/32'); assert.equal(last.mtu, '1280');
  assert.deepEqual(last.allowed_ips, ['0.0.0.0/0']);
  assert.equal(last.HeaderProtectionKey, c.hpk); assert.equal(last.S3, '12'); assert.equal(last.RandomTrailers, 'on'); assert.equal(last.Jc, String(c.jc));
});

test('сменили выходной адрес — при полной сверке помощник вызывается с ним', async () => {
  outIp = '198.51.100.9'; calls.length = 0;
  await awg.sync(users());
  assert.equal(calls.length, 0);
  await awg.sync(users(), { full: true });
  assert.deepEqual(calls, ['awg on 46200 198.51.100.9 -']);
});

test('свой адрес: помощник получает его, приложения подключаются к нему цифрами, а не к домену', async () => {
  calls.length = 0;
  assert.deepEqual(await awg.set({ ip: 'vpn.example.com' }), { error: 'Выберите адрес из списка' });
  assert.deepEqual(await awg.set({ ip: '203.0.113.8' }), { ok: true });
  await tick();
  assert.deepEqual(calls, ['awg on 46200 198.51.100.9 203.0.113.8']);
  assert.equal(awg.stateForAdmin().ip, '203.0.113.8');
  const u = users()[1];
  assert.equal(awg.outbound(u).settings.peers[0].endpoint, '203.0.113.8:46200');
  assert.ok(awg.confText(u, 'x').includes('Endpoint = 203.0.113.8:46200\n'));
  calls.length = 0;
  assert.deepEqual(await awg.set({ ip: '203.0.113.8' }), { ok: true });   // тот же адрес — ничего не перезапускаем
  await tick();
  assert.equal(calls.length, 0);
  assert.deepEqual(await awg.set({ ip: '' }), { ok: true });
  await tick();
  assert.deepEqual(calls, ['awg on 46200 198.51.100.9 -']);
  assert.equal(awg.outbound(u).settings.peers[0].endpoint, 'vpn.example.com:46200');
});

test('VPN перевели на другой адрес или адрес пропал — привязка AmneziaWG переезжает следом, чужую не трогаем', async () => {
  await awg.set({ ip: '203.0.113.8' }); await tick(); calls.length = 0;
  assert.equal(await awg.moved('203.0.113.99', '203.0.113.20'), false);   // привязан к другому адресу
  await tick();
  assert.equal(calls.length, 0);
  assert.equal(await awg.moved('203.0.113.8', '203.0.113.20'), true);
  await tick();
  assert.deepEqual(calls, ['awg on 46200 198.51.100.9 203.0.113.20']);
  assert.equal(awg.outbound(users()[1]).settings.peers[0].endpoint, '203.0.113.20:46200');
  calls.length = 0;
  assert.equal(await awg.moved('203.0.113.20', ''), true);   // нового адреса нет — слушаем на всех
  await tick();
  assert.deepEqual(calls, ['awg on 46200 198.51.100.9 -']);
  assert.equal(await awg.moved('', '203.0.113.20'), false);   // привязки нет — переносить нечего
});

test('включение и сверка одновременно — помощник вызывается один раз', async () => {
  await awg.set({ on: false }); calls.length = 0;
  let release; const slow = new Promise((ok) => { release = ok });
  const a2 = createAwg({ db, log: () => {}, agent: async (line) => { calls.push(line); if (line.startsWith('awg on')) await slow; return { code: 0, out: '' } }, domain: () => 'vpn.example.com', outIp: () => '' });
  assert.deepEqual(await a2.set({ on: true }), { ok: true });
  const s1 = a2.sync(users(), { full: true });
  await tick(); release();
  await s1;
  assert.deepEqual(calls.filter((c) => c.startsWith('awg on')), ['awg on 46200 - -']);
  assert.equal(a2.stateForAdmin().state, 'on');
  assert.equal(dev.peers.size, 3);
});

test('выключение', async () => {
  await awg.set({ on: true }); await tick();

  calls.length = 0;
  assert.deepEqual(await awg.set({ on: false }), { ok: true });
  assert.deepEqual(calls, ['awg off']);
  assert.equal(awg.ready(), false);
  assert.equal(awg.outbound(users()[0]), null);
  assert.deepEqual(awg.stateForAdmin(), { on: false, port: 46200, ip: '', state: 'off', error: '' });
});

test('разбор ответа устройства', () => {
  const g = parseGet('private_key=aa\nlisten_port=1\njc=5\npublic_key=bb\nendpoint=[2001:db8::1]:5\nrx_bytes=7\ntx_bytes=9\nallowed_ip=10.13.0.2/32\npublic_key=cc\nerrno=0\n\n');
  assert.deepEqual(g.dev, { private_key: 'aa', listen_port: '1', jc: '5' });
  assert.deepEqual([...g.peers.keys()], ['bb', 'cc']);
  assert.deepEqual(g.peers.get('bb'), { allowed: ['10.13.0.2/32'], rx: 7, tx: 9, hs: 0, endpoint: '[2001:db8::1]:5', psk: '' });
});

test.after(() => server.close());
