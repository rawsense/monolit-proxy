# monolit proxy: Node без зависимостей. Xray, его конфиг и база монтируются с хоста (см. install.sh)
FROM node:24-alpine
WORKDIR /app
COPY server /app/server
COPY ui/dist /app/ui
COPY VERSION /app/VERSION
ENV MP_UI=/app/ui MP_DATA=/data
CMD ["node", "/app/server/main.mjs"]
