// Сборка интерфейса: src/*.html → dist/ (стили и скрипты страницы склеены в один файл, тема — внутри страницы, шрифты рядом).
// На сервере всё лежит под «_/»: админка отдаёт её из <путь>/_/, подписка — из /s/_/
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url)), out = join(here, 'dist');
rmSync(out, { recursive: true, force: true }); mkdirSync(out, { recursive: true });

function build(src, dst, pages) {
  mkdirSync(dst, { recursive: true });
  const read = (p) => readFileSync(resolve(src, p), 'utf8');
  for (const page of pages) {
    let html = read(page + '.html');
    const block = (tag) => { const m = new RegExp(`<!--${tag}-->([^]*?)<!--/${tag}-->`).exec(html); return m; };
    const css = block('css'), js = block('js');
    const cssText = [...css[1].matchAll(/href="([^"]+)"/g)].map((m) => `/* ${m[1]} */\n` + read(m[1])).join('\n');
    const jsText = [...js[1].matchAll(/src="([^"]+)"/g)].map((m) => `// ${m[1]}\n` + read(m[1]).replace(/^﻿/, '')).join('\n;\n');
    writeFileSync(join(dst, page + '.css'), cssText);
    writeFileSync(join(dst, page + '.js'), jsText);
    // метка версии: после выкладки браузер не возьмёт старый файл из кэша
    const v = (t) => createHash('sha1').update(t).digest('hex').slice(0, 10);
    html = html.replace(css[0], `<link rel="stylesheet" href="_/${page}.css?v=${v(cssText)}">`).replace(js[0], `<script src="_/${page}.js?v=${v(jsText)}" defer></script>`)
      .replace('<script src="../ds/js/theme.js"></script>', `<script>${read('../ds/js/theme.js')}</script>`)
      .replace(/href="([\w-]+\.svg)"/, 'href="_/$1"');
    if (page === 'gate') html = html.replaceAll('href="_/', 'href="/_/').replaceAll('src="_/', 'src="/_/');   // заглушку отдаём с любого пути
    if (/\.\.\/ds\//.test(html)) throw new Error(page + ': осталась ссылка на ../ds');
    writeFileSync(join(dst, page + '.html'), html);
  }
  for (const f of readdirSync(src)) if (/\.(woff2|svg)$/.test(f)) copyFileSync(join(src, f), join(dst, f));
}

build(join(here, 'src'), out, ['admin', 'sub', 'gate']);
console.log('dist:', readdirSync(out).join(' '));
