# monolit proxy

Панель управления VPN-сервером на Xray. Ставится на VPS одной командой. Пользователи с лимитом трафика и сроком, у каждого своя ссылка на подписку.

## Подписка

По ссылке открывается страница с кнопками: установить INCY или Happ и добавить подписку в приложение. Изменения на сервере приложение подтягивает при обновлении подписки, ссылка остаётся той же.

## Возможности

- VLESS Vision, XHTTP, Hysteria2, AmneziaWG (ссылкой `vpn://` для AmneziaVPN)
- ноды: второй сервер подключается командой из админки и работает отдельно или мостом. Мост в России может открывать российские сайты со своего адреса
- наборы подключений: кому какие серверы видны в приложении
- маршруты: напрямую, через Cloudflare WARP или блок
- MTProto-прокси для Telegram и SOCKS5, по желанию
- трафик по дням, QR-коды
- бэкап и восстановление одним файлом
- работает рядом с сайтами, уже настроенными в nginx
- смена домена без потери старых ссылок
- обновление из админки

Шаблон клиентских конфигов берётся из [autoXRAY](https://github.com/xVRVx/autoXRAY). Новые версии шаблона monolit подтягивает сам и перед применением проверяет через `xray run -test`.

## Установка

Нужны Debian или Ubuntu, root и домен, направленный на сервер.

```bash
git clone https://github.com/rawsense/monolit-proxy.git
cd monolit-proxy
bash install.sh
```

Установщик спросит домен, покажет, что будет сделано, и после подтверждения поставит Xray, выпустит сертификат и настроит nginx. В конце выведет адрес админки, логин и пароль.

Без вопросов: `bash install.sh --domain vpn.example.ru`. Остальные ключи описаны в начале `install.sh`.

Если уже стоит autoXRAY, monolit подхватит его входы. Заменить настройку autoXRAY своей: `bash install.sh --reconfigure --replace-autoxray` (старые ключи autoXRAY перестанут работать).

Обновление: кнопка в «Обслуживании» или повторный запуск `install.sh`. Пользователи и пароль сохраняются.

Удаление: `bash install.sh --uninstall`. Nginx и Xray возвращаются к состоянию до установки, база остаётся в `/var/lib/monolit`.

Перед правкой конфигов Xray и nginx установщик кладёт копии в `/root/backups` и откатывается, если проверка не прошла или сайты на сервере перестали открываться.

## Разработка

- `server/` — сервер на Node 24 без зависимостей, база `node:sqlite`
- `ui/src/` — страницы админки и подписки, сборка в `ui/dist` командой `node ui/build.mjs`. `admin.html` и `sub.html` открываются и без сервера, на демо-данных
- `awg/` — сервер AmneziaWG в отдельном контейнере, собирается на сервере из исходников amneziawg-go
- тесты: `node --test --test-timeout=30000 --test-force-exit test/awg.test.mjs`

## Клиент

[Monolit](https://github.com/rawsense/monolit-client) — клиент для Windows, который пускает через VPN только заблокированное. Подписку monolit proxy принимает как есть.

## Лицензия

[GPL-3.0](LICENSE).

`server/autoXRAY2.sh` — копия скрипта [autoXRAY](https://github.com/xVRVx/autoXRAY) (автор xVRVx, GPL-3.0). Сам скрипт не запускается, monolit берёт из него только шаблон клиентских конфигов и сверяет его с новой версией в репозитории autoXRAY.

Флаги стран (`ui/src/flags.woff2`) — шрифт Twemoji Country Flags из [country-flag-emoji-polyfill](https://github.com/talkjs/country-flag-emoji-polyfill) (MIT), рисунки [Twemoji](https://github.com/twitter/twemoji) (CC-BY 4.0).
