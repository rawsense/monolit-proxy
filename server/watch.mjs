// Доступность сервера из России и уведомления в Telegram.
// check-host.net открывает TCP 443 адреса сервера с точек в России и за границей. Точка в России считается, только если
// с неё открывается контрольный адрес: узлы check-host бывают сломаны, и без контроля это выглядело бы как блокировка.
// Плохой результат перепроверяем через 5 минут и только потом пишем в Telegram: случайный сбой точки не тревога.
import { promises as dns } from 'node:dns';
import { now, getSetting, setSetting } from './db.mjs';

const API = 'https://check-host.net';
const CONTROL = '77.88.55.242:443';            // ya.ru: из России открывается всегда
const ABROAD = ['de', 'nl', 'fi', 'fr', 'gb', 'se', 'pl', 'ch', 'at', 'it', 'es'];
const RECHECK = 5 * 60;
const J = (s, d) => { try { return JSON.parse(s) } catch { return d } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// A-записи домена: напрямую у DNS, а если он недоступен — через системный резолвер
export async function resolve4(d) {
  if (!d) return [];
  try { const a = await dns.resolve4(d); if (a.length) return a } catch {}
  try { return [...new Set((await dns.lookup(d, { family: 4, all: true })).map((x) => x.address))] } catch { return [] }
}

async function get(path) {
  const r = await fetch(API + path, { headers: { accept: 'application/json', 'user-agent': 'monolit-proxy' }, signal: AbortSignal.timeout(15000) });
  const t = await r.text(), j = J(t, null);
  if (!j) throw new Error(r.ok ? 'check-host ответил не JSON' : 'check-host ответил ' + r.status);
  if (j.error === 'limit_exceeded') throw new Error('check-host просит подождать: слишком много проверок');
  if (j.error) throw new Error('check-host: ' + j.error);
  return j;
}

// Узлы: { имя: [страна, город] }. Список меняется редко — берём раз в сутки
let nodes = null, nodesAt = 0;
async function nodeList() {
  if (nodes && Date.now() - nodesAt < 86400e3) return nodes;
  const j = await get('/nodes/hosts');
  nodes = Object.fromEntries(Object.entries(j.nodes || {}).map(([n, v]) => [n, [String(v.location?.[0] || '').toLowerCase(), v.location?.[2] || v.location?.[1] || '']]));
  nodesAt = Date.now(); return nodes;
}

// TCP-проверка: { узел: { ok, ms } }. Узел, который не успел ответить, в результат не попадает
async function tcp(host, list) {
  if (!list.length) return {};
  const q = list.map((n) => '&node=' + encodeURIComponent(n)).join('');
  const { request_id: id } = await get(`/check-tcp?host=${encodeURIComponent(host)}${q}`);
  if (!id) throw new Error('check-host не принял проверку');
  let res = {};
  for (let i = 0; i < 12; i++) {
    await sleep(2500);
    res = await get('/check-result/' + encodeURIComponent(id));
    if (list.every((n) => res[n] !== null && res[n] !== undefined)) break;
  }
  const out = {};
  for (const n of list) {
    const v = res[n]; if (!Array.isArray(v)) continue;
    const hit = v.find((x) => x && typeof x.time === 'number');
    out[n] = hit ? { ok: true, ms: Math.round(hit.time * 1000) } : { ok: false };
  }
  return out;
}

// Итог по точкам. Блокировку включают у операторов по очереди: не открыла хотя бы одна исправная точка в России —
// адрес уже режут, остальные сети на подходе (26.11.2026: Москва открывала, Петербург нет, а у людей VPN уже не работал)
export function verdict(ru, abroad) {
  const healthy = ru.filter((x) => x.healthy);
  if (abroad.length && !abroad.some((x) => x.ok)) return 'down';
  if (!healthy.length) return 'unknown';
  return healthy.some((x) => !x.ok) ? 'blocked' : 'ok';
}

// ---------- Telegram ----------
const tgApi = async (token, method, body) => {
  if (!/^\d{5,}:[\w-]{20,}$/.test(token || '')) throw new Error('Токен бота выглядит так: 123456789:AA…');
  let r;
  try { r = await fetch(`https://api.telegram.org/bot${token}/${method}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body || {}), signal: AbortSignal.timeout(15000) }) }
  catch (e) { throw new Error('Telegram не ответил: ' + e.message) }
  const j = J(await r.text(), {});
  if (!j.ok) throw new Error(j.error_code === 401 ? 'Telegram не узнал токен бота' : j.error_code === 400 && /chat not found/i.test(j.description) ? 'Чат не найден: напишите боту /start и проверьте ID' : j.description || 'Telegram ответил ' + r.status);
  return j.result;
};
export const tgSend = (token, chat, text) => tgApi(token, 'sendMessage', { chat_id: chat, text, disable_web_page_preview: true });
// ID чата не знают: берём из последнего сообщения боту (человек написал ему /start)
export async function tgFindChat(token) {
  const u = await tgApi(token, 'getUpdates', { limit: 20 });
  const m = [...u].reverse().map((x) => x.message || x.my_chat_member || x.channel_post).find((x) => x?.chat?.id);
  return m ? String(m.chat.id) : '';
}

export function createWatch({ db, log, server, adminUrl }) {
  const state = () => J(getSetting(db, 'watch_state', ''), null);
  let timer = null, running = null;

  async function notify(text) {
    const token = getSetting(db, 'tg_token', ''), chat = getSetting(db, 'tg_chat', '');
    if (!token || !chat) return false;
    try { await tgSend(token, chat, `monolit, ${server()}: ${text}`); return true } catch (e) { log('telegram:', e.message); return false }
  }

  // Куда подключаются приложения: адрес, на который смотрит домен
  async function target() {
    const domain = getSetting(db, 'domain', '');
    const a = await resolve4(domain);
    return { ip: a[0] || process.env.MP_IP2 || '', domain };
  }

  // only — проверить этот адрес, а не тот, на который смотрит домен (новый адрес до смены DNS)
  async function measure(only) {
    const { ip, domain } = only ? { ip: only, domain: getSetting(db, 'domain', '') } : await target();
    if (!ip) return { state: 'unknown', at: now(), ip: '', domain, error: `Не нашёл IP домена ${domain}` };
    const all = await nodeList();
    const ru = Object.keys(all).filter((n) => all[n][0] === 'ru');
    const abroad = ABROAD.flatMap((c) => Object.keys(all).filter((n) => all[n][0] === c)).slice(0, 3);
    if (!ru.length) return { state: 'unknown', at: now(), ip, domain, error: 'У check-host сейчас нет точек в России' };
    const main = await tcp(`${ip}:443`, [...ru, ...abroad]);
    const failed = ru.filter((n) => main[n] && !main[n].ok);
    const ctl = failed.length ? await tcp(CONTROL, failed).catch(() => ({})) : {};
    const row = (n) => ({ node: n.split('.')[0], city: all[n][1], ok: !!main[n]?.ok, ms: main[n]?.ms || 0, answered: !!main[n],
      healthy: !!main[n] && (main[n].ok || !!ctl[n]?.ok) });
    const R = ru.map(row), A = abroad.map(row).filter((x) => x.answered);
    const st = verdict(R, A);
    return { state: st, at: now(), ip, domain, ru: R, abroad: A, error: st === 'unknown' ? 'Точки check-host в России сейчас сами ничего не открывают, проверить не получилось' : '' };
  }

  const TEXT = {
    blocked: (r) => `IP ${r.ip} не открывается из России. Точки в России: ${r.ru.filter((x) => x.healthy && x.ok).length} из ${r.ru.filter((x) => x.healthy).length}, за границей: ${r.abroad.filter((x) => x.ok).length} из ${r.abroad.length}. Смените IP или домен в админке, раздел «Адрес»`,
    down: (r) => `сервер ${r.ip} не отвечает ни из России, ни из-за границы. Посмотрите, работает ли он у хостера`,
    ok: (r, was) => was === 'down' ? `сервер ${r.ip} снова отвечает` : `IP ${r.ip} снова открывается из России`,
  };

  // Записать результат. Плохой, отличный от прошлого, сначала перепроверяем (кроме ручной проверки)
  async function commit(r, manual) {
    const prev = state(), was = prev?.state;
    const bad = r.state === 'blocked' || r.state === 'down';
    if (bad && was !== r.state && !manual && getSetting(db, 'watch_pending', '') !== r.state) {
      setSetting(db, 'watch_pending', r.state); plan(RECHECK); log('доступность:', r.state, '— перепроверю через 5 минут');
      return prev;
    }
    setSetting(db, 'watch_pending', '');
    const out = { ...r, since: was === r.state ? prev.since || r.at : r.at };
    setSetting(db, 'watch_state', JSON.stringify(out));
    if (r.state !== 'unknown' && was && was !== 'unknown' && was !== r.state) {
      const t = TEXT[r.state](r, was);
      if (t) { log('доступность:', was, '→', r.state); await notify(t + (bad ? '\n' + adminUrl() : '')) }
    } else if (bad && !was) await notify(TEXT[r.state](r, was) + '\n' + adminUrl());
    return out;
  }

  async function check(manual = false, only = '') {
    if (running) return running;
    running = (async () => {
      try { return await commit(await measure(only), manual) }
      catch (e) {
        log('доступность:', e.message);
        const prev = state() || { state: 'unknown' };
        const out = { ...prev, error: e.message, failed_at: now() };
        setSetting(db, 'watch_state', JSON.stringify(out)); return out;
      } finally { running = null; if (!timer) plan() }
    })();
    return running;
  }

  const on = () => getSetting(db, 'watch_on', '1') === '1';
  const every = () => Math.min(360, Math.max(30, Number(getSetting(db, 'watch_every', '60')) || 60)) * 60;
  // Следующая проверка: через sec, или по расписанию от прошлой
  function plan(sec) {
    clearTimeout(timer); timer = null;
    if (!on()) return;
    const last = state()?.at || 0, wait = sec ?? Math.max(60, last + every() - now());
    timer = setTimeout(() => { timer = null; check() }, wait * 1000);
  }

  return {
    check, plan, notify,
    state: () => ({ ...(state() || { state: 'none' }), on: on(), every: every() / 60, pending: getSetting(db, 'watch_pending', ''), running: !!running }),
    start: () => plan(on() && !state() ? 120 : undefined),
  };
}
