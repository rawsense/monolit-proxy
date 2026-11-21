#!/bin/bash
# Сохранены ли адреса сервера в настройках сети: переживут ли они перезагрузку.
#   netsave.sh check IP…   — JSON одной строкой: чем настроена сеть, каких IP нет в настройках, какие там лишние
#   netsave.sh fix IP…     — дописать недостающие, убрать лишние; копия файла до правки, откат, если проверка не прошла
# IP… — адреса, которыми пользуется monolit (входящий, исходящий). «Лишние» — дополнительные адреса из настроек,
# которых уже нет на сервере (например, хостер выдал новый IP, а старый остался в /etc/network/interfaces):
# после перезагрузки сервер повесил бы на себя чужой адрес. Основной адрес (address в ifupdown) не трогаем никогда.
# Применять ничего не нужно: адреса уже висят, правится только то, что поднимется при загрузке.
set -u
export PATH=${MP_NETSAVE_PATH:-}/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin LC_ALL=C
R=${MP_NETSAVE_ROOT:-}   # для тестов: корень с etc/ вместо /
BK=${MP_NETSAVE_BK:-/root/backups} STAMP=$(date +%Y%m%d-%H%M%S)
IPRE='^([0-9]{1,3}\.){3}[0-9]{1,3}$'

op=${1:-}; shift || true
WANT=(); for a in "$@"; do [[ "$a" =~ $IPRE ]] && WANT+=("$a"); done
[[ "$op" =~ ^(check|fix)$ ]] || { echo "netsave.sh check|fix IP…"; exit 2; }

js() { printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g' | tr -d '\000-\037'; }
jarr() { local o='' x; for x in "$@"; do o+="\"$x\","; done; printf '[%s]' "${o%,}"; }
has() { local x n=$1; shift; for x in "$@"; do [ "$x" = "$n" ] && return 0; done; return 1; }
re() { printf '%s' "$1" | sed 's/\./\\./g'; }                          # IP для регулярки
tok() { printf '(^|[^0-9.])%s(/[0-9]{1,2})?([^0-9.]|$)' "$(re "$1")"; }  # IP отдельным словом, с префиксом или без

# Интерфейс — тот, на котором висит первый из нужных адресов (иначе — путь по умолчанию)
DEV=''
for a in "${WANT[@]}"; do DEV=$(ip -4 -o addr show 2>/dev/null | awk -v a="$a" '{split($4,p,"/"); if (p[1]==a) {print $2; exit}}'); [ -n "$DEV" ] && break; done
[ -n "$DEV" ] || DEV=$(ip -4 route show default 2>/dev/null | awk '{for(i=1;i<NF;i++) if ($i=="dev") {print $(i+1); exit}}')
DEV=${DEV%%@*}
[[ "$DEV" =~ ^[A-Za-z0-9_.:-]+$ ]] || { printf '{"tool":"none","dev":"","missing":%s,"stale":[],"manual":"Не нашёл сетевой интерфейс"}\n' "$(jarr "${WANT[@]}")"; [ "$op" = check ] && exit 0 || exit 1; }

# Что висит на интерфейсе сейчас; адреса от DHCP (dynamic) настроек не требуют
LIVE=() DYN=(); declare -A PFX=()
while read -r _ _ _ cidr rest; do
  a=${cidr%/*}; LIVE+=("$a"); PFX[$a]=${cidr#*/}
  [[ " $rest " == *" dynamic "* ]] && DYN+=("$a")
done < <(ip -4 -o addr show dev "$DEV" scope global 2>/dev/null)
# нужные адреса, которых на интерфейсе нет, не трогаем: сохранять нечего
NEED=(); for a in "${WANT[@]}"; do has "$a" "${LIVE[@]}" && ! has "$a" "${DYN[@]}" && ! has "$a" "${NEED[@]}" && NEED+=("$a"); done

# ---------- чем настроена сеть ----------
TOOL=none FILES=()
nm_dev() { command -v nmcli >/dev/null && systemctl is-active -q NetworkManager 2>/dev/null || return 1
  local st; st=$(nmcli -g GENERAL.STATE device show "$DEV" 2>/dev/null); [ -n "$st" ] && [[ "$st" != *unmanaged* ]] && [ -n "$(nmcli -g GENERAL.CON-UUID device show "$DEV" 2>/dev/null)" ]; }
if nm_dev; then TOOL=nm
else
  for f in "$R"/etc/netplan/*.yaml "$R"/etc/netplan/*.yml; do [ -f "$f" ] && grep -qE "^\s*\"?$(re "$DEV")\"?\s*:" "$f" && FILES+=("$f"); done
  if [ ${#FILES[@]} -gt 0 ] && command -v netplan >/dev/null; then TOOL=netplan
  else
    FILES=()
    for f in "$R"/etc/network/interfaces "$R"/etc/network/interfaces.d/*; do [ -f "$f" ] && grep -qE "^\s*iface\s+$(re "$DEV")(:[0-9A-Za-z]+)?\s+inet\s" "$f" && FILES+=("$f"); done
    [ ${#FILES[@]} -gt 0 ] && TOOL=ifupdown
  fi
fi

# ---------- какие адреса записаны ----------
# SAVED — все IPv4 интерфейса в настройках; EXTRA — те из них, что можно убирать (не основной адрес)
SAVED=() EXTRA=() NM_UUID='' NM_FILE=''
ips_in() { grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' | sort -u; }
case $TOOL in
  nm)
    NM_UUID=$(nmcli -g GENERAL.CON-UUID device show "$DEV" 2>/dev/null)
    NM_FILE=$(nmcli -g connection.filename connection show "$NM_UUID" 2>/dev/null || true)
    [ -n "$NM_FILE" ] || NM_FILE=$(grep -lE "^uuid=$NM_UUID" "$R"/etc/NetworkManager/system-connections/* 2>/dev/null | head -1)
    mapfile -t SAVED < <(nmcli -g ipv4.addresses connection show "$NM_UUID" 2>/dev/null | ips_in)
    method=$(nmcli -g ipv4.method connection show "$NM_UUID" 2>/dev/null)
    # последний ручной адрес при method=manual убирать нельзя: интерфейс останется без адреса
    if [ "$method" = manual ] && [ ${#SAVED[@]} -le 1 ]; then EXTRA=(); else EXTRA=("${SAVED[@]}"); fi ;;
  netplan)
    mapfile -t SAVED < <(cat "${FILES[@]}" | sed 's/#.*//' | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}/[0-9]{1,2}' | ips_in)
    EXTRA=("${SAVED[@]}") ;;
  ifupdown)
    # блоки «iface DEV inet …»: address — основной (не трогаем), ip addr add — дополнительные
    blk() { awk -v d="$DEV" '/^[ \t]*#/ {next} /^[^ \t#]/ {on=($1=="iface" && ($2==d || index($2, d":")==1) && $3=="inet")} on' "${FILES[@]}"; }
    mapfile -t SAVED < <(blk | grep -E '^\s*address\s|ip\s+(addr|address|a)\s+add\s' | ips_in)
    mapfile -t EXTRA < <(blk | grep -E 'ip\s+(addr|address|a)\s+add\s' | ips_in) ;;
esac
MISSING=(); for a in "${NEED[@]}"; do has "$a" "${SAVED[@]}" || MISSING+=("$a"); done
STALE=();   for a in "${EXTRA[@]}"; do has "$a" "${LIVE[@]}" || STALE+=("$a"); done

report() {   # $1 — ручное указание, если сам не справился
  local f="${FILES[0]:-$NM_FILE}"
  printf '{"tool":"%s","dev":"%s","file":"%s","missing":%s,"stale":%s,"manual":"%s"}\n' "$TOOL" "$DEV" "$(js "$f")" "$(jarr "${MISSING[@]}")" "$(jarr "${STALE[@]}")" "$(js "${1:-}")"
}
if [ "$op" = check ]; then
  m=''; [ "$TOOL" = none ] && [ ${#MISSING[@]} -gt 0 ] && m="Не нашёл, где хранятся настройки сети. Пропишите ${MISSING[*]} на $DEV вручную или в панели хостера"
  report "$m"; exit 0
fi

# ---------- fix ----------
[ ${#MISSING[@]} -eq 0 ] && [ ${#STALE[@]} -eq 0 ] && { report; exit 0; }
[ "$TOOL" = none ] && { report "Не нашёл, где хранятся настройки сети. Пропишите ${MISSING[*]} на $DEV вручную или в панели хостера"; exit 1; }
install -d -m 700 "$BK"
COPIES=()
backup() { local f=$1 c="$BK/net-$STAMP-$(echo "$1" | tr / _ | sed 's/^_//')"; cp -p "$f" "$c" && COPIES+=("$f|$c"); }
restore() { local p; for p in "${COPIES[@]}"; do cp -p "${p#*|}" "${p%%|*}"; done; }
fail() { restore; [ "$TOOL" = nm ] && [ -n "$NM_FILE" ] && nmcli connection load "$NM_FILE" >/dev/null 2>&1; echo "$1"; report "$1"; exit 1; }
DONE=()

case $TOOL in
  nm)
    [ -n "$NM_FILE" ] && [ -f "$NM_FILE" ] && backup "$NM_FILE"
    for a in "${MISSING[@]}"; do nmcli connection modify "$NM_UUID" +ipv4.addresses "$a/${PFX[$a]}" || fail "NetworkManager не принял $a"; DONE+=("добавил $a"); done
    for a in "${STALE[@]}"; do
      cur=$(nmcli -g ipv4.addresses connection show "$NM_UUID" | tr ',' '\n' | sed 's/^ *//; s/\\//g' | grep -E "^$(re "$a")/" | head -1)
      [ -n "$cur" ] && { nmcli connection modify "$NM_UUID" -ipv4.addresses "$cur" || fail "NetworkManager не дал убрать $a"; DONE+=("убрал $a"); }
    done ;;

  netplan)
    for f in "${FILES[@]}"; do backup "$f"; done
    left=("${MISSING[@]}")
    for s in "${STALE[@]}"; do
      f=$(grep -lE "$(tok "$s")" "${FILES[@]}" | head -1); [ -n "$f" ] || continue
      if [ ${#left[@]} -gt 0 ]; then   # на место старого — новый: та же строка, тот же отступ
        n=${left[0]}; left=("${left[@]:1}")
        sed -i -E "s#(^|[^0-9.])$(re "$s")/[0-9]{1,2}([^0-9.]|\$)#\1$n/${PFX[$n]}\2#g" "$f"; DONE+=("заменил $s на $n")
      elif grep -qE "^\s*-\s*[\"']?$(re "$s")/[0-9]{1,2}[\"']?\s*(#.*)?$" "$f"; then
        sed -i -E "/^\s*-\s*[\"']?$(re "$s")\/[0-9]{1,2}[\"']?\s*(#.*)?$/d" "$f"; DONE+=("убрал $s")
      else fail "Не смог убрать $s из $f: поправьте список addresses вручную"; fi
    done
    for n in "${left[@]}"; do   # дописать: рядом с уже записанным адресом в файле интерфейса
      f=${FILES[0]}; [ ${#FILES[@]} -eq 1 ] || fail "Интерфейс $DEV описан в нескольких файлах netplan: добавьте $n/${PFX[$n]} в addresses вручную"
      [ "$(grep -cE '^\s*addresses\s*:' "$f")" = 1 ] || fail "В $f не один список addresses: добавьте $n/${PFX[$n]} вручную"
      item=$(grep -nE "^\s*-\s*[\"']?([0-9]{1,3}\.){3}[0-9]{1,3}/[0-9]{1,2}[\"']?\s*(#.*)?$" "$f" | head -1)
      if [ -n "$item" ]; then
        ln=${item%%:*}; ind=$(printf '%s' "${item#*:}" | sed -E 's/^(\s*-\s*).*/\1/')
        sed -i "${ln}a\\${ind}$n/${PFX[$n]}" "$f"
      elif grep -qE '^\s*addresses\s*:\s*\[.*\]' "$f"; then
        sed -i -E "s#^(\s*addresses\s*:\s*\[.*[^ ])\s*\]#\1, $n/${PFX[$n]}]#" "$f"
      else fail "Не нашёл в $f, куда добавить $n/${PFX[$n]}: допишите в addresses вручную"; fi
      DONE+=("добавил $n")
    done
    out=$(netplan generate 2>&1) || fail "netplan не принял правку, вернул как было: $(echo "$out" | tail -1)"
    for n in "${MISSING[@]}"; do grep -qE "$(tok "$n")" "${FILES[@]}" || fail "После правки $n не нашёлся в настройках, вернул как было"; done ;;

  ifupdown)
    for f in "${FILES[@]}"; do backup "$f"; done
    left=("${MISSING[@]}")
    for s in "${STALE[@]}"; do
      for f in "${FILES[@]}"; do
        grep -qE "ip\s+(addr|address|a)\s+(add|del).*$(tok "$s")" "$f" || continue
        if [ ${#left[@]} -gt 0 ]; then
          n=${left[0]}; left=("${left[@]:1}")
          # в строках «ip addr add|del» старый адрес меняем на новый, префикс — как у нового на интерфейсе
          sed -i -E "/ip[[:space:]]+(addr|address|a)[[:space:]]+(add|del)/ s#(^|[^0-9.])$(re "$s")(/[0-9]{1,2})?([^0-9.]|\$)#\1$n/${PFX[$n]}\3#g" "$f"
          DONE+=("заменил $s на $n")
        else
          sed -i -E "/ip[[:space:]]+(addr|address|a)[[:space:]]+(add|del).*(^|[^0-9.])$(re "$s")(\/[0-9]{1,2})?([^0-9.]|\$)/d" "$f"
          DONE+=("убрал $s")
        fi
        break
      done
    done
    for n in "${left[@]}"; do   # дописать в конец блока «iface DEV inet …»
      f=${FILES[0]}
      end=$(awk -v d="$DEV" '/^[^ \t#]/ {if (on) exit; on=($1=="iface" && $2==d && $3=="inet")} on && NF && !/^[ \t]*#/ {last=NR} END {print last+0}' "$f")
      [ "$end" -gt 0 ] || fail "Не нашёл блок iface $DEV inet в $f: допишите $n вручную"
      sed -i "${end}a\\    # адрес, которым пользуется monolit ($(date +%d.%m.%Y))\\
    up   ip addr add $n/${PFX[$n]} dev $DEV || true\\
    down ip addr del $n/${PFX[$n]} dev $DEV || true" "$f"
      DONE+=("добавил $n")
    done
    if command -v ifquery >/dev/null; then
      out=$(ifquery "$DEV" 2>&1) || fail "ifupdown не принял правку, вернул как было: $(echo "$out" | tail -1)"
      for n in "${MISSING[@]}"; do grep -qE "$(tok "$n")" <<<"$out" || fail "После правки $n не нашёлся в настройках $DEV, вернул как было"; done
    fi ;;
esac

# пересчитать: что осталось после правки
"$0" check "${WANT[@]}" >/tmp/monolit-netsave.json 2>/dev/null
echo "${DONE[*]:-ничего не менял}; копии: $BK/net-$STAMP-*"
cat /tmp/monolit-netsave.json; rm -f /tmp/monolit-netsave.json
exit 0
