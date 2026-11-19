#!/bin/bash
# monolit proxy: помощник на хосте. Админка в контейнере просит его о том, что можно сделать только на сервере:
# перезапустить Xray, проверить конфиг, обновить ядро и т. д. Команды — только из списка ниже, аргументы проверяются.
# Работает через systemd: monolit-agent.socket (/run/monolit/agent.sock, только root) → этот скрипт, один запрос на соединение.
# Запрос — одна строка «команда арг…». Ответ — вывод команды и последняя строка «__EXIT код».
set -u
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin LC_ALL=C
[ -f /etc/monolit.env ] && . /etc/monolit.env
XRAY_BIN=$(command -v xray || echo /usr/local/bin/xray)
CFG=${MP_XRAY_CONFIG:-/usr/local/etc/xray/config.json}; CFGDIR=$(dirname "$CFG")
INSTALLER=https://github.com/XTLS/Xray-install/raw/main/install-release.sh

IFS= read -r -t 5 line || exit 0
line=${line%$'\r'}
read -r cmd a1 a2 rest <<<"$line"
fin() { echo "__EXIT $1"; exit 0; }
num() { [[ "$1" =~ ^[0-9]{1,5}$ ]] && [ "$1" -ge 1 ] && [ "$1" -le 65535 ]; }
active() { systemctl is-active "$1" 2>/dev/null | head -1; }
# после перезапуска: «activating» ждём до 60 с (ExecStartPost вроде маршрутов Amnezia)
xray_wait() { local i st; for i in $(seq 1 60); do st=$(active xray); [ "$st" = activating ] || break; sleep 1; done; echo "$st"; }

cert_end() {   # дата окончания первого сертификата из конфига Xray (или MP_CERT)
  local c=${MP_CERT:-}
  [ -n "$c" ] && [ -f "$c" ] || c=$(grep -o '"certificateFile": *"[^"]*"' "$CFG" 2>/dev/null | head -1 | sed 's/.*: *"//; s/"$//')
  [ -n "$c" ] && [ -f "$c" ] && openssl x509 -noout -enddate -in "$c" 2>/dev/null | cut -d= -f2
}

case "$cmd" in
  status)
    since=$(systemctl show xray -p ActiveEnterTimestamp --value 2>/dev/null); since=$( [ -n "$since" ] && date -d "$since" +%s 2>/dev/null || echo 0)
    mem=$(systemctl show xray -p MemoryCurrent --value 2>/dev/null)
    mtg=$(docker ps -a --filter name=^monolit-mtg$ --format '{{.State}}' 2>/dev/null | head -1)
    ver=$("$XRAY_BIN" version 2>/dev/null | head -1 | awk '{print $2}')
    end=$(cert_end); ends=$( [ -n "$end" ] && date -d "$end" +%s 2>/dev/null || echo 0)
    load=$(cut -d' ' -f1-3 /proc/loadavg)
    printf '{"xray":"%s","nginx":"%s","version":"%s","since":%s,"mem":"%s","cert_end":%s,"mtg":"%s","load":"%s","uptime":%s}\n' \
      "$(active xray)" "$(active nginx)" "$ver" "$since" "${mem//[^0-9]/}" "${ends:-0}" "${mtg:-none}" "$load" "$(cut -d. -f1 /proc/uptime)"
    fin 0 ;;
  xray-test)   # только файлы в папке конфига Xray
    [[ "$a1" =~ ^[A-Za-z0-9._-]+\.json$ ]] || { echo "плохое имя файла"; fin 2; }
    "$XRAY_BIN" run -test -c "$CFGDIR/$a1" 2>&1 | tail -n 8; fin "${PIPESTATUS[0]}" ;;
  xray-restart)
    systemctl restart xray 2>&1; sleep 1
    st=$(xray_wait); echo "$st"; [ "$st" = active ] && fin 0 || fin 1 ;;
  nginx-reload)
    nginx -t 2>&1 | tail -n 3; [ "${PIPESTATUS[0]}" = 0 ] || fin 1
    systemctl reload nginx 2>&1; fin $? ;;
  xray-update)   # официальный установщик: ядро последней версии, конфиг не трогает
    out=$(bash -c "$(curl -fsSL --max-time 30 "$INSTALLER")" @ install 2>&1); r=$?
    echo "$out" | tail -n 4; [ $r = 0 ] || fin 1
    systemctl restart xray; sleep 1; "$XRAY_BIN" version | head -1; [ "$(xray_wait)" = active ] && fin 0 || fin 1 ;;
  geo-update)
    s=$(curl -fsSL --max-time 30 "$INSTALLER") || fin 1
    out=$(bash -c "$s" @ update-geodata 2>&1); r=$?
    [ $r = 0 ] || { out=$(bash -c "$s" @ install-geodata 2>&1); r=$?; }
    echo "$out" | tail -n 3; [ $r = 0 ] || fin 1
    systemctl restart xray; sleep 1; [ "$(xray_wait)" = active ] && fin 0 || fin 1 ;;
  cert-renew)
    if command -v certbot >/dev/null; then certbot renew --no-random-sleep-on-renew 2>&1 | tail -n 6; r=${PIPESTATUS[0]}
    elif [ -x ~/.acme.sh/acme.sh ]; then ~/.acme.sh/acme.sh --cron 2>&1 | tail -n 6; r=${PIPESTATUS[0]}
    else echo "нет certbot и acme.sh"; fin 1; fi
    echo "до $(cert_end)"; fin "$r" ;;
  journal)
    n=${a1:-100}; [[ "$n" =~ ^[0-9]{1,4}$ ]] || n=100
    journalctl -u xray -n "$n" --no-pager -o short-iso 2>&1; fin 0 ;;
  mtg)
    [ -n "$(docker ps -aq --filter name=^monolit-mtg$ 2>/dev/null)" ] || { echo "прокси Telegram не установлен"; fin 1; }
    case "$a1" in
      on) docker update --restart unless-stopped monolit-mtg >/dev/null 2>&1; docker start monolit-mtg 2>&1; fin $? ;;
      off) docker update --restart no monolit-mtg >/dev/null 2>&1; docker stop monolit-mtg 2>&1; fin $? ;;
      *) fin 2 ;;
    esac ;;
  fw-open)   # открыть порт, если включён ufw или firewalld
    num "$a1" && [[ "$a2" =~ ^(tcp|udp)$ ]] || fin 2
    if command -v ufw >/dev/null && ufw status 2>/dev/null | grep -q '^Status: active'; then ufw allow "$a1/$a2" 2>&1 | tail -1
    elif command -v firewall-cmd >/dev/null && firewall-cmd --state >/dev/null 2>&1; then firewall-cmd -q --permanent --add-port="$a1/$a2" && firewall-cmd -q --reload; fi
    fin 0 ;;
  self-update)   # обновить monolit до релиза: отдельной службой, потому что install.sh перезапустит и нас
    [[ "$a1" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || fin 2
    [ -x /usr/local/lib/monolit/update.sh ] || { echo "Нет update.sh"; fin 1; }
    systemctl list-units --type=service --state=active --no-legend 'monolit-reconf-*' 2>/dev/null | grep -q . && { echo "Сейчас меняется адрес сервера, обновите после"; fin 1; }
    systemd-run --unit "monolit-update-$(date +%s)" --collect -p IgnoreSIGPIPE=no /usr/local/lib/monolit/update.sh "$a1" 2>&1 | tail -1
    fin "${PIPESTATUS[0]}" ;;
  fw-close)   # закрыть порт, открытый fw-open (только правило allow порт/протокол)
    num "$a1" && [[ "$a2" =~ ^(tcp|udp)$ ]] || fin 2
    if command -v ufw >/dev/null && ufw status 2>/dev/null | grep -q '^Status: active'; then ufw delete allow "$a1/$a2" 2>&1 | tail -1
    elif command -v firewall-cmd >/dev/null && firewall-cmd --state >/dev/null 2>&1; then firewall-cmd -q --permanent --remove-port="$a1/$a2" && firewall-cmd -q --reload; fi
    fin 0 ;;
  port-free)   # свободен ли порт (для SOCKS)
    num "$a1" || fin 2
    ss -Hltn "sport = :$a1" 2>/dev/null | grep -q . && { ss -Hltnp "sport = :$a1" | head -1; fin 1; } || fin 0 ;;
  probe)   # запрос через пробный вход Xray (127.0.0.1:порт → WARP): что видит сайт
    num "$a1" || fin 2
    curl -s --max-time 12 --socks5-hostname "127.0.0.1:$a1" https://www.cloudflare.com/cdn-cgi/trace 2>&1 | grep -E '^(ip|loc|warp|colo)='
    fin "${PIPESTATUS[0]}" ;;
  reach)   # reach ХОСТ [порт пробного входа] — открывается ли сайт с сервера и через WARP: «путь код мс код_curl»
    [[ "$a1" =~ ^[A-Za-z0-9.-]{1,253}$ ]] && [[ "$a1" == *.* ]] || { echo "плохой адрес"; fin 2; }
    one() { local r; r=$(curl -s -o /dev/null -m 8 -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' -w '%{http_code} %{time_total}' "$@" "https://$a1/" 2>/dev/null); echo "$r $?"; }
    one > /tmp/mp-reach-d.$$ &
    if [ -n "$a2" ] && num "$a2"; then one --socks5-hostname "127.0.0.1:$a2" > /tmp/mp-reach-w.$$ & fi
    wait
    echo "server $(cat /tmp/mp-reach-d.$$)"; [ -f /tmp/mp-reach-w.$$ ] && echo "warp $(cat /tmp/mp-reach-w.$$)"
    rm -f /tmp/mp-reach-[dw].$$; fin 0 ;;
  egress)   # egress IP — есть ли выход в интернет с этого адреса сервера; последняя строка — каким IP видят снаружи
    [[ "$a1" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || { echo "плохой адрес"; fin 2; }
    ip -4 -o addr show 2>/dev/null | grep -q " inet $a1/" || { echo "адреса нет на сервере"; fin 3; }
    seen=$(curl -4 -s -m 10 --interface "$a1" https://www.cloudflare.com/cdn-cgi/trace 2>/dev/null | sed -n 's/^ip=//p')
    [ -n "$seen" ] || seen=$(curl -4 -s -m 10 --interface "$a1" https://api.ipify.org 2>/dev/null)
    [[ "$seen" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || { echo "нет выхода"; fin 1; }
    echo "$seen"; fin 0 ;;
  netinfo)   # адреса сервера, основной IP, сайты nginx на 443 — для смены домена, IP и способа
    ips=$(ip -4 -o addr show scope global 2>/dev/null | while read -r _ dev _ addr _; do dev=${dev%%@*}
      { [ -e "/sys/class/net/$dev/bridge" ] || [ -e "/sys/class/net/$dev/brport" ]; } && continue
      case "$dev" in docker*|br-*|veth*) continue ;; esac
      ip -o link show "$dev" | grep -q POINTOPOINT && continue
      printf '"%s",' "${addr%/*}"; done)
    ip1=$(ip -4 route get 1.1.1.1 2>/dev/null | grep -oE 'src [0-9.]+' | cut -d' ' -f2)
    sites='[]'
    if command -v nginx >/dev/null && [ -d /etc/nginx ]; then
      files=$(nginx -T 2>/dev/null | sed -n 's/^# configuration file \(.*\):$/\1/p' | sort -u | tr '\n' ':')
      sites=$(docker run --rm -v /etc/nginx:/etc/nginx:ro -e MP_NGINX_FILES="$files" monolit-proxy node /app/server/init.mjs scan 2>/dev/null || echo '[]')
    fi
    printf '{"ips":[%s],"ip1":"%s","sites":%s}\n' "${ips%,}" "$ip1" "$sites"
    fin 0 ;;
  reconf)   # reconf СПОСОБ ДОМЕН IP2|- KEEP SKIPDNS DROP|- — сменить домен, IP или способ (install.sh отдельной службой)
    read -r _ mode domain ip2 keep skip drop _ <<<"$line"
    [[ "$mode" =~ ^(bare|front|ip2)$ ]] || { echo "плохой способ"; fin 2; }
    dom='^[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    [[ "$domain" =~ $dom ]] || { echo "плохой домен"; fin 2; }
    [[ "$ip2" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || [ "$ip2" = - ] || { echo "плохой адрес"; fin 2; }
    [[ "$keep$skip" =~ ^[01][01]$ ]] || fin 2
    [[ "$drop" =~ $dom ]] || [ "$drop" = - ] || { echo "плохой домен"; fin 2; }
    [ -x /usr/local/lib/monolit/reconf.sh ] || { echo "Нет reconf.sh"; fin 1; }
    # одновременно с обновлением нельзя: оба запускают install.sh
    systemctl list-units --type=service --state=active --no-legend 'monolit-update-*' 'monolit-reconf-*' 2>/dev/null | grep -q . && { echo "Уже идёт обновление или смена адреса"; fin 1; }
    systemd-run --unit "monolit-reconf-$(date +%s)" --collect -p IgnoreSIGPIPE=no /usr/local/lib/monolit/reconf.sh "$mode" "$domain" "$ip2" "$keep" "$skip" "$drop" 2>&1 | tail -1
    fin "${PIPESTATUS[0]}" ;;
  *) echo "нет такой команды"; fin 2 ;;
esac
