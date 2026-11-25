#!/usr/bin/env bash
# Установка ноды monolit proxy: Xray и агент. Запускается командой из админки («Ноды» → «Добавить ноду»).
# Повторный запуск с новой командой переподключает ноду, ничего не ломая.
set -u
URL="__URL__"
TOKEN=""
while [ $# -gt 0 ]; do case "$1" in --join) TOKEN="${2:-}"; shift 2 ;; *) shift ;; esac; done
say() { printf '%s\n' "$*"; }
die() { say "Ошибка: $*"; exit 1; }

[ "$(id -u)" = 0 ] || die "запустите от root"
[ -n "$TOKEN" ] || die "нужен ключ из админки: --join КЛЮЧ"
command -v systemctl >/dev/null || die "нужна система с systemd (Ubuntu, Debian)"
# curl и unzip (unzip нужен установщику Xray). Свежий сервер: списков пакетов ещё нет, а apt может быть занят автообновлением — ждём его до 5 минут
NEED=""; for p in curl unzip; do command -v $p >/dev/null || NEED="$NEED $p"; done
if [ -n "$NEED" ]; then
  say "Ставим$NEED"
  (apt-get -o DPkg::Lock::Timeout=300 update -y && DEBIAN_FRONTEND=noninteractive apt-get -o DPkg::Lock::Timeout=300 install -y$NEED) >/tmp/monolit-node-apt.log 2>&1 || die "не поставилось:$NEED, подробности в /tmp/monolit-node-apt.log"
fi

# 443 должен быть свободен: на нём нода принимает людей
BUSY=$(ss -ltnp 2>/dev/null | awk '$4 ~ /:443$/' | grep -v xray | head -n 1)
[ -z "$BUSY" ] || die "порт 443 занят другой программой: $BUSY"

if [ ! -x /usr/local/bin/xray ]; then
  say "Ставим Xray"
  bash -c "$(curl -fsSL https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install >/tmp/monolit-node-xray.log 2>&1 || die "Xray не установился, подробности в /tmp/monolit-node-xray.log"
fi

say "Подключаемся к основному серверу"
KEY=$(curl -fsS -m 25 -X POST --data-binary "$TOKEN" "$URL/join") || die "основной сервер не принял ключ. Возьмите новую команду в админке"
case "$KEY" in *.*) ;; *) die "неожиданный ответ основного сервера" ;; esac

mkdir -p /usr/local/lib/monolit-node /var/lib/monolit-node
curl -fsS -m 25 "$URL/agent.sh" -o /usr/local/lib/monolit-node/agent.sh || die "не скачался агент"
chmod 755 /usr/local/lib/monolit-node/agent.sh
umask 077
printf 'MN_URL=%s\nMN_KEY=%s\n' "$URL" "$KEY" > /etc/monolit-node.env
umask 022
rm -f /var/lib/monolit-node/sig

cat > /etc/systemd/system/monolit-node.service <<'UNIT'
[Unit]
Description=monolit proxy node agent
After=network-online.target
Wants=network-online.target

[Service]
ExecStart=/usr/local/lib/monolit-node/agent.sh
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable xray >/dev/null 2>&1
systemctl enable monolit-node >/dev/null 2>&1
systemctl restart monolit-node || die "агент не запустился"

# открыть 443, если стоит файрвол
if command -v ufw >/dev/null && ufw status 2>/dev/null | grep -q "Status: active"; then ufw allow 443/tcp >/dev/null 2>&1; fi
if command -v firewall-cmd >/dev/null && firewall-cmd --state >/dev/null 2>&1; then firewall-cmd --permanent --add-port=443/tcp >/dev/null 2>&1; firewall-cmd --reload >/dev/null 2>&1; fi

say "Готово. Нода появится в админке в течение минуты"
