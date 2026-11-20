# monolit proxy

Админка подписок Xray (Vision, Hysteria2, XHTTP) и AmneziaWG поверх уже установленного Xray: у каждого человека одна ссылка с лимитом трафика и сроком, страница подписки с кнопками Happ и INCY. Вторые серверы (ноды) добавляются одной командой и работают мостом или отдельным сервером, мост в России может выпускать российские сайты сам, со своего адреса; что увидит человек в приложении, собирается наборами подключений. Шаблон клиентских конфигов берётся из autoXRAY и обновляется сам, с проверкой `xray run -test` и откатом.

## Установка

На сервере (Debian или Ubuntu, root):

```bash
git clone https://github.com/rawsense/monolit-proxy.git
cd monolit-proxy
bash install.sh --domain vpn.example.ru
```

Мастер спросит, чего не хватает. Если Xray уже настроен через autoXRAY, его можно заменить: `bash install.sh --reconfigure --replace-autoxray` (прежние ключи autoXRAY перестанут работать, копии конфигов останутся в `/root/backups`). Удалить: `bash install.sh --uninstall`.

Без nginx — `--no-nginx`, тогда проксируйте `/<путь админки>/` и `/s/` на `127.0.0.1:7380` сами.

Повторный запуск обновляет код, пользователи, путь и пароль сохраняются (`/etc/monolit.env`, база `/var/lib/monolit`). Перед правкой конфигов Xray и nginx копии кладутся в `/root/backups`.

## Разработка

- `server/` — Node 24 без зависимостей (`node:sqlite`)
- `ui/src/` — страницы на дизайн-системе `ui/ds`; `node ui/build.mjs` собирает `ui/dist`
- `ui/src/admin.html` и `sub.html` открываются и без сервера: работают на демо-данных
- `awg/` — сервер AmneziaWG 3.1 в отдельном контейнере: включается в окне «Протоколы», собирается на сервере из исходников amneziawg-go
- тесты: `node --test --test-timeout=30000 --test-force-exit test/awg.test.mjs`

## Лицензия

GPL-3.0, текст в `LICENSE`.

`server/autoXRAY2.sh` — копия скрипта [autoXRAY](https://github.com/xVRVx/autoXRAY) (автор xVRVx, GPL-3.0). Сам скрипт не запускается: monolit берёт из него шаблон клиентских конфигов и сверяется с новой версией из репозитория autoXRAY.

`ui/src/flags.woff2` — шрифт Twemoji Country Flags из [country-flag-emoji-polyfill](https://github.com/talkjs/country-flag-emoji-polyfill) (MIT); рисунки флагов — [Twemoji](https://github.com/twitter/twemoji), CC-BY 4.0.
