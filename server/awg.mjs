// AmneziaWG 3.1 рядом с Xray: отдельный контейнер monolit-awg (см. awg/ и команду «awg» помощника).
// Админка — единственный хозяин настроек: ключ сервера, параметры маскировки и пользователи задаются через
// сокет настройки устройства. Пользователь — пара ключей и адрес внутри сети 10.13.0.0/16, по номеру в базе.
import { createConnection } from 'node:net';
import { generateKeyPairSync, randomBytes, randomInt } from 'node:crypto';
import { deflateSync } from 'node:zlib';
import { now, getSetting, setSetting } from './db.mjs';

const SOCK = process.env.MP_AWG_SOCK || '/run/monolit/awg/awg0.sock';
const J = (s, d) => { try { return JSON.parse(s) } catch { return d } };
const b64 = (u) => Buffer.from(u, 'base64url').toString('base64');
const hex = (b) => Buffer.from(b, 'base64').toString('hex');
const fromHex = (h) => Buffer.from(h, 'hex').toString('base64');
const ONLINE = 180;                       // секунд с последнего обмена ключами — человек «в сети»
const MTU = 1280;

export const newKeys = () => {
  const { publicKey, privateKey } = generateKeyPairSync('x25519');
  return { priv: b64(privateKey.export({ format: 'jwk' }).d), pub: b64(publicKey.export({ format: 'jwk' }).x) };
};
const newSecret = () => randomBytes(32).toString('base64');
// адрес человека: 10.13.0.2 — первый, 10.13.0.1 — сам сервер. Номер больше 65 532 в сеть не помещается
export const userIp = (id) => { const n = id + 1; return n >= 2 && n <= 65534 ? `10.13.${n >> 8}.${n & 255}` : '' };

// Разговор с устройством: «get=1» или «set=1» со строками «ключ=значение», ответ кончается пустой строкой
function uapi(text, timeout = 4000) {
  return new Promise((ok, fail) => {
    let out = '', done = false;
    const fin = (e) => { if (done) return; done = true; s.destroy(); e ? fail(e) : ok(out) };
    const s = createConnection(SOCK, () => s.write(text + '\n\n'));
    s.setEncoding('utf8');
    s.on('data', (c) => { out += c; if (out.endsWith('\n\n')) fin() });
    s.on('end', () => fin());
    s.on('error', (e) => fin(new Error(e.code === 'ENOENT' || e.code === 'ECONNREFUSED' ? 'AmneziaWG не запущен' : e.message)));
    setTimeout(() => fin(new Error('AmneziaWG не ответил')), timeout);
  });
}
const errno = (out) => Number(/(?:^|\n)errno=(-?\d+)/.exec(out)?.[1] ?? -1);

// Ответ «get=1» → настройки устройства и пользователи по открытому ключу
export function parseGet(out) {
  const dev = {}, peers = new Map(); let p = null;
  for (const line of out.split('\n')) {
    const i = line.indexOf('='); if (i < 1) continue;
    const k = line.slice(0, i), v = line.slice(i + 1);
    if (k === 'public_key') { p = { allowed: [], rx: 0, tx: 0, hs: 0, endpoint: '', psk: '' }; peers.set(v, p); continue }
    if (!p) { dev[k] = v; continue }
    if (k === 'allowed_ip') p.allowed.push(v);
    else if (k === 'rx_bytes') p.rx = Number(v) || 0;
    else if (k === 'tx_bytes') p.tx = Number(v) || 0;
    else if (k === 'last_handshake_time_sec') p.hs = Number(v) || 0;
    else if (k === 'endpoint') p.endpoint = v;
    else if (k === 'preshared_key') p.psk = v;
  }
  return { dev, peers };
}

export function createAwg({ db, log, agent, domain, outIp, onReady }) {
  const have = new Set(db.prepare('PRAGMA table_info(users)').all().map((c) => c.name));
  for (const col of ['awg_priv', 'awg_pub', 'awg_psk']) if (!have.has(col)) db.exec(`ALTER TABLE users ADD COLUMN ${col} TEXT NOT NULL DEFAULT ''`);

  const conf = () => J(getSetting(db, 'awg', ''), null) || { on: false, port: 0 };
  const save = (c) => setSetting(db, 'awg', JSON.stringify(c));
  let state = 'off', error = '', busy = false, started = '';   // off | starting | on | error
  const last = new Map();                                      // открытый ключ → счётчики с прошлой сверки
  // «Включён» — по настройке, а не по живому состоянию: короткий сбой контейнера не должен убирать подключение из подписок
  const ready = () => { const c = conf(); return !!(c.on && c.priv) };

  // Параметры маскировки задаются один раз при первом включении: их же получают все клиенты
  function ensureServer(c) {
    if (c.priv) return c;
    const k = newKeys();
    return { ...c, priv: k.priv, pub: k.pub, hpk: newSecret(), jc: randomInt(4, 9), jmin: 10, jmax: 50, s: 12 };
  }
  function ensureUser(u) {
    if (u.awg_priv && u.awg_pub) return u;
    const k = newKeys(), psk = newSecret();
    db.prepare('UPDATE users SET awg_priv = ?, awg_pub = ?, awg_psk = ? WHERE id = ?').run(k.priv, k.pub, psk, u.id);
    return { ...u, awg_priv: k.priv, awg_pub: k.pub, awg_psk: psk };
  }
  const dropKeys = (id) => db.prepare("UPDATE users SET awg_priv = '', awg_pub = '', awg_psk = '' WHERE id = ?").run(id);

  // Строки настройки устройства. Маскировка — как у AmneziaWG 3.1 по умолчанию: добавки одинаковой длины, зашифрованные заголовки
  const deviceLines = (c) => [
    `private_key=${hex(c.priv)}`, `listen_port=${c.port}`,
    `jc=${c.jc}`, `jmin=${c.jmin}`, `jmax=${c.jmax}`, `s1=${c.s}`, `s2=${c.s}`, `s3=${c.s}`, `s4=${c.s}`,
    'h1=1', 'h2=2', 'h3=3', 'h4=4', `header_protection_key=${hex(c.hpk)}`,
    'rekey_after_time=100-120', 'rekey_timeout=3-7', 'reject_after_time=150-180', 'keepalive_timeout=5-15', 'max_handshake_attempts=15-20',
    'random_trailers=true', 'disable_cookies=true',
  ];
  // То же для клиента — именами из файла .conf
  const clientParams = (c) => ({
    Jc: String(c.jc), Jmin: String(c.jmin), Jmax: String(c.jmax), S1: String(c.s), S2: String(c.s), S3: String(c.s), S4: String(c.s),
    H1: '1', H2: '2', H3: '3', H4: '4', HeaderProtectionKey: c.hpk,
    RekeyAfterTime: '100-120', RekeyTimeout: '3-7', RejectAfterTime: '150-180', KeepaliveTimeout: '5-15', MaxHandshakeAttempts: '15-20',
    RandomTrailers: 'on', DisableCookies: 'on',
  });

  // Запуск один: включение из админки и сверка, пришедшая следом, ждут один и тот же вызов помощника
  // (два одновременных «awg on» мешали друг другу создавать сеть контейнера)
  const key = (c) => `${c.port}|${outIp()}|${c.ip || ''}`;
  // Куда подключаются приложения: выбранный адрес сервера цифрами, иначе домен (он смотрит на адрес VPN)
  const host = (c = conf()) => c.ip || domain();
  let pending = null;
  function start(c) {
    if (pending) return pending;
    state = 'starting'; error = '';
    pending = (async () => {
      // awg on ПОРТ ВЫХОД|- АДРЕС|-: адрес — на каком адресе сервера принимать подключения («-» — на всех)
      const r = await agent(`awg on ${c.port} ${outIp() || '-'} ${c.ip || '-'}`, 15 * 60_000);   // первая сборка образа — несколько минут
      if (r.code !== 0) { state = 'error'; error = r.out.split('\n').slice(-3).join(' ') || 'AmneziaWG не запустился'; log('awg:', error); return false }
      started = key(c); state = 'on'; return true;
    })().finally(() => { pending = null });
    return pending;
  }

  // Сверка: устройство настроено, пользователи те, что нужны. Возвращает трафик и кто в сети — в том же виде, что Xray
  async function sync(users, { full = false } = {}) {
    const c = conf(), none = { traffic: {}, online: {} };
    if (!c.on || busy) return none;
    if (state === 'error' && !full) return none;   // неудачный запуск повторяем раз в 10 минут, а не каждую минуту
    busy = true;
    try {
      if (state !== 'on' || (full && started !== key(c))) { if (!await start(c)) return none }
      let got;
      try { got = parseGet(await uapi('get=1')) }
      catch (e) { if (!await start(c)) return none; got = parseGet(await uapi('get=1')) }
      const dev = deviceLines(c);
      if (got.dev.private_key !== hex(c.priv) || Number(got.dev.listen_port) !== c.port || Number(got.dev.jc) !== c.jc) {
        const r = await uapi('set=1\n' + dev.join('\n'));
        if (errno(r) !== 0) throw new Error('устройство не приняло настройки: ' + r.trim());
      }
      const want = new Map();
      for (const u0 of users) { const ip = userIp(u0.id); if (!ip) continue; const u = ensureUser(u0); want.set(hex(u.awg_pub), { u, ip }) }
      const set = [];
      for (const [pub, { u, ip }] of want) {
        const p = got.peers.get(pub);
        if (!p || p.allowed.join() !== `${ip}/32`) { set.push(`public_key=${pub}`, `preshared_key=${hex(u.awg_psk)}`, 'replace_allowed_ips=true', `allowed_ip=${ip}/32`); last.set(pub, { rx: 0, tx: 0 }) }
      }
      for (const pub of got.peers.keys()) if (!want.has(pub)) { set.push(`public_key=${pub}`, 'remove=true'); last.delete(pub) }
      if (set.length) { const r = await uapi('set=1\n' + set.join('\n')); if (errno(r) !== 0) throw new Error('пользователи не применились: ' + r.trim()) }

      const t = now(), traffic = {}, online = {};
      for (const [pub, p] of got.peers) {
        const w = want.get(pub); if (!w) continue;
        const prev = last.get(pub);
        // первая сверка после запуска админки — только запомнить счётчики; счётчик меньше прошлого — устройство перезапускали
        if (prev) { const up = p.rx >= prev.rx ? p.rx - prev.rx : p.rx, down = p.tx >= prev.tx ? p.tx - prev.tx : p.tx; if (up || down) traffic[w.u.id] = { up, down } }
        last.set(pub, { rx: p.rx, tx: p.tx });
        if (p.hs && t - p.hs < ONLINE && p.endpoint) online[w.u.id] = { [p.endpoint.replace(/:\d+$/, '').replace(/^\[|\]$/g, '')]: t };
      }
      error = '';
      return { traffic, online };
    } catch (e) { error = e.message; log('awg sync:', e.message); return none }
    finally { busy = false }
  }

  // Клиентская часть для одного человека
  function client(u0) {
    const c = conf(), ip = userIp(u0.id);
    if (!c.on || !c.priv || !ip) return null;
    const u = ensureUser(u0);
    return { ip, priv: u.awg_priv, psk: u.awg_psk, server: c.pub, endpoint: `${host(c)}:${c.port}`, params: clientParams(c) };
  }
  // Выход Xray для клиента monolit: подключение wireguard с параметрами маскировки в settings.awg
  function outbound(u) {
    const k = client(u); if (!k) return null;
    return { tag: 'proxy', protocol: 'wireguard', settings: { secretKey: k.priv, address: [k.ip], mtu: MTU, domainStrategy: 'ForceIPv4',
      peers: [{ publicKey: k.server, preSharedKey: k.psk, endpoint: k.endpoint, allowedIPs: ['0.0.0.0/0'], keepAlive: 25 }], awg: k.params } };
  }
  // Файл .conf для приложения AmneziaVPN и AmneziaWG
  function confText(u, name) {
    const k = client(u); if (!k) return '';
    return [`# ${String(name || '').replace(/[\r\n]/g, ' ')}`, '[Interface]', `PrivateKey = ${k.priv}`, `Address = ${k.ip}/32`, 'DNS = 1.1.1.1, 8.8.8.8', `MTU = ${MTU}`,
      ...Object.entries(k.params).map(([a, b]) => `${a} = ${b}`), '', '[Peer]', `PublicKey = ${k.server}`, `PresharedKey = ${k.psk}`,
      `Endpoint = ${k.endpoint}`, 'AllowedIPs = 0.0.0.0/0', 'PersistentKeepalive = 25', ''].join('\n');
  }

  // Ссылка vpn:// для приложения AmneziaVPN: его собственный JSON (как оно само собирает из файла .conf,
  // см. extractWireGuardConfig в amnezia-client), сжатый как qCompress — длина в 4 байтах и поток zlib — и записанный в base64url
  function vpnLink(u, name) {
    const k = client(u); if (!k) return '';
    const c = conf(), text = confText(u, name);
    const last = { config: text, hostName: host(c), port: c.port, client_priv_key: k.priv, client_ip: `${k.ip}/32`, psk_key: k.psk, server_pub_key: k.server,
      mtu: String(MTU), persistent_keep_alive: '25', allowed_ips: ['0.0.0.0/0'], ...k.params };
    const json = Buffer.from(JSON.stringify({
      containers: [{ container: 'amnezia-awg', awg: { last_config: JSON.stringify(last, null, 4), isThirdPartyConfig: true, port: String(c.port), transport_proto: 'udp' } }],
      defaultContainer: 'amnezia-awg', description: String(name || '').replace(/[\r\n]/g, ' '), dns1: '1.1.1.1', dns2: '8.8.8.8', hostName: host(c),
    }));
    const len = Buffer.alloc(4); len.writeUInt32BE(json.length);
    return 'vpn://' + Buffer.concat([len, deflateSync(json, { level: 8 })]).toString('base64url');
  }

  async function set({ on, port, ip }) {
    let c = conf();
    // Адрес: AmneziaWG по умолчанию слушает на всех адресах сервера, включая адрес входа Xray. Его можно увести на
    // другой адрес, чтобы заметный UDP-трафик не шёл на адрес основного входа
    if (ip !== undefined) {
      ip = String(ip || '').trim();
      if (ip && !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) return { error: 'Выберите адрес из списка' };
      if (ip !== (c.ip || '')) {
        c = { ...c, ip }; save(c);
        if (c.on) { state = 'starting'; error = ''; start(c).then((ok) => { if (ok) onReady?.() }).catch((e) => { state = 'error'; error = e.message }) }
      }
      if (on === undefined) return { ok: true };
    }
    if (on) {
      const p = Number(port) || c.port || randomInt(40000, 60000);   // порт не спрашиваем: случайный, один раз
      if (!(p >= 1024 && p <= 65535)) return { error: 'Порт от 1024 до 65535' };
      if (p !== c.port || !c.on) {
        const free = await agent(`port-free ${p}`);   // проверяет TCP; занятый UDP покажет сам запуск
        if (free.code === -1) return { error: free.out };
      }
      c = ensureServer({ ...c, on: true, port: p }); save(c);
      // первая сборка образа идёт несколько минут: запрос админки не ждёт, состояние видно в stateForAdmin
      state = 'starting'; error = '';
      start(c).then((ok) => { if (ok) onReady?.() }).catch((e) => { state = 'error'; error = e.message });
      return { ok: true };
    }
    save({ ...c, on: false }); state = 'off'; error = ''; last.clear();
    const r = await agent('awg off');
    return r.code === 0 ? { ok: true } : { error: r.out || 'Не получилось остановить AmneziaWG' };
  }

  const stateForAdmin = () => { const c = conf(); return { on: !!c.on, port: c.port || 0, ip: c.ip || '', state: c.on ? state : 'off', error } };
  if (conf().on) state = 'starting';
  return { ready, sync, set, outbound, confText, vpnLink, dropKeys, stateForAdmin, conf };
}
