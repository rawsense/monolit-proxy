// icons.js
// Иконки Lucide 0.460.0 (ISC), только нужные: замена <i data-lucide> на svg, как lucide.createIcons()
(() => {
  const P = {"house":"<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"/><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/>","door-open":"<path d=\"M13 4h3a2 2 0 0 1 2 2v14\"/><path d=\"M2 20h3\"/><path d=\"M13 20h9\"/><path d=\"M10 12v.01\"/><path d=\"M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z\"/>","arrow-right":"<path d=\"M5 12h14\"/><path d=\"m12 5 7 7-7 7\"/>","grip-vertical":"<circle cx=\"9\" cy=\"12\" r=\"1\"/><circle cx=\"9\" cy=\"5\" r=\"1\"/><circle cx=\"9\" cy=\"19\" r=\"1\"/><circle cx=\"15\" cy=\"12\" r=\"1\"/><circle cx=\"15\" cy=\"5\" r=\"1\"/><circle cx=\"15\" cy=\"19\" r=\"1\"/>","waypoints":"<circle cx=\"12\" cy=\"4.5\" r=\"2.5\"/><path d=\"m10.2 6.3-3.9 3.9\"/><circle cx=\"4.5\" cy=\"12\" r=\"2.5\"/><path d=\"M7 12h10\"/><circle cx=\"19.5\" cy=\"12\" r=\"2.5\"/><path d=\"m13.8 17.7 3.9-3.9\"/><circle cx=\"12\" cy=\"19.5\" r=\"2.5\"/>","terminal":"<polyline points=\"4 17 10 11 4 5\"/><line x1=\"12\" x2=\"20\" y1=\"19\" y2=\"19\"/>","list-checks":"<path d=\"m3 17 2 2 4-4\"/><path d=\"m3 7 2 2 4-4\"/><path d=\"M13 6h8\"/><path d=\"M13 12h8\"/><path d=\"M13 18h8\"/>","map-pin":"<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>","wrench":"<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"/>","upload":"<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"17 8 12 3 7 8\"/><line x1=\"12\" x2=\"12\" y1=\"3\" y2=\"15\"/>","lock-open":"<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 9.9-1\"/>","apple":"<path d=\"M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z\"/><path d=\"M10 2c1 .5 2 2 2 5\"/>","check":"<path d=\"M20 6 9 17l-5-5\"/>","chevron-right":"<path d=\"m9 18 6-6-6-6\"/>","circle-alert":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\"/><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\"/>","circle-check":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m9 12 2 2 4-4\"/>","clock":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/>","copy":"<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\"/><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"/>","download":"<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\"/>","external-link":"<path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/>","file-code":"<path d=\"M10 12.5 8 15l2 2.5\"/><path d=\"m14 12.5 2 2.5-2 2.5\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z\"/>","infinity":"<path d=\"M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z\"/>","key-round":"<path d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\"/><circle cx=\"16.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/>","link":"<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/>","log-out":"<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><polyline points=\"16 17 21 12 16 7\"/><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\"/>","monitor":"<rect width=\"20\" height=\"14\" x=\"2\" y=\"3\" rx=\"2\"/><line x1=\"8\" x2=\"16\" y1=\"21\" y2=\"21\"/><line x1=\"12\" x2=\"12\" y1=\"17\" y2=\"21\"/>","moon":"<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\"/>","panel-left":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M9 3v18\"/>","plus":"<path d=\"M5 12h14\"/><path d=\"M12 5v14\"/>","qr-code":"<rect width=\"5\" height=\"5\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"5\" height=\"5\" x=\"16\" y=\"3\" rx=\"1\"/><rect width=\"5\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/><path d=\"M21 16h-3a2 2 0 0 0-2 2v3\"/><path d=\"M21 21v.01\"/><path d=\"M12 7v3a2 2 0 0 1-2 2H7\"/><path d=\"M3 12h.01\"/><path d=\"M12 3h.01\"/><path d=\"M12 16v.01\"/><path d=\"M16 12h1\"/><path d=\"M21 12v.01\"/><path d=\"M12 21v-1\"/>","refresh-cw":"<path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\"/><path d=\"M21 3v5h-5\"/><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\"/><path d=\"M8 16H3v5\"/>","rotate-ccw":"<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/>","search":"<circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/>","settings":"<path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","smartphone":"<rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\"/><path d=\"M12 18h.01\"/>","sun":"<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/>","trash-2":"<path d=\"M3 6h18\"/><path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\"/><path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\"/><line x1=\"10\" x2=\"10\" y1=\"11\" y2=\"17\"/><line x1=\"14\" x2=\"14\" y1=\"11\" y2=\"17\"/>","triangle-alert":"<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>","undo-2":"<path d=\"M9 14 4 9l5-5\"/><path d=\"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11\"/>","users":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/>","x":"<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>","arrow-down":"<path d=\"M12 5v14\"/><path d=\"m19 12-7 7-7-7\"/>","arrow-up":"<path d=\"m5 12 7-7 7 7\"/><path d=\"M12 19V5\"/>","cloud":"<path d=\"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z\"/>","eye":"<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","globe":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"/><path d=\"M2 12h20\"/>","history":"<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/><path d=\"M12 7v5l4 2\"/>","network":"<rect x=\"16\" y=\"16\" width=\"6\" height=\"6\" rx=\"1\"/><rect x=\"2\" y=\"16\" width=\"6\" height=\"6\" rx=\"1\"/><rect x=\"9\" y=\"2\" width=\"6\" height=\"6\" rx=\"1\"/><path d=\"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3\"/><path d=\"M12 12V8\"/>","pencil":"<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\"/><path d=\"m15 5 4 4\"/>","route":"<circle cx=\"6\" cy=\"19\" r=\"3\"/><path d=\"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15\"/><circle cx=\"18\" cy=\"5\" r=\"3\"/>","scroll-text":"<path d=\"M15 12h-5\"/><path d=\"M15 8h-5\"/><path d=\"M19 17V5a2 2 0 0 0-2-2H4\"/><path d=\"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3\"/>","send":"<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\"/><path d=\"m21.854 2.147-10.94 10.939\"/>","server":"<rect width=\"20\" height=\"8\" x=\"2\" y=\"2\" rx=\"2\" ry=\"2\"/><rect width=\"20\" height=\"8\" x=\"2\" y=\"14\" rx=\"2\" ry=\"2\"/><line x1=\"6\" x2=\"6.01\" y1=\"6\" y2=\"6\"/><line x1=\"6\" x2=\"6.01\" y1=\"18\" y2=\"18\"/>","shield-check":"<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"/><path d=\"m9 12 2 2 4-4\"/>","shield":"<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"/>"};
  const make = (i) => { const n = i.getAttribute('data-lucide'), p = P[n]; if (!p) return;
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (const [k, v] of Object.entries({ xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' })) s.setAttribute(k, v);
    s.setAttribute('class', ('lucide lucide-' + n + ' ' + (i.getAttribute('class') || '')).trim()); s.innerHTML = p; i.replaceWith(s) };
  window.lucide = { icons: P, createIcons: () => document.querySelectorAll('i[data-lucide]').forEach(make) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.lucide.createIcons); else window.lucide.createIcons();
})()

;
// ../ds/js/layers.js
/* Навигация и слои · поведение к tokens/layers.css.
   Подключение: <script src="js/layers.js" defer></script>. Инициализация автоматическая; для новой разметки — initLayers(root).
   Открыть любой <dialog> (шторка, подтверждение, палитра): кнопка с data-open="id".
   Меню у кнопки — aria-haspopup="menu" + aria-controls; подсказка — data-tip. Всё включается само.
   API: toast({type, title, text, action:{label, run}, duration}) → {update, close}; fieldError(input, текст | ''); resetDialog(dialog). */
(() => {
  const EASE = 'cubic-bezier(.23,1,.32,1)', DRAWER = 'cubic-bezier(.32,.72,0,1)';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const once = (el, k) => { if (el.dataset[k]) return false; el.dataset[k] = '1'; return true };
  const $ = (id) => document.getElementById(id);
  const P = {
    l: '<path d="m15 18-6-6 6-6"/>', r: '<path d="m9 18 6-6-6-6"/>', x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    check: '<path pathLength="1" d="M20 6 9 17l-5-5"/>', more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    success: '<path d="M20 6 9 17l-5-5"/>', error: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>', default: '<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33"/>'
  };
  const svg = (n, cls = '') => `<svg class="lucide ${cls}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
  const instant = (el) => { el.classList.add('no-anim'); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('no-anim'))) };

  /* Позиция плавающей панели: у кнопки (rect) или у курсора (point). Не вылезает за экран, при нехватке места — переворачивается.
     --origin: угол, ближайший к источнику, — оттуда панель и «растёт» */
  const place = (el, at, align) => {
    const pt = at.width === undefined, m = 8, gap = pt ? 2 : 8, W = innerWidth, H = innerHeight;
    const r = pt ? { left: at.x, right: at.x, top: at.y, bottom: at.y } : at;
    el.style.left = '0px'; el.style.top = '0px';
    const w = el.offsetWidth, h = el.offsetHeight;
    const below = r.bottom + gap + h <= H - m || r.top - gap - h < m;
    let y = below ? r.bottom + gap : r.top - gap - h;
    let x = align === 'end' ? r.right - w : r.left;
    if (x + w > W - m) x = pt ? r.left - w : W - m - w;
    x = Math.max(m, Math.min(x, W - m - w)); y = Math.max(m, Math.min(y, H - m - h));
    el.style.left = Math.round(x) + 'px'; el.style.top = Math.round(y) + 'px';
    el.style.setProperty('--origin', `${below ? 'top' : 'bottom'} ${x + w / 2 < (r.left + r.right) / 2 ? 'right' : 'left'}`);
    el.style.setProperty('--dir', below ? -1 : 1);
  };
  // стрелки, Home/End, Esc по пунктам меню
  const menuKeys = (m, close) => m.addEventListener('keydown', (e) => {
    const it = [...m.querySelectorAll('.menu-item:not([aria-disabled=true])')], i = it.indexOf(document.activeElement);
    const go = (k) => { e.preventDefault(); it[(k + it.length) % it.length]?.focus() };
    if (e.key === 'ArrowDown') go(i + 1); else if (e.key === 'ArrowUp') go(i < 0 ? -1 : i - 1);
    else if (e.key === 'Home') go(0); else if (e.key === 'End') go(-1);
    else if (e.key === 'Escape') { e.preventDefault(); close(true) } else if (e.key === 'Tab') close(false);
  });

  /* ===== Хлебные крошки: data-collapse — длинный путь сворачивается в «…» ===== */
  function crumbs(nav) {
    if (!once(nav, 'ly')) return;
    const lis = [...nav.querySelectorAll('li')];
    if (!nav.hasAttribute('data-collapse') || lis.length <= 4) return;
    const mid = lis.slice(1, -2); mid.forEach((li) => li.classList.add('folded'));
    const more = document.createElement('li');
    more.innerHTML = `<button type="button" class="crumb-more" aria-label="Показать путь полностью">${svg('more')}</button>`;
    lis[0].after(more);
    more.firstChild.addEventListener('click', () => {
      mid.forEach((li) => li.classList.remove('folded'));
      mid[0].querySelector('a')?.focus({ preventScroll: true });
      if (reduce.matches) { more.remove(); return }
      // середина разворачивается по ширине, «…» схлопывается — путь растёт плавно, без скачка
      mid.forEach((li) => { const w = li.offsetWidth; li.style.overflow = 'hidden';
        li.animate([{ width: '0px', opacity: 0 }, { width: w + 'px', opacity: 1 }], { duration: 240, easing: EASE }).onfinish = () => (li.style.overflow = '') });
      more.style.overflow = 'hidden';
      more.animate([{ width: more.offsetWidth + 'px', opacity: 1 }, { width: '0px', opacity: 0 }], { duration: 200, easing: EASE }).onfinish = () => more.remove();
    });
  }

  /* ===== Страницы: data-total, data-page, (data-per, data-count — подпись «1–20 из 248») ===== */
  function pager(n) {
    if (!(+n.dataset.total >= 1)) return;   // пустой nav.pager ждёт данных: без data-total не строим (раньше падала вся инициализация слоёв)
    if (!once(n, 'ly')) return;
    const total = +n.dataset.total, per = +n.dataset.per || 0, count = +n.dataset.count || 0, slots = Math.min(7, total);
    let page = Math.min(total, Math.max(1, +n.dataset.page || 1));
    n.setAttribute('role', 'navigation'); if (!n.getAttribute('aria-label')) n.setAttribute('aria-label', 'Страницы');
    n.innerHTML = (per ? '<span class="pager-range"></span>' : '')
      + `<button type="button" class="pg-prev" aria-label="Предыдущая страница">${svg('l')}</button>`
      + `<div class="pager-nums"><span class="pager-plate"></span>${'<button type="button"></button>'.repeat(slots)}</div>`
      + `<span class="pager-info"></span><button type="button" class="pg-next" aria-label="Следующая страница">${svg('r')}</button>`;
    const btns = [...n.querySelectorAll('.pager-nums button')], plate = n.querySelector('.pager-plate');
    const prev = n.querySelector('.pg-prev'), next = n.querySelector('.pg-next'), info = n.querySelector('.pager-info'), range = n.querySelector('.pager-range');
    // всегда 7 мест: 1 … 4 5 6 … 24 — ширина не прыгает
    const seq = () => {
      if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
      if (page <= 4) return [1, 2, 3, 4, 5, 0, total];
      if (page >= total - 3) return [1, 0, total - 4, total - 3, total - 2, total - 1, total];
      return [1, 0, page - 1, page, page + 1, 0, total];
    };
    const render = (anim) => {
      const s = seq();
      btns.forEach((b, i) => { const v = s[i]; b.textContent = v || '…'; b.classList.toggle('gap', !v); b.disabled = !v;
        if (v) b.setAttribute('aria-label', 'Страница ' + v); else b.removeAttribute('aria-label');
        if (v === page) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current') });
      const cur = btns[s.indexOf(page)];
      if (!anim) instant(n);
      plate.style.setProperty('--x', cur.offsetLeft + 'px'); plate.style.setProperty('--w', cur.offsetWidth + 'px');
      prev.disabled = page === 1; next.disabled = page === total;
      info.innerHTML = `Страница <b>${page}</b> из ${total}`;
      if (range) range.textContent = `${((page - 1) * per + 1).toLocaleString('ru-RU')}–${Math.min(page * per, count).toLocaleString('ru-RU')} из ${count.toLocaleString('ru-RU')}`;
      n.dataset.page = page;
    };
    const go = (p) => { if (p < 1 || p > total || p === page) return; page = p; render(true); n.dispatchEvent(new CustomEvent('page', { detail: { page } })) };
    btns.forEach((b) => b.addEventListener('click', () => go(+b.textContent)));
    prev.addEventListener('click', () => go(page - 1)); next.addEventListener('click', () => go(page + 1));
    n.setPage = go;
    render(false); document.fonts?.ready.then(() => render(false));
    const ro = new ResizeObserver(() => render(false)); ro.observe(n);
    // число страниц и записей меняются (живые данные): el.update({ total, count, page }) перестраивает без анимации
    n.update = (o) => { ro.disconnect(); Object.assign(n.dataset, o); delete n.dataset.ly; pager(n) };
  }

  /* ===== Шаги: el.setStep(i) — 0…n (n = все пройдены) ===== */
  function steps(ol) {
    if (!once(ol, 'ly')) return;
    const items = [...ol.children];
    items.forEach((li) => { const d = li.querySelector('.step-dot'); if (d && !d.querySelector('svg')) d.insertAdjacentHTML('beforeend', svg('check')) });
    ol.setStep = (i, anim = true) => {
      if (!anim) instant(ol);
      items.forEach((li, k) => { li.classList.toggle('done', k < i); if (k === i) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current') });
      ol.dataset.step = i; ol.dispatchEvent(new CustomEvent('step', { detail: { step: i } }));
    };
    ol.setStep(+ol.dataset.step || 0, false);
  }

  /* ===== Боковое меню: сворачивание в полосу иконок, группы, выбор пункта ===== */
  function side(s) {
    if (!once(s, 'ly')) return;
    let user = false, narrow = false;
    const set = (c) => {
      s.classList.toggle('collapsed', c);
      s.classList.toggle('over', narrow && !c);
      s.classList.toggle('narrow', narrow);   // в узком контейнере раскрытое меню ложится поверх, а не сжимает содержимое
      s.querySelectorAll('[data-side-toggle]').forEach((b) => b.setAttribute('aria-expanded', !c));
      s.querySelectorAll('.side-item, .side-search').forEach((it) => { const t = it.querySelector('.side-tx')?.textContent; if (c && t) it.setAttribute('aria-label', t); else it.removeAttribute('aria-label') });
    };
    s.querySelectorAll('[data-side-toggle]').forEach((b) => b.addEventListener('click', () => { user = true; set(!s.classList.contains('collapsed')) }));
    // в свёрнутом виде кнопка-рабочее пространство разворачивает меню
    s.querySelector('.side-ws')?.addEventListener('click', (e) => { if (s.classList.contains('collapsed')) { e.stopPropagation(); user = true; set(false) } }, true);
    s.querySelectorAll('.side-label').forEach((l) => l.addEventListener('click', () => l.setAttribute('aria-expanded', l.getAttribute('aria-expanded') === 'false')));
    s.querySelectorAll('.side-item').forEach((it) => it.addEventListener('click', (e) => {
      if (it.getAttribute('href') === '#') e.preventDefault();
      s.querySelectorAll('.side-item[aria-current]').forEach((x) => x.removeAttribute('aria-current')); it.setAttribute('aria-current', 'page');
    }));
    // узкий контейнер — свёрнуто, пока человек сам не развернул
    // сразу, до наблюдателя: иначе на телефоне меню сначала рисуется раскрытым и сворачивается анимацией
    if (s.parentElement) {
      const lim = +s.dataset.narrow || 560;   // data-narrow — свой порог, если содержимому нужно больше места
      narrow = s.parentElement.clientWidth < lim; set(narrow);
      new ResizeObserver(([e]) => { const n = e.contentRect.width < lim; if (n !== narrow) { narrow = n; user = false } if (!user) set(narrow); else set(s.classList.contains('collapsed')) }).observe(s.parentElement);
    }
    // поверх содержимого: закрывается нажатием мимо, выбором пункта и Esc
    const shut = () => { if (s.classList.contains('over')) set(true) };
    addEventListener('pointerdown', (e) => { if (!s.contains(e.target)) shut() });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') shut() });
    s.querySelectorAll('.side-item').forEach((it) => it.addEventListener('click', shut));
  }

  /* ===== Оглавление: подсвечивает раздел, который сейчас читают; клик — плавная прокрутка ===== */
  function onpage(nav) {
    if (!once(nav, 'ly')) return;
    const sc = nav.dataset.scroll ? document.querySelector(nav.dataset.scroll) : null;
    const links = [...nav.querySelectorAll('a[href^="#"]')], targets = links.map((a) => document.querySelector(a.hash));
    const ul = nav.querySelector('ul'); let mark = nav.querySelector('.onpage-mark');
    if (!mark) { mark = document.createElement('span'); mark.className = 'onpage-mark'; ul.append(mark) }
    let cur = -1, lock = false;
    // отступ сверху при переходе: у области прокрутки 16, у страницы — высота шапки + 16 (data-offset переопределяет).
    // Раздел считается текущим, когда его заголовок дошёл до этой линии (+24) — иначе после клика подсветка уходила на предыдущий
    const off = nav.dataset.offset ? +nav.dataset.offset : sc ? 16 : ((document.querySelector('.site-header')?.offsetHeight || 64) + 16);
    const set = (i, anim) => {
      if (i === cur && anim) return; cur = i;
      links.forEach((a, k) => a.setAttribute('aria-current', k === i));
      if (!anim) instant(nav);
      mark.style.setProperty('--y', links[i].offsetTop + 'px'); mark.style.setProperty('--h', links[i].offsetHeight + 'px');
    };
    const top = () => (sc ? sc.getBoundingClientRect().top : 0);
    const spy = () => {
      if (lock) return;
      const t = top(), end = sc ? sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 2 : innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      let i = 0; targets.forEach((el, k) => { if (el && el.getBoundingClientRect().top - t <= off + 24) i = k });
      set(end ? targets.length - 1 : i, true);
    };
    (sc || window).addEventListener('scroll', spy, { passive: true });
    links.forEach((a, i) => a.addEventListener('click', (e) => {
      e.preventDefault(); const el = targets[i]; if (!el) return;
      lock = true; set(i, true);
      const y = sc ? el.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - off : el.getBoundingClientRect().top + scrollY - off;
      (sc || window).scrollTo({ top: y, behavior: reduce.matches ? 'auto' : 'smooth' });
      const done = () => { lock = false }; (sc || window).addEventListener('scrollend', done, { once: true }); setTimeout(done, 900);
    }));
    set(0, false); requestAnimationFrame(spy);
  }

  /* ===== Поповер: кнопка data-pop="id" (клик) или data-pop-hover (карточка по наведению) ===== */
  const pops = new Set();
  const closeAll = (except) => pops.forEach((f) => f !== except && f(false));
  function popover(btn) {
    const p = $(btn.dataset.pop); if (!p || !once(btn, 'ly')) return;
    if (p.parentElement !== document.body) document.body.append(p);   // fixed-слой не должен зависеть от предков
    const hover = btn.hasAttribute('data-pop-hover');
    let tOpen, tClose;
    btn.setAttribute('aria-expanded', 'false'); if (!hover) btn.setAttribute('aria-haspopup', 'dialog');
    const pos = () => place(p, btn.getBoundingClientRect(), p.dataset.align);
    const close = (ret) => {
      if (!p.classList.contains('open')) return;
      p.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
      if (ret === true) btn.focus();
    };
    const open = () => {
      closeAll(close); pos(); p.classList.add('open'); btn.setAttribute('aria-expanded', 'true');
      if (!hover) { const f = p.querySelector('input, textarea, select, button'); f?.focus({ preventScroll: true }); if (f?.select) f.select() }
    };
    pops.add(close);
    if (hover) {
      const enter = () => { clearTimeout(tClose); tOpen = setTimeout(open, 400) };
      const leave = () => { clearTimeout(tOpen); tClose = setTimeout(() => close(), 160) };
      btn.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && enter()); btn.addEventListener('pointerleave', leave);
      p.addEventListener('pointerenter', () => clearTimeout(tClose)); p.addEventListener('pointerleave', leave);
      btn.addEventListener('focus', () => btn.matches(':focus-visible') && open()); btn.addEventListener('blur', () => close());
    } else btn.addEventListener('click', () => (p.classList.contains('open') ? close() : open()));
    p.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(true) } });
    p.querySelectorAll('[data-pop-close]').forEach((b) => b.addEventListener('click', () => close(true)));
    p.querySelector('form')?.addEventListener('submit', (e) => { e.preventDefault(); p.dispatchEvent(new CustomEvent('pop-submit', { detail: new FormData(e.target) })); close(true) });
    addEventListener('pointerdown', (e) => { if (!p.contains(e.target) && !btn.contains(e.target)) close() });
    addEventListener('resize', () => p.classList.contains('open') && pos());
    addEventListener('scroll', () => p.classList.contains('open') && pos(), { passive: true, capture: true });
  }

  /* ===== Контекстное меню: data-ctx="menuId" на списке, строки .ctx-row (правый клик, клавиша меню, долгое нажатие) ===== */
  function ctx(zone) {
    const m = $(zone.dataset.ctx); if (!m || !once(zone, 'ly')) return;
    if (m.parentElement !== document.body) document.body.append(m);
    m.classList.add('fixed');
    let row = null, tLong;
    const close = (ret) => {
      if (!m.classList.contains('open')) return;
      m.classList.remove('open'); row?.classList.remove('ctx-on');
      if (ret === true) row?.focus(); row = null;
    };
    const open = (x, y, r) => {
      row?.classList.remove('ctx-on'); row = r; r.classList.add('ctx-on');
      place(m, { x, y }); m.classList.add('open');
      m.querySelector('.menu-item:not([aria-disabled=true])')?.focus({ preventScroll: true });
    };
    zone.querySelectorAll('.ctx-row').forEach((r) => { r.tabIndex = 0; r.setAttribute('aria-haspopup', 'menu') });
    zone.addEventListener('contextmenu', (e) => {
      const r = e.target.closest('.ctx-row'); if (!r) return; e.preventDefault();
      if (e.clientX === 0 && e.clientY === 0) { const b = r.getBoundingClientRect(); open(b.left + 12, b.bottom, r) } else open(e.clientX, e.clientY, r);
    });
    zone.addEventListener('keydown', (e) => {
      const r = e.target.closest('.ctx-row'); if (!r) return;
      if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) { e.preventDefault(); const b = r.getBoundingClientRect(); open(b.left + 12, b.bottom, r) }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); (e.key === 'ArrowDown' ? r.nextElementSibling : r.previousElementSibling)?.focus() }
    });
    // iOS не присылает contextmenu — долгое нажатие 500 мс
    zone.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'touch') return; const r = e.target.closest('.ctx-row'); if (!r) return;
      const x = e.clientX, y = e.clientY; tLong = setTimeout(() => open(x, y, r), 500);
    });
    ['pointerup', 'pointercancel', 'pointermove'].forEach((t) => zone.addEventListener(t, () => clearTimeout(tLong)));
    menuKeys(m, close);
    m.querySelectorAll('.menu-item').forEach((it) => it.addEventListener('click', () => {
      const r = row; close(true); zone.dispatchEvent(new CustomEvent('ctx-pick', { detail: { row: r, item: it, label: it.querySelector('span')?.textContent } }));
    }));
    addEventListener('pointerdown', (e) => { if (!m.contains(e.target)) close() });
    addEventListener('resize', () => close()); addEventListener('scroll', () => close(), { passive: true, capture: true }); addEventListener('blur', () => close());
  }

  /* ===== Любой <dialog>: закрытие по фону и кнопкам [data-close] ===== */
  /* data-guard="id": если в форме что-то введено, фон / Esc / крестик сначала спрашивают через этот диалог */
  const dirty = (d) => [...d.querySelectorAll('input, textarea, select')].some((f) =>
    f.type === 'checkbox' || f.type === 'radio' ? f.checked !== f.defaultChecked
      : f.tagName === 'SELECT' ? [...f.options].some((o) => o.selected !== o.defaultSelected) : f.value !== f.defaultValue);
  const tryClose = (d) => {
    const g = d.dataset.guard && $(d.dataset.guard);
    if (g && dirty(d)) { g.parentDialog = d; g.showModal(); return }
    d.close();
  };
  // форма очищается, когда окно уже погасло — не на глазах
  const resetLater = (d) => setTimeout(() => {
    d.querySelectorAll('form').forEach((f) => f.reset());
    d.querySelectorAll('[aria-invalid]').forEach((f) => f.removeAttribute('aria-invalid'));
    d.querySelectorAll('.field .error').forEach((e) => e.remove());
    d.querySelectorAll('.field .hint[hidden]').forEach((h) => (h.hidden = false));
    d.querySelectorAll('select').forEach((s) => s.dispatchEvent(new Event('change', { bubbles: true })));
    d.dispatchEvent(new CustomEvent('reset-done'));
  }, 260);
  function dlg(d) {
    if (!once(d, 'dlg')) return;
    // закрытие по фону — в момент НАЖАТИЯ (pointerdown), не по click: click приходит только на отпускании,
    // окно висит лишнее мгновение. Нажали внутри, отпустили снаружи (выделяли текст) — не закрываем: target не фон.
    d.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || e.target !== d) return; const r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) { e.preventDefault(); tryClose(d) }   // preventDefault: под фоном не начнётся выделение
    });
    d.addEventListener('cancel', (e) => { if (d.dataset.guard && dirty(d)) { e.preventDefault(); tryClose(d) } });
    d.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => tryClose(d)));
    // подтверждение выхода: «Не сохранять» закрывает и его, и форму под ним
    d.querySelector('[data-discard]')?.addEventListener('click', () => { const p = d.parentDialog; d.close(); if (p) { p.close(); resetLater(p) } });
    // длинное окно: линии под шапкой и над кнопками — только когда за ними есть скрытый текст
    const main = d.classList.contains('dialog-scroll') && d.querySelector('.dialog-main');
    if (main) {
      const edges = () => { d.classList.toggle('sh-top', main.scrollTop > 1); d.classList.toggle('sh-bottom', main.scrollTop + main.clientHeight < main.scrollHeight - 1) };
      main.addEventListener('scroll', edges, { passive: true }); new ResizeObserver(edges).observe(main);
      d.addEventListener('close', () => setTimeout(() => { main.scrollTop = 0 }, 260));
    }
  }

  /* Ошибка поля: красный контур + текст вместо подсказки; исправили — подсказка возвращается */
  const fieldError = (inp, msg) => {
    const f = inp.closest('.field'); if (!f) return;
    const hint = f.querySelector('.hint'); let er = f.querySelector('.error');
    if (msg) {
      inp.setAttribute('aria-invalid', 'true');
      if (!er) { er = document.createElement('span'); er.className = 'error'; er.setAttribute('role', 'alert'); (hint || f.lastElementChild).after(er) }
      er.textContent = msg; if (hint) hint.hidden = true;
    } else if (inp.hasAttribute('aria-invalid')) {
      inp.removeAttribute('aria-invalid'); er?.remove();
      if (hint) { hint.hidden = false; hint.classList.remove('is-back'); void hint.offsetWidth; hint.classList.add('is-back') }
    }
  };

  /* ===== Меню у кнопки: button[aria-haspopup=menu][aria-controls=id] + div.menu#id рядом (в обёртке position: relative) =====
     Клик или ↓ открывает, стрелки ходят по пунктам, Esc закрывает и возвращает фокус, нажатие мимо закрывает.
     Выбор пункта — событие menu-pick на меню (detail: {item, label}) */
  function menuBtn(btn) {
    const m = $(btn.getAttribute('aria-controls')); if (!m || !m.classList.contains('menu') || !once(btn, 'mb')) return;
    btn.setAttribute('aria-expanded', 'false');
    const isOpen = () => m.classList.contains('open');
    const close = (ret) => { if (!isOpen()) return; const inside = m.contains(document.activeElement); m.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); if (ret && inside) btn.focus() };
    const open = (kb) => { m.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); if (kb) m.querySelector('.menu-item:not([aria-disabled=true])')?.focus() };
    btn.addEventListener('click', (e) => (isOpen() ? close(true) : open(e.detail === 0)));   // detail 0 — нажали с клавиатуры
    btn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); open(true) } });
    menuKeys(m, close);
    m.addEventListener('click', (e) => {
      const it = e.target.closest('.menu-item'); if (!it || it.getAttribute('aria-disabled') === 'true') return;
      close(true); m.dispatchEvent(new CustomEvent('menu-pick', { bubbles: true, detail: { item: it, label: it.querySelector('span')?.textContent } }));
    });
    addEventListener('pointerdown', (e) => { if (!m.contains(e.target) && !btn.contains(e.target)) close(false) });
  }

  /* ===== Подсказка: [data-tip="текст"] (+ data-kbd="⌘C"). Одна .tip на страницу, создаётся сама.
     Только мышь и фокус с клавиатуры; первая — через 400 мс, соседние — сразу и без анимации, пока «прогрето» ===== */
  {
    let tip = null, timer = 0, coolT = 0, warm = false, cur = null;
    const box = () => {
      if (tip) return tip;
      tip = document.querySelector('.tip[role=tooltip]');
      if (!tip) { tip = document.createElement('div'); tip.className = 'tip'; tip.setAttribute('role', 'tooltip'); document.body.append(tip) }
      return tip;
    };
    const show = (el) => {
      const t = box(); cur = el;
      t.textContent = el.dataset.tip;
      if (el.dataset.kbd) { const k = document.createElement('span'); k.className = 'kbd'; k.textContent = el.dataset.kbd; t.append(k) }
      t.style.left = '0px'; t.style.top = '0px';
      const r = el.getBoundingClientRect(), w = t.offsetWidth, h = t.offsetHeight, M = 8;
      const up = r.top - h - M >= M;   // сверху не влезает — под элементом
      t.style.left = Math.round(Math.max(M, Math.min(r.left + r.width / 2 - w / 2, innerWidth - M - w))) + 'px';
      t.style.top = Math.round(up ? r.top - h - M : r.bottom + M) + 'px';
      t.style.setProperty('--origin', up ? 'bottom center' : 'top center');
      t.classList.toggle('instant', warm); t.classList.add('show'); warm = true; clearTimeout(coolT);
    };
    const hide = () => { clearTimeout(timer); cur = null; if (!tip?.classList.contains('show')) return; tip.classList.remove('show'); coolT = setTimeout(() => { warm = false }, 300) };
    addEventListener('pointerover', (e) => {
      const el = e.target.closest?.('[data-tip]'); if (!el || el === cur || e.pointerType !== 'mouse') return;
      clearTimeout(timer); if (warm) show(el); else { cur = el; timer = setTimeout(() => show(el), 400) }
    });
    addEventListener('pointerout', (e) => { const el = e.target.closest?.('[data-tip]'); if (el && !el.contains(e.relatedTarget)) hide() });
    addEventListener('focusin', (e) => { const el = e.target.closest?.('[data-tip]'); if (el?.matches(':focus-visible')) show(el) });
    addEventListener('focusout', (e) => { if (e.target.closest?.('[data-tip]')) hide() });
    addEventListener('pointerdown', hide, true);
    addEventListener('scroll', hide, { passive: true, capture: true });
  }

  /* ===== Шторка: нижнюю можно смахнуть вниз — за 30% высоты или быстрым движением ===== */
  function sheet(d) {
    dlg(d);
    if (!d.classList.contains('sheet-bottom') || !once(d, 'drag')) return;
    let y0 = 0, t0 = 0, dy = 0, on = false;
    d.querySelectorAll('.sheet-grab, .sheet-head').forEach((h) => {
      h.addEventListener('pointerdown', (e) => {
        if (e.target.closest('button')) return;
        on = true; y0 = e.clientY; t0 = performance.now(); dy = 0; h.setPointerCapture(e.pointerId); d.classList.add('dragging');
      });
      h.addEventListener('pointermove', (e) => {
        if (!on) return; const raw = e.clientY - y0;
        dy = raw < 0 ? raw / 4 : raw;                 // вверх — с сопротивлением
        d.style.transform = `translateY(${dy}px)`;
      });
      const up = () => {
        if (!on) return; on = false;
        const v = dy / Math.max(1, performance.now() - t0), from = `translateY(${dy}px)`;
        if (dy > d.offsetHeight * 0.3 || v > 0.6) {
          // уходит: одна анимация из скрипта; .dragging остаётся до закрытия, чтобы CSS-переход не включился параллельно
          d.style.transform = '';
          d.animate([{ transform: from }, { transform: 'translateY(100%)' }], { duration: 220, easing: EASE, fill: 'forwards' });
          const bd = d.animate([{ background: getComputedStyle(d, '::backdrop').backgroundColor }, { background: '#0000' }], { duration: 220, easing: EASE, fill: 'forwards', pseudoElement: '::backdrop' });
          bd.onfinish = () => { d.style.transition = 'none'; d.classList.remove('dragging'); d.close(); d.getAnimations({ subtree: false }).forEach((a) => a.cancel()); bd.cancel(); requestAnimationFrame(() => (d.style.transition = '')) };
        } else {
          // возвращается: только CSS-переход шторки от текущего места к нулю, без второй анимации поверх (она давала рывок и «пружину» в конце)
          d.classList.remove('dragging'); d.style.transform = '';
        }
      };
      h.addEventListener('pointerup', up); h.addEventListener('pointercancel', up);
    });
  }

  /* ===== Подтверждение опасного действия: data-name — что нужно ввести ===== */
  function danger(d) {
    if (!once(d, 'ly')) return; dlg(d);
    const inp = d.querySelector('input'), ok = d.querySelector('[data-confirm]'), name = d.dataset.name;
    const check = () => { ok.disabled = inp.value.trim() !== name };
    inp.addEventListener('input', check); check();
    d.addEventListener('close', () => setTimeout(() => { inp.value = ''; check() }, 260));   // очищаем после того, как погас
    d.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault(); if (ok.disabled) return;
      btnLoading(ok, true);
      setTimeout(() => { btnLoading(ok, false); d.close(); d.dispatchEvent(new CustomEvent('confirmed')) }, 1100);
    });
  }

  /* ===== Командная палитра: пункты в разметке (.cmdk-item, data-k — синонимы для поиска). ⌘K / Ctrl+K ===== */
  function cmdk(d) {
    if (!once(d, 'ly')) return; dlg(d);
    const inp = d.querySelector('input'), list = d.querySelector('.cmdk-list'), empty = d.querySelector('.cmdk-empty');
    const items = [...d.querySelectorAll('.cmdk-item')], groups = [...d.querySelectorAll('.cmdk-group')];
    items.forEach((it, i) => { const s = it.querySelector('span'); it.dataset.label = s.textContent; it.id ||= 'cmdk-' + i; it.setAttribute('role', 'option') });
    list.setAttribute('role', 'listbox'); inp.setAttribute('role', 'combobox'); inp.setAttribute('aria-controls', list.id ||= 'cmdk-list'); inp.setAttribute('aria-expanded', 'true');
    let vis = items, act = null, mouse = false;
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    const setAct = (it, scroll) => {
      act?.classList.remove('active'); act = it || null; act?.classList.add('active');
      if (act) { inp.setAttribute('aria-activedescendant', act.id); if (scroll) { const lt = list.scrollTop, r = act.offsetTop - list.offsetTop, h = act.offsetHeight;
        if (r < lt + 8) list.scrollTop = r - 8; else if (r + h > lt + list.clientHeight - 8) list.scrollTop = r + h - list.clientHeight + 8 } }
      else inp.removeAttribute('aria-activedescendant');
    };
    const filter = (animate) => {
      const q = inp.value.trim().toLowerCase(), h0 = list.offsetHeight;
      vis = [];
      items.forEach((it) => {
        const lab = it.dataset.label, i = lab.toLowerCase().indexOf(q), hit = !q || i >= 0 || (it.dataset.k || '').toLowerCase().includes(q);
        it.hidden = !hit; if (hit) vis.push(it);
        it.querySelector('span').innerHTML = q && i >= 0 ? esc(lab.slice(0, i)) + '<mark>' + esc(lab.slice(i, i + q.length)) + '</mark>' + esc(lab.slice(i + q.length)) : esc(lab);
      });
      groups.forEach((g) => (g.hidden = !g.querySelector('.cmdk-item:not([hidden])')));
      empty.hidden = !!vis.length; if (!vis.length) empty.querySelector('b').textContent = `«${inp.value.trim()}»`;
      setAct(vis[0]); list.scrollTop = 0;
      // высота списка меняется плавно — без скачка нижнего края
      const h1 = list.offsetHeight;
      if (animate && h0 !== h1 && !reduce.matches) list.animate([{ height: h0 + 'px' }, { height: h1 + 'px' }], { duration: 180, easing: EASE });
    };
    const run = (it) => { if (!it) return; d.close(); d.dispatchEvent(new CustomEvent('cmdk-run', { detail: { item: it, label: it.dataset.label, action: it.dataset.run } })) };
    inp.addEventListener('input', () => filter(true));
    inp.addEventListener('keydown', (e) => {
      const i = vis.indexOf(act);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (vis.length) setAct(vis[(i + (e.key === 'ArrowDown' ? 1 : -1) + vis.length) % vis.length], true) }
      else if (e.key === 'Enter') { e.preventDefault(); run(act) }
    });
    // мышь выделяет, только если она действительно двигалась (а не список уехал под неподвижным курсором)
    list.addEventListener('pointermove', (e) => { const it = e.target.closest('.cmdk-item'); if (it && mouse && it !== act) setAct(it); mouse = true });
    list.addEventListener('click', (e) => run(e.target.closest('.cmdk-item')));
    d.addEventListener('close', () => { mouse = false });
    d.openPalette = () => { if (d.open) return; inp.value = ''; filter(false); d.showModal(); inp.focus() };
    addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !document.querySelector('[data-hotkey="mod+k"]')) { e.preventDefault(); d.open ? d.close() : d.openPalette() }
    });
  }

  /* ===== Стопка уведомлений: колода внизу по центру ===== */
  let host = null; const live = [];   // от старого к новому
  const MAX = 3, PEEK = 12, GAP = 8;
  let open = false;
  const layout = () => {
    if (!host) return;
    const list = live.filter((t) => !t.gone).reverse();   // спереди — самое новое
    const h0 = list[0]?.h || 0; let acc = 0;
    list.forEach((t, i) => {
      const st = t.el.style, back = i > 0 && !open;
      st.setProperty('--z', String(100 - i));
      st.setProperty('--y', (open ? -acc : -i * PEEK) + 'px');
      st.setProperty('--s', open ? '1' : String(1 - i * 0.05));
      st.setProperty('--h', (back ? h0 : t.h) + 'px');
      t.el.classList.toggle('behind', back);
      t.el.classList.toggle('behind-out', i >= MAX);
      acc += t.h + GAP;
    });
    host.style.setProperty('--stack-h', (open ? Math.max(0, acc - GAP) : list.length ? h0 + Math.min(list.length - 1, MAX - 1) * PEEK : 0) + 'px');
  };
  const setOpen = (o) => { if (open === o) return; open = o; layout(); live.forEach((t) => (o ? t.pause() : t.resume())) };
  const ensureHost = () => {
    if (host) return host;
    host = document.createElement('section'); host.className = 'toasts'; host.setAttribute('aria-label', 'Уведомления'); host.setAttribute('aria-live', 'polite');
    document.body.append(host);
    host.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && setOpen(true));
    host.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && setOpen(false));
    host.addEventListener('focusin', () => setOpen(true));
    host.addEventListener('focusout', (e) => { if (!host.contains(e.relatedTarget)) setOpen(false) });
    // на телефоне тап по колоде раскрывает её, тап мимо — сворачивает
    host.addEventListener('click', (e) => { if (matchMedia('(pointer: coarse)').matches && !e.target.closest('button')) setOpen(!open) });
    addEventListener('pointerdown', (e) => { if (open && !host.contains(e.target)) setOpen(false) });
    addEventListener('resize', () => { live.forEach((t) => t.measure()); layout() });
    return host;
  };
  // Открыто модальное окно — колода переезжает в него: иначе окно в верхнем слое закрывает её затемнением,
  // а всё вне окна неактивно (крестик и смахивание не работают). Окно закрылось — колода обратно в body
  const placeHost = () => {
    const d = [...document.querySelectorAll('dialog[open]')].filter((x) => x.matches(':modal')).pop(), to = d || document.body;
    if (host.parentElement === to) return;
    to.append(host);
    // обратно — сразу, как окно начало закрываться (снят open), а не после анимации: иначе колода уезжает вместе со шторкой
    if (d) { const mo = new MutationObserver(() => { if (d.open) return; mo.disconnect(); if (host.parentElement === d) { document.body.append(host); placeHost() } }); mo.observe(d, { attributes: true, attributeFilter: ['open'] }) }
  };
  window.toast = (o) => {
    if (typeof o === 'string') o = { title: o };
    ensureHost(); placeHost();
    const el = document.createElement('div'); el.className = 'tst enter'; el.setAttribute('role', 'status');
    el.innerHTML = `<span class="tst-ic">${['success', 'error', 'info', 'default'].map((k) => svg(k, 'off i-' + k)).join('')}<span class="spinner off i-loading"></span></span>`
      + `<div class="tst-body"><b></b><span></span><div class="tst-foot"></div></div><div class="tst-act"><button type="button" class="toast-x" aria-label="Закрыть">${svg('x')}</button></div>`;
    const act = el.querySelector('.tst-act');
    let timer = 0, left = 0, start = 0;
    const arm = (ms) => { clearTimeout(timer); left = ms; if (ms === Infinity) return; start = Date.now(); if (!open) timer = setTimeout(api.close, ms) };
    const api = {
      el, h: 0, gone: false,
      measure() { const s = el.style.getPropertyValue('--h'); el.style.setProperty('--h', 'auto'); api.h = el.offsetHeight; el.style.setProperty('--h', s) },
      update(n) {
        const type = n.type || 'default';
        el.dataset.type = type;
        el.querySelectorAll('.tst-ic > *').forEach((x) => x.classList.toggle('off', !x.classList.contains('i-' + type)));
        if ('title' in n) el.querySelector('b').textContent = n.title || '';
        const sp = el.querySelector('.tst-body span'); if ('text' in n) { sp.textContent = n.text || ''; sp.hidden = !n.text }
        el.querySelectorAll('.tst-act .btn, .tst-foot .btn').forEach((x) => x.remove());
        if (n.action) { const b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-sm btn-secondary'; b.textContent = n.action.label;
          b.addEventListener('click', () => { api.close(); n.action.run?.() }); if (n.text) el.querySelector('.tst-foot').append(b); else act.prepend(b) }
        arm(n.duration ?? (type === 'loading' ? Infinity : n.action ? 6000 : 4000));
        if (el.isConnected) { api.measure(); layout() }
        return api;
      },
      pause() { if (left === Infinity || api.gone) return; clearTimeout(timer); left -= Date.now() - start },
      resume() { if (left === Infinity || api.gone) return; arm(Math.max(left, 1200)) },
      close() {
        if (api.gone) return; api.gone = true; clearTimeout(timer);
        el.classList.add('leave'); live.splice(live.indexOf(api), 1); layout();
        setTimeout(() => el.remove(), 320);
        if (!live.length) setOpen(false);
      }
    };
    el.querySelector('.toast-x').addEventListener('click', api.close);
    // смахнуть вниз или вбок. Ось выбирается по первым 6px движения и дальше не меняется (не уезжает по диагонали).
    // Вниз — за 40px или быстрым движением, вверх — с сопротивлением. Вбок — в обе стороны, бледнеет со сдвигом,
    // закрывается за треть ширины или быстрым движением. Скорость — по последним 100 мс, а не от начала жеста
    let x0 = 0, y0 = 0, dx = 0, dy = 0, axis = '', drag = false, trail = [];
    const speed = (k) => { const a = trail[0], z = trail.at(-1); return a && z && z.t > a.t ? (z[k] - a[k]) / (z.t - a.t) : 0 };
    el.addEventListener('pointerdown', (e) => { if (e.target.closest('button')) return; drag = true; x0 = e.clientX; y0 = e.clientY; dx = dy = 0; axis = ''; trail = []; el.setPointerCapture(e.pointerId) });
    el.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const rx = e.clientX - x0, ry = e.clientY - y0, t = performance.now();
      if (!axis) { if (Math.hypot(rx, ry) < 6) return; axis = Math.abs(rx) > Math.abs(ry) ? 'x' : 'y'; el.classList.add('dragging') }
      trail.push({ x: rx, y: ry, t }); while (trail.length > 2 && t - trail[0].t > 100) trail.shift();
      if (axis === 'x') { dx = rx; el.style.setProperty('--dx', dx + 'px'); el.style.opacity = String(Math.max(0, 1 - Math.abs(dx) / el.offsetWidth)) }
      else { dy = ry < 0 ? ry / 6 : ry; el.style.setProperty('--dy', dy + 'px') }
    });
    const up = () => {
      if (!drag) return; drag = false; el.classList.remove('dragging');
      if (axis === 'x') {
        const v = speed('x');
        if (Math.abs(dx) > el.offsetWidth / 3 || (Math.abs(v) > 0.5 && Math.sign(v) === Math.sign(dx))) {
          el.style.setProperty('--dir', String(Math.sign(dx || v))); el.classList.add('leave-x'); el.style.opacity = ''; api.close();
        } else { el.style.setProperty('--dx', '0px'); el.style.opacity = '' }
      } else if (axis === 'y') {
        if (dy > 40 || speed('y') > 0.5) api.close();
        else el.style.setProperty('--dy', '0px');
      }
    };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    host.append(el); live.push(api);
    api.update(o); api.measure();
    layout();
    el.offsetHeight; el.classList.remove('enter');
    if (open) api.pause();
    while (live.filter((t) => !t.gone).length > MAX + 1) live.find((t) => !t.gone).close();
    return api;
  };

  // ошибка поля и очистка окна после закрытия — для своих форм страницы
  window.fieldError = fieldError; window.resetDialog = resetLater;

  window.initLayers = (root = document) => {
    const each = (s, f) => root.querySelectorAll(s).forEach(f);
    each('.crumbs', crumbs); each('.pager', pager); each('.steps', steps); each('.side', side); each('.onpage', onpage);
    each('[data-pop]', popover); each('[data-ctx]', ctx); each('dialog.sheet', sheet); each('dialog.dialog-danger', danger); each('dialog.cmdk', cmdk);
    each('dialog.dialog', dlg); each('button[aria-haspopup="menu"][aria-controls]', menuBtn);
    each('[data-open]', (b) => { if (!once(b, 'op')) return; b.addEventListener('click', () => { const d = $(b.dataset.open); if (!d) return; d.openPalette ? d.openPalette() : d.showModal() }) });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initLayers()); else initLayers();
})();

;
// ../ds/js/inputs.js
/* Ввод · поведение расширенных полей. Стили — tokens/inputs.css. Подключать с defer; всё находится по классам само.
   Повторная инициализация для нового куска страницы: initInputs(root).
   Компоненты и разметка — 03-components/index.html#inputs. */
(() => {
  const P = {
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    l: '<path d="m15 18-6-6 6-6"/>', r: '<path d="m9 18 6-6-6-6"/>', d: '<path d="m6 9 6 6 6-6"/>',
    cal: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    img: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    ok: '<path d="M20 6 9 17l-5-5"/>',
    err: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  };
  const svg = (n, s = 16) => `<svg class="lucide" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const once = (el, k) => (el.dataset[k] ? false : (el.dataset[k] = '1'));
  const fire = (el, t, detail) => el.dispatchEvent(new CustomEvent(t, { bubbles: true, detail }));
  let uid = 0;
  // список/панель: открывается вниз, если снизу мало места и сверху больше — вверх
  const flip = (pop, anchor, need) => { const r = anchor.getBoundingClientRect(); pop.classList.toggle('up', innerHeight - r.bottom < need && r.top > innerHeight - r.bottom) };
  /* Плавность — главное правило: размеры соседей не прыгают, элементы не возникают и не пропадают скачком.
     resize — высота меняется плавно (замер до → изменение → замер после → анимация между ними).
     growIn / shrinkOut — строка списка появляется/уходит вместе со своей высотой, соседи сдвигаются плавно.
     tagOut — тег в строке сжимается по ширине, соседи подъезжают. */
  const EASE = 'cubic-bezier(.23, 1, .32, 1)', reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const resize = (el, change, ms = 180) => {
    const h0 = el.offsetHeight; change(); const h1 = el.offsetHeight;          // высота раскладки, без transform (список может ещё масштабироваться при открытии)
    if (Math.abs(h0 - h1) < 0.5 || reduce.matches) return;
    el._h?.cancel(); el.style.overflow ||= ''; const prev = el.style.overflow; el.style.overflow = 'hidden';
    el._h = el.animate({ height: [h0 + 'px', h1 + 'px'] }, { duration: ms, easing: EASE });
    el._h.onfinish = el._h.oncancel = () => { el.style.overflow = prev };
  };
  const box4 = (el) => { const s = getComputedStyle(el); return { h: el.getBoundingClientRect().height + 'px', pt: s.paddingTop, pb: s.paddingBottom, mt: s.marginTop } };
  const growIn = (el, ms = 220) => {
    if (reduce.matches) return; const b = box4(el); el.style.overflow = 'hidden';
    el.animate({ height: ['0px', b.h], paddingTop: ['0px', b.pt], paddingBottom: ['0px', b.pb], marginTop: ['0px', b.mt], opacity: [0, 1] }, { duration: ms, easing: EASE })
      .onfinish = () => { el.style.overflow = '' };
  };
  const shrinkOut = (el, done, ms = 180) => {
    if (reduce.matches) return done(); const b = box4(el); el.style.overflow = 'hidden';
    el.animate({ height: [b.h, '0px'], paddingTop: [b.pt, '0px'], paddingBottom: [b.pb, '0px'], marginTop: [b.mt, '0px'], opacity: [1, 0] }, { duration: ms, easing: EASE, fill: 'forwards' }).onfinish = done;
  };
  const tagOut = (el, gap, done) => {
    if (reduce.matches) return done(); const s = getComputedStyle(el); el.style.overflow = 'hidden';
    el.animate({ width: [el.getBoundingClientRect().width + 'px', '0px'], paddingLeft: [s.paddingLeft, '0px'], paddingRight: [s.paddingRight, '0px'], marginRight: ['0px', -gap + 'px'], opacity: [1, 0] },
      { duration: 180, easing: EASE, fill: 'forwards' }).onfinish = done;
  };
  // сменить иконку кроссфейдом, а не подменой
  const swapIcon = (holder, html) => { holder.innerHTML = html; if (!reduce.matches) holder.firstElementChild?.animate({ opacity: [0, 1], transform: ['scale(.7)', 'none'] }, { duration: 200, easing: EASE }) };
  /* Составное поле (теги, кнопки внутри) нельзя оборачивать в <label>: браузер пересылает любой клик внутри подписи
     первому «подписываемому» элементу — у мультивыбора это крестик первого тега (выбор пункта удалял тег),
     у степпера — кнопка «−». Если обёртка всё же есть — заменяем её на div и связываем подпись через aria-labelledby. */
  const unlabel = (el, target) => {
    const lab = el.closest('label'); if (!lab) return;
    const div = document.createElement('div'); div.className = lab.className; [...lab.attributes].forEach((a) => a.name !== 'for' && div.setAttribute(a.name, a.value));
    while (lab.firstChild) div.appendChild(lab.firstChild); lab.replaceWith(div);
    const cap = div.querySelector('.label'); if (cap && target) { cap.id ||= 'lbl' + ++uid; target.setAttribute('aria-labelledby', cap.id);
      cap.addEventListener('click', () => target.focus()) }   // клик по подписи — фокус в поле, как у обычной подписи
  };
  const reveal = (list, el) => { const t = el.offsetTop, b = t + el.offsetHeight; if (t - 4 < list.scrollTop) list.scrollTop = t - 4; else if (b + 4 > list.scrollTop + list.clientHeight) list.scrollTop = b + 4 - list.clientHeight };

  /* ===== Поиск: очистка, Esc, горячая клавиша ===== */
  function search(w) {
    if (!once(w, 'ui')) return;
    const inp = w.querySelector('.input'), clr = w.querySelector('.clear');
    inp.placeholder ||= ' ';                       // :placeholder-shown нужен для показа кнопки очистки
    const clear = () => { inp.value = ''; inp.dispatchEvent(new Event('input', { bubbles: true })); inp.focus() };
    clr?.addEventListener('click', clear);
    inp.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (inp.value) { e.preventDefault(); clear() } else inp.blur() } });
  }
  // «/» или ⌘K/Ctrl+K фокусирует поле с data-hotkey, если фокус не в другом поле
  addEventListener('keydown', (e) => {
    const t = e.target, typing = t.closest?.('input, textarea, select, [contenteditable=true]');
    const k = (e.key === '/' && !typing) ? '/' : ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') ? 'mod+k' : null;
    if (!k) return;
    const f = document.querySelector(`[data-hotkey="${k}"]`); if (!f) return;
    e.preventDefault(); f.focus(); f.select?.();
  });

  /* ===== Пароль: показать/скрыть и надёжность ===== */
  const LEVELS = ['', 'Слабый', 'Средний', 'Хороший', 'Надёжный'];
  function password(w) {
    if (!once(w, 'ui')) return;
    const inp = w.querySelector('.input'), btn = w.querySelector('[data-pw-toggle]');
    btn?.addEventListener('click', () => {
      const show = inp.type === 'password'; inp.type = show ? 'text' : 'password';
      btn.setAttribute('aria-pressed', show); btn.setAttribute('aria-label', show ? 'Скрыть пароль' : 'Показать пароль');
      const end = inp.value.length; inp.focus(); inp.setSelectionRange(end, end);
    });
    const meter = inp.id && document.querySelector(`.strength[data-for="${inp.id}"]`);
    if (!meter) return;
    const txt = meter.querySelector('.strength-text');
    const rate = (v) => {
      if (!v) return 0;
      let s = 0; if (v.length >= 8) s++; if (v.length >= 12) s++;
      if (/[a-zа-я]/.test(v) && /[A-ZА-Я]/.test(v)) s++; if (/\d/.test(v)) s++; if (/[^\w\sа-яё]/i.test(v)) s++;
      return Math.max(1, Math.min(4, s - (v.length < 8 ? 1 : 0)));
    };
    const upd = () => { const l = rate(inp.value); meter.dataset.level = l; txt.textContent = LEVELS[l] || txt.dataset.empty || '' };
    txt.dataset.empty = txt.textContent; inp.addEventListener('input', upd); upd();
  }

  /* ===== Код из SMS ===== */
  function otp(g) {
    if (!once(g, 'ui')) return;
    const cells = [...g.querySelectorAll('input')];
    cells.forEach((c, i) => {
      c.inputMode = 'numeric'; c.autocomplete = i ? 'off' : 'one-time-code'; c.maxLength = cells.length; c.setAttribute('aria-label', `Цифра ${i + 1} из ${cells.length}`);
      c.addEventListener('focus', () => c.select());
      c.addEventListener('input', () => {
        const d = c.value.replace(/\D/g, '');
        if (d.length > 1) return fill(i, d);                 // автозаполнение кода из SMS кладёт всё в первую ячейку
        c.value = d; g.removeAttribute('aria-invalid');
        if (d && cells[i + 1]) cells[i + 1].focus();
        check();
      });
      c.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !c.value && cells[i - 1]) { e.preventDefault(); cells[i - 1].value = ''; cells[i - 1].focus() }
        else if (e.key === 'ArrowLeft' && cells[i - 1]) { e.preventDefault(); cells[i - 1].focus() }
        else if (e.key === 'ArrowRight' && cells[i + 1]) { e.preventDefault(); cells[i + 1].focus() }
      });
      c.addEventListener('paste', (e) => { e.preventDefault(); fill(i, (e.clipboardData.getData('text') || '').replace(/\D/g, '')) });
    });
    const fill = (from, d) => { [...d].slice(0, cells.length - from).forEach((ch, k) => (cells[from + k].value = ch)); g.removeAttribute('aria-invalid'); (cells[Math.min(from + d.length, cells.length - 1)]).focus(); check() };
    const check = () => { const code = cells.map((c) => c.value).join(''); if (code.length === cells.length) fire(g, 'otp-complete', { code }) };
    // ошибка: красная рамка, короткая встряска, всё очищается, фокус на первую ячейку
    g.otpError = () => { g.setAttribute('aria-invalid', 'true'); g.classList.remove('shake'); g.offsetWidth; g.classList.add('shake'); cells.forEach((c) => (c.value = '')); cells[0].focus() };
  }

  /* ===== Число со степпером ===== */
  function stepper(w) {
    if (!once(w, 'ui')) return;
    const inp = w.querySelector('input'), [dec, inc] = w.querySelectorAll('button');
    unlabel(w, inp);
    const num = (a, d) => (a === '' || a == null ? d : +a);
    const min = num(inp.min, -Infinity), max = num(inp.max, Infinity), step = num(inp.step, 1);
    const dp = (String(step).split('.')[1] || '').length;
    const clamp = (v) => +Math.min(max, Math.max(min, v)).toFixed(dp);
    const paint = () => { const v = +inp.value; dec.disabled = v <= min; inc.disabled = v >= max };
    const set = (v) => { const n = clamp(v); if (+inp.value !== n) { inp.value = n; inp.dispatchEvent(new Event('input', { bubbles: true })); inp.dispatchEvent(new Event('change', { bubbles: true })) } paint() };
    // удержание: первый шаг сразу, через 400 мс — повтор каждые 60 мс
    [[dec, -1], [inc, 1]].forEach(([b, d]) => {
      let t1, t2; const stop = () => { clearTimeout(t1); clearInterval(t2) };
      b.addEventListener('pointerdown', (e) => { if (e.button) return; e.preventDefault(); set(+inp.value + d * step); t1 = setTimeout(() => (t2 = setInterval(() => { set(+inp.value + d * step); if (b.disabled) stop() }, 60)), 400) });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => b.addEventListener(ev, stop));
      b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(+inp.value + d * step) } });
      b.tabIndex = -1;                                  // с клавиатуры — стрелки в самом поле
    });
    inp.addEventListener('keydown', (e) => {
      const big = e.shiftKey ? 10 : 1;
      if (e.key === 'ArrowUp') { e.preventDefault(); set(+inp.value + step * big) }
      else if (e.key === 'ArrowDown') { e.preventDefault(); set(+inp.value - step * big) }
    });
    inp.addEventListener('blur', () => set(inp.value === '' ? (min > -Infinity ? min : 0) : +inp.value));
    inp.addEventListener('input', paint);
    paint();
  }

  /* ===== Ползунок и диапазон ===== */
  function slider(s) {
    if (!once(s, 'ui')) return;
    const [a, b] = s.querySelectorAll('input[type=range]'), out = s.dataset.out && document.getElementById(s.dataset.out);
    const fmt = (v) => { const f = s.dataset.format || '{}'; return f.replace('{}', (+v).toLocaleString('ru-RU')) };
    const pct = (i) => (i.value - i.min) / (i.max - i.min);   // доля 0…1 — CSS сам ставит заливку в центр бегунка
    const track = s.querySelector('.track');
    if (!track.querySelector('.fill')) track.insertAdjacentHTML('beforeend', '<span class="fill"></span>');
    // data-scale: деления на дорожке и подписи под каждым шагом (для дискретных шкал, до ~12 шагов)
    let marks = [];
    if (s.hasAttribute('data-scale')) {
      const min = +a.min, max = +a.max, step = +a.step || 1, n = Math.round((max - min) / step);
      const at = (k) => `calc(var(--th) / 2 + (100% - var(--th)) * ${k / n})`;
      for (let k = 1; k < n; k++) track.insertAdjacentHTML('afterbegin', `<span class="tick" style="left:${at(k)}"></span>`);
      const sc = document.createElement('div'); sc.className = 'slider-scale'; sc.setAttribute('aria-hidden', 'true');
      for (let k = 0; k <= n; k++) { const v = min + k * step; sc.insertAdjacentHTML('beforeend', `<span style="left:${at(k)}" data-v="${v}">${v.toLocaleString('ru-RU')}</span>`) }
      s.after(sc); marks = [...sc.children];
    }
    const lit = () => { const lo = b ? +a.value : -Infinity, hi = b ? +b.value : +a.value; marks.forEach((m) => m.classList.toggle('in', +m.dataset.v >= lo && +m.dataset.v <= hi)) };
    const upd = (e) => {
      if (b) {
        const gap = +(s.dataset.gap || 0);
        if (+a.value > +b.value - gap) { if (e?.target === a) a.value = +b.value - gap; else b.value = +a.value + gap }
        s.style.setProperty('--p', pct(a)); s.style.setProperty('--p2', pct(b));
        // бегунок, который сейчас тянут, — сверху (иначе сведённые вместе нельзя развести)
        a.style.zIndex = e?.target === a || +a.value > (+a.max + +a.min) / 2 ? 2 : 1;
        if (out) out.textContent = `${fmt(a.value)} — ${fmt(b.value)}`;
      } else { s.style.setProperty('--p', pct(a)); if (out) out.textContent = fmt(a.value) }
      lit();
    };
    [a, b].filter(Boolean).forEach((i) => i.addEventListener('input', upd));
    upd();
  }

  /* ===== Группа переключателей ===== */
  function toggles(g) {
    if (!once(g, 'ui')) return;
    const single = g.dataset.mode === 'single', btns = [...g.querySelectorAll('button')];
    btns.forEach((b) => { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true'); b.addEventListener('click', () => {
      if (single) btns.forEach((x) => x.setAttribute('aria-pressed', x === b)); else b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
      fire(g, 'change', { pressed: btns.filter((x) => x.getAttribute('aria-pressed') === 'true').map((x) => x.dataset.v) });
    }) });
  }

  /* ===== Цвет: образцы + HEX ===== */
  function color(box) {
    if (!once(box, 'ui')) return;
    const sw = [...box.querySelectorAll('.swatch')], hex = box.querySelector('.hex'), inp = hex?.querySelector('.input'), prev = hex?.querySelector('.preview'), native = prev?.querySelector('input');
    const norm = (v) => { v = v.trim().replace(/^#/, ''); if (/^[0-9a-f]{3}$/i.test(v)) v = [...v].map((c) => c + c).join(''); return /^[0-9a-f]{6}$/i.test(v) ? '#' + v.toLowerCase() : null };
    const set = (v, from) => {
      sw.forEach((s) => { const on = s.dataset.c === v; s.setAttribute('aria-checked', on); s.tabIndex = on ? 0 : -1 });
      if (!sw.some((s) => s.tabIndex === 0) && sw[0]) sw[0].tabIndex = 0;
      if (inp && from !== 'hex') { inp.value = v.slice(1).toUpperCase(); inp.removeAttribute('aria-invalid') }
      if (prev) prev.style.setProperty('--c', v); if (native) native.value = v;
      box.dataset.value = v; fire(box, 'colorchange', { value: v });
    };
    sw.forEach((s, i) => {
      s.style.setProperty('--c', s.dataset.c); s.setAttribute('role', 'radio');
      s.addEventListener('click', () => set(s.dataset.c));
      s.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!d) return;
        e.preventDefault(); const n = sw[(i + d + sw.length) % sw.length]; n.focus(); set(n.dataset.c);
      });
    });
    inp?.addEventListener('input', () => { const v = norm(inp.value); inp.toggleAttribute('aria-invalid', !v && inp.value.length >= 6); if (v) set(v, 'hex') });
    inp?.addEventListener('blur', () => { if (!norm(inp.value)) set(box.dataset.value) });
    native?.addEventListener('input', () => set(native.value));
    set(norm(box.dataset.value || sw[0]?.dataset.c || '#0a806c'));
  }

  /* ===== Поле с подсказками и мультивыбор =====
     <div class="combo" data-options="Москва|Казань:RU-TA|…" [data-multi] [data-create]>
       <input class="input" placeholder="…">            — одиночный
       <div class="input multi"><input placeholder="…"></div>  — мультивыбор
     Значение: data-value (одиночный — строка, мультивыбор — через «|»), событие change. */
  function combo(c) {
    if (!once(c, 'ui')) return;
    const multi = c.hasAttribute('data-multi'), create = c.hasAttribute('data-create');
    const all = c.dataset.options.split('|').map((s) => { const [t, m] = s.split(':'); return { t: t.trim(), m: m?.trim() } });
    const box = multi ? c.querySelector('.multi') : null, inp = c.querySelector('input'), id = 'cb' + ++uid;
    unlabel(c, inp);
    /* Одной строкой (data-one-line): поле всегда 36. Не помещается — теги сначала сужаются до MIN (текст с многоточием),
       дальше лишние уходят в счётчик «+N» (в подсказке — их названия). Все изменения ширины — плавные. */
    const one = multi && c.hasAttribute('data-one-line'), MIN = 80;   // ~7–8 букв: уже меньше — нечитаемо, лучше свернуть в «+N»
    let more = null;
    if (one) { box.classList.add('one-line'); inp.insertAdjacentHTML('beforebegin', '<span class="tag-more" hidden></span>'); more = box.querySelector('.tag-more');
      more.addEventListener('pointerdown', (e) => { e.preventDefault(); inp.focus(); open() }) }
    const widths = () => new Map([...box.querySelectorAll('.tag, .tag-more')].map((t) => [t, t.hidden ? 0 : t.getBoundingClientRect().width]));
    const fit = (animate, before) => {
      if (!one) return;
      const tg = [...box.querySelectorAll('.tag')].filter((t) => !t._out);
      const w0 = before || widths();   // снимок до изменения — чтобы сжатие соседей при добавлении шло плавно
      // естественная ширина каждого тега (без сжатия, с потолком max-width)
      tg.forEach((t) => { t.hidden = false; t.style.flexShrink = '0' }); more.hidden = true;
      const nat = tg.map((t) => t.getBoundingClientRect().width);
      tg.forEach((t, i) => { t.style.flexShrink = ''; t.style.minWidth = Math.min(nat[i], MIN) + 'px' });   // короткие не растягиваем
      const cs = getComputedStyle(box), gap = parseFloat(cs.columnGap) || 0;
      const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - (parseFloat(getComputedStyle(inp).minWidth) || 0) - gap;
      const need = (k, withMore) => nat.slice(0, k).reduce((s, w) => s + Math.min(w, MIN) + gap, 0) + (withMore ? 40 + gap : 0);
      let k = tg.length;
      while (k > 0 && need(k, k < tg.length) > avail) k--;
      const hiddenNames = tg.slice(k).map((t) => t.dataset.t);
      tg.forEach((t, i) => (t.hidden = i >= k));
      if (hiddenNames.length) { more.hidden = false; more.textContent = '+' + hiddenNames.length; more.title = hiddenNames.join(', '); more.setAttribute('aria-label', 'Ещё ' + hiddenNames.length + ': ' + hiddenNames.join(', ')) }
      if (!animate || reduce.matches) return;
      // FLIP по ширине: видимые сжимаются/растягиваются, ушедшие в «+N» — схлопываются, счётчик — растёт
      [...tg, more].forEach((t) => {
        const a = w0.get(t) || 0, hid = t.hidden; if (hid && !a) return;
        if (hid) t.hidden = false;
        const b = hid ? 0 : t.getBoundingClientRect().width; if (Math.abs(a - b) < 0.5) { if (hid) t.hidden = true; return }
        const mw = t.style.minWidth; t.style.overflow = 'hidden'; t.style.minWidth = '0';   // min-width не даёт анимировать ширину с нуля
        const an = t.animate({ width: [a + 'px', b + 'px'], ...(hid ? { opacity: [1, 0], marginRight: ['0px', -gap + 'px'] } : !a ? { opacity: [0, 1] } : {}) }, { duration: 200, easing: EASE });
        an.onfinish = () => { t.style.overflow = ''; t.style.minWidth = mw; if (hid) t.hidden = true };
      });
    };
    if (one) new ResizeObserver(() => fit(false)).observe(box);
    let picked = multi ? (c.dataset.value ? c.dataset.value.split('|') : []) : null, active = -1, items = [], armed = false;
    inp.setAttribute('role', 'combobox'); inp.setAttribute('aria-autocomplete', 'list'); inp.setAttribute('aria-expanded', 'false'); inp.setAttribute('aria-controls', id);
    inp.autocomplete = 'off'; inp.spellcheck = false;
    c.insertAdjacentHTML('beforeend', `<span class="chev">${svg('d')}</span><div class="menu listbox" role="listbox" id="${id}" ${multi ? 'aria-multiselectable="true"' : ''}></div>`);
    const list = c.querySelector('.listbox');
    const hl = (t, q) => { if (!q) return esc(t); const i = t.toLowerCase().indexOf(q.toLowerCase()); return i < 0 ? esc(t) : esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + q.length)) + '</mark>' + esc(t.slice(i + q.length)) };
    const render = () => {
      const q = typed ? inp.value.trim() : '';      // открыли с выбранным значением — показываем весь список, фильтр с первой буквы
      const hits = all.filter((o) => !q || o.t.toLowerCase().includes(q.toLowerCase()));
      // точные начала — выше
      hits.sort((x, y) => (q ? +!x.t.toLowerCase().startsWith(q.toLowerCase()) - +!y.t.toLowerCase().startsWith(q.toLowerCase()) : 0));
      let html = hits.map((o, i) => {
        const sel = multi ? picked.includes(o.t) : c.dataset.value === o.t;
        return `<div class="option" role="option" id="${id}-${i}" data-t="${esc(o.t)}" aria-selected="${sel}">${multi ? `<input type="checkbox" class="check" tabindex="-1" aria-hidden="true" ${sel ? 'checked' : ''}>` : ''}<span>${hl(o.t, q)}</span>${o.m ? `<small>${esc(o.m)}</small>` : ''}</div>`;
      }).join('');
      if (create && q && !all.some((o) => o.t.toLowerCase() === q.toLowerCase())) html += `<div class="option create" role="option" id="${id}-new" data-t="${esc(q)}" data-new="1">${svg('plus')}<span>Добавить «${esc(q)}»</span></div>`;
      if (!html) html = `<div class="option empty">Ничего не найдено</div>`;
      list.innerHTML = html; items = [...list.querySelectorAll('.option:not(.empty)')];
      setActive(q || !multi ? 0 : -1);
    };
    const setActive = (i) => { active = i; items.forEach((o, k) => o.classList.toggle('active', k === i)); if (items[i]) { inp.setAttribute('aria-activedescendant', items[i].id); reveal(list, items[i]) } else inp.removeAttribute('aria-activedescendant') };
    const isOpen = () => list.classList.contains('open');
    let typed = false;
    /* Сенсорный экран: первое нажатие только открывает список — поле readonly, клавиатура не выезжает и не закрывает пол-экрана.
       Искать — второе нажатие в поле: снимаем readonly и заново ставим фокус, клавиатура открывается. Список закрылся — снова readonly */
    const touch = matchMedia('(pointer: coarse)').matches;
    const lock = (on) => { if (!touch) return; inp.readOnly = on; inp.placeholder = picked?.length ? '' : on ? (inp.dataset.ph ??= inp.placeholder) : 'Поиск' };
    const open = () => { if (isOpen()) return; typed = false; render(); if (!multi && !inp.readOnly) inp.select(); flip(list, c, 296); list.classList.add('open'); inp.setAttribute('aria-expanded', 'true') };
    const close = () => { list.classList.remove('open'); inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); lock(true) };
    const tags = (first) => {
      const before = one && !first ? widths() : null;
      const live = [...box.querySelectorAll('.tag')].filter((t) => !t._out), have = live.map((t) => t.dataset.t);
      const gap = parseFloat(getComputedStyle(box).columnGap) || 0;
      // ушедшие — сжимаются по ширине, поле меняет высоту плавно, если строка тегов схлопнулась
      live.forEach((t) => { t.classList.remove('armed'); if (!picked.includes(t.dataset.t)) { t._out = 1; tagOut(t, gap, () => resize(box, () => t.remove())) } });
      // новые — добавляются в конец со своей анимацией входа; поле растёт плавно, если тег ушёл на новую строку
      const add = picked.filter((v) => !have.includes(v));
      if (add.length) { const put = () => add.forEach((v) => (more || inp).insertAdjacentHTML('beforebegin', `<span class="tag${first ? ' still' : ''}" data-t="${esc(v)}"><span>${esc(v)}</span><button type="button" tabindex="-1" aria-label="Убрать ${esc(v)}">${svg('x')}</button></span>`)); first ? put() : resize(box, put) }
      inp.placeholder = picked.length ? '' : (inp.dataset.ph ??= inp.placeholder);
      c.dataset.value = picked.join('|'); armed = false;
      fit(!first, before);
    };
    // выбор в открытом списке: пункты обновляются на месте — флажок ставится своей анимацией
    const mark = () => items.forEach((o) => { const on = picked.includes(o.dataset.t); o.setAttribute('aria-selected', on); const cb = o.querySelector('.check'); if (cb) cb.checked = on });
    const choose = (o) => {
      if (!o) return; const t = o.dataset.t;
      if (o.dataset.new) all.push({ t });
      if (multi) { picked = picked.includes(t) ? picked.filter((x) => x !== t) : [...picked, t]; const q = inp.value; inp.value = ''; tags(); if (q) resize(list, render); else mark(); setActive(Math.max(0, items.findIndex((x) => x.dataset.t === t))) }
      else { c.dataset.value = t; inp.value = t; close() }
      fire(c, 'change', { value: multi ? picked : t });
    };
    inp.addEventListener('focus', open);
    // фильтр: высота списка меняется плавно, а не прыжком
    inp.addEventListener('input', () => { typed = true; if (isOpen()) resize(list, render); else open(); if (!multi && !inp.value) { delete c.dataset.value } });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (!isOpen()) open(); else setActive(Math.min(items.length - 1, active + 1)) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(0, active - 1)) }
      else if (e.key === 'Enter') { if (isOpen() && items[active]) { e.preventDefault(); choose(items[active]) } }
      else if (e.key === 'Escape') { if (isOpen()) { e.preventDefault(); close() } else if (!multi) { inp.value = ''; delete c.dataset.value } }
      else if (e.key === 'Tab') close();
      // Backspace в пустом поле: первый раз подсвечивает последний тег, второй — удаляет
      else if (multi && e.key === 'Backspace' && !inp.value && picked.length) {
        const last = [...box.querySelectorAll('.tag')].filter((t) => !t._out).pop();
        // последний тег свёрнут в «+N» — «на взвод» подсвечивается счётчик
        if (armed) { picked.pop(); tags(); mark(); fire(c, 'change', { value: picked }) } else { armed = true; (last.hidden ? more : last).classList.add('armed') }
      } else if (armed) { armed = false; box.querySelectorAll('.armed').forEach((x) => x.classList.remove('armed')) }
    });
    // одиночный: ушли из поля с текстом, которого нет в списке — возвращаем выбранное
    inp.addEventListener('blur', () => setTimeout(() => { if (c.contains(document.activeElement)) return; close(); if (!multi) inp.value = c.dataset.value || '' }, 0));
    list.addEventListener('pointerdown', (e) => e.preventDefault());
    list.addEventListener('pointermove', (e) => { const o = e.target.closest('.option'); const i = items.indexOf(o); if (i >= 0 && i !== active) setActive(i) });
    list.addEventListener('click', (e) => choose(e.target.closest('.option:not(.empty)')));
    if (multi) {
      box.addEventListener('pointerdown', (e) => { if (e.target === box) { e.preventDefault(); inp.focus(); open() } });
      box.addEventListener('click', (e) => { const b = e.target.closest('.tag button'); if (!b) return; const t = b.closest('.tag').dataset.t; picked = picked.filter((x) => x !== t); tags(); if (isOpen()) mark(); inp.focus(); fire(c, 'change', { value: picked }) });
      tags(true);
    } else if (c.dataset.value) inp.value = c.dataset.value;
    document.addEventListener('pointerdown', (e) => { if (!c.contains(e.target)) close() });
    // стрелка: открыта — закрывает, закрыта — открывает; фокус остаётся в поле
    c.querySelector('.chev').addEventListener('pointerdown', (e) => { e.preventDefault(); if (isOpen()) close(); else { inp.focus(); open() } });
    // клик по полю в фокусе (например, после Esc) снова открывает список; на телефоне второе нажатие при открытом списке включает поиск
    let wasOpen = false;   // список открывается уже на фокусе — к клику он открыт; поиск включаем, только если был открыт до касания
    inp.addEventListener('pointerdown', () => { wasOpen = isOpen() });
    inp.addEventListener('click', () => {
      if (!isOpen()) open();
      else if (touch && inp.readOnly && wasOpen) { lock(false); if (!multi) inp.select(); inp.blur(); inp.focus({ preventScroll: true }) }
    });
    lock(true);
  }

  /* ===== Выбор даты =====
     <div class="date" data-mode="single|range" [data-value="2026-11-05" | "2026-11-01..2026-11-07"] [data-min] [data-max] [data-placeholder]>
     Значение: data-value (ISO), событие change {from, to}. Неделя с понедельника, подписи — по-русски. */
  const MN = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const MG = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = (s) => { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) };
  const addD = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const addM = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);
  const same = (a, b) => a && b && a.getTime() === b.getTime();
  const plural = (n, f) => f[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  const human = (d, year = true) => `${d.getDate()} ${MG[d.getMonth()]}${year ? ' ' + d.getFullYear() : ''}`;
  const today = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()) };

  function datePicker(w) {
    if (!once(w, 'ui')) return;
    const range = w.dataset.mode === 'range', id = 'dp' + ++uid;
    const min = parse(w.dataset.min), max = parse(w.dataset.max);
    let [from, to] = (w.dataset.value || '').split('..').map(parse);
    if (!range) to = null;
    let view = new Date((from || today()).getFullYear(), (from || today()).getMonth(), 1), focus = from || today(), hover = null;
    let draft = [from, to];                                  // диапазон применяется кнопкой «Применить»
    const presets = range ? [['Сегодня', 0, 0], ['Последние 7 дней', -6, 0], ['Последние 30 дней', -29, 0], ['Этот месяц', 'm'], ['Прошлый месяц', 'pm']] : [];

    w.innerHTML = `<button type="button" class="input date-trigger" aria-haspopup="dialog" aria-expanded="false" aria-controls="${id}" ${w.dataset.label ? `aria-label="${esc(w.dataset.label)}"` : ''}>${svg('cal')}<span class="value"></span></button>
      <div class="menu cal-pop" id="${id}" role="dialog" aria-label="${range ? 'Выбор периода' : 'Выбор даты'}">
        ${range ? `<div class="cal-presets">${presets.map((p, i) => `<button type="button" class="menu-item" data-p="${i}">${p[0]}</button>`).join('')}</div>` : ''}
        <div class="cal-body"><div class="cal-months"></div>
        ${range ? `<div class="cal-foot"><span class="hint"></span><div class="btn-row"><button type="button" class="btn btn-ghost btn-sm" data-act="reset">Сбросить</button><button type="button" class="btn btn-primary btn-sm" data-act="apply">Применить</button></div></div>` : ''}</div>
      </div>`;
    const trig = w.querySelector('.date-trigger'), pop = w.querySelector('.cal-pop'), months = pop.querySelector('.cal-months'), foot = pop.querySelector('.cal-foot .hint');
    if (w.id) { const l = document.querySelector(`label[for="${w.id}"], [data-label-for="${w.id}"]`); if (l) { l.id ||= id + '-l'; trig.setAttribute('aria-labelledby', `${l.id} ${id}-v`); trig.querySelector('.value').id = id + '-v' } }

    const two = () => range && matchMedia('(min-width: 641px)').matches;
    const off = (d) => (min && d < min) || (max && d > max);
    const label = () => {
      const v = trig.querySelector('.value');
      const ph = w.dataset.placeholder || (range ? 'Выберите период' : 'Выберите дату');
      if (!from) { v.textContent = ph; v.classList.add('placeholder'); return }
      v.classList.remove('placeholder');
      v.textContent = !range ? human(from) : !to || same(from, to) ? human(from) : `${human(from, from.getFullYear() !== to.getFullYear())} — ${human(to)}`;
    };
    const month = (base) => {
      const first = (base.getDay() + 6) % 7, start = addD(base, -first), t = today();
      let cells = '';
      for (let i = 0; i < 42; i++) {
        const d = addD(start, i), out = d.getMonth() !== base.getMonth();
        if (out && two()) { cells += '<div class="cal-cell"></div>'; continue }   // в двух месяцах «чужие» дни не дублируем
        cells += `<div class="cal-cell" role="gridcell"><button type="button" class="cal-day${out ? ' out' : ''}${same(d, t) ? ' today' : ''}" data-d="${iso(d)}" tabindex="-1" aria-selected="false" ${off(d) ? 'disabled' : ''} aria-label="${human(d)}">${d.getDate()}</button></div>`;
      }
      return `<div class="cal"><div class="cal-grid" role="grid" aria-label="${MN[base.getMonth()]} ${base.getFullYear()}">${WD.map((x) => `<div class="cal-wd">${x}</div>`).join('')}${cells}</div></div>`;
    };
    const draw = (dir) => {
      const n = two() ? 2 : 1, ms = [...Array(n)].map((_, i) => addM(view, i));
      months.innerHTML = ms.map(month).join('');
      // заголовок со стрелками над каждым месяцем: ← у первого, → у последнего
      months.querySelectorAll('.cal').forEach((cal, i) => cal.insertAdjacentHTML('afterbegin', `<div class="cal-head">${i === 0 ? `<button type="button" class="icon-btn" data-nav="-1" aria-label="Предыдущий месяц">${svg('l')}</button>` : '<span class="spacer"></span>'}<span class="cal-title" aria-live="polite">${MN[ms[i].getMonth()]} ${ms[i].getFullYear()}</span>${i === n - 1 ? `<button type="button" class="icon-btn" data-nav="1" aria-label="Следующий месяц">${svg('r')}</button>` : '<span class="spacer"></span>'}</div>`));
      if (dir) { months.classList.remove('slide-l', 'slide-r'); months.offsetWidth; months.classList.add(dir < 0 ? 'slide-l' : 'slide-r') }
      paint(true);
    };
    // состояние дней — на месте: подложка выбранного и полоса диапазона появляются и сдвигаются плавно
    const paint = (fresh) => {
      const [a, b0] = draft, b = b0 || (a && hover && hover > a ? hover : null);
      months.classList.toggle('instant', !!fresh);            // только что построенная сетка — без переходов
      months.querySelectorAll('.cal-day').forEach((btn) => {
        const d = parse(btn.dataset.d), cell = btn.parentElement;
        btn.setAttribute('aria-selected', range ? !!(same(d, a) || same(d, b)) : !!same(d, from));
        btn.tabIndex = same(d, focus) ? 0 : -1;
        // в одном месяце полоса идёт и по дням соседнего — без разрыва
        const on = range && a && b;
        cell.classList.toggle('from', !!(on && same(d, a))); cell.classList.toggle('to', !!(on && same(d, b))); cell.classList.toggle('in', !!(on && d > a && d < b));
      });
      if (fresh) { months.offsetWidth; months.classList.remove('instant') }
      if (foot) { const [x, y] = draft; foot.textContent = x && y ? `${human(x, false)} — ${human(y, false)} · ${(y - x) / 864e5 + 1} ${plural((y - x) / 864e5 + 1, ['день', 'дня', 'дней'])}` : x ? 'Выберите конец периода' : 'Выберите начало периода' }
      pop.querySelectorAll('.cal-presets [data-p]').forEach((p) => p.setAttribute('aria-pressed', 'false'));
    };
    // сторона (от левого или правого края поля) — и для ЗАКРЫТОГО календаря: невидимый, он всё равно занимает место,
    // и два месяца у правого края расширяли страницу (прокрутка вбок на 961–1100px). Пересчёт — при загрузке и смене ширины
    const side = () => { const r = trig.getBoundingClientRect(); pop.classList.toggle('right', r.left + pop.offsetWidth > document.documentElement.clientWidth - 16 && r.right - pop.offsetWidth > 16) };
    let sideRaf = 0; const sideLater = () => { cancelAnimationFrame(sideRaf); sideRaf = requestAnimationFrame(() => { if (!isOpen()) side() }) };
    addEventListener('resize', sideLater); document.fonts?.ready.then(sideLater); sideLater();
    const isOpen = () => pop.classList.contains('open');
    const open = () => {
      if (isOpen()) return; draft = [from, to]; focus = from || today(); view = new Date(focus.getFullYear(), focus.getMonth(), 1);
      draw(); side();
      flip(pop, trig, pop.offsetHeight + 16); pop.classList.add('open'); trig.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(() => pop.querySelector('.cal-day[tabindex="0"]')?.focus({ preventScroll: true }));
    };
    const close = (back) => { if (!isOpen()) return; pop.classList.remove('open'); trig.setAttribute('aria-expanded', 'false'); hover = null; if (back) trig.focus() };
    const commit = () => {
      [from, to] = range ? draft : [draft[0], null];
      w.dataset.value = from ? (range ? `${iso(from)}..${iso(to || from)}` : iso(from)) : '';
      if (range && from && !to) to = from;
      label(); fire(w, 'change', { from: from && iso(from), to: to && iso(to) });
    };
    const pick = (d) => {
      if (!range) { draft = [d, null]; commit(); paint(); close(true); return }
      const [a, b] = draft;
      draft = !a || b || d < a ? [d, null] : [a, d]; focus = d; hover = null; paint();
      pop.querySelector(`[data-d="${iso(d)}"]`)?.focus({ preventScroll: true });
    };
    const moveFocus = (d) => {
      if (off(d)) return; focus = d;
      const last = addM(view, two() ? 2 : 1);
      if (d < view) { view = new Date(d.getFullYear(), d.getMonth(), 1); draw(-1) } else if (d >= last) { view = addM(new Date(d.getFullYear(), d.getMonth(), 1), two() ? -1 : 0); draw(1) } else paint();
      pop.querySelector(`[data-d="${iso(d)}"]`)?.focus({ preventScroll: true });
    };

    trig.addEventListener('click', () => (isOpen() ? close() : open()));
    trig.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); open() } });
    pop.addEventListener('click', (e) => {
      const day = e.target.closest('.cal-day'), nav = e.target.closest('[data-nav]'), p = e.target.closest('[data-p]'), act = e.target.closest('[data-act]');
      if (day) pick(parse(day.dataset.d));
      else if (nav) { view = addM(view, +nav.dataset.nav); focus = new Date(view); draw(+nav.dataset.nav) }
      else if (p) {
        const [, x, y] = presets[p.dataset.p], t = today();
        draft = x === 'm' ? [new Date(t.getFullYear(), t.getMonth(), 1), t] : x === 'pm' ? [addM(t, -1), addD(new Date(t.getFullYear(), t.getMonth(), 1), -1)] : [addD(t, x), addD(t, y)];
        focus = draft[0];
        // месяцы перестраиваются, только если период не виден целиком; иначе полоса просто переезжает
        const shown = (d) => d >= view && d < addM(view, two() ? 2 : 1);
        if (shown(draft[0]) && shown(draft[1])) paint();
        else { const old = view; view = addM(new Date(draft[1].getFullYear(), draft[1].getMonth(), 1), two() && draft[0].getMonth() === draft[1].getMonth() ? -1 : 0); if (draft[0] >= view) view = new Date(draft[0].getFullYear(), draft[0].getMonth(), 1); draw(view < old ? -1 : 1) }
        p.setAttribute('aria-pressed', 'true');
      } else if (act?.dataset.act === 'apply') { if (draft[0] && !draft[1]) draft[1] = draft[0]; commit(); close(true) }
      else if (act?.dataset.act === 'reset') { draft = [null, null]; paint() }
    });
    // наведение во время выбора конца — предпросмотр полосы
    pop.addEventListener('pointerover', (e) => { if (!range || !draft[0] || draft[1]) return; const d = e.target.closest('.cal-day'); const h = d && parse(d.dataset.d); if (!same(h, hover)) { hover = h; paint() } });
    pop.addEventListener('keydown', (e) => {
      const day = e.target.closest('.cal-day');
      if (e.key === 'Escape') { e.preventDefault(); close(true); return }
      if (!day) return;
      const d = parse(day.dataset.d), k = e.key;
      const map = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
      if (map[k]) { e.preventDefault(); moveFocus(addD(d, map[k])) }
      else if (k === 'Home') { e.preventDefault(); moveFocus(addD(d, -((d.getDay() + 6) % 7))) }
      else if (k === 'End') { e.preventDefault(); moveFocus(addD(d, 6 - ((d.getDay() + 6) % 7))) }
      else if (k === 'PageUp' || k === 'PageDown') { e.preventDefault(); const n = new Date(d.getFullYear(), d.getMonth() + (k === 'PageUp' ? -1 : 1), Math.min(d.getDate(), 28)); view = new Date(n.getFullYear(), n.getMonth(), 1); focus = n; draw(k === 'PageUp' ? -1 : 1); pop.querySelector(`[data-d="${iso(n)}"]`)?.focus({ preventScroll: true }) }
    });
    document.addEventListener('pointerdown', (e) => { if (!w.contains(e.target)) close() });
    pop.addEventListener('focusout', (e) => { if (e.relatedTarget && !w.contains(e.relatedTarget)) close() });
    label();
  }

  /* ===== Загрузка файлов =====
     <label class="dz" data-max="10" data-accept="image/*,.pdf"><input type="file" multiple>…</label><ul class="files"></ul>
     Отправку делает приложение: событие files-added {files}; для витрины прогресс имитируется (data-demo). */
  const size = (b) => (b < 1024 ? b + ' Б' : b < 1048576 ? (b / 1024).toFixed(0) + ' КБ' : (b / 1048576).toFixed(1).replace('.', ',') + ' МБ');
  function dropzone(dz) {
    if (!once(dz, 'ui')) return;
    const inp = dz.querySelector('input[type=file]'), list = dz.nextElementSibling?.classList.contains('files') ? dz.nextElementSibling : null;
    const maxB = (+dz.dataset.max || Infinity) * 1048576, acc = (dz.dataset.accept || inp.accept || '').split(',').map((s) => s.trim()).filter(Boolean);
    if (acc.length) inp.accept = acc.join(',');
    const okType = (f) => !acc.length || acc.some((a) => (a.startsWith('.') ? f.name.toLowerCase().endsWith(a) : a.endsWith('/*') ? f.type.startsWith(a.slice(0, -1)) : f.type === a));
    const add = (files) => {
      fire(dz, 'files-added', { files });
      if (!list) return;
      [...files].forEach((f) => {
        const err = !okType(f) ? 'Этот тип не поддерживается' : f.size > maxB ? `Больше ${dz.dataset.max} МБ` : '';
        const li = document.createElement('li'); li.className = 'file' + (err ? ' error' : '');
        li.innerHTML = `<span class="file-ic">${svg(err ? 'err' : f.type.startsWith('image/') ? 'img' : 'file')}</span>
          <div class="file-main"><div class="file-row"><span class="file-name" title="${esc(f.name)}">${esc(f.name)}</span><span class="file-meta">${err || size(f.size)}</span></div>${err ? '' : '<div class="progress"><i></i></div>'}</div>
          <button type="button" class="icon-btn icon-btn-sm" aria-label="Убрать ${esc(f.name)}">${svg('x')}</button>`;
        list.appendChild(li); growIn(li);
        li.querySelector('button').onclick = () => { clearInterval(li._t); shrinkOut(li, () => li.remove()) };
        if (!err && dz.hasAttribute('data-demo')) {
          let p = 0; const bar = li.querySelector('.progress > i'), meta = li.querySelector('.file-meta');
          li._t = setInterval(() => {
            p = Math.min(1, p + 0.08 + Math.random() * 0.12); bar.style.setProperty('--p', p);
            meta.textContent = p < 1 ? `${Math.round(p * 100)}%` : size(f.size);
            // готово: полоса гаснет, строка плавно становится ниже, иконка меняется кроссфейдом
            if (p >= 1) { clearInterval(li._t); setTimeout(() => { resize(li, () => li.classList.add('done'), 220); swapIcon(li.querySelector('.file-ic'), svg('ok')) }, 280) }
          }, 180);
        }
      });
    };
    inp.addEventListener('change', () => { add(inp.files); inp.value = '' });
    dz.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inp.click() } });
    let depth = 0;   // dragenter/leave приходят и от вложенных элементов — считаем глубину, чтобы рамка не мигала
    dz.addEventListener('dragenter', (e) => { e.preventDefault(); depth++; dz.classList.add('over') });
    dz.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy' });
    dz.addEventListener('dragleave', () => { if (--depth <= 0) { depth = 0; dz.classList.remove('over') } });
    dz.addEventListener('drop', (e) => { e.preventDefault(); depth = 0; dz.classList.remove('over'); add(e.dataTransfer.files) });
  }
  // файл, брошенный мимо зоны, не должен открываться во вкладке
  addEventListener('dragover', (e) => { if (!e.target.closest?.('.dz')) e.preventDefault() });
  addEventListener('drop', (e) => { if (!e.target.closest?.('.dz')) e.preventDefault() });

  /* ===== Кнопка «Скопировать» (data-copy="текст") ===== */
  function copyBtn(b) {
    if (!once(b, 'ui')) return;
    b.classList.add('copy-btn');
    b.innerHTML = '<svg class="lucide i-copy" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>'
      + '<svg class="lucide i-ok" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path pathLength="1" d="M20 6 9 17l-5-5"/></svg>';
    const label = b.getAttribute('aria-label') || 'Копировать';
    let t;
    b.addEventListener('click', () => {
      // не ждём буфер обмена: writeText может висеть (фокус, разрешение) — отклик на клик должен быть сразу
      navigator.clipboard?.writeText(b.dataset.copy || '').catch(() => {});
      b.classList.add('done'); b.setAttribute('aria-label', 'Скопировано');
      clearTimeout(t); t = setTimeout(() => { b.classList.remove('done'); b.setAttribute('aria-label', label) }, 1600);
    });
  }

  /* ===== Загрузка кнопки: btnLoading(btn, true|false) ===== */
  window.btnLoading = (b, on) => {
    clearTimeout(b._settle);
    if (on) { b.classList.remove('is-settling'); b.classList.add('is-loading'); b.setAttribute('aria-busy', 'true'); return }
    b.classList.remove('is-loading'); b.removeAttribute('aria-busy');
    b.classList.add('is-settling'); b._settle = setTimeout(() => b.classList.remove('is-settling'), 320);   // докручивается, пока гаснет
  };

  /* ===== Кнопка с подтверждением: data-done="Итог", data-load="мс" (сначала загрузка), data-copy="текст" ===== */
  const CHECK = '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path pathLength="1" d="M20 6 9 17l-5-5"/></svg>';
  function doneBtn(b) {
    if (!once(b, 'ui')) return;
    const a = document.createElement('span'); a.className = 'lb-a';
    while (b.firstChild) a.appendChild(b.firstChild);
    const st = document.createElement('span'); st.className = 'btn-stack';
    st.append(a); st.insertAdjacentHTML('beforeend', `<span class="lb-b" aria-hidden="true">${CHECK}<span>${esc(b.dataset.done)}</span></span>`);
    b.append(st);
    const bb = st.lastChild; let t;
    const set = (on) => { b.classList.toggle('done', on); a.setAttribute('aria-hidden', on); bb.setAttribute('aria-hidden', !on) };
    b.addEventListener('click', () => {
      if (b.classList.contains('is-loading')) return;
      clearTimeout(t);
      if ('copy' in b.dataset) navigator.clipboard?.writeText(b.dataset.copy).catch(() => {});
      const finish = () => { set(true); t = setTimeout(() => set(false), +(b.dataset.doneFor || 2000)) };
      if (b.dataset.load) { set(false); btnLoading(b, true); t = setTimeout(() => { btnLoading(b, false); finish() }, +b.dataset.load) }
      else finish();
    });
  }

  /* ===== Сегменты .seg и вкладки .tabs: одна плашка .thumb / линия .line едет к выбранному =====
     Выбор пользователем — событие pick на .seg/.tabs (detail — кнопка; по уже выбранной не приходит).
     Задать из кода: box.select(кнопка, anim). Вкладки: стрелки ←/→, Home/End, фокус только у выбранной. */
  function rail(box) {
    if (!once(box, 'rail')) return;
    const tabs = box.classList.contains('tabs'), attr = tabs ? 'aria-selected' : 'aria-pressed';
    const mark = box.querySelector(tabs ? ':scope > .line' : ':scope > .thumb');
    const items = [...box.querySelectorAll(tabs ? '.tab' : ':scope > button')];
    if (!mark || !items.length) return;
    const cur = () => items.find((x) => x.getAttribute(attr) === 'true') || items[0];
    const place = (el, anim) => {
      box.classList.toggle('no-anim', !anim);
      mark.style.setProperty('--x', el.offsetLeft + 'px'); mark.style.setProperty('--w', el.offsetWidth + 'px');
      if (!anim) requestAnimationFrame(() => box.classList.remove('no-anim'));
    };
    const rove = (el) => { if (tabs) items.forEach((x) => { x.tabIndex = x === el ? 0 : -1 }) };
    const show = (el, anim) => { if (tabs && box.scrollWidth > box.clientWidth) box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: anim ? 'smooth' : 'instant' }) };   // выбранная вкладка не остается за краем
    box.select = (el, anim = true) => { items.forEach((x) => x.setAttribute(attr, x === el)); rove(el); place(el, anim); show(el, anim) };
    const pick = (el) => { if (el.getAttribute(attr) === 'true') return; box.select(el); fire(box, 'pick', el) };
    items.forEach((el) => el.addEventListener('click', () => pick(el)));
    if (tabs) box.addEventListener('keydown', (e) => {
      const i = items.indexOf(document.activeElement); if (i < 0) return;
      const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : null;
      if (n === null) return;
      e.preventDefault(); const el = items[(n + items.length) % items.length]; el.focus(); pick(el);
    });
    rove(cur());
    document.fonts.ready.then(() => place(cur(), false));
    new ResizeObserver(() => place(cur(), false)).observe(box);   // ширина шрифта, перестройка, показ скрытого блока
  }

  window.initInputs = (root = document) => {
    const each = (s, f) => root.querySelectorAll(s).forEach(f);
    each('.search', search); each('.pw', password); each('.otp', otp); each('.stepper', stepper); each('.slider', slider);
    each('.tgl', toggles); each('.color', color); each('.combo', combo); each('.date', datePicker); each('.dz', dropzone); each('.icon-btn[data-copy]', copyBtn); each('.btn[data-done]', doneBtn); each('.seg, .tabs', rail);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initInputs()); else initInputs();
})();

;
// ../ds/js/data.js
/* Данные и обратная связь · поведение к tokens/data.css.
   Подключение: <script src="js/data.js" defer></script>; для новой разметки — initData(root).
   API: setCount(el, n) — счётчик со сменой числа сдвигом. */
(() => {
  const EASE = 'cubic-bezier(.23,1,.32,1)', INOUT = 'cubic-bezier(.77,0,.175,1)';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const once = (el, k) => { if (el.dataset[k]) return false; el.dataset[k] = '1'; return true };
  const P = {
    updown: '<path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>', up: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    chev: '<path d="m6 9 6 6 6-6"/>'
  };
  const svg = (n, cls = '') => `<svg class="lucide ${cls}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const fmt = (v) => (+v).toLocaleString('ru-RU');
  const short = (v) => v >= 1e6 ? (v / 1e6).toLocaleString('ru-RU', { maximumFractionDigits: 1 }) + ' млн' : v >= 1e4 ? (v / 1e3).toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + ' тыс' : fmt(v);
  const nice = (x) => { const p = 10 ** Math.floor(Math.log10(x || 1)), f = x / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p };
  let uid = 0;

  /* Смена числа: старое уходит вверх (или вниз при уменьшении), новое приходит с другой стороны */
  const swapNum = (box, text, dir) => {
    const cur = box.lastElementChild;
    if (cur && cur.textContent === text) return;
    const nx = document.createElement('span'); nx.textContent = text; box.append(nx);
    if (!cur) return;
    if (reduce.matches) { cur.remove(); return }
    cur.animate([{ transform: 'none', opacity: 1 }, { transform: `translateY(${-dir * 100}%)`, opacity: 0 }], { duration: 240, easing: EASE, fill: 'forwards' }).onfinish = () => cur.remove();
    nx.animate([{ transform: `translateY(${dir * 100}%)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 240, easing: EASE });
  };
  window.setCount = (el, n) => {
    const old = +(el.dataset.n || 0); el.dataset.n = n;
    el.classList.toggle('zero', n <= 0);
    el.setAttribute('aria-label', n > 0 ? `${n} непрочитанных` : 'Нет непрочитанных');
    if (n <= 0) return;                                           // ноль — гаснет, прежнее число остаётся, пока гаснет
    const t = n > 99 ? '99+' : String(n);
    if (old <= 0) { el.replaceChildren(Object.assign(document.createElement('span'), { textContent: t })); return }
    swapNum(el, t, n > old ? 1 : -1);
  };

  /* ===== Аккордеон: высота плавно, можно прервать на середине; data-single — открыт один ===== */
  function acc(root) {
    if (!once(root, 'da')) return;
    const items = [...root.querySelectorAll('.acc-item')];
    const toggle = (d, open) => {
      const s = d.querySelector('summary'), from = d.offsetHeight;
      d._a?.cancel();
      if (open) { d.open = true; d.classList.add('is-open') } else d.classList.remove('is-open');
      if (reduce.matches) { if (!open) d.open = false; return }
      const to = open ? d.scrollHeight : s.offsetHeight;
      d._a = d.animate([{ height: from + 'px' }, { height: to + 'px' }], { duration: open ? 280 : 200, easing: EASE });
      if (open) d.querySelector('.acc-body')?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, delay: 40, easing: EASE, fill: 'backwards' });
      d._a.onfinish = () => { d._a = null; if (!open) d.open = false };
    };
    items.forEach((d) => {
      if (d.open) d.classList.add('is-open');
      const s = d.querySelector('summary');
      if (!s.querySelector('svg')) s.insertAdjacentHTML('beforeend', svg('chev'));
      s.addEventListener('click', (e) => {
        e.preventDefault(); const open = !d.classList.contains('is-open');
        if (open && root.hasAttribute('data-single')) items.forEach((o) => o !== d && o.classList.contains('is-open') && toggle(o, false));
        toggle(d, open);
      });
    });
  }

  /* ===== Таблица: сортировка (строки переезжают на новые места), выбор, действия над выбранными ===== */
  function dt(root) {
    if (!once(root, 'da')) return;
    const table = root.querySelector('table'), tbody = table.tBodies[0], bulk = root.querySelector('.bulk'), all = table.querySelector('thead .check');
    const flip = (rows, change) => {
      const before = new Map(rows.map((r) => [r, r.getBoundingClientRect().top]));
      change();
      if (reduce.matches) return;
      rows.forEach((r) => { if (!r.isConnected) return; const dy = before.get(r) - r.getBoundingClientRect().top;
        if (Math.abs(dy) > .5) r.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 360, easing: INOUT }) });
    };
    // сортировка
    table.querySelectorAll('th[data-sort]').forEach((th) => {
      const lab = th.textContent.trim();
      th.innerHTML = `<button type="button" class="th-sort">${esc(lab)}<span class="sort-ic">${svg('updown', 'idle')}${svg('up', 'dir')}</span></button>`;
      th.setAttribute('aria-sort', 'none');
      th.querySelector('button').addEventListener('click', () => {
        const dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
        table.querySelectorAll('th[aria-sort]').forEach((x) => x.setAttribute('aria-sort', 'none')); th.setAttribute('aria-sort', dir);
        const i = th.cellIndex, num = th.dataset.sort === 'num';
        const key = (r) => { const c = r.cells[i], v = c.dataset.v ?? c.textContent.trim(); return num ? parseFloat(String(v).replace(/[\s ]/g, '').replace(',', '.')) || 0 : v.toLowerCase() };
        const rows = [...tbody.rows];
        const sorted = [...rows].sort((a, b) => { const x = key(a), y = key(b); return (x > y ? 1 : x < y ? -1 : 0) * (dir === 'ascending' ? 1 : -1) });
        flip(rows, () => tbody.append(...sorted));
      });
    });
    // выбор
    let last = -1;
    const boxes = () => [...tbody.querySelectorAll('.check')];
    const sync = () => {
      const b = boxes(), n = b.filter((x) => x.checked).length;
      b.forEach((x) => x.closest('tr').classList.toggle('sel', x.checked));
      if (all) { all.checked = n > 0 && n === b.length; all.indeterminate = n > 0 && n < b.length }
      if (bulk) {
        bulk.classList.toggle('on', n > 0);
        const nb = bulk.querySelector('.bulk-n b'), tot = bulk.querySelector('.bulk-n i');
        if (n > 0 && nb) { const old = +nb.dataset.n || 0; nb.dataset.n = n; if (!nb.firstElementChild) nb.innerHTML = `<span>${n}</span>`; else swapNum(nb, String(n), n > old ? 1 : -1) }
        if (tot) tot.textContent = b.length;
      }
    };
    tbody.addEventListener('click', (e) => {
      const cb = e.target.closest('.check'); if (!cb) return;
      const b = boxes(), i = b.indexOf(cb);
      if (e.shiftKey && last >= 0) { const [a, z] = [Math.min(last, i), Math.max(last, i)]; b.slice(a, z + 1).forEach((x) => (x.checked = cb.checked)) }
      last = i; sync();
    });
    all?.addEventListener('change', () => { boxes().forEach((x) => (x.checked = all.checked)); sync() });
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && boxes().some((x) => x.checked)) { boxes().forEach((x) => (x.checked = false)); sync() } });
    // действия: data-bulk="clear" | "remove" (уходят из таблицы, можно вернуть)
    bulk?.querySelectorAll('[data-bulk]').forEach((btn) => btn.addEventListener('click', () => {
      const act = btn.dataset.bulk, sel = boxes().filter((x) => x.checked).map((x) => x.closest('tr'));
      if (act === 'clear') { boxes().forEach((x) => (x.checked = false)); sync(); return }
      const pos = sel.map((r) => [r, r.previousElementSibling]);
      sel.forEach((r) => r.classList.add('gone'));
      setTimeout(() => {
        const rest = [...tbody.rows].filter((r) => !sel.includes(r));
        flip(rest, () => sel.forEach((r) => r.remove()));
        sel.forEach((r) => { r.classList.remove('gone', 'sel'); r.querySelector('.check').checked = false });
        sync();
        root.dispatchEvent(new CustomEvent('bulk', { detail: { action: act, rows: sel, label: btn.textContent.trim(),
          undo: () => { const rows = [...tbody.rows]; flip(rows, () => pos.reverse().forEach(([r, prev]) => (prev && prev.isConnected ? prev.after(r) : tbody.prepend(r))));
            sel.forEach((r) => r.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, easing: EASE })); sync() } } }));
      }, 150);
    }));
    sync();
  }

  /* ===== Графики: data-type="bar" | "line", data-values, data-labels, data-unit; data-views — id переключателя «График/Таблица» ===== */
  function chart(el) {
    if (!once(el, 'da')) return;
    const vals = el.dataset.values.split(',').map(Number), labs = el.dataset.labels.split(','), unit = el.dataset.unit || '', H = +el.dataset.h || 220, line = el.dataset.type === 'line';
    const id = 'ch' + ++uid, title = el.getAttribute('aria-label') || '';
    el.tabIndex = 0; el.setAttribute('role', 'img');
    el.setAttribute('aria-label', `${title}. ${labs[0]} — ${labs.at(-1)}, от ${fmt(Math.min(...vals))} до ${fmt(Math.max(...vals))}${unit}. Стрелки — по значениям.`);
    const tip = document.createElement('div'); tip.className = 'chart-tip'; tip.setAttribute('aria-live', 'polite');
    let g = {}, cur = -1;
    const draw = () => {
      const W = el.clientWidth; if (!W) return;
      const L = 44, T = 8, B = 24, iw = W - L, ih = H - T - B, y0 = T + ih;
      const step = nice(Math.max(...vals) / 5), nt = Math.ceil(Math.max(...vals) / step), max = step * nt;   // шкала до ближайшего круглого, столбцы занимают высоту
      const Y = (v) => y0 - (ih * v) / max;
      let s = `<svg height="${H}" aria-hidden="true"><defs><linearGradient id="${id}g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" style="stop-color:var(--accent-text);stop-opacity:.22"/><stop offset="1" style="stop-color:var(--accent-text);stop-opacity:0"/></linearGradient></defs><g class="grid">`;
      for (let t = 0; t <= nt; t++) { const y = Math.round(Y(step * t)) + .5; s += `<line x1="${L}" x2="${W}" y1="${y}" y2="${y}"${t === 0 ? ' class="base"' : ''}/>` }
      s += '</g><g class="ax">';
      for (let t = 0; t <= nt; t++) s += `<text x="${L - 8}" y="${Y(step * t) + 4}" text-anchor="end">${short(step * t)}</text>`;
      if (line) {
        const X = (i) => L + 8 + ((iw - 16) * i) / (vals.length - 1);
        const k = Math.max(1, Math.round((vals.length - 1) / Math.max(1, Math.floor(iw / 90))));
        for (let i = 0; i < vals.length; i += k) s += `<text x="${X(i)}" y="${H - 6}" text-anchor="${i === 0 ? 'start' : 'middle'}">${esc(labs[i])}</text>`;
        const pts = vals.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`);
        s += `</g><path class="ar" fill="url(#${id}g)" d="M${pts.join('L')}L${X(vals.length - 1)},${y0}L${X(0)},${y0}Z"/><path class="ln" d="M${pts.join('L')}"/>`
          + `<line class="xh" y1="${T}" y2="${y0}"/><circle class="pt" r="4"/></svg>`;
        g = { X, Y, y0, n: vals.length, hitL: L, hitW: iw };
      } else {
        const band = iw / vals.length, bw = Math.max(4, Math.min(28, band * .62)), k = Math.ceil(56 / band);
        for (let i = 0; i < vals.length; i += k) s += `<text x="${L + band * i + band / 2}" y="${H - 6}" text-anchor="middle">${esc(labs[i])}</text>`;
        s += '</g><g>';
        vals.forEach((v, i) => {
          const x = L + band * i + (band - bw) / 2, top = Y(v), h = y0 - top, r = Math.min(4, h, bw / 2);
          s += `<path class="bar" d="M${x},${y0}V${top + r}Q${x},${top} ${x + r},${top}H${x + bw - r}Q${x + bw},${top} ${x + bw},${top + r}V${y0}Z"/>`;
        });
        s += '</g></svg>';
        g = { band, bw, Y, L, y0, n: vals.length, hitL: L, hitW: iw };
      }
      el.innerHTML = s; el.append(tip); cur = -1; el.classList.remove('hovering');
    };
    const set = (i) => {
      if (i === cur) return; cur = i; el.classList.toggle('hovering', i >= 0); if (i < 0) return;
      const v = vals[i]; let cx, cy;
      if (line) { cx = g.X(i); cy = g.Y(v); const xh = el.querySelector('.xh'), pt = el.querySelector('.pt');
        xh.setAttribute('x1', Math.round(cx) + .5); xh.setAttribute('x2', Math.round(cx) + .5); pt.setAttribute('cx', cx); pt.setAttribute('cy', cy) }
      else { el.querySelectorAll('.bar').forEach((b, k) => b.classList.toggle('on', k === i)); cx = g.L + g.band * i + g.band / 2; cy = g.Y(v) }
      tip.innerHTML = `<b>${fmt(v)}${esc(unit)}</b>${esc(labs[i])}`;
      const w = tip.offsetWidth, h = tip.offsetHeight;
      tip.style.transform = `translate(${Math.round(Math.max(0, Math.min(el.clientWidth - w, cx - w / 2)))}px, ${Math.round(Math.max(-h - 4, cy - h - 12))}px)`;
    };
    el.addEventListener('pointermove', (e) => {
      const x = e.clientX - el.getBoundingClientRect().left - g.hitL; if (x < 0) return set(-1);
      set(line ? Math.max(0, Math.min(g.n - 1, Math.round((x - 8) / (g.hitW - 16) * (g.n - 1)))) : Math.max(0, Math.min(g.n - 1, Math.floor(x / g.band))));
    });
    el.addEventListener('pointerleave', () => set(-1)); el.addEventListener('blur', () => set(-1));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); set(Math.max(0, Math.min(vals.length - 1, cur + (e.key === 'ArrowRight' ? 1 : -1) + (cur < 0 && e.key === 'ArrowLeft' ? vals.length + 1 : 0)))) }
      if (e.key === 'Escape') set(-1);
    });
    new ResizeObserver(draw).observe(el);
    // табличный вид — те же данные
    const tg = el.dataset.views && document.getElementById(el.dataset.views);
    if (tg) {
      const wrap = document.createElement('div'); wrap.className = 'table-wrap chart-table'; wrap.hidden = true;
      wrap.innerHTML = `<table class="table"><thead><tr><th>${esc(el.dataset.col || 'Период')}</th><th class="num">${esc(title)}</th></tr></thead><tbody>${vals.map((v, i) => `<tr><td>${esc(labs[i])}</td><td class="num">${fmt(v)}${esc(unit)}</td></tr>`).join('')}</tbody></table>`;
      el.after(wrap);
      tg.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => {
        const t = b.dataset.view === 'table', show = t ? wrap : el; if (!show.hidden) return;
        wrap.hidden = !t; el.hidden = t; if (!t) draw();
        if (!reduce.matches) show.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: EASE });
      }));
    }
  }
  // искра в карточке с цифрой: тренд без осей, конец отмечен точкой
  function spark(el) {
    if (!once(el, 'da')) return;
    const vals = el.dataset.values.split(',').map(Number), id = 'sp' + ++uid;
    const draw = () => {
      const W = el.clientWidth, H = el.clientHeight || 40; if (!W) return;
      const lo = Math.min(...vals), hi = Math.max(...vals), X = (i) => 2 + ((W - 6) * i) / (vals.length - 1), Y = (v) => 4 + (H - 8) * (1 - (v - lo) / (hi - lo || 1));
      const d = vals.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join('L');
      el.innerHTML = `<defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" style="stop-color:var(--accent-text);stop-opacity:.2"/><stop offset="1" style="stop-color:var(--accent-text);stop-opacity:0"/></linearGradient></defs>`
        + `<path d="M${d}L${X(vals.length - 1)},${H}L${X(0)},${H}Z" fill="url(#${id})"/><path class="ln" d="M${d}"/><circle class="end" r="3" cx="${X(vals.length - 1)}" cy="${Y(vals.at(-1))}"/>`;
    };
    el.setAttribute('aria-hidden', 'true');
    new ResizeObserver(draw).observe(el);
  }

  /* ===== Комментарии: реакции, ответ, новый комментарий въезжает плавно ===== */
  function cmts(root) {
    if (!once(root, 'da')) return;
    root.addEventListener('click', (e) => {
      const r = e.target.closest('.react');
      if (r) { const on = r.getAttribute('aria-pressed') !== 'true', n = r.querySelector('.n'), v = +(n.textContent) + (on ? 1 : -1);
        r.setAttribute('aria-pressed', on); if (!n.firstElementChild) n.innerHTML = `<span>${n.textContent}</span>`; swapNum(n, String(v), on ? 1 : -1); return }
      const rp = e.target.closest('.cmt-reply');
      if (rp) { const ta = root.querySelector('.composer textarea'); if (!ta) return; const who = rp.closest('.cmt').querySelector('.cmt-head b').textContent.split(' ')[0];
        ta.value = `@${who} `; ta.focus(); ta.dispatchEvent(new Event('input')) }
    });
    const f = root.querySelector('.composer'); if (!f) return;
    const ta = f.querySelector('textarea'), send = f.querySelector('[type=submit]');
    const upd = () => (send.disabled = !ta.value.trim()); ta.addEventListener('input', upd); upd();
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); f.requestSubmit() } });
    f.addEventListener('submit', (e) => {
      e.preventDefault(); const t = ta.value.trim(); if (!t) return;
      const w = document.createElement('div'); w.className = 'grow-in';
      const body = esc(t).replace(/^@(\S+)/, '<span class="mention">@$1</span>');
      w.innerHTML = `<div><article class="cmt"><span class="avatar avatar-md" data-hue="${f.dataset.hue || 5}">${esc(f.dataset.initials || 'Я')}</span><div class="cmt-main"><header class="cmt-head"><b>${esc(f.dataset.name || 'Вы')}</b><time>только что</time></header><p class="cmt-text">${body}</p></div></article></div>`;
      f.before(w); w.offsetHeight; w.classList.add('on'); ta.value = ''; upd();
      root.dispatchEvent(new CustomEvent('comment', { detail: { text: t } }));
    });
  }

  /* ===== Команда установки во вкладках: npm / pnpm / yarn / bun ===== */
  function codeTabs(c) {
    if (!once(c, 'da')) return;
    const tabs = [...c.querySelectorAll('.code-tab')], code = c.querySelector('pre code'), cp = c.querySelector('[data-copy]');
    const line = (cmd) => { const [b, ...r] = cmd.split(' '); return `<span class="line"><span class="tk-p">$ </span><span class="tk-f">${esc(b)}</span> ${esc(r.join(' '))}</span>` };
    const pick = (t, anim) => {
      tabs.forEach((x) => { x.setAttribute('aria-selected', x === t); x.tabIndex = x === t ? 0 : -1 });
      if (cp) cp.dataset.copy = t.dataset.cmd;
      if (!anim || reduce.matches) { code.innerHTML = line(t.dataset.cmd); return }
      code.classList.add('swap'); setTimeout(() => { code.innerHTML = line(t.dataset.cmd); code.classList.remove('swap') }, 140);
    };
    tabs.forEach((t, i) => { t.setAttribute('role', 'tab'); t.addEventListener('click', () => pick(t, true));
      t.addEventListener('keydown', (e) => { const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); pick(n, true) } }) });
    pick(tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0], false);
  }

  /* ===== Баннер: крестик прячет плавно по высоте ===== */
  function banner(w) {
    if (!once(w, 'da')) return;
    w.querySelector('.banner-x')?.addEventListener('click', () => { w.classList.add('off'); w.dispatchEvent(new CustomEvent('dismiss')) });
  }

  /* ===== Уведомления: клик — прочитано (точка гаснет), счётчик уменьшается ===== */
  function notifs(list) {
    if (!once(list, 'da')) return;
    const cnt = list.dataset.count && document.getElementById(list.dataset.count);
    const sync = () => cnt && setCount(cnt, list.querySelectorAll('.notif:not(.read)').length);
    list.addEventListener('click', (e) => { const n = e.target.closest('.notif'); if (n) { n.classList.add('read'); sync() } });
    list.readAll = () => { list.querySelectorAll('.notif').forEach((n) => n.classList.add('read')); sync() };
    sync();
  }

  window.initData = (root = document) => {
    const each = (s, f) => root.querySelectorAll(s).forEach(f);
    each('.acc', acc); each('.dt', dt); each('.chart[data-values]', chart); each('svg.spark[data-values]', spark); each('.cmts', cmts);
    each('.code[data-tabs]', codeTabs); each('.banner-w', banner); each('.notifs', notifs);
    each('.count[data-n]', (c) => { const n = +c.dataset.n; c.dataset.n = 0; setCount(c, n) });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initData()); else initData();
})();

;
// qr.js
//---------------------------------------------------------------------
//
// QR Code Generator for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
// The word 'QR Code' is registered trademark of
// DENSO WAVE INCORPORATED
//  http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------

var qrcode = function() {

  //---------------------------------------------------------------------
  // qrcode
  //---------------------------------------------------------------------

  /**
   * qrcode
   * @param typeNumber 1 to 40
   * @param errorCorrectionLevel 'L','M','Q','H'
   */
  var qrcode = function(typeNumber, errorCorrectionLevel) {

    var PAD0 = 0xEC;
    var PAD1 = 0x11;

    var _typeNumber = typeNumber;
    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
    var _modules = null;
    var _moduleCount = 0;
    var _dataCache = null;
    var _dataList = [];

    var _this = {};

    var makeImpl = function(test, maskPattern) {

      _moduleCount = _typeNumber * 4 + 17;
      _modules = function(moduleCount) {
        var modules = new Array(moduleCount);
        for (var row = 0; row < moduleCount; row += 1) {
          modules[row] = new Array(moduleCount);
          for (var col = 0; col < moduleCount; col += 1) {
            modules[row][col] = null;
          }
        }
        return modules;
      }(_moduleCount);

      setupPositionProbePattern(0, 0);
      setupPositionProbePattern(_moduleCount - 7, 0);
      setupPositionProbePattern(0, _moduleCount - 7);
      setupPositionAdjustPattern();
      setupTimingPattern();
      setupTypeInfo(test, maskPattern);

      if (_typeNumber >= 7) {
        setupTypeNumber(test);
      }

      if (_dataCache == null) {
        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
      }

      mapData(_dataCache, maskPattern);
    };

    var setupPositionProbePattern = function(row, col) {

      for (var r = -1; r <= 7; r += 1) {

        if (row + r <= -1 || _moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c += 1) {

          if (col + c <= -1 || _moduleCount <= col + c) continue;

          if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
              || (0 <= c && c <= 6 && (r == 0 || r == 6) )
              || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
            _modules[row + r][col + c] = true;
          } else {
            _modules[row + r][col + c] = false;
          }
        }
      }
    };

    var getBestMaskPattern = function() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i += 1) {

        makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(_this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    };

    var setupTimingPattern = function() {

      for (var r = 8; r < _moduleCount - 8; r += 1) {
        if (_modules[r][6] != null) {
          continue;
        }
        _modules[r][6] = (r % 2 == 0);
      }

      for (var c = 8; c < _moduleCount - 8; c += 1) {
        if (_modules[6][c] != null) {
          continue;
        }
        _modules[6][c] = (c % 2 == 0);
      }
    };

    var setupPositionAdjustPattern = function() {

      var pos = QRUtil.getPatternPosition(_typeNumber);

      for (var i = 0; i < pos.length; i += 1) {

        for (var j = 0; j < pos.length; j += 1) {

          var row = pos[i];
          var col = pos[j];

          if (_modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r += 1) {

            for (var c = -2; c <= 2; c += 1) {

              if (r == -2 || r == 2 || c == -2 || c == 2
                  || (r == 0 && c == 0) ) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    };

    var setupTypeNumber = function(test) {

      var bits = QRUtil.getBCHTypeNumber(_typeNumber);

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    };

    var setupTypeInfo = function(test, maskPattern) {

      var data = (_errorCorrectionLevel << 3) | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 6) {
          _modules[i][8] = mod;
        } else if (i < 8) {
          _modules[i + 1][8] = mod;
        } else {
          _modules[_moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 8) {
          _modules[8][_moduleCount - i - 1] = mod;
        } else if (i < 9) {
          _modules[8][15 - i - 1 + 1] = mod;
        } else {
          _modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      _modules[_moduleCount - 8][8] = (!test);
    };

    var mapData = function(data, maskPattern) {

      var inc = -1;
      var row = _moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      var maskFunc = QRUtil.getMaskFunction(maskPattern);

      for (var col = _moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col -= 1;

        while (true) {

          for (var c = 0; c < 2; c += 1) {

            if (_modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
              }

              var mask = maskFunc(row, col - c);

              if (mask) {
                dark = !dark;
              }

              _modules[row][col - c] = dark;
              bitIndex -= 1;

              if (bitIndex == -1) {
                byteIndex += 1;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || _moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    };

    var createBytes = function(buffer, rsBlocks) {

      var offset = 0;

      var maxDcCount = 0;
      var maxEcCount = 0;

      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);

      for (var r = 0; r < rsBlocks.length; r += 1) {

        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;

        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);

        dcdata[r] = new Array(dcCount);

        for (var i = 0; i < dcdata[r].length; i += 1) {
          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
        }
        offset += dcCount;

        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i += 1) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;
        }
      }

      var totalCodeCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalCodeCount += rsBlocks[i].totalCount;
      }

      var data = new Array(totalCodeCount);
      var index = 0;

      for (var i = 0; i < maxDcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < dcdata[r].length) {
            data[index] = dcdata[r][i];
            index += 1;
          }
        }
      }

      for (var i = 0; i < maxEcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < ecdata[r].length) {
            data[index] = ecdata[r][i];
            index += 1;
          }
        }
      }

      return data;
    };

    var createData = function(typeNumber, errorCorrectionLevel, dataList) {

      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);

      var buffer = qrBitBuffer();

      for (var i = 0; i < dataList.length; i += 1) {
        var data = dataList[i];
        buffer.put(data.getMode(), 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
        data.write(buffer);
      }

      // calc num max data.
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalDataCount += rsBlocks[i].dataCount;
      }

      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw 'code length overflow. ('
          + buffer.getLengthInBits()
          + '>'
          + totalDataCount * 8
          + ')';
      }

      // end code
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }

      // padding
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }

      // padding
      while (true) {

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD0, 8);

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD1, 8);
      }

      return createBytes(buffer, rsBlocks);
    };

    _this.addData = function(data, mode) {

      mode = mode || 'Byte';

      var newData = null;

      switch(mode) {
      case 'Numeric' :
        newData = qrNumber(data);
        break;
      case 'Alphanumeric' :
        newData = qrAlphaNum(data);
        break;
      case 'Byte' :
        newData = qr8BitByte(data);
        break;
      case 'Kanji' :
        newData = qrKanji(data);
        break;
      default :
        throw 'mode:' + mode;
      }

      _dataList.push(newData);
      _dataCache = null;
    };

    _this.isDark = function(row, col) {
      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
        throw row + ',' + col;
      }
      return _modules[row][col];
    };

    _this.getModuleCount = function() {
      return _moduleCount;
    };

    _this.make = function() {
      if (_typeNumber < 1) {
        var typeNumber = 1;

        for (; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);
          var buffer = qrBitBuffer();

          for (var i = 0; i < _dataList.length; i++) {
            var data = _dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
            data.write(buffer);
          }

          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          if (buffer.getLengthInBits() <= totalDataCount * 8) {
            break;
          }
        }

        _typeNumber = typeNumber;
      }

      makeImpl(false, getBestMaskPattern() );
    };

    _this.createTableTag = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var qrHtml = '';

      qrHtml += '<table style="';
      qrHtml += ' border-width: 0px; border-style: none;';
      qrHtml += ' border-collapse: collapse;';
      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
      qrHtml += '">';
      qrHtml += '<tbody>';

      for (var r = 0; r < _this.getModuleCount(); r += 1) {

        qrHtml += '<tr>';

        for (var c = 0; c < _this.getModuleCount(); c += 1) {
          qrHtml += '<td style="';
          qrHtml += ' border-width: 0px; border-style: none;';
          qrHtml += ' border-collapse: collapse;';
          qrHtml += ' padding: 0px; margin: 0px;';
          qrHtml += ' width: ' + cellSize + 'px;';
          qrHtml += ' height: ' + cellSize + 'px;';
          qrHtml += ' background-color: ';
          qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';
          qrHtml += ';';
          qrHtml += '"/>';
        }

        qrHtml += '</tr>';
      }

      qrHtml += '</tbody>';
      qrHtml += '</table>';

      return qrHtml;
    };

    _this.createSvgTag = function(cellSize, margin, alt, title) {

      var opts = {};
      if (typeof arguments[0] == 'object') {
        // Called by options.
        opts = arguments[0];
        // overwrite cellSize and margin.
        cellSize = opts.cellSize;
        margin = opts.margin;
        alt = opts.alt;
        title = opts.title;
      }

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      // Compose alt property surrogate
      alt = (typeof alt === 'string') ? {text: alt} : alt || {};
      alt.text = alt.text || null;
      alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;

      // Compose title property surrogate
      title = (typeof title === 'string') ? {text: title} : title || {};
      title.text = title.text || null;
      title.id = (title.text) ? title.id || 'qrcode-title' : null;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var c, mc, r, mr, qrSvg='', rect;

      rect = 'l' + cellSize + ',0 0,' + cellSize +
        ' -' + cellSize + ',0 0,-' + cellSize + 'z ';

      qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
      qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : '';
      qrSvg += ' viewBox="0 0 ' + size + ' ' + size + '" ';
      qrSvg += ' preserveAspectRatio="xMinYMin meet"';
      qrSvg += (title.text || alt.text) ? ' role="img" aria-labelledby="' +
          escapeXml([title.id, alt.id].join(' ').trim() ) + '"' : '';
      qrSvg += '>';
      qrSvg += (title.text) ? '<title id="' + escapeXml(title.id) + '">' +
          escapeXml(title.text) + '</title>' : '';
      qrSvg += (alt.text) ? '<description id="' + escapeXml(alt.id) + '">' +
          escapeXml(alt.text) + '</description>' : '';
      qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
      qrSvg += '<path d="';

      for (r = 0; r < _this.getModuleCount(); r += 1) {
        mr = r * cellSize + margin;
        for (c = 0; c < _this.getModuleCount(); c += 1) {
          if (_this.isDark(r, c) ) {
            mc = c*cellSize+margin;
            qrSvg += 'M' + mc + ',' + mr + rect;
          }
        }
      }

      qrSvg += '" stroke="transparent" fill="black"/>';
      qrSvg += '</svg>';

      return qrSvg;
    };

    _this.createDataURL = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      return createDataURL(size, size, function(x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          var c = Math.floor( (x - min) / cellSize);
          var r = Math.floor( (y - min) / cellSize);
          return _this.isDark(r, c)? 0 : 1;
        } else {
          return 1;
        }
      } );
    };

    _this.createImgTag = function(cellSize, margin, alt) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;

      var img = '';
      img += '<img';
      img += '\u0020src="';
      img += _this.createDataURL(cellSize, margin);
      img += '"';
      img += '\u0020width="';
      img += size;
      img += '"';
      img += '\u0020height="';
      img += size;
      img += '"';
      if (alt) {
        img += '\u0020alt="';
        img += escapeXml(alt);
        img += '"';
      }
      img += '/>';

      return img;
    };

    var escapeXml = function(s) {
      var escaped = '';
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charAt(i);
        switch(c) {
        case '<': escaped += '&lt;'; break;
        case '>': escaped += '&gt;'; break;
        case '&': escaped += '&amp;'; break;
        case '"': escaped += '&quot;'; break;
        default : escaped += c; break;
        }
      }
      return escaped;
    };

    var _createHalfASCII = function(margin) {
      var cellSize = 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r1, r2, p;

      var blocks = {
        '██': '█',
        '█ ': '▀',
        ' █': '▄',
        '  ': ' '
      };

      var blocksLastLineNoMargin = {
        '██': '▀',
        '█ ': '▀',
        ' █': ' ',
        '  ': ' '
      };

      var ascii = '';
      for (y = 0; y < size; y += 2) {
        r1 = Math.floor((y - min) / cellSize);
        r2 = Math.floor((y + 1 - min) / cellSize);
        for (x = 0; x < size; x += 1) {
          p = '█';

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
            p = ' ';
          }

          if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
            p += ' ';
          }
          else {
            p += '█';
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];
        }

        ascii += '\n';
      }

      if (size % 2 && margin > 0) {
        return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('▀');
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.createASCII = function(cellSize, margin) {
      cellSize = cellSize || 1;

      if (cellSize < 2) {
        return _createHalfASCII(margin);
      }

      cellSize -= 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r, p;

      var white = Array(cellSize+1).join('██');
      var black = Array(cellSize+1).join('  ');

      var ascii = '';
      var line = '';
      for (y = 0; y < size; y += 1) {
        r = Math.floor( (y - min) / cellSize);
        line = '';
        for (x = 0; x < size; x += 1) {
          p = 1;

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
            p = 0;
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          line += p ? white : black;
        }

        for (r = 0; r < cellSize; r += 1) {
          ascii += line + '\n';
        }
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.renderTo2dContext = function(context, cellSize) {
      cellSize = cellSize || 2;
      var length = _this.getModuleCount();
      for (var row = 0; row < length; row++) {
        for (var col = 0; col < length; col++) {
          context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';
          context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
        }
      }
    }

    return _this;
  };

  //---------------------------------------------------------------------
  // qrcode.stringToBytes
  //---------------------------------------------------------------------

  qrcode.stringToBytesFuncs = {
    'default' : function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        bytes.push(c & 0xff);
      }
      return bytes;
    }
  };

  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];

  //---------------------------------------------------------------------
  // qrcode.createStringToBytes
  //---------------------------------------------------------------------

  /**
   * @param unicodeData base64 string of byte array.
   * [16bit Unicode],[16bit Bytes], ...
   * @param numChars
   */
  qrcode.createStringToBytes = function(unicodeData, numChars) {

    // create conversion map.

    var unicodeMap = function() {

      var bin = base64DecodeInputStream(unicodeData);
      var read = function() {
        var b = bin.read();
        if (b == -1) throw 'eof';
        return b;
      };

      var count = 0;
      var unicodeMap = {};
      while (true) {
        var b0 = bin.read();
        if (b0 == -1) break;
        var b1 = read();
        var b2 = read();
        var b3 = read();
        var k = String.fromCharCode( (b0 << 8) | b1);
        var v = (b2 << 8) | b3;
        unicodeMap[k] = v;
        count += 1;
      }
      if (count != numChars) {
        throw count + ' != ' + numChars;
      }

      return unicodeMap;
    }();

    var unknownChar = '?'.charCodeAt(0);

    return function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        if (c < 128) {
          bytes.push(c);
        } else {
          var b = unicodeMap[s.charAt(i)];
          if (typeof b == 'number') {
            if ( (b & 0xff) == b) {
              // 1byte
              bytes.push(b);
            } else {
              // 2bytes
              bytes.push(b >>> 8);
              bytes.push(b & 0xff);
            }
          } else {
            bytes.push(unknownChar);
          }
        }
      }
      return bytes;
    };
  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER :    1 << 0,
    MODE_ALPHA_NUM : 1 << 1,
    MODE_8BIT_BYTE : 1 << 2,
    MODE_KANJI :     1 << 3
  };

  //---------------------------------------------------------------------
  // QRErrorCorrectionLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectionLevel = {
    L : 1,
    M : 0,
    Q : 3,
    H : 2
  };

  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000 : 0,
    PATTERN001 : 1,
    PATTERN010 : 2,
    PATTERN011 : 3,
    PATTERN100 : 4,
    PATTERN101 : 5,
    PATTERN110 : 6,
    PATTERN111 : 7
  };

  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = function() {

    var PATTERN_POSITION_TABLE = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ];
    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

    var _this = {};

    var getBCHDigit = function(data) {
      var digit = 0;
      while (data != 0) {
        digit += 1;
        data >>>= 1;
      }
      return digit;
    };

    _this.getBCHTypeInfo = function(data) {
      var d = data << 10;
      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );
      }
      return ( (data << 10) | d) ^ G15_MASK;
    };

    _this.getBCHTypeNumber = function(data) {
      var d = data << 12;
      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );
      }
      return (data << 12) | d;
    };

    _this.getPatternPosition = function(typeNumber) {
      return PATTERN_POSITION_TABLE[typeNumber - 1];
    };

    _this.getMaskFunction = function(maskPattern) {

      switch (maskPattern) {

      case QRMaskPattern.PATTERN000 :
        return function(i, j) { return (i + j) % 2 == 0; };
      case QRMaskPattern.PATTERN001 :
        return function(i, j) { return i % 2 == 0; };
      case QRMaskPattern.PATTERN010 :
        return function(i, j) { return j % 3 == 0; };
      case QRMaskPattern.PATTERN011 :
        return function(i, j) { return (i + j) % 3 == 0; };
      case QRMaskPattern.PATTERN100 :
        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };
      case QRMaskPattern.PATTERN101 :
        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
      case QRMaskPattern.PATTERN110 :
        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };
      case QRMaskPattern.PATTERN111 :
        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };

      default :
        throw 'bad maskPattern:' + maskPattern;
      }
    };

    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
      var a = qrPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i += 1) {
        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );
      }
      return a;
    };

    _this.getLengthInBits = function(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 10;
        case QRMode.MODE_ALPHA_NUM : return 9;
        case QRMode.MODE_8BIT_BYTE : return 8;
        case QRMode.MODE_KANJI     : return 8;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 27) {

        // 10 - 26

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 12;
        case QRMode.MODE_ALPHA_NUM : return 11;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 10;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 41) {

        // 27 - 40

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 14;
        case QRMode.MODE_ALPHA_NUM : return 13;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 12;
        default :
          throw 'mode:' + mode;
        }

      } else {
        throw 'type:' + type;
      }
    };

    _this.getLostPoint = function(qrcode) {

      var moduleCount = qrcode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount; col += 1) {

          var sameCount = 0;
          var dark = qrcode.isDark(row, col);

          for (var r = -1; r <= 1; r += 1) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c += 1) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrcode.isDark(row + r, col + c) ) {
                sameCount += 1;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += (3 + sameCount - 5);
          }
        }
      };

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row += 1) {
        for (var col = 0; col < moduleCount - 1; col += 1) {
          var count = 0;
          if (qrcode.isDark(row, col) ) count += 1;
          if (qrcode.isDark(row + 1, col) ) count += 1;
          if (qrcode.isDark(row, col + 1) ) count += 1;
          if (qrcode.isDark(row + 1, col + 1) ) count += 1;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount - 6; col += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row, col + 1)
              &&  qrcode.isDark(row, col + 2)
              &&  qrcode.isDark(row, col + 3)
              &&  qrcode.isDark(row, col + 4)
              && !qrcode.isDark(row, col + 5)
              &&  qrcode.isDark(row, col + 6) ) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount - 6; row += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row + 1, col)
              &&  qrcode.isDark(row + 2, col)
              &&  qrcode.isDark(row + 3, col)
              &&  qrcode.isDark(row + 4, col)
              && !qrcode.isDark(row + 5, col)
              &&  qrcode.isDark(row + 6, col) ) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount; row += 1) {
          if (qrcode.isDark(row, col) ) {
            darkCount += 1;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = function() {

    var EXP_TABLE = new Array(256);
    var LOG_TABLE = new Array(256);

    // initialize tables
    for (var i = 0; i < 8; i += 1) {
      EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i += 1) {
      EXP_TABLE[i] = EXP_TABLE[i - 4]
        ^ EXP_TABLE[i - 5]
        ^ EXP_TABLE[i - 6]
        ^ EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i += 1) {
      LOG_TABLE[EXP_TABLE[i] ] = i;
    }

    var _this = {};

    _this.glog = function(n) {

      if (n < 1) {
        throw 'glog(' + n + ')';
      }

      return LOG_TABLE[n];
    };

    _this.gexp = function(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return EXP_TABLE[n];
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrPolynomial
  //---------------------------------------------------------------------

  function qrPolynomial(num, shift) {

    if (typeof num.length == 'undefined') {
      throw num.length + '/' + shift;
    }

    var _num = function() {
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset += 1;
      }
      var _num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i += 1) {
        _num[i] = num[i + offset];
      }
      return _num;
    }();

    var _this = {};

    _this.getAt = function(index) {
      return _num[index];
    };

    _this.getLength = function() {
      return _num.length;
    };

    _this.multiply = function(e) {

      var num = new Array(_this.getLength() + e.getLength() - 1);

      for (var i = 0; i < _this.getLength(); i += 1) {
        for (var j = 0; j < e.getLength(); j += 1) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );
        }
      }

      return qrPolynomial(num, 0);
    };

    _this.mod = function(e) {

      if (_this.getLength() - e.getLength() < 0) {
        return _this;
      }

      var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );

      var num = new Array(_this.getLength() );
      for (var i = 0; i < _this.getLength(); i += 1) {
        num[i] = _this.getAt(i);
      }

      for (var i = 0; i < e.getLength(); i += 1) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);
      }

      // recursive call
      return qrPolynomial(num, 0).mod(e);
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  var QRRSBlock = function() {

    var RS_BLOCK_TABLE = [

      // L
      // M
      // Q
      // H

      // 1
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],

      // 2
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],

      // 3
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],

      // 4
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],

      // 5
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],

      // 6
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],

      // 7
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],

      // 8
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],

      // 9
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],

      // 10
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],

      // 11
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],

      // 12
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],

      // 13
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],

      // 14
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],

      // 15
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],

      // 16
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],

      // 17
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],

      // 18
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],

      // 19
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],

      // 20
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],

      // 21
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],

      // 22
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],

      // 23
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],

      // 24
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],

      // 25
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],

      // 26
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],

      // 27
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],

      // 28
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],

      // 29
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],

      // 30
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],

      // 31
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],

      // 32
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],

      // 33
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],

      // 34
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],

      // 35
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],

      // 36
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],

      // 37
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],

      // 38
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],

      // 39
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],

      // 40
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];

    var qrRSBlock = function(totalCount, dataCount) {
      var _this = {};
      _this.totalCount = totalCount;
      _this.dataCount = dataCount;
      return _this;
    };

    var _this = {};

    var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {

      switch(errorCorrectionLevel) {
      case QRErrorCorrectionLevel.L :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectionLevel.M :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectionLevel.Q :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectionLevel.H :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default :
        return undefined;
      }
    };

    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {

      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);

      if (typeof rsBlock == 'undefined') {
        throw 'bad rs block @ typeNumber:' + typeNumber +
            '/errorCorrectionLevel:' + errorCorrectionLevel;
      }

      var length = rsBlock.length / 3;

      var list = [];

      for (var i = 0; i < length; i += 1) {

        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];

        for (var j = 0; j < count; j += 1) {
          list.push(qrRSBlock(totalCount, dataCount) );
        }
      }

      return list;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrBitBuffer
  //---------------------------------------------------------------------

  var qrBitBuffer = function() {

    var _buffer = [];
    var _length = 0;

    var _this = {};

    _this.getBuffer = function() {
      return _buffer;
    };

    _this.getAt = function(index) {
      var bufIndex = Math.floor(index / 8);
      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    };

    _this.put = function(num, length) {
      for (var i = 0; i < length; i += 1) {
        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
      }
    };

    _this.getLengthInBits = function() {
      return _length;
    };

    _this.putBit = function(bit) {

      var bufIndex = Math.floor(_length / 8);
      if (_buffer.length <= bufIndex) {
        _buffer.push(0);
      }

      if (bit) {
        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );
      }

      _length += 1;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrNumber
  //---------------------------------------------------------------------

  var qrNumber = function(data) {

    var _mode = QRMode.MODE_NUMBER;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var data = _data;

      var i = 0;

      while (i + 2 < data.length) {
        buffer.put(strToNum(data.substring(i, i + 3) ), 10);
        i += 3;
      }

      if (i < data.length) {
        if (data.length - i == 1) {
          buffer.put(strToNum(data.substring(i, i + 1) ), 4);
        } else if (data.length - i == 2) {
          buffer.put(strToNum(data.substring(i, i + 2) ), 7);
        }
      }
    };

    var strToNum = function(s) {
      var num = 0;
      for (var i = 0; i < s.length; i += 1) {
        num = num * 10 + chatToNum(s.charAt(i) );
      }
      return num;
    };

    var chatToNum = function(c) {
      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      }
      throw 'illegal char :' + c;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrAlphaNum
  //---------------------------------------------------------------------

  var qrAlphaNum = function(data) {

    var _mode = QRMode.MODE_ALPHA_NUM;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var s = _data;

      var i = 0;

      while (i + 1 < s.length) {
        buffer.put(
          getCode(s.charAt(i) ) * 45 +
          getCode(s.charAt(i + 1) ), 11);
        i += 2;
      }

      if (i < s.length) {
        buffer.put(getCode(s.charAt(i) ), 6);
      }
    };

    var getCode = function(c) {

      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      } else if ('A' <= c && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      } else {
        switch (c) {
        case ' ' : return 36;
        case '$' : return 37;
        case '%' : return 38;
        case '*' : return 39;
        case '+' : return 40;
        case '-' : return 41;
        case '.' : return 42;
        case '/' : return 43;
        case ':' : return 44;
        default :
          throw 'illegal char :' + c;
        }
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qr8BitByte
  //---------------------------------------------------------------------

  var qr8BitByte = function(data) {

    var _mode = QRMode.MODE_8BIT_BYTE;
    var _data = data;
    var _bytes = qrcode.stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _bytes.length;
    };

    _this.write = function(buffer) {
      for (var i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8);
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrKanji
  //---------------------------------------------------------------------

  var qrKanji = function(data) {

    var _mode = QRMode.MODE_KANJI;
    var _data = data;

    var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];
    if (!stringToBytes) {
      throw 'sjis not supported.';
    }
    !function(c, code) {
      // self test for sjis support.
      var test = stringToBytes(c);
      if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {
        throw 'sjis not supported.';
      }
    }('\u53cb', 0x9746);

    var _bytes = stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return ~~(_bytes.length / 2);
    };

    _this.write = function(buffer) {

      var data = _bytes;

      var i = 0;

      while (i + 1 < data.length) {

        var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);

        if (0x8140 <= c && c <= 0x9FFC) {
          c -= 0x8140;
        } else if (0xE040 <= c && c <= 0xEBBF) {
          c -= 0xC140;
        } else {
          throw 'illegal char at ' + (i + 1) + '/' + c;
        }

        c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);

        buffer.put(c, 13);

        i += 2;
      }

      if (i < data.length) {
        throw 'illegal char at ' + (i + 1);
      }
    };

    return _this;
  };

  //=====================================================================
  // GIF Support etc.
  //

  //---------------------------------------------------------------------
  // byteArrayOutputStream
  //---------------------------------------------------------------------

  var byteArrayOutputStream = function() {

    var _bytes = [];

    var _this = {};

    _this.writeByte = function(b) {
      _bytes.push(b & 0xff);
    };

    _this.writeShort = function(i) {
      _this.writeByte(i);
      _this.writeByte(i >>> 8);
    };

    _this.writeBytes = function(b, off, len) {
      off = off || 0;
      len = len || b.length;
      for (var i = 0; i < len; i += 1) {
        _this.writeByte(b[i + off]);
      }
    };

    _this.writeString = function(s) {
      for (var i = 0; i < s.length; i += 1) {
        _this.writeByte(s.charCodeAt(i) );
      }
    };

    _this.toByteArray = function() {
      return _bytes;
    };

    _this.toString = function() {
      var s = '';
      s += '[';
      for (var i = 0; i < _bytes.length; i += 1) {
        if (i > 0) {
          s += ',';
        }
        s += _bytes[i];
      }
      s += ']';
      return s;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64EncodeOutputStream
  //---------------------------------------------------------------------

  var base64EncodeOutputStream = function() {

    var _buffer = 0;
    var _buflen = 0;
    var _length = 0;
    var _base64 = '';

    var _this = {};

    var writeEncoded = function(b) {
      _base64 += String.fromCharCode(encode(b & 0x3f) );
    };

    var encode = function(n) {
      if (n < 0) {
        // error.
      } else if (n < 26) {
        return 0x41 + n;
      } else if (n < 52) {
        return 0x61 + (n - 26);
      } else if (n < 62) {
        return 0x30 + (n - 52);
      } else if (n == 62) {
        return 0x2b;
      } else if (n == 63) {
        return 0x2f;
      }
      throw 'n:' + n;
    };

    _this.writeByte = function(n) {

      _buffer = (_buffer << 8) | (n & 0xff);
      _buflen += 8;
      _length += 1;

      while (_buflen >= 6) {
        writeEncoded(_buffer >>> (_buflen - 6) );
        _buflen -= 6;
      }
    };

    _this.flush = function() {

      if (_buflen > 0) {
        writeEncoded(_buffer << (6 - _buflen) );
        _buffer = 0;
        _buflen = 0;
      }

      if (_length % 3 != 0) {
        // padding
        var padlen = 3 - _length % 3;
        for (var i = 0; i < padlen; i += 1) {
          _base64 += '=';
        }
      }
    };

    _this.toString = function() {
      return _base64;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64DecodeInputStream
  //---------------------------------------------------------------------

  var base64DecodeInputStream = function(str) {

    var _str = str;
    var _pos = 0;
    var _buffer = 0;
    var _buflen = 0;

    var _this = {};

    _this.read = function() {

      while (_buflen < 8) {

        if (_pos >= _str.length) {
          if (_buflen == 0) {
            return -1;
          }
          throw 'unexpected end of file./' + _buflen;
        }

        var c = _str.charAt(_pos);
        _pos += 1;

        if (c == '=') {
          _buflen = 0;
          return -1;
        } else if (c.match(/^\s$/) ) {
          // ignore if whitespace.
          continue;
        }

        _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );
        _buflen += 6;
      }

      var n = (_buffer >>> (_buflen - 8) ) & 0xff;
      _buflen -= 8;
      return n;
    };

    var decode = function(c) {
      if (0x41 <= c && c <= 0x5a) {
        return c - 0x41;
      } else if (0x61 <= c && c <= 0x7a) {
        return c - 0x61 + 26;
      } else if (0x30 <= c && c <= 0x39) {
        return c - 0x30 + 52;
      } else if (c == 0x2b) {
        return 62;
      } else if (c == 0x2f) {
        return 63;
      } else {
        throw 'c:' + c;
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // gifImage (B/W)
  //---------------------------------------------------------------------

  var gifImage = function(width, height) {

    var _width = width;
    var _height = height;
    var _data = new Array(width * height);

    var _this = {};

    _this.setPixel = function(x, y, pixel) {
      _data[y * _width + x] = pixel;
    };

    _this.write = function(out) {

      //---------------------------------
      // GIF Signature

      out.writeString('GIF87a');

      //---------------------------------
      // Screen Descriptor

      out.writeShort(_width);
      out.writeShort(_height);

      out.writeByte(0x80); // 2bit
      out.writeByte(0);
      out.writeByte(0);

      //---------------------------------
      // Global Color Map

      // black
      out.writeByte(0x00);
      out.writeByte(0x00);
      out.writeByte(0x00);

      // white
      out.writeByte(0xff);
      out.writeByte(0xff);
      out.writeByte(0xff);

      //---------------------------------
      // Image Descriptor

      out.writeString(',');
      out.writeShort(0);
      out.writeShort(0);
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(0);

      //---------------------------------
      // Local Color Map

      //---------------------------------
      // Raster Data

      var lzwMinCodeSize = 2;
      var raster = getLZWRaster(lzwMinCodeSize);

      out.writeByte(lzwMinCodeSize);

      var offset = 0;

      while (raster.length - offset > 255) {
        out.writeByte(255);
        out.writeBytes(raster, offset, 255);
        offset += 255;
      }

      out.writeByte(raster.length - offset);
      out.writeBytes(raster, offset, raster.length - offset);
      out.writeByte(0x00);

      //---------------------------------
      // GIF Terminator
      out.writeString(';');
    };

    var bitOutputStream = function(out) {

      var _out = out;
      var _bitLength = 0;
      var _bitBuffer = 0;

      var _this = {};

      _this.write = function(data, length) {

        if ( (data >>> length) != 0) {
          throw 'length over';
        }

        while (_bitLength + length >= 8) {
          _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );
          length -= (8 - _bitLength);
          data >>>= (8 - _bitLength);
          _bitBuffer = 0;
          _bitLength = 0;
        }

        _bitBuffer = (data << _bitLength) | _bitBuffer;
        _bitLength = _bitLength + length;
      };

      _this.flush = function() {
        if (_bitLength > 0) {
          _out.writeByte(_bitBuffer);
        }
      };

      return _this;
    };

    var getLZWRaster = function(lzwMinCodeSize) {

      var clearCode = 1 << lzwMinCodeSize;
      var endCode = (1 << lzwMinCodeSize) + 1;
      var bitLength = lzwMinCodeSize + 1;

      // Setup LZWTable
      var table = lzwTable();

      for (var i = 0; i < clearCode; i += 1) {
        table.add(String.fromCharCode(i) );
      }
      table.add(String.fromCharCode(clearCode) );
      table.add(String.fromCharCode(endCode) );

      var byteOut = byteArrayOutputStream();
      var bitOut = bitOutputStream(byteOut);

      // clear code
      bitOut.write(clearCode, bitLength);

      var dataIndex = 0;

      var s = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;

      while (dataIndex < _data.length) {

        var c = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;

        if (table.contains(s + c) ) {

          s = s + c;

        } else {

          bitOut.write(table.indexOf(s), bitLength);

          if (table.size() < 0xfff) {

            if (table.size() == (1 << bitLength) ) {
              bitLength += 1;
            }

            table.add(s + c);
          }

          s = c;
        }
      }

      bitOut.write(table.indexOf(s), bitLength);

      // end code
      bitOut.write(endCode, bitLength);

      bitOut.flush();

      return byteOut.toByteArray();
    };

    var lzwTable = function() {

      var _map = {};
      var _size = 0;

      var _this = {};

      _this.add = function(key) {
        if (_this.contains(key) ) {
          throw 'dup key:' + key;
        }
        _map[key] = _size;
        _size += 1;
      };

      _this.size = function() {
        return _size;
      };

      _this.indexOf = function(key) {
        return _map[key];
      };

      _this.contains = function(key) {
        return typeof _map[key] != 'undefined';
      };

      return _this;
    };

    return _this;
  };

  var createDataURL = function(width, height, getPixel) {
    var gif = gifImage(width, height);
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y) );
      }
    }

    var b = byteArrayOutputStream();
    gif.write(b);

    var base64 = base64EncodeOutputStream();
    var bytes = b.toByteArray();
    for (var i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i]);
    }
    base64.flush();

    return 'data:image/gif;base64,' + base64;
  };

  //---------------------------------------------------------------------
  // returns qrcode function.

  return qrcode;
}();

// multibyte support
!function() {

  qrcode.stringToBytesFuncs['UTF-8'] = function(s) {
    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
    function toUTF8Array(str) {
      var utf8 = [];
      for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
              0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
            | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18),
              0x80 | ((charcode>>12) & 0x3f),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
      }
      return utf8;
    }
    return toUTF8Array(s);
  };

}();

(function (factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof exports === 'object') {
      module.exports = factory();
  }
}(function () {
    return qrcode;
}));

;
// sub.js
// Страница подписки: данные кладёт сервер в window.SUB. Без сервера — демо (?demo=expired|limit|off|forever)
(() => {
  const $ = (id) => document.getElementById(id)
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const GB = 1024 ** 3, NF1 = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 })
  const DF = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }), DFY = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  const gb = (b) => NF1.format(b / GB)
  const date = (t) => { const d = new Date(t * 1000); return (d.getFullYear() === new Date().getFullYear() ? DF : DFY).format(d) }
  const plural = (n, a, b, c) => { const m = n % 100, k = n % 10; return m > 10 && m < 20 ? c : k === 1 ? a : k > 1 && k < 5 ? b : c }
  const now = Math.floor(Date.now() / 1000)
  const demo = new URLSearchParams(location.search).get('demo')

  const S = typeof window.SUB === 'object' ? window.SUB : {
    name: 'Маша', server: 'aeza', state: demo && demo !== 'forever' ? demo : 'active', used: 2.4 * GB, limit: 50 * GB,
    expire: demo === 'forever' ? 0 : demo === 'expired' ? now - 3 * 86400 : now + 24 * 86400, url: 'https://vpn.example.ru/s/demo1Kx7Qp2Lm9Ts4', support: 'https://t.me/example',
    configs: ['vless://00000000-0000-4000-8000-000000000000@vpn.example.ru:443?encryption=none&security=tls&type=tcp&flow=xtls-rprx-vision&sni=vpn.example.ru&fp=firefox#aeza%20Vision',
      'hysteria2://demo@vpn.example.ru:443?sni=vpn.example.ru&alpn=h3#aeza%20Hysteria2']
  }

  // ---------- пропуск ----------
  document.title = 'Подписка ' + S.name
  $('s-name').textContent = S.name
  $('s-used').textContent = S.limit ? `${gb(S.used)}/${gb(S.limit)} ГБ` : `${gb(S.used)} ГБ, без лимита`
  $('s-prog').hidden = !S.limit
  if (S.limit) $('s-prog').firstElementChild.style.setProperty('--p', Math.min(1, S.used / S.limit).toFixed(3))
  const days = S.expire ? Math.ceil((S.expire - now) / 86400) : 0
  const BAD = { off: ['выключена', 'Выключена', 'Подписка выключена'], expired: ['срок вышел', 'Срок вышел', 'Срок подписки закончился'], limit: ['нет трафика', 'Трафик кончился', 'Трафик закончился'] }[S.state]
  if (BAD) {
    $('s-st').classList.add('bad'); $('s-st').lastElementChild.textContent = BAD[0]
    $('s-big-k').textContent = 'подписка'; $('s-big').textContent = BAD[1]
    $('s-alert').hidden = false; $('s-alert-t').textContent = BAD[2]
  } else if (!S.expire) { $('s-big-k').textContent = 'действует'; $('s-big').textContent = 'Бессрочно' }
  else $('s-big').textContent = `${days} ${plural(days, 'день', 'дня', 'дней')}`
  $('s-exp').textContent = !S.expire ? 'без даты окончания' : (S.expire > now ? 'до ' : 'закончилась ') + date(S.expire)

  // ---------- приложения ----------
  const ua = navigator.userAgent
  const os = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ? 'ios' : /Android/.test(ua) ? 'android' : 'pc'
  const APPS = {
    happ: { name: 'Happ', link: (u) => 'happ://add/' + u,
      stores: { ios: ['App Store', 'https://apps.apple.com/app/id6504287215'], android: ['Google Play', 'https://play.google.com/store/apps/details?id=com.happproxy'], pc: ['Windows и macOS', 'https://www.happ.su/main/ru'] } },
    incy: { name: 'INCY', link: (u) => 'incy://import/' + u,
      stores: { ios: ['App Store', 'https://apps.apple.com/app/id6756943388'], android: ['Google Play', 'https://play.google.com/store/apps/details?id=llc.itdev.incy'], pc: ['Сайт INCY', 'https://incy.app'] } }
  }
  const OTHER = { ios: 'iPhone', android: 'Android', pc: 'компьютера' }
  const rest = ['ios', 'android', 'pc'].filter((k) => k !== os)
  let app = 'incy'   // по умолчанию INCY; если человек уже выбрал Happ, помним его выбор
  try { if (localStorage.getItem('mp-app') === 'happ') app = 'happ' } catch (e) {}

  function paintApp() {
    const a = APPS[app]
    $('s-t1').textContent = 'Установите ' + a.name
    $('s-store').href = a.stores[os][1]
    $('s-store').lastElementChild.textContent = a.stores[os][0]
    $('s-other').innerHTML = 'Для ' + rest.map((k) => `<a class="link" href="${a.stores[k][1]}" target="_blank" rel="noopener">${OTHER[k]}</a>`).join(' или ')
    $('s-t2').textContent = `Нажмите «Добавить» на карточке выше, ${a.name} откроется сам`
    $('s-add').href = a.link(S.url)
    $('s-add').setAttribute('aria-label', 'Добавить в ' + a.name)
    $('s-connect').textContent = `Выберите «${S.server} Vision» и нажмите кнопку подключения. Если медленно, выберите «${S.server} Hysteria2»`
  }
  const seg = $('s-apps')
  if (app === 'happ') seg.select?.(seg.querySelector('[data-app=happ]'))
  seg.addEventListener('pick', (e) => { app = e.detail.dataset.app; try { localStorage.setItem('mp-app', app) } catch (er) {} paintApp() })
  paintApp()

  // ---------- скопировать ----------
  let ct
  $('s-copy').addEventListener('click', (e) => {
    navigator.clipboard?.writeText(S.url).catch(() => {})
    const b = e.currentTarget; b.classList.add('done')
    b.querySelector('.mp-act-a').setAttribute('aria-hidden', 'true'); b.querySelector('.mp-act-b').removeAttribute('aria-hidden')
    clearTimeout(ct); ct = setTimeout(() => { b.classList.remove('done'); b.querySelector('.mp-act-a').removeAttribute('aria-hidden'); b.querySelector('.mp-act-b').setAttribute('aria-hidden', 'true') }, 1800)
  })

  // ---------- QR в окне и ключи ----------
  document.querySelector('[data-open="s-qr-dlg"]').addEventListener('click', () => {
    if ($('s-qr').firstChild) return
    const q = qrcode(0, 'M'); q.addData(location.href.split('#')[0]); q.make()
    const n = q.getModuleCount(); let d = ''
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.isDark(y, x)) d += `M${x} ${y}h1v1h-1z`
    $('s-qr').innerHTML = `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" role="img" aria-label="QR-код этой страницы"><path d="${d}" fill="#000"/></svg>`
  })
  if (S.support) { $('s-support').hidden = false; $('s-support-a').href = S.support }
})()
