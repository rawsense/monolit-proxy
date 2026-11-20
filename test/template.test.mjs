// Подписка: сроки поддержки соединения у Hysteria2.
// Запуск: node --test --test-timeout=30000 --test-force-exit test/template.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderOne } from '../server/template.mjs';

const hy = (quic) => JSON.stringify({ tag: 'proxy', protocol: 'hysteria', settings: { address: '$DOMAIN', port: 443, version: 2 },
  streamSettings: { network: 'hysteria', security: 'tls', hysteriaSettings: { version: 2, auth: '$xray_shortIds_vrv' }, ...(quic ? { finalmask: { quicParams: quic } } : {}) } });
const vision = JSON.stringify({ tag: 'proxy', protocol: 'vless', settings: { vnext: [{ address: '$DOMAIN', port: 443, users: [{ id: '$xray_uuid_vrv' }] }] }, streamSettings: { network: 'raw', security: 'tls' } });
const tpl = '{"remarks": "$REMARK", "outbounds": [$PROXY_OUTBOUND]}';
const ctx = { user: { uuid: 'u-1', hy2: 'secret' }, server: { name: 'srv', domain: 'vpn.example.com', ports: { hy2: 443, vision: 443 } } };
const quicOf = (cfg) => cfg.outbounds[0].streamSettings.finalmask?.quicParams;

test('Hysteria2 без своих сроков получает поддержку 3 с и срок молчания 8 с', () => {
  assert.deepEqual(quicOf(renderOne({ tpl, outbounds: { hy2: hy({ congestion: 'bbr' }) } }, 'hy2', ctx)), { congestion: 'bbr', keepAlivePeriod: 3, maxIdleTimeout: 8 });
  assert.deepEqual(quicOf(renderOne({ tpl, outbounds: { hy2: hy(null) } }, 'hy2', ctx)), { keepAlivePeriod: 3, maxIdleTimeout: 8 });
});

test('сроки из шаблона не затираются', () => {
  assert.deepEqual(quicOf(renderOne({ tpl, outbounds: { hy2: hy({ maxIdleTimeout: 40, keepAlivePeriod: 10 }) } }, 'hy2', ctx)), { maxIdleTimeout: 40, keepAlivePeriod: 10 });
});

test('Vision эти параметры не получает', () => {
  assert.equal(renderOne({ tpl, outbounds: { vision } }, 'vision', ctx).outbounds[0].streamSettings.finalmask, undefined);
});
