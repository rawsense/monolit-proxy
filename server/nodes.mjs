// Ноды и наборы подключений.
// Нода — второй сервер с Xray и агентом: ставится одной командой, сама раз в 30 секунд приходит сюда за конфигом
// и приносит трафик. Роли у ноды нет: чем она работает, решает подключение в наборе.
// Подключение: сервер (out, 0 — этот сервер), мост (via, 0 — без моста), протокол. Человек подключается ко входу —
// мосту, если он есть, иначе к серверу. Вход на этом сервере — Vision, XHTTP или Hysteria2; вход на ноде — Reality,
// а если ноде задан домен и она выпустила сертификат — ещё Vision (порт 8443) и Hysteria2.
import { createHash, generateKeyPairSync, randomBytes, timingSafeEqual } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { now, token, newUuid, getSetting, userState } from './db.mjs';
import { renderOne } from './template.mjs';

const sha = (s) => createHash('sha256').update(String(s)).digest('hex');
const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && timingSafeEqual(x, y) };
const J = (s, d) => { try { return JSON.parse(s) } catch { return d } };
export const LINK = (id) => `mpn-${id}`;                       // клиент «нода → следующий сервер», в трафик людей не идёт
export const PROTO = { vision: 'Vision', xhttp: 'XHTTP', hy2: 'Hysteria2', reality: 'Reality', awg: 'AmneziaWG' };
const LOCAL = ['vision', 'xhttp', 'hy2', 'awg'];               // awg — не вход Xray: отдельный сервер AmneziaWG (awg.mjs)
const NODE_TLS = ['vision', 'hy2'];                           // входы ноды, которым нужен её домен и сертификат
const VISION_PORT = 8443;                                      // 443 на ноде занят Reality
const SEEN = 100;                                              // секунд без отчёта — нода «не на связи»
// Ключ человека на ноде — свой для каждого подключения: по нему нода понимает, куда его вести
export const lineUuid = (uuid, lineId) => { const h = sha(`${uuid}:${lineId}`); return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}` };
// Защита соединения клиента со входом Reality: k — { pub, sid } входа
export const realityStream = (serverName, fingerprint, k) => ({ network: 'raw', security: 'reality', realitySettings: { serverName, fingerprint, publicKey: k.pub, shortId: k.sid } });
const cleanHost = (v) => { const d = String(v || '').trim().toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/[/:?#].*$/, ''); return /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(d) && d.length <= 253 ? d : '' };

// Что видит посторонний, открывший домен ноды в браузере: обычная с виду страница входа
const PAGE = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Вход</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0c0e;color:#e6e7ea;font:15px/1.5 system-ui,sans-serif}form{width:min(320px,90vw);display:grid;gap:12px}h1{font-size:20px;font-weight:600;margin:0 0 4px}input,button{height:40px;border-radius:10px;border:1px solid #2a2c31;background:#141518;color:inherit;padding:0 12px;font:inherit}button{background:#e6e7ea;color:#0b0c0e;border:0;font-weight:600}p{margin:0;color:#e5484d;min-height:22px}</style></head>
<body><form onsubmit="event.preventDefault();this.querySelector('p').textContent='Неверный логин или пароль'"><h1>Вход</h1><input placeholder="Логин" autocomplete="username"><input type="password" placeholder="Пароль" autocomplete="current-password"><button>Войти</button><p></p></form></body></html>
`;

export function createNodes({ db, xray, log, dayOf, server, users, awg, exits }) {
  // входы этого сервера: что нашлось в конфиге Xray, плюс AmneziaWG, если он включён
  const detect = () => ({ ...xray.detect(), ...(awg?.ready() ? { awg: { port: awg.conf().port } } : {}) });
  db.exec(`
    CREATE TABLE IF NOT EXISTS nodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      addr TEXT NOT NULL DEFAULT '',        -- IP, с которого нода пришла; по нему к ней подключаются
      join_hash TEXT NOT NULL DEFAULT '',   -- одноразовый ключ из команды установки
      key_hash TEXT NOT NULL DEFAULT '',    -- постоянный ключ агента; пусто — нода ещё не подключалась
      mask TEXT NOT NULL DEFAULT 'ya.ru',   -- под какой сайт маскируется вход Reality
      priv TEXT NOT NULL, pub TEXT NOT NULL, sid TEXT NOT NULL,
      link_uuid TEXT NOT NULL,              -- с этим ключом нода ходит на следующий сервер
      info TEXT NOT NULL DEFAULT '{}',      -- последний отчёт: версия Xray, нагрузка, ошибка
      seen_at INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS kits (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, is_default INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS kit_lines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kit_id INTEGER NOT NULL, pos INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL,
      out INTEGER NOT NULL DEFAULT 0, via INTEGER NOT NULL DEFAULT 0,
      proto TEXT NOT NULL, enabled INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS node_daily (node_id INTEGER NOT NULL, day TEXT NOT NULL, bytes INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (node_id, day));
  `);
  if (!db.prepare('PRAGMA table_info(nodes)').all().some((c) => c.name === 'domain')) db.exec("ALTER TABLE nodes ADD COLUMN domain TEXT NOT NULL DEFAULT ''");
  if (!db.prepare('PRAGMA table_info(nodes)').all().some((c) => c.name === 'ru_direct')) db.exec('ALTER TABLE nodes ADD COLUMN ru_direct INTEGER NOT NULL DEFAULT 0');
  if (!db.prepare('PRAGMA table_info(users)').all().some((c) => c.name === 'kit_id')) db.exec('ALTER TABLE users ADD COLUMN kit_id INTEGER NOT NULL DEFAULT 0');
  // Первая версия с наборами: что раньше включалось галочками «Протоколы в подписке», становится набором «Обычный» с теми же названиями
  if (!db.prepare('SELECT 1 FROM kits').get()) {
    const id = db.prepare("INSERT INTO kits (name, is_default) VALUES ('Обычный', 1)").run().lastInsertRowid;
    const on = getSetting(db, 'kinds', 'vision,hy2').split(','), name = getSetting(db, 'server_name', 'monolit');
    LOCAL.filter((k) => on.includes(k)).sort((a, b) => on.indexOf(a) - on.indexOf(b))
      .forEach((k, i) => db.prepare('INSERT INTO kit_lines (kit_id, pos, name, proto) VALUES (?, ?, ?, ?)').run(id, i, `${name} ${PROTO[k]}`, k));
  }

  const online = new Map();   // id ноды → { at, ips: { id человека: { ip: время } } }
  const all = () => db.prepare('SELECT * FROM nodes ORDER BY id').all();
  const byId = (id) => db.prepare('SELECT * FROM nodes WHERE id = ?').get(Number(id) || 0);
  const joined = (n) => !!(n && n.key_hash && n.addr);
  const tls = (n) => !!n?.domain && J(n.info, {}).cert === n.domain;   // домен задан, и нода сообщила, что сертификат на него есть
  const sni = (n) => tls(n) ? n.domain : n.mask;                       // с доменом Reality маскируется под собственный сайт ноды
  const kits = () => db.prepare('SELECT * FROM kits ORDER BY is_default DESC, id').all();
  const defKit = () => db.prepare('SELECT * FROM kits ORDER BY is_default DESC, id LIMIT 1').get();
  const kitOf = (u) => (u.kit_id && db.prepare('SELECT * FROM kits WHERE id = ?').get(u.kit_id)) || defKit();
  // набор человека хранится явно: смена набора «для новых людей» не трогает тех, кто уже есть
  const pickKit = (v) => (Number(v) && db.prepare('SELECT id FROM kits WHERE id = ?').get(Number(v))?.id) || defKit().id;
  db.prepare('UPDATE users SET kit_id = ? WHERE kit_id NOT IN (SELECT id FROM kits)').run(defKit().id);
  const linesOf = (kitId) => db.prepare('SELECT * FROM kit_lines WHERE kit_id = ? ORDER BY pos, id').all(kitId);
  const linesOn = () => db.prepare('SELECT * FROM kit_lines WHERE enabled = 1').all();
  const entry = (l) => l.via || l.out;

  // Работает ли подключение сейчас: вход есть и подключён, следующий сервер тоже
  function usable(l, d = detect()) {
    const e = entry(l);
    if (!e) return LOCAL.includes(l.proto) && !!d[l.proto];
    const en = byId(e); if (!joined(en)) return false;
    if (l.proto !== 'reality' && !(NODE_TLS.includes(l.proto) && tls(en))) return false;
    return !l.via || (l.out ? joined(byId(l.out)) : !!d.vision);
  }
  const whyNot = (l, d) => {
    if (usable(l, d)) return '';
    const e = entry(l);
    if (!e) return 'На этом сервере выключен такой вход';
    if (!joined(byId(e))) return 'Нода ещё не подключилась';
    if (l.proto !== 'reality' && !tls(byId(e))) return !byId(e).domain ? 'У ноды не задан домен' : (J(byId(e).info, {}).xray && !(J(byId(e).info, {}).v >= 2)) ? 'На ноде старый агент: запустите на ней команду для переустановки' : 'Нода ещё не выпустила сертификат';
    return 'Сервер, на который ведёт мост, недоступен';
  };

  // Какие входы этого сервера нужны людям: только те, что есть в наборах
  const kindsOn = (d = xray.detect()) => { const want = new Set(linesOn().filter((l) => !entry(l)).map((l) => l.proto)); return LOCAL.filter((k) => k !== 'awg' && want.has(k) && d[k]) };
  // Клиенты нод на входе Vision этого сервера: через них идут люди, пришедшие по мосту
  // Нода ходит дальше своим ключом, а для людей с выходом — ключом на этот выход: так сервер знает, в какой прокси их вести
  const linkUser = (n, k) => k ? { id: lineUuid(n.link_uuid, k), email: `${LINK(n.id)}-${k}` } : { id: n.link_uuid, email: LINK(n.id) };
  // Какие ключи выхода нужны ноде via на пути к серверу out (0 — этот сервер)
  function linkKeys(via, out) {
    const t = now(), ks = new Set(), kitsOn = new Map();
    for (const l of linesOn()) if (l.via === via && l.out === out) kitsOn.set(l.kit_id, (kitsOn.get(l.kit_id) || []).concat(l));
    if (!kitsOn.size) return [];
    for (const u of users()) if (userState(u, t) === 'active') for (const l of kitsOn.get(kitOf(u).id) || []) { const k = exits.key(exits.eff(u, l)); if (k) ks.add(k) }
    return [...ks];
  }
  const linkClients = () => all().filter(joined).flatMap((n) => ['', ...linkKeys(n.id, 0)].map((k) => ({ ...linkUser(n, k), flow: 'xtls-rprx-vision', level: 0 })));
  // У подключения этого сервера с выходом — свой ключ человека на выход: иначе два подключения одного входа
  // (Vision без выхода и Vision с выходом) неотличимы, и правило выхода забрало бы оба
  const keyed = (u, k) => ({ id: u.id, uuid: lineUuid(u.uuid, k), hy2: lineUuid(u.hy2, k), email: `mp-${u.id}-${k}` });
  const lineUser = (u, l) => { const k = !entry(l) && exits.key(exits.eff(u, l)); return k ? { ...u, ...keyed(u, k) } : u };
  // Ключи выходов, которые нужны человеку на входах этого сервера
  const userKeys = (u) => [...new Set(forUser(u).filter((l) => !entry(l) && l.proto !== 'awg').map((l) => exits.key(exits.eff(u, l))).filter(Boolean))].map((k) => keyed(u, k));
  // Выходы на этом сервере: люди на его входах и люди, пришедшие по мосту
  function exitGroups(d = xray.detect()) {
    const t = now(), g = new Map(), add = (users, inboundTag, e) => { const k = exits.key(e) + '|' + (inboundTag || ''); (g.get(k) || g.set(k, { users: [], inboundTag, exit: e }).get(k)).users.push(...users) };
    const lines = linesOn().filter((l) => usable(l)), byKit = new Map();
    for (const l of lines) byKit.set(l.kit_id, (byKit.get(l.kit_id) || []).concat(l));
    for (const u of users()) {
      if (userState(u, t) !== 'active') continue;
      const seen = new Set();
      for (const l of byKit.get(kitOf(u).id) || []) {
        const e = exits.eff(u, l), k = exits.key(e); if (!e || entry(l) || !d[l.proto] || seen.has(k)) continue;
        seen.add(k); add([`mp-${u.id}-${k}`], '', e);
      }
    }
    for (const n of all().filter(joined)) for (const k of linkKeys(n.id, 0)) { const x = exits.byId(k.slice(1, -1)); if (x) add([linkUser(n, k).email], '', { id: x.id, fail: k.endsWith('b') ? 'block' : 'direct', udp: x.udp !== 0 }) }
    return [...g.values()];
  }
  async function ensureLinks() { for (const c of linkClients()) await xray.addClient('vision', c).catch(() => {}) }

  // ---------- подписка ----------
  function forUser(u) { const d = detect(); return linesOf(kitOf(u).id).filter((l) => l.enabled && usable(l, d)) }
  // Кому из людей нужен пользователь на сервере AmneziaWG: у кого в наборе есть такое подключение
  const wantsAwg = (u) => forUser(u).some((l) => !entry(l) && l.proto === 'awg');
  // opts.awg — клиент понимает AmneziaWG внутри JSON (monolit client); остальным такой конфиг не отдаём: он бы у них не заработал
  function render(parsed, u, srv, opts = {}) {
    const out = [];
    for (const l of forUser(u)) {
      const e = entry(l), n = e && byId(e);
      if (!e && l.proto === 'awg') { const ob = opts.awg && awg.outbound(u); if (ob) out.push(renderOne(parsed, 'awg', { user: u, server: srv }, { remark: l.name, ob })); continue }
      const kind = !e ? l.proto : l.proto === 'hy2' ? 'hy2' : 'vision';
      if (!parsed.outbounds[kind]) continue;
      // основной вход этого сервера в режиме Reality: тот же ключ человека, другая защита соединения
      const mainReality = !e && l.proto === 'vision' && srv.reality ? (ob) => { ob.streamSettings = realityStream(srv.domain, srv.fp || 'firefox', srv.reality) } : null;
      out.push(renderOne(parsed, kind, { user: lineUser(u, l), server: srv }, { remark: l.name, outbound: !e ? mainReality : (ob) => {
        if (l.proto === 'hy2') {
          Object.assign(ob.settings, { address: n.domain, port: 443 });
          ob.streamSettings.tlsSettings.serverName = n.domain; ob.streamSettings.hysteriaSettings.auth = lineUuid(u.hy2, l.id);
          return;
        }
        const v = ob.settings.vnext[0]; v.users[0].id = lineUuid(u.uuid, l.id);
        if (l.proto === 'vision') { v.address = n.domain; v.port = VISION_PORT; ob.streamSettings.tlsSettings.serverName = n.domain; return }
        v.address = n.addr; v.port = 443;
        ob.streamSettings = realityStream(sni(n), srv.fp || 'firefox', n);
      } }));
    }
    return out;
  }
  function linkList(u, srv) {
    const fp = srv.fp || 'firefox', d = srv.domain, out = [], push = (l, url) => out.push({ name: l.name, proto: !entry(l) && l.proto === 'vision' && srv.reality ? PROTO.reality : PROTO[l.proto], url });
    for (const l of forUser(u)) {
      const e = entry(l), n = e && byId(e), name = encodeURIComponent(l.name), lu = lineUser(u, l);
      // AmneziaWG: ссылка vpn:// для приложения AmneziaVPN. В общий список ссылок подписки она не идёт: другие приложения её не понимают
      if (!e && l.proto === 'awg') { const url = awg.vpnLink(u, l.name); if (url) out.push({ name: l.name, proto: PROTO.awg, url, own: true }); continue }
      if (e && l.proto === 'hy2') push(l, `hysteria2://${encodeURIComponent(lineUuid(u.hy2, l.id))}@${n.domain}:443?sni=${n.domain}&alpn=h3#${name}`);
      else if (e && l.proto === 'vision') push(l, `vless://${lineUuid(u.uuid, l.id)}@${n.domain}:${VISION_PORT}?encryption=none&security=tls&type=tcp&flow=xtls-rprx-vision&sni=${n.domain}&fp=${fp}#${name}`);
      else if (e) push(l, `vless://${lineUuid(u.uuid, l.id)}@${n.addr}:443?encryption=none&security=reality&type=tcp&flow=xtls-rprx-vision&sni=${sni(n)}&fp=${fp}&pbk=${n.pub}&sid=${n.sid}#${name}`);
      else if (l.proto === 'vision' && srv.reality) push(l, `vless://${lu.uuid}@${d}:${srv.ports.vision}?encryption=none&security=reality&type=tcp&flow=xtls-rprx-vision&sni=${d}&fp=${fp}&pbk=${srv.reality.pub}&sid=${srv.reality.sid}#${name}`);
      else if (l.proto === 'vision') push(l, `vless://${lu.uuid}@${d}:${srv.ports.vision}?encryption=none&security=tls&type=tcp&flow=xtls-rprx-vision&sni=${d}&fp=${fp}#${name}`);
      else if (l.proto === 'xhttp' && srv.xhttpPath) push(l, `vless://${lu.uuid}@${d}:443?encryption=none&security=tls&type=xhttp&mode=stream-up&path=%2F${encodeURIComponent(srv.xhttpPath)}&sni=${d}&fp=${fp}&alpn=h2#${name}`);
      else if (l.proto === 'hy2') push(l, `hysteria2://${encodeURIComponent(lu.hy2)}@${d}:${srv.ports.hy2}?sni=${d}&alpn=h3#${name}`);
    }
    return out;
  }
  const links = (u, srv) => linkList(u, srv).filter((x) => !x.own).map((x) => x.url);

  // ---------- конфиг Xray для ноды ----------
  function nodeConfig(n) {
    const srv = server(), d = xray.detect(), t = now(), fp = srv.fp || 'firefox';
    const lines = linesOn().filter((l) => usable(l, d));
    const mine = lines.filter((l) => entry(l) === n.id), byKit = new Map();
    for (const l of mine) byKit.set(l.kit_id, (byKit.get(l.kit_id) || []).concat(l));
    const clients = [], vision = [], hy2 = [], route = new Map();   // «сервер назначения|ключ выхода» → почты людей, которых туда вести
    const groups = new Map(), here = (email, e) => { const k = exits.key(e); (groups.get(k) || groups.set(k, { users: [], exit: e }).get(k)).users.push(email) };
    for (const u of users()) {
      if (userState(u, t) !== 'active') continue;
      for (const l of byKit.get(kitOf(u).id) || []) {
        const email = `mp-${u.id}-${l.id}`;
        if (l.proto === 'hy2') hy2.push({ auth: lineUuid(u.hy2, l.id), email, level: 0 });
        else (l.proto === 'vision' ? vision : clients).push({ id: lineUuid(u.uuid, l.id), flow: 'xtls-rprx-vision', email, level: 0 });
        const e = exits.eff(u, l);
        if (l.via === n.id) { const k = `${l.out}|${exits.key(e)}`; route.set(k, (route.get(k) || []).concat(email)) }
        else if (e) here(email, e);   // подключение кончается на этой ноде: выход здесь
      }
    }
    // другие ноды, которые ведут людей через эту как через сервер
    const from = new Set(lines.filter((l) => l.via && l.out === n.id).map((l) => l.via));
    for (const id of from) { const a = byId(id); if (!joined(a)) continue;
      for (const k of ['', ...linkKeys(a.id, n.id)]) {
        clients.push({ ...linkUser(a, k), flow: 'xtls-rprx-vision', level: 0 });
        const x = k && exits.byId(k.slice(1, -1)); if (x) here(linkUser(a, k).email, { id: x.id, fail: k.endsWith('b') ? 'block' : 'direct', udp: x.udp !== 0 });
      } }
    const cert = { certificateFile: `/etc/letsencrypt/live/${n.domain}/fullchain.pem`, keyFile: `/etc/letsencrypt/live/${n.domain}/privkey.pem` };
    const outbounds = [{ tag: 'direct', protocol: 'freedom' }, { tag: 'block', protocol: 'blackhole' }], rules = [{ ip: ['geoip:private'], outboundTag: 'block' }];
    // Мост в России: российские сайты выпускает сам, со своего адреса, за границу уходит только остальное.
    // Адрес сайта нода узнаёт из самого запроса (sniffing), имена сама не разрешает: чужой DNS не влияет на то, куда пойдёт человек
    const ru = !!n.ru_direct && route.size > 0;
    const sniff = ru ? { sniffing: { enabled: true, destOverride: ['http', 'tls', 'quic'], routeOnly: true } } : {};
    if (ru) rules.push({ domain: ['geosite:category-ru', 'domain:ru', 'domain:su', 'domain:xn--p1ai'], outboundTag: 'direct' }, { ip: ['geoip:ru'], outboundTag: 'direct' });
    for (const [key, emails] of route) {
      const [to, k] = [Number(key.split('|')[0]), key.split('|')[1]], b = to && byId(to), tag = `to-${to}${k ? '-' + k : ''}`;
      const user = { id: linkUser(n, k).id, flow: 'xtls-rprx-vision', encryption: 'none' };
      outbounds.push(b
        ? { tag, protocol: 'vless', settings: { vnext: [{ address: b.addr, port: 443, users: [user] }] }, streamSettings: { network: 'raw', security: 'reality', realitySettings: { serverName: sni(b), fingerprint: fp, publicKey: b.pub, shortId: b.sid } } }
        : { tag, protocol: 'vless', settings: { vnext: [{ address: srv.domain, port: srv.ports.vision || 443, users: [user] }] },
          streamSettings: srv.reality ? realityStream(srv.domain, fp, srv.reality) : { network: 'raw', security: 'tls', tlsSettings: { serverName: srv.domain, fingerprint: fp } } });
      rules.push({ user: emails, outboundTag: tag });
    }
    return exits.parts({
      log: { loglevel: 'warning' },
      api: { tag: 'api', listen: '127.0.0.1:10085', services: ['HandlerService', 'StatsService'] },
      stats: {},
      policy: { levels: { 0: { statsUserUplink: true, statsUserDownlink: true, statsUserOnline: true } } },
      inbounds: [{ tag: 'in', listen: '0.0.0.0', port: 443, protocol: 'vless', ...sniff, settings: { clients, decryption: 'none' },
        // с доменом Reality показывает проверяющему собственный сайт ноды: её же вход Vision с настоящим сертификатом
        streamSettings: { network: 'raw', security: 'reality', realitySettings: { dest: tls(n) ? `127.0.0.1:${VISION_PORT}` : `${n.mask}:443`, serverNames: [sni(n)], privateKey: n.priv, shortIds: [n.sid] } } },
      ...(!tls(n) ? [] : [
        { tag: 'vision', listen: '0.0.0.0', port: VISION_PORT, protocol: 'vless', ...sniff, settings: { clients: vision, decryption: 'none', fallbacks: [{ dest: 8081 }] },   // не VPN — на страницу-заглушку
          streamSettings: { network: 'raw', security: 'tls', tlsSettings: { minVersion: '1.2', alpn: ['http/1.1'], certificates: [cert] } } },
        { tag: 'hy2', listen: '0.0.0.0', port: 443, protocol: 'hysteria', ...sniff, settings: { version: 2, clients: hy2 },
          streamSettings: { network: 'hysteria', security: 'tls', tlsSettings: { serverName: n.domain, alpn: ['h3'], certificates: [{ usage: 'encipherment', ...cert }] },
            hysteriaSettings: { version: 2 }, finalmask: { quicParams: { congestion: 'bbr' } } } }])],
      outbounds, routing: { domainStrategy: 'AsIs', rules },
    }, [...groups.values()]);
  }

  // ---------- отчёт ноды ----------
  const addUp = db.prepare('UPDATE users SET up = up + ?, down = down + ?, last_active = ? WHERE id = ?');
  const addDay = db.prepare('INSERT INTO traffic_daily (user_id, day, up, down) VALUES (?, ?, ?, ?) ON CONFLICT(user_id, day) DO UPDATE SET up = up + excluded.up, down = down + excluded.down');
  const addNode = db.prepare('INSERT INTO node_daily (node_id, day, bytes) VALUES (?, ?, ?) ON CONFLICT(node_id, day) DO UPDATE SET bytes = bytes + excluded.bytes');
  function report(n, b) {
    const t = now(), day = dayOf(t), sum = {};
    for (const blob of [].concat(b.stats || [])) for (const s of blob?.stat || []) {
      const m = /^user>>>mp-(\d+)(?:-\d+)?>>>traffic>>>(uplink|downlink)$/.exec(s.name); if (!m) continue;
      const r = sum[m[1]] ||= { up: 0, down: 0 }; r[m[2] === 'uplink' ? 'up' : 'down'] += Number(s.value || 0);
    }
    let bytes = 0;
    for (const [id, v] of Object.entries(sum)) if (v.up || v.down) { addUp.run(v.up, v.down, t, Number(id)); addDay.run(Number(id), day, v.up, v.down); bytes += v.up + v.down }
    if (bytes) addNode.run(n.id, day, bytes);
    const ips = {};
    for (const [email, v] of Object.entries(b.ips || {})) { const m = /^mp-(\d+)(?:-\d+)?$/.exec(email); if (m) Object.assign(ips[m[1]] ||= {}, v?.ips || {}) }
    online.set(n.id, { at: t, ips });
    const un = (v) => v ? Buffer.from(String(v), 'base64').toString('utf8').slice(0, 400) : '';
    db.prepare('UPDATE nodes SET seen_at = ?, info = ? WHERE id = ?').run(t, JSON.stringify({ xray: String(b.xray || '').slice(0, 20), load: String(b.load || '').slice(0, 8), active: b.active === 'active', err: un(b.err), cert: cleanHost(b.cert), cert_err: un(b.cert_err), v: Number(b.v) || 1, mirror: Number(b.mirror) === 1 }), n.id);
  }
  // Кто сейчас подключён через ноды: добавляется к тем, кого видит Xray этого сервера
  function onlineMap() {
    const t = now(), res = {};
    for (const [, o] of online) if (t - o.at < SEEN) for (const [id, ips] of Object.entries(o.ips)) Object.assign(res[id] ||= {}, ips);
    return res;
  }

  // ---------- что отдаём ноде ----------
  const script = (f) => readFileSync(new URL(f, import.meta.url), 'utf8');
  const base = () => `https://${server().domain}/s/_n`;
  const command = (tok) => `bash <(curl -fsSL ${base()}/install.sh) --join ${tok}`;
  async function http(req, res, sub, h) {
    const text = (code, body) => h.send(res, code, body, { 'content-type': 'text/plain; charset=utf-8' });
    if (sub === 'install.sh' && req.method === 'GET') return text(200, script('./node-install.sh').replaceAll('__URL__', base()));
    if (sub === 'agent.sh' && req.method === 'GET') return text(200, script('./node-agent.sh'));
    if (sub === 'mirror.py' && req.method === 'GET') return text(200, script('./node-mirror.py'));
    if (sub === 'page.html' && req.method === 'GET') return h.send(res, 200, PAGE, { 'content-type': 'text/html; charset=utf-8' });
    if (sub === 'join' && req.method === 'POST') {
      const tok = (await h.readRaw(req, 200)).trim();
      const n = tok.length >= 12 && db.prepare('SELECT * FROM nodes WHERE join_hash = ?').get(sha(tok));
      if (!n) return text(403, 'Ключ не подошёл или уже использован. Возьмите новую команду в админке');
      const key = token(24);
      db.prepare("UPDATE nodes SET join_hash = '', key_hash = ?, addr = ?, seen_at = ? WHERE id = ?").run(sha(key), h.ipOf(req), now(), n.id);
      log(`нода «${n.name}» подключилась с ${h.ipOf(req)}`);
      h.changed(); return text(200, `${n.id}.${key}`);
    }
    if (sub === 'sync' && req.method === 'POST') {
      const [id, key] = String(req.headers['x-node-key'] || '').split('.'), n = byId(id);
      if (!n || !n.key_hash || !key || !same(sha(key), n.key_hash)) return text(403, 'нет такой ноды');
      const b = J(await h.readRaw(req, 4e6), null); if (!b) return text(400, 'плохой отчёт');
      const ip = h.ipOf(req);
      if (ip && ip !== n.addr) { db.prepare('UPDATE nodes SET addr = ? WHERE id = ?').run(ip, n.id); log(`нода «${n.name}»: адрес сменился на ${ip}`) }
      report(n, b);
      const cur = byId(n.id), cfg = JSON.stringify(nodeConfig(cur), null, 2), sig = sha(cfg).slice(0, 16);
      // агент второй версии получает в первой строке ещё домен (для сертификата) и подпись свежего агента (обновится сам)
      const head = b.v >= 2 ? `${sig} ${cur.domain || '-'} ${sha(script('./node-agent.sh')).slice(0, 16)}` : sig;
      return text(200, sig === b.sig ? head : `${head}\n${cfg}`);
    }
    return text(404, 'not found');
  }

  // ---------- админка ----------
  const dayBytes = (id) => Number(db.prepare('SELECT bytes FROM node_daily WHERE node_id = ? AND day = ?').get(id, dayOf(now()))?.bytes || 0);
  function state() {
    const t = now(), d = detect(), o = onlineMap();
    const count = db.prepare('SELECT kit_id, COUNT(*) AS n FROM users GROUP BY kit_id').all(), def = defKit();
    return {
      main: { day: Number(db.prepare('SELECT SUM(up + down) AS s FROM traffic_daily WHERE day = ?').get(dayOf(t))?.s || 0), protos: LOCAL.filter((k) => d[k]), reality: !!d.vision?.reality },
      nodes: all().map((n) => { const i = J(n.info, {}), on = online.get(n.id);
        return { id: n.id, name: n.name, addr: n.addr, mask: n.mask, domain: n.domain, ru_direct: !!n.ru_direct, tls: tls(n), cert_err: n.domain && !tls(n) ? i.cert_err || '' : '', old_agent: joined(n) && !!n.seen_at && !!i.xray && !(i.v >= 2), joined: joined(n), waiting: !!n.join_hash, seen: n.seen_at, up: joined(n) && t - n.seen_at < SEEN, xray: i.xray || '', load: i.load || '', xray_ok: i.active !== false, err: i.err || '',
          online: on && t - on.at < SEEN ? Object.keys(on.ips).length : 0, day: dayBytes(n.id) } }),
      kits: kits().map((k) => ({ id: k.id, name: k.name, is_default: k.id === def.id, users: count.filter((c) => c.kit_id === k.id || (k.id === def.id && !kits().some((x) => x.id === c.kit_id))).reduce((s, c) => s + c.n, 0),
        lines: linesOf(k.id).map((l) => ({ id: l.id, name: l.name, out: l.out, via: l.via, proto: l.proto, on: !!l.enabled, exit: l.exit_id, exit_fail: l.exit_fail, problem: whyNot(l, d) })) })),
      online: o,
    };
  }
  // Ноды, по домену которых открываются админка и подписки этого сервера (страница ноды пересылает запросы сюда)
  const mirrors = () => all().filter((n) => joined(n) && tls(n) && J(n.info, {}).mirror && now() - n.seen_at < SEEN).map((n) => ({ name: n.name, host: n.domain }));
  const cleanName = (v, max) => String(v ?? '').trim().slice(0, max);
  function cleanLine(b, old) {
    const out = b.out !== undefined ? Number(b.out) || 0 : old?.out || 0, via = b.via !== undefined ? Number(b.via) || 0 : old?.via || 0;
    if (out && !byId(out)) return { error: 'Нет такого сервера' };
    if (via && !byId(via)) return { error: 'Нет такой ноды для моста' };
    if (via && via === out) return { error: 'Мост и сервер должны быть разными' };
    const e = via || out, want = b.proto ?? old?.proto;
    const proto = e ? (NODE_TLS.includes(want) && byId(e).domain ? want : 'reality') : LOCAL.includes(want) ? want : 'vision';
    const nm = (id) => id ? byId(id).name : server().name;
    const name = cleanName(b.name ?? old?.name, 40) || (via ? `${nm(out)} через «${nm(via)}»` : e ? nm(out) : `${nm(0)} ${PROTO[proto]}`);
    const x = exits.pick(b, old); if (x.error) return x;
    return { out, via, proto, name, ...x, exit_id: proto === 'awg' ? 0 : x.exit_id };
  }
  function newKeys() {
    const { publicKey, privateKey } = generateKeyPairSync('x25519');
    return { priv: privateKey.export({ format: 'jwk' }).d, pub: publicKey.export({ format: 'jwk' }).x, sid: randomBytes(8).toString('hex') };
  }
  async function api(req, res, path, h) {
    const M = req.method, ok = async (extra = {}, full = true) => { if (full) await h.sync(); return h.json(res, 200, { ...extra, ...h.state() }) };
    const bad = (error, code = 400) => h.json(res, code, { error });
    let m;
    if (path === '/api/nodes' && M === 'POST') {
      const name = cleanName((await h.readBody(req)).name, 24); if (!name) return bad('Нужно название');
      if (!server().domain) return bad('Сначала задайте домен сервера в разделе «Адрес»');
      const k = newKeys(), tok = token(12);
      const id = db.prepare('INSERT INTO nodes (name, join_hash, priv, pub, sid, link_uuid, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)').run(name, sha(tok), k.priv, k.pub, k.sid, newUuid(), now()).lastInsertRowid;
      return ok({ node: Number(id), command: command(tok) }, false);
    }
    if ((m = /^\/api\/nodes\/(\d+)(\/token)?$/.exec(path))) {
      const n = byId(m[1]); if (!n) return bad('Нет такой ноды', 404);
      if (m[2] && M === 'POST') { const tok = token(12); db.prepare('UPDATE nodes SET join_hash = ? WHERE id = ?').run(sha(tok), n.id); return ok({ command: command(tok) }, false) }
      if (!m[2] && M === 'PATCH') {
        const b = await h.readBody(req), name = b.name !== undefined ? cleanName(b.name, 24) || n.name : n.name, mask = b.mask !== undefined ? cleanHost(b.mask) : n.mask;
        if (!mask) return bad('Сайт для маскировки выглядит так: ya.ru');
        let domain = n.domain;
        if (b.domain !== undefined && String(b.domain).trim() !== n.domain) {
          domain = String(b.domain).trim() ? cleanHost(b.domain) : '';
          if (String(b.domain).trim() && !domain) return bad('Домен выглядит так: msk.example.ru');
          if (domain) {
            if (!n.addr) return bad('Домен задаётся после того, как нода подключится');
            const a = await h.resolve(domain);
            if (!a.includes(n.addr)) return bad(a.length ? `Домен смотрит на ${a.join(', ')}, а нода на ${n.addr}. Поправьте запись A в DNS` : `У домена нет записи A. Создайте её на адрес ${n.addr}`);
          }
        }
        const ru = b.ru_direct !== undefined ? (b.ru_direct ? 1 : 0) : n.ru_direct;
        db.prepare('UPDATE nodes SET name = ?, mask = ?, domain = ?, ru_direct = ? WHERE id = ?').run(name, mask, domain, ru, n.id); return ok({}, false);
      }
      if (!m[2] && M === 'DELETE') {
        db.prepare('DELETE FROM kit_lines WHERE out = ? OR via = ?').run(n.id, n.id); db.prepare('DELETE FROM nodes WHERE id = ?').run(n.id); db.prepare('DELETE FROM node_daily WHERE node_id = ?').run(n.id);
        online.delete(n.id); await xray.removeClient('vision', LINK(n.id)).catch(() => {}); log(`нода «${n.name}» убрана`); return ok();
      }
    }
    // наборы людей разом: { kits: { id человека: id набора } }
    if (path === '/api/kits/assign' && M === 'POST') {
      const b = (await h.readBody(req)).kits || {};
      for (const [uid, kid] of Object.entries(b)) db.prepare('UPDATE users SET kit_id = ? WHERE id = ?').run(pickKit(kid), Number(uid) || 0);
      return ok();
    }
    if (path === '/api/kits' && M === 'POST') {
      const name = cleanName((await h.readBody(req)).name, 24); if (!name) return bad('Нужно название');
      return ok({ kit: Number(db.prepare('INSERT INTO kits (name) VALUES (?)').run(name).lastInsertRowid) }, false);
    }
    if ((m = /^\/api\/kits\/(\d+)(\/lines|\/order|\/users)?$/.exec(path))) {
      const k = db.prepare('SELECT * FROM kits WHERE id = ?').get(Number(m[1])); if (!k) return bad('Нет такого набора', 404);
      if (!m[2] && M === 'PATCH') {
        const b = await h.readBody(req);
        if (b.name !== undefined) db.prepare('UPDATE kits SET name = ? WHERE id = ?').run(cleanName(b.name, 24) || k.name, k.id);
        if (b.is_default) { db.exec('UPDATE kits SET is_default = 0'); db.prepare('UPDATE kits SET is_default = 1 WHERE id = ?').run(k.id) }
        return ok();
      }
      if (!m[2] && M === 'DELETE') {
        if (k.id === defKit().id) return bad('Этот набор получают новые люди. Сначала назначьте другой');
        db.prepare('UPDATE users SET kit_id = ? WHERE kit_id = ?').run(defKit().id, k.id); db.prepare('DELETE FROM kit_lines WHERE kit_id = ?').run(k.id); db.prepare('DELETE FROM kits WHERE id = ?').run(k.id); return ok();
      }
      if (m[2] === '/lines' && M === 'POST') {
        const l = cleanLine(await h.readBody(req)); if (l.error) return bad(l.error);
        const pos = Number(db.prepare('SELECT MAX(pos) AS p FROM kit_lines WHERE kit_id = ?').get(k.id)?.p ?? -1) + 1;
        db.prepare('INSERT INTO kit_lines (kit_id, pos, name, out, via, proto, exit_id, exit_fail) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(k.id, pos, l.name, l.out, l.via, l.proto, l.exit_id, l.exit_fail); return ok();
      }
      if (m[2] === '/order' && M === 'POST') {
        [].concat((await h.readBody(req)).ids || []).forEach((id, i) => db.prepare('UPDATE kit_lines SET pos = ? WHERE id = ? AND kit_id = ?').run(i, Number(id) || 0, k.id)); return ok({}, false);
      }
      if (m[2] === '/users' && M === 'POST') {
        const ids = new Set([].concat((await h.readBody(req)).ids || []).map(Number)), def = defKit().id;
        for (const u of users()) { const has = kitOf(u).id === k.id, want = ids.has(u.id);
          if (want && !has) db.prepare('UPDATE users SET kit_id = ? WHERE id = ?').run(k.id, u.id);
          else if (!want && has && k.id !== def) db.prepare('UPDATE users SET kit_id = ? WHERE id = ?').run(def, u.id) }
        return ok();
      }
    }
    if ((m = /^\/api\/lines\/(\d+)$/.exec(path))) {
      const old = db.prepare('SELECT * FROM kit_lines WHERE id = ?').get(Number(m[1])); if (!old) return bad('Нет такого подключения', 404);
      if (M === 'DELETE') { db.prepare('DELETE FROM kit_lines WHERE id = ?').run(old.id); return ok() }
      if (M === 'PATCH') {
        const b = await h.readBody(req), l = cleanLine(b, old); if (l.error) return bad(l.error);
        db.prepare('UPDATE kit_lines SET name = ?, out = ?, via = ?, proto = ?, enabled = ?, exit_id = ?, exit_fail = ? WHERE id = ?').run(l.name, l.out, l.via, l.proto, b.on !== undefined ? (b.on ? 1 : 0) : old.enabled, l.exit_id, l.exit_fail, old.id); return ok();
      }
    }
    return bad('Нет такого действия', 404);
  }

  return { kindsOn, linkClients, exitGroups, userKeys, ensureLinks, render, links, linkList, onlineMap, http, api, state, kitOf, defKit, pickKit, nodeConfig, usable, wantsAwg, mirrors };
}
