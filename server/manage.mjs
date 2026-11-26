// Управление сервером из админки: маршруты, WARP, протоколы, история конфигов Xray, команды помощнику на хосте.
// Конфиг Xray собирается из текущего: правим только своё (правила с ruleTag «mp-*», выход warp, входы Hysteria2,
// XHTTP, SOCKS и пробный вход). Каждое изменение: проверка xray -test → замена → перезапуск → не поднялся — откат.
import { createConnection } from 'node:net';
import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { generateKeyPairSync, randomBytes } from 'node:crypto';
import { now, getSetting, setSetting } from './db.mjs';
import { SOCK_TLS } from './nginx.mjs';
import * as warpApi from './warp.mjs';

const SOCK = process.env.MP_AGENT_SOCK || '/run/monolit/agent.sock';
const PROBE_PORT = 10086, KEEP = 40;
const J = (s, d) => { try { return JSON.parse(s) } catch { return d } };
const IPV4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;

// Помощник на хосте: одна строка запроса, ответ — вывод и «__EXIT код»
export function agent(line, timeout = 30000) {
  return new Promise((ok) => {
    let out = '', done = false;
    const fin = (code, text) => { if (done) return; done = true; s.destroy(); ok({ code, out: text.trim() }) };
    const s = createConnection(SOCK, () => s.write(line + '\n'));
    s.setEncoding('utf8');
    s.on('data', (c) => { out += c });
    s.on('end', () => { const m = /\n?__EXIT (\d+)\s*$/.exec(out); fin(m ? Number(m[1]) : 1, m ? out.slice(0, m.index) : out) });
    s.on('error', (e) => fin(-1, e.code === 'ENOENT' || e.code === 'ECONNREFUSED' ? 'Помощник monolit на сервере не отвечает. Обновите установку: install.sh --reconfigure' : e.message));
    setTimeout(() => fin(-1, 'Помощник не ответил за ' + Math.round(timeout / 1000) + ' с'), timeout);
  });
}

// ---------- маршруты ----------
// Запись — строка как в Xray: domain:x, full:x, keyword:x, regexp:x, geosite:x, geoip:xx, IP/подсеть, порт или диапазон, bittorrent.
// Голый домен «example.com» = domain:example.com (сам домен и поддомены)
export function classify(v) {
  v = String(v).trim();
  if (!v) return null;
  if (/^(geosite|domain|full|keyword|regexp|ext):/i.test(v)) return ['domain', v.replace(/^([a-z]+):/i, (m) => m.toLowerCase())];
  if (/^geoip:!?[a-z0-9-]+$/i.test(v)) return ['ip', v.toLowerCase()];
  if (/^\d{1,3}(\.\d{1,3}){3}(\/\d{1,2})?$/.test(v) || /^[0-9a-f:]+:[0-9a-f:]*(\/\d{1,3})?$/i.test(v)) return ['ip', v];
  if (/^\d{1,5}(-\d{1,5})?$/.test(v)) return ['port', v];
  if (/^(bittorrent|http|tls|quic)$/i.test(v)) return ['protocol', v.toLowerCase()];
  if (/^[a-z0-9.-]+\.[a-z0-9-]{2,}$/i.test(v)) return ['domain', 'domain:' + v.toLowerCase().replace(/^\.+|\.+$/g, '')];
  return null;
}
export const TARGETS = ['direct', 'warp', 'block'];

function routeRules(r, tags) {
  const by = { domain: [], ip: [], port: [], protocol: [] };
  for (const v of r.values) { const c = classify(v); if (c) by[c[0]].push(c[1]) }
  const outboundTag = tags[r.to], base = { type: 'field', outboundTag, ruleTag: 'mp-r' + r.id };
  const out = [];
  if (by.domain.length) out.push({ ...base, domain: by.domain });
  if (by.ip.length) out.push({ ...base, ip: by.ip });
  if (by.port.length) out.push({ ...base, port: by.port.join(',') });
  if (by.protocol.length) out.push({ ...base, protocol: by.protocol });
  return out;
}

// Куда пойдёт адрес: первое подходящее правило. geosite и geoip знает только Xray — про них честно говорим «может»
export function whereTo(routes, host, warpOn) {
  host = String(host).trim().toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/[/:].*$/, '');
  const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
  const maybe = [];
  for (const r of routes) {
    if (!r.on || (r.to === 'warp' && !warpOn)) continue;
    for (const v of r.values) {
      const c = classify(v); if (!c) continue;
      const [k, x] = c;
      if (k === 'domain' && !isIp) {
        const [t, val] = x.split(/:(.*)/s);
        let hit = false;
        if (t === 'domain') hit = host === val || host.endsWith('.' + val);
        else if (t === 'full') hit = host === val;
        else if (t === 'keyword') hit = host.includes(val);
        else if (t === 'regexp') try { hit = new RegExp(val).test(host) } catch {}
        else if (t === 'geosite') maybe.push({ route: r, value: x });
        if (hit) return { route: r, value: v, maybe };
      }
      if (k === 'ip' && isIp) {
        if (x.startsWith('geoip:')) maybe.push({ route: r, value: x });
        else if (inCidr(host, x)) return { route: r, value: v, maybe };
      }
    }
  }
  return { route: null, maybe };
}
function inCidr(ip, cidr) {
  const [net, bits = '32'] = cidr.split('/'); if (net.includes(':')) return false;
  const n = (s) => s.split('.').reduce((a, b) => a * 256 + Number(b), 0), m = Number(bits);
  const d = 2 ** (32 - m);
  return Math.floor(n(ip) / d) === Math.floor(n(net) / d);
}

// ---------- менеджер ----------
export function createManager({ db, xray, queue, activeUsers, log, onRestart }) {
  const CFG = xray.config, DIR = dirname(CFG), CAND = join(DIR, 'config.monolit-candidate.json');
  const MODE = process.env.MP_MODE || 'existing';
  db.exec(`CREATE TABLE IF NOT EXISTS config_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT, at INTEGER NOT NULL, note TEXT NOT NULL,
    body TEXT NOT NULL, state TEXT NOT NULL)`);   // body и state — как было ДО изменения с этой подписью

  const get = (k, d) => J(getSetting(db, k, ''), d);
  const put = (k, v) => setSetting(db, k, JSON.stringify(v));
  // Всё, чем управляем, одним объектом: его же кладём в историю
  const snapshot = () => ({ routes: get('routes', []), warp: getSetting(db, 'warp_on', '0') === '1', warp_out: get('warp_out', null), warp_reg: get('warp_reg', null), warp_acc: getSetting(db, 'warp_acc', ''),
    proto: get('proto', { hy2: true, xhttp: true }), stash: get('stash', {}), socks: get('socks', { on: false, port: 1080, user: '', pass: '' }), out_ip: getSetting(db, 'out_ip', ''), reality: getSetting(db, 'reality_on', '0') === '1' });
  const restore = (s) => { put('routes', s.routes); setSetting(db, 'warp_on', s.warp ? '1' : '0'); put('warp_out', s.warp_out); put('warp_reg', s.warp_reg); setSetting(db, 'warp_acc', s.warp_acc || ''); put('proto', s.proto); put('stash', s.stash); put('socks', s.socks); setSetting(db, 'out_ip', s.out_ip || ''); setSetting(db, 'reality_on', s.reality ? '1' : '0') };

  const tagsOf = (cfg) => ({
    direct: (cfg.outbounds || []).find((o) => o.protocol === 'freedom')?.tag || 'direct',
    block: (cfg.outbounds || []).find((o) => o.protocol === 'blackhole')?.tag || 'block',
    warp: 'warp' });
  const isSocks = (i) => i.tag === 'socks5' || ((i.protocol === 'mixed' || i.protocol === 'socks') && i.tag !== 'mp-probe' && i.listen !== '127.0.0.1');

  // Первый запуск и переустановка: взять то, что сейчас в конфиге (флаги install.sh главнее), маршруты оставить
  function importFromConfig() {
    const cfg = xray.read(), d = xray.detect(cfg), s = snapshot();
    const w = (cfg.outbounds || []).find((o) => o.tag === 'warp');
    s.warp = !!w; if (w) s.warp_out = w;
    if (!s.warp_reg && process.env.MP_DATA) s.warp_reg = J(existsSync(join(process.env.MP_DATA, 'warp-reg.json')) ? readFileSync(join(process.env.MP_DATA, 'warp-reg.json'), 'utf8') : '', null);
    for (const k of ['hy2', 'xhttp']) {
      const ib = d[k] && cfg.inbounds.find((i) => i.tag === d[k].tag);
      if (ib) { s.proto[k] = true; s.stash[k] = { ...ib, settings: { ...ib.settings, clients: [] } } }
      else if (!s.stash[k]) s.proto[k] = false;
    }
    // Основной вход после установки — Vision с сертификатом: запоминаем его вид, чтобы вернуть из Reality.
    // Включён ли Reality, решает админка, а не конфиг: установка всегда пишет Vision
    const tls = tlsOf(cfg, d); if (tls) s.stash.tls = tls;
    // Исходящий IP: если в конфиге задан — он; нет (install.sh переписал конфиг) — оставляем выбранный, build вернёт
    const fr = (cfg.outbounds || []).find((o) => o.protocol === 'freedom' && o.tag === tagsOf(cfg).direct);
    if (fr?.sendThrough && IPV4.test(fr.sendThrough)) s.out_ip = fr.sendThrough;
    const so = (cfg.inbounds || []).find(isSocks);
    if (so) { const a = so.settings?.accounts?.[0] || {}; s.socks = { on: true, port: so.port, user: a.user || '', pass: a.pass || '', tag: so.tag } }
    else s.socks.on = false;
    // Правило WARP из старых установок (сервисы списком) — в маршруты, чтобы ничего не поменялось незаметно
    const legacy = (cfg.routing?.rules || []).find((r) => r.outboundTag === 'warp' && !r.ruleTag && r.domain);
    if (legacy && !s.routes.some((r) => r.to === 'warp')) s.routes.push({ id: nextId(s.routes), on: true, name: 'Сервисы через WARP', values: legacy.domain.map((x) => x.replace(/^domain:/, '')), to: 'warp' });
    restore(s); setSetting(db, 'managed', '1');
  }
  const nextId = (routes) => Math.max(0, ...routes.map((r) => r.id)) + 1;
  // Имена, под которыми отвечает сайт Reality: домен и запасные домены, у которых есть сертификат
  const realityNames = () => [getSetting(db, 'domain'), ...String(process.env.MP_ALT || '').replace(/^"|"$/g, '').split(/[,;]/).map((x) => x.split(/[:|]/)).filter(([d, c, k]) => d && c && k).map(([d]) => d)]
    .filter((d, i, a) => d && a.indexOf(d) === i);
  // Вид основного входа Vision, который надо вернуть при выключении Reality
  const tlsOf = (cfg, d = xray.detect(cfg)) => { const i = d.vision && !d.vision.reality && cfg.inbounds.find((x) => x.tag === d.vision.tag); return i ? { streamSettings: structuredClone(i.streamSettings), fallbacks: structuredClone(i.settings?.fallbacks || []) } : null };

  // Собрать конфиг из текущего и состояния
  function build(cfg, s) {
    cfg = structuredClone(cfg);
    cfg.inbounds ||= []; cfg.outbounds ||= []; cfg.routing ||= {}; cfg.routing.rules ||= [];
    const d = xray.detect(cfg);
    // Hysteria2 и XHTTP: выключенный вход убираем, его описание храним, чтобы вернуть как было
    for (const k of ['hy2', 'xhttp']) {
      const tag = d[k]?.tag;
      if (!s.proto[k] && tag) cfg.inbounds = cfg.inbounds.filter((i) => i.tag !== tag);
      if (s.proto[k] && !tag && s.stash[k]) cfg.inbounds.push(structuredClone(s.stash[k]));
    }
    // Основной вход: Vision (TLS принимает Xray) или Reality (TLS принимает nginx, Xray узнаёт своих по ключу)
    const vi = d.vision && cfg.inbounds.find((i) => i.tag === d.vision.tag);
    if (vi && REALITY_MODES.includes(MODE)) {
      const keys = get('reality_keys', null);
      if (s.reality && keys && !d.vision.reality) {
        vi.streamSettings = { network: 'raw', security: 'reality', realitySettings: { dest: SOCK_TLS, xver: 1, serverNames: realityNames(), privateKey: keys.priv, shortIds: [keys.sid] } };
        if (vi.settings) delete vi.settings.fallbacks;
      } else if (!s.reality && d.vision.reality && s.stash.tls) {
        vi.streamSettings = structuredClone(s.stash.tls.streamSettings);
        vi.settings = { ...vi.settings, fallbacks: structuredClone(s.stash.tls.fallbacks) };
      }
    }
    // SOCKS5
    cfg.inbounds = cfg.inbounds.filter((i) => !isSocks(i) && i.tag !== 'mp-probe');
    if (s.socks.on) cfg.inbounds.push({ tag: s.socks.tag || 'socks5', listen: '0.0.0.0', port: Number(s.socks.port), protocol: 'mixed', settings: { auth: 'password', accounts: [{ user: s.socks.user, pass: s.socks.pass }], udp: false } });
    // WARP: выход и пробный вход для проверки (только 127.0.0.1)
    cfg.outbounds = cfg.outbounds.filter((o) => o.tag !== 'warp');
    const warpOn = s.warp && s.warp_out;
    if (warpOn) {
      cfg.outbounds.push(structuredClone(s.warp_out));
      cfg.inbounds.push({ tag: 'mp-probe', listen: '127.0.0.1', port: PROBE_PORT, protocol: 'socks', settings: { auth: 'noauth', udp: false } });
    }
    // Исходящий IP: адрес, с которого выход direct идёт в интернет. С IPv4-адресом на IPv6 не выйти — домены только в IPv4
    const fr = cfg.outbounds.find((o) => o.protocol === 'freedom' && o.tag === tagsOf(cfg).direct);
    if (fr) {
      if (s.out_ip) { fr.sendThrough = s.out_ip; fr.settings = { ...fr.settings, domainStrategy: 'UseIPv4' } }
      else if (fr.sendThrough) {
        delete fr.sendThrough;
        if (fr.settings?.domainStrategy === 'UseIPv4') { delete fr.settings.domainStrategy; if (!Object.keys(fr.settings).length) delete fr.settings }
      }
    }
    // Правила: свои пересобираем, чужие и базовые (блок локальных адресов и т. п.) не трогаем
    const keep = cfg.routing.rules.filter((r) => !String(r.ruleTag || '').startsWith('mp-') && !(r.outboundTag === 'warp' && !r.ruleTag));
    const tags = tagsOf(cfg), mine = [];
    if (warpOn) mine.push({ type: 'field', inboundTag: ['mp-probe'], outboundTag: 'warp', ruleTag: 'mp-probe' });
    const user = s.routes.filter((r) => r.on && (r.to !== 'warp' || warpOn)).flatMap((r) => routeRules(r, tags));
    cfg.routing.rules = [...mine, ...keep, ...user];
    return xray.fillUsers(cfg, activeUsers());
  }

  // Перезапуск Xray обрывает и сам запрос админки (он идёт через Xray), поэтому всё с перезапуском — фоновая задача:
  // ответ уходит сразу, результат админка спрашивает по GET api/job
  let job = { id: 0, running: false, ok: true, error: '', note: '', text: '', log: '', at: 0 };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const startJob = (note) => { job = { id: job.id + 1, running: true, ok: null, error: '', note, text: '', log: '', at: now() }; return job.id };
  // Итоги задач по номеру: кто-то ждёт конца своей задачи (перевод адреса), а общая job к тому времени уже про другую
  const results = new Map(), waiters = new Map();
  const endJob = (id, r) => {
    if (job.id === id) Object.assign(job, { running: false, ok: !!r.ok, error: r.error || '', text: r.text || '', log: r.log || '' });
    const res = { ok: !!r.ok, error: r.error || '' };
    results.set(id, res); if (results.size > 30) results.delete(results.keys().next().value);
    for (const w of waiters.get(id) || []) w(res);
    waiters.delete(id);
    onRestart?.();
  };
  // Дождаться конца задачи id (её вернул apply в поле job): { ok, error }
  const waitJob = (id, ms = 180000) => results.has(id) ? Promise.resolve(results.get(id)) : new Promise((ok) => {
    const done = (r) => { clearTimeout(t); ok(r) }, t = setTimeout(() => done({ ok: false, error: 'не дождался перезапуска Xray' }), ms);
    waiters.set(id, [...(waiters.get(id) || []), done]);
  });

  // Применить: проверить, заменить, перезапустить, при сбое вернуть. mutate меняет состояние; history=false — без записи в историю.
  // Промис отвечает сразу после проверки (или ошибки); перезапуск идёт дальше в очереди
  function apply(note, mutate, { body: forcedBody, history = true } = {}) {
    return new Promise((answer) => queue(async () => {
      // Любая ошибка до перезапуска (диск полон, конфиг не читается, база занята) — ответ с ошибкой и прежнее состояние.
      // Без этого запрос висел бы вечно, а на старте админка не доходила до своих таймеров (та же форма, что 26.11.2026)
      let before = null, prevBody = '', id = 0, swapped = false;
      try {
        before = snapshot(); prevBody = readFileSync(CFG, 'utf8');
        mutate?.();
        const next = forcedBody ? xray.fillUsers(JSON.parse(forcedBody), activeUsers()) : build(JSON.parse(prevBody), snapshot());
        const text = JSON.stringify(next, null, 2);
        if (text === JSON.stringify(JSON.parse(prevBody), null, 2)) return answer({ ok: true, same: true });
        writeFileSync(CAND, text, { mode: 0o600 });
        const t = await agent('xray-test ' + basename(CAND));
        if (t.code !== 0) { restore(before); return answer({ ok: false, error: t.code < 0 ? t.out : 'Xray не принял конфиг: ' + lastLines(t.out), stage: 'test' }) }
        if (history) {
          db.prepare('INSERT INTO config_history (at, note, body, state) VALUES (?, ?, ?, ?)').run(now(), note, prevBody, JSON.stringify(before));
          db.prepare('DELETE FROM config_history WHERE id NOT IN (SELECT id FROM config_history ORDER BY id DESC LIMIT ?)').run(KEEP);
        }
        renameSync(CAND, CFG); swapped = true;
        id = startJob(note);
        answer({ ok: true, pending: true, job: id });
        await sleep(400);   // ответ успевает уйти до перезапуска
        const r = await agent('xray-restart', 90000);
        if (r.code !== 0) {
          writeFileSync(CFG, prevBody); restore(before);
          await agent('xray-restart', 90000);
          if (history) db.prepare('DELETE FROM config_history WHERE id = (SELECT MAX(id) FROM config_history)').run();
          const j = await agent('journal 15');
          return endJob(id, { ok: false, error: 'Xray не запустился с новым конфигом, вернули как было', log: j.out.split('\n').slice(-6).join('\n') });
        }
        log('конфиг Xray:', note);
        endJob(id, { ok: true });
      } catch (e) {
        log('конфиг Xray не применился:', note, '—', e.message);
        try { if (swapped && prevBody) writeFileSync(CFG, prevBody); if (before) restore(before) } catch {}
        if (id) endJob(id, { ok: false, error: e.message }); else answer({ ok: false, error: 'Не получилось применить: ' + e.message });
      }
    }));
  }
  // Команда помощнику, после которой Xray перезапускается (обновление, базы, сертификат): тоже фоном
  function background(note, line, timeout, okText) {
    return new Promise((answer) => queue(async () => {
      const id = startJob(note);
      answer({ ok: true, pending: true, job: id });
      await sleep(400);
      const r = await agent(line, timeout);
      endJob(id, r.code === 0 ? { ok: true, text: okText, log: r.out } : { ok: false, error: r.out.split('\n').filter(Boolean).slice(-3).join(' ') || 'Не получилось', log: r.out });
    }));
  }
  const lastLines = (s) => s.split('\n').filter((l) => l.trim()).slice(-2).join(' ').replace(/^.*?(Failed|failed|error)/i, '$1').slice(0, 400);

  async function status() {
    const r = await agent('status', 8000);
    const st = r.code === 0 ? J(r.out.split('\n').pop(), null) : null;
    return { agent: r.code === 0, agent_error: r.code === 0 ? '' : r.out, ...(st || {}), since: Number(st?.since) || 0, mem: Number(st?.mem) || 0 };
  }

  function stateForAdmin() {
    const s = snapshot();
    return {
      mode: MODE, managed: MODE !== 'existing',
      routes: s.routes, targets: TARGETS,
      warp: { on: s.warp, registered: !!s.warp_out, plus: !!s.warp_reg, account: s.warp_acc || 'free' },
      proto: { vision: true, hy2: s.proto.hy2, xhttp: s.proto.xhttp, hy2_known: !!(s.proto.hy2 || s.stash.hy2), xhttp_known: !!(s.proto.xhttp || s.stash.xhttp),
        reality: s.reality, reality_can: REALITY_MODES.includes(MODE) },
      out_ip: s.out_ip || '',
      socks: { on: s.socks.on, port: s.socks.port, user: s.socks.user, pass: s.socks.pass },
      mtg: process.env.MP_MTG_PORT ? { port: Number(process.env.MP_MTG_PORT), link: `tg://proxy?server=${getSetting(db, 'domain')}&port=${process.env.MP_MTG_PORT}&secret=${process.env.MP_MTG_SECRET || ''}` } : null,
      history: db.prepare('SELECT id, at, note, length(body) AS size FROM config_history ORDER BY id DESC').all(),
    };
  }

  // ---------- действия ----------
  const cleanRoute = (b, id) => {
    const values = [].concat(b.values || []).flatMap((v) => String(v).split(/[\s,]+/)).map((v) => v.trim()).filter(Boolean).slice(0, 500);
    if (!values.length) throw new Error('Добавьте хотя бы один адрес');
    const bad = values.filter((v) => !classify(v));
    if (bad.length) throw new Error('Не понял: ' + bad.slice(0, 3).join(', '));
    if (!TARGETS.includes(b.to)) throw new Error('Куда направить: напрямую, WARP или блок');
    return { id, on: b.on !== false, name: String(b.name || '').trim().slice(0, 40) || values[0], values, to: b.to };
  };
  const routes = {
    add: (b) => apply('Маршрут добавлен', () => { const rs = get('routes', []); rs.push(cleanRoute(b, nextId(rs))); put('routes', rs) }),
    edit: (id, b) => apply('Маршрут изменён', () => { const rs = get('routes', []), i = rs.findIndex((r) => r.id === id); if (i < 0) throw new Error('Нет такого маршрута'); rs[i] = b.values ? cleanRoute({ ...rs[i], ...b }, id) : { ...rs[i], on: b.on !== undefined ? !!b.on : rs[i].on }; put('routes', rs) }),
    remove: (id) => apply('Маршрут удалён', () => put('routes', get('routes', []).filter((r) => r.id !== id))),
    clear: () => apply('Все маршруты удалены', () => put('routes', [])),
    order: (ids) => apply('Порядок маршрутов', () => { const rs = get('routes', []); const by = new Map(rs.map((r) => [r.id, r])); const out = ids.map(Number).filter((i) => by.has(i)).map((i) => by.get(i)); for (const r of rs) if (!out.includes(r)) out.push(r); put('routes', out) }),
    preset: (name) => apply('Готовый набор «' + (PRESETS[name]?.name || name) + '»', () => {
      const P = PRESETS[name]; if (!P) throw new Error('Нет такого набора');
      const rs = get('routes', []); if (rs.some((r) => r.name === P.name)) throw new Error('Такой набор уже добавлен');
      rs.push({ id: nextId(rs), on: true, name: P.name, values: P.values, to: P.to }); put('routes', rs);
    }),
    test: (host) => whereTo(get('routes', []), host, snapshot().warp),
    // Открывается ли сайт с адреса сервера и через WARP: код ответа и время в мс
    async reach(host) {
      host = String(host || '').trim().toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/[/:?#].*$/, '');
      if (!/^[a-z0-9.-]{1,253}$/.test(host) || !host.includes('.')) return { error: 'Нужен адрес сайта, например chatgpt.com' };
      const warpOn = snapshot().warp && !!get('warp_out', null);
      const r = await agent(`reach ${host}${warpOn ? ' ' + PROBE_PORT : ''}`, 25000);
      if (r.code !== 0) return { error: r.out || 'Помощник не ответил' };
      const out = { host, server: null, warp: warpOn ? null : undefined };
      for (const l of r.out.split('\n')) {
        const [k, code, t, ce] = l.trim().split(/\s+/); if (!['server', 'warp'].includes(k)) continue;
        out[k] = { code: Number(code) || 0, ms: Math.round(Number(t) * 1000) || 0, curl: Number(ce) || 0 };
      }
      return out;
    },
  };

  const warp = {
    async register() {
      let reg; try { reg = await warpApi.register() } catch (e) { return { ok: false, error: e.message } }
      return apply('WARP: новая регистрация', () => { put('warp_out', reg.outbound); put('warp_reg', reg.reg); setSetting(db, 'warp_acc', reg.account); setSetting(db, 'warp_on', '1') });
    },
    async toggle(on) {
      if (on && !get('warp_out', null)) return warp.register();
      return apply(on ? 'WARP включён' : 'WARP выключен', () => setSetting(db, 'warp_on', on ? '1' : '0'));
    },
    async license(key) {
      key = String(key || '').trim();
      if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{8}-[A-Za-z0-9]{8}$/.test(key)) return { ok: false, error: 'Ключ WARP+ выглядит так: xxxxxxxx-xxxxxxxx-xxxxxxxx' };
      try { const acc = await warpApi.license(get('warp_reg', null), key); setSetting(db, 'warp_acc', acc); return { ok: true, account: acc } } catch (e) { return { ok: false, error: e.message } }
    },
    async check() {
      if (!snapshot().warp) return { ok: false, error: 'WARP выключен' };
      const r = await agent('probe ' + PROBE_PORT, 20000);
      const kv = Object.fromEntries(r.out.split('\n').map((l) => l.split('=')).filter((p) => p.length === 2));
      if (!kv.warp) return { ok: false, error: r.code < 0 ? r.out : 'Через WARP не открылось. Попробуйте зарегистрировать заново' };
      return { ok: kv.warp === 'on' || kv.warp === 'plus', warp: kv.warp, ip: kv.ip, loc: kv.loc, colo: kv.colo };
    },
  };

  const proto = {
    async set(b) {
      const s = snapshot(), p = { ...s.proto }, so = { ...s.socks };
      for (const k of ['hy2', 'xhttp']) if (b[k] !== undefined) { if (b[k] && !s.stash[k]) return { ok: false, error: `Входа ${k === 'hy2' ? 'Hysteria2' : 'XHTTP'} на этом сервере не было: включите его переустановкой` }; p[k] = !!b[k] }
      if (b.socks) {
        const port = Math.round(Number(b.socks.port ?? so.port));
        if (!(port >= 1 && port <= 65535) || [443, 80, 10085, PROBE_PORT].includes(port)) return { ok: false, error: 'Порт SOCKS: от 1 до 65535, кроме 80, 443 и служебных' };
        so.on = !!b.socks.on; so.port = port;
        so.user = String(b.socks.user ?? so.user).trim() || so.user || 'u' + Math.random().toString(36).slice(2, 8);
        so.pass = String(b.socks.pass ?? so.pass).trim() || so.pass || Math.random().toString(36).slice(2, 14);
        if (!/^[\w.-]{1,32}$/.test(so.user) || !/^[\w.@#%+=-]{6,64}$/.test(so.pass)) return { ok: false, error: 'Логин SOCKS: буквы, цифры, . _ -; пароль от 6 символов без пробелов' };
        if (so.on && (!s.socks.on || so.port !== s.socks.port)) {
          const f = await agent('port-free ' + port); if (f.code === 1) return { ok: false, error: `Порт ${port} уже занят` + (/"([^"]+)"/.exec(f.out) ? `: ${/"([^"]+)"/.exec(f.out)[1]}` : '') };
        }
      }
      // Reality: сайт nginx с TLS готовит помощник (сертификат домена), ключи — свои, один раз
      let stash = s.stash;
      if (b.reality !== undefined && !!b.reality !== s.reality) {
        if (!REALITY_MODES.includes(MODE)) return { ok: false, error: 'Reality включается, когда на 443 только monolit: способы «Весь сервер под VPN» и «Второй IP»' };
        if (b.reality) {
          const t = await agent('tlssite', 60000);
          if (t.code !== 0) return { ok: false, error: t.code === 2 && /нет такой команды/.test(t.out) ? 'Помощник на сервере старый: обновите monolit' : t.out.split('\n').filter(Boolean).pop() || 'nginx не принял сайт для Reality' };
          if (!get('reality_keys', null)) put('reality_keys', realityKeys());
          const tls = tlsOf(xray.read()); if (tls) stash = { ...stash, tls };
        } else if (!s.stash.tls) return { ok: false, error: 'Не помню, каким был вход Vision: верните его переустановкой' };
      }
      const reality = b.reality !== undefined ? !!b.reality : s.reality;
      const r = await apply(reality !== s.reality ? (reality ? 'Основной вход: Reality' : 'Основной вход: Vision') : 'Протоколы', () => { put('proto', p); put('socks', so); put('stash', stash); setSetting(db, 'reality_on', reality ? '1' : '0') });
      // Порт SOCKS в файрволе: открываем сами (если при установке не было --no-firewall) и сами же закрываем.
      // Закрываем только то, что открыли мы: правило, которое было до нас, не трогаем
      if (r.ok && process.env.MP_FIREWALL !== '0') {
        const opened = get('socks_fw', null);
        if (opened && (!so.on || opened !== so.port)) { await agent(`fw-close ${opened} tcp`); put('socks_fw', null) }
        if (so.on && get('socks_fw', null) !== so.port) {
          const o = await agent(`fw-open ${so.port} tcp`);
          // ufw пишет «Rule added», если правила не было, и «Skipping…», если было; firewalld молчит
          if (o.code === 0 && (/Rule added/.test(o.out) || !o.out.trim())) put('socks_fw', so.port);
        }
      }
      return r;
    },
    async mtg(on) { const r = await agent('mtg ' + (on ? 'on' : 'off')); return r.code === 0 ? { ok: true } : { ok: false, error: r.out || 'Не получилось' } },
  };

  // Исходящий IP: '' — как решает сервер (таблица маршрутов), иначе один из IPv4 сервера.
  // Сначала помощник проверяет, что с этого адреса есть выход в интернет и каким его видят снаружи
  const egress = {
    async set(ip) {
      ip = String(ip || '').trim();
      if (ip && !IPV4.test(ip)) return { ok: false, error: 'Выберите IP из списка' };
      if (ip === (snapshot().out_ip || '')) return { ok: true, same: true };
      let seen = '';
      if (ip) {
        const r = await agent('egress ' + ip, 30000);
        if (r.code === 2 && /нет такой команды/.test(r.out)) return { ok: false, error: 'Помощник на сервере старый: обновите monolit' };
        if (r.code === 3) return { ok: false, error: `Адреса ${ip} на сервере нет` };
        seen = (r.out.split('\n').pop() || '').trim();
        if (r.code !== 0 || !IPV4.test(seen)) return { ok: false, error: `С адреса ${ip} нет выхода в интернет. Проверьте, что провайдер разрешает отправку с него` };
      }
      const r = await apply(ip ? 'Исходящий IP ' + ip : 'Исходящий IP: как решает сервер', () => setSetting(db, 'out_ip', ip));
      return r.ok ? { ...r, seen } : r;
    },
  };

  // Входящий IP (способ «Второй IP»): адрес, на котором Xray принимает Vision и Hysteria2. Истина — сам конфиг Xray.
  // Меняется без переустановки: в конфиге и в описании выключенного Hysteria2 старый адрес заменяется новым
  const inbound = {
    current: () => { try { return listenOf(xray.read(), xray) } catch { return '' } },
    async set(ip) {
      ip = String(ip || '').trim();
      if (MODE !== 'ip2') return { ok: false, error: 'Входящий IP меняется только при способе «Второй IP»' };
      if (!IPV4.test(ip)) return { ok: false, error: 'Выберите IP из списка' };
      const cfg = xray.read(), from = listenOf(cfg, xray);
      if (!from) return { ok: false, error: 'В конфиге Xray не нашёлся входящий адрес' };
      if (from === ip) return { ok: true, same: true };
      return apply('Входящий IP ' + ip, () => {
        const st = get('stash', {});
        for (const k of Object.keys(st)) if (st[k]?.listen === from) st[k].listen = ip;
        put('stash', st);
      }, { body: JSON.stringify(moveListen(cfg, from, ip)) });
    },
  };

  const history = {
    async rollback(id) {
      const h = db.prepare('SELECT * FROM config_history WHERE id = ?').get(id);
      if (!h) return { ok: false, error: 'Нет такой версии' };
      // Версия записана с адресом, на котором Xray слушал тогда. Возвращаем маршруты и протоколы, а входящий адрес
      // оставляем нынешний: иначе Xray встал бы на прежний адрес, пока домен смотрит на новый
      let body = h.body, state = J(h.state, snapshot());
      try {
        const old = JSON.parse(h.body), was = listenOf(old, xray), cur = listenOf(xray.read(), xray);
        if (was && cur && was !== cur) {
          body = JSON.stringify(moveListen(old, was, cur));
          for (const k of Object.keys(state.stash || {})) if (state.stash[k]?.listen === was) state.stash[k].listen = cur;
        }
      } catch {}
      return apply('Возврат к версии от ' + new Date(h.at * 1000).toLocaleString('ru-RU', { timeZone: process.env.TZ || 'Europe/Moscow' }), () => restore(state), { body });
    },
    show: (id) => db.prepare('SELECT body FROM config_history WHERE id = ?').get(id)?.body || null,
  };

  // Сервер: команды помощнику
  const server = {
    status,
    job: () => job,
    wait: waitJob,
    restart: () => background('Перезапуск Xray', 'xray-restart', 90000, 'Xray перезапущен'),
    update: () => background('Обновление Xray', 'xray-update', 240000, 'Xray обновлён'),
    geo: () => background('Обновление баз адресов', 'geo-update', 240000, 'Базы адресов обновлены'),
    cert: () => background('Продление сертификата', 'cert-renew', 240000, 'Сертификат проверен'),
    reload: () => agent('nginx-reload'),
    journal: (n) => agent('journal ' + Math.min(500, Math.max(10, Number(n) || 100))),
  };

  // Запуск: первый раз или после переустановки (install.sh переписал конфиг) — взять состояние из конфига и вернуть свои маршруты
  async function start() {
    if (MODE === 'existing') return;
    // docker --env-file кавычки не снимает, а помощник (ipmove env) отдаёт подпись без них: сравниваем без кавычек,
    // иначе первый же перезапуск после перевода адреса стирал историю и заново разбирал конфиг
    const sig = unquote(process.env.MP_APPLY_SIG), kept = freshKeep(J(getSetting(db, 'pre_reconf', ''), null), now());
    setSetting(db, 'pre_reconf', '');   // снимок годится только этому запуску: залежавшийся вернул бы давно изменённое
    if (getSetting(db, 'managed') !== '1' || unquote(getSetting(db, 'apply_sig')) !== sig) {
      // Установка другая (способ, домен, сертификат, порты, путь XHTTP): старые версии конфига к ней не подходят,
      // откат к ним сломал бы Xray или XHTTP — историю начинаем заново
      const prev = unquote(getSetting(db, 'apply_sig', ''));
      if (prev && prev !== sig) { db.prepare('DELETE FROM config_history').run(); log('установка изменилась, история конфигов очищена') }
      importFromConfig(); setSetting(db, 'apply_sig', sig);
      // Адрес меняли из админки: install.sh собрал входы по флагам установки, а включённое и выключенное здесь — главнее
      if (kept) { restore({ ...kept, stash: { ...kept.stash, ...snapshot().stash } }); log('после смены адреса вернул маршруты, WARP и протоколы') }
      const cfg = xray.read(), want = build(cfg, snapshot());
      if (JSON.stringify(want.routing) !== JSON.stringify(cfg.routing) || want.inbounds.length !== cfg.inbounds.length || JSON.stringify(want.outbounds) !== JSON.stringify(cfg.outbounds)
        || !!xray.detect(want).vision?.reality !== !!xray.detect(cfg).vision?.reality) {
        const r = await apply('Маршруты после переустановки', null, { history: false });
        if (!r.ok) log('маршруты после переустановки не применились:', r.error);
      }
    }
  }

  // Перед сменой адреса: запомнить, что включено (start() вернёт это после переустановки)
  const keep = () => setSetting(db, 'pre_reconf', JSON.stringify({ at: now(), s: snapshot() }));
  // Ключ и короткий id основного входа Reality для подписок и мостов; null — вход Vision
  const reality = () => { const k = get('reality_keys', null); try { return k && xray.detect().vision?.reality ? { pub: k.pub, sid: k.sid } : null } catch { return null } };
  return { stateForAdmin, routes, warp, proto, egress, inbound, reality, history, server, start, apply, keep };
}

const REALITY_MODES = ['bare', 'ip2'];   // на 443 только monolit: за Xray один сайт, его и показываем посторонним
export function realityKeys() {
  const { publicKey, privateKey } = generateKeyPairSync('x25519');
  return { priv: privateKey.export({ format: 'jwk' }).d, pub: publicKey.export({ format: 'jwk' }).x, sid: randomBytes(8).toString('hex') };
}

// Адрес, на котором слушает вход Vision, если это конкретный IPv4 (способ «Второй IP»), иначе ''
export function listenOf(cfg, xray) {
  const l = xray.detect(cfg).vision?.listen || '';
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(l) && l !== '0.0.0.0' && !l.startsWith('127.') ? l : '';
}
export const unquote = (v) => String(v || '').replace(/^"|"$/g, '');
// Снимок настроек, сделанный перед сменой адреса: годится час. Переустановка идёт минуты; снимок старше — от смены,
// которая не дошла до конца, и вернул бы давно изменённые маршруты и протоколы
export const freshKeep = (k, t, ttl = 3600) => k && k.s && k.at && t - k.at < ttl ? k.s : null;

// Что делать с настройками сети по итогу проверки (agent/netsave.sh check): none — всё в порядке или сами не можем,
// fix — править сейчас, mark — лишний адрес увидели впервые, wait — ждём, не вернётся ли он. since — когда увидели
export function netsaveDue(st, since, t, wait = 240) {   // чуть меньше шага сверки (5 минут): вторая же сверка и уберёт
  if (!st || st.tool === 'none' || st.manual || !(st.missing?.length || st.stale?.length)) return 'none';
  if (st.missing?.length) return 'fix';   // рабочий адрес не записан: после перезагрузки VPN пропал бы
  return !since ? 'mark' : t - since < wait ? 'wait' : 'fix';
}

// Почему пересылку «старый>новый» пора снять, или '' — она на месте
export const staleFwd = (fwd, listen) => { const [from, to] = String(fwd || '').split('>'); return !from || !to || !listen ? '' : listen === from ? 'Xray снова слушает на этом адресе' : listen !== to ? `Xray слушает на ${listen}` : '' };

// Конфиг, где все входы с адреса from слушают на to
export function moveListen(cfg, from, to) {
  cfg = structuredClone(cfg);
  for (const i of cfg.inbounds || []) if (i.listen === from) i.listen = to;
  return cfg;
}

// Готовые наборы. Ничего не включено само: человек добавляет набор и видит, что в нём
export const PRESETS = {
  ai: { name: 'Нейросети через WARP', to: 'warp', values: ['openai.com', 'chatgpt.com', 'oaistatic.com', 'oaiusercontent.com', 'claude.ai', 'anthropic.com', 'gemini.google.com', 'aistudio.google.com'] },
  ads: { name: 'Реклама в блок', to: 'block', values: ['geosite:category-ads-all'] },
  torrent: { name: 'Торренты в блок', to: 'block', values: ['bittorrent'] },
};
