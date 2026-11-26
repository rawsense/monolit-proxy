#!/bin/bash
# monolit proxy: помощник на хосте. Админка в контейнере просит его о том, что можно сделать только на сервере:
# перезапустить Xray, проверить конфиг, обновить ядро и т. д. Команды — только из списка ниже, аргументы проверяются.
# Работает через systemd: monolit-agent.socket (/run/monolit/agent.sock, только root) → этот скрипт, один запрос на соединение.
# Запрос — одна строка «команда арг…». Ответ — вывод команды и последняя строка «__EXIT код».
set -u
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin LC_ALL=C
[ -f "${MP_ENVF:-/etc/monolit.env}" ] && . "${MP_ENVF:-/etc/monolit.env}"
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

# адреса сервера: без мостов (docker, Amnezia), veth и туннелей — это внутренние сети. Вывод: "a","b",
server_ips() {
  ip -4 -o addr show scope global 2>/dev/null | while read -r _ dev _ addr _; do dev=${dev%%@*}
    { [ -e "/sys/class/net/$dev/bridge" ] || [ -e "/sys/class/net/$dev/brport" ]; } && continue
    case "$dev" in docker*|br-*|veth*) continue ;; esac
    ip -o link show "$dev" | grep -q POINTOPOINT && continue
    printf '"%s",' "${addr%/*}"; done
}
# Пересылка со старого входящего адреса на новый (ipmove fwd): правила живут до перезагрузки, этого хватает на смену DNS
fwd_state() { iptables -t nat -S PREROUTING 2>/dev/null | grep -- '--comment monolit-ipfwd' | grep -m1 -- '-p tcp' | sed -nE 's/.*-d ([0-9.]+)\/32 .*--to-destination ([0-9.]+):443.*/\1>\2/p'; }
fwd_drop() { iptables -t nat -S PREROUTING 2>/dev/null | grep -- '--comment monolit-ipfwd' | sed 's/^-A/-D/' | while read -r r; do eval "iptables -t nat $r" 2>/dev/null; done; }

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
    ips=$(server_ips)
    ip1=$(ip -4 route get 1.1.1.1 2>/dev/null | grep -oE 'src [0-9.]+' | cut -d' ' -f2)
    sites='[]'
    if command -v nginx >/dev/null && [ -d /etc/nginx ]; then
      files=$(nginx -T 2>/dev/null | sed -n 's/^# configuration file \(.*\):$/\1/p' | sort -u | tr '\n' ':')
      sites=$(docker run --rm -v /etc/nginx:/etc/nginx:ro -e MP_NGINX_FILES="$files" monolit-proxy node /app/server/init.mjs scan 2>/dev/null || echo '[]')
    fi
    printf '{"ips":[%s],"ip1":"%s","sites":%s,"fwd":"%s"}\n' "${ips%,}" "$ip1" "$sites" "$(fwd_state)"
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
  netsave)   # netsave check|fix IP… — сохранены ли адреса в настройках сети (переживут ли перезагрузку)
    read -r _ op ips <<<"$line"
    [[ "$op" =~ ^(check|fix)$ ]] || fin 2
    for a in $ips; do [[ "$a" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || { echo "плохой адрес"; fin 2; }; done
    [ -x /usr/local/lib/monolit/netsave.sh ] || { echo "нет такой команды"; fin 2; }
    # шлём без кавычек нарочно: адреса уже проверены, каждый — отдельный аргумент
    # shellcheck disable=SC2086
    /usr/local/lib/monolit/netsave.sh "$op" $ips 2>&1
    fin $? ;;
  ips)   # адреса сервера без сайтов nginx: быстро, для слежки за новым адресом. fwd — «старый>новый», если старый ещё пересылается
    ips=$(server_ips)
    ip1=$(ip -4 route get 1.1.1.1 2>/dev/null | grep -oE 'src [0-9.]+' | cut -d' ' -f2)
    printf '{"ips":[%s],"ip1":"%s","fwd":"%s"}\n' "${ips%,}" "$ip1" "$(fwd_state)"
    fin 0 ;;
  ipmove)   # перевод Xray на другой адрес сервера (способ «Второй IP») без переустановки
    # ipmove check IP        — адрес есть на сервере, не основной, 443 на нём свободен
    # ipmove env IP          — записать адрес в /etc/monolit.env (MP_IP2 и подпись установки); печатает новую подпись
    # ipmove fwd СТАРЫЙ НОВЫЙ — пока DNS расходится, подключения на старый адрес пересылаются на новый
    # ipmove unfwd           — перестать пересылать
    ipre='^([0-9]{1,3}\.){3}[0-9]{1,3}$'
    has_ip() { ip -4 -o addr show 2>/dev/null | grep -q " inet $1/"; }
    case "$a1" in
      check)
        [[ "$a2" =~ $ipre ]] || { echo "плохой адрес"; fin 2; }
        has_ip "$a2" || { echo "адреса нет на сервере"; fin 3; }
        [ "$a2" != "$(ip -4 route get 1.1.1.1 2>/dev/null | grep -oE 'src [0-9.]+' | cut -d' ' -f2)" ] || { echo "это основной адрес"; fin 4; }
        h=$(ss -Hlntup "sport = :443" 2>/dev/null | awk -v a="$a2:443" '$5 == a' | grep -oE 'users:\(\("[^"]+"' | cut -d'"' -f2 | sort -u | grep -vx xray | tr '\n' ' ')
        [ -z "$h" ] || { echo "443 на этом адресе занят: $h"; fin 5; }
        fin 0 ;;
      env)
        [[ "$a2" =~ $ipre ]] || { echo "плохой адрес"; fin 2; }
        f=${MP_ENVF:-/etc/monolit.env}
        [ "${MP_MODE:-}" = ip2 ] || { echo "способ не «Второй IP»"; fin 1; }
        cp -p "$f" "$f.before-ipmove" || fin 1
        # подпись установки: способ|домен|IP|… — третье поле; с прежней подписью обновление пересобрало бы конфиг заново
        sed -i -E "s/^MP_IP2=.*/MP_IP2=$a2/; s/^(MP_APPLY_SIG=\"?ip2\|[^|]*\|)[^|]*/\1$a2/" "$f" || fin 1
        sed -n 's/^MP_APPLY_SIG=//p' "$f" | sed 's/^"//; s/"$//'
        fin 0 ;;
      fwd)
        [[ "$a2" =~ $ipre ]] && [[ "$rest" =~ $ipre ]] && [ "$a2" != "$rest" ] || { echo "плохой адрес"; fin 2; }
        command -v iptables >/dev/null || { echo "нет iptables"; fin 1; }
        fwd_drop
        has_ip "$a2" && has_ip "$rest" || { echo "старого адреса на сервере уже нет"; fin 3; }
        for p in tcp udp; do iptables -t nat -I PREROUTING -d "$a2/32" -p $p --dport 443 -m comment --comment monolit-ipfwd -j DNAT --to-destination "$rest:443" 2>&1 || { fwd_drop; fin 1; }; done
        fwd_state; fin 0 ;;
      unfwd) fwd_drop; fin 0 ;;
      *) fin 2 ;;
    esac ;;
  entry)   # entry set ДОМЕН | entry drop — запасной вход: админка и подписки в сайте nginx на основном адресе (способ «Второй IP»)
    f=${MP_ENVF:-/etc/monolit.env}
    [ "${MP_MODE:-}" = ip2 ] || { echo "Запасной вход на сайте есть только при способе «Второй IP»"; fin 1; }
    case "$a1" in
      set) [[ "$a2" =~ ^[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]] || { echo "плохой домен"; fin 2; }; dom=$a2 ;;
      drop) dom="" ;;
      *) fin 2 ;;
    esac
    command -v nginx >/dev/null && [ -d /etc/nginx ] || { echo "nginx не найден"; fin 1; }
    bk=/root/backups/nginx-$(date +%Y%m%d-%H%M%S)-before-entry.tgz; mkdir -p /root/backups
    tar czf "$bk" -C / etc/nginx || { echo "не получилось сохранить копию nginx"; fin 1; }
    files=$(nginx -T 2>/dev/null | sed -n 's/^# configuration file \(.*\):$/\1/p' | sort -u | tr '\n' ':')
    out=$(docker run --rm -v /etc/nginx:/etc/nginx -e MP_NGINX_FILES="$files" monolit-proxy node /app/server/init.mjs entry --domain "$dom" 2>&1); r=$?
    back() { tar xzf "$bk" -C /; nginx -t >/dev/null 2>&1 && systemctl reload nginx; }
    [ $r = 0 ] || { back; [ $r = 4 ] && echo "В nginx нет сайта $dom на 443" || echo "$out" | tail -n 2; fin 1; }
    if ! t=$(nginx -t 2>&1); then back; echo "nginx не принял правку (в сайте уже есть свой путь /s/?): $(echo "$t" | grep -m1 emerg)"; fin 1; fi
    systemctl reload nginx 2>&1 || { back; fin 1; }
    grep -q '^MP_ENTRY=' "$f" && sed -i "s/^MP_ENTRY=.*/MP_ENTRY=$dom/" "$f" || echo "MP_ENTRY=$dom" >> "$f"
    echo "ok"; fin 0 ;;
  tlssite)   # сайт nginx для входа Reality: TLS принимает nginx с сертификатом домена (на внутреннем сокете, пока Reality выключен — без дела)
    [[ "${MP_MODE:-}" =~ ^(bare|ip2)$ ]] || { echo "Reality включается, когда на 443 только monolit"; fin 1; }
    [ -n "${MP_CERT:-}" ] && [ -f "${MP_CERT:-}" ] && [ -f "${MP_KEY:-}" ] || { echo "Не нашёл сертификат домена (MP_CERT в /etc/monolit.env)"; fin 1; }
    command -v nginx >/dev/null && [ -d /etc/nginx ] || { echo "nginx не найден"; fin 1; }
    bk=/root/backups/nginx-$(date +%Y%m%d-%H%M%S)-before-reality.tgz; mkdir -p /root/backups
    tar czf "$bk" -C / etc/nginx || { echo "не получилось сохранить копию nginx"; fin 1; }
    new=1; [ -e /etc/nginx/conf.d/monolit-reality.conf ] && new=0
    alt=${MP_ALT:-}; alt=${alt#\"}; alt=${alt%\"}
    out=$(docker run --rm -v /etc/nginx:/etc/nginx monolit-proxy node /app/server/init.mjs tlssite --domain "$MP_DOMAIN" --port "${MP_LISTEN##*:}" --cert "$MP_CERT" --key "$MP_KEY" --alt "$alt" 2>&1) || { echo "$out" | tail -n 2; fin 1; }
    back() { [ $new = 1 ] && rm -f /etc/nginx/conf.d/monolit-reality.conf; tar xzf "$bk" -C /; nginx -t >/dev/null 2>&1 && systemctl reload nginx; }
    if ! t=$(nginx -t 2>&1); then back; echo "nginx не принял сайт для Reality: $(echo "$t" | grep -m1 emerg)"; fin 1; fi
    systemctl reload nginx 2>&1 || { back; fin 1; }
    # продлённый сертификат теперь нужен и nginx: Xray берёт его перезапуском, nginx — перечитыванием настроек
    h=/etc/letsencrypt/renewal-hooks/deploy/monolit-xray.sh
    [ -f "$h" ] && ! grep -q 'reload nginx' "$h" && echo 'systemctl reload nginx' >> "$h"
    for i in $(seq 1 20); do [ -S /dev/shm/monolit-tls.sock ] && break; sleep 0.2; done
    [ -S /dev/shm/monolit-tls.sock ] || { echo "nginx не открыл сокет для Reality"; fin 1; }
    echo "$out" | tail -n 1; fin 0 ;;
  awg)   # awg on ПОРТ [IP выхода] | awg off | awg state — сервер AmneziaWG в отдельном контейнере monolit-awg
    NETN=monolit-awg; SUB=172.31.213.0/24; SRC=${MP_SRC:-/opt/monolit-src}/awg
    snat_drop() { iptables -t nat -S POSTROUTING 2>/dev/null | grep -- '--comment monolit-awg' | sed 's/^-A/-D/' | while read -r r; do eval "iptables -t nat $r" 2>/dev/null; done; }
    case "$a1" in
      on)
        num "$a2" || fin 2
        [ -z "$rest" ] || [[ "$rest" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || { echo "плохой адрес выхода"; fin 2; }
        [ -f "$SRC/Dockerfile" ] || { echo "нет файлов сборки AmneziaWG: $SRC"; fin 1; }
        tag=$(sed -n 's/^ARG AWG_TAG=//p' "$SRC/Dockerfile" | head -1); [[ "$tag" =~ ^v[0-9.]+$ ]] || { echo "не найдена версия AmneziaWG"; fin 1; }
        img="monolit-awg:$tag-$(cat "$SRC/Dockerfile" "$SRC/start.sh" | sha256sum | cut -c1-8)"
        if ! docker image inspect "$img" >/dev/null 2>&1; then
          docker build -t "$img" "$SRC" > /tmp/monolit-awg-build.log 2>&1 || { tail -n 12 /tmp/monolit-awg-build.log; fin 1; }
        fi
        docker network inspect "$NETN" >/dev/null 2>&1 || docker network create --subnet "$SUB" "$NETN" >/dev/null 2>&1 || { echo "не создалась сеть $NETN ($SUB)"; fin 1; }
        cur=$(docker inspect monolit-awg --format '{{.Config.Image}} {{range $p, $_ := .HostConfig.PortBindings}}{{$p}}{{end}}' 2>/dev/null)
        if [ "$cur" != "$img $a2/udp" ]; then
          docker rm -f monolit-awg >/dev/null 2>&1
          docker run -d --name monolit-awg --restart unless-stopped --network "$NETN" --cap-add NET_ADMIN --device /dev/net/tun \
            --sysctl net.ipv4.ip_forward=1 --sysctl net.ipv4.conf.all.src_valid_mark=1 \
            -p "$a2:$a2/udp" -v /run/monolit/awg:/var/run/amneziawg "$img" >/dev/null 2>/tmp/monolit-awg-run.log || { tail -n 4 /tmp/monolit-awg-run.log; fin 1; }
        else
          docker update --restart unless-stopped monolit-awg >/dev/null 2>&1; docker start monolit-awg >/dev/null 2>&1
        fi
        # выход с выбранного адреса сервера: правило не переживает перезагрузку, админка повторяет «awg on» при сверке
        want=""; [ -n "$rest" ] && ip -4 -o addr show 2>/dev/null | grep -q " inet $rest/" && want="-s $SUB ! -d $SUB -m comment --comment monolit-awg -j SNAT --to-source $rest"
        have=$(iptables -t nat -S POSTROUTING 2>/dev/null | grep -- '--comment monolit-awg' | sed 's/^-A POSTROUTING //')
        if [ "$have" != "$want" ]; then snat_drop; [ -n "$want" ] && iptables -t nat -I POSTROUTING $want; fi
        if command -v ufw >/dev/null && ufw status 2>/dev/null | grep -q '^Status: active'; then ufw allow "$a2/udp" >/dev/null 2>&1
        elif command -v firewall-cmd >/dev/null && firewall-cmd --state >/dev/null 2>&1; then firewall-cmd -q --permanent --add-port="$a2/udp" && firewall-cmd -q --reload; fi
        for i in $(seq 1 25); do [ -S /run/monolit/awg/awg0.sock ] && break; sleep 0.2; done
        [ -S /run/monolit/awg/awg0.sock ] || { echo "AmneziaWG не запустился"; docker logs --tail 6 monolit-awg 2>&1; fin 1; }
        echo "$tag"; fin 0 ;;
      off)
        port=$(docker inspect monolit-awg --format '{{range $p, $_ := .HostConfig.PortBindings}}{{$p}}{{end}}' 2>/dev/null | cut -d/ -f1)
        docker rm -f monolit-awg >/dev/null 2>&1; snat_drop
        if num "${port:-x}"; then
          if command -v ufw >/dev/null && ufw status 2>/dev/null | grep -q '^Status: active'; then ufw delete allow "$port/udp" >/dev/null 2>&1
          elif command -v firewall-cmd >/dev/null && firewall-cmd --state >/dev/null 2>&1; then firewall-cmd -q --permanent --remove-port="$port/udp" && firewall-cmd -q --reload; fi
        fi
        fin 0 ;;
      state) docker ps -a --filter name=^monolit-awg$ --format '{{.State}}' 2>/dev/null | head -1; fin 0 ;;
      *) fin 2 ;;
    esac ;;
  *) echo "нет такой команды"; fin 2 ;;
esac
