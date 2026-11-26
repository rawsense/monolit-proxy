#!/usr/bin/env python3
# Страница ноды monolit proxy. Всё, что приходит на домен ноды не по VPN, она пересылает на основной сервер:
# так админка и страницы подписок открываются по адресу ноды, когда адрес основного сервера заблокирован.
# Основной сервер не ответил — посторонний видит обычную с виду страницу входа из файла.
#   node-mirror.py https://основной.домен /путь/к/index.html [порт]
import http.client
import ssl
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit

UP = urlsplit(sys.argv[1])
PAGE = sys.argv[2]
PORT = int(sys.argv[3]) if len(sys.argv) > 3 else 8081
MAX_BODY = 64 * 1024 * 1024   # файл бэкапа при восстановлении
HOP = {'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization', 'te', 'trailers', 'transfer-encoding', 'upgrade', 'content-length', 'host'}
CTX = ssl.create_default_context()


class Handler(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'
    server_version = 'nginx'
    sys_version = ''

    def log_message(self, *a):
        pass

    def page(self):
        try:
            with open(PAGE, 'rb') as f:
                body = f.read()
        except OSError:
            body = b''
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        if self.command != 'HEAD':
            self.wfile.write(body)

    def relay(self):
        try:
            n = int(self.headers.get('Content-Length') or 0)
        except ValueError:
            n = 0
        if n > MAX_BODY:
            self.send_error(413)
            return
        body = self.rfile.read(n) if n else None
        headers = {k: v for k, v in self.headers.items() if k.lower() not in HOP}
        headers['Host'] = UP.hostname
        try:
            c = http.client.HTTPSConnection(UP.hostname, UP.port or 443, timeout=25, context=CTX)
            c.request(self.command, self.path, body=body, headers=headers)
            r = c.getresponse()
            data = r.read()
        except Exception:
            self.page()
            return
        self.send_response(r.status)
        for k, v in r.getheaders():
            if k.lower() not in HOP and k.lower() not in ('date', 'server'):
                self.send_header(k, v)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        if self.command != 'HEAD':
            self.wfile.write(data)
        c.close()

    do_GET = do_HEAD = do_POST = do_PATCH = do_PUT = do_DELETE = relay


if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
