#!/bin/bash
# Обновление monolit из релиза GitHub. Запускает помощник отдельной службой (systemd-run):
# install.sh перезапускает и админку, и помощника, поэтому само обновление живёт вне них.
# Ход пишется в /var/lib/monolit/update.json (админка читает его как /data/update.json) и в /var/log/monolit-update.log
set -u
# install.sh перепишет этот файл посреди работы — исполняем копию
if [ -z "${MP_UPD_COPY:-}" ]; then cp "$0" /tmp/monolit-update.sh; MP_UPD_COPY=1 exec bash /tmp/monolit-update.sh "$@"; fi

TAG=${1:-}
[[ "$TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || { echo "Нужна версия вида v1.2.3"; exit 2; }
. /etc/monolit.env
SRC=${MP_SRC:-/opt/monolit-proxy} REPO=${MP_REPO:-rawsense/monolit-proxy} FROM=${MP_VERSION:-}
[ "$REPO" = danilax9/monolit-proxy ] && REPO=rawsense/monolit-proxy   # репозиторий переехал
ST=/var/lib/monolit/update.json LOG=/var/log/monolit-update.log
state() { printf '{"state":"%s","to":"%s","from":"%s","at":%s,"text":"%s"}\n' "$1" "$TAG" "$FROM" "$(date +%s)" "$2" > "$ST.tmp" && mv "$ST.tmp" "$ST"; }
exec >>"$LOG" 2>&1
echo "=== $(date -Is) обновление $FROM → $TAG из $REPO, папка $SRC"

[ -f "$SRC/install.sh" ] || { state failed "Нет папки monolit: $SRC"; exit 1; }
state running "Скачиваю $TAG"
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
curl -fsSL --max-time 180 "https://github.com/$REPO/archive/refs/tags/$TAG.tar.gz" -o "$TMP/r.tgz" || { state failed "Не скачался $TAG с GitHub"; exit 1; }
mkdir "$TMP/new" && tar xzf "$TMP/r.tgz" -C "$TMP/new" --strip-components=1 || { state failed "Архив $TAG не распаковался"; exit 1; }
[ -f "$TMP/new/install.sh" ] && [ -f "$TMP/new/VERSION" ] || { state failed "В архиве $TAG нет install.sh"; exit 1; }

# Прежняя версия остаётся рядом ($SRC.prev): при сбое возвращаемся на неё
state running "Ставлю $TAG"
rm -rf "$SRC.prev"; mv "$SRC" "$SRC.prev" && mv "$TMP/new" "$SRC" || { state failed "Не получилось заменить папку $SRC"; exit 1; }
if (cd "$SRC" && bash install.sh --yes); then
  state done "Обновлено до $TAG"; echo "готово"; exit 0
fi

echo "!!! $TAG не встал, возвращаю $FROM"
state running "$TAG не встал, возвращаю прежнюю версию"
rm -rf "$SRC.failed"; mv "$SRC" "$SRC.failed"; mv "$SRC.prev" "$SRC"
if (cd "$SRC" && bash install.sh --yes); then state failed "$TAG не встал, вернул $FROM. Подробности: $LOG"
else state failed "$TAG не встал, и прежняя версия тоже. Запустите вручную: cd $SRC && bash install.sh. Журнал: $LOG"; fi
exit 1
