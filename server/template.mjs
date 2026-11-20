// Шаблон клиентских конфигов берётся из autoXRAY (github.com/xVRVx/autoXRAY).
// Скрипт autoXRAY НЕ запускается: из текста вырезаются только шаблон конфига и описания протоколов.
import { createHash } from 'node:crypto';

export const AUTOXRAY_URL = 'https://raw.githubusercontent.com/xVRVx/autoXRAY/main/autoXRAY2.sh';

// Разбор autoXRAY2.sh → { version, tpl, outbounds: { vision, hy2, xhttp } }
export function parseAutoXray(sh) {
  const tplM = /print_config\(\)\s*\{[\s\S]*?cat << TPL\n([\s\S]*?)\nTPL\n/.exec(sh);
  if (!tplM) throw new Error('не найден шаблон print_config');
  const grab = name => { const m = new RegExp(`^${name}='([\\s\\S]*?)'\\s*$`, 'm').exec(sh); return m ? m[1] : null; };
  const outbounds = { vision: grab('OUT_VISION'), hy2: grab('HYSTERIA2'), xhttp: grab('OUT_XHTTP') };
  if (!outbounds.vision || !outbounds.hy2) throw new Error('не найдены описания Vision или Hysteria2');
  const version = (/Версия:\s*([0-9.]+)/.exec(sh) || [])[1] || '';
  return { version, tpl: tplM[1], outbounds };
}

export const hashOf = parsed => createHash('sha256').update(JSON.stringify(parsed)).digest('hex').slice(0, 16);

// Подстановка переменных как у envsubst: $VAR и ${VAR}; JSON-строки экранируются
const subst = (s, vars) => s.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}|\$([A-Za-z_][A-Za-z0-9_]*)/g, (m, a, b) => {
  const k = a || b; return Object.prototype.hasOwnProperty.call(vars, k) ? vars[k] : m;
});
const jstr = v => JSON.stringify(String(v)).slice(1, -1);

// Один клиентский конфиг. kind: vision | hy2 | xhttp
// opts.remark — своё название; opts.outbound(ob) — поправить выход (вход на ноде вместо этого сервера)
export function renderOne(parsed, kind, { user, server }, opts = {}) {
  const vars = {
    DOMAIN: jstr(server.domain), xray_uuid_vrv: jstr(user.uuid), xray_shortIds_vrv: jstr(user.hy2),
    fpBro: jstr(server.fp || 'firefox'), path_xhttp: jstr(server.xhttpPath || ''),
  };
  // opts.ob — готовый выход (AmneziaWG): в шаблоне autoXRAY такого нет
  const ob = opts.ob || JSON.parse(subst(parsed.outbounds[kind], vars));
  // порт — тот, на котором вход реально слушает на этом сервере
  const port = opts.ob ? 0 : server.ports?.[kind];
  if (port) { if (ob.settings?.vnext?.[0]) ob.settings.vnext[0].port = port; else if (ob.settings && 'port' in ob.settings) ob.settings.port = port; }
  if (opts.outbound) opts.outbound(ob);
  const remark = opts.remark || `${server.name} ${{ vision: 'Vision', hy2: 'Hysteria2', xhttp: 'XHTTP', awg: 'AmneziaWG' }[kind]}`;
  const text = subst(parsed.tpl, { ...vars, PROXY_OUTBOUND: JSON.stringify(ob), REMARK: jstr(remark) });
  const left = /\$\{[A-Za-z_][A-Za-z0-9_]*\}|"\$[A-Za-z_][A-Za-z0-9_]*"/.exec(text);
  if (left) throw new Error(`в шаблоне осталась неизвестная переменная ${left[0]}`);
  return JSON.parse(text);
}

export function renderAll(parsed, ctx, kinds) {
  return kinds.filter(k => parsed.outbounds[k]).map(k => renderOne(parsed, k, ctx));
}

// Ссылки vless:// и hysteria2:// для клиентов, которые не понимают JSON (v2rayN и др.)
export function links({ user, server }, kinds) {
  const name = k => encodeURIComponent(`${server.name} ${{ vision: 'Vision', hy2: 'Hysteria2', xhttp: 'XHTTP' }[k]}`);
  const fp = server.fp || 'firefox', d = server.domain, out = [];
  if (kinds.includes('vision')) out.push(`vless://${user.uuid}@${d}:${server.ports.vision}?encryption=none&security=tls&type=tcp&flow=xtls-rprx-vision&sni=${d}&fp=${fp}#${name('vision')}`);
  if (kinds.includes('xhttp') && server.xhttpPath) out.push(`vless://${user.uuid}@${d}:443?encryption=none&security=tls&type=xhttp&mode=stream-up&path=%2F${encodeURIComponent(server.xhttpPath)}&sni=${d}&fp=${fp}&alpn=h2#${name('xhttp')}`);
  if (kinds.includes('hy2')) out.push(`hysteria2://${encodeURIComponent(user.hy2)}@${d}:${server.ports.hy2}?sni=${d}&alpn=h3#${name('hy2')}`);
  return out;
}
