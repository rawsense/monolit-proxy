#!/bin/sh
# Запуск AmneziaWG в контейнере monolit-awg. Устройство awg0 поднимается пустым: ключ, порт, параметры маскировки
# и пользователей задаёт админка через сокет /var/run/amneziawg/awg0.sock (папка смонтирована с хоста).
set -e
NET=${AWG_NET:-10.13.0.0/16}
ADDR=${AWG_ADDR:-10.13.0.1/16}

mkdir -p /var/run/amneziawg
rm -f /var/run/amneziawg/awg0.sock
ip link del awg0 2>/dev/null || true

rule() { t=$1; shift; iptables -t "$t" -C "$@" 2>/dev/null || iptables -t "$t" -A "$@"; }
# люди из VPN не видят друг друга и частные сети за сервером — как правило geoip:private в Xray
rule filter FORWARD -i awg0 -o awg0 -j DROP
for priv in 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 169.254.0.0/16 100.64.0.0/10; do rule filter FORWARD -i awg0 -d "$priv" -j DROP; done
rule filter FORWARD -i awg0 -j ACCEPT
rule filter FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT
rule nat POSTROUTING -s "$NET" -o eth0 -j MASQUERADE
rule mangle FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu

# адрес и включение — когда демон создаст устройство
(
  i=0
  while [ $i -lt 50 ] && ! ip link show awg0 >/dev/null 2>&1; do i=$((i + 1)); sleep 0.2; done
  ip address add "$ADDR" dev awg0
  ip link set mtu 1420 up dev awg0
) &

exec amneziawg-go -f awg0
