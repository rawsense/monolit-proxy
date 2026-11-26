// A-запись домена в Cloudflare: админка меняет её сама, когда VPN переводят на другой адрес сервера.
// Нужен токен API с одним правом — правка DNS одной зоны (шаблон «Edit zone DNS»). Токен хранится в базе админки.
// Запись должна быть «только DNS»: через прокси Cloudflare подключения VPN не проходят.
import { getSetting, setSetting } from './db.mjs';

const API = 'https://api.cloudflare.com/client/v4';
const TTL = 60;   // секунд: приложения и мосты переходят на новый адрес за минуту-две

export function createCf({ db, log = () => {}, fetch: f = fetch }) {
  const token = () => getSetting(db, 'cf_token', '');

  async function call(tok, method, path, body) {
    let r;
    try { r = await f(API + path, { method, headers: { authorization: 'Bearer ' + tok, 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(15000) }) }
    catch (e) { throw new Error('Cloudflare не ответил: ' + e.message) }
    let j = null; try { j = await r.json() } catch {}
    if (!j?.success) {
      const e = j?.errors?.[0] || {};
      // настоящий API: чужой или обрезанный токен — 403 с кодом 9109 «Invalid access token» (или 400 «Invalid format»),
      // верный токен без нужного права — 403 с кодом 10000 «Authentication error»
      if (e.code === 9109 || r.status === 401 || /invalid (access )?token|invalid format|invalid request headers/i.test(e.message || '')) throw new Error('Cloudflare не принял токен: проверьте, что он скопирован целиком');
      if (r.status === 403 || e.code === 10000) throw new Error('Токену не хватает прав: нужен шаблон «Edit zone DNS» для этой зоны');
      throw new Error('Cloudflare: ' + (e.message || 'ответил ' + r.status));
    }
    return j.result;
  }

  // Зона домена: vpn.example.ru лежит в example.ru (или в vpn.example.ru, если зона заведена на поддомен)
  async function zoneOf(tok, domain) {
    const parts = domain.split('.');
    for (let i = 0; i <= parts.length - 2; i++) {
      const name = parts.slice(i).join('.');
      const z = await call(tok, 'GET', '/zones?name=' + encodeURIComponent(name));
      if (z?.length) return { id: z[0].id, name: z[0].name };
    }
    throw new Error(`Токен не видит зону домена ${domain}. В «Zone Resources» выберите зону ${parts.slice(-2).join('.')}`);
  }

  // Что сейчас в DNS: { zone, records: [{ id, ip, proxied, ttl }] }
  async function look(tok, domain) {
    const zone = await zoneOf(tok, domain);
    const recs = await call(tok, 'GET', `/zones/${zone.id}/dns_records?type=A&name=${encodeURIComponent(domain)}`);
    return { zone, records: (recs || []).map((x) => ({ id: x.id, ip: x.content, proxied: !!x.proxied, ttl: x.ttl })) };
  }

  // Проверить токен и запомнить его. Пустой токен — отключить
  async function connect(tok, domain) {
    tok = String(tok || '').trim();
    if (!tok) { setSetting(db, 'cf_token', ''); setSetting(db, 'cf_zone', ''); return { on: false } }
    if (!/^[A-Za-z0-9_-]{20,200}$/.test(tok)) throw new Error('Токен выглядит не так: это одна строка из букв и цифр, без пробелов');
    const s = await look(tok, domain);
    // право на правку проверяем делом: записываем запись тем же значением (Cloudflare принимает такой запрос, ничего не меняя)
    const one = s.records.length === 1 ? s.records[0] : null;
    if (one) await call(tok, 'PATCH', `/zones/${s.zone.id}/dns_records/${one.id}`, { content: one.ip });
    setSetting(db, 'cf_token', tok); setSetting(db, 'cf_zone', s.zone.name);
    log('Cloudflare подключён, зона', s.zone.name);
    return state(domain, s);
  }

  // Поменять A-запись домена на ip. Возвращает { changed, from }
  async function setA(domain, ip) {
    const tok = token(); if (!tok) throw new Error('Cloudflare не подключён');
    const s = await look(tok, domain);
    if (s.records.length > 1) throw new Error(`У ${domain} несколько A-записей (${s.records.map((x) => x.ip).join(', ')}): оставьте одну`);
    const one = s.records[0];
    if (one?.proxied) throw new Error(`У записи ${domain} включён прокси Cloudflare (оранжевое облако): VPN через него не работает. Переключите запись на «DNS only»`);
    if (one && one.ip === ip && one.ttl === TTL) return { changed: false, from: ip };
    const body = { type: 'A', name: domain, content: ip, ttl: TTL, proxied: false };
    if (one) await call(tok, 'PATCH', `/zones/${s.zone.id}/dns_records/${one.id}`, body);
    else await call(tok, 'POST', `/zones/${s.zone.id}/dns_records`, body);
    log(`Cloudflare: A-запись ${domain} ${one ? one.ip + ' → ' : ''}${ip}`);
    return { changed: true, from: one?.ip || '' };
  }

  // Для админки: подключён ли, что в записи и можно ли её менять
  async function state(domain, known) {
    if (!token()) return { on: false };
    try {
      const s = known || await look(token(), domain), one = s.records[0];
      return { on: true, zone: s.zone.name, ip: s.records.map((x) => x.ip).join(', '), proxied: !!one?.proxied, many: s.records.length > 1, error: '' };
    } catch (e) { return { on: true, zone: getSetting(db, 'cf_zone', ''), ip: '', proxied: false, many: false, error: e.message } }
  }

  return { connect, setA, state, on: () => !!token() };
}
