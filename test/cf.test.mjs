// Cloudflare: поиск зоны, проверка токена, смена A-записи. API поддельный: запросы и ответы — как у настоящего
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createCf } from '../server/cf.mjs';
import { openDb, getSetting } from '../server/db.mjs';

const TOKEN = 'cf_test_token_0123456789abcdef';
// zones: { имя: id }, records: [{ id, name, content, proxied, ttl }]
function fake({ zones = { 'example.ru': 'z1' }, records = [], deny = '' } = {}) {
  const calls = [];
  const reply = (status, body) => ({ status, json: async () => body });
  const ok = (result) => reply(200, { success: true, errors: [], result });
  const f = async (url, opts) => {
    const u = new URL(url), p = u.pathname.replace('/client/v4', ''), m = opts.method;
    calls.push(`${m} ${p}${u.search}`);
    // так отвечает настоящий API на чужой токен (проверено 26.11.2026)
    if (opts.headers.authorization !== 'Bearer ' + TOKEN) return reply(403, { success: false, errors: [{ code: 9109, message: 'Invalid access token' }] });
    if (deny === 'write' && m !== 'GET') return reply(403, { success: false, errors: [{ code: 10000, message: 'Authentication error' }] });
    let x;
    if (p === '/zones' && m === 'GET') { const n = u.searchParams.get('name'); return ok(zones[n] ? [{ id: zones[n], name: n }] : []) }
    if ((x = /^\/zones\/(\w+)\/dns_records$/.exec(p)) && m === 'GET') return ok(records.filter((r) => r.name === u.searchParams.get('name')));
    if ((x = /^\/zones\/(\w+)\/dns_records$/.exec(p)) && m === 'POST') { const r = { id: 'r' + (records.length + 1), ...JSON.parse(opts.body) }; records.push(r); return ok(r) }
    if ((x = /^\/zones\/(\w+)\/dns_records\/(\w+)$/.exec(p)) && m === 'PATCH') { const r = records.find((q) => q.id === x[2]); Object.assign(r, JSON.parse(opts.body)); return ok(r) }
    return reply(404, { success: false, errors: [{ message: 'not found' }] });
  };
  return { f, calls, records };
}
const mk = (api) => { const db = openDb(join(mkdtempSync(join(tmpdir(), 'mp-cf-')), 'm.db')); return { db, cf: createCf({ db, fetch: api.f }) } };
const rec = (o = {}) => ({ id: 'r1', name: 'vpn.example.ru', content: '203.0.113.8', proxied: false, ttl: 300, ...o });

test('подключение: зона ищется от домена вверх, токен запоминается, запись читается', async () => {
  const api = fake({ records: [rec()] }), { db, cf } = mk(api);
  const s = await cf.connect('  ' + TOKEN + '\n', 'vpn.example.ru');
  assert.deepEqual(s, { on: true, zone: 'example.ru', ip: '203.0.113.8', proxied: false, many: false, error: '' });
  assert.deepEqual(api.calls.slice(0, 2), ['GET /zones?name=vpn.example.ru', 'GET /zones?name=example.ru']);
  assert.equal(getSetting(db, 'cf_token'), TOKEN);
  assert.equal(cf.on(), true);
  assert.equal(api.records[0].content, '203.0.113.8');   // проверка права на правку запись не изменила
});

test('подключение: чужой токен, токен только на чтение и токен без зоны не сохраняются', async () => {
  for (const [api, tok, re] of [
    [fake({ records: [rec()] }), 'x'.repeat(40), /не принял токен/],
    [fake({ records: [rec()], deny: 'write' }), TOKEN, /не хватает прав/],
    [fake({ zones: { 'other.ru': 'z9' } }), TOKEN, /не видит зону домена vpn\.example\.ru.*example\.ru/],
    [fake(), 'с пробелом внутри токена тут', /выглядит не так/],
  ]) {
    const { db, cf } = mk(api);
    await assert.rejects(cf.connect(tok, 'vpn.example.ru'), re);
    assert.equal(getSetting(db, 'cf_token', ''), '');
  }
});

test('смена адреса: запись меняется на новый адрес с коротким временем жизни и без прокси', async () => {
  const api = fake({ records: [rec()] }), { cf } = mk(api);
  await cf.connect(TOKEN, 'vpn.example.ru');
  assert.deepEqual(await cf.setA('vpn.example.ru', '203.0.113.9'), { changed: true, from: '203.0.113.8' });
  assert.deepEqual(api.records[0], { id: 'r1', name: 'vpn.example.ru', content: '203.0.113.9', proxied: false, ttl: 60, type: 'A' });
  assert.deepEqual(await cf.setA('vpn.example.ru', '203.0.113.9'), { changed: false, from: '203.0.113.9' });   // повтор ничего не шлёт
  assert.equal(api.calls.filter((c) => c.startsWith('PATCH')).length, 2);   // проверка при подключении и сама смена
});

test('смена адреса: записи ещё нет — создаётся', async () => {
  const api = fake(), { cf } = mk(api);
  await cf.connect(TOKEN, 'vpn.example.ru');
  assert.deepEqual(await cf.setA('vpn.example.ru', '203.0.113.9'), { changed: true, from: '' });
  assert.deepEqual(api.records.map((r) => [r.name, r.content, r.proxied, r.ttl]), [['vpn.example.ru', '203.0.113.9', false, 60]]);
});

test('смена адреса: запись под прокси Cloudflare и несколько записей не трогаются', async () => {
  let api = fake({ records: [rec({ proxied: true })] }), { cf } = mk(api);
  await cf.connect(TOKEN, 'vpn.example.ru');
  assert.equal((await cf.state('vpn.example.ru')).proxied, true);
  await assert.rejects(cf.setA('vpn.example.ru', '203.0.113.9'), /оранжевое облако/);
  assert.equal(api.records[0].content, '203.0.113.8');
  api = fake({ records: [rec(), rec({ id: 'r2', content: '203.0.113.7' })] }); ({ cf } = mk(api));
  await cf.connect(TOKEN, 'vpn.example.ru');
  assert.equal((await cf.state('vpn.example.ru')).many, true);
  await assert.rejects(cf.setA('vpn.example.ru', '203.0.113.9'), /несколько A-записей/);
  assert.deepEqual(api.records.map((r) => r.content), ['203.0.113.8', '203.0.113.7']);
});

test('отключение: пустой токен стирает сохранённый, запись после этого не меняется', async () => {
  const api = fake({ records: [rec()] }), { db, cf } = mk(api);
  await cf.connect(TOKEN, 'vpn.example.ru');
  assert.deepEqual(await cf.connect('', 'vpn.example.ru'), { on: false });
  assert.equal(getSetting(db, 'cf_token', ''), '');
  assert.deepEqual(await cf.state('vpn.example.ru'), { on: false });
  await assert.rejects(cf.setA('vpn.example.ru', '203.0.113.9'), /не подключён/);
});

test('состояние: Cloudflare недоступен — админка показывает ошибку, а не падает', async () => {
  const api = fake({ records: [rec()] }), { db } = mk(api);
  let broken = false;
  const cf = createCf({ db, fetch: (u, o) => broken ? Promise.reject(new Error('timeout')) : api.f(u, o) });
  await cf.connect(TOKEN, 'vpn.example.ru');
  broken = true;
  const s = await cf.state('vpn.example.ru');
  assert.equal(s.on, true); assert.equal(s.zone, 'example.ru'); assert.match(s.error, /Cloudflare не ответил/);
});
