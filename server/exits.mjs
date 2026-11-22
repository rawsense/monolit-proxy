// Выходы: купленные SOCKS5-прокси, через которые трафик людей уходит в интернет вместо адреса сервера.
// Выход задаётся у пользователя (для всех его подключений) и у подключения в наборе (главнее). Если выход не отвечает
// или у него нет UDP, трафик идёт по правилу падения: напрямую с сервера или в блок. Падение замечает сам Xray:
// observatory проверяет прокси, балансировщик с одним прокси уходит на fallbackTag.
// Всё своё в конфиге Xray помечено «mp-x»: выходы mp-x<id>.s, балансировщики mp-x<id>-d|b, правила mp-x-*
import { createConnection, isIP } from 'node:net';
import { createSocket } from 'node:dgram';
import { lookup } from 'node:dns/promises';
import { now } from './db.mjs';

export const FAILS = ['direct', 'block'];
export const OUT = (id) => `mp-x${id}.s`;
export const BAL = (id, fail) => `mp-x${id}-${fail === 'block' ? 'b' : 'd'}`;
const MINE = (t) => String(t || '').startsWith('mp-x');
const PROBE = 'https://www.gstatic.com/generate_204';

// Строка прокси в том виде, как её дают продавцы: host:port, user:pass@host:port, host:port:user:pass, socks5://…
export function parseProxy(v) {
  let s = String(v || '').trim().replace(/^socks5h?:\/\//i, '').replace(/\/+$/, '');
  if (!s) return null;
  let user = '', pass = '', host, port;
  const at = s.lastIndexOf('@');
  if (at >= 0) {
    const cred = s.slice(0, at); s = s.slice(at + 1);
    const i = cred.indexOf(':'); user = i < 0 ? cred : cred.slice(0, i); pass = i < 0 ? '' : cred.slice(i + 1);
    try { user = decodeURIComponent(user); pass = decodeURIComponent(pass) } catch {}
  }
  const m6 = /^\[([0-9a-f:]+)\]:(\d+)$/i.exec(s);
  if (m6) { host = m6[1]; port = m6[2] }
  else {
    const p = s.split(':');
    if (p.length === 2 || (p.length >= 4 && at < 0)) { host = p[0]; port = p[1]; if (p.length >= 4) { user = p[2]; pass = p.slice(3).join(':') } }
    else return null;
  }
  port = Number(port);
  host = host.toLowerCase();
  if (!(port > 0 && port < 65536)) return null;
  if (!isIP(host) && !/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(host)) return null;
  if (user.length > 255 || pass.length > 255) return null;
  return { host, port, user, pass };
}
export const flagOf = (cc) => /^[A-Z]{2}$/.test(cc || '') ? String.fromCodePoint(...[...cc].map((c) => 0x1F1A5 + c.charCodeAt(0))) : '';
export const proxyText = (x) => `${x.user ? `${x.user}${x.pass ? ':' + x.pass : ''}@` : ''}${x.host.includes(':') ? `[${x.host}]` : x.host}:${x.port}`;

// ---------- проверка прокси ----------
// Своими руками, без Xray: рукопожатие SOCKS5, через него запрос «какой у меня IP и страна», потом UDP ASSOCIATE с DNS-запросом
function reader(sock) {
  let buf = Buffer.alloc(0), want = null;
  const pump = () => { if (want && buf.length >= want.n) { const out = buf.subarray(0, want.n); buf = buf.subarray(want.n); const w = want; want = null; w.ok(out) } };
  sock.on('data', (c) => { buf = Buffer.concat([buf, c]); pump() });
  const fail = (e) => { if (want) { const w = want; want = null; w.bad(e) } };
  sock.on('error', fail); sock.on('close', () => fail(new Error('прокси закрыл соединение')));
  return {
    read: (n) => new Promise((ok, bad) => { want = { n, ok, bad }; pump() }),
    rest: () => buf,
  };
}
async function handshake(x, timeout) {
  const sock = createConnection({ host: x.host, port: x.port });
  sock.setTimeout(timeout, () => sock.destroy(new Error('прокси не ответил за ' + Math.round(timeout / 1000) + ' с')));
  const r = reader(sock);
  await new Promise((ok, bad) => { sock.once('connect', ok); sock.once('error', bad) });
  sock.write(Buffer.from(x.user ? [5, 2, 0, 2] : [5, 1, 0]));
  const [v, method] = await r.read(2);
  if (v !== 5) throw new Error('это не SOCKS5');
  if (method === 2) {
    const u = Buffer.from(x.user), p = Buffer.from(x.pass);
    sock.write(Buffer.concat([Buffer.from([1, u.length]), u, Buffer.from([p.length]), p]));
    const [, st] = await r.read(2);
    if (st !== 0) throw new Error('логин или пароль не подошли');
  } else if (method !== 0) throw new Error(x.user ? 'прокси не принял логин и пароль' : 'прокси просит логин и пароль');
  return { sock, r };
}
async function reply(r) {
  const [, rep, , atyp] = await r.read(4);
  const len = atyp === 1 ? 4 : atyp === 4 ? 16 : (await r.read(1))[0];
  const a = await r.read(len), p = await r.read(2);
  if (rep !== 0) throw new Error(['', 'общая ошибка прокси', 'прокси запретил соединение', 'сеть недоступна', 'адрес недоступен', 'в соединении отказано', 'истёк срок', 'команда не поддерживается', 'тип адреса не поддерживается'][rep] || 'ошибка прокси ' + rep);
  const addr = atyp === 1 ? [...a].join('.') : atyp === 4 ? a.toString('hex').match(/.{4}/g).join(':') : a.toString();
  return { addr, port: p.readUInt16BE(0) };
}
const target = (host, port) => { const h = Buffer.from(host); return Buffer.concat([Buffer.from([5, 1, 0, 3, h.length]), h, Buffer.from([port >> 8, port & 255])]) };

async function whoami(x) {
  const t0 = Date.now(), { sock, r } = await handshake(x, 10000);
  try {
    sock.write(target('ip-api.com', 80)); await reply(r);
    const ms = Date.now() - t0;
    sock.write('GET /json/?fields=status,query,countryCode HTTP/1.1\r\nHost: ip-api.com\r\nUser-Agent: monolit\r\nConnection: close\r\n\r\n');
    const body = await new Promise((ok) => { let s = r.rest().toString(); sock.on('data', (c) => { s += c }); sock.on('close', () => ok(s)); sock.on('end', () => ok(s)) });
    let j = {}; try { j = JSON.parse(body.slice(body.indexOf('{'), body.lastIndexOf('}') + 1)) } catch {}
    return { ms, ip: j.query || '', country: String(j.countryCode || '').toUpperCase() };
  } finally { sock.destroy() }
}
// Пустой DNS-запрос «example.com A» на 1.1.1.1 через UDP-реле прокси: ответ пришёл — UDP есть
async function udpWorks(x) {
  let tcp; try { tcp = await handshake(x, 8000) } catch { return null }
  const { sock, r } = tcp, u = createSocket('udp4');
  try {
    sock.write(Buffer.from([5, 3, 0, 1, 0, 0, 0, 0, 0, 0]));
    let relay; try { relay = await reply(r) } catch { return false }
    let host = relay.addr;
    if (!isIP(host) || host === '0.0.0.0' || host.includes(':')) host = isIP(x.host) === 4 ? x.host : (await lookup(x.host, { family: 4 }).catch(() => ({}))).address;
    if (!host || !relay.port) return false;
    const q = Buffer.from('a1b201000001000000000000076578616d706c6503636f6d0000010001', 'hex');
    const pkt = Buffer.concat([Buffer.from([0, 0, 0, 1, 1, 1, 1, 1, 0, 53]), q]);
    return await new Promise((ok) => {
      let again;
      const end = (v) => { clearTimeout(t); clearTimeout(again); ok(v) }, t = setTimeout(() => end(false), 4000);
      u.on('message', (m) => { if (m.length > 10 + 12 && m.includes(Buffer.from('a1b2', 'hex'))) end(true) });
      u.on('error', () => end(false));
      u.send(pkt, relay.port, host); again = setTimeout(() => u.send(pkt, relay.port, host), 1200);   // UDP теряется: второй раз
    });
  } finally { sock.destroy(); u.close() }
}
export async function checkProxy(x) {
  try {
    const w = await whoami(x);
    return { ok: true, ...w, udp: await udpWorks(x), error: '' };
  } catch (e) {
    const m = e.code === 'ECONNREFUSED' ? 'порт закрыт' : e.code === 'ENOTFOUND' ? 'адрес не найден' : e.code === 'EHOSTUNREACH' || e.code === 'ENETUNREACH' ? 'адрес недоступен' : e.message;
    return { ok: false, ms: 0, ip: '', country: '', udp: null, error: m };
  }
}

// ---------- хранилище и части конфига Xray ----------
export function createExits({ db, log }) {
  db.exec(`CREATE TABLE IF NOT EXISTS exits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    host TEXT NOT NULL, port INTEGER NOT NULL,
    user TEXT NOT NULL DEFAULT '', pass TEXT NOT NULL DEFAULT '',
    ok INTEGER NOT NULL DEFAULT -1,          -- последняя проверка: 1 отвечает, 0 нет, -1 ещё не проверяли
    udp INTEGER NOT NULL DEFAULT -1,         -- 1 есть, 0 нет, -1 не знаем (тогда считаем, что есть)
    ip TEXT NOT NULL DEFAULT '', country TEXT NOT NULL DEFAULT '', ms INTEGER NOT NULL DEFAULT 0,
    error TEXT NOT NULL DEFAULT '', checked_at INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
  )`);
  // поля выхода у пользователей и подключений: зовётся, когда обе таблицы уже есть (kit_lines заводят ноды)
  function migrate() {
    for (const t of ['users', 'kit_lines']) {
      const have = new Set(db.prepare(`PRAGMA table_info(${t})`).all().map((c) => c.name));
      if (!have.has('exit_id')) db.exec(`ALTER TABLE ${t} ADD COLUMN exit_id INTEGER NOT NULL DEFAULT 0`);
      if (!have.has('exit_fail')) db.exec(`ALTER TABLE ${t} ADD COLUMN exit_fail TEXT NOT NULL DEFAULT 'direct'`);
    }
  }
  const all = () => db.prepare('SELECT * FROM exits ORDER BY id').all();
  const byId = (id) => db.prepare('SELECT * FROM exits WHERE id = ?').get(Number(id) || 0);

  const own = (r) => { const x = r?.exit_id && byId(r.exit_id); return x ? { id: x.id, fail: r.exit_fail === 'block' ? 'block' : 'direct', udp: x.udp !== 0 } : null };
  // Выход человека на подключении: своё у подключения, иначе у человека. AmneziaWG идёт мимо Xray — без выхода
  const eff = (u, l) => l?.proto === 'awg' ? null : own(l) || own(u);
  const key = (e) => e ? `x${e.id}${e.fail === 'block' ? 'b' : 'd'}` : '';

  // Правила для группы почт с одним выходом: UDP мимо прокси без UDP, остальное — в балансировщик
  function rules(groups, tags) {
    const out = []; let n = 0;
    for (const g of groups) {
      if (!g.users.length) continue;
      const base = { type: 'field', user: g.users, ...(g.inboundTag ? { inboundTag: [g.inboundTag] } : {}) };
      if (!g.exit.udp) out.push({ ...base, network: 'udp', outboundTag: tags[g.exit.fail], ruleTag: `mp-x-${++n}` });
      out.push({ ...base, balancerTag: BAL(g.exit.id, g.exit.fail), ruleTag: `mp-x-${++n}` });
    }
    return out;
  }
  // Положить в конфиг выходы, балансировщики, observatory и правила (в самый конец: «Маршруты» проверяются раньше)
  function parts(cfg, groups, tags = { direct: 'direct', block: 'block' }) {
    cfg.outbounds = (cfg.outbounds || []).filter((o) => !MINE(o.tag));
    cfg.routing ||= {};
    cfg.routing.rules = (cfg.routing.rules || []).filter((r) => !MINE(r.ruleTag));
    const bal = (cfg.routing.balancers || []).filter((b) => !MINE(b.tag));
    const obs = cfg.observatory, sel = (obs?.subjectSelector || []).filter((s) => !MINE(s));
    const xs = all();
    if (!xs.length) {
      if (bal.length) cfg.routing.balancers = bal; else delete cfg.routing.balancers;
      if (obs) { if (sel.length) obs.subjectSelector = sel; else delete cfg.observatory }
      return cfg;
    }
    // «Без интернета» — в блок. Своего blackhole в конфиге может не быть: тогда свой
    if (!cfg.outbounds.some((o) => o.tag === tags.block && o.protocol === 'blackhole')) { tags = { ...tags, block: 'mp-x.block' }; cfg.outbounds.push({ tag: tags.block, protocol: 'blackhole' }) }
    for (const x of xs) {
      cfg.outbounds.push({ tag: OUT(x.id), protocol: 'socks', settings: { servers: [{ address: x.host, port: x.port, ...(x.user ? { users: [{ user: x.user, pass: x.pass }] } : {}) }] } });
      for (const f of FAILS) bal.push({ tag: BAL(x.id, f), selector: [OUT(x.id) /* префикс: mp-x1.s не совпадёт с mp-x12.s */], strategy: { type: 'random' }, fallbackTag: tags[f] });
    }
    cfg.routing.balancers = bal;
    cfg.observatory = obs && sel.length ? { ...obs, subjectSelector: [...sel, ...xs.map((x) => OUT(x.id))] } : { subjectSelector: xs.map((x) => OUT(x.id)), probeURL: PROBE, probeInterval: '30s', enableConcurrency: true };
    cfg.routing.rules.push(...rules(groups, tags));
    // живые изменения правил (выход человеку назначили или сняли) идут через API без перезапуска
    if (cfg.api?.services && !cfg.api.services.includes('RoutingService')) cfg.api.services = [...cfg.api.services, 'RoutingService'];
    return cfg;
  }

  // ---------- проверки ----------
  const save = (id, r) => db.prepare('UPDATE exits SET ok = ?, udp = CASE WHEN ? < 0 THEN udp ELSE ? END, ip = ?, country = ?, ms = ?, error = ?, checked_at = ? WHERE id = ?')
    .run(r.ok ? 1 : 0, r.udp == null ? -1 : 1, r.udp ? 1 : 0, r.ip, r.country, r.ms, r.error, now(), id);
  async function check(id) {
    const x = byId(id); if (!x) return null;
    const r = await checkProxy(x);
    save(x.id, r);
    if (!r.ok && x.ok === 1) log(`выход «${x.name}» не отвечает: ${r.error}`);
    return byId(id);
  }
  let busy = false;
  async function checkAll() { if (busy) return; busy = true; try { for (const x of all()) await check(x.id) } finally { busy = false } }
  const pub = (x) => ({ id: x.id, name: x.name, proxy: proxyText(x), host: x.host, port: x.port, ok: x.ok, udp: x.udp, ip: x.ip, country: x.country, ms: x.ms, error: x.error, checked: x.checked_at,
    users: db.prepare('SELECT COUNT(*) AS n FROM users WHERE exit_id = ?').get(x.id).n, lines: db.prepare('SELECT COUNT(*) AS n FROM kit_lines WHERE exit_id = ?').get(x.id).n });
  const state = () => all().map(pub);

  // Поля выхода у пользователя или подключения из тела запроса
  function pick(b, old = {}) {
    const id = b.exit !== undefined ? Number(b.exit) || 0 : old.exit_id || 0;
    if (id && !byId(id)) return { error: 'Нет такого выхода' };
    const fail = b.exit_fail !== undefined ? (b.exit_fail === 'block' ? 'block' : 'direct') : old.exit_fail === 'block' ? 'block' : 'direct';
    return { exit_id: id, exit_fail: fail };
  }

  return { migrate, all, byId, eff, key, parts, check, checkAll, state, pick, pub };
}
