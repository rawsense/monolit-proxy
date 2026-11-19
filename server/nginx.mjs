// Разбор и правка конфигов nginx при установке на сервер с сайтами.
// Ищем блоки server, которые слушают 443 по IPv4, и переводим их:
//   front — на внутренние сокеты (443 занимает Xray и отдаёт сайты обратно nginx, как в autoXRAY);
//   ip2   — на первый IP (Xray занимает второй IP:443).
// Остальное в файлах не трогаем: ни location, ни сертификаты, ни порт 80.
import { readFileSync, writeFileSync, readdirSync, statSync, realpathSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const SOCK_H1 = '/dev/shm/monolit-h1.sock';
export const SOCK_H2 = '/dev/shm/monolit-h2.sock';

// Файлы, которые nginx реально читает для сайтов. install.sh передаёт точный список из «nginx -T» (MP_NGINX_FILES),
// иначе — conf.d/*.conf и sites-enabled
export function siteFiles(dir = '/etc/nginx') {
  const out = new Set();
  const listed = (process.env.MP_NGINX_FILES || '').split(/[\n:]/).map((f) => f.trim()).filter((f) => f && f.startsWith(dir + '/') && existsSync(f));
  if (listed.length) { for (const f of listed) try { out.add(realpathSync(f)) } catch {} return [...out] }
  for (const sub of ['conf.d', 'sites-enabled']) {
    const d = join(dir, sub); if (!existsSync(d)) continue;
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      try { if (sub === 'conf.d' && !f.endsWith('.conf')) continue; if (!statSync(p).isFile()) continue; out.add(realpathSync(p)) } catch {}
    }
  }
  return [...out];
}

// Блоки server верхнего уровня файла: [{start, end, body}] (по фигурным скобкам, без учёта строк в кавычках с «{»).
// «server {» в комментарии (в nginx.conf Ubuntu так закомментирован раздел mail) и незакрытый блок — не блоки
function serverBlocks(text) {
  const out = [], re = /(^|[\s;}])server\s*\{/g; let m;
  while ((m = re.exec(text))) {
    const start = m.index + m[1].length, open = text.indexOf('{', start); let depth = 0, i = open;
    if (text.slice(text.lastIndexOf('\n', start - 1) + 1, start).includes('#')) { re.lastIndex = open + 1; continue }
    for (; i < text.length; i++) {
      const c = text[i];
      if (c === '#') { const nl = text.indexOf('\n', i); i = nl < 0 ? text.length : nl; continue }
      if (c === '{') depth++; else if (c === '}' && --depth === 0) break;
    }
    if (i >= text.length) break;
    out.push({ start, end: i + 1, body: text.slice(open + 1, i) });
    re.lastIndex = i + 1;
  }
  return out;
}

// директива с начала строки или после «;» / «{» (бывают конфиги в одну строку)
const LISTEN = /(^|[;{])([ \t]*)listen[ \t]+([^;]+);/gm;
const directive = (body, name) => body.match(new RegExp(`(?:^|[;{])\\s*${name}[ \\t]+([^;]+);`, 'm'))?.[1].trim();
// Адрес слушает 443 по IPv4 на всех адресах (443, *:443, 0.0.0.0:443) или на конкретном IPv4
const is443v4 = (addr) => /^(\*:|0\.0\.0\.0:|\d+\.\d+\.\d+\.\d+:)?443$/.test(addr);
const is443v6any = (addr) => addr === '[::]:443';

// Что есть: сайты на 443 с именами и сертификатами
export function scan(dir = '/etc/nginx') {
  const sites = [];
  for (const file of siteFiles(dir)) {
    if (/[\\/]monolit-vpn\.conf$/.test(file)) continue;   // свой сайт домена VPN — не сайт пользователя
    const text = readFileSync(file, 'utf8');
    for (const b of serverBlocks(text)) {
      const listens = [...b.body.matchAll(LISTEN)].map((m) => m[3].trim().split(/\s+/));
      // 443 по IPv4 или уже наши сокеты (повторная установка «рядом с сайтами»)
      const l443 = listens.filter((p) => is443v4(p[0]) || p[0] === `unix:${SOCK_H1}`);
      if (!l443.length) continue;
      const names = (directive(b.body, 'server_name') || '').split(/\s+/)
        // только имена сайтов: без «_», пустых «""» и адресов вроде 203.0.113.5 или [2a12::2]
        .filter((n) => /^[A-Za-z0-9*][A-Za-z0-9.*-]*$/.test(n) && /[A-Za-z]/.test(n));
      const cert = directive(b.body, 'ssl_certificate')?.replace(/^["']|["']$/g, '');
      const key = directive(b.body, 'ssl_certificate_key')?.replace(/^["']|["']$/g, '');
      sites.push({ file, names, cert, key, quic: l443.some((p) => p.includes('quic')), addrs: l443.map((p) => p[0]) });
    }
  }
  return sites;
}

// Переписать listen 443 (IPv4) в блоках server. how(params) → новые строки listen (без отступа и «;»), или null — оставить
function rewrite(dir, how, match = is443v4) {
  const changed = [];
  for (const file of siteFiles(dir)) {
    const text = readFileSync(file, 'utf8'); let out = '', pos = 0, touched = false;
    for (const b of serverBlocks(text)) {
      const body = b.body.replace(LISTEN, (line, pre, ind, val) => {
        const p = val.trim().split(/\s+/);
        if (!match(p[0])) return line;
        const rep = how(p); if (!rep) return line;
        touched = true;
        return pre + rep.map((r) => `${ind}${r};`).join('\n');
      });
      const head = text.slice(b.start, text.indexOf('{', b.start) + 1);
      out += text.slice(pos, b.start) + head + body + '}';
      pos = b.end;
    }
    out += text.slice(pos);
    if (touched) { writeFileSync(file, out); changed.push(file) }
  }
  return changed;
}

// front: «listen 443 ssl http2 default_server» → два сокета с proxy_protocol (Xray передаёт адрес клиента).
// QUIC (443 quic/udp) убираем: UDP 443 займёт Hysteria2. [::]:443 тоже: Xray на 0.0.0.0 слушает и IPv6
export function toSockets(dir = '/etc/nginx') {
  return rewrite(dir, (p) => {
    if (p.includes('quic')) return [`# monolit: QUIC на 443 отдан Hysteria2 (было: listen ${p.join(' ')})`];
    if (p[0].startsWith('[')) return [`# monolit: IPv6 443 принимает Xray (было: listen ${p.join(' ')})`];
    const keep = p.slice(1).filter((x) => x === 'default_server');
    return [`listen unix:${SOCK_H1} proxy_protocol ${keep.join(' ')}`.trim(), `listen unix:${SOCK_H2} proxy_protocol http2 ${keep.join(' ')}`.trim()];
  }, (a) => is443v4(a) || is443v6any(a));
}

// ip2: «listen 443 ssl» → «listen <ip1>:443 ssl». QUIC — тоже на первый IP
export function toIp(dir = '/etc/nginx', ip1) {
  return rewrite(dir, (p) => {
    const port = p[0].split(':').pop();
    if (/^\d+\.\d+\.\d+\.\d+:/.test(p[0]) && !p[0].startsWith('0.0.0.0:')) return null;   // уже на конкретном адресе
    return [`listen ${ip1}:${port} ${p.slice(1).join(' ')}`.trim()];
  });
}

// В сокетах nginx реальный адрес клиента приходит через proxy_protocol: добавить разбор в сайты, где его нет
export function realIp(dir = '/etc/nginx') {
  const changed = [];
  for (const file of siteFiles(dir)) {
    let text = readFileSync(file, 'utf8'), touched = false;
    for (const b of serverBlocks(text).reverse()) {
      if (!b.body.includes(SOCK_H1) || /real_ip_header/.test(b.body)) continue;
      const at = text.indexOf('{', b.start) + 1;
      text = text.slice(0, at) + '\n    set_real_ip_from unix:;\n    real_ip_header proxy_protocol;' + text.slice(at);
      touched = true;
    }
    if (touched) { writeFileSync(file, text); changed.push(file) }
  }
  return changed;
}

// Вставить «include /etc/nginx/monolit.conf;» в блок server этого домена на 443 или сокете. Повтор ничего не меняет
export function includeIn(dir, domain, inc = '/etc/nginx/monolit.conf') {
  for (const file of siteFiles(dir)) {
    const text = readFileSync(file, 'utf8');
    for (const b of serverBlocks(text)) {
      if (!namesOf(b.body).includes(domain) || !/listen[ \t]+(unix:|[^;]*443)/.test(b.body)) continue;
      if (b.body.includes(inc)) return { file, changed: false };
      const at = text.indexOf('{', b.start) + 1;
      writeFileSync(file, text.slice(0, at) + `\n    include ${inc};` + text.slice(at));
      return { file, changed: true };
    }
  }
  return null;
}

// Есть ли уже сервер с этим именем на 80 (тогда свой блок для 80 не добавляем, чтобы не спорить за имя)
export function has80(dir, domain, skip = '') {
  for (const file of siteFiles(dir)) {
    if (file === skip) continue;
    for (const b of serverBlocks(readFileSync(file, 'utf8')))
      if (namesOf(b.body).includes(domain) && /(?:^|[;{\s])listen[ \t]+(\S*:)?80[\s;]/.test(b.body)) return true;
  }
  return false;
}

// server_name и в многострочном, и в однострочном блоке («server { listen 80; server_name a.ru; … }»)
const namesOf = (body) => (body.match(/(?:^|[;{\s])server_name[ \t]+([^;]+);/)?.[1] || '').trim().split(/\s+/);

// ---------- смена способа из админки: вернуть сайты к обычному 443, потом перевести заново ----------
const OUR_REAL_IP = '\n    set_real_ip_from unix:;\n    real_ip_header proxy_protocol;';
const isVpnSite = (f) => /[\\/]monolit-vpn\.conf$/.test(f);
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Переписать блоки server сайтов: fn(body) → новое тело
function eachBlock(dir, fn) {
  const changed = [];
  for (const file of siteFiles(dir)) {
    if (isVpnSite(file)) continue;   // сайт домена VPN пишется заново
    const text = readFileSync(file, 'utf8'); let out = '', pos = 0;
    for (const b of serverBlocks(text)) {
      const head = text.slice(b.start, text.indexOf('{', b.start) + 1);
      out += text.slice(pos, b.start) + head + fn(b.body) + '}';
      pos = b.end;
    }
    out += text.slice(pos);
    if (out !== text) { writeFileSync(file, out); changed.push(file) }
  }
  return changed;
}

// front → обычный 443: сокеты Xray обратно в «listen 443 ssl», закомментированные QUIC и IPv6 — назад, разбор PROXY — убрать
export function fromSockets(dir = '/etc/nginx') {
  const h1 = new RegExp(String.raw`(^|[;{])([ \t]*)listen[ \t]+unix:${reEsc(SOCK_H1)}[ \t]+proxy_protocol([^;]*);`, 'gm');
  const h2 = new RegExp(String.raw`\n?[ \t]*listen[ \t]+unix:${reEsc(SOCK_H2)}[^;]*;`, 'g');
  return eachBlock(dir, (body) => {
    if (!body.includes(SOCK_H1) && !body.includes('# monolit: ')) return body;
    const http2 = h2.test(body); h2.lastIndex = 0;
    return body
      .replace(h1, (m, pre, ind, rest) => `${pre}${ind}listen 443 ssl${http2 ? ' http2' : ''}${rest.includes('default_server') ? ' default_server' : ''};`)
      .replace(h2, '')
      .replace(/# monolit: (?:QUIC на 443 отдан Hysteria2|IPv6 443 принимает Xray) \(было: listen ([^)]+)\);?/g, 'listen $1;')
      .replace(OUR_REAL_IP, '');
  });
}

// ip2 → обычный 443: «listen <ip1>:443» → «listen 443»
export function fromIp(dir = '/etc/nginx', ip1) {
  if (!/^\d+\.\d+\.\d+\.\d+$/.test(ip1 || '')) return [];
  const re = new RegExp(String.raw`(^|[;{])([ \t]*)listen[ \t]+${reEsc(ip1)}:443\b`, 'gm');
  return eachBlock(dir, (body) => body.replace(re, '$1$2listen 443'));
}

// Админка и подписки только в сайтах доменов VPN: из остальных блоков убрать «include monolit.conf»
export function excludeFrom(dir, keep, inc = '/etc/nginx/monolit.conf') {
  const line = new RegExp(String.raw`\n?[ \t]*include[ \t]+${reEsc(inc)};`, 'g');
  return eachBlock(dir, (body) => body.includes(inc) && !namesOf(body).some((n) => keep.includes(n)) ? body.replace(line, '') : body);
}
