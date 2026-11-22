// Выходы через SOCKS5: разбор строки прокси, проверка прокси на поддельном SOCKS5, правила Xray на сервере и на нодах.
// Запуск: node --test --test-timeout=30000 --test-force-exit test/exits.test.mjs
// С переменной XRAY=путь к xray готовые конфиги проверяются ещё и `xray run -test`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:net';
import { createSocket } from 'node:dgram';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseProxy, proxyText, checkProxy, createExits, OUT, BAL } from '../server/exits.mjs';
import { createNodes } from '../server/nodes.mjs';
import { Xray } from '../server/xray.mjs';
import { openDb } from '../server/db.mjs';

test('строка прокси в форматах продавцов', () => {
  assert.deepEqual(parseProxy('1.2.3.4:1080'), { host: '1.2.3.4', port: 1080, user: '', pass: '' });
  assert.deepEqual(parseProxy('socks5://u:p@1.2.3.4:1080'), { host: '1.2.3.4', port: 1080, user: 'u', pass: 'p' });
  assert.deepEqual(parseProxy('u:p:q@Proxy.Example.com:9000'), { host: 'proxy.example.com', port: 9000, user: 'u', pass: 'p:q' });
  assert.deepEqual(parseProxy('1.2.3.4:1080:user:pa:ss'), { host: '1.2.3.4', port: 1080, user: 'user', pass: 'pa:ss' });
  assert.deepEqual(parseProxy('[2001:db8::1]:1080'), { host: '2001:db8::1', port: 1080, user: '', pass: '' });
  assert.equal(parseProxy('1.2.3.4'), null);
  assert.equal(parseProxy('1.2.3.4:99999'), null);
  assert.equal(parseProxy('не прокси:80'), null);
  assert.equal(proxyText({ host: '1.2.3.4', port: 1080, user: 'u', pass: 'p' }), 'u:p@1.2.3.4:1080');
});

// ---------- поддельный SOCKS5 ----------
function fakeSocks({ user = '', pass = '', udp = true } = {}) {
  const relay = createSocket('udp4');
  relay.on('message', (m, from) => { if (udp) relay.send(Buffer.concat([m.subarray(0, 10), m.subarray(10, 12), Buffer.from('8180', 'hex'), m.subarray(14)]), from.port, from.address) });
  const srv = createServer((c) => {
    let buf = Buffer.alloc(0), stage = 'hello';
    c.on('error', () => {});
    c.on('data', (d) => {
      buf = Buffer.concat([buf, d]);
      if (stage === 'hello' && buf.length >= 2 + buf[1]) {
        const methods = [...buf.subarray(2, 2 + buf[1])]; buf = buf.subarray(2 + buf[1]);
        if (user && !methods.includes(2)) return c.end(Buffer.from([5, 255]));
        c.write(Buffer.from([5, user ? 2 : 0])); stage = user ? 'auth' : 'cmd';
      }
      if (stage === 'auth' && buf.length >= 2 && buf.length >= 3 + buf[1] + buf[2 + buf[1]]) {
        const u = buf.subarray(2, 2 + buf[1]).toString(), p = buf.subarray(3 + buf[1], 3 + buf[1] + buf[2 + buf[1]]).toString();
        buf = Buffer.alloc(0);
        if (u !== user || p !== pass) return c.end(Buffer.from([1, 1]));
        c.write(Buffer.from([1, 0])); stage = 'cmd';
      }
      if (stage === 'cmd' && buf.length >= 5) {
        const cmd = buf[1]; buf = Buffer.alloc(0);
        if (cmd === 1) { c.write(Buffer.from([5, 0, 0, 1, 0, 0, 0, 0, 0, 0])); stage = 'http' }
        else if (cmd === 3) { const p = relay.address().port; c.write(Buffer.from([5, 0, 0, 1, 127, 0, 0, 1, p >> 8, p & 255])); stage = 'udp' }
      }
      if (stage === 'http' && buf.includes('\r\n\r\n')) {
        const body = '{"status":"success","query":"203.0.113.7","countryCode":"nl"}';
        c.end(`HTTP/1.1 200 OK\r\nContent-Length: ${body.length}\r\n\r\n${body}`);
      }
    });
  });
  return new Promise((ok) => relay.bind(0, '127.0.0.1', () => srv.listen(0, '127.0.0.1', () => ok({ port: srv.address().port, close: () => { srv.close(); relay.close() } }))));
}

test('проверка прокси: IP, страна, UDP, логин', async () => {
  const s = await fakeSocks({ user: 'u', pass: 'p' });
  try {
    const r = await checkProxy({ host: '127.0.0.1', port: s.port, user: 'u', pass: 'p' });
    assert.equal(r.ok, true, r.error); assert.equal(r.ip, '203.0.113.7'); assert.equal(r.country, 'NL'); assert.equal(r.udp, true);
    const bad = await checkProxy({ host: '127.0.0.1', port: s.port, user: 'u', pass: 'x' });
    assert.equal(bad.ok, false); assert.match(bad.error, /логин или пароль/);
    const none = await checkProxy({ host: '127.0.0.1', port: s.port, user: '', pass: '' });
    assert.equal(none.ok, false); assert.match(none.error, /просит логин/);
  } finally { s.close() }
  const t = await fakeSocks({ udp: false });
  try { const r = await checkProxy({ host: '127.0.0.1', port: t.port, user: '', pass: '' }); assert.equal(r.ok, true); assert.equal(r.udp, false) } finally { t.close() }
  const closed = await checkProxy({ host: '127.0.0.1', port: 1, user: '', pass: '' });
  assert.equal(closed.ok, false);
});

// ---------- правила ----------
function setup() {
  const db = openDb(':memory:');
  const vision = { tag: 'vision-in', port: 443, listen: '0.0.0.0' }, hy2 = { tag: 'hy2-in', port: 8443, listen: '0.0.0.0' };
  const xray = { detect: () => ({ vision, hy2 }), addClient: async () => {}, removeClient: async () => {} };
  const exits = createExits({ db, log: () => {} });
  const users = () => db.prepare('SELECT * FROM users ORDER BY id').all();
  const nodes = createNodes({ db, xray, log: () => {}, dayOf: () => '2026-11-22', users, exits,
    server: () => ({ name: 'main', domain: 'vpn.example.com', fp: 'firefox', ports: { vision: 443, hy2: 8443 } }), awg: { ready: () => false } });
  exits.migrate();
  return { db, exits, nodes, xray };
}
const exitRow = (db, id, udp = 1) => db.prepare("INSERT INTO exits (id, name, host, port, user, pass, udp, created_at) VALUES (?, ?, '198.51.100.1', 1080, 'u', 'p', ?, 0)").run(id, 'x' + id, udp);
const node = (db, id, addr) => db.prepare("INSERT INTO nodes (id, name, addr, key_hash, priv, pub, sid, link_uuid, created_at) VALUES (?, ?, ?, 'k', 'cHJpdg', 'cHVi', 'ab', ?, 0)").run(id, 'n' + id, addr, `0000000${id}-0000-4000-8000-000000000000`);

test('основной сервер: выход у человека, у подключения, без UDP, через мост', () => {
  const { db, exits, nodes } = setup();
  exitRow(db, 1); exitRow(db, 2, 0); node(db, 5, '192.0.2.5');
  const kit = db.prepare('SELECT id FROM kits').get().id;
  db.exec('DELETE FROM kit_lines');
  const line = (name, proto, extra = '') => db.prepare(`INSERT INTO kit_lines (kit_id, name, proto, out, via${extra ? ', exit_id, exit_fail' : ''}) VALUES (?, ?, ?, 0, ?${extra ? ', ?, ?' : ''})`);
  db.prepare("INSERT INTO kit_lines (kit_id, name, proto) VALUES (?, 'V', 'vision')").run(kit);
  db.prepare("INSERT INTO kit_lines (kit_id, name, proto, exit_id, exit_fail) VALUES (?, 'H', 'hy2', 2, 'block')").run(kit);
  db.prepare("INSERT INTO kit_lines (kit_id, name, proto, via) VALUES (?, 'M', 'reality', 5)").run(kit);
  db.prepare("INSERT INTO kit_lines (kit_id, name, proto, exit_id) VALUES (?, 'V2', 'vision', 1)").run(kit);   // второй Vision, с выходом
  void line;
  db.exec("INSERT INTO users (id, name, token, uuid, hy2, created_at, exit_id, exit_fail) VALUES (1, 'a', 't1', '11111111-1111-4111-8111-111111111111', 'h', 0, 1, 'direct'), (2, 'b', 't2', '22222222-2222-4222-8222-222222222222', 'h2', 0, 0, 'direct')");
  const g = nodes.exitGroups();
  const pick = (u) => g.find((x) => x.users.includes(u));
  assert.ok(g.every((x) => !x.inboundTag));                                                      // правило по ключу на выход, не по входу
  assert.deepEqual(pick('mp-1-x1d').exit, { id: 1, fail: 'direct', udp: true });                  // свой выход человека
  assert.deepEqual(pick('mp-1-x2b').exit, { id: 2, fail: 'block', udp: false });                  // у подключения главнее
  assert.deepEqual(pick('mp-2-x2b').exit, { id: 2, fail: 'block', udp: false });                  // у человека выхода нет, у подключения есть
  assert.deepEqual(pick('mp-2-x1d').exit, { id: 1, fail: 'direct', udp: true });                  // Vision с выходом
  assert.equal(g.find((x) => x.users.some((e) => /^mp-\d+$/.test(e))), undefined);               // сам человек (Vision без выхода) — напрямую
  assert.deepEqual(pick('mpn-5-x1d').exit, { id: 1, fail: 'direct', udp: true });                 // через мост: ключ ноды на выход
  // в подписке у двух Vision одного человека разные ключи: без выхода — свой, с выходом — ключ на выход
  const u2 = db.prepare('SELECT * FROM users WHERE id = 2').get(), keys = nodes.userKeys(u2);
  assert.deepEqual(keys.map((k) => k.email).sort(), ['mp-2-x1d', 'mp-2-x2b']);
  const ls = nodes.links(u2, { name: 'main', domain: 'vpn.example.com', fp: 'firefox', ports: { vision: 443, hy2: 8443 } });
  const idOf = (name) => decodeURIComponent(/^\w+:\/\/([^@]+)@/.exec(ls.find((s) => s.endsWith('#' + name)))[1]);
  assert.equal(idOf('V'), u2.uuid);
  assert.equal(idOf('V2'), keys.find((k) => k.email === 'mp-2-x1d').uuid);
  assert.equal(idOf('H'), keys.find((k) => k.email === 'mp-2-x2b').hy2);
  // в Xray: человек и его ключи на выходы на каждом входе
  const x = new Xray({ bin: 'xray', config: '', api: '' }); x.userKeys = nodes.userKeys;
  const filled = x.fillUsers({ inbounds: [{ tag: 'v', protocol: 'vless', port: 443, streamSettings: { network: 'raw', security: 'tls' }, settings: { clients: [] } }] }, [u2], ['vision']);
  assert.deepEqual(filled.inbounds[0].settings.clients.map((c) => `${c.email}=${c.id}`).sort(), [`mp-2=${u2.uuid}`, ...keys.map((k) => `${k.email}=${k.uuid}`)].sort());
  x.allKeys = () => ['x1d', 'x1b', 'x2d', 'x2b'];
  assert.deepEqual(x.staleKeys(u2), ['mp-2-x1b', 'mp-2-x2d']);
  assert.ok(nodes.linkClients().some((c) => c.email === 'mpn-5-x1d') && nodes.linkClients().some((c) => c.email === 'mpn-5'));

  const cfg = exits.parts({ outbounds: [{ tag: 'direct', protocol: 'freedom' }, { tag: 'block', protocol: 'blackhole' }], routing: { rules: [{ ip: ['geoip:private'], outboundTag: 'block' }] }, api: { services: ['HandlerService'] } }, g);
  assert.ok(cfg.outbounds.some((o) => o.tag === OUT(1) && o.settings.servers[0].users[0].user === 'u'));
  assert.deepEqual(cfg.routing.balancers.find((b) => b.tag === BAL(2, 'block')), { tag: 'mp-x2-b', selector: ['mp-x2.s'], strategy: { type: 'random' }, fallbackTag: 'block' });
  assert.equal(cfg.routing.rules[0].outboundTag, 'block');                                       // чужие правила впереди
  const udp = cfg.routing.rules.find((r) => r.network === 'udp');
  assert.deepEqual([udp.user.sort(), udp.outboundTag], [['mp-1-x2b', 'mp-2-x2b'], 'block']);      // у прокси без UDP — по правилу падения
  assert.ok(cfg.api.services.includes('RoutingService'));
  assert.deepEqual(cfg.observatory.subjectSelector, ['mp-x1.s', 'mp-x2.s']);
  // повторная сборка из готового не плодит дублей, а без выходов всё своё убирается
  const again = exits.parts(structuredClone(cfg), g);
  assert.equal(again.outbounds.length, cfg.outbounds.length); assert.equal(again.routing.rules.length, cfg.routing.rules.length);
  db.exec('DELETE FROM exits');
  const clean = exits.parts(structuredClone(cfg), []);
  assert.equal(clean.routing.balancers, undefined); assert.equal(clean.observatory, undefined);
  assert.equal(clean.outbounds.length, 2); assert.equal(clean.routing.rules.length, 1);
  xrayTest('main', cfg);
});

test('ноды: мост ведёт людей с выходом своим ключом, нода-сервер выпускает через прокси', () => {
  const { db, nodes } = setup();
  exitRow(db, 3); node(db, 7, '192.0.2.7'); node(db, 8, '192.0.2.8');
  const kit = db.prepare('SELECT id FROM kits').get().id;
  db.exec('DELETE FROM kit_lines');
  db.prepare("INSERT INTO kit_lines (id, kit_id, name, proto, out, via, exit_id) VALUES (10, ?, 'через мост', 'reality', 8, 7, 3)").run(kit);
  db.prepare("INSERT INTO kit_lines (id, kit_id, name, proto, out, via) VALUES (11, ?, 'нода', 'reality', 8, 0)").run(kit);
  db.exec("INSERT INTO users (id, name, token, uuid, hy2, created_at, exit_id) VALUES (1, 'a', 't1', '11111111-1111-4111-8111-111111111111', 'h', 0, 3)");
  const bridge = nodes.nodeConfig(db.prepare('SELECT * FROM nodes WHERE id = 7').get());
  const to = bridge.outbounds.find((o) => o.tag === 'to-8-x3d');
  assert.ok(to, 'выход моста на ноду 8 с ключом выхода');
  assert.deepEqual(bridge.routing.rules.find((r) => r.outboundTag === 'to-8-x3d').user, ['mp-1-10']);
  assert.ok(!bridge.outbounds.some((o) => o.tag === 'mp-x3.s') || !bridge.routing.rules.some((r) => r.balancerTag)); // на мосту человек не выходит
  const srv = nodes.nodeConfig(db.prepare('SELECT * FROM nodes WHERE id = 8').get());
  const ids = srv.inbounds[0].settings.clients.map((c) => c.email);
  assert.ok(ids.includes('mpn-7-x3d') && ids.includes('mp-1-11'));
  assert.equal(srv.inbounds[0].settings.clients.find((c) => c.email === 'mpn-7-x3d').id, to.settings.vnext[0].users[0].id);
  const r = srv.routing.rules.filter((x) => x.balancerTag === 'mp-x3-d');
  assert.deepEqual(r.flatMap((x) => x.user).sort(), ['mp-1-11', 'mpn-7-x3d']);
  xrayTest('node', srv);
});

test('xray.mjs: почты нод с ключом выхода — свои, правила выходов меняются без перезапуска', async () => {
  const x = new Xray({ bin: 'xray', config: '', api: '127.0.0.1:1' });
  x.linkClients = () => [{ id: 'n', email: 'mpn-5-x1d' }];
  const cfg = x.fillUsers({ inbounds: [{ tag: 'v', protocol: 'vless', port: 443, streamSettings: { network: 'raw', security: 'tls' }, settings: { clients: [{ id: 'old', email: 'mpn-5-x9b' }, { id: 'f', email: 'чужой' }] } }] }, [], ['vision']);
  assert.deepEqual(cfg.inbounds[0].settings.clients.map((c) => c.email), ['чужой', 'mpn-5-x1d']);
  const calls = []; x.run = async (a) => { calls.push(a.slice(0, 2).concat(a.slice(3))); return '' };
  assert.equal(await x.liveRules([{ ruleTag: 'mp-x-1' }], [{ ruleTag: 'mp-x-1' }]), false);
  await x.liveRules([{ ruleTag: 'mp-x-1' }, { ruleTag: 'mp-x-2' }], [{ ruleTag: 'mp-x-1', user: ['mp-3'] }]);
  assert.deepEqual(calls[0], ['api', 'rmrules', 'mp-x-1', 'mp-x-2']);
  assert.deepEqual(calls[1].slice(0, 3), ['api', 'adrules', '-append']);
});

function xrayTest(name, cfg) {
  if (!process.env.XRAY) return;
  const dir = mkdtempSync(join(tmpdir(), 'mpx-')), f = join(dir, name + '.json');
  const c = structuredClone(cfg);
  // в тесте нет сертификатов и баз: TLS-входы и geoip не нужны, проверяем выходы, балансировщики и правила
  c.inbounds = [{ tag: 'vision-in', port: 0, listen: '127.0.0.1', protocol: 'vless', settings: { clients: [], decryption: 'none' } }, { tag: 'hy2-in', port: 0, listen: '127.0.0.1', protocol: 'socks', settings: { auth: 'noauth' } }];
  c.routing.rules = c.routing.rules.filter((r) => !JSON.stringify(r).includes('geo'));
  delete c.api; delete c.stats;
  writeFileSync(f, JSON.stringify(c));
  execFileSync(process.env.XRAY, ['run', '-test', '-c', f], { timeout: 20000, stdio: 'pipe' });
}

// Живой Xray (только с XRAY=путь): правила выходов снимаются и добавляются через API, балансировщик из конфига находится
test('живой Xray: замена правил выходов через API', { skip: !process.env.XRAY }, async () => {
  const { spawn } = await import('node:child_process');
  const dir = mkdtempSync(join(tmpdir(), 'mpx-live-')), cfgFile = join(dir, 'c.json'), port = 20000 + (process.pid % 5000);
  const db = openDb(':memory:'), exits = createExits({ db, log: () => {} });
  db.prepare("INSERT INTO exits (id, name, host, port, created_at) VALUES (1, 'x', '127.0.0.1', 1, 0)").run();
  const cfg = exits.parts({ log: { loglevel: 'none' }, api: { tag: 'api', listen: `127.0.0.1:${port}`, services: ['HandlerService'] },
    inbounds: [{ tag: 'in', listen: '127.0.0.1', port: port + 1, protocol: 'socks', settings: { auth: 'noauth' } }],
    outbounds: [{ tag: 'direct', protocol: 'freedom' }, { tag: 'block', protocol: 'blackhole' }], routing: { rules: [] } },
  [{ users: ['mp-1'], exit: { id: 1, fail: 'block', udp: false } }]);
  writeFileSync(cfgFile, JSON.stringify(cfg));
  const p = spawn(process.env.XRAY, ['run', '-c', cfgFile], { stdio: 'ignore' });
  try {
    const x = new Xray({ bin: process.env.XRAY, config: cfgFile, api: `127.0.0.1:${port}` });
    for (let i = 0; i < 50 && !(await x.apiAlive().catch(() => false)); i++) await new Promise((r) => setTimeout(r, 200));
    const was = Xray.exitRules(cfg), next = exits.parts(structuredClone(cfg), [{ users: ['mp-1', 'mp-2'], exit: { id: 1, fail: 'direct', udp: true } }]).routing.rules.filter((r) => r.ruleTag.startsWith('mp-x'));
    assert.equal(await x.liveRules(was, next), true);
    const listed = await x.run(['api', 'lsrules', `--server=127.0.0.1:${port}`]).catch((e) => e.message);
    assert.match(listed, /mp-x-1/); assert.doesNotMatch(listed, /mp-x-2/);
  } finally { p.kill() }
});
