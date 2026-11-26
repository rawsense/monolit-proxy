// monolit proxy — админка подписок Xray (Vision, Hysteria2, XHTTP) поверх уже установленного Xray
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, statSync, renameSync, rmSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { openDb, now, token, newUuid, getSetting, setSetting, hashPassword, checkPassword, userState, nextReset } from './db.mjs';
import { Xray } from './xray.mjs';
import { AUTOXRAY_URL, parseAutoXray, hashOf, renderAll } from './template.mjs';
import { createManager, PRESETS, agent } from './manage.mjs';
import { createWatch, tgSend, tgFindChat, resolve4 } from './watch.mjs';
import { createNodes } from './nodes.mjs';
import { createAwg } from './awg.mjs';
import { createExits, parseProxy, checkProxy, flagOf } from './exits.mjs';
import { createCf } from './cf.mjs';

const env = (k, d) => process.env[k] ?? d;
const DATA = env('MP_DATA', '/data');
const UI = env('MP_UI', new URL('../ui/dist', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const [HOST, PORT] = env('MP_LISTEN', '127.0.0.1:7380').split(':');
const ADMIN = '/' + env('MP_ADMIN_PATH', 'admin').replace(/^\/|\/$/g, '');
const REPO = env('MP_REPO', 'rawsense/monolit-proxy');
const VERSION = (() => { for (const f of ['/app/VERSION', new URL('../VERSION', import.meta.url)]) { try { return readFileSync(f, 'utf8').trim() } catch {} } return env('MP_VERSION', '0.0.0'); })();
const DBF = join(DATA, 'monolit.db');
const DATA_FILES = ['warp.json', 'warp-reg.json'];   // что кроме базы входит в бэкап

// Восстановление из бэкапа: новая база подготовлена прошлым запуском, подменяем её до открытия.
// Прежняя остаётся рядом. Отметку установки стираем — на старте маршруты и WARP из бэкапа соберутся в конфиг Xray заново
if (existsSync(join(DATA, 'restore.db'))) {
  const keep = `${DBF}.before-restore-${Math.floor(Date.now() / 1000)}`;
  if (existsSync(DBF)) renameSync(DBF, keep);
  for (const s of ['-wal', '-shm']) rmSync(DBF + s, { force: true });
  renameSync(join(DATA, 'restore.db'), DBF);
  const r = new DatabaseSync(DBF); r.exec("DELETE FROM settings WHERE k IN ('apply_sig', 'managed'); DELETE FROM sessions"); r.close();
  console.log('база восстановлена из бэкапа, прежняя:', keep);
}
const db = openDb(DBF);
const xray = new Xray({ bin: env('MP_XRAY_BIN', '/usr/local/bin/xray'), config: env('MP_XRAY_CONFIG', '/usr/local/etc/xray/config.json'), api: env('MP_XRAY_API', '127.0.0.1:10085') });
const BUNDLED = new URL('./autoXRAY2.sh', import.meta.url);

// ---------- первичная настройка ----------
if (!getSetting(db, 'admin_hash')) setSetting(db, 'admin_hash', hashPassword(env('MP_ADMIN_PASSWORD', token(9))));
if (!getSetting(db, 'admin_login')) setSetting(db, 'admin_login', env('MP_ADMIN_LOGIN', 'admin'));
for (const [k, v] of Object.entries({ server_name: env('MP_SERVER_NAME', 'monolit'), domain: env('MP_DOMAIN', ''), fp: 'firefox', kinds: env('MP_KINDS', 'vision,hy2'), autoupdate: '1', support_url: '', update_hours: '12' }))
  if (!getSetting(db, k) && v !== '') setSetting(db, k, v);
// Домен сменили переустановкой (--reconfigure --domain): берём новый. Сменённый в настройках админки — не трогаем
if (env('MP_DOMAIN', '') && getSetting(db, 'domain_env') !== env('MP_DOMAIN', '')) {
  if (getSetting(db, 'domain_env')) setSetting(db, 'domain', env('MP_DOMAIN', ''));
  setSetting(db, 'domain_env', env('MP_DOMAIN', ''));
}

const log = (...a) => console.log(new Date().toISOString(), ...a);
// День для графиков — в часовом поясе сервера (install.sh передаёт его в MP_TZ)
const TZ = (() => { try { new Intl.DateTimeFormat('en-CA', { timeZone: env('MP_TZ', 'UTC') }); return env('MP_TZ', 'UTC'); } catch { return 'UTC'; } })();
const DAYF = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
const dayOf = t => DAYF.format(new Date(t * 1000));
const kindsOn = () => nodes.kindsOn();   // входы этого сервера, которые есть в наборах подключений
const serverCtx = () => {
  const d = xray.detect();
  return { name: getSetting(db, 'server_name'), domain: getSetting(db, 'domain'), fp: getSetting(db, 'fp', 'firefox'), xhttpPath: d.xhttp?.path || '', ports: { vision: d.vision?.port, hy2: d.hy2?.port, xhttp: 443 },
    reality: d.vision?.reality ? mgr.reality() : null };   // основной вход переключён на Reality: ключ и короткий id для подписок и мостов
};
const users = () => db.prepare('SELECT * FROM users ORDER BY id').all();
const userById = id => db.prepare('SELECT * FROM users WHERE id = ?').get(id);
// AmneziaWG — отдельный сервер рядом с Xray; после его запуска сразу сверяем пользователей
const awg = createAwg({ db, log, agent, domain: () => getSetting(db, 'domain'), outIp: () => getSetting(db, 'out_ip', ''), onReady: () => { queueSync({ full: true }) } });
const exits = createExits({ db, log });
const cf = createCf({ db, log });   // A-запись домена в Cloudflare: меняется сама при переводе VPN на другой адрес
const nodes = createNodes({ db, xray, log, dayOf, server: serverCtx, users, awg, exits });
exits.migrate();
xray.linkClients = nodes.linkClients;
// у подключения с выходом свой ключ человека: mp-N-x<выход><d|b>
xray.userKeys = nodes.userKeys;
xray.allKeys = () => exits.all().flatMap(x => [`x${x.id}d`, `x${x.id}b`]);
// Выходы через прокси: в каждый конфиг, который пишет админка, — свои выходы, балансировщики и правила
xray.extra = cfg => exits.parts(cfg, nodes.exitGroups(xray.detect(cfg)), {
  direct: (cfg.outbounds || []).find(o => o.protocol === 'freedom')?.tag || 'direct',
  block: (cfg.outbounds || []).find(o => o.protocol === 'blackhole')?.tag || 'block' });

// ---------- шаблон autoXRAY ----------
const activeTpl = () => { const r = db.prepare("SELECT * FROM templates WHERE status = 'active' ORDER BY id DESC LIMIT 1").get(); return r ? { ...r, parsed: JSON.parse(r.body) } : null; };

async function validate(parsed) {
  const ctx = { user: { uuid: '00000000-0000-4000-8000-000000000000', hy2: 'test' }, server: { ...serverCtx(), domain: serverCtx().domain || 'example.com' } };
  for (const c of renderAll(parsed, ctx, ['vision', 'hy2', 'xhttp'])) { const err = await xray.test(c); if (err) return `${c.remarks}: ${err}`; }
  return '';
}

async function checkTemplate(force = false) {
  let sh, source = 'github';
  try {
    const r = await fetch(AUTOXRAY_URL, { signal: AbortSignal.timeout(20000) });
    if (!r.ok) throw new Error('HTTP ' + r.status); sh = await r.text();
  } catch (e) {
    log('autoXRAY не скачался:', e.message);
    if (activeTpl()) return { ok: false, error: 'GitHub недоступен: ' + e.message };
    sh = readFileSync(BUNDLED, 'utf8'); source = 'bundled';
  }
  let parsed; try { parsed = parseAutoXray(sh); } catch (e) { return { ok: false, error: 'Не разобрался шаблон: ' + e.message }; }
  const hash = hashOf(parsed), cur = activeTpl();
  if (cur?.hash === hash) { setSetting(db, 'tpl_checked', now()); return { ok: true, changed: false }; }
  const known = db.prepare('SELECT * FROM templates WHERE hash = ?').get(hash);
  if (known && !force) return { ok: known.status !== 'rejected', changed: false, error: known.error };
  const error = await validate(parsed);
  const body = JSON.stringify(parsed);
  if (error) {
    db.prepare("INSERT INTO templates (hash, source, body, status, error, fetched_at) VALUES (?, ?, ?, 'rejected', ?, ?) ON CONFLICT(hash) DO UPDATE SET error = excluded.error").run(hash, source, body, error, now());
    log('новый шаблон не прошёл проверку:', error); return { ok: false, error };
  }
  if (cur && getSetting(db, 'autoupdate') !== '1' && !force) {
    db.prepare("INSERT OR IGNORE INTO templates (hash, source, body, status, fetched_at) VALUES (?, ?, ?, 'pending', ?)").run(hash, source, body, now());
    return { ok: true, changed: false, pending: true };
  }
  db.exec("UPDATE templates SET status = 'previous' WHERE status IN ('active')");
  db.prepare("INSERT INTO templates (hash, source, body, status, fetched_at) VALUES (?, ?, ?, 'active', ?) ON CONFLICT(hash) DO UPDATE SET status = 'active', error = ''").run(hash, source, body, now());
  setSetting(db, 'tpl_checked', now());
  log('шаблон autoXRAY применён, версия', parsed.version, hash);
  return { ok: true, changed: true };
}

function rollbackTemplate() {
  const cur = activeTpl(), prev = db.prepare("SELECT id FROM templates WHERE status = 'previous' ORDER BY id DESC LIMIT 1").get();
  if (!cur || !prev) return false;
  db.prepare("UPDATE templates SET status = 'rolledback' WHERE id = ?").run(cur.id);
  db.prepare("UPDATE templates SET status = 'active' WHERE id = ?").run(prev.id);
  return true;
}

// ---------- синхронизация с Xray и лимиты ----------
let applied = null;           // id пользователей, которые сейчас есть в Xray
let xrayOk = false, lastSync = 0, syncError = '';
let online = {};              // { id: { ip: время } } — кто сейчас подключён
const over = new Map();       // id → сколько проверок подряд IP больше разрешённого

const BLOCK_SECS = 600;       // на сколько отключать за лишние устройства
// Лишние устройства: две проверки подряд (2 минуты) — чтобы смена сети на телефоне (Wi‑Fi → LTE) не считалась вторым устройством
function checkDevices(t) {
  for (const u of db.prepare('SELECT id, name, devices, block_until FROM users WHERE devices > 0 AND enabled = 1').all()) {
    const n = Object.keys(online[u.id] || {}).length;
    if (n > u.devices && !(u.block_until > t)) {
      const c = (over.get(u.id) || 0) + 1; over.set(u.id, c);
      if (c >= 2) { db.prepare('UPDATE users SET block_until = ? WHERE id = ?').run(t + BLOCK_SECS, u.id); over.delete(u.id); log(`${u.name}: ${n} IP при разрешённых ${u.devices}, отключён на ${BLOCK_SECS / 60} минут`); }
    } else over.delete(u.id);
  }
}

// AmneziaWG: пользователи, трафик и кто в сети. Отдельно от Xray: сбой одного не мешает другому
async function awgSync(full) {
  const t = now(), day = dayOf(t);
  const r = await awg.sync(users().filter(u => userState(u, t) === 'active' && nodes.wantsAwg(u)), { full });
  for (const [id, v] of Object.entries(r.traffic)) {
    db.prepare('UPDATE users SET up = up + ?, down = down + ?, last_active = ? WHERE id = ?').run(v.up, v.down, t, Number(id));
    db.prepare('INSERT INTO traffic_daily (user_id, day, up, down) VALUES (?, ?, ?, ?) ON CONFLICT(user_id, day) DO UPDATE SET up = up + excluded.up, down = down + excluded.down').run(Number(id), day, v.up, v.down);
  }
  return r.online;
}

async function sync({ full = false } = {}) {
  const awgOnline = await awgSync(full).catch(e => { log('awg:', e.message); return {} });
  try {
    xrayOk = await xray.apiAlive();
    if (!xrayOk) { syncError = 'API Xray не отвечает'; return; }
    const t = now(), traffic = await xray.takeTraffic(), day = dayOf(t);
    const add = db.prepare('UPDATE users SET up = up + ?, down = down + ?, last_active = ? WHERE id = ?');
    const addDay = db.prepare('INSERT INTO traffic_daily (user_id, day, up, down) VALUES (?, ?, ?, ?) ON CONFLICT(user_id, day) DO UPDATE SET up = up + excluded.up, down = down + excluded.down');
    for (const [id, v] of Object.entries(traffic)) if (v.up || v.down) { add.run(v.up, v.down, t, Number(id)); addDay.run(Number(id), day, v.up, v.down); }
    // Месячный лимит: в день сброса счётчик с нуля, и человек снова активен
    for (const u of db.prepare("SELECT id, name, created_at FROM users WHERE period = 'month' AND reset_at > 0 AND reset_at <= ?").all(t)) {
      db.prepare('UPDATE users SET up = 0, down = 0, reset_at = ? WHERE id = ?').run(nextReset(u.created_at, t), u.id); log(`${u.name}: месячный трафик обнулён`);
    }
    online = await xray.online();
    for (const [id, ips] of Object.entries(nodes.onlineMap())) Object.assign(online[id] ||= {}, ips);   // кто подключён через ноды
    for (const [id, ips] of Object.entries(awgOnline)) Object.assign(online[id] ||= {}, ips);           // и через AmneziaWG
    checkDevices(t);
    const kinds = kindsOn(), all = users(), want = new Set(all.filter(u => userState(u, t) === 'active').map(u => u.id));
    const was = applied || new Set();
    if (full || !applied) {
      for (const u of all) if (want.has(u.id)) await xray.addUser(u, kinds).catch(() => {});   // уже есть — Xray ответит ошибкой, это нормально
      for (const u of all) if (want.has(u.id)) await xray.removeUser(u.id, ['vision', 'hy2', 'xhttp'], nodes.userKeys(u));   // ключи на выходы, которые сняли
      for (const u of all) if (!want.has(u.id)) await xray.removeUser(u.id, ['vision', 'hy2', 'xhttp']);
      await nodes.ensureLinks();
    } else {
      for (const id of want) if (!was.has(id)) await xray.addUser(userById(id), kinds).catch(e => log('adu', id, e.message));
      for (const id of was) if (!want.has(id)) await xray.removeUser(id, ['vision', 'hy2', 'xhttp']);
    }
    const changed = full || !applied || want.size !== was.size || [...want].some(id => !was.has(id));
    if (changed) {
      const r = xray.writeUsers(all.filter(u => want.has(u.id)), ['vision', 'hy2', 'xhttp'].filter(k => xray.detect()[k]));
      // правила выходов поменялись (выход назначили, сняли, человек выключился): живому Xray без перезапуска.
      // Не вышло (старый Xray без RoutingService) — перезапуск, конфиг уже записан
      await xray.liveRules(r.was, r.now).catch(e => { log('правила выходов без перезапуска не легли:', e.message.slice(0, 200)); return mgr.server.restart() });
    }
    applied = want; lastSync = t; syncError = '';
  } catch (e) { syncError = e.message; log('sync:', e.message); }
}

// Всё, что пишет config.json Xray (синхронизация и правки из админки), идёт по очереди
let syncing = Promise.resolve();
const queue = fn => { const p = syncing.then(fn); syncing = p.catch(() => {}); return p; };
const queueSync = opts => queue(() => sync(opts));
const watch = createWatch({ db, log, server: () => getSetting(db, 'server_name', 'monolit'), adminUrl: () => [`https://${getSetting(db, 'domain')}${ADMIN}/`, ...entries().map((e) => `Запасной вход: ${e.url}`)].join('\n') });
const mgr = createManager({ db, xray, queue, log, activeUsers: () => users().filter(u => userState(u) === 'active'), onRestart: () => { queueSync({ full: true }); syncIpEnv().catch(() => {}); } });

// ---------- HTTP ----------
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json' };
const send = (res, code, body, headers = {}) => { res.writeHead(code, { 'cache-control': 'no-store', ...headers }); res.end(body); };
const json = (res, code, obj) => send(res, code, JSON.stringify(obj), { 'content-type': 'application/json; charset=utf-8' });
const readRaw = (req, max) => new Promise((ok, bad) => { const parts = []; let n = 0; req.on('data', c => { n += c.length; if (n > max) { bad(new Error('Файл слишком большой')); req.destroy(); } else parts.push(c); }); req.on('end', () => ok(Buffer.concat(parts).toString('utf8'))); req.on('error', bad); });
const readBody = req => new Promise((ok, bad) => { let s = ''; req.on('data', c => { s += c; if (s.length > 1e5) req.destroy(); }); req.on('end', () => { try { ok(s ? JSON.parse(s) : {}); } catch { bad(new Error('bad json')); } }); });
const cookie = req => Object.fromEntries((req.headers.cookie || '').split(';').map(s => s.trim().split('=')).filter(p => p[0]));
// Перед monolit всегда nginx на 127.0.0.1: он кладёт адрес посетителя в X-Real-IP (сам заголовок клиента затирает)
const ipOf = req => req.headers['x-real-ip'] || req.socket.remoteAddress;

function staticFile(res, rel) {
  const p = normalize(join(UI, rel));
  if (!p.startsWith(normalize(UI)) || !existsSync(p) || !statSync(p).isFile()) return send(res, 404, 'not found');
  send(res, 200, readFileSync(p), { 'content-type': MIME[extname(p)] || 'application/octet-stream', 'cache-control': rel.endsWith('.html') ? 'no-store' : 'public, max-age=86400' });
}

function authed(req) {
  const t = cookie(req).mp_s; if (!t) return false;
  const s = db.prepare('SELECT expires FROM sessions WHERE token = ?').get(t);
  return !!s && s.expires > now();
}

const fails = new Map();   // защита входа от перебора
const LOGIN_TRIES = 5, LOGIN_PAUSE = 600;
function publicUser(u) {
  const st = userState(u);
  const ips = online[u.id] || {};
  return { id: u.id, name: u.name, note: u.note, token: u.token, limit: u.limit_bytes, expire: u.expire_at, enabled: !!u.enabled, up: u.up, down: u.down, used: u.up + u.down, state: st, last_active: u.last_active, last_sub: u.last_sub, created: u.created_at,
    period: u.period || '', reset_at: u.reset_at, devices: u.devices, block_until: u.block_until, kit: nodes.kitOf(u).id, exit: u.exit_id, exit_fail: u.exit_fail,
    online: Object.entries(ips).map(([ip, at]) => ({ ip, at: Number(at) })).sort((a, b) => b.at - a.at) };
}
const cleanDevices = v => Math.min(50, Math.max(0, Math.round(Number(v) || 0)));
const cleanPeriod = v => v === 'month' ? 'month' : '';
const subUrl = u => `https://${getSetting(db, 'domain')}/s/${u.token}`;

// ---------- обновление из релизов GitHub ----------
const semver = v => (String(v).replace(/^v/, '').match(/^(\d+)\.(\d+)\.(\d+)/) || []).slice(1).map(Number);
const newer = (a, b) => { const x = semver(a), y = semver(b); if (x.length < 3 || y.length < 3) return false; for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i]; return false; };
async function checkUpdate() {
  try {
    const r = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers: { 'user-agent': 'monolit-proxy', accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(15000) });
    if (r.status === 404) setSetting(db, 'upd_latest', '');   // релизов ещё нет
    else if (!r.ok) throw new Error('GitHub ответил ' + r.status);
    else {
      const j = await r.json();
      setSetting(db, 'upd_latest', JSON.stringify({ tag: j.tag_name, name: j.name || j.tag_name, notes: String(j.body || '').slice(0, 4000), published: Math.floor(Date.parse(j.published_at) / 1000) || 0, url: j.html_url }));
    }
    setSetting(db, 'upd_error', ''); setSetting(db, 'upd_checked', now()); return { ok: true };
  } catch (e) { setSetting(db, 'upd_error', e.message); setSetting(db, 'upd_checked', now()); return { ok: false, error: e.message }; }
}
function updateState() {
  let latest = null, status = null;
  try { latest = JSON.parse(getSetting(db, 'upd_latest', '') || 'null'); } catch {}
  try { status = JSON.parse(readFileSync(join(DATA, 'update.json'), 'utf8')); } catch {}   // пишет update.sh на хосте
  return { current: VERSION, latest, available: !!latest && newer(latest.tag, VERSION), checked: Number(getSetting(db, 'upd_checked', '0')), error: getSetting(db, 'upd_error', ''), status, repo: REPO };
}

// ---------- адрес сервера ----------
const cleanDomain = v => { const d = String(v || '').trim().toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/[/:?#].*$/, '').replace(/\.$/, ''); return /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(d) && d.length <= 253 ? d : '' };
const resolve = resolve4;
// Адреса, которыми пользуется monolit: входящий (способ «Второй IP») и исходящий. Помощник проверяет, записаны ли они
// в настройках сети и нет ли там старых адресов, которых на сервере уже нет (agent/netsave.sh)
// Входящий IP: что стоит в конфиге Xray (его меняют из админки без переустановки), иначе — из установки
const ip2 = () => env('MP_MODE', '') === 'ip2' ? mgr.inbound.current() || env('MP_IP2', '') : '';
async function netsave(op) {
  const ips = [...new Set([ip2(), getSetting(db, 'out_ip', '')].filter(Boolean))];
  const r = await agent(['netsave', op, ...ips].join(' '), 30000);
  const lines = r.out.split('\n').filter(Boolean);
  let state = null; try { state = JSON.parse(lines.at(-1)) } catch {}
  return { code: r.code, state: r.code === 2 ? null : state, text: lines.filter((l) => !l.startsWith('{')).at(-1) || '' };
}
// Запасные входы: админка и подписки по адресам, которые не блокируются вместе с адресом VPN.
// Сайт nginx на основном адресе (способ «Второй IP», выбирают в «Адрес») и ноды с доменом: их страница пересылает запросы сюда
const entryHost = () => env('MP_MODE', '') === 'ip2' ? getSetting(db, 'entry', env('MP_ENTRY', '')) : '';
const entries = () => [...(entryHost() ? [{ kind: 'site', name: '', host: entryHost() }] : []), ...nodes.mirrors().map((m) => ({ kind: 'node', ...m }))]
  .map((e) => ({ ...e, url: `https://${e.host}${ADMIN}/` }));

// Новые адреса сервера: хостер добавил IP — админка предложит перевести на него VPN. Помощник отвечает быстро, спрашиваем раз в 5 минут
let netNow = null;
async function netLook() {
  const r = await agent('ips', 15000);
  try { if (r.code === 0) netNow = JSON.parse(r.out.split('\n').pop() || 'null') } catch {}
  // когда адрес увидели впервые: те, что были при первом взгляде, новыми не считаются
  if (netNow?.ips) {
    const had = getSetting(db, 'ips_seen', ''), seen = had ? JSON.parse(had) : null, next = { ...(seen || {}) };
    for (const a of netNow.ips) if (!(a in next)) next[a] = seen ? now() : 0;
    if (JSON.stringify(next) !== had) setSetting(db, 'ips_seen', JSON.stringify(next));
  }
  return netNow;
}
// на главную — только адрес, который появился недавно: давно лежащий свободный адрес не напоминание
const newIps = () => { let seen = {}; try { seen = JSON.parse(getSetting(db, 'ips_seen', '') || '{}') } catch {} return freshIps().filter((a) => seen[a] > 0 && now() - seen[a] < 3 * 86400) };
const PRIVATE = /^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.)/;   // внутренние сети: снаружи на такой адрес не подключиться
const freshIps = () => env('MP_MODE', '') !== 'ip2' || !netNow ? [] : (netNow.ips || []).filter((a) => !PRIVATE.test(a) && a !== netNow.ip1 && a !== ip2() && a !== getSetting(db, 'out_ip', '') && a !== (netNow.fwd || '').split('>')[0]);

// Перевод VPN на другой адрес сервера без переустановки. Xray перезапускается в фоне; когда поднялся —
// адрес в настройки установки и сети, пересылка со старого адреса (пока расходится DNS), проверка из России, Telegram
async function syncIpEnv() {
  const live = ip2(), known = getSetting(db, 'ip2_known', '') || env('MP_IP2', '');
  if (!live || live === known) return;
  const r = await agent('ipmove env ' + live, 15000);
  if (r.code !== 0) return log('адрес в настройках установки не записался:', r.out);
  setSetting(db, 'ip2_known', live);
  const sig = r.out.split('\n').filter(Boolean).pop() || '';
  if (sig.startsWith('ip2|')) setSetting(db, 'apply_sig', sig);   // иначе запуск после обновления принял бы это за новую установку
}
async function afterMove(jobId, from, to) {
  for (let i = 0; i < 100; i++) { await new Promise((r) => setTimeout(r, 1500)); const j = mgr.server.job(); if (j.id !== jobId || !j.running) break }
  const j = mgr.server.job();
  if (j.id !== jobId || j.running || !j.ok) { watch.notify(`перевести VPN на ${to} не получилось, работает прежний адрес ${from}`); return }
  await syncIpEnv();
  const f = await agent(`ipmove fwd ${from} ${to}`, 15000);
  log('входящий адрес:', from, '→', to, f.code === 0 ? 'старый пересылается на новый' : 'старый отключён: ' + f.out.trim());
  await netsave('fix').then((r) => log('настройки сети после смены адреса:', r.state?.manual || r.text)).catch((e) => log('настройки сети:', e.message));
  await netLook();
  const domain = getSetting(db, 'domain'), dns = await resolve(domain);
  let rec = dns.includes(to) ? '' : ` Поменяйте A-запись ${domain} на ${to}`;
  if (cf.on()) {
    try { await cf.setA(domain, to); rec = ` A-запись ${domain} в Cloudflare изменена` }
    catch (e) { log('Cloudflare:', e.message); rec = ` A-запись в Cloudflare не изменилась: ${e.message}. Поменяйте её на ${to} сами` }
  }
  await watch.notify(`VPN принимает подключения на ${to}.` + rec);
  setTimeout(() => watch.check(false, to), 20_000);   // открывается ли новый адрес из России — придёт отдельным сообщением, если нет
}

function addrState() {
  let job = null; try { job = JSON.parse(readFileSync(join(DATA, 'reconf.json'), 'utf8')) } catch {}
  return { mode: env('MP_MODE', ''), domain: getSetting(db, 'domain'), ip2: ip2(), entry: entryHost(), entries: entries(), out_ip: mgr.stateForAdmin().out_ip, alt: env('MP_ALT', '').replace(/^"|"$/g, '').split(/[,;]/).map(x => x.split(/[:|]/)[0]).filter(x => cleanDomain(x)), admin: ADMIN, job, watch: watch.state() };
}

function stateForAdmin() {
  const tpl = activeTpl(), d = xray.detect();
  return {
    update: updateState(),
    watch: watch.state(),
    addr_new: newIps(),
    ...nodes.state(),
    exits: exits.state(),
    awg: awg.stateForAdmin(),
    users: users().map(u => ({ ...publicUser(u), url: subUrl(u) })),
    settings: { server_name: getSetting(db, 'server_name'), domain: getSetting(db, 'domain'), fp: getSetting(db, 'fp'), kinds: getSetting(db, 'kinds'), autoupdate: getSetting(db, 'autoupdate') === '1', support_url: getSetting(db, 'support_url'), update_hours: Number(getSetting(db, 'update_hours', '12')), login: getSetting(db, 'admin_login'),
      tg_token: getSetting(db, 'tg_token', ''), tg_chat: getSetting(db, 'tg_chat', '') },
    xray: { ok: xrayOk, error: syncError, last_sync: lastSync, inbounds: { vision: d.vision, hy2: d.hy2, xhttp: d.xhttp } },
    template: tpl ? { version: tpl.parsed.version, hash: tpl.hash, source: tpl.source, since: tpl.fetched_at, checked: Number(getSetting(db, 'tpl_checked', '0')),
      rollback: !!db.prepare("SELECT 1 FROM templates WHERE status = 'previous'").get(),
      pending: db.prepare("SELECT hash, fetched_at FROM templates WHERE status = 'pending' ORDER BY id DESC LIMIT 1").get() || null,
      rejected: db.prepare("SELECT hash, error, fetched_at FROM templates WHERE status = 'rejected' ORDER BY id DESC LIMIT 1").get() || null } : null,
  };
}

async function adminApi(req, res, path) {
  if (path === '/api/login' && req.method === 'POST') {
    // 5 неудачных попыток — пауза 10 минут от последней. Счёт сбрасывается сам через 10 минут без ошибок
    const ip = ipOf(req); let f = fails.get(ip) || { n: 0, t: 0 };
    if (now() - f.t >= LOGIN_PAUSE) f = { n: 0, t: 0 };
    if (f.n >= LOGIN_TRIES) return json(res, 429, { error: 'Слишком много попыток', wait: LOGIN_PAUSE - (now() - f.t) });
    const { login, password } = await readBody(req);
    const okLogin = String(login || '').trim().toLowerCase() === getSetting(db, 'admin_login').toLowerCase();
    if (!checkPassword(String(password || ''), getSetting(db, 'admin_hash')) || !okLogin) {
      fails.set(ip, { n: f.n + 1, t: now() });
      return json(res, 401, { error: 'Неверный логин или пароль', left: LOGIN_TRIES - f.n - 1, wait: LOGIN_PAUSE });
    }
    fails.delete(ip);
    const t = token(24); db.prepare('INSERT INTO sessions (token, expires) VALUES (?, ?)').run(t, now() + 30 * 86400);
    return send(res, 200, '{}', { 'content-type': 'application/json', 'set-cookie': `mp_s=${t}; Path=${ADMIN}; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 86400}` });
  }
  if (!authed(req)) return json(res, 401, { error: 'Нужно войти' });
  const m = /^\/api\/users\/(\d+)(\/[a-z-]+)?$/.exec(path);
  if (/^\/api\/(nodes|kits|lines)(\/|$)/.test(path)) return nodes.api(req, res, path, { json, readBody, state: stateForAdmin, sync: () => queueSync({ full: true }), resolve: resolve4 });

  if (path === '/api/logout' && req.method === 'POST') { db.prepare('DELETE FROM sessions WHERE token = ?').run(cookie(req).mp_s); return send(res, 200, '{}', { 'set-cookie': `mp_s=; Path=${ADMIN}; Max-Age=0` }); }
  if (path === '/api/state' && req.method === 'GET') return json(res, 200, stateForAdmin());

  if (path === '/api/users' && req.method === 'POST') {
    const b = await readBody(req), name = String(b.name || '').trim().slice(0, 40);
    if (!name) return json(res, 400, { error: 'Нужно имя' });
    const t = now(), period = cleanPeriod(b.period);
    const r = db.prepare('INSERT INTO users (name, note, token, uuid, hy2, limit_bytes, expire_at, created_at, period, reset_at, devices) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .run(name, String(b.note || '').slice(0, 200), token(16), newUuid(), token(12), Math.max(0, Math.round(Number(b.limit) || 0)), Math.max(0, Math.round(Number(b.expire) || 0)), t,
        period, period ? nextReset(t, t) : 0, cleanDevices(b.devices));
    db.prepare('UPDATE users SET kit_id = ? WHERE id = ?').run(nodes.pickKit(b.kit), r.lastInsertRowid);
    const x = exits.pick(b); if (!x.error) db.prepare('UPDATE users SET exit_id = ?, exit_fail = ? WHERE id = ?').run(x.exit_id, x.exit_fail, r.lastInsertRowid);
    await queueSync(); return json(res, 200, { user: { ...publicUser(userById(r.lastInsertRowid)), url: subUrl(userById(r.lastInsertRowid)) } });
  }
  if (m && m[2] === '/links' && req.method === 'GET') {
    // отдельные ссылки на каждое подключение: для приложений, которые подписку целиком не берут
    const u = userById(Number(m[1])); if (!u) return json(res, 404, { error: 'Нет такого пользователя' });
    return json(res, 200, { links: nodes.linkList(u, serverCtx()) });
  }
  if (m && !m[2] && req.method === 'PATCH') {
    const u = userById(Number(m[1])); if (!u) return json(res, 404, { error: 'Нет такого пользователя' });
    const b = await readBody(req);
    const f = { name: b.name !== undefined ? String(b.name).trim().slice(0, 40) || u.name : u.name, note: b.note !== undefined ? String(b.note).slice(0, 200) : u.note,
      limit_bytes: b.limit !== undefined ? Math.max(0, Math.round(Number(b.limit) || 0)) : u.limit_bytes, expire_at: b.expire !== undefined ? Math.max(0, Math.round(Number(b.expire) || 0)) : u.expire_at,
      enabled: b.enabled !== undefined ? (b.enabled ? 1 : 0) : u.enabled,
      period: b.period !== undefined ? cleanPeriod(b.period) : u.period, devices: b.devices !== undefined ? cleanDevices(b.devices) : u.devices };
    // месячный лимит включили — первый сброс в ближайший «день рождения» подписки; выключили — сбросов нет
    const reset_at = f.period === u.period ? u.reset_at : f.period ? nextReset(u.created_at, now()) : 0;
    // лимит устройств сменили или сняли блокировку вручную — блокировка снимается
    const block_until = b.unblock || f.devices !== u.devices || !f.enabled ? 0 : u.block_until;
    if (block_until !== u.block_until) over.delete(u.id);
    db.prepare('UPDATE users SET name = ?, note = ?, limit_bytes = ?, expire_at = ?, enabled = ?, period = ?, reset_at = ?, devices = ?, block_until = ? WHERE id = ?')
      .run(f.name, f.note, f.limit_bytes, f.expire_at, f.enabled, f.period, reset_at, f.devices, block_until, u.id);
    if (b.kit !== undefined) db.prepare('UPDATE users SET kit_id = ? WHERE id = ?').run(nodes.pickKit(b.kit), u.id);
    const x = exits.pick(b, u); if (x.error) return json(res, 400, { error: x.error });
    db.prepare('UPDATE users SET exit_id = ?, exit_fail = ? WHERE id = ?').run(x.exit_id, x.exit_fail, u.id);
    // набор или выход поменялся — правила выходов пересобрать
    await queueSync({ full: b.kit !== undefined && Number(b.kit) !== u.kit_id || x.exit_id !== u.exit_id || x.exit_fail !== u.exit_fail }); return json(res, 200, { user: { ...publicUser(userById(u.id)), url: subUrl(userById(u.id)) } });
  }
  if (m && m[2] === '/reset' && req.method === 'POST') { db.prepare('UPDATE users SET up = 0, down = 0 WHERE id = ?').run(Number(m[1])); await queueSync(); return json(res, 200, {}); }
  if (m && m[2] === '/regen' && req.method === 'POST') {
    // новая ссылка и новые ключи: старая ссылка и старые конфиги перестают работать
    const id = Number(m[1]); await xray.removeUser(id, ['vision', 'hy2', 'xhttp']);
    db.prepare('UPDATE users SET token = ?, uuid = ?, hy2 = ? WHERE id = ?').run(token(16), newUuid(), token(12), id);
    awg.dropKeys(id);   // новые ключи AmneziaWG появятся при сверке
    applied?.delete(id); await queueSync(); return json(res, 200, { user: { ...publicUser(userById(id)), url: subUrl(userById(id)) } });
  }
  if (m && !m[2] && req.method === 'DELETE') {
    const id = Number(m[1]); await xray.removeUser(id, ['vision', 'hy2', 'xhttp']);
    db.prepare('DELETE FROM users WHERE id = ?').run(id); db.prepare('DELETE FROM traffic_daily WHERE user_id = ?').run(id); applied?.delete(id); await queueSync({ full: false }); return json(res, 200, {});
  }
  if (path === '/api/settings' && req.method === 'PATCH') {
    const b = await readBody(req);
    if (b.server_name !== undefined) setSetting(db, 'server_name', String(b.server_name).trim().slice(0, 24) || 'monolit');
    if (b.domain !== undefined) setSetting(db, 'domain', String(b.domain).trim().toLowerCase());
    if (b.fp !== undefined && /^[a-z0-9]+$/.test(b.fp)) setSetting(db, 'fp', b.fp);
    if (b.autoupdate !== undefined) setSetting(db, 'autoupdate', b.autoupdate ? '1' : '0');
    if (b.support_url !== undefined) setSetting(db, 'support_url', String(b.support_url).trim().slice(0, 200));
    if (b.update_hours !== undefined) setSetting(db, 'update_hours', String(Math.min(48, Math.max(1, Math.round(Number(b.update_hours) || 12)))));
    if (b.tg_token !== undefined) { const t = String(b.tg_token).trim(); if (t && !/^\d{5,}:[\w-]{20,}$/.test(t)) return json(res, 400, { error: 'Токен бота выглядит так: 123456789:AA…, его выдаёт @BotFather' }); setSetting(db, 'tg_token', t) }
    if (b.tg_chat !== undefined) { const c = String(b.tg_chat).trim(); if (c && !/^-?\d{3,20}$|^@\w{4,}$/.test(c)) return json(res, 400, { error: 'ID чата: число, например 123456789' }); setSetting(db, 'tg_chat', c) }
    if (b.login !== undefined) {
      const l = String(b.login).trim();
      if (!/^[\p{L}\p{N}_.@-]{3,32}$/u.test(l)) return json(res, 400, { error: 'Логин: от 3 до 32 букв, цифр и знаков . _ - @' });
      if (l !== getSetting(db, 'admin_login')) { setSetting(db, 'admin_login', l); db.exec('DELETE FROM sessions'); }
    }
    if (b.password) { if (String(b.password).length < 8) return json(res, 400, { error: 'Пароль короче 8 символов' });
      if (String(b.password).trim() !== String(b.password)) return json(res, 400, { error: 'Пароль без пробелов в начале и в конце' }); setSetting(db, 'admin_hash', hashPassword(String(b.password))); db.exec('DELETE FROM sessions'); }
    await queueSync({ full: true }); return json(res, 200, stateForAdmin());
  }
  // ---------- сервер, маршруты, WARP, протоколы, история ----------
  const qs = new URL(req.url, 'http://x').searchParams, M = req.method;
  const done = (r) => r.ok ? json(res, 200, { ...r, manage: mgr.stateForAdmin() }) : json(res, 400, { error: r.error, log: r.log || '' });
  const agentDone = (r, okText) => r.code === 0 ? json(res, 200, { ok: true, out: r.out, text: okText }) : json(res, r.code < 0 ? 503 : 400, { error: r.out.split(/\n/).filter(Boolean).slice(-3).join(' ') || 'Не получилось' });
  const managed = () => mgr.stateForAdmin().managed || (json(res, 409, { error: 'Xray настроен не через monolit (autoXRAY). Чтобы управлять им здесь, переустановите: install.sh --reconfigure --replace-autoxray' }), false);
  let mm;
  // ---------- выходы через прокси ----------
  // Новый, изменённый или удалённый выход меняет состав выходов Xray: применяется с перезапуском (как маршруты),
  // Xray не принял — база возвращается как была
  if (path === '/api/exits' && M === 'POST' || (mm = /^\/api\/exits\/(\d+)(\/check)?$/.exec(path))) {
    const b = M === 'GET' || M === 'DELETE' ? {} : await readBody(req);
    const old = mm && exits.byId(mm[1]); if (mm && !old) return json(res, 404, { error: 'Нет такого выхода' });
    const out = (r) => r.ok ? json(res, 200, { ...r, exits: exits.state() }) : json(res, 400, { error: r.error });
    if (mm?.[2] && M === 'POST') { await exits.check(old.id); return out({ ok: true }) }
    if (M === 'DELETE') {
      const us = db.prepare('SELECT id FROM users WHERE exit_id = ?').all(old.id).map(x => x.id), ls = db.prepare('SELECT id FROM kit_lines WHERE exit_id = ?').all(old.id).map(x => x.id);
      db.prepare("UPDATE users SET exit_id = 0 WHERE exit_id = ?").run(old.id); db.prepare("UPDATE kit_lines SET exit_id = 0 WHERE exit_id = ?").run(old.id); db.prepare('DELETE FROM exits WHERE id = ?').run(old.id);
      const r = await mgr.apply(`Выход «${old.name}» удалён`, null);
      if (!r.ok) {
        db.prepare('INSERT INTO exits (id, name, host, port, user, pass, ok, udp, ip, country, ms, error, checked_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(old.id, old.name, old.host, old.port, old.user, old.pass, old.ok, old.udp, old.ip, old.country, old.ms, old.error, old.checked_at, old.created_at);
        for (const id of us) db.prepare('UPDATE users SET exit_id = ? WHERE id = ?').run(old.id, id);
        for (const id of ls) db.prepare('UPDATE kit_lines SET exit_id = ? WHERE id = ?').run(old.id, id);
      }
      return out(r);
    }
    const name = b.name !== undefined ? String(b.name).trim().slice(0, 40) : old?.name || '';
    const px = b.proxy !== undefined ? parseProxy(b.proxy) : old;
    if (!px) return json(res, 400, { error: 'Прокси выглядит так: 1.2.3.4:1080 или логин:пароль@1.2.3.4:1080' });
    const same = old && px.host === old.host && px.port === old.port && px.user === old.user && px.pass === old.pass;
    if (same) { db.prepare('UPDATE exits SET name = ? WHERE id = ?').run(name || old.name, old.id); return out({ ok: true }) }
    // новый адрес проверяем до того, как пустить через него людей
    const c = await checkProxy(px);
    if (!c.ok) return json(res, 400, { error: 'Прокси не отвечает: ' + c.error });
    const nm = name || [flagOf(c.country), c.ip || px.host].filter(Boolean).join(' ');
    let id;
    if (old) db.prepare('UPDATE exits SET name = ?, host = ?, port = ?, user = ?, pass = ?, udp = -1 WHERE id = ?').run(nm, px.host, px.port, px.user, px.pass, id = old.id);
    else id = Number(db.prepare('INSERT INTO exits (name, host, port, user, pass, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(nm, px.host, px.port, px.user, px.pass, now()).lastInsertRowid);
    db.prepare("UPDATE exits SET ok = 1, udp = ?, ip = ?, country = ?, ms = ?, error = '', checked_at = ? WHERE id = ?").run(c.udp == null ? -1 : c.udp ? 1 : 0, c.ip, c.country, c.ms, now(), id);
    const r = await mgr.apply(old ? `Выход «${nm}» изменён` : `Выход «${nm}» добавлен`, null);
    if (!r.ok) { if (old) db.prepare('UPDATE exits SET name = ?, host = ?, port = ?, user = ?, pass = ?, udp = ? WHERE id = ?').run(old.name, old.host, old.port, old.user, old.pass, old.udp, old.id); else db.prepare('DELETE FROM exits WHERE id = ?').run(id) }
    return out({ ...r, exit: id });
  }
  // ---------- трафик по дням ----------
  if (path === '/api/traffic' && M === 'GET') {
    const days = Math.min(90, Math.max(7, Number(qs.get('days')) || 30)), uid = Number(qs.get('user')) || 0, t = now(), list = [];
    for (let i = days - 1; i >= 0; i--) { const d = dayOf(t - i * 86400); if (!list.includes(d)) list.push(d); }
    const rows = uid ? db.prepare('SELECT day, up, down FROM traffic_daily WHERE user_id = ? AND day >= ?').all(uid, list[0])
      : db.prepare('SELECT day, SUM(up) AS up, SUM(down) AS down FROM traffic_daily WHERE day >= ? GROUP BY day').all(list[0]);
    const by = new Map(rows.map(r => [r.day, r]));
    return json(res, 200, { tz: TZ, days: list.map(d => ({ day: d, up: Number(by.get(d)?.up || 0), down: Number(by.get(d)?.down || 0) })) });
  }
  // ---------- бэкап и восстановление ----------
  if (path === '/api/backup' && M === 'GET') {
    const tmp = join(DATA, `backup-${process.pid}.db`); rmSync(tmp, { force: true });
    db.exec(`VACUUM INTO '${tmp.replace(/'/g, "''")}'`);
    const files = {}; for (const f of DATA_FILES) if (existsSync(join(DATA, f))) files[f] = readFileSync(join(DATA, f), 'utf8');
    const srv = getSetting(db, 'server_name', 'monolit');
    const body = JSON.stringify({ monolit_backup: 1, version: VERSION, created: now(), server: srv, domain: getSetting(db, 'domain'), users: users().length, db: readFileSync(tmp).toString('base64'), files });
    rmSync(tmp, { force: true });
    const name = `monolit-${srv.replace(/[^\w.-]+/g, '_') || 'backup'}-${dayOf(now())}.json`;
    return send(res, 200, body, { 'content-type': 'application/json; charset=utf-8', 'content-disposition': `attachment; filename="${name}"` });
  }
  if (path === '/api/restore' && M === 'POST') {
    let b; try { b = JSON.parse(await readRaw(req, 64e6)); } catch (e) { return json(res, 400, { error: /большой/.test(e.message) ? e.message : 'Это не файл бэкапа monolit' }); }
    if (b?.monolit_backup !== 1 || typeof b.db !== 'string') return json(res, 400, { error: 'Это не файл бэкапа monolit' });
    const tmp = join(DATA, 'restore-check.db'); writeFileSync(tmp, Buffer.from(b.db, 'base64'));
    let n = 0;
    try { const c = new DatabaseSync(tmp, { readOnly: true }); n = c.prepare('SELECT COUNT(*) AS n FROM users').get().n; if (!c.prepare("SELECT 1 FROM settings WHERE k = 'admin_hash'").get()) throw new Error(); c.close(); }
    catch { rmSync(tmp, { force: true }); return json(res, 400, { error: 'В файле нет базы monolit или она повреждена' }); }
    const t = now();
    for (const [f, text] of Object.entries(b.files || {})) if (DATA_FILES.includes(f) && typeof text === 'string') {
      if (existsSync(join(DATA, f))) renameSync(join(DATA, f), join(DATA, `${f}.before-restore-${t}`));
      writeFileSync(join(DATA, f), text, { mode: 0o600 });
    }
    renameSync(tmp, join(DATA, 'restore.db'));
    json(res, 200, { ok: true, users: n, server: b.server || '' });
    // база подменится при запуске: Docker поднимет админку сам (--restart unless-stopped)
    log('восстановление из бэкапа, пользователей', n, '— перезапуск');
    try { db.exec('PRAGMA wal_checkpoint(TRUNCATE)'); } catch {}
    setTimeout(() => process.exit(0), 500); return;
  }
  // ---------- обновление monolit ----------
  if (path === '/api/update' && M === 'GET') return json(res, 200, updateState());
  if (path === '/api/update/check' && M === 'POST') { const r = await checkUpdate(); return json(res, r.ok ? 200 : 502, r.ok ? updateState() : { error: 'Не получилось проверить: ' + r.error }); }
  if (path === '/api/update' && M === 'POST') {
    const st = updateState();
    if (!st.available) return json(res, 400, { error: 'Новой версии нет' });
    if (st.status?.state === 'running' && now() - st.status.at < 900) return json(res, 409, { error: 'Обновление уже идёт' });
    const r = await agent('self-update ' + st.latest.tag, 30000);
    if (r.code === 0) return json(res, 200, { ok: true });
    return json(res, r.code < 0 ? 503 : 400, { error: r.code === 2 ? 'Помощник на сервере старый и не умеет обновлять. Один раз обновите вручную: git pull и bash install.sh --yes' : (r.out || 'Обновление не запустилось') });
  }
  // ---------- адрес сервера: домен, IP, способ ----------
  if (path === '/api/addr' && M === 'GET') {
    const net = await agent('netinfo', 30000);
    let info = null; try { info = net.code === 0 ? JSON.parse(net.out.split('\n').pop() || '{}') : null } catch {}
    if (info) netNow = { ips: info.ips, ip1: info.ip1, fwd: info.fwd || '' };
    return json(res, 200, { ...addrState(), cf: await cf.state(getSetting(db, 'domain')), fresh: freshIps(), fwd: netNow?.fwd || '', net: info, net_error: info ? '' : net.out || 'Помощник не ответил', dns: await resolve(getSetting(db, 'domain')), netsave: (await netsave('check')).state });
  }
  if (path === '/api/addr/netsave' && M === 'POST') {
    const r = await netsave('fix');
    if (r.code === 0) { log('настройки сети:', r.text); return json(res, 200, { ok: true, text: r.text, netsave: r.state }) }
    return json(res, r.code < 0 ? 503 : 400, { error: r.state?.manual || r.text || 'Не получилось', netsave: r.state });
  }
  if (path === '/api/addr/dns' && M === 'POST') {
    const d = cleanDomain((await readBody(req)).domain); if (!d) return json(res, 400, { error: 'Домен выглядит так: vpn.example.ru' });
    return json(res, 200, { domain: d, a: await resolve(d) });
  }
  if (path === '/api/addr' && M === 'POST') {
    const b = await readBody(req), cur = addrState();
    if (cur.mode === 'existing' || !cur.mode) return json(res, 409, { error: 'Xray настроен не через monolit: адрес меняется переустановкой' });
    if (cur.job?.state === 'running' && now() - cur.job.at < 900) return json(res, 409, { error: 'Смена адреса уже идёт' });
    const mode = ['bare', 'front', 'ip2'].includes(b.mode) ? b.mode : cur.mode, domain = b.domain === undefined ? cur.domain : cleanDomain(b.domain);
    if (!domain) return json(res, 400, { error: 'Домен выглядит так: vpn.example.ru' });
    const ip2 = mode === 'ip2' ? String(b.ip2 || '').trim() : '-';
    if (mode === 'ip2' && !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip2)) return json(res, 400, { error: 'Выберите второй IP для Xray' });
    const drop = b.drop ? cleanDomain(b.drop) : '-';
    if (b.drop && !drop) return json(res, 400, { error: 'Нет такого запасного домена' });
    mgr.keep();
    const r = await agent(`reconf ${mode} ${domain} ${ip2} ${b.keep_old && domain !== cur.domain ? 1 : 0} ${b.force ? 1 : 0} ${drop}`, 30000);
    if (r.code === 0) { log('смена адреса:', cur.mode, cur.domain, '→', mode, domain, ip2); return json(res, 200, { ok: true }) }
    setSetting(db, 'pre_reconf', '');
    return json(res, r.code < 0 ? 503 : 400, { error: r.code === 2 && /нет такой команды/.test(r.out) ? 'Помощник на сервере старый: обновите monolit' : r.out || 'Не запустилось' });
  }
  if (path === '/api/addr/job' && M === 'GET') return json(res, 200, addrState());
  // Перевести VPN на другой адрес сервера (хостер добавил новый IP): без переустановки, сайты и админка не перезапускаются
  if (path === '/api/addr/ip' && M === 'POST') {
    if (!managed()) return;
    const to = String((await readBody(req)).ip || '').trim(), from = ip2();
    if (env('MP_MODE', '') !== 'ip2' || !from) return json(res, 409, { error: 'Адрес так меняется только при способе «Второй IP»' });
    if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(to)) return json(res, 400, { error: 'Выберите адрес из списка' });
    const c = await agent('ipmove check ' + to, 15000);
    if (c.code !== 0) return json(res, c.code < 0 ? 503 : 400, { error: c.code === 2 && /нет такой команды/.test(c.out) ? 'Помощник на сервере старый: обновите monolit' : { 3: `Адреса ${to} на сервере нет`, 4: `${to} — основной адрес, на нём сайты`, 5: c.out.trim() }[c.code] || c.out.trim() || 'Не получилось' });
    const r = await mgr.inbound.set(to);
    if (r.ok && r.pending) afterMove(r.job, from, to).catch((e) => log('смена входящего адреса:', e.message));
    return done(r);
  }
  // Cloudflare: подключить токеном (пустой — отключить) и поменять A-запись на входящий адрес сейчас
  if (path === '/api/addr/cf' && M === 'POST') {
    try { return json(res, 200, { cf: await cf.connect((await readBody(req)).token, getSetting(db, 'domain')) }) }
    catch (e) { return json(res, 400, { error: e.message }) }
  }
  if (path === '/api/addr/cf/sync' && M === 'POST') {
    const d = getSetting(db, 'domain'), want = ip2() || netNow?.ip1 || '';
    if (!want) return json(res, 400, { error: 'Не знаю адрес сервера: откройте страницу ещё раз' });
    try { await cf.setA(d, want); return json(res, 200, { cf: await cf.state(d), ip: want }) }
    catch (e) { return json(res, 400, { error: e.message }) }
  }
  if (path === '/api/addr/unfwd' && M === 'POST') { const r = await agent('ipmove unfwd', 15000); await netLook(); return r.code === 0 ? json(res, 200, { ok: true, fwd: netNow?.fwd || '' }) : json(res, 400, { error: r.out.trim() || 'Не получилось' }) }
  // Запасной вход в сайте nginx на основном адресе: домен сайта или пусто — убрать
  if (path === '/api/addr/entry' && M === 'POST') {
    const b = await readBody(req), d = b.domain ? cleanDomain(b.domain) : '';
    if (b.domain && !d) return json(res, 400, { error: 'Выберите сайт из списка' });
    const r = await agent(d ? 'entry set ' + d : 'entry drop', 60000);
    if (r.code !== 0) return json(res, r.code < 0 ? 503 : 400, { error: r.code === 2 && /нет такой команды/.test(r.out) ? 'Помощник на сервере старый: обновите monolit' : r.out.split('\n').filter(Boolean).pop() || 'Не получилось' });
    setSetting(db, 'entry', d); log('запасной вход:', d || 'убран');
    return json(res, 200, { ok: true, entry: d, entries: entries() });
  }
  if (path === '/api/egress' && M === 'POST') { if (!managed()) return; return done(await mgr.egress.set((await readBody(req)).ip)) }
  if (path === '/api/watch' && M === 'POST') {
    const b = await readBody(req);
    if (b.on !== undefined) setSetting(db, 'watch_on', b.on ? '1' : '0');
    if (b.every !== undefined) setSetting(db, 'watch_every', String(Math.min(360, Math.max(30, Math.round(Number(b.every) || 60)))));
    watch.plan(); return json(res, 200, { watch: watch.state() });
  }
  if (path === '/api/watch/check' && M === 'POST') { await watch.check(true); return json(res, 200, { watch: watch.state() }) }
  if (path === '/api/notify/test' && M === 'POST') {
    const b = await readBody(req), token = String(b.token ?? getSetting(db, 'tg_token', '')).trim();
    let chat = String(b.chat ?? getSetting(db, 'tg_chat', '')).trim();
    try {
      if (!chat) { chat = await tgFindChat(token); if (!chat) return json(res, 400, { error: 'Напишите боту /start в Telegram и нажмите «Проверить» ещё раз' }) }
      await tgSend(token, chat, `monolit, ${getSetting(db, 'server_name', 'monolit')}: уведомления работают`);
      return json(res, 200, { ok: true, chat });
    } catch (e) { return json(res, 400, { error: e.message }) }
  }
  if (path === '/api/server' && M === 'GET') return json(res, 200, { manage: mgr.stateForAdmin(), status: await mgr.server.status(), presets: Object.entries(PRESETS).map(([id, p]) => ({ id, ...p })) });
  if (path === '/api/server/reload' && M === 'POST') return agentDone(await mgr.server.reload(), 'nginx перечитал настройки');
  if ((mm = /^\/api\/server\/(restart|update|geo|cert)$/.exec(path)) && M === 'POST') return json(res, 200, await mgr.server[mm[1]]());
  if (path === '/api/job' && M === 'GET') return json(res, 200, { job: mgr.server.job(), manage: mgr.stateForAdmin() });
  if (path === '/api/server/journal' && M === 'GET') { const r = await mgr.server.journal(qs.get('n')); return r.code === 0 ? json(res, 200, { text: r.out }) : json(res, 503, { error: r.out }); }
  if (path === '/api/routes/reach' && M === 'GET') { const r = await mgr.routes.reach(qs.get('host')); return json(res, r.error ? 400 : 200, r); }
  if (path === '/api/routes/test' && M === 'GET') return json(res, 200, mgr.routes.test(qs.get('host') || ''));
  if (path.startsWith('/api/routes') || path.startsWith('/api/warp') || path === '/api/proto' || path.startsWith('/api/history')) { if (!managed()) return; }
  if (path === '/api/routes' && M === 'DELETE') return done(await mgr.routes.clear());
  if (path === '/api/routes' && M === 'POST') return done(await mgr.routes.add(await readBody(req)));
  if (path === '/api/routes/order' && M === 'POST') return done(await mgr.routes.order([].concat((await readBody(req)).ids || [])));
  if (path === '/api/routes/preset' && M === 'POST') return done(await mgr.routes.preset((await readBody(req)).name));
  if ((mm = /^\/api\/routes\/(\d+)$/.exec(path))) {
    if (M === 'PATCH') return done(await mgr.routes.edit(Number(mm[1]), await readBody(req)));
    if (M === 'DELETE') return done(await mgr.routes.remove(Number(mm[1])));
  }
  if (path === '/api/warp' && M === 'POST') return done(await mgr.warp.toggle(!!(await readBody(req)).on));
  if (path === '/api/warp/register' && M === 'POST') return done(await mgr.warp.register());
  if (path === '/api/warp/license' && M === 'POST') return done(await mgr.warp.license((await readBody(req)).key));
  if (path === '/api/warp/check' && M === 'POST') { const r = await mgr.warp.check(); return json(res, r.warp ? 200 : 400, r.warp ? r : { error: r.error }); }
  if (path === '/api/proto' && M === 'PATCH') return done(await mgr.proto.set(await readBody(req)));
  if (path === '/api/awg' && M === 'PATCH') { const r = await awg.set(await readBody(req)); if (r.error) return json(res, 400, { error: r.error }); await queueSync({ full: true }); return json(res, 200, stateForAdmin()); }
  if (path === '/api/mtg' && M === 'POST') return done(await mgr.proto.mtg(!!(await readBody(req)).on));
  if ((mm = /^\/api\/history\/(\d+)(\/rollback)?$/.exec(path))) {
    if (mm[2] && M === 'POST') return done(await mgr.history.rollback(Number(mm[1])));
    if (!mm[2] && M === 'GET') { const b = mgr.history.show(Number(mm[1])); return b ? send(res, 200, b, { 'content-type': 'application/json; charset=utf-8' }) : json(res, 404, { error: 'Нет такой версии' }); }
  }
  if (path === '/api/template/check' && req.method === 'POST') { const r = await checkTemplate(true); return json(res, 200, { ...r, state: stateForAdmin() }); }
  if (path === '/api/template/rollback' && req.method === 'POST') { const ok = rollbackTemplate(); return json(res, ok ? 200 : 400, ok ? stateForAdmin() : { error: 'Нет прошлой версии шаблона' }); }
  return json(res, 404, { error: 'Нет такого действия' });
}

// ---------- подписка ----------
const CLIENT_UA = /happ|incy|v2ray|streisand|hiddify|clash|mihomo|sing-?box|shadowrocket|foxray|karing|nekobox|throne|xray|v2box|v2rayng|okhttp|dart|cfnetwork/i;
const b64 = s => Buffer.from(s, 'utf8').toString('base64');

function subscription(req, res, tok, mode) {
  const u = db.prepare('SELECT * FROM users WHERE token = ?').get(tok);
  if (!u) return send(res, 404, 'not found');
  const st = userState(u), ctx = { user: u, server: serverCtx() }, tpl = activeTpl();
  const ua = req.headers['user-agent'] || '';
  const browser = mode === 'auto' && /mozilla/i.test(ua) && (req.headers.accept || '').includes('text/html') && !CLIENT_UA.test(ua);
  const info = { name: u.name, server: ctx.server.name, state: st, used: u.up + u.down, limit: u.limit_bytes, expire: u.expire_at, url: subUrl(u), support: getSetting(db, 'support_url'), configs: st === 'active' ? nodes.links(u, ctx.server) : [] };
  if (browser) {
    const page = readFileSync(join(UI, 'sub.html'), 'utf8').replace('"__SUB__"', JSON.stringify(info).replace(/</g, '\\u003c'));
    return send(res, 200, page, { 'content-type': MIME['.html'], 'x-robots-tag': 'noindex', 'referrer-policy': 'no-referrer' });
  }
  db.prepare('UPDATE users SET last_sub = ? WHERE id = ?').run(now(), u.id);
  const headers = {
    'profile-title': 'base64:' + b64(`${ctx.server.name}`),
    'profile-update-interval': getSetting(db, 'update_hours', '12'),
    'subscription-userinfo': `upload=${u.up};download=${u.down};total=${u.limit_bytes};expire=${u.expire_at}`,
    'profile-web-page-url': subUrl(u),
    ...(getSetting(db, 'support_url') ? { 'support-url': getSetting(db, 'support_url') } : {}),
    ...(st !== 'active' ? { announce: 'base64:' + b64({ off: 'Доступ отключён', expired: 'Срок подписки закончился', limit: 'Трафик по подписке закончился', devices: 'Подключено больше устройств, чем разрешено. Доступ вернётся через 10 минут' }[st]) } : {}),
  };
  const asLinks = mode === 'links' || (mode === 'auto' && /v2rayn\b|nekobox|throne|shadowrocket/i.test(ua) && !/v2rayng/i.test(ua));
  if (asLinks) return send(res, 200, b64(info.configs.join('\n')), { ...headers, 'content-type': 'text/plain; charset=utf-8' });
  // AmneziaWG внутри JSON понимает только monolit client: остальным клиентам такой конфиг не отдаём
  const body = st === 'active' && tpl ? nodes.render(tpl.parsed, u, ctx.server, { awg: /monolit-client\//i.test(ua) }) : [];
  return send(res, 200, JSON.stringify(body, null, 2), { ...headers, 'content-type': 'application/json; charset=utf-8' });
}

const http = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://x'), p = decodeURIComponent(url.pathname);
    let m;
    if ((m = /^\/s\/([A-Za-z0-9_-]{10,40})(?:\/(json|links))?$/.exec(p)) && req.method === 'GET') return subscription(req, res, m[1], m[2] || 'auto');
    if (p.startsWith('/s/_n/')) return await nodes.http(req, res, p.slice(6), { send, readRaw, ipOf, changed: () => { queueSync({ full: true }) } });
    if (p.startsWith('/s/_/')) return staticFile(res, p.slice(5));
    if (p === ADMIN) return send(res, 301, '', { location: ADMIN + '/' });
    if (p === ADMIN + '/') return staticFile(res, 'admin.html');
    if (p.startsWith(ADMIN + '/_/')) return staticFile(res, p.slice(ADMIN.length + 3));
    if (p.startsWith(ADMIN + '/api/')) return await adminApi(req, res, p.slice(ADMIN.length));
    if (p === '/healthz') return json(res, 200, { ok: true, xray: xrayOk });
    // Посторонний на домене VPN видит обычную с виду страницу входа (nginx отдаёт сюда всё, что не сайт). Вход всегда «неверный»
    if (p === '/api/v1/authenticate' && req.method === 'POST') { req.resume(); return json(res, 401, { success: false, code: 'ERR_INVALID_CREDENTIALS', message: 'Неверный логин или пароль' }); }
    if (req.method === 'GET' || req.method === 'HEAD') {
      if (/^\/_\/(gate\.(css|js)|manrope-[a-z-]+\.woff2)$/.test(p)) return staticFile(res, p.slice(3));
      return staticFile(res, 'gate.html');
    }
    send(res, 404, 'not found');
  } catch (e) { log('http', e.message); if (!res.headersSent) json(res, 500, { error: 'Ошибка сервера' }); }
});
http.listen(Number(PORT), HOST, async () => {
  log(`monolit proxy слушает ${HOST}:${PORT}, админка ${ADMIN}/`);
  if (!activeTpl()) await checkTemplate();
  await queueSync({ full: true });
  await mgr.start().catch(e => log('manage:', e.message));
  setInterval(() => queueSync(), 60_000);
  setInterval(() => queueSync({ full: true }), 10 * 60_000);    // если Xray перезапускали — вернуть пользователей
  setInterval(() => exits.checkAll().catch(e => log('выходы:', e.message)), 5 * 60_000);   // прокси отвечает? IP, страна, UDP
  setInterval(() => checkTemplate().catch(e => log('tpl', e.message)), 24 * 3600_000);
  setInterval(() => db.prepare('DELETE FROM sessions WHERE expires < ?').run(now()), 3600_000);
  setInterval(() => db.prepare('DELETE FROM traffic_daily WHERE day < ?').run(dayOf(now() - 400 * 86400)), 24 * 3600_000);
  setTimeout(() => checkUpdate(), 30_000);
  watch.start();
  if (env('MP_MODE', '') === 'ip2') { netLook().catch(() => {}); setInterval(() => netLook().catch(() => {}), 5 * 60_000) }
  // Адрес меняли из админки: после перезапуска сообщить итог в Telegram и проверить новый адрес
  const job = addrState().job;
  if (job && job.state !== 'running' && String(job.at) !== getSetting(db, 'reconf_seen', '')) {
    setSetting(db, 'reconf_seen', String(job.at));
    if (now() - job.at < 3600) {
      watch.notify(job.state === 'done' ? `адрес сервера сменён, домен ${getSetting(db, 'domain')}` : `сменить адрес не получилось: ${job.text}`);
      if (job.state === 'done') {
        setTimeout(() => watch.check(true), 60_000);
        // новый адрес — в настройки сети, старый оттуда убрать: иначе после перезагрузки сервер останется без VPN
        netsave('fix').then((r) => log('настройки сети после смены адреса:', r.state?.manual || r.text)).catch((e) => log('настройки сети:', e.message));
      }
    }
  }
  setInterval(() => checkUpdate(), 24 * 3600_000);
});
