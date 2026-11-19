#!/bin/bash
# Смена домена, IP или способа из админки. Запускает помощник отдельной службой (systemd-run):
# install.sh перезапускает и админку, и помощника, поэтому сама смена живёт вне них.
#   reconf.sh СПОСОБ ДОМЕН IP2|- KEEP(0|1) SKIPDNS(0|1) DROP(домен|-)
# Ход пишется в /var/lib/monolit/reconf.json (админка читает его как /data/reconf.json) и в /var/log/monolit-reconf.log.
# Копии конфигов и откат при сбое делает install.sh: если не вышло, nginx и Xray остаются как были
set -u
if [ -z "${MP_RC_COPY:-}" ]; then cp "$0" /tmp/monolit-reconf.sh; MP_RC_COPY=1 exec bash /tmp/monolit-reconf.sh "$@"; fi

MODE=${1:-} DOMAIN=${2:-} IP2=${3:--} KEEP=${4:-0} SKIP=${5:-0} DROP=${6:--}
. /etc/monolit.env
SRC=${MP_SRC:-/opt/monolit-proxy} ST=/var/lib/monolit/reconf.json LOG=/var/log/monolit-reconf.log
FROM="${MP_MODE:-}|${MP_DOMAIN:-}|${MP_IP2:-}"
js() { printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g' | tr -d '\000-\037'; }
state() { printf '{"state":"%s","at":%s,"text":"%s","from":"%s","to":"%s"}\n' "$1" "$(date +%s)" "$(js "$2")" "$FROM" "$MODE|$DOMAIN|${IP2#-}" > "$ST.tmp" && mv "$ST.tmp" "$ST"; }
exec >>"$LOG" 2>&1
echo "=== $(date -Is) смена: $FROM → $MODE|$DOMAIN|$IP2 запасной=$KEEP без-DNS=$SKIP убрать=$DROP"

[ -f "$SRC/install.sh" ] || { state failed "Нет папки monolit: $SRC"; exit 1; }
state running "Меняю настройки сервера"
A=(--yes --no-bbr --domain "$DOMAIN" --mode "$MODE")
[ "$IP2" != - ] && A+=(--ip "$IP2")
[ "$KEEP" = 1 ] && A+=(--keep-old-domain)
[ "$SKIP" = 1 ] && A+=(--skip-dns)
[ "$DROP" != - ] && A+=(--drop-alt "$DROP")
# прежний выбор при установке: без XHTTP и без правил файрвола
[ "${MP_XHTTP:-1}" = 0 ] && A+=(--no-xhttp)
[ "${MP_FIREWALL:-1}" = 0 ] && A+=(--no-firewall)
ERR=$(mktemp)
if (cd "$SRC" && bash install.sh "${A[@]}" 2>"$ERR"); then
  cat "$ERR"; state done "Готово"; echo "готово"; rm -f "$ERR"; exit 0
fi
cat "$ERR"
# install.sh пишет причину последней строкой (без цветов); «Подробности: …» — ссылка на журнал установки
msg=$(sed 's/\x1b\[[0-9;]*m//g' "$ERR" | grep -v '^Подробности:' | grep . | tail -1)
rm -f "$ERR"
state failed "${msg:-Не получилось, подробности в $LOG}"
exit 1
