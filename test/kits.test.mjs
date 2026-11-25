// Наборы людей: набор хранится у человека явно, смена набора «для новых людей» не трогает тех, кто уже есть.
// Запуск: node --test --test-timeout=30000 --test-force-exit test/kits.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createExits } from '../server/exits.mjs';
import { createNodes } from '../server/nodes.mjs';
import { openDb } from '../server/db.mjs';

function setup(db) {
  const vision = { tag: 'vision-in', port: 443, listen: '0.0.0.0' };
  const xray = { detect: () => ({ vision }), addClient: async () => {}, removeClient: async () => {} };
  const exits = createExits({ db, log: () => {} });
  const users = () => db.prepare('SELECT * FROM users ORDER BY id').all();
  return createNodes({ db, xray, log: () => {}, dayOf: () => '2026-11-25', users, exits,
    server: () => ({ name: 'main', domain: 'vpn.example.com', fp: 'firefox', ports: { vision: 443 } }), awg: { ready: () => false } });
}
const addUser = (db, name, kit = 0) => db.prepare("INSERT INTO users (name, token, uuid, hy2, created_at, kit_id) VALUES (?, ?, ?, 'h', 0, ?)").run(name, 't' + name, 'u' + name, kit).lastInsertRowid;

test('люди без набора при запуске закрепляются за набором по умолчанию', () => {
  const db = openDb(':memory:'); setup(db);
  const first = db.prepare('SELECT id FROM kits').get().id;
  const a = addUser(db, 'a'), gone = addUser(db, 'b', 999);
  setup(db);   // перезапуск
  const kit = (id) => db.prepare('SELECT kit_id FROM users WHERE id = ?').get(id).kit_id;
  assert.equal(kit(a), first); assert.equal(kit(gone), first);
});

test('новый набор по умолчанию: прежние люди остаются в своём', () => {
  const db = openDb(':memory:'); const nodes = setup(db);
  const first = db.prepare('SELECT id FROM kits').get().id;
  const a = addUser(db, 'a', nodes.pickKit(0));
  const second = Number(db.prepare("INSERT INTO kits (name) VALUES ('второй')").run().lastInsertRowid);
  db.exec('UPDATE kits SET is_default = 0'); db.prepare('UPDATE kits SET is_default = 1 WHERE id = ?').run(second);
  const u = db.prepare('SELECT * FROM users WHERE id = ?').get(a);
  assert.equal(nodes.kitOf(u).id, first);
  assert.equal(nodes.pickKit(0), second); assert.equal(nodes.pickKit(first), first); assert.equal(nodes.pickKit(12345), second);
});
