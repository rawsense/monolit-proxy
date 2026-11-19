// Разовая настройка при установке: включить API и статистику Xray. Печатает changed, если нужен перезапуск Xray
import { Xray } from './xray.mjs';
const x = new Xray({ bin: process.env.MP_XRAY_BIN || '/usr/local/bin/xray', config: process.env.MP_XRAY_CONFIG || '/usr/local/etc/xray/config.json', api: '127.0.0.1:10085' });
const d = x.detect();
if (!d.vision && !d.hy2) { console.error('В конфиге Xray нет входа VLESS Vision или Hysteria2'); process.exit(2); }
console.log(x.ensureApi('127.0.0.1:10085') ? 'changed' : 'ok');
