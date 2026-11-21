// agent/netsave.sh на заглушках ip, nmcli, netplan, ifquery: сохраняет ли адреса в настройки сети и убирает ли лишние
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, chmodSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'agent', 'netsave.sh').replace(/\\/g, '/');
const posix = (p) => p.replace(/\\/g, '/').replace(/^([A-Za-z]):/, (_, d) => '/' + d.toLowerCase());

const STUBS = {
  // адреса — из LIVE ("ip/префикс ip/префикс"), DYN — те, что от DHCP
  ip: `#!/bin/bash
dev=\${DEV_NAME:-ens3}
case "$*" in
  *"route show default"*) echo "default via 10.0.0.1 dev $dev onlink" ;;
  *addr*) i=2; for c in $NS_LIVE; do f=""; case " \${NS_DYN:-} " in *" \${c%/*} "*) f=" dynamic";; esac
    echo "$i: $dev    inet $c scope global$f $dev\\       valid_lft forever preferred_lft forever"; done ;;
esac`,
  systemctl: `#!/bin/bash
[ "$1" = is-active ] && [ -n "\${NM:-}" ] && exit 0; exit 3`,
  ifquery: `#!/bin/bash
[ -n "\${IFQ_FAIL:-}" ] && { echo "error: bad"; exit 1; }
awk -v d="$1" '/^[^ \\t#]/ {on=($1=="iface" && $2==d && $3=="inet")} on && !/^[ \\t]*#/' "$MP_NETSAVE_ROOT/etc/network/interfaces"`,
  netplan: `#!/bin/bash
[ -n "\${NP_FAIL:-}" ] && { echo "Error in network definition"; exit 1; }; exit 0`,
  // NetworkManager: адреса подключения хранятся в $NMDB
  nmcli: `#!/bin/bash
case "$*" in
  "-g GENERAL.STATE device show"*) echo "100 (connected)" ;;
  "-g GENERAL.CON-UUID device show"*) echo "uuid-1" ;;
  "-g connection.filename connection show"*) echo "$MP_NETSAVE_ROOT/etc/NetworkManager/system-connections/eth.nmconnection" ;;
  "-g ipv4.addresses connection show"*) paste -sd, "$NMDB" | sed 's/,/, /g' ;;
  "-g ipv4.method connection show"*) echo "\${NM_METHOD:-manual}" ;;
  "connection modify uuid-1 +ipv4.addresses "*) echo "$5" >> "$NMDB" ;;
  "connection modify uuid-1 -ipv4.addresses "*) grep -vxF "$5" "$NMDB" > "$NMDB.t"; mv "$NMDB.t" "$NMDB" ;;
  "connection load"*) ;;
esac`,
};

function box(files, env = {}) {
  const d = mkdtempSync(join(tmpdir(), 'netsave-'));
  mkdirSync(join(d, 'bin')); mkdirSync(join(d, 'bk'));
  for (const [n, s] of Object.entries(STUBS)) { writeFileSync(join(d, 'bin', n), s.replace(/\r/g, '')); chmodSync(join(d, 'bin', n), 0o755) }
  for (const [p, s] of Object.entries(files)) { mkdirSync(dirname(join(d, p)), { recursive: true }); writeFileSync(join(d, p), s) }
  const run = (...args) => {
    const r = spawnSync('bash', [SCRIPT, ...args], { encoding: 'utf8', timeout: 20000,
      env: { ...process.env, MP_NETSAVE_ROOT: posix(d), MP_NETSAVE_BK: posix(join(d, 'bk')), MP_NETSAVE_PATH: posix(join(d, 'bin')) + ':', NMDB: posix(join(d, 'nmdb')), ...env } });
    const last = r.stdout.trim().split('\n').pop();
    let j = null; try { j = JSON.parse(last) } catch {}
    return { code: r.status, out: r.stdout, err: r.stderr, j };
  };
  return { d, run, read: (p) => readFileSync(join(d, p), 'utf8'), backups: () => readdirSync(join(d, 'bk')) };
}

const IFACES = `# The loopback network interface
auto lo
iface lo inet loopback

auto ens3
iface ens3 inet static
    address   203.0.113.10
    netmask   255.255.255.255
    gateway   10.0.0.1
    up   ip route replace default via 10.0.0.1 dev ens3 onlink src 203.0.113.10 || true
    # доп. IP под VPN-вход
    up   ip addr add 198.51.100.43/32 dev ens3 || true
    down ip addr del 198.51.100.43/32 dev ens3 || true
iface ens3 inet6 static
    address   2001:db8::2
    netmask   64
`;
const LIVE2 = { NS_LIVE: '203.0.113.10/32 203.0.113.20/32' };

test('ifupdown: старый адрес в настройках, новый нет — check видит оба', () => {
  const b = box({ 'etc/network/interfaces': IFACES }, LIVE2);
  const r = b.run('check', '203.0.113.20');
  assert.equal(r.code, 0, r.out + r.err);
  assert.deepEqual(r.j, { tool: 'ifupdown', dev: 'ens3', file: posix(b.d) + '/etc/network/interfaces', missing: ['203.0.113.20'], stale: ['198.51.100.43'], manual: '' });
});

test('ifupdown: fix меняет старый адрес на новый в обеих строках, основной не трогает', () => {
  const b = box({ 'etc/network/interfaces': IFACES }, LIVE2);
  const r = b.run('fix', '203.0.113.20');
  assert.equal(r.code, 0, r.out + r.err);
  assert.deepEqual([r.j.missing, r.j.stale], [[], []]);
  const t = b.read('etc/network/interfaces');
  assert.match(t, /up   ip addr add 203\.0\.113\.20\/32 dev ens3 \|\| true\n    down ip addr del 203\.0\.113\.20\/32 dev ens3 \|\| true/);
  assert.doesNotMatch(t, /198\.51\.100\.43/);
  assert.match(t, /address   203\.0\.113\.10/);
  assert.equal(t.replace(/203\.0\.113\.20/g, '198.51.100.43'), IFACES);
  assert.equal(b.backups().length, 1);
});

test('ifupdown: нового нет и старого нет — дописывает в конец блока inet, не в inet6', () => {
  const src = IFACES.replace(/    # доп.*\n.*\n.*\n/, '');
  const b = box({ 'etc/network/interfaces': src }, LIVE2);
  const r = b.run('fix', '203.0.113.20');
  assert.equal(r.code, 0, r.out + r.err);
  const t = b.read('etc/network/interfaces');
  assert.match(t, /onlink src 203\.0\.113\.10 \|\| true\n    # адрес, которым пользуется monolit \([\d.]+\)\n    up   ip addr add 203\.0\.113\.20\/32 dev ens3 \|\| true\n    down ip addr del 203\.0\.113\.20\/32 dev ens3 \|\| true\niface ens3 inet6/);
  assert.deepEqual(r.j.missing, []);
});

test('ifupdown: лишний есть, нового добавлять не надо — строки лишнего убираются', () => {
  const b = box({ 'etc/network/interfaces': IFACES }, { NS_LIVE: '203.0.113.10/32' });
  const r = b.run('fix');
  assert.equal(r.code, 0, r.out + r.err);
  const t = b.read('etc/network/interfaces');
  assert.doesNotMatch(t, /ip addr (add|del)/);
  assert.match(t, /ip route replace/);
});

test('ifupdown: похожий адрес не задевается (198.51.100.4 ≠ 198.51.100.43)', () => {
  const src = IFACES.replace('    # доп', '    up   ip addr add 198.51.100.4/32 dev ens3 || true\n    # доп');
  const b = box({ 'etc/network/interfaces': src }, { NS_LIVE: '203.0.113.10/32 203.0.113.20/32 198.51.100.4/32' });
  const r = b.run('fix', '203.0.113.20');
  assert.equal(r.code, 0, r.out + r.err);
  assert.match(b.read('etc/network/interfaces'), /add 198\.51\.100\.4\/32 dev/);
  assert.deepEqual(r.j.stale, []);
});

test('ifupdown: ifquery не принял правку — файл возвращается как был', () => {
  const b = box({ 'etc/network/interfaces': IFACES }, { ...LIVE2, IFQ_FAIL: '1' });
  const r = b.run('fix', '203.0.113.20');
  assert.equal(r.code, 1);
  assert.equal(b.read('etc/network/interfaces'), IFACES);
  assert.match(r.j.manual, /не принял/);
});

test('всё сохранено — fix ничего не трогает и копий не делает', () => {
  const src = IFACES.replace(/198\.51\.100\.43/g, '203.0.113.20');
  const b = box({ 'etc/network/interfaces': src }, LIVE2);
  const r = b.run('fix', '203.0.113.20');
  assert.equal(r.code, 0);
  assert.equal(b.read('etc/network/interfaces'), src);
  assert.equal(b.backups().length, 0);
});

test('адрес от DHCP не требует записи', () => {
  const b = box({ 'etc/network/interfaces': 'auto ens3\niface ens3 inet dhcp\n' }, { NS_LIVE: '10.1.1.5/24', NS_DYN: '10.1.1.5' });
  assert.deepEqual(b.run('check', '10.1.1.5').j.missing, []);
});

const NETPLAN = `network:
  version: 2
  ethernets:
    ens3:
      addresses:
        - 203.0.113.10/32
        - 198.51.100.43/32
      routes:
        - to: default
          via: 10.0.0.1
`;
test('netplan: старый адрес заменяется новым, netplan generate проходит', () => {
  const b = box({ 'etc/netplan/50-cloud-init.yaml': NETPLAN }, LIVE2);
  const r = b.run('fix', '203.0.113.20');
  assert.equal(r.code, 0, r.out + r.err);
  assert.equal(b.read('etc/netplan/50-cloud-init.yaml'), NETPLAN.replace('198.51.100.43', '203.0.113.20'));
});

test('netplan: нового нет — дописывается пунктом с тем же отступом', () => {
  const src = NETPLAN.replace('        - 198.51.100.43/32\n', '');
  const b = box({ 'etc/netplan/50-cloud-init.yaml': src }, LIVE2);
  const r = b.run('fix', '203.0.113.20');
  assert.equal(r.code, 0, r.out + r.err);
  assert.match(b.read('etc/netplan/50-cloud-init.yaml'), /        - 203\.0\.113\.10\/32\n        - 203\.0\.113\.20\/32\n      routes:/);
});

test('netplan: список в строку [a, b]', () => {
  const src = 'network:\n  ethernets:\n    ens3:\n      addresses: [203.0.113.10/32]\n';
  const b = box({ 'etc/netplan/01.yaml': src }, LIVE2);
  const r = b.run('fix', '203.0.113.20');
  assert.equal(r.code, 0, r.out + r.err);
  assert.match(b.read('etc/netplan/01.yaml'), /addresses: \[203\.0\.113\.10\/32, 203\.0\.113\.20\/32\]/);
});

test('netplan: generate упал — файл возвращается как был', () => {
  const b = box({ 'etc/netplan/50-cloud-init.yaml': NETPLAN }, { ...LIVE2, NP_FAIL: '1' });
  const r = b.run('fix', '203.0.113.20');
  assert.equal(r.code, 1);
  assert.equal(b.read('etc/netplan/50-cloud-init.yaml'), NETPLAN);
});

test('NetworkManager: добавляет новый, убирает лишний через nmcli', () => {
  const b = box({ 'etc/NetworkManager/system-connections/eth.nmconnection': '[connection]\nuuid=uuid-1\n', nmdb: '203.0.113.10/32\n198.51.100.43/32\n' }, { ...LIVE2, NM: '1' });
  const c = b.run('check', '203.0.113.20');
  assert.deepEqual([c.j.tool, c.j.missing, c.j.stale], ['nm', ['203.0.113.20'], ['198.51.100.43']]);
  const r = b.run('fix', '203.0.113.20');
  assert.equal(r.code, 0, r.out + r.err);
  assert.equal(b.read('nmdb'), '203.0.113.10/32\n203.0.113.20/32\n');
});

test('настройки сети не нашлись — check говорит, что делать руками', () => {
  const b = box({}, LIVE2);
  const r = b.run('check', '203.0.113.20');
  assert.equal(r.j.tool, 'none');
  assert.match(r.j.manual, /203\.0\.113\.20/);
  assert.equal(b.run('fix', '203.0.113.20').code, 1);
});
