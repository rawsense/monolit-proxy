#!/usr/bin/env bash
# monolit proxy: установка, обновление, состояние и удаление. Повторный запуск обновляет код, пользователи и пароль сохраняются.
#
#   bash install.sh                         мастер: спросит домен и способ, покажет, что будет сделано
#   bash install.sh --domain vpn.site.ru    без вопросов; способ выбирается сам:
#       Xray уже стоит (autoXRAY)          — берём его входы, админку добавляем в сайт домена
#       в nginx есть сайты на 443          — «рядом с сайтами»: Xray на 443, сайты на внутренних сокетах nginx
#       сайтов нет                         — «как autoXRAY»: Xray на 443, за ним nginx со страницей входа
#   --ip 203.0.113.7       второй IP: Xray на нём, сайты остаются на первом. Домен VPN смотрит на второй IP
#   --mode bare|front|ip2  выбрать способ самому (на установленном сервере — сменить способ)
#   --keep-old-domain      домен сменили: прежний остаётся запасным, старые ссылки подписок работают
#   --drop-alt ДОМЕН       убрать запасной домен
#   --cert F --key F       свой сертификат (иначе Let's Encrypt, запасной — ZeroSSL)
#   --no-xhttp --no-bbr --no-firewall   не включать XHTTP / BBR и буферы TCP / правила файрвола
#   --socks [порт]         SOCKS5 с паролем (по умолчанию 1080)
#   --warp                 выход через Cloudflare WARP (регистрация в WARP). Что через него пускать — в админке, «Маршруты»
#   --mtproto [порт]       прокси для Telegram (mtg, FakeTLS, по умолчанию 8443)
#   --port N               порт админки на 127.0.0.1 (7380)    --skip-dns  не проверять, куда смотрит домен
#   --yes                  не спрашивать подтверждений          --no-nginx  (Xray уже стоит) не трогать nginx
#   --status   состояние          --reconfigure   поставить заново другим способом (пользователи сохраняются)
#   --replace-autoxray     Xray настроен autoXRAY: заменить его настройкой monolit (копии старого — в /root/backups)
#   --uninstall   убрать monolit и вернуть nginx и Xray как было до установки (база остаётся в /var/lib/monolit)
#
# Перед правкой конфигов кладёт копии в /root/backups; если проверка не прошла или сайты перестали открываться — откатывает.
set -euo pipefail

ARGS=("$@")
DOMAIN="" MODE_ARG="" PORT=7380 IP2="" CERT="" KEY="" NGINX=1 YES=0 SKIPDNS=0 ACTION=install
XHTTP=1 BBR=1 FW=1 SOCKS="" WARP=0 MTPROTO="" REPLACE=0 KEEPOLD=0 DROPALT=""
XRAY_BIN="${XRAY_BIN:-$(command -v xray || echo /usr/local/bin/xray)}"
XRAY_CONFIG="${XRAY_CONFIG:-/usr/local/etc/xray/config.json}"
SRC="$(cd "$(dirname "$0")" && pwd)"
DATA=/var/lib/monolit ENVF=/etc/monolit.env BK=/root/backups STAMP=$(date +%Y%m%d-%H%M%S)
LOG=/var/log/monolit-install.log
num() { [[ "${1:-}" =~ ^[0-9]+$ ]]; }

while [ $# -gt 0 ]; do case "$1" in
  --domain) DOMAIN="$2"; shift 2 ;;
  --ip) IP2="$2"; shift 2 ;;
  --mode) MODE_ARG="$2"; shift 2 ;;
  --cert) CERT="$2"; shift 2 ;;
  --key) KEY="$2"; shift 2 ;;
  --port) PORT="$2"; shift 2 ;;
  --no-nginx) NGINX=0; shift ;;
  --no-xhttp) XHTTP=0; shift ;;
  --no-bbr) BBR=0; shift ;;
  --no-firewall) FW=0; shift ;;
  --socks) if num "${2:-}"; then SOCKS="$2"; shift 2; else SOCKS=1080; shift; fi ;;
  --mtproto) if num "${2:-}"; then MTPROTO="$2"; shift 2; else MTPROTO=8443; shift; fi ;;
  --warp) WARP=1; shift ;;
  --replace-autoxray) REPLACE=1; shift ;;
  --keep-old-domain) KEEPOLD=1; shift ;;
  --drop-alt) DROPALT="$2"; shift 2 ;;
  --yes|-y) YES=1; shift ;;
  --skip-dns) SKIPDNS=1; shift ;;
  --status) ACTION=status; shift ;;
  --uninstall) ACTION=uninstall; shift ;;
  --reconfigure) ACTION=reconfigure; shift ;;
  # при запуске «bash <(curl …)» файл уже прочитан, перечитать его нельзя: даём ссылку
  -h|--help) if [ -f "$0" ]; then sed -n '2,25p' "$0" | sed 's/^# \{0,1\}//'; else echo "Ключи описаны в начале install.sh: https://github.com/rawsense/monolit-proxy/blob/main/install.sh"; fi; exit 0 ;;
  *) echo "Неизвестный параметр: $1 (bash install.sh --help)"; exit 1 ;;
esac; done

# ---------- вывод ----------
B=$'\033[1m' R=$'\033[31m' G=$'\033[32m' Y=$'\033[33m' D=$'\033[2m' N=$'\033[0m'
[ -t 1 ] || B="" R="" G="" Y="" D="" N=""
STEP=0
step() { STEP=$((STEP + 1)); printf '\n%s%d. %s%s\n' "$B" "$STEP" "$*" "$N"; echo "== $STEP. $*" >>"$LOG"; }
ok()   { printf '   %s✓%s %s\n' "$G" "$N" "$*"; }
warn() { printf '   %s!%s %s\n' "$Y" "$N" "$*"; }
info() { printf '   %s\n' "$*"; }
die()  { printf '\n%s%s%s\n' "$R" "$*" "$N" >&2; [ -s "$LOG" ] && printf '%sПодробности: %s%s\n' "$D" "$LOG" "$N" >&2; exit 1; }
# журнал только для root, пароли в нём скрыты
touch "$LOG" 2>/dev/null && chmod 600 "$LOG" 2>/dev/null || true
run()  { echo "+ $*" | sed -E 's/(PASSWORD=|PASS=|password[=: ]+)[^ ]+/\1***/g' >>"$LOG"; "$@" >>"$LOG" 2>&1; }
# Вопросы читаем из терминала: так работает и «curl … | bash»
TTY=0; { [ ${#ARGS[@]} -eq 0 ] || [ "$ACTION" != install ]; } && ( : </dev/tty ) 2>/dev/null && TTY=1
ask() { local q="$1" def="${2:-}" a; printf '%s%s%s' "$B" "$q" "$N" >/dev/tty; [ -n "$def" ] && printf ' %s[%s]%s' "$D" "$def" "$N" >/dev/tty
        printf ': ' >/dev/tty; IFS= read -r a </dev/tty || a=""; echo "${a:-$def}"; }
yesno() { [ "$YES" = 1 ] && return 0; [ "$TTY" = 1 ] || return 0; local a; a=$(ask "$1 (да/нет)" "${2:-да}"); [[ "${a,,}" =~ ^(д|да|y|yes)$ ]]; }
rnd() { head -c 64 /dev/urandom | base64 | tr -dc "${2:-a-z0-9}" | head -c "$1"; }
has_nginx() { command -v nginx >/dev/null && [ -d /etc/nginx ]; }
# Xray запущен: «activating» ждём до 60 с (после старта могут работать свои ExecStartPost, например маршруты Amnezia)
xray_up() { local i; for i in $(seq 1 60); do [ "$(systemctl is-active xray 2>/dev/null)" = activating ] || break; sleep 1; done; systemctl is-active --quiet xray; }

[ "$(id -u)" = 0 ] || die "Запустите от root"
mkdir -p "$BK" "$DATA" "$(dirname "$LOG")"; echo "=== $(date -Is) install.sh ${ARGS[*]:-}" >>"$LOG"
# запасные домены в 1.2.0–1.2.1 писались через «|» и «;»: оболочка читала это как команды. Формат без них: домен:сертификат:ключ,…
[ -f "$ENVF" ] && grep -q '^MP_ALT=.*[|;]' "$ENVF" && sed -i '/^MP_ALT=/{s/|/:/g;s/;/,/g}' "$ENVF"
HAD_ENV=0; [ -f "$ENVF" ] && { HAD_ENV=1; . "$ENVF"; }   # HAD_ENV=0 — установка с нуля

# ================= состояние =================
if [ "$ACTION" = status ]; then
  [ -f "$ENVF" ] || die "monolit не установлен (нет $ENVF)"
  echo "${B}monolit proxy${N}  способ: ${MP_MODE:-?}  домен: ${MP_DOMAIN:-?}"
  for s in xray nginx; do printf '  %-8s %s\n' "$s" "$(systemctl is-active $s 2>/dev/null || true)"; done
  printf '  %-8s %s\n' админка "$(docker ps --filter name=^monolit$ --format '{{.Status}}' | head -1 || true)"
  [ -n "${MP_MTG_PORT:-}" ] && printf '  %-8s %s\n' mtproto "$(docker ps --filter name=^monolit-mtg$ --format '{{.Status}}' | head -1 || true)"
  H=$(curl -s -m 3 "http://127.0.0.1:${MP_LISTEN##*:}/healthz" || true); printf '  %-8s %s\n' health "${H:-нет ответа}"
  for c in "${MP_CERT:-}"; do [ -f "$c" ] && printf '  %-8s до %s\n' сертиф. "$(openssl x509 -enddate -noout -in "$c" | cut -d= -f2)"; done
  echo "  Админка: https://${MP_DOMAIN:-?}/${MP_ADMIN_PATH:-?}/"
  [ -n "${MP_SOCKS:-}" ] && { IFS=: read -r sp su spw <<<"$MP_SOCKS"; echo "  SOCKS5:  $MP_DOMAIN:$sp  логин $su  пароль $spw"; }
  [ -n "${MP_MTG_PORT:-}" ] && echo "  Telegram: tg://proxy?server=$MP_DOMAIN&port=$MP_MTG_PORT&secret=${MP_MTG_SECRET:-}"
  exit 0
fi

# ================= откат к состоянию до monolit (uninstall и reconfigure) =================
restore_before() {
  local nb="${MP_BACKUP_NGINX:-}" xb="${MP_BACKUP_XRAY:-}"
  [ -n "$nb$xb" ] || die "Нет записи о бэкапах в $ENVF — вернуть nginx и Xray автоматически не получится"
  has_nginx && tar czf "$BK/nginx-$STAMP-before-$ACTION.tgz" -C / etc/nginx && info "Текущий nginx сохранён: $BK/nginx-$STAMP-before-$ACTION.tgz"
  [ -f "$XRAY_CONFIG" ] && cp "$XRAY_CONFIG" "$BK/xray-config-$STAMP-before-$ACTION.json"
  if [ "$ACTION" = uninstall ] && [ "${MP_OWN_XRAY:-}" = 1 ]; then
    # Xray ставил monolit: до установки его не было — убираем официальным установщиком (конфиг сохранён выше)
    bash -c "$(curl -fsSL https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ remove --purge >>"$LOG" 2>&1 && ok "Xray убран (его ставил monolit)" || { systemctl disable --now xray >>"$LOG" 2>&1; warn "Xray не удалился, остановлен"; }
  elif [ -n "$xb" ] && [ -f "$xb" ]; then
    # сначала убрать свою настройку юнита: прежний Xray мог работать от своего пользователя, со своими правами на файлы
    cp "$xb" "$XRAY_CONFIG"; rm -f /etc/systemd/system/xray.service.d/monolit.conf; systemctl daemon-reload
    systemctl reset-failed xray 2>/dev/null || true; systemctl restart xray 2>/dev/null || true; sleep 2
    systemctl is-active --quiet xray && ok "Конфиг Xray как до установки, Xray работает" || warn "Конфиг Xray вернул, но Xray не запустился: journalctl -u xray"
  fi
  if [ -n "$nb" ] && [ -f "$nb" ] && has_nginx; then
    rm -f /etc/nginx/monolit.conf /etc/nginx/conf.d/monolit-vpn.conf /etc/nginx/conf.d/monolit-reality.conf
    tar xzf "$nb" -C /
    nginx -t >>"$LOG" 2>&1 && systemctl restart nginx && ok "nginx как до установки" || warn "nginx после возврата не прошёл проверку: nginx -t"
  fi
  rm -f /etc/systemd/system/xray.service.d/monolit.conf /etc/letsencrypt/renewal-hooks/deploy/monolit-xray.sh; systemctl daemon-reload
}

if [ "$ACTION" = uninstall ]; then
  [ -f "$ENVF" ] || die "monolit не установлен"
  echo "Будет: остановлен контейнер админки${MP_MTG_PORT:+ и прокси Telegram}, nginx и Xray возвращены к состоянию до установки ($(basename "${MP_BACKUP_NGINX:-нет}")),"
  echo "убраны BBR-настройки monolit. Изменения nginx, сделанные после установки, пропадут (текущий nginx сохраню в $BK)."
  echo "База пользователей останется в $DATA, Docker — на месте; Xray $([ "${MP_OWN_XRAY:-}" = 1 ] && echo "уберу: его ставил monolit" || echo "останется со старым конфигом")."
  [ "$YES" = 1 ] || { [ "$TTY" = 1 ] && yesno "Удалить monolit?" нет; } || die "Отменено. Без терминала добавьте --yes"
  docker rm -f monolit monolit-mtg monolit-awg >>"$LOG" 2>&1 || true
  docker network rm monolit-awg >>"$LOG" 2>&1 || true
  iptables -t nat -S POSTROUTING 2>/dev/null | grep -- "--comment monolit-awg" | sed "s/^-A/-D/" | while read -r r; do eval "iptables -t nat $r" 2>/dev/null || true; done
  systemctl disable --now monolit-agent.socket >>"$LOG" 2>&1 || true
  rm -f /etc/systemd/system/monolit-agent.socket /etc/systemd/system/monolit-agent@.service /usr/local/lib/monolit/agent.sh /usr/local/lib/monolit/update.sh /usr/local/lib/monolit/reconf.sh /usr/local/lib/monolit/netsave.sh
  restore_before
  [ -f /etc/sysctl.d/99-monolit.conf ] && rm -f /etc/sysctl.d/99-monolit.conf && info "BBR-настройки убраны, старые значения ядра вернутся после перезагрузки"
  mv "$ENVF" "$BK/monolit.env-$STAMP"
  ok "monolit удалён. Правила файрвола не трогал. Полностью стереть данные: rm -rf $DATA"
  exit 0
fi

# ================= исходники =================
if [ ! -f "$SRC/server/main.mjs" ] || [ ! -f "$SRC/ui/dist/admin.html" ]; then
  # Запуск одной командой (bash <(curl …/install.sh)): исходников рядом нет, берём последний релиз с GitHub.
  # Свой архив .tar.gz можно задать в MP_SOURCE_URL. Папка та же, откуда потом обновляет кнопка в админке.
  REPO=${MP_REPO:-rawsense/monolit-proxy}; DEST=${MP_SRC:-/opt/monolit-proxy}; URL=${MP_SOURCE_URL:-}
  if [ -z "$URL" ]; then
    TAG=$(curl -fsSLI -m 30 -o /dev/null -w '%{url_effective}' "https://github.com/$REPO/releases/latest" | sed -n 's#.*/tag/##p')
    [[ "$TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || die "Не узнал последнюю версию: GitHub не ответил. Скачайте вручную: git clone https://github.com/$REPO.git"
    URL="https://github.com/$REPO/archive/refs/tags/$TAG.tar.gz"
  fi
  info "Скачиваю monolit${TAG:+ $TAG} в $DEST"
  TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
  curl -fsSL -m 180 "$URL" -o "$TMP/r.tgz" || die "Не скачался $URL"
  mkdir "$TMP/new" && tar xzf "$TMP/r.tgz" -C "$TMP/new" --strip-components=1 || die "Архив не распаковался: $URL"
  [ -f "$TMP/new/install.sh" ] && [ -f "$TMP/new/server/main.mjs" ] || die "В архиве нет monolit: $URL"
  # прежняя папка остаётся рядом как .prev
  if [ -e "$DEST" ]; then rm -rf "$DEST.prev"; mv "$DEST" "$DEST.prev"; fi
  mkdir -p "$(dirname "$DEST")" && mv "$TMP/new" "$DEST" || die "Не получилось положить monolit в $DEST"
  rm -rf "$TMP"; trap - EXIT
  exec bash "$DEST/install.sh" ${ARGS[@]+"${ARGS[@]}"}
fi

# ================= 1. проверка сервера =================
step "Проверяю сервер"
[ -d /run/systemd/system ] || die "Нужен systemd"
. /etc/os-release 2>/dev/null || true
case "${ID:-}" in ubuntu|debian) ok "${PRETTY_NAME:-$ID}" ;; *) warn "Проверено на Ubuntu и Debian, у вас ${PRETTY_NAME:-неизвестная ОС}" ;; esac
case "$(uname -m)" in x86_64|aarch64) ;; *) die "Архитектура $(uname -m) не поддерживается" ;; esac
FREE=$(df -Pm / | awk 'NR==2{print $4}'); [ "$FREE" -ge 1500 ] || die "Мало места: ${FREE} МБ, нужно от 1500"
MEM=$(awk '/MemTotal/{print int($2/1024)}' /proc/meminfo); [ "$MEM" -ge 450 ] || warn "Памяти ${MEM} МБ, может не хватить"
[ "$(timedatectl show -p NTPSynchronized --value 2>/dev/null || echo yes)" = yes ] || warn "Время не синхронизировано (timedatectl): TLS может не работать"
holders() { ss -Hlnp "$1" "sport = :$2" 2>/dev/null | grep -oE 'users:\(\("[^"]+"' | cut -d'"' -f2 | sort -u | tr '\n' ' '; }
# адреса сервера: без мостов (docker, Amnezia), veth и туннелей (wg, tun) — это внутренние сети
IPS=$(ip -4 -o addr show scope global | while read -r _ dev _ addr _; do dev=${dev%%@*}
  [ -e "/sys/class/net/$dev/bridge" ] || [ -e "/sys/class/net/$dev/brport" ] && continue
  case "$dev" in docker*|br-*|veth*) continue ;; esac
  ip -o link show "$dev" | grep -q 'POINTOPOINT' && continue
  printf '%s ' "${addr%/*}"; done)
IP1=$(ip -4 route get 1.1.1.1 2>/dev/null | grep -oE 'src [0-9.]+' | cut -d' ' -f2 || true)
ok "Адреса: ${IPS:-нет}; ${MEM} МБ памяти, ${FREE} МБ свободно"

# ================= 2. Docker и образ =================
step "Готовлю образ админки"
if ! command -v docker >/dev/null; then info "Ставлю Docker"; curl -fsSL https://get.docker.com | sh >>"$LOG" 2>&1 || die "Docker не установился"; ok "Docker $(docker --version | grep -oE "[0-9]+.[0-9]+.[0-9]+" | head -1)"; fi
run docker build -t monolit-proxy "$SRC" || die "Образ не собрался"
node_in() { docker run --rm "$@"; }
ok "Образ собран"

# ================= 3. что уже есть =================
CFGDIR=$(dirname "$XRAY_CONFIG")
READY=0
if [ -f "$XRAY_CONFIG" ]; then
  READY=$(node_in -v "$CFGDIR:$CFGDIR:ro" monolit-proxy node -e "
    const c=JSON.parse(require('fs').readFileSync('$XRAY_CONFIG','utf8')||'{}');
    console.log((c.inbounds||[]).some(i=>i.protocol==='hysteria'||(i.protocol==='vless'&&(i.streamSettings?.security==='tls'||(i.streamSettings?.security==='reality'&&i.tag==='vsRAWtlsVISION'))))?1:0)" 2>>"$LOG" || echo 0)
fi
nginx_files() { nginx -T 2>/dev/null | sed -n 's/^# configuration file \(.*\):$/\1/p' | sort -u; }
NGX_FILES=""; SITES="[]"
if has_nginx; then
  NGX_FILES=$(nginx_files | tr '\n' ':')
  for f in $(tr ':' ' ' <<<"$NGX_FILES"); do
    case "$f" in /etc/nginx/*) ;; *) grep -qE '^\s*listen[^;]*443' "$f" 2>/dev/null && die "Сайт на 443 в $f — вне /etc/nginx, его monolit перенести не сможет. Перенесите файл в /etc/nginx/conf.d" ;; esac
  done
  SITES=$(node_in -v /etc/nginx:/etc/nginx:ro -e MP_NGINX_FILES="$NGX_FILES" monolit-proxy node /app/server/init.mjs scan)
fi
SITE_NAMES=$(grep -oE '"names":\["[^"]+"' <<<"$SITES" | cut -d'"' -f4 | tr '\n' ' ' || true)

# Xray настроен не monolit (autoXRAY): предупредить и предложить заменить. Иначе — только пользователи в админке
replace_autoxray() {
  step "Заменяю настройку autoXRAY"
  cp "$XRAY_CONFIG" "$BK/xray-config-$STAMP-autoxray.json"; RB_XRAY="$BK/xray-config-$STAMP-autoxray.json"
  if has_nginx; then
    tar czf "$BK/nginx-$STAMP-autoxray.tgz" -C / etc/nginx; RB_NGINX="$BK/nginx-$STAMP-autoxray.tgz"
    local f off="$BK/autoxray-nginx-$STAMP"
    for f in $(grep -lsF /dev/shm/nginx.sock /etc/nginx/conf.d/*.conf /etc/nginx/sites-enabled/* 2>/dev/null || true); do
      mkdir -p "$off"; mv "$f" "$off/"; ok "Сайт autoXRAY убран из nginx: $f → $off/"
    done
    nginx -t >>"$LOG" 2>&1 && systemctl reload nginx || { tar xzf "$RB_NGINX" -C /; systemctl reload nginx; die "nginx без сайта autoXRAY не прошёл проверку, вернул как было"; }
  fi
  # uninstall вернёт к состоянию autoXRAY
  MP_BACKUP_XRAY="${MP_BACKUP_XRAY:-$RB_XRAY}"; MP_BACKUP_NGINX="${MP_BACKUP_NGINX:-${RB_NGINX:-}}"
  READY=0; MP_MODE=""; MP_APPLY_SIG=""
  [ -z "$DOMAIN" ] && DOMAIN=$(grep -oE '"serverName"\s*:\s*"[^"]+"' "$RB_XRAY" | head -1 | sed -E 's/.*"([^"]+)"$/\1/' || true)
  # сертификат прежнего Xray берём, только если он выпущен на этот домен (на сервере их может быть несколько)
  if [ -z "$CERT" ] && [ -n "$DOMAIN" ] && [ -s /var/lib/xray/cert/fullchain.pem ] && [ -s /var/lib/xray/cert/privkey.pem ] \
     && openssl x509 -in /var/lib/xray/cert/fullchain.pem -noout -checkhost "$DOMAIN" 2>/dev/null | grep -q 'does match'; then
    CERT=/var/lib/xray/cert/fullchain.pem KEY=/var/lib/xray/cert/privkey.pem; ok "Сертификат прежнего Xray подходит к $DOMAIN, оставляю"
  fi
  has_nginx && SITES=$(node_in -v /etc/nginx:/etc/nginx:ro -e MP_NGINX_FILES="$(nginx_files | tr '\n' ':')" monolit-proxy node /app/server/init.mjs scan)
  SITE_NAMES=$(grep -oE '"names":\["[^"]+"' <<<"$SITES" | cut -d'"' -f4 | tr '\n' ' ' || true)
}
FOREIGN=0; [ "$READY" = 1 ] && { [ -z "${MP_MODE:-}" ] || [ "$MP_MODE" = existing ]; } && FOREIGN=1
if [ "$FOREIGN" = 1 ] && [ "$REPLACE" = 0 ]; then
  step "Xray уже настроен"
  warn "Xray здесь настроен не через monolit (похоже, autoXRAY). Оставить его — будут только пользователи в админке,"
  info "без управления маршрутами, WARP, протоколами и без истории конфигов."
  if [ "$TTY" = 1 ] && [ "$YES" = 0 ]; then
    info "1) Заменить: monolit настроит Xray и nginx заново. Ключи, выданные autoXRAY, перестанут работать —"
    info "   людям нужно будет выдать подписки в админке. Копии старых конфигов — в $BK"
    info "2) Оставить как есть"
    [ "$(ask "Номер" 2)" = 1 ] && REPLACE=1
  else info "Заменить: install.sh --replace-autoxray"; fi
fi

if [ "$ACTION" = reconfigure ]; then
  [ -n "${MP_MODE:-}" ] || die "monolit ещё не установлен"
  [ "$MP_MODE" = existing ] && [ "$REPLACE" = 0 ] && die "Xray здесь настроен autoXRAY. Чтобы поставить заново, добавьте --replace-autoxray"
  step "Возвращаю nginx и Xray к состоянию до установки"
  yesno "Сайты и VPN пропадут на время переустановки. Продолжить?" || die "Отменено"
  restore_before; [ "$REPLACE" = 1 ] && [ "$MP_MODE" = existing ] && READY=1 || { READY=0; MP_MODE=""; MP_APPLY_SIG=""; }
  SITES=$(node_in -v /etc/nginx:/etc/nginx:ro -e MP_NGINX_FILES="$(nginx_files | tr '\n' ':')" monolit-proxy node /app/server/init.mjs scan)
  SITE_NAMES=$(grep -oE '"names":\["[^"]+"' <<<"$SITES" | cut -d'"' -f4 | tr '\n' ' ' || true)
fi

[ "$REPLACE" = 1 ] && [ "$READY" = 1 ] && replace_autoxray

# ================= 4. способ и домен =================
# Домен сменили (из админки): сертификат прежнего домена новому не подходит — выпустим свой, прежний домен можно оставить запасным
ALT="${MP_ALT:-}"
if [ -n "$DOMAIN" ] && [ -n "${MP_DOMAIN:-}" ] && [ "$DOMAIN" != "$MP_DOMAIN" ]; then
  [ "$KEEPOLD" = 1 ] && ALT="$ALT,$MP_DOMAIN:${MP_CERT:-}:${MP_KEY:-}"
  [ -n "$CERT" ] || { MP_CERT="" MP_KEY=""; }
fi
# запасные: без нового домена, без убранного, без повторов
ALT=$(tr ',' '\n' <<<"$ALT" | awk -F':' -v d="${DOMAIN:-${MP_DOMAIN:-}}" -v x="$DROPALT" 'NF && $1 != d && $1 != x && !s[$1]++' | paste -sd ',' - || true)
DOMAIN="${DOMAIN:-${MP_DOMAIN:-}}" CERT="${CERT:-${MP_CERT:-}}" KEY="${KEY:-${MP_KEY:-}}"
SOCKS="${SOCKS:-${MP_SOCKS:-}}"; SOCKS="${SOCKS%%:*}"; MTPROTO="${MTPROTO:-${MP_MTG_PORT:-}}"
[ "$WARP" = 1 ] || { [ -n "${MP_WARP:-}" ] && WARP=1; }
[ -n "${MP_XHTTP:-}" ] && [ ${#ARGS[@]} -eq 0 ] && XHTTP=$MP_XHTTP
if [ "$READY" = 1 ] && [ -z "${MP_MODE:-}" ]; then MODE=existing
elif [ -n "${MP_MODE:-}" ] && [ "$READY" = 1 ]; then MODE=$MP_MODE; [ -n "$MODE_ARG" ] && [ "$MP_MODE" != existing ] && MODE=$MODE_ARG
elif [ -n "$MODE_ARG" ]; then MODE=$MODE_ARG
elif [ -n "$IP2" ]; then MODE=ip2
elif [ "$SITES" != "[]" ]; then MODE=front
else MODE=bare; fi

step "Способ установки"
if [ "$TTY" = 1 ] && [ "$MODE" != existing ] && [ "$READY" = 0 ]; then
  info "Сайты nginx на 443: ${SITE_NAMES:-нет}"
  info "IPv4 сервера: $IPS"
  n=0; OPTS=()
  [ "$SITES" = "[]" ] && { n=$((n+1)); OPTS+=(bare); info "$n) Как autoXRAY: сайтов нет и не будет, Xray на 443"; }
  [ "$(wc -w <<<"$IPS")" -gt 1 ] && { n=$((n+1)); OPTS+=(ip2); info "$n) Второй IP: Xray на отдельном адресе, сайты на первом не трогаем"; }
  [ "$SITES" != "[]" ] && { n=$((n+1)); OPTS+=(front); info "$n) Рядом с сайтами: Xray на 443, сайты продолжают открываться через него"; }
  def=1; for i in "${!OPTS[@]}"; do [ "${OPTS[$i]}" = "$MODE" ] && def=$((i+1)); done
  c=$(ask "Номер" "$def"); num "$c" && [ "$c" -ge 1 ] && [ "$c" -le $n ] || die "Нет такого варианта"
  MODE=${OPTS[$((c-1))]}
  if [ "$MODE" = ip2 ] && [ -z "$IP2" ]; then
    for a in $IPS; do [ "$a" != "$IP1" ] && { IP2=$a; break; }; done
    IP2=$(ask "Адрес для Xray (не основной $IP1)" "$IP2")
  fi
  if [ -z "$DOMAIN" ]; then
    [ "$MODE" = front ] && info "Можно домен одного из сайтов или новый поддомен, например vpn.$(cut -d' ' -f1 <<<"$SITE_NAMES" | sed 's/^www\.//')"
    DOMAIN=$(ask "Домен для VPN и админки")
  fi
  if [ -z "$CERT" ] && ! grep -qF "\"$DOMAIN\"" <<<"$SITES"; then
    a=$(ask "Сертификат: 1) выпустить бесплатно  2) свои файлы" 1)
    [ "$a" = 2 ] && { CERT=$(ask "Путь к fullchain.pem"); KEY=$(ask "Путь к privkey.pem"); }
  fi
  yesno "XHTTP (третий протокол, как в autoXRAY)?" да && XHTTP=1 || XHTTP=0
  yesno "BBR и буферы TCP для скорости?" да && BBR=1 || BBR=0
  [ -z "$SOCKS" ] && yesno "SOCKS5 с паролем?" нет && SOCKS=1080
  [ "$WARP" = 0 ] && yesno "Выход через Cloudflare WARP (что через него пускать — в админке; регистрация в WARP, его условия)?" нет && WARP=1
  [ -z "$MTPROTO" ] && yesno "Прокси для Telegram (порт 8443)?" нет && MTPROTO=8443
fi
if [ -z "$DOMAIN" ] && [ "$MODE" = existing ] && [ -f "$XRAY_CONFIG" ]; then
  DOMAIN=$(grep -oE '"serverName"\s*:\s*"[^"]+"' "$XRAY_CONFIG" | head -1 | sed -E 's/.*"([^"]+)"$/\1/' || true)
fi
[ -n "$DOMAIN" ] || die "Укажите домен: --domain vpn.example.ru"
[[ "$DOMAIN" =~ ^[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]] || die "Домен $DOMAIN выглядит неправильно"
case "$MODE" in existing|front|ip2|bare) ;; *) die "Неизвестный способ $MODE (bare, front, ip2)" ;; esac
[ -z "$CERT" ] || [ -f "$CERT" ] || die "Нет файла сертификата $CERT"
[ -z "$KEY" ] || [ -f "$KEY" ] || die "Нет файла ключа $KEY"
if [ "$MODE" = ip2 ]; then
  [ -n "$IP2" ] || IP2="${MP_IP2:-}"
  # установки до появления MP_IP2: адрес, на котором слушает Xray
  [ -n "$IP2" ] || IP2=$(grep -oE '"listen": *"[0-9.]+"' "$XRAY_CONFIG" 2>/dev/null | grep -v '127.0.0.1\|0.0.0.0' | head -1 | grep -oE '[0-9.]{7,}' || true)
  [ -n "$IP2" ] || die "Для второго IP нужен --ip"
  grep -qFw "$IP2" <<<"$IPS" || die "Адреса $IP2 нет на этом сервере (ip addr)"
  [ "$IP2" != "$IP1" ] || die "$IP2 — основной адрес, для Xray нужен второй"
fi
# способ, который был до этого запуска (сменили из админки — сайты сначала вернутся к обычному 443)
FROM_MODE=""; [ "$READY" = 1 ] && [ -n "${MP_MODE:-}" ] && [ "$MP_MODE" != existing ] && [ "$MODE" != "$MP_MODE" ] && FROM_MODE=$MP_MODE
[ "$MODE" = bare ] && [ "$SITES" != "[]" ] && { [ "$READY" = 0 ] || [ -n "$FROM_MODE" ]; } && die "В nginx есть сайты на 443 ($SITE_NAMES). Выберите --mode front или второй IP --ip"
MODE_RU=$(case $MODE in existing) echo "Xray уже настроен, только админка" ;; bare) echo "как autoXRAY" ;; ip2) echo "второй IP $IP2" ;; front) echo "рядом с сайтами" ;; esac)
ok "$MODE_RU, домен $DOMAIN"

# ================= 5. проверки под способ =================
step "Проверяю порты и DNS"
LISTEN_IP=$([ "$MODE" = ip2 ] && echo "$IP2" || echo "$IP1")
if [ "$READY" = 0 ]; then
  for p in tcp udp; do
    h=$(holders "-$( [ $p = tcp ] && echo t || echo u)" 443 | sed 's/\bnginx\b//; s/\bxray\b//' | xargs || true)
    [ -z "$h" ] || die "443/$p занят: $h. Освободите порт или используйте второй IP"
  done
  h=$(holders -t 80 | sed 's/\bnginx\b//' | xargs || true); [ -z "$h" ] || warn "80 занят: $h — сертификат через nginx может не выпуститься"
fi
ok "443 свободен для Xray"
if [ "$SKIPDNS" = 0 ]; then
  A=$(getent ahostsv4 "$DOMAIN" 2>/dev/null | awk '{print $1}' | sort -u | tr '\n' ' ' | xargs || true)
  WANT=$([ "$MODE" = ip2 ] && echo "$IP2" || echo "$IPS")
  okdns=0; for a in $A; do grep -qFw "$a" <<<"$WANT" && okdns=1; done
  if [ "$okdns" = 1 ]; then ok "$DOMAIN смотрит на $A"
  else
    msg="$DOMAIN смотрит на ${A:-никуда}, а должен на $([ "$MODE" = ip2 ] && echo "$IP2" || echo "один из: $IPS")"
    if [ "$TTY" = 1 ] && yesno "$msg. Продолжить всё равно (сервер за NAT, DNS ещё обновляется)?" нет; then warn "$msg"
    else die "$msg. Поправьте A-запись или добавьте --skip-dns"; fi
  fi
fi

# ================= итог перед изменениями =================
XPORT="${MP_XHTTP_PORT:-}" XPATH="${MP_XHTTP_PATH:-}"
if [ "$XHTTP" = 1 ] && [ "$MODE" != existing ]; then
  [ -n "$XPATH" ] || XPATH=$(rnd 8)
  if [ -z "$XPORT" ]; then XPORT=3333; while [ -n "$(ss -Htln "sport = :$XPORT")" ]; do XPORT=$((XPORT + 1)); done; fi
fi
SOCKS_FULL=""; [ -n "$SOCKS" ] && SOCKS_FULL="${MP_SOCKS:-$SOCKS:u$(rnd 6):$(rnd 16 A-Za-z0-9)}" && SOCKS_FULL="$SOCKS:${SOCKS_FULL#*:}"
MP_ADMIN_PATH="${MP_ADMIN_PATH:-$(rnd 12)}"
SIG="$MODE|$DOMAIN|$IP2|$CERT|$PORT|$XPORT|$XPATH|$SOCKS_FULL|$WARP"; [ -n "$ALT" ] && SIG="$SIG|$ALT"
NEED_APPLY=0; [ "$MODE" != existing ] && [ "${MP_APPLY_SIG:-}" != "$SIG" ] && NEED_APPLY=1
# самопроверка: локации nginx на месте (их могли поправить руками) — иначе собрать заново
if [ "$MODE" != existing ] && [ "$NEED_APPLY" = 0 ]; then
  grep -qF "/$MP_ADMIN_PATH/" /etc/nginx/monolit.conf 2>/dev/null || NEED_APPLY=1
  [ -n "$XPORT" ] && ! grep -qF "127.0.0.1:$XPORT" /etc/nginx/monolit.conf 2>/dev/null && NEED_APPLY=1
  grep -q '"vsRAWtlsVISION"' "$XRAY_CONFIG" 2>/dev/null || NEED_APPLY=1
fi
if [ "$TTY" = 1 ] && [ "$YES" = 0 ]; then
  echo; echo "${B}Будет сделано:${N}"
  [ "$NEED_APPLY" = 1 ] && case $MODE in
    bare)  info "Xray на 443: Vision, Hysteria2$([ "$XHTTP" = 1 ] && echo ", XHTTP"). За ним nginx: страница входа, админка, подписки" ;;
    ip2)   info "Xray на $IP2:443. Сайты nginx переедут на $IP1:443 (перезапуск nginx, сайты пропадут на секунду)" ;;
    front) info "Xray на 443, сайты ($SITE_NAMES) — на внутренних сокетах nginx (около секунды без сайтов)" ;;
  esac
  [ "$MODE" = existing ] && info "Админка добавится в сайт $DOMAIN, Xray получит API для пользователей"
  [ "$NEED_APPLY" = 1 ] && [ -z "$CERT" ] && ! grep -qF "\"$DOMAIN\"" <<<"$SITES" && info "Сертификат Let's Encrypt для $DOMAIN (запасной — ZeroSSL)"
  [ "$BBR" = 1 ] && info "BBR и буферы TCP"
  [ "$FW" = 1 ] && info "Открою порты в ufw/firewalld, если включены"
  [ -n "$SOCKS" ] && info "SOCKS5 на порту $SOCKS"; [ "$WARP" = 1 ] && info "Выход через WARP"; [ -n "$MTPROTO" ] && info "Прокси Telegram на порту $MTPROTO"
  info "Копии конфигов — в $BK, при сбое всё вернётся как было"
  yesno "Начинаем?" || die "Отменено"
fi

# ================= 6. nginx и Xray =================
if [ "$MODE" != existing ] && ! has_nginx; then
  step "Ставлю nginx"; run apt-get update -qq; DEBIAN_FRONTEND=noninteractive run apt-get install -y -qq nginx || die "nginx не установился"
  systemctl enable --now nginx >>"$LOG" 2>&1; ok "nginx $(nginx -v 2>&1 | cut -d/ -f2)"
  NGX_FILES=$(nginx_files | tr '\n' ':')
fi
if [ ! -x "$XRAY_BIN" ]; then
  step "Ставлю Xray (официальный установщик XTLS)"
  bash -c "$(curl -fsSL https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install >>"$LOG" 2>&1 || die "Xray не установился"
  XRAY_BIN=$(command -v xray || echo /usr/local/bin/xray); ok "$("$XRAY_BIN" version | head -1 | cut -d' ' -f1-2)"
  MP_OWN_XRAY=1   # Xray поставил monolit: --uninstall его и уберёт
fi
BINDIR=$(dirname "$XRAY_BIN"); SHARE=/usr/local/share/xray; [ -d "$SHARE" ] || SHARE="$BINDIR"
mkdir -p "$CFGDIR"; [ -s "$XRAY_CONFIG" ] || echo '{}' > "$XRAY_CONFIG"

# Бэкапы до первого изменения (самые ранние запоминаем для --uninstall)
cp "$XRAY_CONFIG" "$BK/xray-config-$STAMP-before-monolit.json"
has_nginx && tar czf "$BK/nginx-$STAMP-before-monolit.tgz" -C / etc/nginx
# Состояние до monolit. Установка с нуля — бэкап этого запуска (в /root/backups могут лежать чужие старые копии).
# Обновление версии, которая не записывала бэкап в env, — самый ранний before-monolit
if [ "$HAD_ENV" = 0 ]; then
  MP_BACKUP_XRAY="${MP_BACKUP_XRAY:-$BK/xray-config-$STAMP-before-monolit.json}"
  MP_BACKUP_NGINX="${MP_BACKUP_NGINX:-$(has_nginx && echo "$BK/nginx-$STAMP-before-monolit.tgz")}"
else
  MP_BACKUP_XRAY="${MP_BACKUP_XRAY:-$(ls "$BK"/xray-config-*-before-monolit.json 2>/dev/null | sort | head -1)}"
  MP_BACKUP_NGINX="${MP_BACKUP_NGINX:-$(ls "$BK"/nginx-*-before-monolit.tgz 2>/dev/null | sort | head -1)}"
fi
NEWFILES=""; for f in /etc/nginx/monolit.conf /etc/nginx/conf.d/monolit-vpn.conf /etc/nginx/conf.d/monolit-reality.conf; do [ -e "$f" ] || NEWFILES="$NEWFILES $f"; done
rollback() {
  # Xray первым останавливаем: после смены способа он держит 443 на всех адресах и не дал бы nginx вернуться на свой адрес
  systemctl stop xray 2>/dev/null || true
  if has_nginx; then rm -f $NEWFILES; tar xzf "${RB_NGINX:-$BK/nginx-$STAMP-before-monolit.tgz}" -C /; nginx -t >>"$LOG" 2>&1 && systemctl restart nginx; fi
  cp "${RB_XRAY:-$BK/xray-config-$STAMP-before-monolit.json}" "$XRAY_CONFIG"
  # своя настройка юнита, поставленная в этом запуске, — тоже назад: прежний Xray мог работать от своего пользователя
  [ "${DROPIN_NEW:-0}" = 1 ] && rm -f /etc/systemd/system/xray.service.d/monolit.conf
  systemctl daemon-reload; systemctl reset-failed xray 2>/dev/null || true; systemctl restart xray 2>/dev/null || true
  sleep 2; systemctl is-active --quiet xray || warn "Прежний Xray не запустился после отката: journalctl -u xray"
  die "$1. Вернул Xray и nginx как было"
}

# Код ответа каждого сайта до и после: если сайт открывался, а перестал — откат
site_codes() { local out="" n; for n in $SITE_NAMES; do out="$out $n=$(curl -sk -o /dev/null -m 5 -w '%{http_code}' --resolve "$n:443:${IP1:-127.0.0.1}" "https://$n/" || true)"; done; echo "$out"; }

if [ "$NEED_APPLY" = 1 ]; then
  # --- сертификат ---
  if [ -z "$CERT" ] && ! grep -qF "\"$DOMAIN\"" <<<"$SITES"; then
    step "Выпускаю сертификат для $DOMAIN"
    command -v certbot >/dev/null && dpkg -s python3-certbot-nginx >/dev/null 2>&1 || { run apt-get update -qq; DEBIAN_FRONTEND=noninteractive run apt-get install -y -qq certbot python3-certbot-nginx; }
    if run certbot certonly -n --agree-tos --register-unsafely-without-email --nginx -d "$DOMAIN"; then
      CERT=/etc/letsencrypt/live/$DOMAIN/fullchain.pem KEY=/etc/letsencrypt/live/$DOMAIN/privkey.pem
      mkdir -p /etc/letsencrypt/renewal-hooks/deploy
      printf '#!/bin/sh\n# monolit proxy: Xray и nginx подхватывают продлённые сертификаты\nsystemctl restart xray\nsystemctl reload nginx\n' > /etc/letsencrypt/renewal-hooks/deploy/monolit-xray.sh
      chmod +x /etc/letsencrypt/renewal-hooks/deploy/monolit-xray.sh; ok "Let's Encrypt, продление — certbot"
    else
      warn "Let's Encrypt не выдал (подробности в $LOG), пробую ZeroSSL"
      [ -x ~/.acme.sh/acme.sh ] || curl -fsSL https://get.acme.sh | sh -s email="admin@$DOMAIN" >>"$LOG" 2>&1 || die "acme.sh не установился"
      mkdir -p /etc/monolit/cert
      run ~/.acme.sh/acme.sh --issue --nginx -d "$DOMAIN" --server zerossl --keylength ec-256 || die "Сертификат не выдан ни Let's Encrypt, ни ZeroSSL. Проверьте, что $DOMAIN смотрит на сервер и порт 80 открыт"
      run ~/.acme.sh/acme.sh --install-cert -d "$DOMAIN" --ecc --fullchain-file /etc/monolit/cert/fullchain.pem --key-file /etc/monolit/cert/privkey.pem --reloadcmd "systemctl restart xray; systemctl reload nginx"
      CERT=/etc/monolit/cert/fullchain.pem KEY=/etc/monolit/cert/privkey.pem; ok "ZeroSSL, продление — acme.sh"
    fi
  fi

  # --- WARP: регистрируем один раз, ключи храним ---
  WARPF=""; if [ "$WARP" = 1 ]; then
    WARPF=$DATA/warp.json
    if [ ! -s "$WARPF" ]; then step "Регистрирую выход WARP"; node_in -v "$DATA:$DATA" monolit-proxy node /app/server/init.mjs warp --out "$WARPF" >>"$LOG" 2>&1 || die "WARP не зарегистрировался (подробности в $LOG)"; ok "WARP зарегистрирован"; fi
    chmod 600 "$WARPF"
  fi

  step "Настраиваю Xray и nginx"
  BEFORE=$(site_codes)
  OUT=$(node_in -v "$CFGDIR:$CFGDIR" -v "$DATA:$DATA" $(has_nginx && echo "-v /etc/nginx:/etc/nginx") -e MP_XRAY_CONFIG="$XRAY_CONFIG" -e MP_NGINX_FILES="$NGX_FILES" monolit-proxy \
    node /app/server/init.mjs apply --mode "$MODE" --domain "$DOMAIN" --port "$PORT" --admin-path "$MP_ADMIN_PATH" --ip2 "$IP2" --ip1 "$IP1" \
    --cert "$CERT" --key "$KEY" --xhttp-port "${XPORT:-0}" --xhttp-path "$XPATH" --socks "$SOCKS_FULL" --warp "$WARPF" --from-mode "$FROM_MODE" --alt "$ALT" --entry "${MP_ENTRY:-}" 2>>"$LOG") || rollback "Не получилось собрать конфиг"
  echo "$OUT" >>"$LOG"
  # сайт для входа Reality: TLS принимает nginx. Пишется всегда, включается переключателем в админке
  if [ "$MODE" = bare ] || [ "$MODE" = ip2 ]; then
    node_in -v /etc/nginx:/etc/nginx monolit-proxy node /app/server/init.mjs tlssite --domain "$DOMAIN" --port "$PORT" --cert "$CERT" --key "$KEY" --alt "$ALT" >>"$LOG" 2>&1 || warn "Сайт для Reality не собрался: включить Reality в админке не получится (подробности в $LOG)"
  fi
  "$XRAY_BIN" run -test -c "$XRAY_CONFIG" >>"$LOG" 2>&1 || rollback "Xray не принял новый конфиг"
  nginx -t >>"$LOG" 2>&1 || rollback "nginx не принял правку"
  ok "Конфиги собраны и проверены"

  # Xray читает сертификаты сайтов и Let's Encrypt (они только для root). Юнит XTLS урезает права root:
  # без CAP_DAC_READ_SEARCH он не прочтёт ключ, принадлежащий другому пользователю (например, xray)
  DU=/etc/systemd/system/xray.service.d/monolit.conf; [ -f "$DU" ] || DROPIN_NEW=1
  CAPS="CAP_NET_ADMIN CAP_NET_BIND_SERVICE CAP_NET_RAW CAP_DAC_READ_SEARCH"
  mkdir -p "${DU%/*}"; printf '[Service]\nUser=root\nCapabilityBoundingSet=%s\nAmbientCapabilities=%s\n' "$CAPS" "$CAPS" > "$DU"
  systemctl daemon-reload
  # Сначала nginx отпускает 443, потом Xray его занимает. ip2: с 0.0.0.0:443 на IP1:443 nginx уходит только перезапуском
  # Способ сменили: Xray держит 443 на всех адресах (или на втором IP) — останавливаем, пока nginx переезжает
  [ -n "$FROM_MODE" ] && systemctl stop xray
  if [ "$MODE" = ip2 ] || [ -n "$FROM_MODE" ]; then systemctl restart nginx; else systemctl reload nginx; fi
  sleep 1; systemctl is-active --quiet nginx || rollback "nginx не запустился с новыми адресами"
  systemctl enable xray >>"$LOG" 2>&1 || true; systemctl restart xray; sleep 2
  xray_up || rollback "Xray не запустился (journalctl -u xray)"
  AFTER=$(site_codes)
  for kv in $BEFORE; do n=${kv%%=*} b=${kv#*=} a=$(tr ' ' '\n' <<<"$AFTER" | sed -n "s/^$n=//p")
    [ "$b" != 000 ] && [ "$a" = 000 ] && rollback "Сайт $n перестал открываться"
    [ "$b" != "$a" ] && warn "$n: код ответа был $b, стал $a"
  done
  [ -n "$SITE_NAMES" ] && ok "Сайты открываются: $AFTER"
  ok "Xray на $([ "$MODE" = ip2 ] && echo "$IP2:443" || echo "443 всех адресов")"
  MP_APPLY_SIG=$SIG
fi

# ================= 7. система =================
if [ "$BBR" = 1 ]; then
  if [ -f /etc/sysctl.d/999-autoXRAY.conf ]; then ok "BBR уже включён (файл autoXRAY в /etc/sysctl.d)"
  elif [ ! -f /etc/sysctl.d/99-monolit.conf ]; then
    step "Включаю BBR и буферы TCP"
    # Только повышаем: если на сервере уже больше или выбран свой алгоритм — не трогаем
    cur() { sysctl -n "$1" 2>/dev/null | awk '{print $NF}'; }
    L=("# monolit proxy: BBR, MTU probing и большие буферы TCP (как в autoXRAY). Только то, что было ниже")
    cc=$(sysctl -n net.ipv4.tcp_congestion_control 2>/dev/null || true)
    if [[ "$cc" =~ ^(cubic|reno)?$ ]]; then L+=("net.core.default_qdisc=fq" "net.ipv4.tcp_congestion_control=bbr"); else info "Алгоритм TCP уже выбран ($cc), оставляю"; fi
    [ "$(cur net.ipv4.tcp_mtu_probing)" = 0 ] && L+=("net.ipv4.tcp_mtu_probing=1")
    for k in net.core.rmem_max net.core.wmem_max; do [ "$(cur $k || echo 0)" -lt 16777216 ] && L+=("$k=16777216"); done
    [ "$(cur net.ipv4.tcp_rmem || echo 0)" -lt 16777216 ] && L+=("net.ipv4.tcp_rmem=4096 87380 16777216")
    [ "$(cur net.ipv4.tcp_wmem || echo 0)" -lt 16777216 ] && L+=("net.ipv4.tcp_wmem=4096 65536 16777216")
    if [ ${#L[@]} -gt 1 ]; then
      printf '%s\n' "${L[@]}" > /etc/sysctl.d/99-monolit.conf
      sysctl -p /etc/sysctl.d/99-monolit.conf >>"$LOG" 2>&1 || true
      [ "$(sysctl -n net.ipv4.tcp_congestion_control 2>/dev/null)" = bbr ] && ok "BBR включён" || ok "Буферы TCP подняты"
    else ok "Ядро уже настроено не хуже"; fi
  fi
fi
if [ "$FW" = 1 ]; then
  PORTS="80/tcp 443/tcp 443/udp${SOCKS:+ $SOCKS/tcp}${MTPROTO:+ $MTPROTO/tcp}"
  if command -v ufw >/dev/null && ufw status 2>/dev/null | grep -q "Status: active"; then
    for p in $PORTS; do run ufw allow "$p"; done; ok "ufw: открыты $PORTS"
  elif command -v firewall-cmd >/dev/null && firewall-cmd --state >/dev/null 2>&1; then
    for p in $PORTS; do run firewall-cmd --permanent --add-port="$p"; done; run firewall-cmd --reload; ok "firewalld: открыты $PORTS"
  fi
fi

# ================= 8. админка =================
step "Запускаю админку"
NEWPASS=""; [ -f "$DATA/monolit.db" ] || NEWPASS=$(rnd 16 A-Za-z0-9)
MTG_SEC="${MP_MTG_SECRET:-}"
# часовой пояс без «… | grep -m1»: grep выходит раньше, и запись в него падает с «Broken pipe»
TZONE=$(timedatectl show -p Timezone --value 2>/dev/null || true)
[ -n "$TZONE" ] || TZONE=$(head -1 /etc/timezone 2>/dev/null || true)
[ -n "$TZONE" ] || TZONE=UTC
cat > "$ENVF" <<EOF
MP_DOMAIN=$DOMAIN
MP_ADMIN_PATH=$MP_ADMIN_PATH
MP_LISTEN=127.0.0.1:$PORT
MP_SERVER_NAME=${MP_SERVER_NAME:-$(hostname -s | cut -c1-24)}
MP_MODE=$MODE
MP_IP2=$IP2
MP_ALT=$ALT
MP_ENTRY=$([ "$MODE" = ip2 ] && echo "${MP_ENTRY:-}")
MP_CERT=$CERT
MP_KEY=$KEY
MP_XHTTP=$XHTTP
MP_XHTTP_PORT=$XPORT
MP_XHTTP_PATH=$XPATH
MP_KINDS=vision,hy2$([ "$XHTTP" = 1 ] && [ -n "$XPORT" ] && echo ,xhttp)
MP_SOCKS=$SOCKS_FULL
MP_WARP=$([ "$WARP" = 1 ] && echo 1)
MP_MTG_PORT=$([ -n "$MTG_SEC" ] && echo "$MTPROTO" || true)
MP_MTG_SECRET=$MTG_SEC
MP_APPLY_SIG="${MP_APPLY_SIG:-}"
MP_BACKUP_XRAY=$MP_BACKUP_XRAY
MP_BACKUP_NGINX=$MP_BACKUP_NGINX
MP_OWN_XRAY=${MP_OWN_XRAY:-}
MP_FIREWALL=$FW
MP_VERSION=$(cat "$SRC/VERSION" 2>/dev/null || echo 0.0.0)
MP_SRC=$SRC
MP_REPO=$( [ "${MP_REPO:-}" = danilax9/monolit-proxy ] && echo rawsense/monolit-proxy || echo "${MP_REPO:-rawsense/monolit-proxy}" )
MP_TZ=$TZONE
EOF
chmod 600 "$ENVF"; [ -f "$DATA/warp.json" ] && chmod 600 "$DATA/warp.json"

# API Xray: живое добавление пользователей и счёт трафика
cp "$XRAY_CONFIG" "$BK/xray-config-$STAMP-before-api.json"
R=$(node_in -v "$CFGDIR:$CFGDIR" -v "$XRAY_BIN:/usr/local/bin/xray:ro" -e MP_XRAY_CONFIG="$XRAY_CONFIG" monolit-proxy node /app/server/setup.mjs 2>>"$LOG") || die "В конфиге Xray нет входов Vision или Hysteria2"
if [ "$R" = changed ]; then
  "$XRAY_BIN" run -test -c "$XRAY_CONFIG" >>"$LOG" 2>&1 || { cp "$BK/xray-config-$STAMP-before-api.json" "$XRAY_CONFIG"; die "Xray не принял конфиг с API, вернул как было"; }
  systemctl restart xray; ok "API Xray включён"
fi

# Помощник админки на хосте: перезапуск и проверка Xray, обновления, журнал. Только команды из списка, сокет только для root
install -d -m 755 /usr/local/lib/monolit
install -m 755 "$SRC/agent/agent.sh" "$SRC/agent/update.sh" "$SRC/agent/reconf.sh" "$SRC/agent/netsave.sh" /usr/local/lib/monolit/
install -m 644 "$SRC/agent/monolit-agent.socket" "$SRC/agent/monolit-agent@.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable monolit-agent.socket >>"$LOG" 2>&1; systemctl restart monolit-agent.socket >>"$LOG" 2>&1 \
  && ok "Помощник админки запущен" || warn "Помощник не запустился: управление сервером в админке будет недоступно"

docker rm -f monolit >>"$LOG" 2>&1 || true
run docker run -d --name monolit --restart unless-stopped --network host \
  --env-file "$ENVF" ${NEWPASS:+-e MP_ADMIN_PASSWORD=$NEWPASS} -e MP_XRAY_CONFIG="$XRAY_CONFIG" \
  -v "$DATA:/data" -v "$CFGDIR:$CFGDIR" -v /run/monolit:/run/monolit -v "$XRAY_BIN:/usr/local/bin/xray:ro" -v "$SHARE:/usr/local/share/xray:ro" \
  monolit-proxy || die "Контейнер не запустился"

# Xray уже стоял (autoXRAY): админка — локациями в сайт домена
URL="https://$DOMAIN/$MP_ADMIN_PATH/"
if [ "$MODE" = existing ]; then
  if [ "$NGINX" = 1 ]; then
    has_nginx || die "nginx не найден. Запустите с --no-nginx и проксируйте 127.0.0.1:$PORT сами"
    node_in -v /etc/nginx:/etc/nginx -e MP_NGINX_FILES="$NGX_FILES" monolit-proxy node /app/server/init.mjs include --domain "$DOMAIN" --port "$PORT" --admin-path "$MP_ADMIN_PATH" >>"$LOG" 2>&1 \
      || { tar xzf "$BK/nginx-$STAMP-before-monolit.tgz" -C /; die "В nginx нет сайта $DOMAIN на 443. Запустите с --no-nginx или добавьте сайт"; }
    nginx -t >>"$LOG" 2>&1 && systemctl reload nginx || { tar xzf "$BK/nginx-$STAMP-before-monolit.tgz" -C /; systemctl reload nginx; die "nginx не принял конфиг, вернул как было"; }
  else URL="http://127.0.0.1:$PORT/$MP_ADMIN_PATH/ (проксируйте /$MP_ADMIN_PATH/ и /s/ сами)"; fi
fi

# ================= 9. прокси Telegram =================
if [ -n "$MTPROTO" ] && [ -z "$(docker ps -q --filter name=^monolit-mtg$)" ]; then
  step "Запускаю прокси Telegram"
  [ -z "$(ss -Htln "sport = :$MTPROTO")" ] || die "Порт $MTPROTO занят"
  SEC=$(docker run --rm nineseconds/mtg:2 generate-secret --hex "$DOMAIN" 2>>"$LOG") || die "Не получилось создать ключ mtg"
  run docker run -d --name monolit-mtg --restart unless-stopped -p "$MTPROTO:3128" nineseconds/mtg:2 simple-run 0.0.0.0:3128 "$SEC" || die "mtg не запустился"
  MTG_SEC=$SEC
  sed -i "s|^MP_MTG_PORT=.*|MP_MTG_PORT=$MTPROTO|; s|^MP_MTG_SECRET=.*|MP_MTG_SECRET=$SEC|" "$ENVF"
  ok "mtg на порту $MTPROTO (FakeTLS под $DOMAIN)"
fi

# ================= 10. проверка =================
step "Проверяю, что всё работает"
sleep 2
[ -n "$(docker ps -q --filter name=^monolit$)" ] || die "Контейнер не запустился: docker logs monolit"
code=$(curl -sk -o /dev/null -m 8 -w '%{http_code}' --resolve "$DOMAIN:443:${LISTEN_IP:-127.0.0.1}" "https://$DOMAIN/$MP_ADMIN_PATH/" || true)
[ "$MODE" = existing ] && [ "$NGINX" = 0 ] && code=$(curl -s -o /dev/null -m 5 -w '%{http_code}' "http://127.0.0.1:$PORT/$MP_ADMIN_PATH/" || true)
[ "$code" = 200 ] && ok "Админка отвечает" || warn "Админка ответила $code (проверьте: bash install.sh --status)"
xray_up && ok "Xray работает" || warn "Xray не активен: journalctl -u xray"

echo; echo "${G}${B}Готово${N}"
echo "Админка:  $URL"
if [ -n "$NEWPASS" ]; then echo "Логин:    admin"; echo "Пароль:   $NEWPASS  (сменить можно в настройках)"; else echo "Логин и пароль прежние"; fi
[ -n "$SOCKS_FULL" ] && { IFS=: read -r sp su spw <<<"$SOCKS_FULL"; echo "SOCKS5:   $DOMAIN:$sp  логин $su  пароль $spw"; }
[ -n "$MTG_SEC" ] && echo "Telegram: tg://proxy?server=$DOMAIN&port=$MTPROTO&secret=$MTG_SEC"
if [ "$TTY" = 1 ] && [ "$MODE" != existing ]; then
  C="bash install.sh --domain $DOMAIN --mode $MODE${IP2:+ --ip $IP2}"
  [ -n "${MP_CERT:-}" ] || { [ -n "$CERT" ] && [[ "$CERT" != /etc/letsencrypt/* ]] && [[ "$CERT" != /etc/monolit/* ]] && C="$C --cert $CERT --key $KEY"; }
  [ "$XHTTP" = 0 ] && C="$C --no-xhttp"; [ "$BBR" = 0 ] && C="$C --no-bbr"
  [ -n "$SOCKS" ] && C="$C --socks $SOCKS"; [ "$WARP" = 1 ] && C="$C --warp"; [ -n "$MTPROTO" ] && C="$C --mtproto $MTPROTO"
  echo; echo "${D}То же без вопросов на другом сервере: $C --yes${N}"
fi
