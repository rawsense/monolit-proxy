// Связь с уже установленным Xray: читаем его конфиг, правим только своих клиентов (email mp-*),
// живые изменения — через API Xray (без перезапуска), постоянные — в config.json (переживут перезапуск)
import { execFile } from 'node:child_process';
import { readFileSync, writeFileSync, renameSync, copyFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const EMAIL = id => `mp-${id}`;
export const MAIN_TAG = 'vsRAWtlsVISION';   // основной вход, как его называет установка (и autoXRAY); чужой вход Reality своим не считаем
// mp-N — люди, mpn-N — ноды (ходят сюда за людей, пришедших по мосту)
// mp-N-x<выход><d|b> — тот же человек на подключении с выходом через прокси (exits.mjs), mpn-N-x… — нода с такими людьми
const isOurs = c => typeof c?.email === 'string' && /^mpn?-\d+(-x\d+[db])?$/.test(c.email);

export class Xray {
  constructor({ bin, config, api }) { Object.assign(this, { bin, config, api }); }

  read() { return JSON.parse(readFileSync(this.config, 'utf8')); }

  // Какие входы есть и как к ним подключаться
  detect(cfg = this.read()) {
    const out = { vision: null, hy2: null, xhttp: null, api: !!cfg.api?.listen || !!cfg.api?.tag, stats: !!cfg.stats };
    for (const i of cfg.inbounds || []) {
      const ss = i.streamSettings || {};
      // основной вход: Vision с сертификатом в самом Xray или Reality (тогда сертификат отдаёт nginx) — для людей это одно подключение
      if (i.protocol === 'vless' && (ss.network === 'raw' || ss.network === 'tcp' || !ss.network) && (ss.security === 'tls' || (ss.security === 'reality' && i.tag === MAIN_TAG)) && !out.vision)
        out.vision = { tag: i.tag, port: i.port, listen: i.listen || '0.0.0.0', reality: ss.security === 'reality' };
      else if (i.protocol === 'vless' && ss.network === 'xhttp' && !out.xhttp)
        out.xhttp = { tag: i.tag, port: i.port, listen: i.listen, path: (ss.xhttpSettings?.path || '').replace(/^\//, '') };
      else if (i.protocol === 'hysteria' && !out.hy2)
        out.hy2 = { tag: i.tag, port: i.port, listen: i.listen || '0.0.0.0' };
    }
    return out;
  }

  // Клиенты одного пользователя для каждого входа
  static clientsFor(u, kind) {
    const email = u.email || EMAIL(u.id);
    if (kind === 'vision') return { id: u.uuid, flow: 'xtls-rprx-vision', email, level: 0 };
    if (kind === 'xhttp') return { id: u.uuid, email, level: 0 };
    if (kind === 'hy2') return { auth: u.hy2, email, level: 0 };
  }

  // Человек и его ключи на выходы (userKeys задаёт nodes.mjs)
  withKeys(users) { return users.flatMap(u => [u, ...(this.userKeys ? this.userKeys(u) : [])]) }
  // Почты ключей на выходы, которые у человека могли остаться от прежних настроек
  staleKeys(u, keep = this.userKeys ? this.userKeys(u) : []) {
    const want = new Set(keep.map(x => x.email));
    return (this.allKeys ? this.allKeys() : []).map(k => `${EMAIL(u.id)}-${k}`).filter(e => !want.has(e));
  }

  // Записать в config.json список активных пользователей (чужих клиентов не трогаем)
  fillUsers(cfg, users, kinds = ['vision', 'hy2', 'xhttp']) {
    const d = this.detect(cfg);
    for (const k of kinds) {
      const tag = d[k]?.tag; if (!tag) continue;
      const ib = cfg.inbounds.find(i => i.tag === tag);
      ib.settings ||= {}; ib.settings.clients ||= [];
      ib.settings.clients = ib.settings.clients.filter(c => !isOurs(c)).concat(this.withKeys(users).map(u => Xray.clientsFor(u, k)), k === 'vision' && this.linkClients ? this.linkClients() : []);
    }
    return this.extra ? this.extra(cfg) : cfg;   // выходы через прокси (exits.mjs)
  }

  // Возвращает правила выходов до и после: если поменялись, их нужно передать живому Xray (liveRules)
  writeUsers(users, kinds) {
    const old = this.read(), was = Xray.exitRules(old);
    const cfg = this.fillUsers(old, users, kinds);
    const bak = this.config + '.monolit-original';
    if (!existsSync(bak)) copyFileSync(this.config, bak);
    const tmp = this.config + '.monolit-tmp';
    writeFileSync(tmp, JSON.stringify(cfg, null, 2));
    renameSync(tmp, this.config);
    return { was, now: Xray.exitRules(cfg) };
  }
  static exitRules(cfg) { return (cfg.routing?.rules || []).filter(r => String(r.ruleTag || '').startsWith('mp-x')) }

  // Заменить правила выходов в работающем Xray без перезапуска: старые снять по ruleTag, новые дописать в конец
  async liveRules(was, next) {
    if (JSON.stringify(was) === JSON.stringify(next)) return false;
    if (was.length) await this.run(['api', 'rmrules', `--server=${this.api}`, ...was.map(r => r.ruleTag)]);
    if (!next.length) return true;
    const dir = mkdtempSync(join(tmpdir(), 'mp-'));
    try { const f = join(dir, 'r.json'); writeFileSync(f, JSON.stringify({ routing: { rules: next } })); await this.run(['api', 'adrules', `--server=${this.api}`, '-append', f]) }
    finally { rmSync(dir, { recursive: true, force: true }) }
    return true;
  }

  // Включить API и статистику по пользователям. Возвращает true, если конфиг поменялся (нужен перезапуск Xray)
  ensureApi(listen = '127.0.0.1:10085') {
    const cfg = this.read(); let changed = false;
    // RoutingService — чтобы правила выходов менялись в работающем Xray, без перезапуска (liveRules)
    const services = ['HandlerService', 'StatsService', 'RoutingService'];
    if (!cfg.api || cfg.api.listen !== listen || services.some(s => !(cfg.api.services || []).includes(s))) { cfg.api = { tag: cfg.api?.tag || 'monolit-api', listen, services }; changed = true; }
    if (!cfg.stats) { cfg.stats = {}; changed = true; }
    cfg.policy ||= {}; cfg.policy.levels ||= {}; const l0 = cfg.policy.levels['0'] ||= {};
    if (!l0.statsUserUplink || !l0.statsUserDownlink) { l0.statsUserUplink = true; l0.statsUserDownlink = true; changed = true; }
    if (!l0.statsUserOnline) { l0.statsUserOnline = true; changed = true; }   // кто онлайн и с каких IP
    if (changed) {
      const bak = this.config + '.monolit-original';
      if (!existsSync(bak)) copyFileSync(this.config, bak);
      writeFileSync(this.config, JSON.stringify(cfg, null, 2));
    }
    return changed;
  }

  run(args, timeout = 8000) {
    return new Promise((res, rej) => execFile(this.bin, args, { timeout }, (e, so, se) => e ? rej(new Error((se || so || e.message).trim())) : res(so)));
  }

  async addUser(u, kinds) {
    const d = this.detect(), dir = mkdtempSync(join(tmpdir(), 'mp-'));
    try {
      // Xray требует у входа порт, даже когда добавляем только пользователя
      const inbounds = kinds.filter(k => d[k]).map(k => ({ tag: d[k].tag, port: d[k].port, listen: d[k].listen, protocol: k === 'hy2' ? 'hysteria' : 'vless', settings: { clients: this.withKeys([u]).map(x => Xray.clientsFor(x, k)), ...(k === 'hy2' ? { version: 2 } : { decryption: 'none' }) } }));
      if (!inbounds.length) return '';   // в наборах нет входов этого сервера
      const f = join(dir, 'u.json'); writeFileSync(f, JSON.stringify({ inbounds }));
      const so = await this.run(['api', 'adu', `--server=${this.api}`, f]);
      // код возврата всегда 0: смотрим текст. «уже есть» — не ошибка
      const added = Number((/Added (\d+) user/.exec(so) || [])[1] || 0);
      if (added < inbounds.length && !/already exists/i.test(so)) throw new Error(so.trim().split('\n').filter(l => !/^processing/.test(l)).join(' '));
      return so;
    } finally { rmSync(dir, { recursive: true, force: true }); }
  }

  // Один клиент на входе, не человек (нода): тем же способом, что и людей
  async addClient(kind, client) {
    const d = this.detect()[kind]; if (!d) return '';
    const dir = mkdtempSync(join(tmpdir(), 'mp-'));
    try {
      const f = join(dir, 'u.json');
      writeFileSync(f, JSON.stringify({ inbounds: [{ tag: d.tag, port: d.port, listen: d.listen, protocol: kind === 'hy2' ? 'hysteria' : 'vless', settings: { clients: [client], ...(kind === 'hy2' ? { version: 2 } : { decryption: 'none' }) } }] }));
      return await this.run(['api', 'adu', `--server=${this.api}`, f]);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  }
  async removeClient(kind, email) { const d = this.detect()[kind]; return d ? this.run(['api', 'rmu', `--server=${this.api}`, `-tag=${d.tag}`, email]) : ''; }

  // keep — ключи на выходы, которые человеку ещё нужны: тогда снимаются только лишние, сам человек остаётся
  async removeUser(id, kinds, keep) {
    const d = this.detect(), out = [], emails = [...(keep ? [] : [EMAIL(id)]), ...this.staleKeys({ id }, keep || [])];
    if (!emails.length) return '';
    for (const k of kinds) if (d[k]) out.push(await this.run(['api', 'rmu', `--server=${this.api}`, `-tag=${d[k].tag}`, ...emails]).catch(e => e.message));
    return out.join('\n');
  }

  // Трафик с прошлого опроса: { id: { up, down } }
  async takeTraffic() {
    const so = await this.run(['api', 'statsquery', `--server=${this.api}`, '-pattern', 'user>>>mp-', '-reset']);
    const res = {};
    for (const s of JSON.parse(so || '{}').stat || []) {
      const m = /^user>>>mp-(\d+)(?:-x\d+[db])?>>>traffic>>>(uplink|downlink)$/.exec(s.name); if (!m) continue;
      const r = res[m[1]] ||= { up: 0, down: 0 };
      r[m[2] === 'uplink' ? 'up' : 'down'] += Number(s.value || 0);
    }
    return res;
  }

  // Кто сейчас онлайн: { id: { ip: unix-время последней активности } }. Нужен statsUserOnline в policy (ensureApi)
  async online() {
    const res = {};
    let all; try { all = JSON.parse(await this.run(['api', 'statsgetallonlineusers', `--server=${this.api}`]) || '{}').users || []; } catch { return res; }
    for (const name of all) {
      const m = /^user>>>(mp-(\d+)(?:-x\d+[db])?)>>>online$/.exec(name); if (!m) continue;
      const ips = res[m[2]] ||= {};
      try { for (const [ip, t] of Object.entries(JSON.parse(await this.run(['api', 'statsonlineiplist', `--server=${this.api}`, '-email', m[1]]) || '{}').ips || {})) ips[ip] = Math.max(ips[ip] || 0, t); }
      catch {}
    }
    return res;
  }

  async apiAlive() { try { await this.run(['api', 'statssys', `--server=${this.api}`], 4000); return true; } catch { return false; } }

  // Проверка клиентского конфига самим Xray
  async test(cfgObj) {
    const dir = mkdtempSync(join(tmpdir(), 'mp-'));
    try {
      const f = join(dir, 'c.json'); writeFileSync(f, JSON.stringify(cfgObj));
      await this.run(['run', '-test', '-c', f], 15000); return '';
    } catch (e) { return e.message.split('\n').slice(-3).join(' '); }
    finally { rmSync(dir, { recursive: true, force: true }); }
  }
}
