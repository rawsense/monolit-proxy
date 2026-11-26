// Настройка сервера при установке (вызывает install.sh внутри контейнера, с /etc/nginx и папкой Xray, примонтированными с хоста).
//   node init.mjs scan                       — сайты nginx на 443: JSON [{file, names, cert, key}]
//   node init.mjs apply --mode front|ip2|bare --domain d --port 7380 --admin-path p --xhttp-port n --xhttp-path s
//                       [--ip2 x --ip1 y] [--cert c --key k] [--socks порт:логин:пароль] [--warp файл.json]
//                       [--from-mode прежний] — способ сменили: сначала вернуть сайты к обычному 443
//                       [--alt "домен:сертификат:ключ,…"] — запасные домены: старые ссылки подписок продолжают работать
//       Схема как в autoXRAY: Xray на 443 (Vision, Hysteria2), всё не-VPN он отдаёт nginx на внутренние сокеты
//       с proxy_protocol. Там сайты (front), сайт домена VPN с админкой, подписками и XHTTP.
//   node init.mjs include --domain d --port 7380 --admin-path p   — Xray уже настроен (autoXRAY): только админка в сайт домена
//   node init.mjs warp --out файл.json        — регистрация в Cloudflare WARP, готовый выход wireguard для Xray
// Бэкапы и откат делает install.sh.
import { writeFileSync, readFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname } from 'node:path';
import { register } from './warp.mjs';
import { hyMasq } from './xray.mjs';
import { scan, toSockets, toIp, realIp, includeIn, has80, fromSockets, fromIp, excludeFrom, realitySite, realityGroups, SOCK_H1, SOCK_H2 } from './nginx.mjs';

const [cmd, ...rest] = process.argv.slice(2);
const arg = (k, d = '') => { const i = rest.indexOf('--' + k); return i >= 0 && rest[i + 1] !== undefined && !rest[i + 1].startsWith('--') ? rest[i + 1] : d };
const NGINX = process.env.MP_NGINX_DIR || '/etc/nginx';
const CONFIG = process.env.MP_XRAY_CONFIG || '/usr/local/etc/xray/config.json';
const INC = `${NGINX}/monolit.conf`, VPN_SITE = `${NGINX}/conf.d/monolit-vpn.conf`, REALITY_SITE = `${NGINX}/conf.d/monolit-reality.conf`, ACME = '/var/lib/monolit/acme';
const fail = (msg, code = 1) => { console.error(msg); process.exit(code) };

// Локации monolit: админка, подписки, XHTTP. Включаются в сайт домена VPN
function incText({ port, admin, xhttpPath, xhttpPort }) {
  const px = `proxy_pass http://127.0.0.1:${port}; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr;`;
  let t = `# monolit proxy: админка и страницы подписок\nlocation ^~ /${admin}/ { ${px} }\nlocation ^~ /s/ { ${px} }\n`;
  if (xhttpPath) t += `# XHTTP (stream-up через gRPC-модуль nginx, как в autoXRAY)
location /${xhttpPath} {
    client_max_body_size 0; client_body_buffer_size 512k; grpc_buffer_size 64k;
    client_body_timeout 120s; grpc_read_timeout 180s; grpc_send_timeout 180s; grpc_socket_keepalive on;
    grpc_set_header Host $host; grpc_set_header X-Real-IP $remote_addr;
    grpc_pass grpc://127.0.0.1:${xhttpPort};
}
`;
  return t;
}

if (cmd === 'scan') { console.log(JSON.stringify(existsSync(NGINX) ? scan(NGINX) : [])); process.exit(0) }

if (cmd === 'include') {
  const domain = arg('domain'), port = arg('port', '7380'), admin = arg('admin-path');
  if (!domain || !admin) fail('Нужны --domain и --admin-path');
  writeFileSync(INC, incText({ port, admin }));
  const r = includeIn(NGINX, domain, INC);
  if (!r) fail(`В nginx нет сайта ${domain} на 443`, 4);
  console.log(JSON.stringify(r)); process.exit(0);
}

// Запасной вход (способ «Второй IP»): админка и подписки ещё и в сайте nginx на основном адресе.
// Локации уже лежат в monolit.conf; здесь только include в блок сайта. Пустой домен — убрать
if (cmd === 'entry') {
  const domain = arg('domain');
  if (!existsSync(INC)) fail('Нет файла локаций monolit: ' + INC);
  excludeFrom(NGINX, domain ? [domain] : [], INC);
  if (domain && !includeIn(NGINX, domain, INC)) fail(`В nginx нет сайта ${domain} на 443`, 4);
  console.log('ok'); process.exit(0);
}

// Сайт для входа Reality (способы bare и ip2): nginx сам принимает TLS на внутреннем сокете. Пока Reality выключен,
// сокет никто не трогает, поэтому сайт пишется всегда — переключатель в админке меняет только Xray
if (cmd === 'tlssite') {
  const groups = realityGroups(arg('domain'), arg('cert'), arg('key'), arg('alt'));
  if (!groups.length) fail('Нет сертификата домена: Reality без него не включить', 3);
  writeFileSync(REALITY_SITE, realitySite(groups, { port: Number(arg('port', '7380')), inc: INC }));
  console.log(JSON.stringify({ names: groups.flatMap((g) => g.names) })); process.exit(0);
}

if (cmd === 'warp') {
  const { outbound, reg } = await register().catch((e) => fail(e.message, 5));
  const file = arg('out'); mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(outbound, null, 2), { mode: 0o600 });   // внутри закрытый ключ
  writeFileSync(file.replace(/\.json$/, '') + '-reg.json', JSON.stringify(reg), { mode: 0o600 });   // для ключа WARP+ из админки
  console.log('ok'); process.exit(0);
}

if (cmd !== 'apply') fail('node init.mjs scan | apply | include | warp ...');

const mode = arg('mode'), domain = arg('domain'), port = Number(arg('port', '7380')), admin = arg('admin-path');
const xhttpPort = Number(arg('xhttp-port', '0')), xhttpPath = arg('xhttp-path');
if (!['front', 'ip2', 'bare'].includes(mode) || !domain || !admin) fail('Нужны --mode, --domain и --admin-path');

// Способ сменили (из админки): что прежний способ сделал с сайтами — назад, дальше как при установке
const from = arg('from-mode');
if (from && from !== mode && existsSync(NGINX)) { if (from === 'front') fromSockets(NGINX); if (from === 'ip2') fromIp(NGINX, arg('ip1')) }

// Запасные домены: прежний адрес продолжает открывать подписки и подключать приложения
const alt = arg('alt').split(/[,;]/).map((x) => x.split(/[:|]/)).filter(([d]) => d && d !== domain && /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(d));
const names = [domain, ...alt.map(([d]) => d)];

// Сертификаты для TLS Xray: домен VPN первым (его отдаём клиентам без SNI), потом сайты — Xray выбирает по SNI
const sites = existsSync(NGINX) ? scan(NGINX) : [];
const certs = [];
const add = (c, k) => { if (c && k && !certs.some((x) => x.certificateFile === c)) certs.push({ certificateFile: c, keyFile: k }) };
add(arg('cert'), arg('key'));
const mine = sites.find((s) => s.names.includes(domain));
if (mode === 'front') { if (mine) add(mine.cert, mine.key); for (const s of sites) add(s.cert, s.key) }
for (const [, c, k] of alt) add(c, k);
if (!certs.length) fail(`Нет сертификата для ${domain}: укажите --cert и --key`, 3);

const listen = mode === 'ip2' ? arg('ip2') : '0.0.0.0';
if (mode === 'ip2' && !/^\d+\.\d+\.\d+\.\d+$/.test(listen)) fail('Нужен --ip2 (второй IPv4)');
const sniff = { enabled: true, destOverride: ['http', 'tls', 'quic'] };

const inbounds = [
  { tag: 'vsRAWtlsVISION', listen, port: 443, protocol: 'vless',
    // всё, что не VPN, — в nginx: h2 и http/1.1 на разные сокеты, адрес клиента строкой PROXY
    settings: { clients: [], decryption: 'none', fallbacks: [{ alpn: 'h2', dest: SOCK_H2, xver: 1 }, { dest: SOCK_H1, xver: 1 }] },
    streamSettings: { network: 'raw', security: 'tls', tlsSettings: { minVersion: '1.2', alpn: ['h2', 'http/1.1'], certificates: certs } },
    sniffing: sniff },
  { tag: 'Hysteria2', listen, port: 443, protocol: 'hysteria',
    settings: { version: 2, clients: [] },
    streamSettings: { network: 'hysteria', security: 'tls',
      tlsSettings: { serverName: domain, alpn: ['h3'], certificates: certs.map((c) => ({ usage: 'encipherment', ...c })) },
      hysteriaSettings: { version: 2, masquerade: hyMasq(port) }, finalmask: { quicParams: { congestion: 'bbr' } } },
    sniffing: sniff },
];
if (xhttpPort && xhttpPath) inbounds.push({ tag: 'vsXHTTPtls', listen: '127.0.0.1', port: xhttpPort, protocol: 'vless',
  settings: { clients: [], decryption: 'none' },
  streamSettings: { network: 'xhttp', xhttpSettings: { mode: 'stream-up', path: '/' + xhttpPath }, security: 'none', sockopt: { trustedXForwardedFor: ['X-Real-IP'] } },
  sniffing: sniff });
const socks = arg('socks');
if (socks) {
  const [sp, user, pass] = socks.split(':');
  inbounds.push({ tag: 'socks5', listen: '0.0.0.0', port: Number(sp), protocol: 'mixed', settings: { auth: 'password', accounts: [{ user, pass }], udp: false } });
}

const outbounds = [{ tag: 'direct', protocol: 'freedom' }, { tag: 'block', protocol: 'blackhole' }];
const rules = [
  { type: 'field', ip: ['geoip:private'], outboundTag: 'block' },
  { type: 'field', port: '25,135,137-139,445', outboundTag: 'block' },
  { type: 'field', protocol: ['bittorrent'], outboundTag: 'block' },
];
const warp = arg('warp');
if (warp && existsSync(warp)) {
  outbounds.push(JSON.parse(readFileSync(warp, 'utf8')));   // что пускать через WARP, решают в админке (Маршруты)
}
const cfg = { log: { loglevel: 'warning' }, inbounds, outbounds, routing: { domainStrategy: 'IPIfNonMatch', rules } };

// nginx: сайты с 443 — на сокеты (front) или на первый IP (ip2)
let moved = [];
if (mode === 'front') { moved = toSockets(NGINX); realIp(NGINX) }
if (mode === 'ip2') moved = toIp(NGINX, arg('ip1'));

// Локации monolit и сайт домена VPN. «Рядом с сайтами»: домен, который уже сайт nginx, получает локации в свой блок,
// остальным доменам — свой сайт за Xray. Из прочих сайтов локации убираем (домен сменили)
writeFileSync(INC, incText({ port, admin, xhttpPath: xhttpPort ? xhttpPath : '', xhttpPort }));
const inSites = mode === 'front' ? names.filter((n) => sites.some((s) => s.names.includes(n)) && includeIn(NGINX, n, INC)) : [];
// запасной вход в сайте на основном адресе (ip2) переживает пересборку
const entry = mode === 'ip2' && arg('entry') && includeIn(NGINX, arg('entry'), INC) ? [arg('entry')] : [];
if (existsSync(NGINX)) excludeFrom(NGINX, [...inSites, ...entry], INC);
const own = names.filter((n) => !inSites.includes(n));
let vpnSite = inSites.length ? 'существующий' : '';
if (own.length) {
  vpnSite = VPN_SITE;
  const def = mode === 'front' ? '' : ' default_server';
  let t = `# monolit proxy: сайт домена VPN за Xray. Посторонним — страница входа; админка, подписки и XHTTP — по своим путям
server {
    listen unix:${SOCK_H1} proxy_protocol${def};
    listen unix:${SOCK_H2} proxy_protocol http2${def};
    server_name ${own.join(' ')};
    set_real_ip_from unix:;
    real_ip_header proxy_protocol;
    server_tokens off;
    access_log off;
    include ${INC};
    location / { proxy_pass http://127.0.0.1:${port}; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; client_max_body_size 64k; }
}
`;
  const n80 = own.filter((n) => !has80(NGINX, n, VPN_SITE));
  if (n80.length) t += `server {
    listen 80;
    server_name ${n80.join(' ')};
    location ^~ /.well-known/acme-challenge/ { root ${ACME}; try_files $uri @acme_old; }
    location @acme_old { root /var/www/html; }   # сертификат autoXRAY продлевает acme.sh через эту папку
    location / { return 301 https://$host$request_uri; }
}
`;
  writeFileSync(VPN_SITE, t);
} else if (existsSync(VPN_SITE)) rmSync(VPN_SITE);   // все домены — сайты nginx, свой сайт не нужен (копия /etc/nginx у install.sh)

mkdirSync(dirname(CONFIG), { recursive: true });
writeFileSync(CONFIG, JSON.stringify(cfg, null, 2));
console.log(JSON.stringify({ mode, from, names, listen, certs: certs.map((c) => c.certificateFile), moved, vpnSite, sites: sites.map((s) => s.names[0]) }));
