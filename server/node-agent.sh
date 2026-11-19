#!/usr/bin/env bash
# Агент ноды monolit proxy. Раз в 30 секунд относит на основной сервер трафик людей и кто подключён,
# забирает оттуда конфиг Xray. Новый конфиг сначала проверяет сам Xray; не прошёл — остаётся прежний, ошибка уходит в админку.
# Если ноде в админке задан домен, агент сам выпускает сертификат и поднимает страницу-заглушку.
# Сюда никто не подключается: нода сама ходит на основной сервер, портов управления на ней нет.
. /etc/monolit-node.env
X=/usr/local/bin/xray
CFG=/usr/local/etc/xray/config.json
API=127.0.0.1:10085
DIR=/var/lib/monolit-node
LIB=/usr/local/lib/monolit-node
mkdir -p "$DIR"
ERR=""
CERR=""
CTRY=0

# Сертификат для домена ноды: certbot сам отвечает на проверку на порту 80 и сам продлевает
cert() {
  local d=$1 now
  [ -s "/etc/letsencrypt/live/$d/fullchain.pem" ] && return 0
  now=$(date +%s); [ $((now - CTRY)) -lt 600 ] && return 1   # не чаще раза в 10 минут: у Let's Encrypt лимит на неудачи
  CTRY=$now
  if ! command -v certbot >/dev/null; then (apt-get update -y && apt-get install -y certbot) >"$DIR/certbot-install.log" 2>&1 || { CERR="certbot не установился"; return 1; }; fi
  # Xray должен читать ключ сертификата: как на основном сервере, запускаем его от root
  if [ ! -f /etc/systemd/system/xray.service.d/10-monolit-node.conf ]; then
    mkdir -p /etc/systemd/system/xray.service.d
    printf '[Service]\nUser=root\n' > /etc/systemd/system/xray.service.d/10-monolit-node.conf
    systemctl daemon-reload
  fi
  if command -v ufw >/dev/null && ufw status 2>/dev/null | grep -q "Status: active"; then ufw allow 80/tcp >/dev/null 2>&1; ufw allow 8443/tcp >/dev/null 2>&1; ufw allow 443/udp >/dev/null 2>&1; fi
  if command -v firewall-cmd >/dev/null && firewall-cmd --state >/dev/null 2>&1; then for p in 80/tcp 8443/tcp 443/udp; do firewall-cmd --permanent --add-port=$p >/dev/null 2>&1; done; firewall-cmd --reload >/dev/null 2>&1; fi
  if OUT=$(certbot certonly --standalone --preferred-challenges http -d "$d" -n --agree-tos --register-unsafely-without-email --deploy-hook 'systemctl restart xray' 2>&1); then CERR=""; return 0; fi
  CERR=$(printf %s "$OUT" | grep -v '^$' | tail -n 4)
  return 1
}

# Страница, которую видит посторонний, открывший домен ноды в браузере
page() {
  [ -f /etc/systemd/system/monolit-node-page.service ] && return 0
  command -v python3 >/dev/null || return 0
  mkdir -p "$LIB/www"
  curl -fsS -m 20 "$MN_URL/page.html" -o "$LIB/www/index.html" || return 0
  cat > /etc/systemd/system/monolit-node-page.service <<UNIT
[Unit]
Description=monolit proxy node page
After=network.target

[Service]
ExecStart=/usr/bin/env python3 -m http.server 8081 --bind 127.0.0.1 --directory $LIB/www
Restart=always
RestartSec=5
User=nobody

[Install]
WantedBy=multi-user.target
UNIT
  systemctl daemon-reload; systemctl enable --now monolit-node-page >/dev/null 2>&1
}

# Новая версия агента приходит с основного сервера: проверяем синтаксис и перезапускаемся
selfupdate() {
  local want=$1 have
  have=$(sha256sum "$LIB/agent.sh" | cut -c1-16)
  [ -z "$want" ] || [ "$want" = "$have" ] && return 0
  curl -fsS -m 20 "$MN_URL/agent.sh" -o "$DIR/agent.new" || return 0
  [ "$(sha256sum "$DIR/agent.new" | cut -c1-16)" = "$want" ] && bash -n "$DIR/agent.new" || return 0
  install -m 755 "$DIR/agent.new" "$LIB/agent.sh" && exec "$LIB/agent.sh"
}

DOM=$(cat "$DIR/domain" 2>/dev/null || echo -)
while true; do
  SIG=$(cat "$DIR/sig" 2>/dev/null || echo -)
  # трафик копится в файле, пока основной сервер его не принял: связь пропала — ничего не теряется
  S=$(timeout 10 "$X" api statsquery --server=$API -pattern 'user>>>mp-' -reset 2>/dev/null | tr -d '\n')
  case "$S" in \{*\}) [ "$S" != "{}" ] && echo "$S" >> "$DIR/spool" ;; esac
  [ -f "$DIR/spool" ] && tail -n 500 "$DIR/spool" > "$DIR/spool.tmp" && mv "$DIR/spool.tmp" "$DIR/spool"
  STATS=$(paste -sd, "$DIR/spool" 2>/dev/null)
  IPS=""
  for n in $(timeout 10 "$X" api statsgetallonlineusers --server=$API 2>/dev/null | grep -o 'mp-[0-9][0-9-]*' | sort -u); do
    r=$(timeout 10 "$X" api statsonlineiplist --server=$API -email "$n" 2>/dev/null | tr -d '\n')
    case "$r" in \{*\}) IPS="$IPS${IPS:+,}\"$n\":$r" ;; esac
  done
  VER=$("$X" version 2>/dev/null | head -1 | awk '{print $2}')
  LOAD=$(cut -d' ' -f1 /proc/loadavg)
  ACTIVE=$(systemctl is-active xray 2>/dev/null)
  CERT=""
  if [ "$DOM" != "-" ]; then cert "$DOM" && { CERT=$DOM; page; }; fi
  BODY="{\"v\":2,\"sig\":\"$SIG\",\"xray\":\"$VER\",\"load\":\"$LOAD\",\"active\":\"$ACTIVE\",\"err\":\"$(printf %s "$ERR" | base64 -w0)\",\"cert\":\"$CERT\",\"cert_err\":\"$(printf %s "$CERR" | base64 -w0)\",\"stats\":[$STATS],\"ips\":{$IPS}}"
  if printf %s "$BODY" | curl -fsS -m 25 -X POST -H "x-node-key: $MN_KEY" -H 'content-type: application/json' --data-binary @- "$MN_URL/sync" -o "$DIR/resp" 2>"$DIR/curl.err"; then
    : > "$DIR/spool"
    read -r NEW NDOM ASIG < <(head -n 1 "$DIR/resp" | tr -d '\r')
    case "${NDOM:--}" in *[!a-z0-9.-]*) NDOM=- ;; esac
    if [ "${NDOM:--}" != "$DOM" ]; then DOM=${NDOM:--}; echo "$DOM" > "$DIR/domain"; CTRY=0; CERR=""; fi
    if [ -n "$NEW" ] && [ "$NEW" != "$SIG" ] && [ "$(wc -c < "$DIR/resp")" -gt 60 ]; then
      tail -n +2 "$DIR/resp" > "$DIR/cand.json"
      if OUT=$("$X" run -test -c "$DIR/cand.json" 2>&1); then
        install -m 644 "$DIR/cand.json" "$CFG"
        systemctl restart xray
        echo "$NEW" > "$DIR/sig"
        ERR=""
      else
        ERR=$(printf %s "$OUT" | tail -n 3)
      fi
    fi
    selfupdate "${ASIG:-}"
  fi
  sleep 30
done
