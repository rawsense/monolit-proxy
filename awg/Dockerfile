# monolit proxy: сервер AmneziaWG рядом с Xray. Собирается на сервере из исходников amneziawg-go по тегу.
# Ключи и пользователей админка задаёт сама через сокет настройки устройства, файла конфига в контейнере нет.
ARG AWG_TAG=v3.1.20261116

FROM golang:1.25-alpine AS build
ARG AWG_TAG
RUN apk add --no-cache git && git clone --depth 1 --branch "$AWG_TAG" https://github.com/amnezia-vpn/amneziawg-go /src
WORKDIR /src
RUN CGO_ENABLED=0 go build -trimpath -ldflags "-s -w" -o /amneziawg-go .

FROM alpine:3.20
RUN apk add --no-cache iproute2 iptables
COPY --from=build /amneziawg-go /usr/bin/amneziawg-go
COPY start.sh /start.sh
ENTRYPOINT ["/bin/sh", "/start.sh"]
