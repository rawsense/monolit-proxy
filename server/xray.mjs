// Связь с уже установленным Xray: читаем его конфиг, правим только своих клиентов (email mp-*),
// живые изменения — через API Xray (без перезапуска), постоянные — в config.json (переживут перезапуск)
import { execFile } from 'node:child_process';
import { readFileSync, writeFileSync, renameSync, copyFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const EMAIL = id => `mp-${id}`;
// mp-N — люди, mpn-N — ноды (ходят сюда за людей, пришедших по мосту)
const isOurs = c => typeof c?.email === 'string' && /^mpn?-\d+$/.test(c.email);

export class Xray {
  constructor({ bin, config, api }) { Object.assign(this, { bin, config, api }); }

  read() { return JSON.parse(readFileSync(this.config, 'utf8')); }

  // Какие входы есть и как к ним подключаться
  detect(cfg = this.read()) {
    const out = { vision: null, hy2: null, xhttp: null, api: !!cfg.api?.listen || !!cfg.api?.tag, stats: !!cfg.stats };
    for (const i of cfg.inbounds || []) {
      const ss = i.streamSettings || {};
      if (i.protocol === 'vless' && (ss.network === 'raw' || ss.network === 'tcp' || !ss.network) && ss.security === 'tls' && !out.vision)
        out.vision = { tag: i.tag, port: i.port, listen: i.listen || '0.0.0.0' };
      else if (i.protocol === 'vless' && ss.network === 'xhttp' && !out.xhttp)
        out.xhttp = { tag: i.tag, port: i.port, listen: i.listen, path: (ss.xhttpSettings?.path || '').replace(/^\//, '') };
      else if (i.protocol === 'hysteria' && !out.hy2)
        out.hy2 = { tag: i.tag, port: i.port, listen: i.listen || '0.0.0.0' };
    }
    return out;
  }

  // Клиенты одного пользователя для каждого входа
  static clientsFor(u, kind) {
    const email = EMAIL(u.id);
    if (kind === 'vision') return { id: u.uuid, flow: 'xtls-rprx-vision', email, level: 0 };
    if (kind === 'xhttp') return { id: u.uuid, email, level: 0 };
    if (kind === 'hy2') return { auth: u.hy2, email, level: 0 };
  }

  // Записать в config.json список активных пользователей (чужих клиентов не трогаем)
  fillUsers(cfg, users, kinds = ['vision', 'hy2', 'xhttp']) {
    const d = this.detect(cfg);
    for (const k of kinds) {
      const tag = d[k]?.tag; if (!tag) continue;
      const ib = cfg.inbounds.find(i => i.tag === tag);
      ib.settings ||= {}; ib.settings.clients ||= [];
      ib.settings.clients = ib.settings.clients.filter(c => !isOurs(c)).concat(users.map(u => Xray.clientsFor(u, k)), k === 'vision' && this.linkClients ? this.linkClients() : []);
    }
    return cfg;
  }

  writeUsers(users, kinds) {
    const cfg = this.fillUsers(this.read(), users, kinds);
    const bak = this.config + '.monolit-original';
    if (!existsSync(bak)) copyFileSync(this.config, bak);
    const tmp = this.config + '.monolit-tmp';
    writeFileSync(tmp, JSON.stringify(cfg, null, 2));
    renameSync(tmp, this.config);
  }

  // Включить API и статистику по пользователям. Возвращает true, если конфиг поменялся (нужен перезапуск Xray)
  ensureApi(listen = '127.0.0.1:10085') {
    const cfg = this.read(); let changed = false;
    if (!cfg.api || cfg.api.listen !== listen) { cfg.api = { tag: 'monolit-api', listen, services: ['HandlerService', 'StatsService'] }; changed = true; }
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
      const inbounds = kinds.filter(k => d[k]).map(k => ({ tag: d[k].tag, port: d[k].port, listen: d[k].listen, protocol: k === 'hy2' ? 'hysteria' : 'vless', settings: { clients: [Xray.clientsFor(u, k)], ...(k === 'hy2' ? { version: 2 } : { decryption: 'none' }) } }));
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

  async removeUser(id, kinds) {
    const d = this.detect(), out = [];
    for (const k of kinds) if (d[k]) out.push(await this.run(['api', 'rmu', `--server=${this.api}`, `-tag=${d[k].tag}`, EMAIL(id)]).catch(e => e.message));
    return out.join('\n');
  }

  // Трафик с прошлого опроса: { id: { up, down } }
  async takeTraffic() {
    const so = await this.run(['api', 'statsquery', `--server=${this.api}`, '-pattern', 'user>>>mp-', '-reset']);
    const res = {};
    for (const s of JSON.parse(so || '{}').stat || []) {
      const m = /^user>>>mp-(\d+)>>>traffic>>>(uplink|downlink)$/.exec(s.name); if (!m) continue;
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
      const m = /^user>>>mp-(\d+)>>>online$/.exec(name); if (!m) continue;
      try { res[m[1]] = JSON.parse(await this.run(['api', 'statsonlineiplist', `--server=${this.api}`, '-email', `mp-${m[1]}`]) || '{}').ips || {}; }
      catch { res[m[1]] = {}; }
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
