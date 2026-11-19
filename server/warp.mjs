// Cloudflare WARP: регистрация устройства (как приложение WARP) и ключ WARP+. Результат — выход wireguard для Xray
import { generateKeyPairSync } from 'node:crypto';

const API = 'https://api.cloudflareclient.com/v0a2158/reg';
const HEAD = { 'content-type': 'application/json', 'user-agent': 'okhttp/3.12.1', 'cf-client-version': 'a-6.30-3596' };

async function call(url, opts) {
  const r = await fetch(url, { ...opts, headers: { ...HEAD, ...opts.headers }, signal: AbortSignal.timeout(20000) })
    .catch((e) => { throw new Error('WARP недоступен: ' + e.message) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.errors?.[0]?.message || `WARP ответил ${r.status}`);
  return j;
}

// → { outbound, reg: { id, token }, account }
export async function register() {
  const { publicKey, privateKey } = generateKeyPairSync('x25519');
  const raw = (k, t) => k.export({ format: 'der', type: t }).subarray(-32).toString('base64');
  const j = await call(API, { method: 'POST', body: JSON.stringify({ key: raw(publicKey, 'spki'), install_id: '', fcm_token: '', tos: new Date().toISOString(), model: 'PC', serial_number: '', locale: 'en_US' }) });
  const c = j.config, peer = c.peers[0];
  const outbound = { tag: 'warp', protocol: 'wireguard', settings: {
    secretKey: raw(privateKey, 'pkcs8'), address: [c.interface.addresses.v4 + '/32', c.interface.addresses.v6 + '/128'],
    peers: [{ publicKey: peer.public_key, endpoint: 'engage.cloudflareclient.com:2408', allowedIPs: ['0.0.0.0/0', '::/0'] }],
    reserved: [...Buffer.from(c.client_id, 'base64')].slice(0, 3), mtu: 1280, domainStrategy: 'ForceIPv4' } };
  return { outbound, reg: { id: j.id, token: j.token }, account: j.account?.account_type || 'free' };
}

// Ключ WARP+ (из приложения 1.1.1.1). → тип аккаунта: free / limited / unlimited
export async function license(reg, key) {
  if (!reg?.id || !reg?.token) throw new Error('Сначала зарегистрируйте WARP заново: старая регистрация без ключа доступа');
  const auth = { authorization: 'Bearer ' + reg.token };
  await call(`${API}/${reg.id}/account`, { method: 'PUT', headers: auth, body: JSON.stringify({ license: key }) });
  const a = await call(`${API}/${reg.id}/account`, { method: 'GET', headers: auth });
  return a.account_type || 'free';
}
