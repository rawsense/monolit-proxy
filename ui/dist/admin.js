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
// ../ds/js/scroll-lock.js
/* Блокировка прокрутки страницы под модальными слоями — подключается один раз, работает для всех.
   Модальный слой = любой <dialog>, открытый через showModal(), или <html data-modal-open> (мобильное меню, шторка).
   Внутри слоя прокручиваемые области работают; помечать свои слои: [data-modal-layer].

   Почему не overflow:hidden: он убирает полосу прокрутки за один кадр — на Windows это видно как «мигание»
   правого края (замер: яркость полосы 35.7 → 9.0 в первом кадре, затемнение ещё не началось).
   Здесь полоса остаётся на месте, просто страница не реагирует на колесо, касание и клавиши. */
(() => {
  const root = document.documentElement;
  let locked = false, lockY = 0, touchY = 0;

  const isModalOpen = () => root.hasAttribute('data-modal-open') || !!document.querySelector('dialog:modal');
  const layerOf = (t) => t instanceof Element ? t.closest('dialog:modal, [data-modal-layer]') : null;

  // может ли что-то между целью и слоем прокрутиться в нужную сторону
  const canScroll = (el, dy, stop) => {
    for (; el && el !== stop.parentElement; el = el.parentElement) {
      const oy = getComputedStyle(el).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
        if (dy < 0 ? el.scrollTop > 0 : el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
      }
    }
    return false;
  };
  const block = (e, dy) => {
    if (!locked) return;
    const layer = layerOf(e.target);
    if (layer && canScroll(e.target, dy, layer)) return;   // прокрутка внутри слоя — можно
    e.preventDefault();                                     // иначе прокрутилась бы страница
  };

  addEventListener('wheel', (e) => block(e, e.deltaY), { passive: false });
  addEventListener('touchstart', (e) => { touchY = e.touches[0].clientY }, { passive: true });
  addEventListener('touchmove', (e) => { const y = e.touches[0].clientY; block(e, touchY - y); touchY = y }, { passive: false });
  const KEYS = { ' ': 1, PageDown: 1, PageUp: -1, ArrowDown: 1, ArrowUp: -1, End: 1, Home: -1 };
  addEventListener('keydown', (e) => {
    if (!locked || !(e.key in KEYS)) return;
    const t = e.target;
    if (t instanceof Element && t.closest('input, textarea, select, [contenteditable], [role=listbox], [role=menu], [role=tablist]')) return;
    block(e, e.key === ' ' && e.shiftKey ? -1 : KEYS[e.key]);
  });
  // запасной путь (перетаскивание бегунка полосы, якоря): возвращаем позицию
  addEventListener('scroll', () => { if (locked && Math.abs(scrollY - lockY) > 0) scrollTo({ top: lockY, behavior: 'instant' }) }, { passive: true });

  const update = () => {
    const m = isModalOpen();
    if (m === locked) return;
    locked = m;
    if (m) lockY = scrollY;
    root.toggleAttribute('data-scroll-locked', m);
  };
  new MutationObserver(update).observe(document, { subtree: true, attributes: true, attributeFilter: ['open', 'data-modal-open'] });
  update();
})();

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
// ../ds/js/select.js
/* Выбор из списка: родной <select> на телефоне, стилизованный список на десктопе.
   Использование: <select class="select">…</select>, затем enhanceSelects() (или вызывается сам на DOMContentLoaded).
   Родной select остаётся источником значения: value, change, disabled, form — всё как обычно.
   Клавиатура (как у системного списка): Enter/Space/↓/↑ открывают; ↑↓ Home End — ходят; буквы — поиск по началу;
   Enter/Space — выбрать; Esc/Tab — закрыть без выбора. */
(() => {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  // прокрутка только внутри списка: scrollIntoView крутит и страницу — экран «дёргается»
  const reveal = (list, el, center) => {
    const top = el.offsetTop, bottom = top + el.offsetHeight, pad = 4;
    if (center) list.scrollTop = top - (list.clientHeight - el.offsetHeight) / 2;
    else if (top - pad < list.scrollTop) list.scrollTop = top - pad;
    else if (bottom + pad > list.scrollTop + list.clientHeight) list.scrollTop = bottom + pad - list.clientHeight;
  };
  const chevron = '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
  let uid = 0;

  function enhance(sel) {
    if (sel.dataset.enhanced) return;
    sel.dataset.enhanced = '1';
    const id = 'lb' + (++uid);
    const wrap = document.createElement('span');
    wrap.className = 'select-ui';
    sel.parentNode.insertBefore(wrap, sel);
    wrap.appendChild(sel);
    sel.tabIndex = -1;
    sel.setAttribute('aria-hidden', 'true');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'select select-trigger' + (sel.classList.contains('input-sm') ? ' input-sm' : '');
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', id);
    btn.style.backgroundImage = 'none';
    // подпись: видимый текст поля (span.label внутри <label>) или сам <label>
    const lab = sel.labels && sel.labels[0];
    const labText = lab && (lab.querySelector('.label') || lab);
    if (labText) { labText.id ||= id + '-l'; btn.setAttribute('aria-labelledby', labText.id + ' ' + id + '-v') }
    // клик по подписи фокусирует родной select — переводим фокус на кнопку
    sel.addEventListener('focus', () => btn.focus());
    btn.innerHTML = `<span class="value" id="${id}-v"></span>${chevron}`;
    wrap.appendChild(btn);

    const list = document.createElement('div');
    list.className = 'menu listbox';
    list.id = id;
    list.setAttribute('role', 'listbox');
    list.tabIndex = -1;
    wrap.appendChild(list);

    // опции и группы строятся из родного select
    let opts = [];
    const build = () => {
      list.innerHTML = ''; opts = [];
      const add = (o) => {
        const el = document.createElement('div');
        el.className = 'option'; el.id = `${id}-o${opts.length}`; el.setAttribute('role', 'option');
        el.innerHTML = `<span>${o.textContent}</span>${o.dataset.meta ? `<small>${o.dataset.meta}</small>` : ''}`;
        if (o.disabled) el.setAttribute('aria-disabled', 'true');
        el._o = o; opts.push(el); list.appendChild(el);
      };
      [...sel.children].forEach(ch => {
        if (ch.tagName === 'OPTGROUP') {
          const l = document.createElement('div'); l.className = 'menu-label'; l.textContent = ch.label; list.appendChild(l);
          [...ch.children].forEach(add);
        } else if (!ch.hidden) add(ch);
      });
    };
    const sync = () => {
      const o = sel.options[sel.selectedIndex];
      const v = btn.querySelector('.value');
      const ph = !o || o.value === '' ;
      v.textContent = o ? o.textContent : '';
      v.classList.toggle('placeholder', ph);
      opts.forEach(el => el.setAttribute('aria-selected', el._o === o));
      btn.disabled = sel.disabled;
    };
    build(); sync();

    let active = -1, typed = '', typedT;
    const enabled = () => opts.filter(o => o.getAttribute('aria-disabled') !== 'true');
    const setActive = (el, scroll) => {
      opts.forEach(o => o.classList.toggle('active', o === el));
      active = opts.indexOf(el);
      if (el) { btn.setAttribute('aria-activedescendant', el.id); if (scroll) reveal(list, el, false) }
    };
    const isOpen = () => list.classList.contains('open');
    const open = () => {
      if (sel.disabled || isOpen()) return;
      // открываем вверх, если снизу не помещается
      const r = btn.getBoundingClientRect();
      const up = innerHeight - r.bottom < Math.min(296, list.scrollHeight + 16) && r.top > innerHeight - r.bottom;
      list.classList.toggle('up', up);
      // В окне с прокруткой середины (.dialog-scroll) список обрезался бы краем середины и самого окна:
      // показываем его в верхнем слое (popover) и ставим по экрану под полем
      if (btn.closest('.dialog-scroll') && list.showPopover) {
        clearTimeout(hideT);
        const gap = 4, room = up ? r.top - 16 : innerHeight - r.bottom - 16;
        list.popover = 'manual';
        Object.assign(list.style, { left: r.left + 'px', width: r.width + 'px',
          top: up ? 'auto' : r.bottom + gap + 'px', bottom: up ? innerHeight - r.top + gap + 'px' : 'auto', maxHeight: Math.min(280, room) + 'px' });
        if (!list.matches(':popover-open')) list.showPopover();
        list.getBoundingClientRect();   // кадр с закрытым видом: иначе появление без перехода
        clipped = btn.closest('.dialog-main');
        clipped?.addEventListener('scroll', close, { passive: true });
        addEventListener('resize', close);
      }
      list.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      const cur = opts.find(o => o.getAttribute('aria-selected') === 'true') || enabled()[0];
      setActive(cur, false);
      if (cur) reveal(list, cur, true);
    };
    let clipped = null, hideT;
    const close = () => {
      if (!isOpen()) return;
      if (clipped) {
        clipped.removeEventListener('scroll', close); removeEventListener('resize', close); clipped = null;
        hideT = setTimeout(() => { if (!isOpen() && list.matches(':popover-open')) list.hidePopover() }, 300);   // после исчезновения
      }
      list.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.removeAttribute('aria-activedescendant');
    };
    const pick = (el) => {
      if (!el || el.getAttribute('aria-disabled') === 'true') return;
      const changed = sel.value !== el._o.value || sel.selectedIndex !== el._o.index;
      sel.selectedIndex = el._o.index;
      sync(); close(); btn.focus();
      if (changed) { sel.dispatchEvent(new Event('input', { bubbles: true })); sel.dispatchEvent(new Event('change', { bubbles: true })) }
    };
    const move = (d) => {
      const en = enabled(); if (!en.length) return;
      let i = en.indexOf(opts[active]);
      i = d === 'first' ? 0 : d === 'last' ? en.length - 1 : Math.max(0, Math.min(en.length - 1, i + d));
      setActive(en[i], true);
    };

    btn.addEventListener('click', () => (isOpen() ? close() : open()));
    btn.addEventListener('keydown', (e) => {
      const k = e.key;
      if (!isOpen()) {
        if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(k)) { e.preventDefault(); open() }
        return;
      }
      if (k === 'ArrowDown') { e.preventDefault(); move(1) }
      else if (k === 'ArrowUp') { e.preventDefault(); move(-1) }
      else if (k === 'Home') { e.preventDefault(); move('first') }
      else if (k === 'End') { e.preventDefault(); move('last') }
      else if (k === 'Enter' || k === ' ') { e.preventDefault(); pick(opts[active]) }
      else if (k === 'Escape') { e.preventDefault(); close() }
      else if (k === 'Tab') close();
      else if (k.length === 1) {
        typed += k.toLowerCase(); clearTimeout(typedT); typedT = setTimeout(() => (typed = ''), 600);
        const hit = enabled().find(o => o._o.textContent.trim().toLowerCase().startsWith(typed));
        if (hit) setActive(hit, true);
      }
    });
    // мышь: подсветка следует за курсором, клик выбирает; фокус остаётся на кнопке
    list.addEventListener('pointermove', (e) => { const o = e.target.closest('.option'); if (o && opts.indexOf(o) !== active) setActive(o, false) });
    list.addEventListener('pointerdown', (e) => e.preventDefault());
    // preventDefault: список лежит внутри <label>, и клик по пункту подпись передала бы родному select — Chrome открыл бы системный список
    list.addEventListener('click', (e) => { e.preventDefault(); pick(e.target.closest('.option')) });
    document.addEventListener('pointerdown', (e) => { if (!wrap.contains(e.target)) close() });
    btn.addEventListener('blur', () => setTimeout(() => { if (!wrap.contains(document.activeElement)) close() }, 0));
    // изменения снаружи: значение, disabled, состав опций
    sel.addEventListener('change', sync);
    new MutationObserver(() => { build(); sync() }).observe(sel, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled'] });
  }

  window.enhanceSelects = (root = document) => {
    if (!fine.matches) return;                         // телефон/планшет: родной список
    root.querySelectorAll('select.select').forEach(enhance);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => enhanceSelects());
  else enhanceSelects();
})();

;
// ../ds/js/scrollbar.js
/* Своя полоса прокрутки поверх содержимого (стили — tokens/scrollbar.css). Подключается один раз, находит всё сама:
   страницу и каждую область с overflow auto/scroll, включая появившиеся позже (меню, диалоги, шторки).
   Отказаться у области: data-sb="off" или scrollbar-width: none в её стилях (так делают ленты чипов, боковое меню). */
(() => {
  const root = document.documentElement;
  const HIDE = 1000, EDGE = 16, MIN = 32, INSET = 2, SIZE = 12;
  const items = new Map();   // элемент → { v, h, host, timer, hover, drag }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  // бегунок внутри модального слоя/попапа кладём в сам слой — иначе верхний слой (<dialog>) его перекроет
  const hostFor = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement)
      if (p.matches('dialog, [popover], [data-modal-layer]')) return p;
    return null;
  };
  const make = (axis, it) => {
    const b = document.createElement('div');
    b.className = `sb-bar ${axis}${it.host ? ' in-host' : ''}`;
    b.setAttribute('aria-hidden', 'true');
    b.innerHTML = '<div class="sb-thumb"></div>';
    b.addEventListener('pointerenter', () => { it.hover = true; clearTimeout(it.timer) });
    b.addEventListener('pointerleave', () => { it.hover = false; hideLater(it) });
    b.addEventListener('pointerdown', (e) => down(e, it, axis));
    (it.host || document.body).appendChild(b);
    return b;
  };

  const attach = (el, v, h) => {
    if (items.has(el)) return;
    const it = { el, host: el === root ? null : hostFor(el), timer: 0, hover: false, drag: false };
    if (el !== root) el.classList.add('sb');
    if (v) it.v = make('v', it);
    if (h) it.h = make('h', it);
    items.set(el, it);
    ro.observe(el);
  };
  const detach = (el, it) => { it.v?.remove(); it.h?.remove(); items.delete(el); ro.unobserve(el) };

  // геометрия: позиция дорожки по краю области, длина и сдвиг бегунка
  const metrics = (it) => {
    const el = it.el, page = el === root;
    const sc = page ? (document.scrollingElement || root) : el;
    let L, T, W, H;
    if (page) { L = 0; T = 0; W = root.clientWidth; H = root.clientHeight }
    else { const r = el.getBoundingClientRect(); L = r.left + el.clientLeft; T = r.top + el.clientTop; W = el.clientWidth; H = el.clientHeight }
    let ox = 0, oy = 0;
    if (it.host) { const hr = it.host.getBoundingClientRect(); ox = hr.left + it.host.clientLeft - it.host.scrollLeft; oy = hr.top + it.host.clientTop - it.host.scrollTop }
    const canV = !!it.v && sc.scrollHeight > sc.clientHeight + 1, canH = !!it.h && sc.scrollWidth > sc.clientWidth + 1;
    const both = canV && canH ? SIZE : 0;
    const out = { sc, canV, canH };
    if (canV) {
      const track = H - INSET * 2 - both, max = sc.scrollHeight - sc.clientHeight;
      const len = Math.max(MIN, Math.round(track * sc.clientHeight / sc.scrollHeight));
      out.v = { track, len, max, left: L + W - SIZE - ox, top: T - oy, size: H - both, pos: INSET + (track - len) * Math.min(1, Math.max(0, sc.scrollTop / max)) };
    }
    if (canH) {
      const track = W - INSET * 2 - both, max = sc.scrollWidth - sc.clientWidth;
      const len = Math.max(MIN, Math.round(track * sc.clientWidth / sc.scrollWidth));
      out.h = { track, len, max, left: L - ox, top: T + H - SIZE - oy, size: W - both, pos: INSET + (track - len) * Math.min(1, Math.max(0, Math.abs(sc.scrollLeft) / max)) };
    }
    return out;
  };
  const place = (it) => {
    const m = metrics(it);
    for (const axis of ['v', 'h']) {
      const b = it[axis]; if (!b) continue;
      const g = m[axis];
      if (!g) { b.classList.remove('on'); continue }
      const s = b.style;
      s.left = g.left + 'px'; s.top = g.top + 'px';
      if (axis === 'v') s.height = g.size + 'px'; else s.width = g.size + 'px';
      s.setProperty('--len', g.len + 'px'); s.setProperty('--pos', g.pos + 'px');
    }
    return m;
  };

  const hideLater = (it) => {
    clearTimeout(it.timer);
    if (it.hover || it.drag) return;
    it.timer = setTimeout(() => { it.v?.classList.remove('on'); it.h?.classList.remove('on') }, HIDE);
  };
  const show = (it, axis) => {
    const m = place(it);
    for (const a of axis ? [axis] : ['v', 'h']) if (it[a] && m[a]) it[a].classList.add('on');
    hideLater(it);
  };

  // прокрутка любой области: показать её бегунок; остальные видимые — переставить (их область могла съехать вместе со страницей)
  let raf = 0; const pending = new Set();
  addEventListener('scroll', (e) => {
    const t = e.target === document ? root : e.target;
    if (items.has(t)) pending.add(t);
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      for (const [el, it] of items) {
        if (pending.has(el)) {
          const sc = el === root ? (document.scrollingElement || root) : el;
          const dx = sc.scrollLeft !== it.sl, dy = sc.scrollTop !== it.st;
          it.sl = sc.scrollLeft; it.st = sc.scrollTop;
          show(it, dy && !dx ? 'v' : dx && !dy ? 'h' : null);
        } else if (it.v?.classList.contains('on') || it.h?.classList.contains('on')) place(it);
      }
      pending.clear();
    });
  }, { capture: true, passive: true });

  // курсор у правого/нижнего края области — проявить бегунок, чтобы его можно было взять
  let pmRaf = 0, lastE;
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    lastE = e;
    if (pmRaf) return;
    pmRaf = requestAnimationFrame(() => {
      pmRaf = 0;
      const { clientX: x, clientY: y, target } = lastE;
      if (target instanceof Element && target.closest('.sb-bar')) return;
      const chain = [];
      for (let p = target instanceof Element ? target : null; p; p = p.parentElement) if (items.has(p) && p !== root) chain.push(p);
      chain.push(root);
      for (const el of chain) {
        const it = items.get(el);
        const r = el === root ? { right: root.clientWidth, bottom: root.clientHeight, left: 0, top: 0 } : el.getBoundingClientRect();
        if (x < r.left || x > r.right || y < r.top || y > r.bottom) continue;
        if (it.v && x >= r.right - EDGE) { show(it, 'v'); break }
        if (it.h && y >= r.bottom - EDGE) { show(it, 'h'); break }
      }
    });
  }, { passive: true });

  // перетаскивание бегунка; клик по дорожке — прыжок к этому месту
  const down = (e, it, axis) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const b = it[axis], m = metrics(it), g = m[axis]; if (!g) return;
    const sc = m.sc, V = axis === 'v';
    const thumb = b.firstChild.getBoundingClientRect();
    const p = V ? e.clientY : e.clientX;
    const onThumb = V ? p >= thumb.top && p <= thumb.bottom : p >= thumb.left && p <= thumb.right;
    const ratio = g.max / Math.max(1, g.track - g.len);
    if (!onThumb) {
      const br = b.getBoundingClientRect();
      const want = ((V ? p - br.top : p - br.left) - INSET - g.len / 2) * ratio;
      sc.scrollTo({ [V ? 'top' : 'left']: want, behavior: reduce.matches ? 'instant' : 'smooth' });
      return;
    }
    const start = p, from = V ? sc.scrollTop : sc.scrollLeft;
    it.drag = true; b.classList.add('drag'); root.classList.add('sb-dragging'); clearTimeout(it.timer);
    b.setPointerCapture(e.pointerId);
    const move = (ev) => sc.scrollTo({ [V ? 'top' : 'left']: from + ((V ? ev.clientY : ev.clientX) - start) * ratio, behavior: 'instant' });
    const up = () => {
      it.drag = false; b.classList.remove('drag'); root.classList.remove('sb-dragging');
      b.removeEventListener('pointermove', move); b.removeEventListener('pointerup', up); b.removeEventListener('pointercancel', up);
      hideLater(it);
    };
    b.addEventListener('pointermove', move); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up);
  };

  // размеры областей меняются — переставить видимые бегунки
  const ro = new ResizeObserver((es) => { for (const e of es) { const it = items.get(e.target); if (it && (it.v?.classList.contains('on') || it.h?.classList.contains('on'))) place(it) } });
  addEventListener('resize', () => { for (const it of items.values()) place(it) }, { passive: true });

  // поиск прокручиваемых областей. Вся страница проверяется один раз при загрузке; дальше — ТОЛЬКО добавленные
  // узлы, в простое браузера. Раньше любое изменение DOM (строка в списке, уведомление) перепроверяло все ~3000
  // элементов страницы через getComputedStyle — пересчёт стилей всей страницы посреди анимации, отсюда «лаги»
  const SKIP = '.sb, .sb-bar, .sb-thumb, input, select, svg, svg *';
  const check = (el) => {
    if (el.matches(SKIP) || el.dataset.sb === 'off') return;
    const cs = getComputedStyle(el);
    const v = /auto|scroll/.test(cs.overflowY), h = /auto|scroll/.test(cs.overflowX);
    if ((v || h) && cs.scrollbarWidth !== 'none') attach(el, v, h);   // scrollbar-width: none — область сама отказалась
  };
  const scan = (roots = [document.body]) => {
    for (const r of roots) { if (!r.isConnected) continue; if (r !== document.body) check(r); r.querySelectorAll('*').forEach(check) }
  };
  const added = new Set(); let idle = 0;
  const idleCb = window.requestIdleCallback || ((f) => setTimeout(f, 200));
  new MutationObserver((ms) => {
    for (const m of ms) {
      for (const n of m.addedNodes) if (n.nodeType === 1 && !n.closest('.sb-bar')) added.add(n);
      if (m.removedNodes.length) for (const [el, it] of items) if (el !== root && !el.isConnected) detach(el, it);
    }
    if (added.size && !idle) idle = idleCb(() => { idle = 0; const r = [...added]; added.clear(); scan(r) }, { timeout: 1000 });
  }).observe(document.body, { childList: true, subtree: true });

  attach(root, true, false);
  scan();
  window.scrollbars = { scan, show: (el) => { const it = items.get(el || root); if (it) show(it) } };
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
// admin.js
// Админка monolit proxy. Строки таблицы обновляются на месте по id, смена вида — гаснет 200 мс, проявляется 360 мс.
// Без сервера (файл, ?demo или нет API) работает на демо-данных — для проверки вёрстки
(() => {
  const $ = (id) => document.getElementById(id)
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  // Название с флагом страны: флаг — отдельным элементом со своим отступом, пробел из названия после него убирается
  const named = (s) => esc(s).replace(/((?:\p{Regional_Indicator}{2})|\u{1F3F4}[\u{E0061}-\u{E007A}]+\u{E007F})\s*/gu, '<span class="mp-flag">$1</span>')
  const NF1 = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }), NF = new Intl.NumberFormat('ru-RU')
  const DF = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }), DFY = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  const TF = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' })
  const GB = 1024 ** 3
  const now = () => Math.floor(Date.now() / 1000)

  // ---------- форматирование ----------
  const bytes = (b) => {
    if (b < 1024 ** 2) return NF.format(Math.round(b / 1024)) + ' КБ'
    if (b < GB) return NF.format(Math.round(b / 1024 ** 2)) + ' МБ'
    return NF1.format(b / GB) + ' ГБ'
  }
  const gbOf = (b) => b ? NF1.format(b / GB).replace(/\s/g, '') : ''
  const date = (t) => { const d = new Date(t * 1000); return (d.getFullYear() === new Date().getFullYear() ? DF : DFY).format(d) }
  const plural = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c }
  const ago = (t) => {
    if (!t) return 'ещё не был'
    const s = now() - t
    if (s < 120) return 'сейчас'
    if (s < 3600) { const m = Math.floor(s / 60); return `${m} ${plural(m, 'минуту', 'минуты', 'минут')} назад` }
    const d = new Date(t * 1000), td = new Date()
    if (d.toDateString() === td.toDateString()) return 'сегодня в ' + TF.format(d)
    td.setDate(td.getDate() - 1)
    if (d.toDateString() === td.toDateString()) return 'вчера в ' + TF.format(d)
    return date(t)
  }
  const left = (u) => {
    if (!u.expire) return 'бессрочно'
    const days = Math.ceil((u.expire - now()) / 86400)
    if (days <= 0) return 'закончилась ' + date(u.expire)
    return 'до ' + date(u.expire) + (days <= 7 ? `, ${days} ${plural(days, 'день', 'дня', 'дней')}` : '')
  }
  const ST = { active: ['Активна', 'badge-success'], expired: ['Срок вышел', 'badge-warning'], limit: ['Трафик кончился', 'badge-warning'], devices: ['Много устройств', 'badge-warning'], off: ['Выключена', ''] }
  const badge = (u) => `<span class="mp-st is-${u.state}"><span class="dot"></span>${ST[u.state][0]}</span>`
  const group = (u) => u.state === 'active' ? 'active' : u.state === 'off' ? 'off' : 'ended'
  const stateOf = (u, t = now()) => !u.enabled ? 'off' : u.expire && u.expire <= t ? 'expired' : u.limit && u.used >= u.limit ? 'limit' : u.block_until > t ? 'devices' : 'active'
  const MON = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
  const dayLabel = (d) => { const [, m, dd] = d.split('-').map(Number); return dd + ' ' + MON[m - 1] }
  // онлайн: «сейчас» или «сейчас с 3 IP»; иначе — когда был
  const seen = (u) => u.online?.length ? (u.online.length > 1 ? `сейчас с ${u.online.length} IP` : 'сейчас') : ago(u.last_active)

  // ---------- связь с сервером или демо ----------
  let DEMO = location.protocol === 'file:' || new URLSearchParams(location.search).has('demo')
  let S = null   // состояние: { users, settings, xray, template }

  function demoState() {
    const t = now(), d = 86400, mk = (id, name, note, used, limitGb, expDays, enabled, seen) => {
      const u = { id, name, note, token: 'demo' + id + 'Kx7Qp2Lm9Ts4', used, up: Math.round(used * .1), down: Math.round(used * .9), limit: limitGb * GB, expire: expDays === null ? 0 : t + expDays * d, enabled, last_active: seen === null ? 0 : t - seen, created: t - 40 * d }
      u.period = ''; u.reset_at = 0; u.devices = 0; u.block_until = 0; u.online = []
      u.url = 'https://vpn.example.ru/s/' + u.token; u.state = stateOf(u, t); return u
    }
    const users = [mk(1, 'Маша', 'сестра, iPhone', 2.4 * GB, 50, 24, true, 300), mk(2, 'Игорь Белов', 'работа', 48.7 * GB, 50, 61, true, 4000), mk(3, 'Папа', '', 0.3 * GB, 0, null, true, 90000),
      mk(4, 'Дима', 'Android', 50 * GB, 50, 12, true, 7 * d), mk(5, 'Ксения', 'тестовый месяц', 6.1 * GB, 30, -3, true, 5 * d), mk(6, 'Старый ноутбук', '', 120 * GB, 0, null, false, 30 * d),
      mk(7, 'Аня', '', 0, 20, 5, true, null)]
    Object.assign(users[0], { period: 'month', reset_at: t + 9 * d, devices: 2, online: [{ ip: '95.24.181.7', at: t - 40 }] })
    Object.assign(users[1], { devices: 1, block_until: t + 7 * 60, online: [{ ip: '188.170.84.12', at: t - 20 }, { ip: '31.173.86.201', at: t - 75 }] })
    Object.assign(users[2], { online: [{ ip: '46.138.20.99', at: t - 15 }] })
    users.forEach((u) => { u.state = stateOf(u, t) })
    return {
      users,
      update: { current: '1.1.0', latest: { tag: 'v1.2.0', name: 'v1.2.0', notes: 'Несколько серверов в одной админке. График трафика по часам', published: t - 2 * d, url: '#' }, available: true, checked: t - 3 * 3600, error: '', status: null, repo: 'rawsense/monolit-proxy' },
      settings: { server_name: 'aeza', domain: 'vpn.example.ru', fp: 'firefox', kinds: 'vision,hy2', autoupdate: true, support_url: '', update_hours: 12, login: 'admin', tg_token: '', tg_chat: '' },
      watch: { state: 'blocked', at: t - 600, since: t - 4000, ip: '203.0.113.7', on: true, every: 60 },
      addr_new: ['203.0.113.9'],
      xray: { ok: true, error: '', last_sync: t - 20, inbounds: { vision: { tag: 'vision', port: 443 }, hy2: { tag: 'hy2', port: 443 }, xhttp: null } },
      template: { version: '162', hash: '47ffac58afcb3992', source: 'github', since: t - 3 * d, checked: t - 2 * 3600, rollback: true, pending: null, rejected: null }
    }
  }

  let demoFails = 0, demoFailAt = 0
  async function demoApi(method, path, body) {
    await new Promise((r) => setTimeout(r, 250))
    const id = Number((/\/users\/(\d+)/.exec(path) || [])[1]), u = S.users.find((x) => x.id === id)
    const fix = (x) => { x.state = stateOf(x); return x }
    if (path === 'api/login') {
      demoFails = Date.now() - demoFailAt > 600e3 ? 0 : demoFails
      if (demoFails >= 5) throw Object.assign(new Error('Слишком много попыток'), { status: 429, data: { wait: 600 - Math.floor((Date.now() - demoFailAt) / 1000) } })
      if (body.password !== 'demo1234' || body.login !== 'admin') { demoFails++; demoFailAt = Date.now(); throw Object.assign(new Error('Неверный логин или пароль'), { status: 401, data: { left: 5 - demoFails, wait: 600 } }) }
      demoFails = 0; return {}
    }
    if (path === 'api/state') return S
    if (path === 'api/users' && method === 'POST') {
      const nu = { id: Math.max(0, ...S.users.map((x) => x.id)) + 1, name: body.name, note: body.note, token: 'demo' + Date.now().toString(36), used: 0, up: 0, down: 0, limit: body.limit, expire: body.expire, enabled: true, last_active: 0, created: now(), period: body.period, reset_at: body.period ? now() + 30 * 86400 : 0, devices: body.devices, block_until: 0, online: [] }
      nu.url = 'https://' + S.settings.domain + '/s/' + nu.token; S.users.push(fix(nu)); return { user: nu }
    }
    if (u && method === 'PATCH') { if (body.unblock || 'devices' in body) u.block_until = 0; delete body.unblock; Object.assign(u, body); return { user: fix(u) } }
    if (u && path.endsWith('/links')) return { links: [['Stockholm', 'Vision', 'vless://00000000-0000-4000-8000-000000000000@' + S.settings.domain + ':443?security=tls#Stockholm'], ['Stockholm', 'Hysteria2', 'hysteria2://demo@' + S.settings.domain + ':443#Stockholm'], ['Mobile', 'Reality', 'vless://00000000-0000-4000-8000-000000000000@185.104.248.17:443?security=reality#Mobile']].map(([name, proto, url]) => ({ name, proto, url })) }
    if (u && path.endsWith('/reset')) { u.used = u.up = u.down = 0; fix(u); return {} }
    if (u && path.endsWith('/regen')) { u.token = 'demo' + Date.now().toString(36); u.url = 'https://' + S.settings.domain + '/s/' + u.token; return { user: u } }
    if (u && method === 'DELETE') { S.users = S.users.filter((x) => x !== u); return {} }
    if (path === 'api/settings') { Object.assign(S.settings, body); delete S.settings.password; return S }
    if (path === 'api/notify/test') { if (!/^\d{5,}:[\w-]{20,}$/.test(body.token || '')) throw new Error('Токен бота выглядит так: 123456789:AA…'); return { ok: true, chat: body.chat || '123456789' } }
    if (path === 'api/template/check') { S.template.checked = now(); return { ok: true, changed: false, state: S } }
    if (path === 'api/template/rollback') { S.template.rollback = false; return S }
    if (path.startsWith('api/traffic')) {
      const uid = Number(new URLSearchParams(path.split('?')[1]).get('user')) || 0, days = []
      for (let i = 29; i >= 0; i--) {
        const dt = new Date(Date.now() - i * 86400e3), k = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`
        const v = uid === 7 ? 0 : Math.round((0.6 + Math.sin(i * 1.3 + uid) * 0.4 + (i % 7 === 2 ? 0.8 : 0)) * (uid ? 0.4 : 2.2) * GB)
        days.push({ day: k, up: Math.round(v * 0.1), down: Math.round(v * 0.9) })
      }
      return { tz: 'Europe/Moscow', days }
    }
    if (path === 'api/update/check') { S.update.checked = now(); return S.update }
    if (path === 'api/update' && method === 'POST') { S.update.status = { state: 'running', to: S.update.latest.tag, from: S.update.current, at: now(), text: 'Скачиваю ' + S.update.latest.tag }; return { ok: true } }
    if (path === 'api/update') { const st = S.update.status; if (st?.state === 'running' && now() - st.at > 4) { S.update.status = { ...st, state: 'done', text: 'Обновлено до ' + st.to }; S.update.current = st.to.slice(1); S.update.available = false } return S.update }
    throw new Error('Нет такого действия')
  }

  async function api(method, path, body) {
    if (DEMO) return demoApi(method, path, body)
    const raw = typeof body === 'string'
    const r = await fetch(path, { method, headers: body ? { 'content-type': raw ? 'application/octet-stream' : 'application/json' } : {}, body: body ? (raw ? body : JSON.stringify(body)) : undefined, credentials: 'same-origin' })
    let j = {}; try { j = await r.json() } catch (e) {}
    if (r.status === 401 && path !== 'api/login') { showLogin(); throw new Error('Нужно войти') }
    if (!r.ok) throw Object.assign(new Error(j.error || 'Сервер ответил ' + r.status), { status: r.status, data: j })
    return j
  }
  const fail = (e) => window.toast?.({ type: 'error', title: 'Не получилось', text: e.message })
  const busy = async (btn, fn) => { btn.disabled = true; try { return await fn() } finally { btn.disabled = false } }

  // ---------- вход ----------
  function showLogin() { $('mp-app').hidden = true; $('mp-login').hidden = false }
  // Попыток входа 5 за 10 минут. Что заведомо не подойдёт, на сервер не шлём: попытка не тратится
  const lForm = $('mp-login-form'), lBtn = lForm.querySelector('button[type=submit]'), caps = $('mp-caps')
  const tried = new Set()          // пары логин+пароль, которые сервер уже отклонил
  let lockUntil = 0, lockTimer = 0
  const mmss = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0')
  function lock(sec) {
    lockUntil = Date.now() + sec * 1000; clearInterval(lockTimer)
    const tick = () => {
      const left = Math.ceil((lockUntil - Date.now()) / 1000)
      if (left <= 0) { clearInterval(lockTimer); lockTimer = 0; lBtn.disabled = false; window.fieldError?.(lForm.password, ''); return }
      lBtn.disabled = true; window.fieldError?.(lForm.password, 'Слишком много попыток. Можно снова через ' + mmss(left))
    }
    tick(); lockTimer = setInterval(tick, 1000)
  }
  const capsOn = (e) => { if (e.getModifierState) caps.classList.toggle('on', e.getModifierState('CapsLock')) }
  lForm.password.addEventListener('keydown', capsOn); lForm.password.addEventListener('keyup', capsOn)
  lForm.password.addEventListener('blur', () => caps.classList.remove('on'))
  lForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (lockUntil > Date.now()) return
    const inp = lForm.password, lg = lForm.login, login = lg.value.trim(), pw = inp.value
    const bad = (el, msg) => { window.fieldError?.(el, msg); el.focus() }
    if (!login) return bad(lg, 'Введите логин')
    if (!/^[\p{L}\p{N}_.@-]{3,32}$/u.test(login)) return bad(lg, 'Логин: от 3 до 32 букв, цифр и знаков . _ - @')
    window.fieldError?.(lg, '')
    if (!pw) return bad(inp, 'Введите пароль')
    if (pw.length < 8) return bad(inp, 'Пароль не короче 8 символов, проверьте, весь ли он вставился')
    if (pw.trim() !== pw) return bad(inp, 'В начале или в конце пароля пробел. Скорее всего, он попал при копировании')
    const key = login.toLowerCase() + '\n' + pw
    if (tried.has(key)) return bad(inp, 'С этим паролем уже не вышло. Проверьте раскладку и Caps Lock')
    busy(lBtn, async () => {
      try { await api('POST', 'api/login', { login, password: pw }); inp.value = ''; tried.clear(); window.fieldError?.(inp, ''); caps.classList.remove('on'); await load() }
      catch (err) {
        if (err.status === 429) return lock(err.data?.wait || 600)
        if (err.status === 401) tried.add(key)
        const left = err.data?.left
        window.fieldError?.(inp, err.message + (left > 0 ? '. Осталось попыток: ' + left : ''))
        if (left === 0) lock(err.data?.wait || 600)
      }
    }).finally(() => { if (lockUntil > Date.now()) lBtn.disabled = true })
  })
  $('mp-logout').addEventListener('click', async () => { try { await api('POST', 'api/logout') } catch (e) {} showLogin() })

  // ---------- графики трафика ----------
  // Система рисует график один раз из data-атрибутов: при новых данных ставим новый узел, если цифры поменялись
  function drawChart(box, days, title, h = 160) {
    const vals = days.map((d) => d.up + d.down), max = Math.max(0, ...vals)
    const key = days.map((d) => d.day + ':' + (d.up + d.down)).join(',')
    if (box._key === key) return
    box._key = key
    if (!max) { box.innerHTML = '<p class="mp-note mp-chart-empty">За 30 дней трафика не было</p>'; return }
    const mb = max < GB, k = mb ? 1024 ** 2 : GB
    const el = document.createElement('div')
    el.className = 'chart'; el.dataset.type = 'bar'; el.dataset.h = String(h); el.dataset.unit = mb ? ' МБ' : ' ГБ'; el.setAttribute('aria-label', title)
    el.dataset.values = vals.map((v) => mb ? Math.round(v / k) : Math.round(v / k * 10) / 10).join(',')
    el.dataset.labels = days.map((d) => dayLabel(d.day)).join(',')
    const cap = document.createElement('p'); cap.className = 'mp-note mp-chart-unit'; cap.textContent = mb ? 'МБ в день' : 'ГБ в день'
    box.replaceChildren(cap, el); window.initData?.(box)
  }
  async function loadTotal() {
    try {
      const r = await api('GET', 'api/traffic?days=30')
      const sum = r.days.reduce((a, d) => a + d.up + d.down, 0)
      $('mp-tr-sum').textContent = bytes(sum)
      $('mp-tr-tz').textContent = r.tz && r.tz !== Intl.DateTimeFormat().resolvedOptions().timeZone ? 'Дни по времени сервера, ' + r.tz : ''
      drawChart($('mp-tr-chart'), r.days, 'Трафик по дням', 120)
    } catch (e) {}
  }

  // ---------- таблица ----------
  const tbody = $('mp-rows')
  const view = 'all'   // вкладок нет: по видам делят цифры над списком
  let query = ''
  // Трафик коротко: «2,4/50 ГБ» (израсходовано в единицах лимита), без лимита — просто объём
  const usage = (u) => u.limit ? `${NF1.format(u.used / GB)}<span class="mp-muted">/${gbOf(u.limit)} ГБ</span>` : bytes(u.used)
  const useHtml = (u) => {
    const p = u.limit ? Math.min(1, u.used / u.limit) : 0
    // израсходовано и предел одним цветом: серая часть вплотную к яркой читалась как склейка
    const head = u.limit ? `<span>${NF1.format(u.used / GB)} / ${gbOf(u.limit)} ГБ</span>` : `<span>${usage(u)}</span>`
    return `<div class="mp-use">${head}${u.limit ? `<div class="progress${p >= 1 ? " is-full" : p >= 0.8 ? " is-warn" : ""}" role="progressbar" aria-label="Трафик" aria-valuenow="${Math.round(p * 100)}"><i style="--p:${p.toFixed(3)}"></i></div>` : ''}</div>`
  }
  // Телефон и планшет: имя и трафик в первой строке, заметка и срок во второй, расход — заливкой карточки.
  // Статус без плашки: у активной срок серым, иначе вместо срока — состояние цветом
  const mobileState = (u) => u.state === 'active' ? `<span class="mp-m-exp">${left(u)}</span>` : `<span class="mp-m-exp is-${u.state}">${u.state === 'expired' ? left(u) : ST[u.state][0]}</span>`
  const mobileHtml = (u) => {
    const p = u.limit ? Math.min(1, u.used / u.limit) : 0
    // израсходованное — заливкой самой карточки слева направо; кончился трафик или много устройств — жёлтой
    return `<span class="mp-m${u.state === 'limit' || u.state === 'devices' ? ' is-warn' : ''}${p >= 0.99 ? ' is-full' : ''}" style="--p:${p.toFixed(3)}">${u.note ? `<span class="mp-m-note">${esc(u.note)}</span>` : '<span></span>'}${mobileState(u)}`
      + `<span class="mp-m-use">${usage(u)}</span></span>`
  }
  const rowHtml = (u) => `<th scope="row"><span class="mp-who">${esc(u.name)}</span>${u.note ? `<span class="mp-what">${esc(u.note)}</span>` : ''}${mobileHtml(u)}</th>`
    + `<td class="mp-st-col">${badge(u)}</td><td>${useHtml(u)}</td><td class="mp-exp-col"><span class="${u.state === 'expired' ? 'mp-muted' : ''}">${left(u)}</span></td><td class="mp-seen-col"><span class="${u.online?.length ? '' : 'mp-muted'}">${seen(u)}</span></td>`

  function render() {
    const q = query.toLowerCase()
    const list = S.users.filter((u) => (view === 'all' || group(u) === view) && (!q || (u.name + ' ' + (u.note || '')).toLowerCase().includes(q)))
    const byId = new Map([...tbody.children].map((tr) => [tr.dataset.id, tr]))
    let prev = null
    for (const u of list) {
      let tr = byId.get(String(u.id))
      if (tr) byId.delete(String(u.id))
      else { tr = document.createElement('tr'); tr.dataset.id = u.id; tr.tabIndex = 0 }
      const html = rowHtml(u)
      if (tr._html !== html) { tr.innerHTML = html; tr._html = html }
      const want = prev ? prev.nextSibling : tbody.firstChild
      if (tr !== want) tbody.insertBefore(tr, want)
      prev = tr
    }
    byId.forEach((tr) => tr.remove())
    tbody.closest('.table-wrap').hidden = !list.length
    $('mp-empty').hidden = !!list.length
    if (!list.length) {
      const none = !S.users.length
      $('mp-empty-t').textContent = none ? 'Пока никого' : query ? 'Никого не нашлось' : 'Здесь пусто'
      $('mp-empty-p').textContent = none ? 'Добавьте первого человека, и у него появится своя ссылка на подписку' : query ? 'Проверьте написание имени или заметки' : 'Здесь пока никого'
    }
  }

  function renderHead() {
    const c = { all: S.users.length, active: 0, ended: 0, off: 0 }
    for (const u of S.users) c[group(u)]++
    $('mp-count-all').textContent = c.all
    $('mp-n-active').textContent = c.active
    const on = S.users.filter((u) => u.online?.length).length
    $('mp-n-active-f').textContent = on ? `${on} в сети сейчас` : 'подписка работает'
    $('mp-n-ended').textContent = c.ended
    $('mp-n-ended').closest('.stat').classList.toggle('mp-bad', c.ended > 0)
    $('mp-traffic').textContent = bytes(S.users.reduce((a, u) => a + u.used, 0))
    const tp = S.template
    $('mp-tpl-ver').textContent = tp ? tp.version : 'Нет'
    $('mp-tpl-foot').textContent = !tp ? 'не загружен' : tp.rejected && tp.rejected.fetched_at > tp.since ? 'новая не прошла проверку' : tp.pending ? 'есть новая версия' : 'проверена ' + (new Date(tp.checked * 1000).toDateString() === new Date().toDateString() ? 'в ' + TF.format(new Date(tp.checked * 1000)) : date(tp.checked))
    const ok = S.xray.ok
    $('mp-xray-alert').hidden = ok
    // IP не открывается из России: плашка над списком и точка у «Адреса»
    const w = S.watch || {}, cut = w.on && (w.state === 'blocked' || w.state === 'down')
    $('mp-block-alert').hidden = !cut; $('mp-addr-dot').hidden = !cut
    if (cut) {
      $('mp-block-t').textContent = w.state === 'down' ? 'Сервер не отвечает ни из России, ни из-за границы' : `IP ${w.ip} не открывается из России`
      $('mp-block-p').textContent = w.state === 'down' ? 'Посмотрите, работает ли он у хостера' : 'Приложения в России не подключатся. Можно сменить IP или домен'
    }
    if (!ok && S.xray.error) $('mp-xray-err').textContent = S.xray.error + '. Изменения применятся, когда он снова заработает'
    $('mp-server-foot').textContent = S.settings.domain || S.settings.server_name
    const lg = S.settings.login || 'admin'; $('mp-acc-login').textContent = lg; $('mp-acc-av').textContent = lg.slice(0, 1).toUpperCase()
  }

  const paint = () => { renderHead(); render(); if (openId) fillDetail(false); document.dispatchEvent(new CustomEvent('mp-state')) }

  const listEl = $('mp-list')
  let t
  const change = () => { listEl.classList.add('out'); clearTimeout(t); t = setTimeout(() => { render(); listEl.classList.remove('out') }, parseFloat(getComputedStyle(listEl).getPropertyValue('--dur-swap-out')) || 200) }   // ждём, пока старое погаснет (токен системы)
  let typing
  $('mp-search').addEventListener('input', () => { clearTimeout(typing); typing = setTimeout(() => { const v = $('mp-search').value.trim(); if (v !== query) { query = v; change() } }, 250) })

  // ---------- карточка пользователя ----------
  let openId = null
  const cur = () => S.users.find((u) => u.id === openId)
  const dForm = $('mp-d-form')
  const toDateInput = (t) => { if (!t) return ''; const d = new Date(t * 1000); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
  const fromDateInput = (v) => { if (!v) return 0; const [y, m, d] = v.split('-').map(Number); return Math.floor(new Date(y, m - 1, d, 23, 59, 59).getTime() / 1000) }
  const setCopy = (inp, btn, url) => { inp.value = url; btn.dataset.copy = url }

  function fillDetail(form = true) {
    const u = cur(); if (!u) return
    $('mp-d-title').textContent = u.name
    $('mp-d-state').textContent = ST[u.state][0] + ', ' + left(u)
    setCopy($('mp-d-url'), $('mp-d-copy'), u.url)
    $('mp-d-open').href = u.url
    $('mp-d-used').innerHTML = bytes(u.used) + (u.limit ? ` <small>из ${gbOf(u.limit)} ГБ</small>` : ' <small>без лимита</small>')
    const p = u.limit ? Math.min(1, u.used / u.limit) : 0
    $('mp-d-prog').hidden = !u.limit
    $('mp-d-prog').firstElementChild.style.setProperty('--p', p.toFixed(3))
    $('mp-d-usage-note').textContent = (u.period === 'month' && u.reset_at ? `Лимит на месяц, счётчик обнулится ${date(u.reset_at)}. ` : '') + `Отдано ${bytes(u.down)}, принято ${bytes(u.up)}`
    // устройства: IP, с которых подключён сейчас
    const blocked = u.block_until > now()
    $('mp-d-block').hidden = !blocked
    if (blocked) $('mp-d-block-t').textContent = 'Доступ закрыт до ' + TF.format(new Date(u.block_until * 1000))
    $('mp-d-unblock-row').hidden = !blocked
    $('mp-d-ips').innerHTML = (u.online || []).map((o) => `<div><dt>${esc(o.ip)}</dt><dd>${now() - o.at < 120 ? 'сейчас' : ago(o.at)}</dd></div>`).join('')
    $('mp-d-ips').hidden = !u.online?.length
    $('mp-d-dev-note').textContent = (u.online?.length ? '' : `Сейчас не подключён, в сети ${ago(u.last_active)}. `) + (u.devices ? `Разрешено устройств одновременно: ${u.devices}` : 'Без ограничения по устройствам')
    if (!form) return
    dForm.enabled.checked = u.enabled
    dForm.name.value = u.name
    dForm.note.value = u.note || ''
    window.mpKits?.fill(dForm.kit, u.kit)
    window.mpExits?.fill(dForm.exit, dForm.exit_fail, u.exit, u.exit_fail, 'С адреса сервера')
    dForm.limit.value = gbOf(u.limit)
    dForm.period.value = u.period || ''; dForm.period.dispatchEvent(new Event('change'))
    // значения не из списка (задано раньше числом) — добавляем пунктом, чтобы не потерялось
    const dv = String(u.devices || '')
    if (dv && ![...dForm.devices.options].some((o) => o.value === dv)) dForm.devices.add(new Option(dv, dv))
    dForm.devices.value = dv; dForm.devices.dispatchEvent(new Event('change'))
    dForm.expire.value = toDateInput(u.expire)
    window.fieldError?.(dForm.limit, '')
  }
  async function loadUserChart(id) {
    const box = $('mp-d-chart'); box._key = ''; box.replaceChildren()
    try { const r = await api('GET', 'api/traffic?days=30&user=' + id); if (openId === id) drawChart(box, r.days, 'Трафик по дням') } catch (e) {}
  }
  // Ссылки на каждое подключение по отдельности: нажатие на строку копирует
  let userLinks = []
  async function loadUserLinks(id) {
    const box = $('mp-d-links'), sec = $('mp-d-links-sec')
    try { const r = await api('GET', `api/users/${id}/links`); if (openId !== id) return; userLinks = r.links || [] } catch (e) { if (openId !== id) return; userLinks = [] }
    // то же поле с кнопкой копирования, что у ссылки на подписку
    box.innerHTML = userLinks.map((l) => `<div class="field"><span class="label"><span>${named(l.name)}</span><span class="opt">${esc(l.proto)}</span></span><span class="copy-field"><input class="input" readonly value="${esc(l.url)}" aria-label="Ссылка: ${esc(l.name)}, ${esc(l.proto)}"><button class="icon-btn icon-btn-sm" type="button" aria-label="Скопировать ссылку" data-copy="${esc(l.url)}"></button></span></div>`).join('')
    sec.hidden = !userLinks.length; window.initInputs?.(box)
  }
  function openDetail(id) { openId = Number(id); $('mp-d-links-sec').hidden = true; fillDetail(); $('mp-detail').showModal(); loadUserChart(openId); loadUserLinks(openId) }
  $('mp-d-unblock').addEventListener('click', (e) => busy(e.currentTarget, async () => {
    const u = cur(); if (!u) return
    try { const r = await api('PATCH', 'api/users/' + u.id, { unblock: true }); putUser(r.user); fillDetail(false); toast({ type: 'success', title: 'Доступ открыт', text: u.name }) } catch (err) { fail(err) }
  }))
  $('mp-detail').addEventListener('close', () => { openId = null })
  tbody.addEventListener('click', (e) => { const tr = e.target.closest('tr'); if (tr) openDetail(tr.dataset.id) })
  tbody.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.matches('tr')) openDetail(e.target.dataset.id) })

  const parseGb = (v) => { const n = parseFloat(String(v).replace(',', '.').replace(/\s/g, '')); return n > 0 ? Math.round(n * GB) : 0 }
  // лимит: пусто или 0 — без лимита; не число — ошибка, а не молчаливое «без лимита»
  const limitOk = (inp) => {
    const v = inp.value.replace(',', '.').replace(/\s/g, '')
    const ok = !v || /^\d+(\.\d+)?$/.test(v)
    window.fieldError?.(inp, ok ? '' : 'Нужно число гигабайт, например 50')
    if (!ok) inp.focus()
    return ok
  }
  const putUser = (u) => { const i = S.users.findIndex((x) => x.id === u.id); if (i >= 0) S.users[i] = u; else S.users.push(u); paint() }

  dForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const u = cur(); if (!u) return
    if (!limitOk(dForm.limit)) return
    busy(document.querySelector('[form="mp-d-form"]'), async () => {
      try {
        const r = await api('PATCH', 'api/users/' + u.id, { name: dForm.name.value, note: dForm.note.value, limit: parseGb(dForm.limit.value), expire: fromDateInput(dForm.expire.value), enabled: dForm.enabled.checked, period: dForm.period.value, devices: Number(dForm.devices.value) || 0, kit: Number(dForm.kit.value) || undefined, exit: Number(dForm.exit.value) || 0, exit_fail: dForm.exit_fail.value })
        putUser(r.user); fillDetail(); loadUserLinks(u.id); toast({ type: 'success', title: 'Сохранено', text: ST[r.user.state][0] + ', ' + left(r.user) })
      } catch (err) { fail(err) }
    })
  })
  dForm.querySelectorAll('[data-add-days]').forEach((b) => b.addEventListener('click', () => {
    const base = Math.max(fromDateInput(dForm.expire.value) || 0, now())
    dForm.expire.value = toDateInput(base + Number(b.dataset.addDays) * 86400)
  }))
  $('mp-d-noexp').addEventListener('click', () => { dForm.expire.value = '' })   // бессрочно; применится по «Сохранить»

  // Включение и выключение — сразу, без «Сохранить»: иначе легко закрыть шторку, думая, что подписка уже выключена
  dForm.enabled.addEventListener('change', async () => {
    const u = cur(); if (!u) return
    const on = dForm.enabled.checked
    try { const r = await api('PATCH', 'api/users/' + u.id, { enabled: on }); putUser(r.user); fillDetail(false); toast({ type: 'success', title: on ? 'Подписка включена' : 'Подписка выключена', text: u.name }) }
    catch (err) { dForm.enabled.checked = !on; fail(err) }
  })

  $('mp-d-qrbtn').addEventListener('click', () => { $('mp-d-qr').innerHTML = qrSvg(cur().url); $('mp-qr-dlg').showModal() })

  // Подтверждение для необратимого
  function confirmAct(title, text, okLabel) {
    const d = $('mp-confirm')
    $('mp-c-t').textContent = title; $('mp-c-p').textContent = text; $('mp-c-ok').firstElementChild.textContent = okLabel
    d.showModal()
    return new Promise((res) => {
      const ok = () => { cleanup(); d.close(); res(true) }, no = () => { cleanup(); res(false) }
      const cleanup = () => { $('mp-c-ok').removeEventListener('click', ok); d.removeEventListener('close', no) }
      $('mp-c-ok').addEventListener('click', ok); d.addEventListener('close', no)
    })
  }

  $('mp-d-reset').addEventListener('click', async () => {
    const u = cur(); if (!u) return
    if (!await confirmAct('Обнулить трафик?', `Счётчик «${u.name}» начнётся с нуля, лимит останется прежним. Прошлые цифры не вернуть`, 'Обнулить')) return
    try { await api('POST', `api/users/${u.id}/reset`); u.used = u.up = u.down = 0; u.state = stateOf(u); paint(); toast({ type: 'success', title: 'Трафик обнулён', text: u.name }) } catch (e) { fail(e) }
  })
  $('mp-d-regen').addEventListener('click', async () => {
    const u = cur(); if (!u) return
    if (!await confirmAct('Выдать новую ссылку?', `Старая ссылка для «${u.name}» перестанет работать, в приложение нужно будет добавить новую`, 'Выдать новую')) return
    try { const r = await api('POST', `api/users/${u.id}/regen`); putUser(r.user); fillDetail(false); loadUserLinks(u.id); toast({ type: 'success', title: 'Новая ссылка готова', text: 'Отправьте её заново, старая больше не работает' }) } catch (e) { fail(e) }
  })
  $('mp-d-del').addEventListener('click', async () => {
    const u = cur(); if (!u) return
    if (!await confirmAct(`Удалить «${u.name}»?`, 'Подписка перестанет работать сразу, а счётчики трафика удалятся. Вернуть не получится', 'Удалить')) return
    try { await api('DELETE', 'api/users/' + u.id); S.users = S.users.filter((x) => x.id !== u.id); $('mp-detail').close(); paint(); toast({ title: 'Удалено', text: u.name }) } catch (e) { fail(e) }
  })

  // ---------- добавление ----------
  const aForm = $('mp-add-form')
  aForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = aForm.name.value.trim()
    if (!name) { window.fieldError?.(aForm.name, 'Напишите, кому подписка'); aForm.name.focus(); return }
    window.fieldError?.(aForm.name, '')
    if (!limitOk(aForm.limit)) return
    busy(aForm.querySelector('button[type=submit]'), async () => {
      try {
        const r = await api('POST', 'api/users', { name, note: aForm.note.value.trim(), limit: parseGb(aForm.limit.value), period: aForm.period.value, devices: Number(aForm.devices.value) || 0, kit: Number(aForm.kit.value) || undefined, exit: Number(aForm.exit.value) || 0, exit_fail: aForm.exit_fail.value, expire: Number(aForm.days.value) ? now() + Number(aForm.days.value) * 86400 : 0 })
        putUser(r.user)
        $('mp-add').close(); aForm.reset(); aForm.days.dispatchEvent(new Event('change')); aForm.period.dispatchEvent(new Event('change')); aForm.devices.dispatchEvent(new Event('change'))
        setCopy($('mp-made-url'), $('mp-made-copy'), r.user.url)
        $('mp-made-t').textContent = `Ссылка для «${r.user.name}» готова`
        $('mp-made-p').textContent = 'Отправьте её человеку: по ней откроется страница с инструкцией'
        $('mp-made').showModal()
      } catch (err) { fail(err) }
    })
  })

  // ---------- шаблон ----------
  function fillTpl() {
    const tp = S.template
    const rows = !tp ? [['Версия', 'не загружен']] : [['Версия autoXRAY', tp.version], ['Откуда', tp.source === 'github' ? 'GitHub' : 'встроенная копия'], ['Применён', date(tp.since)], ['Проверен', ago(tp.checked)], ['Отпечаток', tp.hash.slice(0, 12)]]
    if (tp?.pending) rows.push(['Ждёт применения', 'новая версия от ' + date(tp.pending.fetched_at)])
    $('mp-tpl-kv').innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')
    const rej = tp?.rejected && tp.rejected.fetched_at >= (tp.since || 0)
    $('mp-tpl-rej').hidden = !rej
    if (rej) $('mp-tpl-rej-t').textContent = 'Оставили рабочую. Ошибка: ' + tp.rejected.error
    $('mp-tpl-auto').checked = !!S.settings.autoupdate
    $('mp-tpl-back').hidden = !tp?.rollback
  }
  document.addEventListener('mp-page', (e) => { if (e.detail === 'srv') fillTpl() })
  $('mp-tpl-check').addEventListener('click', (e) => busy(e.currentTarget, async () => {
    try {
      const r = await api('POST', 'api/template/check'); S = r.state || S; paint(); fillTpl()
      toast(r.ok ? { type: 'success', title: r.changed ? 'Шаблон обновлён' : 'Новой версии нет', text: 'Версия ' + S.template?.version } : { type: 'error', title: 'Шаблон не обновился', text: r.error })
    } catch (err) { fail(err) }
  }))
  $('mp-tpl-back').addEventListener('click', (e) => busy(e.currentTarget, async () => {
    try { S = await api('POST', 'api/template/rollback'); paint(); fillTpl(); toast({ type: 'success', title: 'Вернули прошлую версию', text: 'Версия ' + S.template?.version }) } catch (err) { fail(err) }
  }))
  $('mp-tpl-auto').addEventListener('change', async (e) => {
    try { S = await api('PATCH', 'api/settings', { autoupdate: e.target.checked }); paint() } catch (err) { e.target.checked = !e.target.checked; fail(err) }
  })

  // ---------- настройки ----------
  const sForm = $('mp-set-form')
  function fillSet() {
    const s = S.settings
    sForm.server_name.value = s.server_name; sForm.update_hours.value = s.update_hours; sForm.support_url.value = s.support_url || ''; sForm.password.value = ''; sForm.login.value = s.login || ''
    sForm.tg_token.value = s.tg_token || ''; sForm.tg_chat.value = s.tg_chat || ''
    sForm.fp.value = s.fp; sForm.fp.dispatchEvent(new Event('change'))
  }
  document.addEventListener('mp-page', (e) => { if (e.detail === 'set') fillSet() })
  document.addEventListener('mp-page', (e) => { if (e.detail === 'srv') fillUpd() })

  // ---------- обновление monolit из релизов GitHub ----------
  let updPoll = 0
  function fillUpd() {
    const u = S.update; if (!u) return
    const st = u.status, running = st?.state === 'running' && now() - st.at < 900
    const rows = [['Установлена', 'v' + u.current], ['Последняя', u.latest ? u.latest.tag + (u.latest.published ? ' от ' + date(u.latest.published) : '') : 'релизов пока нет'], ['Проверено', u.checked ? ago(u.checked) : 'ещё нет']]
    if (u.error) rows.push(['Ошибка проверки', u.error])
    $('mp-up-kv').innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')
    const failed = st?.state === 'failed' && now() - st.at < 86400
    $('mp-up-fail').hidden = !failed
    if (failed) $('mp-up-fail-t').textContent = st.text
    $('mp-up-new').hidden = !u.available || running
    if (u.available) { $('mp-up-new-t').textContent = 'Вышла ' + u.latest.tag; $('mp-up-notes').textContent = u.latest.notes || 'Без описания' }
    $('mp-up-run').hidden = !running
    if (running) $('mp-up-run').textContent = st.text + '. Админка перезапустится, страница обновится сама'
    $('mp-up-go').hidden = !u.available || running
    if (u.available) $('mp-up-go').lastElementChild.textContent = 'Обновить до ' + u.latest.tag
    if (running && !updPoll) watchUpd()
  }
  // Во время установки админка перезапускается: ошибки запросов ожидаемы, ждём ответа с итогом
  function watchUpd() {
    const from = S.update.current, t0 = Date.now()
    updPoll = setInterval(async () => {
      let u; try { u = await api('GET', 'api/update') } catch (e) { return }
      S.update = u; fillUpd()
      const st = u.status
      if (st?.state === 'done' || u.current !== from) { clearInterval(updPoll); updPoll = 0; toast({ type: 'success', title: 'monolit обновлён', text: 'Версия ' + u.current }); if (!DEMO) setTimeout(() => location.reload(), 1500) }
      else if (st?.state === 'failed') { clearInterval(updPoll); updPoll = 0; toast({ type: 'error', title: 'Обновление не встало', text: st.text }) }
      else if (Date.now() - t0 > 15 * 60e3) { clearInterval(updPoll); updPoll = 0 }
    }, 3000)
  }
  $('mp-up-check').addEventListener('click', (e) => busy(e.currentTarget, async () => {
    try { S.update = await api('POST', 'api/update/check'); fillUpd(); toast(S.update.available ? { type: 'success', title: 'Есть новая версия', text: S.update.latest.tag } : { title: 'Новой версии нет', text: 'Установлена последняя, v' + S.update.current }) } catch (err) { fail(err) }
  }))
  $('mp-up-go').addEventListener('click', async (e) => {
    const u = S.update, btn = e.currentTarget
    if (!await confirmAct(`Обновить до ${u.latest.tag}?`, 'Скачаем релиз с GitHub и переустановим. Админка перезапустится, подключения VPN могут оборваться на пару секунд. Если новая версия не встанет, вернём прежнюю', 'Обновить')) return
    busy(btn, async () => {
      try { await api('POST', 'api/update'); S.update.status = { state: 'running', to: u.latest.tag, from: u.current, at: now(), text: 'Скачиваю ' + u.latest.tag }; fillUpd() } catch (err) { fail(err) }
    })
  })

  // ---------- бэкап и восстановление ----------
  $('mp-bk-get').addEventListener('click', (e) => { if (DEMO) { e.preventDefault(); toast({ title: 'В демо бэкапа нет' }) } })
  $('mp-bk-dz').addEventListener('files-added', async (e) => {
    const f = e.detail.files[0]; if (!f) return
    if (f.size > 64 * 1024 ** 2) { fail(new Error('Файл больше 64 МБ')); return }
    let text, b
    try { text = await f.text(); b = JSON.parse(text); if (b.monolit_backup !== 1) throw new Error() } catch (err) { fail(new Error('Это не файл бэкапа monolit')); return }
    const when = b.created ? date(b.created) + ' в ' + TF.format(new Date(b.created * 1000)) : 'без даты'
    if (!await confirmAct('Восстановить из бэкапа?', `Сервер «${b.server || '?'}», ${when}, пользователей: ${b.users ?? '?'}. Всё, что сейчас в админке, заменится. Текущая база останется на сервере рядом, но вернуть её можно только вручную. После перезапуска войдите с логином и паролем из бэкапа`, 'Восстановить')) return
    try {
      await api('POST', 'api/restore', text)
      toast({ type: 'success', title: 'Восстанавливаем', text: 'Админка перезапускается' })
      if (DEMO) return
      // ждём, пока админка поднимется с новой базой
      const t0 = Date.now(), iv = setInterval(async () => {
        try { const r = await fetch('api/state', { credentials: 'same-origin' }); if (r.status === 401 || r.ok) { clearInterval(iv); location.reload() } } catch (err) {}
        if (Date.now() - t0 > 120e3) clearInterval(iv)
      }, 2000)
    } catch (err) { fail(err) }
  })
  sForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const pw = sForm.password.value
    if (pw && pw.length < 8) { window.fieldError?.(sForm.password, 'Нужно не меньше 8 символов'); return }
    if (pw && pw.trim() !== pw) { window.fieldError?.(sForm.password, 'Без пробелов в начале и в конце: при входе их легко потерять'); return }
    window.fieldError?.(sForm.password, '')
    const login = sForm.login.value.trim(), relogin = pw || login !== S.settings.login
    if (!/^[\p{L}\p{N}_.@-]{3,32}$/u.test(login)) { window.fieldError?.(sForm.login, 'От 3 до 32 букв, цифр и знаков . _ - @'); return }
    window.fieldError?.(sForm.login, '')
    busy(document.querySelector('[form="mp-set-form"]'), async () => {
      try {
        S = await api('PATCH', 'api/settings', { server_name: sForm.server_name.value, tg_token: sForm.tg_token.value, tg_chat: sForm.tg_chat.value, fp: sForm.fp.value, update_hours: sForm.update_hours.value, support_url: sForm.support_url.value, login, ...(pw ? { password: pw } : {}) })
        paint()
        if (relogin) { toast({ type: 'success', title: pw ? 'Пароль сменён' : 'Логин сменён', text: 'Войдите заново' }); showLogin() } else toast({ type: 'success', title: 'Настройки сохранены' })
      } catch (err) { fail(err) }
    })
  })

  // Проверка Telegram: тестовое сообщение по введённым токену и чату. Чат пустой — сервер возьмёт его из сообщения боту
  $('mp-tg-test').addEventListener('click', (e) => {
    const token = sForm.tg_token.value.trim(), chat = sForm.tg_chat.value.trim()
    if (!token) { window.fieldError?.(sForm.tg_token, 'Вставьте токен от @BotFather'); return }
    window.fieldError?.(sForm.tg_token, '')
    busy(e.currentTarget, async () => {
      try { const r = await api('POST', 'api/notify/test', { token, chat }); if (r.chat && !chat) sForm.tg_chat.value = r.chat; toast({ type: 'success', title: 'Сообщение отправлено', text: 'Нажмите «Сохранить», чтобы уведомления приходили' }) } catch (err) { fail(err) }
    })
  })

  // Для разделов сервера (server.js, addr.js)
  window.mpAdmin = { demo: () => DEMO, api: (m, p, b) => api(m, p, b), confirm: confirmAct, setCopy, domain: () => S?.settings?.domain || location.hostname,
    state: () => S, openUser: (id) => openDetail(id), setState: (s) => { S = s; paint() }, bytes, ago, refresh: () => api('GET', 'api/state').then((s) => { S = s; paint() }).catch(() => {}) }

  // ---------- QR в SVG ----------
  function qrSvg(text) {
    const q = qrcode(0, 'M'); q.addData(text); q.make()
    const n = q.getModuleCount(); let d = ''
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.isDark(y, x)) d += `M${x} ${y}h1v1h-1z`
    return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" role="img" aria-label="QR-код ссылки"><path d="${d}" fill="#000"/></svg>`
  }

  // ---------- загрузка и обновление раз в минуту ----------
  async function load() {
    try { S = await api('GET', 'api/state') }
    catch (e) {
      if (!DEMO && /404|Failed to fetch|NetworkError|Сервер ответил/.test(e.message) && !/Нужно войти/.test(e.message)) { DEMO = true; S = demoState() }
      else if (/Нужно войти/.test(e.message)) return
      else throw e
    }
    $('mp-login').hidden = true; $('mp-app').hidden = false
    paint(); loadTotal()
  }
  // Шторки и окна открываются сверху, а не там, где их прокрутили в прошлый раз
  document.querySelectorAll('dialog').forEach((d) => new MutationObserver(() => { if (d.open) d.querySelectorAll('.sheet-body, .dialog-main').forEach((b) => { b.scrollTop = 0 }) }).observe(d, { attributes: true, attributeFilter: ['open'] }))
  if (DEMO) S = demoState()
  load().catch(fail)
  setInterval(() => { if (!document.hidden && !$('mp-app').hidden && !DEMO) api('GET', 'api/state').then((s) => { S = s; paint(); loadTotal(); if (openId) api('GET', 'api/traffic?days=30&user=' + openId).then((r) => openId && drawChart($('mp-d-chart'), r.days, 'Трафик по дням')).catch(() => {}) }).catch(() => {}) }, 60000)
})()

;
// server.js
// Админка monolit proxy: сервер, маршруты, WARP, протоколы, история конфигов Xray.
// Данные — GET api/server (в демо — свои). Каждое изменение сервер проверяет xray -test и применяет с откатом
(() => {
  const $ = (id) => document.getElementById(id)
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const DEMO = () => window.mpAdmin?.demo()
  const toast = (o) => window.toast?.(o)
  const fail = (e) => toast({ type: 'error', title: 'Не получилось', text: e.message })
  const busy = async (btn, fn) => { btn.disabled = true; btn.classList.add('is-loading'); try { return await fn() } finally { btn.disabled = false; btn.classList.remove('is-loading') } }
  const DT = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
  const plural = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c }
  const dur = (s) => { const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60); return d ? `${d} ${plural(d, 'день', 'дня', 'дней')}` : h ? `${h} ч ${m} мин` : `${m} мин` }
  const TO = { direct: ['Напрямую', 'globe', ''], warp: ['Через WARP', 'cloud', 'badge-info'], block: ['В блок', 'shield', 'badge-warning'] }
  const icon = (n) => `<i data-lucide="${n}"></i>`
  const icons = () => window.lucide?.createIcons()

  let M = null, ST = null, PRESETS = []   // состояние управления, состояние сервера, готовые наборы

  // ---------- демо ----------
  const demo = {
    M: { mode: 'front', managed: true, targets: ['direct', 'warp', 'block'],
      routes: [{ id: 1, on: true, name: 'Нейросети', values: ['openai.com', 'chatgpt.com', 'claude.ai', 'anthropic.com', 'gemini.google.com'], to: 'warp' }, { id: 2, on: true, name: 'Реклама', values: ['geosite:category-ads-all'], to: 'block' }, { id: 3, on: false, name: 'Почта', values: ['25', '465', '587'], to: 'block' }],
      warp: { on: true, registered: true, plus: true, account: 'free' }, proto: { vision: true, hy2: true, xhttp: true, hy2_known: true, xhttp_known: true, reality: false, reality_can: true },
      socks: { on: false, port: 1080, user: 'u7k2pq', pass: 'Zr8vX2mQp4Lk' }, mtg: { port: 8443, link: 'tg://proxy?server=vpn.example.ru&port=8443&secret=ee1fc7b3' },
      history: [{ id: 3, at: Date.now() / 1000 - 300, note: 'Маршрут добавлен' }, { id: 2, at: Date.now() / 1000 - 7200, note: 'WARP включён' }, { id: 1, at: Date.now() / 1000 - 90000, note: 'Протоколы' }] },
    ST: { agent: true, xray: 'active', nginx: 'active', version: '26.11.9', since: Date.now() / 1000 - 3 * 86400, mem: 41 * 1048576, cert_end: Date.now() / 1000 + 61 * 86400, mtg: 'running', load: '0.14 0.11 0.08', uptime: 12 * 86400 },
    P: [{ id: 'ai', name: 'Нейросети через WARP', to: 'warp', values: ['openai.com'] }, { id: 'ads', name: 'Реклама в блок', to: 'block', values: [] }, { id: 'torrent', name: 'Торренты в блок', to: 'block', values: ['bittorrent'] }],
  }
  async function demoApi(method, path, body) {
    await new Promise((r) => setTimeout(r, 400))
    const m = demo.M, hist = (note) => m.history.unshift({ id: (m.history[0]?.id || 0) + 1, at: Date.now() / 1000, note })
    if (path === 'api/server') return { manage: m, status: demo.ST, presets: demo.P }
    if (path.startsWith('api/server/journal')) return { text: '2026-11-13T14:55:42+00:00 xray[10903]: Xray 26.11.9 started\n2026-11-13T15:01:02+00:00 xray[10903]: [Warning] core: Xray 26.11.9 started' }
    if (path.startsWith('api/server/')) return { ok: true, text: 'Готово' }
    if (path.startsWith('api/routes/reach')) { const h = decodeURIComponent(path.split('host=')[1] || ''); await new Promise((r) => setTimeout(r, 900)); const blocked = /openai|chatgpt|claude|gemini/.test(h); return { host: h, server: blocked ? { code: 403, ms: 184, curl: 0 } : { code: 200, ms: 212, curl: 0 }, warp: m.warp.on ? { code: 200, ms: 347, curl: 0 } : undefined } }
    if (path.startsWith('api/routes/test')) { const h = decodeURIComponent(path.split('host=')[1] || ''); const r = m.routes.find((x) => x.on && x.values.some((v) => h === v || h.endsWith('.' + v))); return { route: r || null, maybe: [] } }
    if (path === 'api/routes' && method === 'POST') { m.routes.push({ id: Math.max(0, ...m.routes.map((r) => r.id)) + 1, on: true, name: body.name || body.values[0], values: body.values, to: body.to }); hist('Маршрут добавлен'); return { ok: true, manage: m } }
    if (path === 'api/routes/order') { m.routes.sort((a, b) => body.ids.indexOf(a.id) - body.ids.indexOf(b.id)); hist('Порядок маршрутов'); return { ok: true, manage: m } }
    if (path === 'api/routes/preset') { const p = demo.P.find((x) => x.id === body.name); m.routes.push({ id: Math.max(0, ...m.routes.map((r) => r.id)) + 1, on: true, name: p.name, values: p.values, to: p.to }); hist('Готовый набор'); return { ok: true, manage: m } }
    const rid = Number((/routes\/(\d+)/.exec(path) || [])[1])
    if (rid && method === 'PATCH') { Object.assign(m.routes.find((r) => r.id === rid), body); hist('Маршрут изменён'); return { ok: true, manage: m } }
    if (path === 'api/routes' && method === 'DELETE') { m.routes = []; hist('Все маршруты удалены'); return { ok: true, manage: m } }
    if (rid && method === 'DELETE') { m.routes = m.routes.filter((r) => r.id !== rid); hist('Маршрут удалён'); return { ok: true, manage: m } }
    if (path === 'api/warp') { m.warp.on = body.on; hist(body.on ? 'WARP включён' : 'WARP выключен'); return { ok: true, manage: m } }
    if (path === 'api/warp/check') return { ok: true, warp: 'on', ip: '104.28.0.7', loc: 'NL', colo: 'AMS' }
    if (path === 'api/warp/register') { hist('WARP: новая регистрация'); return { ok: true, manage: m } }
    if (path === 'api/warp/license') { m.warp.account = 'unlimited'; return { ok: true, account: 'unlimited', manage: m } }
    if (path === 'api/proto') { if ('hy2' in body) m.proto.hy2 = body.hy2; if ('xhttp' in body) m.proto.xhttp = body.xhttp; if ('reality' in body) m.proto.reality = body.reality; if (body.socks) Object.assign(m.socks, body.socks); hist('Протоколы'); return { ok: true, manage: m } }
    if (path === 'api/mtg') { demo.ST.mtg = body.on ? 'running' : 'exited'; return { ok: true, manage: m } }
    if (/history\/\d+\/rollback/.test(path)) { hist('Возврат к прошлой версии'); return { ok: true, manage: m } }
    if (/history\/\d+$/.test(path)) return { inbounds: [], outbounds: [], routing: { rules: [] } }
    throw new Error('Нет такого действия')
  }
  async function api(method, path, body) {
    if (DEMO()) return demoApi(method, path, body)
    return window.mpAdmin.api(method, path, body)
  }
  const take = (r) => { if (r?.manage) M = r.manage; return r }
  // Изменение с перезапуском Xray: сервер отвечает сразу, а результат ждём по api/job.
  // Пока Xray перезапускается, запросы могут обрываться: это не ошибка, спрашиваем снова
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  async function run(method, path, body) {
    const r = await api(method, path, body)
    if (!r?.pending) return r
    const until = Date.now() + 150000
    await sleep(1500)
    while (Date.now() < until) {
      let j = null
      try { j = await api('GET', 'api/job') } catch (e) {}
      if (j && j.job.id === r.job && !j.job.running) {
        if (!j.job.ok) { M = j.manage || M; throw new Error(j.job.error || 'Не получилось') }
        return { ...r, manage: j.manage, text: j.job.text || r.text, out: j.job.log || '' }
      }
      await sleep(1500)
    }
    throw new Error('Xray долго не отвечает, загляните в раздел «Сервер»')
  }

  async function load() {
    const r = await api('GET', 'api/server'); M = r.manage; ST = r.status; PRESETS = r.presets || []
    paintAll()
  }
  let loading = null
  const ensure = () => (loading ||= load().finally(() => { loading = null }))
  function paintAll() {
    document.querySelectorAll('.mp-foreign').forEach((a) => { a.hidden = M.managed })
    document.querySelectorAll('.mp-managed').forEach((a) => { a.hidden = !M.managed })
    paintSrv(); paintRoutes(); paintWarp(); paintProto(); paintHist()
  }

  // ---------- сервер ----------
  function paintSrv() {
    $('mp-srv-noagent').hidden = ST.agent
    $('mp-srv-noagent-t').textContent = ST.agent_error || ''
    $('mp-srv-acts').querySelectorAll('button').forEach((b) => { b.disabled = !ST.agent })
    $('mp-srv-state').hidden = !ST.agent
    if (!ST.agent) return
    // Одна строка, пока всё хорошо; nginx и сертификат — только когда с ними беда
    const now = Date.now() / 1000, left = ST.cert_end ? Math.floor((ST.cert_end - now) / 86400) : null, up = ST.xray === 'active'
    $('mp-srv-badge').classList.toggle('badge-success', up); $('mp-srv-badge').classList.toggle('badge-danger', !up)
    $('mp-srv-st').textContent = up ? 'Xray работает' : 'Xray не работает'
    $('mp-srv-info').textContent = [ST.version, up && ST.since ? dur(now - ST.since) + ' без перезапуска' : ''].filter(Boolean).join(', ')
    const mem = Number(ST.mem), load = String(ST.load || '').split(' ')[0]
    $('mp-srv-kv').innerHTML = [
      ST.cert_end ? ['Сертификат до', new Date(ST.cert_end * 1000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(' г.', '')] : null,
      mem ? ['Память Xray', Math.round(mem / 1048576) + ' МБ'] : null,
      load ? ['Нагрузка', load.replace('.', ',')] : null,
      ST.uptime ? ['Сервер работает', dur(Number(ST.uptime))] : null,
    ].filter(Boolean).map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')
    $('mp-srv-nginx').hidden = ST.nginx === 'active'
    $('mp-srv-cert').hidden = left === null || left >= 14
    if (left !== null && left < 14) $('mp-srv-cert-t').textContent = left <= 0 ? 'Сертификат закончился' : `Сертификат закончится через ${left} ${plural(left, 'день', 'дня', 'дней')}`
  }
  $('mp-srv-acts').addEventListener('click', async (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return
    const act = b.dataset.act
    if (act === 'journal') return showJournal(b)
    if (b.dataset.ask) { const [t, p, ok] = b.dataset.ask.split('|'); if (!await window.mpAdmin.confirm(t, p, ok)) return }
    busy(b, async () => {
      try { const r = await run('POST', 'api/server/' + act); toast({ type: 'success', title: r.text || 'Готово' }); await load() }
      catch (err) { fail(err) }
    })
  })
  async function showJournal(b) {
    await busy(b, async () => {
      try {
        const r = await api('GET', 'api/server/journal?n=100')
        $('mp-log-text').textContent = r.text || 'Пусто'
        $('mp-log-copy').dataset.copy = r.text || ''
        $('mp-log').showModal()
        const pre = $('mp-log').querySelector('pre'); pre.scrollTop = pre.scrollHeight
      } catch (err) { fail(err) }
    })
  }

  // ---------- маршруты ----------
  const list = $('mp-rt-list')
  const summary = (r) => r.values.slice(0, 3).join(', ') + (r.values.length > 3 ? ` и ещё ${r.values.length - 3}` : '')
  const rowHtml = (r) => `<div class="alist-row mp-rt${r.on ? '' : ' is-off'}${r.to === 'warp' && !M.warp.on ? ' is-idle' : ''}" data-id="${r.id}">
    <span class="alist-ic">${icon(TO[r.to][1])}</span>
    <button type="button" class="alist-tx mp-rt-open"><b>${esc(r.name)}</b><span>${esc(TO[r.to][0])}${r.to === 'warp' && !M.warp.on ? ' (WARP выключен)' : ''}: ${esc(summary(r))}</span></button>
    <input type="checkbox" role="switch" class="switch" ${r.on ? 'checked' : ''} aria-label="Правило «${esc(r.name)}» включено">
    <button type="button" class="icon-btn icon-btn-sm mp-rt-del" aria-label="Удалить правило «${esc(r.name)}»">${icon('trash-2')}</button></div>`
  function paintRoutes() {
    // строки обновляем по id: не перерисовываем список целиком
    const have = new Map([...list.children].map((el) => [Number(el.dataset.id), el]))
    M.routes.forEach((r, i) => {
      const html = rowHtml(r)
      let el = have.get(r.id)
      if (!el || el.dataset.h !== html) {
        const t = document.createElement('div'); t.innerHTML = html; const n = t.firstElementChild; n.dataset.h = html
        if (el) el.replaceWith(n); else list.append(n)
        el = n; icons(el)
      }
      if (list.children[i] !== el) list.insertBefore(el, list.children[i])
      have.delete(r.id)
    })
    for (const el of have.values()) {
      el.style.overflow = 'hidden'
      el.animate([{ height: el.offsetHeight + 'px', opacity: 1 }, { height: '0px', paddingTop: '0px', paddingBottom: '0px', opacity: 0 }], { duration: 200, easing: 'cubic-bezier(.23, 1, .32, 1)' }).onfinish = () => el.remove()
    }
    list.hidden = !M.routes.length; $('mp-rt-empty').hidden = !!M.routes.length; $('mp-rt-clear').hidden = !M.routes.length
    $('mp-rt-presets').innerHTML = PRESETS.map((p) => `<button class="btn btn-secondary btn-sm" type="button" data-preset="${p.id}" ${M.routes.some((r) => r.name === p.name) ? 'disabled' : ''}>${icon('plus')}${esc(p.name)}</button>`).join('')
    icons($('mp-rt-presets'))
  }
  list.addEventListener('change', async (e) => {
    const sw = e.target.closest('.switch'); if (!sw) return
    const id = Number(sw.closest('.mp-rt').dataset.id), on = sw.checked
    sw.disabled = true
    try { take(await run('PATCH', 'api/routes/' + id, { on })); paintAll(); toast({ type: 'success', title: on ? 'Правило включено' : 'Правило выключено' }) }
    catch (err) { sw.checked = !on; fail(err) } finally { sw.disabled = false }
  })
  list.addEventListener('click', (e) => {
    const b = e.target.closest('.mp-rt-open'); if (b) return openRoute(Number(b.closest('.mp-rt').dataset.id))
    const d = e.target.closest('.mp-rt-del'); if (d) delRoute(Number(d.closest('.mp-rt').dataset.id), d)
  })
  async function delRoute(id, btn) {
    const r = M.routes.find((x) => x.id === id); if (!r) return
    if (!await window.mpAdmin.confirm(`Удалить правило «${r.name}»?`, 'Адреса из него пойдут по следующим правилам или напрямую. Вернуть можно из истории', 'Удалить')) return
    if (btn) btn.disabled = true
    try { take(await run('DELETE', 'api/routes/' + id)); paintAll(); toast({ title: 'Правило удалено', text: r.name }) } catch (err) { if (btn) btn.disabled = false; fail(err) }
  }
  $('mp-rt-clear').addEventListener('click', (e) => {
    const n = M.routes.length; if (!n) return
    window.mpAdmin.confirm('Удалить все правила?', `Правил: ${n}. Всё пойдёт напрямую. Вернуть можно из истории`, 'Удалить все').then((ok) => {
      if (ok) busy(e.target.closest('button'), async () => { try { take(await run('DELETE', 'api/routes')); paintAll(); toast({ title: 'Все правила удалены', text: 'Вернуть можно из истории' }) } catch (err) { fail(err) } })
    })
  })
  $('mp-rt-add').addEventListener('click', () => openRoute(0))
  $('mp-rt-presets').addEventListener('click', (e) => {
    const b = e.target.closest('[data-preset]'); if (!b) return
    busy(b, async () => { try { take(await run('POST', 'api/routes/preset', { name: b.dataset.preset })); paintAll(); toast({ type: 'success', title: 'Набор добавлен', text: 'Применён после проверки Xray' }) } catch (err) { fail(err) } })
  })

  const rForm = $('mp-rt-form'), seg = $('mp-rt-to')
  let editId = 0, to = 'direct'
  const setTo = (v) => {
    to = v; const btn = seg.querySelector(`button[data-v="${v}"]`)
    if (seg.select) seg.select(btn, false); else seg.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)))
    $('mp-rt-to-hint').textContent = v === 'warp' && !M.warp.on ? 'WARP сейчас выключен: правило заработает, когда его включат' : v === 'block' ? 'Соединение с этими адресами будет сразу закрываться' : v === 'warp' ? 'Сайт увидит адрес Cloudflare, а не сервера' : 'С адреса сервера, как без правила. Нужно, чтобы исключить адреса из правил ниже'
  }
  seg.addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b && b.dataset.v !== to) setTo(b.dataset.v) })
  function openRoute(id) {
    editId = id; const r = M.routes.find((x) => x.id === id)
    $('mp-rtd-t').textContent = r ? 'Правило' : 'Новое правило'
    rForm.name.value = r?.name || ''; rForm.values.value = r ? r.values.join('\n') : ''
    window.fieldError?.(rForm.values, '')
    setTo(r?.to || 'warp'); $('mp-rt-more').hidden = !r
    const i = M.routes.indexOf(r)
    rForm.querySelector('[data-move="-1"]').disabled = i <= 0; rForm.querySelector('[data-move="1"]').disabled = i < 0 || i >= M.routes.length - 1
    $('mp-rt-dlg').showModal()
    rForm.values.dispatchEvent(new Event('input'))
  }
  rForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const values = rForm.values.value.split(/[\s,]+/).map((v) => v.trim()).filter(Boolean)
    if (!values.length) { window.fieldError?.(rForm.values, 'Добавьте хотя бы один адрес'); rForm.values.focus(); return }
    window.fieldError?.(rForm.values, '')
    const r = M.routes.find((x) => x.id === editId)
    busy(rForm.querySelector('button[type=submit]'), async () => {
      try {
        take(editId ? await run('PATCH', 'api/routes/' + editId, { name: rForm.name.value, values, to, on: r?.on ?? true }) : await run('POST', 'api/routes', { name: rForm.name.value, values, to }))
        $('mp-rt-dlg').close(); paintAll(); toast({ type: 'success', title: editId ? 'Правило сохранено' : 'Правило добавлено', text: 'Xray проверил и применил' })
      } catch (err) { window.fieldError?.(rForm.values, err.message) }
    })
  })
  rForm.querySelectorAll('[data-move]').forEach((b) => b.addEventListener('click', () => busy(b, async () => {
    const ids = M.routes.map((r) => r.id), i = ids.indexOf(editId), j = i + Number(b.dataset.move)
    if (i < 0 || j < 0 || j >= ids.length) return
    ;[ids[i], ids[j]] = [ids[j], ids[i]]
    try { take(await run('POST', 'api/routes/order', { ids })); paintAll(); openRoute(editId) } catch (err) { fail(err) }
  })))
  $('mp-rt-del').addEventListener('click', async () => {
    const r = M.routes.find((x) => x.id === editId); if (!r) return
    $('mp-rt-dlg').close()
    if (!await window.mpAdmin.confirm(`Удалить правило «${r.name}»?`, 'Адреса из него пойдут по следующим правилам или напрямую. Вернуть можно из истории', 'Удалить')) return
    try { take(await run('DELETE', 'api/routes/' + r.id)); paintAll(); toast({ title: 'Правило удалено', text: r.name }) } catch (err) { fail(err) }
  })
  $('mp-rt-test').addEventListener('submit', (e) => {
    e.preventDefault()
    const host = e.target.host.value.trim(), out = $('mp-rt-res'); if (!host) { e.target.host.focus(); return }
    grow(() => { out.textContent = host + ' → проверяем' })
    busy(e.target.querySelector('button'), async () => {
      try {
        const r = await api('GET', 'api/routes/test?host=' + encodeURIComponent(host))
        let t = r.route ? `${host} → ${({ direct: 'напрямую', warp: 'через WARP', block: 'в блок' })[r.route.to]}, правило «${r.route.name}»` : `${host} → напрямую, ни одно правило не подходит`
        if (r.maybe?.length && !r.route) t += `. Может попасть в ${r.maybe.map((x) => `«${x.route.name}» (${x.value})`).join(', ')}: что входит в geosite и geoip, знает только Xray`
        grow(() => { out.textContent = t })
      } catch (err) { fail(err) }
    })
    reach(host)
    showOut(true)
  })

  // Результат проверки появляется и уходит по высоте, без скачка того, что ниже
  let outAnim = null
  function showOut(on) {
    const el = $('mp-rt-out')
    if (on === !el.hidden && !outAnim) return
    outAnim?.cancel()
    const from = el.hidden ? 0 : el.offsetHeight
    el.hidden = false
    const to = on ? el.offsetHeight : 0, pad = getComputedStyle(el).paddingTop
    outAnim = el.animate([{ height: from + 'px', paddingTop: from ? pad : '0px', opacity: from ? 1 : 0 }, { height: to + 'px', paddingTop: to ? pad : '0px', opacity: on ? 1 : 0 }],
      { duration: on ? 240 : 200, easing: 'cubic-bezier(.23, 1, .32, 1)' })
    outAnim.onfinish = () => { outAnim = null; if (!on) el.hidden = true }
  }
  // Смена высоты открытого результата (новая строка, кнопка) — тоже плавно
  function grow(fn) {
    const el = $('mp-rt-out')
    if (el.hidden || outAnim) return fn()
    const a = el.offsetHeight; fn(); const b = el.offsetHeight
    if (a !== b) el.animate([{ height: a + 'px' }, { height: b + 'px' }], { duration: 240, easing: 'cubic-bezier(.23, 1, .32, 1)' })
  }
  $('mp-rt-test').host.addEventListener('input', (e) => { if (!e.target.value.trim()) { reachSeq++; showOut(false) } })

  // Доступность: с устройства (fetch без CORS, только «открылся или нет»), с сервера и через WARP (код ответа)
  const CURL = { 6: 'адрес не найден', 7: 'соединение отклонено', 28: 'нет ответа за 8 с', 35: 'ошибка TLS', 60: 'ошибка сертификата', 52: 'пустой ответ', 56: 'соединение оборвано', 97: 'WARP не отвечает' }
  const badge = (type, text) => `<span class="badge badge-${type}">${esc(text)}</span>`
  function verdict(r) {
    if (!r) return { ok: false, html: 'не ответил' }
    if (!r.code) return { ok: false, html: badge('danger', CURL[r.curl] || 'не открылся') }
    const t = `${r.code}, ${r.ms} мс`
    if (r.code === 403 || r.code === 451) return { ok: false, refused: true, html: badge('warning', t + ', отказ') }
    return { ok: r.code < 500, html: badge(r.code < 500 ? 'success' : 'warning', t) }
  }
  let reachSeq = 0, reachHost = ''
  async function reach(raw) {
    const host = raw.toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/[/:?#].*$/, '')
    const box = $('mp-rt-reach'), go = $('mp-rt-go'), seq = ++reachSeq, cell = (k) => box.querySelector(`[data-k="${k}"]`)
    if (!/^[a-z0-9.-]+\.[a-z0-9-]+$/.test(host)) { grow(() => { box.hidden = true; go.hidden = true }); return }
    reachHost = host
    for (const k of ['device', 'server', 'warp']) cell(k).textContent = 'проверяем'
    grow(() => { box.hidden = false; go.hidden = true })
    const t0 = performance.now()
    fetch('https://' + host + '/', { mode: 'no-cors', cache: 'no-store', signal: AbortSignal.timeout(8000) })
      .then(() => { if (seq === reachSeq) cell('device').innerHTML = badge('success', `открылся, ${Math.round(performance.now() - t0)} мс`) })
      .catch((e) => { if (seq === reachSeq) cell('device').innerHTML = badge('danger', e.name === 'TimeoutError' ? 'нет ответа за 8 с' : 'не открылся') })
    try {
      const r = await api('GET', 'api/routes/reach?host=' + encodeURIComponent(host))
      if (seq !== reachSeq) return
      const s = verdict(r.server); cell('server').innerHTML = s.html
      if (r.warp === undefined) { cell('warp').textContent = 'WARP выключен'; return }
      const w = verdict(r.warp); cell('warp').innerHTML = w.html
      const routed = M?.routes.some((x) => x.on && x.to === 'warp' && x.values.some((v) => host === v || host.endsWith('.' + v)))
      grow(() => { go.hidden = !(w.ok && !s.ok) || routed || !M?.managed })
    } catch (err) { if (seq === reachSeq) { cell('server').textContent = cell('warp').textContent = 'не проверили'; fail(err) } }
  }
  $('mp-rt-go').addEventListener('click', (e) => {
    const host = reachHost
    busy(e.currentTarget, async () => {
      try {
        take(await run('POST', 'api/routes', { name: host, values: [host], to: 'warp' })); paintAll()
        grow(() => { $('mp-rt-go').hidden = true }); toast({ type: 'success', title: 'Правило добавлено', text: host + ' пойдёт через WARP' })
      } catch (err) { fail(err) }
    })
  })

  // ---------- WARP ----------
  const ACC = { free: 'бесплатный', limited: 'WARP+', unlimited: 'WARP+ без лимита', plus: 'WARP+' }
  function paintWarp() {
    const w = M.warp
    $('mp-warp-on').checked = w.on
    $('mp-warp-on-h').textContent = w.registered ? 'Срабатывает сразу' : 'При включении сервер зарегистрируется в Cloudflare'
    const n = M.routes.filter((r) => r.to === 'warp' && r.on).length
    $('mp-warp-kv').innerHTML = [['Регистрация', w.registered ? 'есть' : 'нет'], ['Аккаунт', ACC[w.account] || esc(w.account)], ['Правил через WARP', n ? String(n) : 'нет, добавьте в маршрутах']].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')
    $('mp-warp-check').disabled = !w.on; $('mp-warp-reg').hidden = !w.registered
    $('mp-warp-plus').hidden = !M.managed || !w.registered
  }
  $('mp-warp-on').addEventListener('change', async (e) => {
    const on = e.target.checked; e.target.disabled = true
    try { take(await run('POST', 'api/warp', { on })); paintAll(); toast({ type: 'success', title: on ? 'WARP включён' : 'WARP выключен', text: on && !M.routes.some((r) => r.to === 'warp') ? 'Добавьте правило в маршрутах, иначе через него ничего не пойдёт' : '' }) }
    catch (err) { e.target.checked = !on; fail(err) } finally { e.target.disabled = false }
  })
  $('mp-warp-check').addEventListener('click', (e) => busy(e.currentTarget, async () => {
    const out = $('mp-warp-res')
    try { const r = await run('POST', 'api/warp/check'); out.textContent = `Работает: сайты видят адрес ${r.ip}${r.loc ? ', страна ' + r.loc : ''}${r.warp === 'plus' ? ', WARP+' : ''}`; out.hidden = false }
    catch (err) { out.textContent = err.message; out.hidden = false }
  }))
  $('mp-warp-reg').addEventListener('click', async (e) => {
    const b = e.currentTarget
    if (!await window.mpAdmin.confirm('Зарегистрировать WARP заново?', 'Сервер получит новые ключи Cloudflare. Ключ WARP+, если был, нужно будет ввести снова', 'Зарегистрировать')) return
    busy(b, async () => { try { take(await run('POST', 'api/warp/register')); paintAll(); toast({ type: 'success', title: 'WARP зарегистрирован заново' }) } catch (err) { fail(err) } })
  })
  $('mp-warp-plus').addEventListener('submit', (e) => {
    e.preventDefault(); const f = e.target, key = f.key.value.trim()
    if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{8}-[A-Za-z0-9]{8}$/.test(key)) { window.fieldError?.(f.key, 'Ключ выглядит так: xxxxxxxx-xxxxxxxx-xxxxxxxx'); return }
    window.fieldError?.(f.key, '')
    busy(f.querySelector('button[type=submit]'), async () => {
      try { const r = take(await run('POST', 'api/warp/license', { key })); if (M) M.warp.account = r.account; f.key.value = ''; paintWarp(); toast({ type: 'success', title: 'Ключ применён', text: 'Аккаунт: ' + (ACC[r.account] || r.account) }) }
      catch (err) { window.fieldError?.(f.key, err.message) }
    })
  })

  // ---------- протоколы ----------
  const sForm = $('mp-socks')
  const socksUrl = () => { const s = M.socks, d = window.mpAdmin.domain(); return `socks5://${s.user}:${s.pass}@${d}:${s.port}` }
  function paintProto() {
    for (const k of ['hy2', 'xhttp']) {
      const sw = $('mp-pr-' + k); sw.checked = M.proto[k]; sw.disabled = !M.proto[k + '_known']
      if (!M.proto[k + '_known']) $(`mp-pr-${k}-h`).textContent = 'На этом сервере его не ставили: включается переустановкой'
    }
    const rs = $('mp-pr-reality'); rs.checked = !!M.proto.reality; rs.disabled = !M.proto.reality_can
    $('mp-pr-main').textContent = M.proto.reality ? 'Reality' : 'Vision'
    if (!M.proto.reality_can) $('mp-pr-reality-h').textContent = 'Включается, когда на 443 только monolit: без сайтов рядом'
    const s = M.socks
    if (document.activeElement?.form !== sForm) { sForm.on.checked = s.on; sForm.port.value = s.port; sForm.user.value = s.user; sForm.pass.value = s.pass }
    $('mp-socks-cf').hidden = !s.on
    if (document.activeElement?.form !== sForm) $('mp-socks-f').hidden = !s.on
    if (s.on) window.mpAdmin.setCopy($('mp-socks-url'), $('mp-socks-copy'), socksUrl())
    $('mp-mtg').hidden = !M.managed || !M.mtg
    paintAwg()
    if (M.mtg) { $('mp-mtg-on').checked = ST?.mtg === 'running'; window.mpAdmin.setCopy($('mp-mtg-url'), $('mp-mtg-copy'), M.mtg.link) }
  }
  for (const k of ['hy2', 'xhttp']) $('mp-pr-' + k).addEventListener('change', async (e) => {
    const on = e.target.checked; e.target.disabled = true
    try { take(await run('PATCH', 'api/proto', { [k]: on })); paintAll(); toast({ type: 'success', title: `${k === 'hy2' ? 'Hysteria2' : 'XHTTP'} ${on ? 'включён' : 'выключен'}` }) }
    catch (err) { e.target.checked = !on; fail(err) } finally { e.target.disabled = false }
  })
  // Основной вход: Vision или Reality. Ключи у людей те же, но подключение в подписке другое — приложениям нужно её обновить
  $('mp-pr-reality').addEventListener('change', async (e) => {
    const on = e.target.checked
    if (!await window.mpAdmin.confirm(on ? 'Включить Reality?' : 'Вернуть Vision?', 'Подключения к основному входу оборвутся и не вернутся, пока приложения не обновят подписку. Ноды переключатся сами за минуту', on ? 'Включить' : 'Вернуть')) { e.target.checked = !on; return }
    e.target.disabled = true
    try { take(await run('PATCH', 'api/proto', { reality: on })); paintAll(); window.mpAdmin.refresh?.(); toast({ type: 'success', title: on ? 'Основной вход: Reality' : 'Основной вход: Vision', text: 'Обновите подписку в приложениях' }) }
    catch (err) { e.target.checked = !on; fail(err) } finally { e.target.disabled = !M.proto.reality_can }
  })
  // AmneziaWG ставится отдельным контейнером: первая сборка идёт несколько минут, состояние приходит с общим состоянием админки
  const AWG_HINT = 'Отдельный сервер по UDP. Для monolit client и AmneziaVPN'
  let awgPoll = 0
  function paintAwg() {
    const a = window.mpAdmin.state()?.awg || { on: false, state: 'off' }, sw = $('mp-pr-awg')
    if (document.activeElement !== sw) sw.checked = a.on
    sw.disabled = a.state === 'starting'   // пока ставится — не трогать; причина написана строкой ниже
    $('mp-pr-awg-h').textContent = a.state === 'starting' ? 'Ставится. В первый раз это несколько минут'
      : a.state === 'error' ? a.error || 'Не запустился' : a.state === 'on' ? `UDP ${a.port}. Добавьте его в набор подключений` : AWG_HINT
    clearInterval(awgPoll)
    if (a.state === 'starting' && !window.mpAdmin.demo()) awgPoll = setInterval(async () => { await window.mpAdmin.refresh(); paintAwg() }, 4000)
  }
  $('mp-pr-awg').addEventListener('change', async (e) => {
    const on = e.target.checked; e.target.disabled = true
    try {
      if (window.mpAdmin.demo()) { const s = window.mpAdmin.state(); s.awg = { on, port: 46213, state: on ? 'on' : 'off', error: '' }; window.mpAdmin.setState(s) }
      else window.mpAdmin.setState(await window.mpAdmin.api('PATCH', 'api/awg', { on }))
      toast({ type: 'success', title: on ? 'AmneziaWG включается' : 'AmneziaWG выключен' })
    } catch (err) { e.target.checked = !on; fail(err) } finally { e.target.disabled = false; paintAwg() }
  })
  // поля нужны только включённому SOCKS5
  sForm.on.addEventListener('change', () => { $('mp-socks-f').hidden = !sForm.on.checked; if (!sForm.on.checked) $('mp-socks-cf').hidden = true })
  sForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const port = Number(sForm.port.value)
    if (!(port >= 1 && port <= 65535)) { window.fieldError?.(sForm.port, 'От 1 до 65535'); return }
    window.fieldError?.(sForm.port, '')
    busy(sForm.querySelector('button[type=submit]'), async () => {
      try { take(await run('PATCH', 'api/proto', { socks: { on: sForm.on.checked, port, user: sForm.user.value.trim(), pass: sForm.pass.value.trim() } })); paintAll(); toast({ type: 'success', title: M.socks.on ? 'SOCKS5 включён' : 'SOCKS5 выключен', text: M.socks.on ? `Порт ${M.socks.port} открыт` : '' }) }
      catch (err) { fail(err) }
    })
  })
  $('mp-mtg-on').addEventListener('change', async (e) => {
    const on = e.target.checked; e.target.disabled = true
    try { await run('POST', 'api/mtg', { on }); if (ST) ST.mtg = on ? 'running' : 'exited'; toast({ type: 'success', title: on ? 'Прокси Telegram включён' : 'Прокси Telegram выключен' }) }
    catch (err) { e.target.checked = !on; fail(err) } finally { e.target.disabled = false }
  })

  // ---------- история ----------
  const hl = $('mp-hist-list')
  function paintHist() {
    const h = M.history || []
    hl.innerHTML = h.map((x, i) => `<li data-id="${x.id}"><span class="tl-mark${i === 0 ? ' ok' : ''}">${icon('history')}</span><div class="tl-body"><p><b>${esc(x.note)}</b></p><time>${DT.format(new Date(x.at * 1000))}</time>
      <div class="btn-row mp-hist-acts"><button class="btn btn-ghost btn-sm" type="button" data-show>${icon('eye')}Конфиг</button><button class="btn btn-secondary btn-sm" type="button" data-back>${icon('undo-2')}Вернуть как было</button></div></div></li>`).join('')
    icons(hl)
    hl.hidden = !h.length; $('mp-hist-empty').hidden = !!h.length
  }
  hl.addEventListener('click', async (e) => {
    const b = e.target.closest('button'); if (!b) return
    const li = b.closest('li'), id = Number(li.dataset.id), x = M.history.find((y) => y.id === id)
    if (b.hasAttribute('data-show')) return busy(b, async () => {
      try {
        const r = DEMO() ? await demoApi('GET', 'api/history/' + id) : await fetch('api/history/' + id, { credentials: 'same-origin' }).then((q) => { if (!q.ok) throw new Error('Сервер ответил ' + q.status); return q.json() })
        const text = JSON.stringify(r, null, 2)
        $('mp-log-t').textContent = 'Конфиг Xray'; $('mp-log-p').textContent = `До изменения «${x.note}»`; $('mp-log-file').textContent = 'config.json'
        $('mp-log-text').textContent = text; $('mp-log-copy').dataset.copy = text; $('mp-log').showModal()
        $('mp-log').addEventListener('close', () => { $('mp-log-t').textContent = 'Журнал Xray'; $('mp-log-p').textContent = 'Последние 100 строк'; $('mp-log-file').textContent = 'journalctl -u xray' }, { once: true })
      } catch (err) { fail(err) }
    })
    if (!await window.mpAdmin.confirm('Вернуть конфиг?', `Xray вернётся к состоянию до «${x.note}» (${DT.format(new Date(x.at * 1000))}). Всё, что меняли после, тоже откатится. Пользователи останутся как сейчас`, 'Вернуть')) return
    busy(b, async () => { try { take(await run('POST', `api/history/${id}/rollback`)); paintAll(); toast({ type: 'success', title: 'Конфиг возвращён', text: 'Xray перезапущен' }) } catch (err) { fail(err) } })
  })

  // Открытие шторки — свежие данные
  // (WARP — на странице «Выходы», история — на «Сервере»)
  document.addEventListener('mp-page', (e) => { if (!['srv', 'routes', 'exits', 'proto'].includes(e.detail)) return; if (M) paintAll(); ensure().catch(fail) })
})()

;
// addr.js
// Админка monolit proxy: адрес сервера. Доступность из России (check-host.net), смена домена, IP и способа.
// Смену делает install.sh на сервере (копии настроек и откат при сбое); админка в это время перезапускается,
// поэтому ход смены читаем из api/addr/job и ждём, пока она снова ответит
(() => {
  const $ = (id) => document.getElementById(id)
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const A = () => window.mpAdmin
  const toast = (o) => window.toast?.(o)
  const fail = (e) => toast({ type: 'error', title: 'Не получилось', text: e.message })
  const busy = async (btn, fn) => { btn.disabled = true; btn.classList.add('is-loading'); try { return await fn() } finally { btn.disabled = false; btn.classList.remove('is-loading') } }
  const now = () => Math.floor(Date.now() / 1000)
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  const plural = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c }
  const TF = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' }), DF = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' })
  const ago = (t) => { const s = now() - t; if (s < 90) return 'только что'; if (s < 3600) { const m = Math.round(s / 60); return `${m} ${plural(m, 'минуту', 'минуты', 'минут')} назад` } return new Date(t * 1000).toDateString() === new Date().toDateString() ? 'сегодня в ' + TF.format(new Date(t * 1000)) : DF.format(new Date(t * 1000)) + ' в ' + TF.format(new Date(t * 1000)) }
  const kv = (rows) => rows.filter(Boolean).map(([k, v, cls]) => `<div><dt>${k}</dt><dd${cls ? ` class="${cls}"` : ''}>${esc(v)}</dd></div>`).join('')

  const MODES = { bare: ['Весь сервер под VPN', 'Xray на 443, за ним страница входа, админка и подписки'], front: ['Рядом с сайтами', 'Xray на 443, сайты nginx открываются через него'], ip2: ['Второй IP', 'Xray на отдельном адресе, сайты остаются на основном'] }
  const W = { ok: ['Открывается', 'badge-success'], blocked: ['Не открывается', 'badge-danger'], down: ['Сервер не отвечает', 'badge-danger'], unknown: ['Не удалось проверить', 'badge-warning'], none: ['Ещё не проверяли', ''] }

  let D = null   // { mode, domain, ip2, out_ip, alt, admin, job, watch, net, dns, netsave }

  // ---------- демо ----------
  const demo = {
    mode: 'ip2', domain: 'vpn.example.ru', ip2: '203.0.113.8', out_ip: '', alt: ['old.example.ru'], admin: '/adm', job: null, dns: ['203.0.113.8'],
    cf: { on: false }, fresh: ['203.0.113.9'], fwd: '', entry: '', entries: [{ kind: 'node', name: 'Moscow', host: 'msk.example.ru', url: 'https://msk.example.ru/adm/' }],
    netsave: { tool: 'ifupdown', dev: 'ens3', file: '/etc/network/interfaces', missing: ['203.0.113.8'], stale: ['198.51.100.4'], manual: '' },
    net: { ips: ['203.0.113.7', '203.0.113.8', '203.0.113.9'], ip1: '203.0.113.7', sites: [{ names: ['example.ru', 'www.example.ru'] }] },
    watch: { state: 'blocked', at: now() - 600, since: now() - 4000, ip: '203.0.113.7', on: true, every: 60, error: '',
      ru: [{ node: 'ru1', city: 'Moscow', ok: false, healthy: false, answered: true }, { node: 'ru2', city: 'Moscow', ok: false, healthy: true, answered: true }],
      abroad: [{ node: 'de1', city: 'Nuremberg', ok: true, ms: 38 }, { node: 'de2', city: 'Langen', ok: true, ms: 27 }, { node: 'de4', city: 'Frankfurt', ok: true, ms: 31 }] },
  }
  async function demoApi(method, path, body) {
    await sleep(500)
    if (path === 'api/addr' && method === 'GET') return structuredClone(demo)
    if (path === 'api/addr/dns') return { domain: body.domain, a: /^new|^vpn/.test(body.domain) ? ['203.0.113.7'] : /^two/.test(body.domain) ? ['203.0.113.8'] : [] }
    if (path === 'api/addr' && method === 'POST') { demo.job = { state: 'running', at: now(), text: 'Меняю настройки сервера', body }; return { ok: true } }
    if (path === 'api/addr/job') {
      const j = demo.job
      if (j?.state === 'running' && now() - j.at > 5) {
        const b = j.body; demo.job = { state: 'done', at: now(), text: 'Готово' }
        if (b.drop) demo.alt = demo.alt.filter((d) => d !== b.drop)
        else { if (b.domain !== demo.domain && b.keep_old) demo.alt = [...new Set([...demo.alt, demo.domain])]; demo.alt = demo.alt.filter((d) => d !== b.domain); demo.domain = b.domain; demo.mode = b.mode; demo.ip2 = b.ip2 || '' }
      }
      return structuredClone(demo)
    }
    if (path === 'api/addr/netsave') { await sleep(800); demo.netsave = { ...demo.netsave, missing: [], stale: [] }; return { ok: true, text: 'заменил 198.51.100.4 на 203.0.113.8', netsave: demo.netsave } }
    if (path === 'api/addr/ip') { demo.fwd = `${demo.ip2}>${body.ip}`; demo.ip2 = body.ip; demo.fresh = []; return { ok: true } }
    if (path === 'api/addr/cf') { if (body.token && body.token.length < 20) throw new Error('Cloudflare не принял токен: проверьте, что он скопирован целиком'); demo.cf = body.token ? { on: true, zone: 'example.ru', ip: demo.dns.join(', '), proxied: false, many: false, error: '' } : { on: false }; return { cf: demo.cf } }
    if (path === 'api/addr/cf/sync') { demo.dns = [demo.ip2]; demo.cf.ip = demo.ip2; return { cf: demo.cf, ip: demo.ip2 } }
    if (path === 'api/addr/unfwd') { demo.fwd = ''; return { ok: true, fwd: '' } }
    if (path === 'api/addr/entry') { demo.entry = body.domain; demo.entries = [...(body.domain ? [{ kind: 'site', name: '', host: body.domain, url: `https://${body.domain}/adm/` }] : []), ...demo.entries.filter((e) => e.kind === 'node')]; return { ok: true, entry: demo.entry, entries: demo.entries } }
    if (path === 'api/egress') { await sleep(1000); demo.out_ip = body.ip; return { ok: true, seen: body.ip || demo.net.ip1 } }
    if (path === 'api/watch') { if ('on' in body) demo.watch.on = body.on; if ('every' in body) demo.watch.every = Number(body.every); return { watch: demo.watch } }
    if (path === 'api/watch/check') { await sleep(1500); Object.assign(demo.watch, { state: 'ok', at: now(), since: now(), ru: demo.watch.ru.map((x) => ({ ...x, ok: x.healthy, ms: 41 })) }); return { watch: demo.watch } }
    throw new Error('Нет такого действия')
  }
  const api = (m, p, b) => A().demo() ? demoApi(m, p, b) : A().api(m, p, b)

  // ---------- доступность ----------
  function paintWatch() {
    const w = D.watch || { state: 'none' }, st = W[w.state] || W.none
    const b = $('mp-w-badge'); b.className = 'badge ' + st[1]; $('mp-w-st').textContent = st[0]
    $('mp-w-when').textContent = w.running ? 'проверяем' : w.at ? 'проверено ' + ago(w.at) : ''
    const ru = (w.ru || []).filter((x) => x.healthy), bad = (w.ru || []).length - ru.length
    $('mp-w-kv').innerHTML = w.at ? kv([
      ['IP', w.ip || 'не нашли'],
      w.ru ? ['Точки в России', `открывается с ${ru.filter((x) => x.ok).length} из ${ru.length}`] : null,
      bad ? ['Не считаем', `${bad} ${plural(bad, 'точку', 'точки', 'точек')} check-host без связи`] : null,
      w.abroad?.length ? ['За границей', `открывается с ${w.abroad.filter((x) => x.ok).length} из ${w.abroad.length}`] : null,
      w.state !== 'ok' && w.state !== 'unknown' && w.since && w.since < w.at ? [w.state === 'down' ? 'Не отвечает с' : 'Не открывается с', ago(w.since)] : null,
    ]) : ''
    $('mp-w-err').hidden = !w.error; $('mp-w-err').textContent = w.error || ''
    $('mp-w-on').checked = !!w.on
    $('mp-w-every-f').hidden = !w.on
    const ev = $('mp-w-every'); if (ev.value !== String(w.every || 60)) { ev.value = String(w.every || 60); ev.dispatchEvent(new Event('change')) }
    const s = A().state()?.settings || {}
    $('mp-w-tg').textContent = s.tg_token && s.tg_chat ? 'Если IP перестанет открываться, напишем в Telegram' : 'Чтобы узнать о блокировке сразу, подключите Telegram в настройках'
  }

  // ---------- домен и IP ----------
  const ips = () => D.net?.ips || []
  const sites = () => (D.net?.sites || []).flatMap((s) => s.names || [])
  function paintAddr() {
    const job = D.job, running = job?.state === 'running' && now() - job.at < 900
    const foreign = !D.mode || D.mode === 'existing'
    $('mp-a-foreign').hidden = !foreign
    $('mp-a-run').hidden = !running
    const failed = job?.state === 'failed' && now() - job.at < 86400
    $('mp-a-fail').hidden = !failed || running
    if (failed) $('mp-a-fail-t').textContent = job.text + '. Настройки остались прежними'
    const on = ips(), dnsOk = !D.dns?.length ? null : D.dns.some((a) => (D.mode === 'ip2' ? [D.ip2] : on).includes(a))
    paintMove(running, on)
    $('mp-a-kv').innerHTML = kv([
      ['Домен', D.domain],
      ['Смотрит на', D.dns?.length ? D.dns.join(', ') + (dnsOk === false && on.length ? (D.dns.some((a) => on.includes(a)) ? ', это не входящий адрес' : ', это не этот сервер') : '') : 'никуда', dnsOk === false ? 'mp-warn' : ''],
      MODES[D.mode] ? ['Способ', MODES[D.mode][0]] : null,
      D.mode === 'ip2' ? ['Входящий IP', D.ip2] : null,
      on.length ? [on.length > 1 ? 'Адреса сервера' : 'Адрес сервера', on.join(', ')] : null,
      D.mode === 'front' && sites().length ? ['Сайты рядом', sites().join(', ')] : null,
      bootOk() ? ['После перезагрузки', 'адреса сохранятся'] : null,
    ])
    paintBoot(running)
    const alt = D.alt || [], old = (D.fwd || '').split('>')[0]
    $('mp-a-alt').hidden = !alt.length && !old
    $('mp-a-alt').innerHTML = (old ? `<div class="alist-row mp-alt"><span class="alist-ic"><i data-lucide="route"></i></span><span class="alist-tx"><b>${esc(old)}</b><span>Старый адрес: подключения на него идут на новый</span></span>
      <button class="icon-btn icon-btn-sm" type="button" data-unfwd aria-label="Отключить ${esc(old)}" data-tip="Отключить"${running ? ' disabled' : ''}><i data-lucide="trash-2"></i></button></div>` : '') + alt.map((d) => `<div class="alist-row mp-alt"><span class="alist-ic"><i data-lucide="link"></i></span><span class="alist-tx"><b>${esc(d)}</b><span>Запасной: старые ссылки подписок работают</span></span>
      <button class="icon-btn icon-btn-sm" type="button" data-drop="${esc(d)}" aria-label="Убрать ${esc(d)}" data-tip="Убрать"${running ? ' disabled' : ''}><i data-lucide="trash-2"></i></button></div>`).join('')
    window.lucide?.createIcons()
    $('mp-a-edit').disabled = foreign || running || !D.net
    $('mp-a-edit').closest('.btn-row').hidden = foreign
    // исходящий IP: только когда конфигом Xray управляет monolit
    $('mp-o-kv').hidden = foreign; $('mp-o-edit').hidden = foreign
    $('mp-o-kv').innerHTML = kv([['Исходящий IP', D.out_ip || 'как решает сервер' + (D.net?.ip1 ? `, ${D.net.ip1}` : '')]])
    $('mp-o-edit').disabled = foreign || running || !D.net
  }
  // ---------- свободный адрес сервера: перевести на него VPN одной кнопкой ----------
  // Хостер добавил IP: Xray переезжает на него без переустановки, старый адрес пересылает на новый, пока расходится DNS
  function paintMove(running, on) {
    const fresh = D.mode === 'ip2' ? D.fresh || [] : [], box = $('mp-a-new')
    box.hidden = !fresh.length
    box.innerHTML = fresh.map((ip) => `<div class="alert alert-info mp-alert"><i data-lucide="map-pin"></i><div><b>На сервере свободный адрес ${esc(ip)}</b><span>VPN переедет на него без переустановки</span>
      <div class="btn-row mp-alert-act"><button class="btn btn-secondary btn-sm" type="button" data-ipmove="${esc(ip)}"${running ? ' disabled' : ''}><span>Перевести VPN</span></button></div></div></div>`).join('')
    // домен ещё смотрит на прежний адрес: что именно поменять в DNS
    const need = D.mode === 'ip2' && D.ip2 && D.dns?.length && on.length && !D.dns.includes(D.ip2)
    $('mp-a-rec').hidden = !need
    $('mp-a-rec-act').hidden = !D.cf?.on
    if (need) { $('mp-a-rec-t').textContent = `${D.domain} смотрит на ${D.dns.join(', ')}, а VPN работает на этом адресе`; $('mp-a-rec-ip').value = D.ip2; $('mp-a-rec-copy').dataset.copy = D.ip2 }
  }
  $('mp-a-new').addEventListener('click', async (e) => {
    const b = e.target.closest('[data-ipmove]'); if (!b) return
    const ip = b.dataset.ipmove
    if (!await A().confirm(`Перевести VPN на ${ip}?`, `Xray перезапустится, подключения оборвутся на несколько секунд. ${D.ip2} продолжит принимать подключения, пока вы меняете DNS`, 'Перевести')) return
    await busy(b, async () => {
      try {
        await waitJob(await api('POST', 'api/addr/ip', { ip }))
        await load()
        toast({ type: 'success', title: 'VPN переведён на ' + ip, text: D.dns?.includes(ip) ? 'Домен уже смотрит на этот адрес' : D.cf?.on ? 'A-запись в Cloudflare меняется, это до минуты' : `Поменяйте A-запись ${D.domain} на ${ip}` })
        A().refresh?.()
      } catch (err) { fail(err); load().catch(() => {}) }
    })
  })

  // ---------- запасные входы ----------
  function paintEntries() {
    const list = D.entries || [], names = D.mode === 'ip2' ? sites().filter((n) => !n.includes('*')) : []
    $('mp-e-sec').hidden = !list.length && !names.length
    const box = $('mp-e-list')
    box.hidden = !list.length
    box.innerHTML = list.map((e) => `<div class="field"><span class="label"><span>${esc(e.kind === 'node' ? e.name : e.host)}</span><span class="opt">${e.kind === 'node' ? 'нода' : 'сайт'}</span></span><span class="copy-field"><input class="input" readonly value="${esc(e.url)}" aria-label="Запасной вход: ${esc(e.host)}"><button class="icon-btn icon-btn-sm" type="button" aria-label="Скопировать адрес" data-copy="${esc(e.url)}"></button></span></div>`).join('')
    window.initInputs?.(box)
    $('mp-e-site-f').hidden = !names.length
    const sel = $('mp-e-site'), want = D.entry || ''
    if (names.length && (sel.dataset.for !== names.join() || sel.value !== want)) { sel.dataset.for = names.join(); setSelect(sel, [['', 'Не использовать'], ...names.map((n) => [n, n])], want) }
  }
  $('mp-e-site').addEventListener('change', async (e) => {
    const d = e.target.value
    if (!D || d === (D.entry || '')) return
    try {
      const r = await api('POST', 'api/addr/entry', { domain: d })
      D.entry = r.entry; D.entries = r.entries; paintEntries()
      toast({ type: 'success', title: d ? 'Запасной вход добавлен' : 'Запасной вход убран', text: d ? `Админка открывается на ${d}` : '' })
    } catch (err) { fail(err); paintEntries() }
  })

  // ---------- переживут ли адреса перезагрузку ----------
  // Хостер меняет IP на лету и не всегда записывает его в настройки сети; старый там тоже остаётся
  const ns = () => D.netsave
  const bootOk = () => !!ns() && (D.mode === 'ip2' || D.out_ip) && !ns().missing.length && !ns().stale.length
  function paintBoot(running) {
    const n = ns(), miss = n?.missing || [], stale = n?.stale || []
    $('mp-a-boot').hidden = !miss.length && !stale.length
    if ($('mp-a-boot').hidden) return
    $('mp-a-boot-t').textContent = miss.length ? 'После перезагрузки адрес пропадёт' : 'В настройках сети старый адрес'
    $('mp-a-boot-p').textContent = n.manual || (miss.length && stale.length ? `В настройках сети записан ${stale.join(', ')}, а работает ${miss.join(', ')}`
      : miss.length ? `${miss.join(', ')} не записан в настройках сети` : `После перезагрузки сервер возьмёт себе ${stale.join(', ')}, которого у него уже нет`)
    $('mp-a-boot-act').hidden = n.tool === 'none'
    $('mp-a-boot-fix').disabled = running
  }
  $('mp-a-boot-fix').addEventListener('click', async (e) => {
    const btn = e.currentTarget, n = ns(), what = [n.stale.length && n.missing.length ? `заменим ${n.stale.join(', ')} на ${n.missing.join(', ')}` : '',
      !n.stale.length && n.missing.length ? `допишем ${n.missing.join(', ')}` : '', n.stale.length && !n.missing.length ? `уберём ${n.stale.join(', ')}` : ''].filter(Boolean).join('')
    if (!await A().confirm('Исправить настройки сети?', `В ${n.file || 'настройках сети'} ${what}. Сейчас ничего не прервётся, копия файла останется в /root/backups`, 'Исправить')) return
    await busy(btn, async () => {
      try {
        const r = await api('POST', 'api/addr/netsave')
        D.netsave = r.netsave; paintAddr()
        toast({ type: 'success', title: 'Настройки сети исправлены', text: 'После перезагрузки адреса будут на месте' })
      } catch (err) { fail(err); load().catch(() => {}) }
    })
  })

  // ---------- Cloudflare: A-запись домена меняется сама ----------
  const zoneGuess = () => D.cf?.zone || String(D.domain || '').split('.').slice(-2).join('.')
  function paintCf() {
    const c = D.cf || { on: false }, box = $('mp-a-cf')
    box.hidden = !D.domain || !D.mode || D.mode === 'existing'
    const sub = !c.on ? 'A-запись домена меняете вы' : c.error ? c.error : c.proxied ? 'У записи включён прокси Cloudflare: переключите её на DNS only' : c.many ? 'У домена несколько A-записей: оставьте одну' : 'Сам меняет A-запись домена'
    box.innerHTML = `<div class="alist-row"><span class="alist-ic"><i data-lucide="cloud"></i></span><span class="alist-tx"><b>Cloudflare</b><span${c.on && (c.error || c.proxied || c.many) ? ' class="mp-warn"' : ''}>${esc(sub)}</span></span>
      <button class="btn btn-secondary btn-sm" type="button" id="mp-cf-open"><span>${c.on ? 'Изменить' : 'Подключить'}</span></button></div>`
    window.lucide?.createIcons()
  }
  const cfForm = $('mp-cf-form'), cfDlg = $('mp-cf-dlg')
  $('mp-a-cf').addEventListener('click', (e) => {
    if (!e.target.closest('#mp-cf-open')) return
    cfForm.reset(); window.fieldError?.(cfForm.token, '')
    $('mp-cf-zone').textContent = zoneGuess()
    $('mp-cf-off').hidden = !D.cf?.on
    cfDlg.showModal()
  })
  cfForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const token = cfForm.token.value.trim()
    if (!token) { window.fieldError?.(cfForm.token, 'Вставьте токен из Cloudflare'); return }
    window.fieldError?.(cfForm.token, '')
    await busy(cfForm.querySelector('[type="submit"]'), async () => {
      try {
        const r = await api('POST', 'api/addr/cf', { token })
        D.cf = r.cf; paintAddr(); paintCf(); cfDlg.close()
        toast({ type: 'success', title: 'Cloudflare подключён', text: `Зона ${r.cf.zone}` + (r.cf.ip ? `, запись смотрит на ${r.cf.ip}` : '') })
      } catch (err) { window.fieldError?.(cfForm.token, err.message) }
    })
  })
  $('mp-cf-off').addEventListener('click', async (e) => {
    await busy(e.currentTarget, async () => {
      try { const r = await api('POST', 'api/addr/cf', { token: '' }); D.cf = r.cf; paintAddr(); paintCf(); cfDlg.close(); toast({ title: 'Cloudflare отключён', text: 'Токен стёрт с сервера' }) } catch (err) { fail(err) }
    })
  })
  $('mp-a-rec-cf').addEventListener('click', (e) => busy(e.currentTarget, async () => {
    try {
      const r = await api('POST', 'api/addr/cf/sync')
      D.cf = r.cf; D.dns = [r.ip]; paintAddr(); paintCf()
      toast({ type: 'success', title: 'A-запись изменена', text: `${D.domain} смотрит на ${r.ip}` })
    } catch (err) { fail(err) }
  }))

  const paint = () => { paintWatch(); paintAddr(); paintEntries(); paintCf() }

  async function load() { D = await api('GET', 'api/addr'); paint(); if (D.job?.state === 'running' && now() - D.job.at < 900) follow() }
  // страница «Адрес» открылась — свежие данные
  document.addEventListener('mp-page', (e) => { if (e.detail !== 'addr') return; if (!D) $('mp-a-kv').innerHTML = kv([['Домен', A().domain()]]); load().catch(fail) })

  // ---------- проверка ----------
  $('mp-w-check').addEventListener('click', (e) => busy(e.currentTarget, async () => {
    $('mp-w-when').textContent = 'проверяем, до минуты'
    try { const r = await api('POST', 'api/watch/check'); D.watch = r.watch; paintWatch(); A().refresh?.() } catch (err) { fail(err); paintWatch() }
  }))
  $('mp-w-on').addEventListener('change', async (e) => {
    try { const r = await api('POST', 'api/watch', { on: e.target.checked }); D.watch = { ...D.watch, ...r.watch }; paintWatch() } catch (err) { e.target.checked = !e.target.checked; fail(err) }
  })
  $('mp-w-every').addEventListener('change', async (e) => {
    if (!D || String(D.watch?.every) === e.target.value) return
    try { const r = await api('POST', 'api/watch', { every: Number(e.target.value) }); D.watch = { ...D.watch, ...r.watch } } catch (err) { fail(err) }
  })

  // ---------- окно смены ----------
  const F = $('mp-a-form'), dlg = $('mp-a-dlg')
  let dnsA = null, dnsFor = '', typing
  function modeOptions() {
    const list = []
    if (!sites().length || D.mode === 'bare') list.push('bare')
    if (sites().length || D.mode === 'front') list.push('front')
    if (ips().length > 1 || D.mode === 'ip2') list.push('ip2')
    return list
  }
  function setSelect(sel, opts, val) {
    sel.innerHTML = opts.map(([v, t]) => `<option value="${esc(v)}">${esc(t)}</option>`).join('')
    sel.value = val; sel.dispatchEvent(new Event('change'))
  }
  function syncForm() {
    const mode = F.mode.value, dom = F.domain.value.trim().toLowerCase()
    $('mp-a-mode-h').textContent = MODES[mode]?.[1] || ''
    $('mp-a-ip-f').hidden = mode !== 'ip2'
    $('mp-a-keep-f').hidden = !dom || dom === D.domain
    // DNS: смотрит ли домен на адрес, где будет Xray
    const want = mode === 'ip2' ? [F.ip2.value] : ips(), h = $('mp-a-dns')
    let txt = 'К нему подключаются приложения, на нём ссылки подписок', warn = false
    if (dnsA && dnsFor === dom) {
      const hit = dnsA.some((a) => want.includes(a))
      txt = !dnsA.length ? `${dom} пока никуда не смотрит. Добавьте A-запись на ${want.join(' или ')}` : hit ? `Смотрит на ${dnsA.join(', ')}, это ${mode === 'ip2' ? 'выбранный IP' : 'этот сервер'}` : `Смотрит на ${dnsA.join(', ')}, а нужно на ${want.join(' или ')}`
      warn = !hit
    } else if (dom && dom !== dnsFor) txt = 'Проверяем DNS'
    h.textContent = txt; h.classList.toggle('mp-warn', warn)
    $('mp-a-force-f').hidden = !warn
  }
  async function checkDns() {
    const dom = F.domain.value.trim().toLowerCase()
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(dom)) { dnsA = null; dnsFor = ''; syncForm(); return }
    try { const r = await api('POST', 'api/addr/dns', { domain: dom }); if (F.domain.value.trim().toLowerCase() === dom) { dnsA = r.a; dnsFor = dom } } catch (e) { dnsA = null; dnsFor = '' }
    syncForm()
  }
  F.domain.addEventListener('input', () => { clearTimeout(typing); syncForm(); typing = setTimeout(checkDns, 400) })
  F.mode.addEventListener('change', syncForm); F.ip2.addEventListener('change', syncForm)

  $('mp-a-edit').addEventListener('click', () => {
    F.reset(); F.domain.value = D.domain; F.keep_old.checked = true
    setSelect(F.mode, modeOptions().map((m) => [m, MODES[m][0]]), D.mode)
    const extra = ips().filter((a) => a !== D.net?.ip1)
    setSelect(F.ip2, (extra.length ? extra : ips()).map((a) => [a, a]), D.ip2 || extra[0] || '')
    dnsA = D.dns || []; dnsFor = D.domain; syncForm()
    dlg.showModal()
  })

  F.addEventListener('submit', async (e) => {
    e.preventDefault()
    const domain = F.domain.value.trim().toLowerCase(), mode = F.mode.value, ip2 = mode === 'ip2' ? F.ip2.value : ''
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(domain)) { window.fieldError?.(F.domain, 'Домен выглядит так: vpn.example.ru'); return }
    window.fieldError?.(F.domain, '')
    const changed = []
    if (domain !== D.domain) changed.push(`домен ${D.domain} → ${domain}`)
    if (mode !== D.mode) changed.push(`способ «${MODES[D.mode]?.[0] || D.mode}» → «${MODES[mode][0]}»`)
    if (mode === 'ip2' && ip2 !== D.ip2) changed.push(`входящий IP ${D.ip2 || 'основной'} → ${ip2}`)
    if (!changed.length) { toast({ title: 'Ничего не изменилось' }); return }
    const warn = !$('mp-a-force-f').hidden
    if (warn && !F.force.checked) { toast({ type: 'error', title: 'DNS не совпадает', text: 'Поправьте A-запись или отметьте «Применить, хотя DNS не совпадает»' }); return }
    const keep = domain !== D.domain && F.keep_old.checked
    const lost = domain !== D.domain && !keep ? ' Старые ссылки подписок перестанут работать: людям нужно будет выдать новые.' : ''
    const fix = changed.join(', ')
    if (!await A().confirm('Сменить адрес?', `Меняем: ${fix}. VPN и сайты прервутся примерно на минуту, админка перезапустится. Если что-то не поднимется, вернём как было.${lost}`, 'Сменить')) return
    await send({ mode, domain, ip2, keep_old: keep, force: warn && F.force.checked }, F.querySelector('[type="submit"]'))
    dlg.close()
  })

  // ---------- исходящий IP ----------
  // Меняется без переустановки: конфиг Xray проверяется и перезапускается, результат ждём по api/job
  const O = $('mp-o-form'), odlg = $('mp-o-dlg')
  const autoName = () => 'Как решает сервер' + (D.net?.ip1 ? ` (сейчас ${D.net.ip1})` : '')
  $('mp-o-edit').addEventListener('click', () => {
    const list = [...new Set([...ips(), ...(D.out_ip ? [D.out_ip] : [])])]
    setSelect(O.ip, [['', autoName()], ...list.map((a) => [a, a + (a === D.ip2 ? ', входящий' : '')])], D.out_ip || '')
    odlg.showModal()
  })
  async function waitJob(r) {
    if (!r?.pending) return
    const until = Date.now() + 150000
    await sleep(1500)
    while (Date.now() < until) {
      let j = null
      try { j = await api('GET', 'api/job') } catch (e) {}
      if (j && j.job.id === r.job && !j.job.running) { if (!j.job.ok) throw new Error(j.job.error || 'Не получилось'); return }
      await sleep(1500)
    }
    throw new Error('Xray долго не отвечает, загляните в раздел «Сервер»')
  }
  O.addEventListener('submit', async (e) => {
    e.preventDefault()
    const ip = O.ip.value
    if (ip === (D.out_ip || '')) { odlg.close(); return }
    await busy(O.querySelector('[type="submit"]'), async () => {
      try {
        const r = await api('POST', 'api/egress', { ip })
        await waitJob(r)
        D.out_ip = ip; paintAddr(); odlg.close()
        toast({ type: 'success', title: 'Исходящий IP изменён', text: r.seen ? `Интернет видит сервер как ${r.seen}` : 'Сервер выходит, как решает система' })
      } catch (err) { fail(err) }
    })
  })

  $('mp-a-alt').addEventListener('click', async (e) => {
    const u = e.target.closest('[data-unfwd]')
    if (u) {
      const old = (D.fwd || '').split('>')[0]
      if (!await A().confirm(`Отключить ${old}?`, `Подключения на ${old} перестанут приниматься. Приложения и ноды, у которых домен уже смотрит на новый адрес, ничего не заметят`, 'Отключить')) return
      await busy(u, async () => { try { const r = await api('POST', 'api/addr/unfwd'); D.fwd = r.fwd; paintAddr() } catch (err) { fail(err) } })
      return
    }
    const b = e.target.closest('[data-drop]'); if (!b) return
    const d = b.dataset.drop
    if (!await A().confirm(`Убрать ${d}?`, `Ссылки подписок на ${d} перестанут открываться. Приложения, которые уже обновили подписку, подключаются к ${D.domain} и ничего не заметят. Админка перезапустится`, 'Убрать')) return
    send({ mode: D.mode, domain: D.domain, ip2: D.ip2, drop: d }, b)
  })

  async function send(body, btn) {
    await busy(btn, async () => {
      try {
        await api('POST', 'api/addr', body)
        D.job = { state: 'running', at: now(), text: 'Меняю настройки сервера' }; D.target = body; paintAddr(); follow()
      } catch (err) { fail(err) }
    })
  }

  // ---------- ход смены ----------
  let following = false
  async function follow() {
    if (following) return
    following = true
    const t0 = Date.now(), to = D.target, host = location.hostname, since = (D.job?.at || now()) - 5
    let misses = 0
    try {
      while (Date.now() - t0 < 15 * 60e3) {
        await sleep(3000)
        let r = null
        try { r = await api('GET', 'api/addr/job') } catch (e) { misses++ }
        // Домен сменили без запасного: на этом адресе админки больше нет
        if (!r && to && to.domain !== host && !to.keep_old && !to.drop && misses > 10) {
          $('mp-a-run-t').innerHTML = `Админка переехала: <a href="https://${esc(to.domain)}${esc(D.admin)}/">${esc(to.domain)}</a>`; continue
        }
        if (!r) continue
        const j = r.job
        if (!j || j.at < since) continue   // итог прошлой смены: эта ещё не началась
        if (j.state === 'running') { Object.assign(D, r); paintAddr(); continue }
        Object.assign(D, r); paint()
        if (j?.state === 'done') {
          toast({ type: 'success', title: 'Адрес сменён', text: 'Домен ' + D.domain })
          if (!A().demo()) setTimeout(() => location.reload(), 1500)
        } else if (j?.state === 'failed') toast({ type: 'error', title: 'Сменить не получилось', text: j.text })
        return
      }
    } finally { following = false }
  }
})()

;
// nodes.js
// Админка monolit proxy: страницы «Ноды» и «Подписки».
// Нода — второй сервер, ставится командой и сама приходит за настройками. Подписка человека — набор подключений:
// сервер, мост и протокол; порядок и названия такие, какими их покажет приложение.
(() => {
  const A = window.mpAdmin, $ = (id) => document.getElementById(id)
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const toast = (o) => window.toast?.(o)
  const fail = (e) => toast({ type: 'error', title: 'Не получилось', text: e.message })
  const icon = (n) => `<i data-lucide="${n}"></i>`
  const icons = () => window.lucide?.createIcons()
  const busy = async (btn, fn) => { btn.disabled = true; btn.classList.add('is-loading'); try { return await fn() } finally { btn.disabled = false; btn.classList.remove('is-loading') } }
  const plural = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c }
  const PROTO = { vision: 'Vision', xhttp: 'XHTTP', hy2: 'Hysteria2', reality: 'Reality', awg: 'AmneziaWG' }
  const named = (s) => esc(s).replace(/((?:\p{Regional_Indicator}{2})|\u{1F3F4}[\u{E0061}-\u{E007A}]+\u{E007F})\s*/gu, '<span class="mp-flag">$1</span>')
  const S = () => A.state()
  // разметку меняем, только когда она правда другая: обновление раз в минуту не сбивает фокус и перетаскивание
  const put = (el, html) => { if (el._html === html) return false; el._html = html; el.innerHTML = html; icons(); return true }
  const setSelect = (sel, html, value) => { sel.innerHTML = html; sel.value = String(value); sel.dispatchEvent(new Event('change', { bubbles: true })) }

  // ---------- демо: без сервера страницы живут на своих данных ----------
  function demoSeed(s) {
    if (s.kits) return
    const t = Date.now() / 1000
    Object.assign(s, { main: { day: 41.2 * 1024 ** 3, protos: ['vision', 'hy2'] },
      nodes: [{ id: 1, name: 'Москва', addr: '185.104.248.17', mask: 'ya.ru', joined: true, waiting: false, seen: t - 10, up: true, xray: '25.10.15', load: '0.04', xray_ok: true, err: '', online: 2, day: 7.8 * 1024 ** 3 },
        { id: 2, name: 'Германия', addr: '91.107.202.44', mask: 'ya.ru', joined: true, waiting: false, seen: t - 7200, up: false, xray: '25.9.11', load: '', xray_ok: true, err: '', online: 0, day: 0 }],
      kits: [{ id: 1, name: 'Обычный', is_default: true, users: 0, lines: [{ id: 1, name: 'aeza Vision', out: 0, via: 0, proto: 'vision', on: true, problem: '' }, { id: 2, name: 'aeza Hysteria2', out: 0, via: 0, proto: 'hy2', on: true, problem: '' }] },
        { id: 2, name: 'С мостом', is_default: false, users: 0, lines: [{ id: 3, name: 'aeza через «Москва»', out: 0, via: 1, proto: 'reality', on: true, problem: '' }, { id: 4, name: 'aeza напрямую', out: 0, via: 0, proto: 'vision', on: true, problem: '' }, { id: 5, name: 'Германия', out: 2, via: 0, proto: 'reality', on: false, problem: '' }] }] })
    s.users.forEach((u, i) => { u.kit = i < 2 ? 2 : 1 })
    demoCount(s)
  }
  const demoCount = (s) => s.kits.forEach((k) => { k.users = s.users.filter((u) => u.kit === k.id).length })
  let demoId = 100
  async function demoCall(method, path, b = {}) {
    await new Promise((r) => setTimeout(r, 300))
    const s = S(), kit = (id) => s.kits.find((k) => k.id === Number(id)), nm = (id) => id ? s.nodes.find((n) => n.id === id).name : s.settings.server_name
    const line = (l, old = {}) => { const out = Number(l.out ?? old.out) || 0, via = Number(l.via ?? old.via) || 0, e = via || out, proto = e ? (['vision', 'hy2'].includes(l.proto ?? old.proto) && s.nodes.find((n) => n.id === e)?.domain ? (l.proto ?? old.proto) : 'reality') : (l.proto in PROTO && l.proto !== 'reality' ? l.proto : old.proto && old.proto !== 'reality' ? old.proto : 'vision')
      return { ...old, out, via, proto, on: l.on ?? old.on ?? true, problem: '', name: String(l.name ?? old.name ?? '').trim() || (via ? `${nm(out)} через «${nm(via)}»` : e ? nm(out) : `${nm(0)} ${PROTO[proto]}`) } }
    let m, extra = {}
    if (path === 'api/nodes' && method === 'POST') {
      const n = { id: ++demoId, name: b.name, addr: '', mask: 'ya.ru', joined: false, waiting: true, seen: 0, up: false, xray: '', load: '', xray_ok: true, err: '', online: 0, day: 0 }
      s.nodes.push(n); extra = { node: n.id, command: `bash <(curl -fsSL https://${s.settings.domain}/s/_n/install.sh) --join 7Kq2vXb9mT4wDemo` }
      setTimeout(() => { if (s.nodes.includes(n)) { Object.assign(n, { joined: true, waiting: false, up: true, addr: '185.104.248.' + (n.id % 200), seen: Date.now() / 1000, xray: '25.10.15', load: '0.02' }); A.setState(s) } }, 5000)
    } else if ((m = /^api\/nodes\/(\d+)(\/token)?$/.exec(path))) {
      const n = s.nodes.find((x) => x.id === Number(m[1]))
      if (m[2]) extra = { command: `bash <(curl -fsSL https://${s.settings.domain}/s/_n/install.sh) --join 9Zp4nWc2kR8sDemo` }
      else if (method === 'PATCH') { Object.assign(n, { name: b.name || n.name, mask: b.mask || n.mask, domain: b.domain ?? n.domain, ru_direct: !!b.ru_direct, tls: false, cert_err: '' }); if (n.domain) setTimeout(() => { n.tls = true; A.setState(s) }, 4000) }
      else { s.nodes = s.nodes.filter((x) => x !== n); s.kits.forEach((k) => { k.lines = k.lines.filter((l) => l.out !== n.id && l.via !== n.id) }) }
    } else if (path === 'api/kits/assign') { s.users.forEach((u) => { if (b.kits[u.id]) u.kit = Number(b.kits[u.id]) }) }
    else if (path === 'api/kits') { const k = { id: ++demoId, name: b.name, is_default: false, users: 0, lines: [] }; s.kits.push(k); extra = { kit: k.id } }
    else if ((m = /^api\/kits\/(\d+)(\/lines|\/order|\/users)?$/.exec(path))) {
      const k = kit(m[1])
      if (m[2] === '/lines') k.lines.push({ id: ++demoId, ...line(b) })
      else if (m[2] === '/order') k.lines.sort((x, y) => b.ids.indexOf(x.id) - b.ids.indexOf(y.id))
      else if (m[2] === '/users') { const def = s.kits.find((x) => x.is_default).id; s.users.forEach((u) => { if (b.ids.includes(u.id)) u.kit = k.id; else if (u.kit === k.id && k.id !== def) u.kit = def }) }
      else if (method === 'PATCH') { if (b.name) k.name = b.name; if (b.is_default) s.kits.forEach((x) => { x.is_default = x === k }) }
      else { if (k.is_default) throw new Error('Этот набор получают новые люди. Сначала назначьте другой'); const def = s.kits.find((x) => x.is_default).id; s.users.forEach((u) => { if (u.kit === k.id) u.kit = def }); s.kits = s.kits.filter((x) => x !== k) }
    } else if ((m = /^api\/lines\/(\d+)$/.exec(path))) {
      for (const k of s.kits) { const i = k.lines.findIndex((l) => l.id === Number(m[1])); if (i < 0) continue; if (method === 'DELETE') k.lines.splice(i, 1); else k.lines[i] = line(b, k.lines[i]) }
    }
    demoCount(s); return { ...extra, ...s }
  }
  // Ответ сервера на любое изменение — всё состояние админки целиком
  async function call(method, path, body) {
    const r = A.demo() ? await demoCall(method, path, body) : await A.api(method, path, body)
    if (r.kits) A.setState(r)
    return r
  }

  // ---------- страницы ----------
  let page = 'home'
  const items = () => document.querySelectorAll('.side-item[data-page]')
  const mark = () => { document.querySelectorAll('.side-item[aria-current]').forEach((x) => x.removeAttribute('aria-current')); document.querySelector(`.side-item[data-page="${page}"]`).setAttribute('aria-current', 'page') }
  // адрес страницы — в ссылке (#users, #set …): перезагрузка и «назад» возвращают на неё, а не на главную.
  // Решётка, а не путь: админка отдаётся одним файлом, и относительные ссылки на api и файлы не ломаются
  const pages = [...items()].map((a) => a.dataset.page)
  const fromUrl = () => { const p = decodeURIComponent(location.hash.slice(1)); return pages.includes(p) ? p : 'home' }
  const opened = (p) => document.dispatchEvent(new CustomEvent('mp-page', { detail: p }))
  function go(p, push = true) {
    if (p === page) return
    if (push) history.pushState(null, '', p === 'home' ? location.pathname + location.search : '#' + p)
    const o = $('mp-page-' + page), n = $('mp-page-' + p); page = p; mark()
    o.classList.add('out')
    setTimeout(() => { o.hidden = true; o.classList.remove('out'); n.classList.add('out'); n.hidden = false; paint(); opened(p); void n.offsetWidth; n.classList.remove('out') }, 200)
  }
  items().forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); go(a.dataset.page) }))
  addEventListener('popstate', () => go(fromUrl(), false))
  // открыли по ссылке на страницу: показываем её сразу, без перехода; заполняем, когда скрипты загружены и состояние пришло
  const first = fromUrl()
  if (first !== 'home') {
    $('mp-page-home').hidden = true; $('mp-page-' + first).hidden = false; page = first; mark()
    addEventListener('DOMContentLoaded', () => {
      if (S()?.users) { paint(); opened(first); return }
      const kick = () => { document.removeEventListener('mp-state', kick); paint(); opened(first) }
      document.addEventListener('mp-state', kick)
    })
  }
  // пункт меню, открывший шторку, после её закрытия отдаёт отметку обратно странице
  document.querySelectorAll('dialog').forEach((d) => d.addEventListener('close', () => setTimeout(mark, 0)))

  // ---------- ноды ----------
  const node = (id) => S().nodes.find((n) => n.id === Number(id))
  const nodeName = (id) => id ? node(id)?.name || 'удалённая нода' : S().settings.server_name
  function usage(id) {
    const ls = S().kits.flatMap((k) => k.lines.filter((l) => l.on)), to = id ? [...new Set(ls.filter((l) => l.via === id).map((l) => nodeName(l.out)))] : []
    const parts = []; if (ls.some((l) => l.out === id)) parts.push('Сервер'); if (to.length) parts.push('Мост на ' + to.join(', '))
    return parts.join(', ') || 'Не используется'
  }
  const since = (t) => { const m = Math.max(1, Math.round((Date.now() / 1000 - t) / 60)), h = Math.round(m / 60), d = Math.round(h / 24); return m < 90 ? `${m} мин` : h < 36 ? `${h} ч` : `${d} ${plural(d, 'день', 'дня', 'дней')}` }
  const stText = (n) => n.waiting && !n.joined ? 'Ждёт команду' : n.up ? (n.err ? 'Ошибка настроек' : n.xray_ok ? 'На связи' : 'Xray не запущен') : n.joined ? 'Нет связи ' + since(n.seen) : 'Не подключалась'
  const stKind = (n) => n.up && !n.err && n.xray_ok ? 'is-ok' : n.up || (n.waiting && !n.joined) ? 'is-warn' : 'is-bad'
  function paintNodes() {
    const s = S(), peopleOn = s.users.filter((u) => u.online?.length).length
    const rows = [{ id: 0, name: s.settings.server_name, addr: s.settings.domain, up: s.xray.ok, joined: true, err: '', xray_ok: true, online: peopleOn, day: s.main.day, main: true }, ...s.nodes]
    put($('nd-rows'), rows.map((n) => `<tr tabindex="0" data-id="${n.id}" class="${n.up || n.waiting ? '' : 'is-down'}">
      <th scope="row"><span class="mp-who">${esc(n.name)}</span><span class="mp-what">${esc(n.addr || 'адрес появится после команды')}</span>
        <span class="mp-m"><span class="mp-m-note">${esc(usage(n.id))}</span><span class="mp-m-exp${n.up ? '' : ' is-expired'}">${n.main ? (n.up ? 'На связи' : 'Xray не отвечает') : esc(stText(n))}</span><span class="mp-m-use">${n.up ? n.online + ' в сети' : ''}</span></span></th>
      <td>${esc(usage(n.id))}</td><td class="mp-nd-st"><span class="mp-st ${n.main ? (n.up ? 'is-ok' : 'is-bad') : stKind(n)}"><span class="dot"></span>${n.main ? (n.up ? 'На связи' : 'Xray не отвечает') : esc(stText(n))}</span></td>
      <td class="num">${n.up ? n.online : ''}</td><td class="num">${n.up && n.day ? A.bytes(n.day) : ''}</td></tr>`).join(''))
    const bad = s.nodes.filter((n) => n.joined && (!n.up || n.err || !n.xray_ok)).length + (s.xray.ok ? 0 : 1)
    $('nd-count').textContent = rows.length; $('nd-dot').hidden = !bad; $('nd-count').hidden = !!bad
    if ($('nd-sheet').open && sheetId) fillSheet(false)
    if ($('nd-add').open && addId) checkJoined()
  }

  let sheetId = 0
  function fillSheet(form = true) {
    const n = node(sheetId); if (!n) { $('nd-sheet').close(); return }
    $('nd-s-t').textContent = n.name; $('nd-s-ip').textContent = n.addr || 'ещё не подключалась'
    $('nd-s-badge').className = 'badge badge-' + { 'is-ok': 'success', 'is-warn': 'warning', 'is-bad': 'danger' }[stKind(n)]; $('nd-s-badge').lastElementChild.textContent = stText(n)
    $('nd-s-seen').textContent = n.up && n.seen ? 'отчёт ' + since(n.seen) + ' назад' : ''
    $('nd-s-err').hidden = !n.err; $('nd-s-err-t').textContent = n.err
    put($('nd-s-kv'), [['Занята', usage(n.id)], ['Xray', n.xray || 'нет данных'], ['В сети', n.up ? n.online : 'нет данных'], ['За сутки', n.day ? A.bytes(n.day) : '0'], ['Нагрузка', n.load || 'нет данных']].map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join(''))
    if (form) { const f = $('nd-s-form'); f.name.value = n.name; f.mask.value = n.mask; f.domain.value = n.domain || ''; f.ru_direct.checked = !!n.ru_direct; window.fieldError?.(f.domain, ''); window.fieldError?.(f.mask, '') }
    const h = $('nd-s-dom-h'); h.textContent = !n.domain ? '' : n.tls ? 'Сертификат выпущен, на ноде работают Vision и Hysteria2' : n.old_agent ? 'На ноде старый агент, он не умеет выпускать сертификат. Запустите на ней «Команду для переустановки»' : n.cert_err ? 'Сертификат не выпустился: ' + n.cert_err : 'Нода выпускает сертификат, это до минуты'
    h.classList.toggle('mp-warn', !!n.domain && !n.tls && (!!n.cert_err || !!n.old_agent))
    // с доменом и сертификатом Reality маскируется под сам домен ноды: чужой сайт не используется, поле только путает
    $('nd-s-form').mask.closest('.field').hidden = !!n.tls
  }
  const openRow = (id) => { if (!Number(id)) { document.querySelector('.side-item[data-page="srv"]').click(); return } sheetId = Number(id); fillSheet(); $('nd-sheet').showModal() }
  $('nd-rows').addEventListener('click', (e) => { const tr = e.target.closest('tr'); if (tr) openRow(tr.dataset.id) })
  $('nd-rows').addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.matches('tr')) openRow(e.target.dataset.id) })
  $('nd-s-form').addEventListener('submit', (e) => {
    e.preventDefault(); const f = e.target
    busy(document.querySelector('[form="nd-s-form"]'), async () => {
      try { await call('PATCH', 'api/nodes/' + sheetId, { name: f.name.value, mask: f.mask.value, domain: f.domain.value, ru_direct: f.ru_direct.checked }); $('nd-sheet').close(); toast({ type: 'success', title: 'Нода сохранена', text: 'Настройки дойдут до неё за полминуты' }) }
      catch (err) { /маскировк/i.test(err.message) ? window.fieldError?.(f.mask, err.message) : /домен/i.test(err.message) ? window.fieldError?.(f.domain, err.message) : fail(err) }
    })
  })
  $('nd-s-del').addEventListener('click', async () => {
    const n = node(sheetId), used = S().kits.flatMap((k) => k.lines).filter((l) => l.out === n.id || l.via === n.id).length
    if (!await A.confirm(`Убрать ноду «${n.name}»?`, used ? `Из подписок пропадёт ${used} ${plural(used, 'подключение', 'подключения', 'подключений')} через неё. Сам сервер останется как есть` : 'Сам сервер останется как есть', 'Убрать')) return
    try { await call('DELETE', 'api/nodes/' + n.id); $('nd-sheet').close(); toast({ type: 'success', title: 'Нода убрана', text: n.name }) } catch (err) { fail(err) }
  })

  // новая нода: создаётся сразу, чтобы команда была видна без лишнего шага; закрыли, не скопировав, — убираем
  let addId = 0, addCopied = false, addPoll = 0, addName = ''
  function showCmd(cmd) { $('nd-add-cmd').textContent = cmd; $('nd-add-copy').dataset.copy = cmd; $('nd-add-wait').classList.remove('ready'); $('nd-add-ok').disabled = true; addCopied = false }
  function checkJoined() {
    const n = node(addId); if (!n) return
    const ok = n.joined && !n.waiting
    $('nd-add-wait').classList.toggle('ready', ok); $('nd-add-ok').disabled = !ok; $('nd-add-ip').textContent = n.addr
  }
  async function openAdd(reId) {
    const f = $('nd-add-form')
    try {
      if (reId) { const r = await call('POST', `api/nodes/${reId}/token`); addId = reId; f.name.value = addName = node(reId).name; showCmd(r.command) }
      else { addName = 'Нода ' + (S().nodes.length + 1); const r = await call('POST', 'api/nodes', { name: addName }); addId = r.node; f.name.value = ''; f.name.placeholder = addName; showCmd(r.command) }
    } catch (err) { return fail(err) }
    $('nd-add-t').textContent = reId ? 'Переустановка ноды' : 'Новая нода'
    $('nd-add').showModal()
    clearInterval(addPoll); addPoll = setInterval(() => { if (!A.demo()) A.refresh() }, 3000)
  }
  $('nd-add-btn').addEventListener('click', (e) => busy(e.currentTarget, () => openAdd(0)))
  $('nd-s-again').addEventListener('click', () => { const id = sheetId; $('nd-sheet').close(); openAdd(id) })
  $('nd-add-copy').addEventListener('click', () => { addCopied = true })
  const saveAddName = async () => { const v = $('nd-add-form').name.value.trim(); if (v && v !== addName && node(addId)) { addName = v; await call('PATCH', 'api/nodes/' + addId, { name: v }).catch(fail) } }
  $('nd-add-form').name.addEventListener('change', saveAddName)
  $('nd-add-form').addEventListener('submit', async (e) => { e.preventDefault(); await saveAddName(); $('nd-add').close() })
  $('nd-add').addEventListener('close', () => {
    clearInterval(addPoll); const n = node(addId), id = addId; addId = 0
    if (n && !n.joined && !addCopied) call('DELETE', 'api/nodes/' + id).catch(() => {})
  })

  // ---------- подписки ----------
  let kitId = 0, tabsHtml = ''
  const kit = () => S().kits.find((k) => k.id === kitId) || S().kits[0]
  // основной вход сервера переключён на Reality: подключение Vision этого сервера на деле Reality
  const label = (l) => !l.via && !l.out && l.proto === 'vision' && S().main?.reality ? PROTO.reality : PROTO[l.proto] || l.proto
  const chain = (l) => `<span class="mp-chain"><span class="mp-hops">${l.via ? esc(nodeName(l.via)) + icon('arrow-right') + esc(nodeName(l.out)) : esc(nodeName(l.out))}</span><span class="badge badge-mono">${label(l)}</span>${l.problem ? `<span class="badge badge-warning" data-tip="${esc(l.problem)}">не работает</span>` : ''}</span>`
  const lineRow = (l) => `<div class="alist-row mp-line${l.on ? '' : ' is-off'}" data-id="${l.id}">
      <button type="button" class="icon-btn icon-btn-sm mp-grip" aria-label="Переместить «${esc(l.name)}»">${icon('grip-vertical')}</button>
      <button type="button" class="mp-line-open"><b>${named(l.name)}</b>${chain(l)}</button>
      <input type="checkbox" role="switch" class="switch" aria-label="Показывать «${esc(l.name)}»"${l.on ? ' checked' : ''}></div>`
  function paintSubs() {
    const s = S(), k = kit(); kitId = k.id
    const th = s.kits.map((x) => `${x.id}:${x.name}`).join('|')
    if (th !== tabsHtml) {
      tabsHtml = th
      // вкладки библиотека запускает один раз на элемент: набор сменился — ставим новый элемент
      const box = document.createElement('div'); box.className = 'tabs'; box.id = 'kit-tabs'; box.setAttribute('role', 'tablist'); box.setAttribute('aria-label', 'Наборы')
      box.innerHTML = '<span class="line"></span>' + s.kits.map((x) => `<button class="tab" role="tab" aria-selected="${x.id === k.id}" data-kit="${x.id}">${esc(x.name)}<span class="mp-n">${x.users}</span></button>`).join('')
      $('kit-tabs').replaceWith(box); box.addEventListener('pick', pickKit); window.initInputs?.(box.parentElement)
    }
    s.kits.forEach((x) => { const n = $('kit-tabs').querySelector(`[data-kit="${x.id}"] .mp-n`); if (n && n.textContent !== String(x.users)) n.textContent = x.users })
    const cur = $('kit-tabs').querySelector(`[data-kit="${k.id}"]`)
    if (cur && cur.getAttribute('aria-selected') !== 'true') $('kit-tabs').select?.(cur, false)
    if (!dragging) put($('ln-list'), k.lines.map(lineRow).join('')) && window.initLayers?.($('ln-list'))
    $('ln-list').hidden = !k.lines.length; $('ln-empty').hidden = !!k.lines.length
    if (document.activeElement !== $('kit-name')) $('kit-name').value = k.name
    $('kit-def').checked = k.is_default; $('kit-def').disabled = k.is_default
    const mine = s.users.filter((u) => u.kit === k.id)
    put($('kit-avs'), mine.slice(0, 3).map((u) => `<span class="avatar avatar-md" data-hue="${u.id % 6 + 1}">${esc(u.name.trim()[0]?.toUpperCase() || '?')}</span>`).join('') + (mine.length > 3 ? `<span class="avatar avatar-md avatar-more">+${mine.length - 3}</span>` : '') || '<span class="mp-note">Никого</span>')
    $('kit-del-sec').hidden = k.is_default
  }
  function pickKit(e) {
    const box = $('kit-box'); box.classList.add('out')
    setTimeout(() => { kitId = Number(e.detail.dataset.kit); paintSubs(); box.classList.remove('out') }, 200)
  }
  $('kit-new').addEventListener('click', () => { window.fieldError?.($('kit-form').name, ''); $('kit-form').name.value = ''; $('kit-dlg').showModal() })
  $('kit-form').addEventListener('submit', (e) => {
    e.preventDefault(); const name = e.target.name.value.trim(); if (!name) return window.fieldError?.(e.target.name, 'Нужно название')
    busy(e.target.querySelector('[type=submit]'), async () => { try { const r = await call('POST', 'api/kits', { name }); kitId = r.kit; $('kit-dlg').close(); paintSubs() } catch (err) { fail(err) } })
  })
  $('kit-name').addEventListener('change', async (e) => { const v = e.target.value.trim(); if (!v) { e.target.value = kit().name; return } try { await call('PATCH', 'api/kits/' + kitId, { name: v }) } catch (err) { fail(err) } })
  $('kit-def').addEventListener('change', async (e) => { if (!e.target.checked) return; try { await call('PATCH', 'api/kits/' + kitId, { is_default: true }) } catch (err) { e.target.checked = false; fail(err) } })
  $('kit-del').addEventListener('click', async () => {
    const k = kit(), def = S().kits.find((x) => x.is_default)
    if (!await A.confirm(`Удалить набор «${k.name}»?`, k.users ? `${k.users} ${plural(k.users, 'человек перейдёт', 'человека перейдут', 'человек перейдут')} на набор «${def.name}»` : 'Им никто не пользуется', 'Удалить')) return
    try { kitId = def.id; await call('DELETE', 'api/kits/' + k.id); toast({ type: 'success', title: 'Набор удалён', text: k.name }) } catch (err) { fail(err) }
  })
  // наборы людей: все люди списком, у каждого справа его набор
  $('kit-who').addEventListener('click', () => {
    const ks = S().kits, us = S().users
    $('who-list').innerHTML = us.length ? us.map((u) => `<div class="mp-who-row"><span>${esc(u.name)}</span><select class="select input-sm" data-u="${u.id}" aria-label="Набор для «${esc(u.name)}»">${ks.map((k) => `<option value="${k.id}"${k.id === u.kit ? ' selected' : ''}>${esc(k.name)}</option>`).join('')}</select></div>`).join('') : '<p class="mp-note">Людей пока нет</p>'
    window.enhanceSelects?.($('who-list')); $('who-dlg').showModal()
  })
  $('who-form').addEventListener('submit', (e) => {
    e.preventDefault(); const kits = {}
    $('who-list').querySelectorAll('select[data-u]').forEach((sel) => { const u = S().users.find((x) => x.id === Number(sel.dataset.u)); if (u && Number(sel.value) !== u.kit) kits[u.id] = Number(sel.value) })
    if (!Object.keys(kits).length) return $('who-dlg').close()
    busy(e.target.querySelector('[type=submit]'), async () => { try { await call('POST', 'api/kits/assign', { kits }); $('who-dlg').close() } catch (err) { fail(err) } })
  })

  // подключение: правка в окне
  let lineId = 0
  const lForm = $('ln-form'), lineOf = (id) => kit().lines.find((l) => l.id === Number(id))
  function fillProto(keep) {
    const e = Number(lForm.via.value) || Number(lForm.out.value), list = e ? ['reality', ...(node(e)?.domain ? ['vision', 'hy2'] : [])] : S().main.protos
    setSelect(lForm.proto, list.map((p) => `<option value="${p}">${label({ proto: p, out: e, via: 0 })}</option>`).join(''), list.includes(keep) ? keep : list[0])
  }
  function fillVia(keep) {
    const out = Number(lForm.out.value), list = S().nodes.filter((n) => n.id !== out)
    setSelect(lForm.via, '<option value="0">Без моста</option>' + list.map((n) => `<option value="${n.id}">${esc(n.name)}</option>`).join(''), list.some((n) => n.id === Number(keep)) ? keep : 0)
  }
  let filling = false, lineExit = [0, 'direct']
  // AmneziaWG идёт мимо Xray: выход ему не задать
  const fillExit = () => window.mpExits?.fill(lForm.exit, lForm.exit_fail, lineExit[0], lineExit[1], 'Как у человека', lForm.proto.value === 'awg' ? 'Нельзя для AmneziaWG' : '')
  lForm.proto.addEventListener('change', () => { if (lForm.exit.options.length && !lForm.exit.disabled) lineExit = [Number(lForm.exit.value) || 0, lForm.exit_fail.value]; fillExit() })
  function openLine(l) {
    lineId = l ? l.id : 0; filling = true
    $('ln-dlg-t').textContent = l ? 'Подключение' : 'Новое подключение'; $('ln-del').hidden = !l
    lForm.name.value = l ? l.name : ''; lForm.name.placeholder = l ? '' : 'Подставится само'
    setSelect(lForm.out, [{ id: 0, name: S().settings.server_name }, ...S().nodes].map((n) => `<option value="${n.id}">${esc(n.name)}</option>`).join(''), l ? l.out : 0)
    fillVia(l ? l.via : 0); fillProto(l ? l.proto : 'vision'); filling = false
    lineExit = l ? [l.exit, l.exit_fail] : [0, 'direct']; fillExit()
    $('ln-dlg').showModal()
  }
  lForm.out.addEventListener('change', () => { if (filling) return; filling = true; fillVia(lForm.via.value); fillProto(lForm.proto.value); filling = false })
  lForm.via.addEventListener('change', () => { if (filling) return; filling = true; fillProto(lForm.proto.value); filling = false })
  $('ln-list').addEventListener('click', (e) => { const b = e.target.closest('.mp-line-open'); if (b) openLine(lineOf(b.closest('.mp-line').dataset.id)) })
  $('ln-add').addEventListener('click', () => openLine(null))
  lForm.addEventListener('submit', (e) => {
    e.preventDefault(); const body = { name: lForm.name.value, out: Number(lForm.out.value), via: Number(lForm.via.value), proto: lForm.proto.value, ...(lForm.exit.options.length ? { exit: Number(lForm.exit.value) || 0, exit_fail: lForm.exit_fail.value } : {}) }
    busy(lForm.querySelector('[type=submit]'), async () => {
      try { await call(lineId ? 'PATCH' : 'POST', lineId ? 'api/lines/' + lineId : `api/kits/${kitId}/lines`, body); $('ln-dlg').close() } catch (err) { fail(err) }
    })
  })
  $('ln-del').addEventListener('click', async () => { try { await call('DELETE', 'api/lines/' + lineId); $('ln-dlg').close() } catch (err) { fail(err) } })
  $('ln-list').addEventListener('change', async (e) => {
    if (!e.target.matches('.switch')) return
    const row = e.target.closest('.mp-line'), on = e.target.checked; row.classList.toggle('is-off', !on)
    try { await call('PATCH', 'api/lines/' + row.dataset.id, { on }) } catch (err) { e.target.checked = !on; row.classList.toggle('is-off', on); fail(err) }
  })

  // порядок: строка идёт ровно за указателем, соседи отъезжают переходом; DOM меняется один раз — после отпускания
  let dragging = false
  $('ln-list').addEventListener('pointerdown', (e) => {
    const grip = e.target.closest('.mp-grip'); if (!grip || dragging || e.button) return
    const row = grip.closest('.mp-line'), list = row.parentElement, rows = [...list.children], i0 = rows.indexOf(row)
    if (rows.length < 2) return
    e.preventDefault(); try { grip.setPointerCapture(e.pointerId) } catch (err) {}
    rows.forEach((r) => r.getAnimations().forEach((x) => x.finish()))
    const top = rows.map((r) => r.offsetTop), h = rows.map((r) => r.offsetHeight), H = h[i0], last = rows.length - 1
    const lo = top[0] - top[i0], hi = top[last] + h[last] - top[i0] - H, y0 = e.clientY
    let to = i0, dy = 0; dragging = true
    list.classList.add('mp-sorting'); row.classList.add('mp-drag')
    const move = (ev) => {
      dy = Math.min(hi, Math.max(lo, ev.clientY - y0)); row.style.transform = `translateY(${dy}px)`
      const y = top[i0] + dy; to = i0   // сосед уступает, когда край строки прошёл его середину
      rows.forEach((r, j) => {
        if (j === i0) return
        const c = top[j] + h[j] / 2, sh = j < i0 && y < c ? H : j > i0 && y + H > c ? -H : 0
        if (sh > 0) to = Math.min(to, j); if (sh < 0) to = Math.max(to, j)
        r.style.transform = sh ? `translateY(${sh}px)` : ''
      })
    }
    const up = () => {
      grip.removeEventListener('pointermove', move); grip.removeEventListener('pointerup', up); grip.removeEventListener('pointercancel', up)
      const slot = (to > i0 ? top[to] + h[to] - H : top[to]) - top[i0]
      const done = () => {
        rows.forEach((r) => { r.style.transition = 'none'; r.style.transform = '' })
        list.insertBefore(row, to > i0 ? rows[to].nextSibling : rows[to])
        list.offsetHeight; rows.forEach((r) => { r.style.transition = '' })
        row.classList.remove('mp-drag'); list.classList.remove('mp-sorting'); dragging = false
        if (to === i0) return
        const ids = [...list.children].map((r) => Number(r.dataset.id)), k = kit()
        k.lines.sort((x, y) => ids.indexOf(x.id) - ids.indexOf(y.id)); list._html = k.lines.map(lineRow).join('')
        call('POST', `api/kits/${kitId}/order`, { ids }).catch((err) => { fail(err); list._html = ''; A.refresh?.() })
      }
      const a = row.animate([{ transform: `translateY(${dy}px)` }, { transform: `translateY(${slot}px)` }], { duration: 180, easing: 'cubic-bezier(.2,.8,.2,1)' })
      row.style.transform = `translateY(${slot}px)`; a.onfinish = a.oncancel = done
    }
    grip.addEventListener('pointermove', move); grip.addEventListener('pointerup', up); grip.addEventListener('pointercancel', up)
  })

  // ---------- набор в карточке человека и в окне нового ----------
  function fillKit(sel, value) {
    const ks = S()?.kits || []
    document.querySelectorAll('.mp-kit-f').forEach((f) => { f.hidden = ks.length < 2 })
    setSelect(sel, ks.map((k) => `<option value="${k.id}">${esc(k.name)}</option>`).join(''), value ?? ks.find((k) => k.is_default)?.id ?? '')
  }
  window.mpKits = { fill: fillKit }
  document.querySelectorAll('[data-open="mp-add"]').forEach((b) => b.addEventListener('click', () => { const f = $('mp-add-form'); fillKit(f.kit); window.mpExits?.fill(f.exit, f.exit_fail, 0, 'direct', 'С адреса сервера') }))

  function paint() {
    const s = S(); if (!s) return
    if (A.demo()) demoSeed(s)
    if (!s.kits) return   // сервер старой версии
    paintNodes(); if (page === 'subs' || !kitId) paintSubs()
  }
  document.addEventListener('mp-state', paint)
  paint()
})()

;
// exits.js
// Админка monolit proxy: «Выходы» — купленные SOCKS5-прокси, через которые люди выходят в интернет.
// Выход выбирают у человека (для всех его подключений) и у подключения в наборе. Новый или изменённый прокси
// сервер сначала проверяет, потом применяет с перезапуском Xray (ответ — по api/job, как у маршрутов)
(() => {
  const A = window.mpAdmin, $ = (id) => document.getElementById(id)
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const toast = (o) => window.toast?.(o)
  const fail = (e) => toast({ type: 'error', title: 'Не получилось', text: e.message })
  const icons = () => window.lucide?.createIcons()
  const busy = async (btn, fn) => { btn.disabled = true; btn.classList.add('is-loading'); try { return await fn() } finally { btn.disabled = false; btn.classList.remove('is-loading') } }
  const plural = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c }
  const named = (s) => esc(s).replace(/((?:\p{Regional_Indicator}{2}))\s*/gu, '<span class="mp-flag">$1</span>')
  const flag = (cc) => /^[A-Z]{2}$/.test(cc || '') ? String.fromCodePoint(...[...cc].map((c) => 0x1F1A5 + c.charCodeAt(0))) : ''
  const S = () => A.state()
  const list = () => { if (S() && A.demo()) demoSeed(S()); return S()?.exits || [] }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  // ---------- демо ----------
  let demoId = 10
  const demoSeed = (s) => { if (s.exits) return; s.exits = [
    { id: 1, name: flag('NL') + ' Амстердам', proxy: 'user7:Kx92mQ@185.199.110.4:1080', host: '185.199.110.4', port: 1080, ok: 1, udp: 1, ip: '185.199.110.4', country: 'NL', ms: 84, error: '', checked: Date.now() / 1000 - 120, users: 2, lines: 0 },
    { id: 2, name: flag('US') + ' Резидентный', proxy: 'res-us:pX4q@gate.example.net:7000', host: 'gate.example.net', port: 7000, ok: 1, udp: 0, ip: '73.162.18.201', country: 'US', ms: 212, error: '', checked: Date.now() / 1000 - 300, users: 0, lines: 1 }] }
  async function demoCall(method, path, b = {}) {
    await sleep(600)
    const s = S(), m = /^api\/exits\/(\d+)(\/check)?$/.exec(path), x = m && s.exits.find((e) => e.id === Number(m[1]))
    if (m?.[2]) { x.checked = Date.now() / 1000; return { ok: true, exits: s.exits } }
    if (method === 'DELETE') { s.exits = s.exits.filter((e) => e !== x); s.users.forEach((u) => { if (u.exit === x.id) u.exit = 0 }); return { ok: true, exits: s.exits } }
    const p = /^(?:socks5:\/\/)?(?:([^:@]+):([^@]*)@)?([a-z0-9.-]+):(\d{1,5})$/i.exec(String(b.proxy ?? x?.proxy).trim())
    if (!p) throw new Error('Прокси выглядит так: 1.2.3.4:1080 или логин:пароль@1.2.3.4:1080')
    if (p[3].startsWith('10.')) throw new Error('Прокси не отвечает: порт закрыт')
    const row = { proxy: p[0].replace(/^socks5:\/\//, ''), host: p[3], port: Number(p[4]), ok: 1, udp: 1, ip: /^\d/.test(p[3]) ? p[3] : '91.198.4.27', country: 'DE', ms: 97, error: '', checked: Date.now() / 1000 }
    if (x) Object.assign(x, row, { name: b.name || x.name })
    else s.exits.push({ id: ++demoId, name: b.name || `${flag('DE')} ${row.ip}`, ...row, users: 0, lines: 0 })
    return { ok: true, exits: s.exits }
  }
  async function api(method, path, body) { if (A.demo()) { demoSeed(S()); return demoCall(method, path, body) } return A.api(method, path, body) }
  // с перезапуском Xray: сервер отвечает сразу, итог — по api/job
  async function run(method, path, body) {
    const r = await api(method, path, body)
    if (!r?.pending) return r
    const until = Date.now() + 150000
    await sleep(1500)
    while (Date.now() < until) {
      let j = null
      try { j = await A.api('GET', 'api/job') } catch (e) {}
      if (j && j.job.id === r.job && !j.job.running) { if (!j.job.ok) throw new Error(j.job.error || 'Не получилось'); return r }
      await sleep(1500)
    }
    throw new Error('Xray долго не отвечает, загляните в раздел «Сервер»')
  }
  const take = (r) => { if (r?.exits) { const s = S(); s.exits = r.exits; A.setState(s) } return r }

  // ---------- список ----------
  const ago = (t) => t ? A.ago(t) : 'ещё не проверяли'
  const status = (x) => x.ok === 1 ? `<span class="badge badge-success"><span class="dot"></span>${x.ms ? x.ms + ' мс' : 'Отвечает'}</span>`
    : x.ok === 0 ? `<span class="badge badge-danger" data-tip="${esc(x.error)}"><span class="dot"></span>Не отвечает</span>` : '<span class="badge"><span class="dot"></span>Проверяю</span>'
  const who = (x) => { const n = x.users + x.lines; return n ? `у ${x.users ? `${x.users} ${plural(x.users, 'человека', 'человек', 'человек')}` : ''}${x.users && x.lines ? ' и ' : ''}${x.lines ? `${x.lines} ${plural(x.lines, 'подключения', 'подключений', 'подключений')}` : ''}` : 'пока ни у кого' }
  function paint() {
    if (!S()) return
    if (A.demo()) demoSeed(S())
    const xs = list(), box = $('mp-ex-list')
    const html = xs.map((x) => `<button type="button" class="alist-row mp-ex" data-id="${x.id}">
      <span class="alist-ic"><i data-lucide="door-open"></i></span>
      <span class="alist-tx"><b>${named(x.name)}</b><span>${esc(x.host)}:${x.port}${x.udp === 0 ? ', без UDP' : ''}, ${who(x)}</span></span>
      ${status(x)}</button>`).join('')
    if (box._html !== html) { box._html = html; box.innerHTML = html; icons() }
    box.hidden = !xs.length; $('mp-ex-empty').hidden = !!xs.length
    // поля выбора в окнах видны, только когда есть из чего выбирать
    document.querySelectorAll('.mp-exit-f').forEach((f) => { f.hidden = !xs.length })
  }
  $('mp-ex-list').addEventListener('click', (e) => { const r = e.target.closest('.mp-ex'); if (r) open(Number(r.dataset.id)) })
  $('mp-ex-add').addEventListener('click', () => open(0))

  // ---------- окно выхода ----------
  const f = $('mp-ex-form')
  let editId = 0
  function kv(x) {
    $('mp-ex-kv').hidden = !x || !x.checked
    if (!x) return
    $('mp-ex-kv').innerHTML = [
      ['Адрес выхода', x.ip ? `${flag(x.country) ? `<span class="mp-flag">${flag(x.country)}</span>` : ''}${esc(x.ip)}` : 'не узнали'],
      ['UDP', x.udp === 1 ? 'есть' : x.udp === 0 ? '<span class="mp-warn">нет, звонки и игры пойдут по правилу падения</span>' : 'не узнали'],
      ['Задержка', x.ok === 1 && x.ms ? x.ms + ' мс' : x.ok === 0 ? `<span class="mp-warn">${esc(x.error || 'не отвечает')}</span>` : '—'],
      ['Проверен', esc(ago(x.checked))],
    ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')
  }
  function open(id) {
    editId = id; const x = list().find((e) => e.id === id)
    $('mp-ex-t').textContent = x ? 'Выход' : 'Новый выход'
    f.proxy.value = x ? x.proxy : ''; f.name.value = x ? x.name : ''
    window.fieldError?.(f.proxy, '')
    $('mp-ex-del').hidden = !x; $('mp-ex-check').hidden = !x
    kv(x)
    $('mp-ex-dlg').showModal()
  }
  f.addEventListener('submit', (e) => {
    e.preventDefault()
    const proxy = f.proxy.value.trim()
    if (!proxy) { window.fieldError?.(f.proxy, 'Вставьте прокси от продавца'); f.proxy.focus(); return }
    window.fieldError?.(f.proxy, '')
    const x = list().find((e) => e.id === editId)
    busy(f.querySelector('button[type=submit]'), async () => {
      try {
        take(await run(editId ? 'PATCH' : 'POST', editId ? 'api/exits/' + editId : 'api/exits', { proxy, name: f.name.value.trim() }))
        if (!A.demo()) take(await A.api('GET', 'api/state').then((s) => ({ exits: s.exits })))
        $('mp-ex-dlg').close(); paint()
        toast({ type: 'success', title: x ? 'Выход сохранён' : 'Выход добавлен', text: x ? '' : 'Выберите его у человека или подключения' })
      } catch (err) { window.fieldError?.(f.proxy, err.message) }
    })
  })
  $('mp-ex-check').addEventListener('click', (e) => busy(e.currentTarget, async () => {
    try { take(await api('POST', `api/exits/${editId}/check`)); kv(list().find((x) => x.id === editId)); paint() } catch (err) { fail(err) }
  }))
  $('mp-ex-del').addEventListener('click', async () => {
    const x = list().find((e) => e.id === editId); if (!x) return
    $('mp-ex-dlg').close()
    if (!await A.confirm(`Удалить выход «${x.name}»?`, x.users + x.lines ? 'Люди с этим выходом пойдут в интернет с адреса сервера' : 'Им никто не пользуется', 'Удалить')) return
    try { take(await run('DELETE', 'api/exits/' + x.id)); if (!A.demo()) await A.refresh(); paint(); toast({ title: 'Выход удалён', text: x.name }) } catch (err) { fail(err) }
  })

  // ---------- выбор выхода у человека и у подключения ----------
  // inherit — текст пункта «без своего выхода»: у человека это адрес сервера, у подключения — выход человека
  function fill(sel, failSel, value, failValue, inherit, off) {
    const xs = list()
    // админка обновляет данные мимо paint(): видимость поля решаем здесь, при каждом открытии окна
    const box = sel.closest('.mp-exit-f'); if (box) box.hidden = !xs.length
    sel.innerHTML = off ? `<option value="0">${esc(off)}</option>` : `<option value="0">${esc(inherit)}</option>` + xs.map((x) => `<option value="${x.id}">${esc(x.name)}</option>`).join('')
    sel.value = String(!off && xs.some((x) => x.id === value) ? value : 0); sel.disabled = !!off
    failSel.value = failValue === 'block' ? 'block' : 'direct'
    const sync = () => { failSel.disabled = !!off || sel.value === '0'; failSel.dispatchEvent(new Event('change', { bubbles: true })) }
    sel.onchange = sync; sel.dispatchEvent(new Event('change', { bubbles: true }))
  }
  window.mpExits = { fill, paint }

  document.addEventListener('mp-page', (e) => { if (e.detail === 'exits') paint() })
  const prev = A.setState
  A.setState = (s) => { prev(s); paint() }
  // общий список обновляется раз в минуту в admin.js: подхватываем тем же опросом
  setInterval(() => { if (!$('mp-page-exits').hidden) paint() }, 5000)
  setTimeout(paint, 0)
})()

;
// home.js
// Главная: что требует внимания (с действием), серверы, кто сейчас в сети.
// Данные — то же состояние админки (mpAdmin.state), перерисовка по событию mp-state
(() => {
  const $ = (id) => document.getElementById(id)
  const A = window.mpAdmin
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const plural = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c }
  const now = () => Math.floor(Date.now() / 1000)
  const since = (t) => { const m = Math.max(1, Math.round((now() - t) / 60)), h = Math.round(m / 60), d = Math.round(h / 24); return m < 90 ? `${m} мин` : h < 36 ? `${h} ч` : `${d} ${plural(d, 'день', 'дня', 'дней')}` }
  const ic = (name) => `<i data-lucide="${name}"></i>`
  const paintIcons = (el) => el.querySelectorAll('i[data-lucide]').length && window.lucide?.createIcons()

  // переходы на страницы — тем же пунктом меню
  const page = (p) => document.querySelector(`.side-item[data-page="${p}"]`)?.click()
  document.addEventListener('click', (e) => {
    const g = e.target.closest('[data-go]'); if (g) { e.preventDefault(); page(g.dataset.go); return }
    const u = e.target.closest('[data-user]'); if (u) { e.preventDefault(); A.openUser(u.dataset.user) }
  })

  const row = (icon, kind, title, sub, act) => `<div class="hm-li"><span class="hm-ic${kind ? ' is-' + kind : ''}">${ic(icon)}</span><span class="hm-tx"><b>${esc(title)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</span>${act || '<span></span>'}</div>`
  const btn = (attr, text) => `<button class="btn btn-secondary btn-sm" type="button" ${attr}><span>${text}</span></button>`

  function todo(S) {
    const out = []
    if (!S.xray.ok) out.push(row('circle-alert', 'bad', 'Xray не отвечает', S.xray.error || 'Изменения применятся, когда он заработает', btn('data-go="srv"', 'Сервер')))
    const w = S.watch || {}
    if (w.on && w.state === 'blocked') out.push(row('circle-alert', 'bad', `IP ${w.ip} не открывается из России`, 'Приложения в России не подключатся', btn('data-go="addr"', 'Сменить адрес')))
    if (w.on && w.state === 'down') out.push(row('circle-alert', 'bad', 'Сервер не отвечает ни из России, ни из-за границы', 'Посмотрите, работает ли он у хостера', btn('data-go="addr"', 'Подробнее')))
    for (const ip of S.addr_new || []) out.push(row('map-pin', '', `На сервере новый адрес ${ip}`, 'VPN можно перевести на него', btn('data-go="addr"', 'Перевести')))
    for (const n of S.nodes || []) if (n.joined && (!n.up || n.err || !n.xray_ok))
      out.push(row('triangle-alert', 'warn', n.up ? `Нода ${n.name}: ${n.err ? 'ошибка настроек' : 'Xray не запущен'}` : `Нода ${n.name} не на связи`, n.up ? '' : since(n.seen), btn('data-go="nodes"', 'Открыть')))
    const u = S.update
    if (u?.available && u.latest) out.push(row('download', '', `Вышла версия ${String(u.latest.tag).replace(/^v/, '')}`, `Сейчас стоит ${u.current}`, btn('data-go="srv"', 'Обновить')))
    $('hm-todo-n').textContent = out.length || ''
    $('hm-todo').innerHTML = out.length ? out.join('') : row('circle-check', 'ok', 'Всё работает', 'Сервер, ноды и адрес в порядке')
    paintIcons($('hm-todo'))
  }

  function servers(S) {
    const lines = (S.kits || []).flatMap((k) => k.lines.filter((l) => l.on))
    const role = (id) => [lines.some((l) => l.out === id) && 'сервер', lines.some((l) => l.via === id) && 'мост'].filter(Boolean).join(', ') || 'не используется'
    const on = S.users.filter((u) => u.online?.length).length
    const list = [{ name: S.settings.server_name, role: 'основной', ok: S.xray.ok, st: S.xray.ok ? 'на связи' : 'Xray не отвечает', online: on, id: 0 },
      ...(S.nodes || []).map((n) => ({ name: n.name, role: role(n.id), ok: n.up && !n.err && n.xray_ok, st: n.waiting && !n.joined ? 'ждёт команду' : n.up ? (n.err ? 'ошибка настроек' : n.xray_ok ? 'на связи' : 'Xray не запущен') : 'нет связи ' + since(n.seen), online: n.up ? n.online : 0, id: n.id }))]
    $('hm-srv').innerHTML = list.map((s) => `<a href="#" ${s.id ? 'data-go="nodes"' : 'data-go="srv"'}><span class="hm-srv-row"><b>${esc(s.name)}</b><span>${esc(s.role)}</span></span>`
      + `<span class="hm-srv-row"><span class="hm-dot${s.ok ? '' : ' is-down'}">${esc(s.st)}</span><span>${s.online} в сети</span></span></a>`).join('')
  }

  function online(S) {
    const us = S.users.filter((u) => u.online?.length)
    $('hm-on-n').textContent = us.length || ''
    $('hm-on').innerHTML = us.length ? us.map((u) => `<a class="hm-li" href="#" data-user="${u.id}"><span class="avatar avatar-sm" data-hue="${u.id % 8 || 8}">${esc(u.name.trim()[0] || '?').toUpperCase()}</span>`
      + `<span class="hm-tx"><b>${esc(u.name)}</b><span>${esc(u.online.length > 1 ? `${u.online.length} IP` : u.note || u.online[0].ip)}</span></span><span></span></a>`).join('')
      : `<div class="hm-li no-ic"><span class="hm-tx"><span>Сейчас никого</span></span></div>`
  }

  function paint() {
    const S = A.state(); if (!S?.users) return
    const on = S.users.filter((u) => u.online?.length).length, n = S.users.length, k = (S.kits || []).length
    $('hm-users-sub').textContent = `${n} ${plural(n, 'человек', 'человека', 'человек')}, ${on} в сети`
    $('hm-kits-sub').textContent = `${k} ${plural(k, 'набор', 'набора', 'наборов')}`
    todo(S); servers(S); online(S)
  }
  document.addEventListener('mp-state', paint)
  paint()
})()

;
// flags.js
// Флаг страны у названия — отдельным полем «Флаг» рядом с полем названия (input[data-flag]).
// Хранится по-прежнему в начале названия («🇳🇱 Амстердам»): value поля отдаёт и принимает название целиком,
// поэтому формы и сервер ничего не знают о поле флага. В Windows флагов в панели эмодзи нет — отсюда список с поиском
(() => {
  const FLAG = /^(\p{Regional_Indicator}{2})\s*/u
  const flagOf = (cc) => String.fromCodePoint(...[...cc].map((c) => 0x1F1A5 + c.charCodeAt(0)))
  const ccOf = (f) => [...f].map((c) => String.fromCharCode(c.codePointAt(0) - 0x1F1A5)).join('')
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
  const CHEV = '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'
  // только действующие коды ISO 3166-1: у устаревших (AN, YU, SU…) браузер знает название, а рисунка флага нет
  const ISO = ('AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ '
    + 'DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP '
    + 'KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ '
    + 'OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ '
    + 'UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW').split(' ')
  // частые для серверов — первыми
  const TOP = ['NL', 'DE', 'FI', 'SE', 'FR', 'GB', 'US', 'PL', 'LV', 'EE', 'LT', 'TR', 'KZ', 'RU']
  let LIST = null, DN = null
  const nameOf = (cc) => { DN ||= new Intl.DisplayNames(['ru'], { type: 'region', fallback: 'code' }); return DN.of(cc) }
  const list = () => {
    if (LIST) return LIST
    const all = ISO.map((cc) => ({ cc, name: nameOf(cc), flag: flagOf(cc) })).sort((x, y) => x.name.localeCompare(y.name, 'ru'))
    return (LIST = [...TOP.map((cc) => all.find((x) => x.cc === cc)), ...all.filter((x) => !TOP.includes(x.cc))])
  }

  // одна панель на все поля; кладётся в открытое окно, иначе модальное окно сделало бы её недоступной
  const panel = document.createElement('div')
  panel.className = 'menu mp-flags'; panel.popover = 'auto'
  panel.innerHTML = '<input class="input input-sm" type="search" placeholder="Страна" autocomplete="off" spellcheck="false" aria-label="Поиск страны"><div class="mp-flags-list" role="listbox"></div>'
  const q = panel.querySelector('input'), box = panel.querySelector('.mp-flags-list')
  let cur = null   // { set, trigger } открытого поля
  const paint = () => {
    const s = q.value.trim().toLowerCase(), hit = list().filter((x) => !s || x.name.toLowerCase().includes(s) || x.cc.toLowerCase() === s)
    box.innerHTML = (s ? '' : '<button type="button" class="menu-item" data-cc=""><span class="mp-flags-no"></span><span>Без флага</span></button>')
      + hit.map((x) => `<button type="button" class="menu-item" data-cc="${x.cc}"><span class="mp-flags-f">${x.flag}</span><span>${esc(x.name)}</span></button>`).join('')
      || '<p class="mp-note mp-flags-none">Ничего не нашлось</p>'
    box.scrollTop = 0
  }
  const pick = (cc) => { const c = cur; if (!c) return; panel.hidePopover(); c.set(cc ? flagOf(cc) : ''); c.trigger.focus() }
  box.addEventListener('click', (e) => { const b = e.target.closest('[data-cc]'); if (b) pick(b.dataset.cc) })
  q.addEventListener('input', paint)
  q.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); const b = box.querySelector('[data-cc]:not([data-cc=""])') || box.querySelector('[data-cc]'); if (b) pick(b.dataset.cc) }
    if (e.key === 'ArrowDown') { e.preventDefault(); box.querySelector('[data-cc]')?.focus() }
  })
  box.addEventListener('keydown', (e) => {
    const b = e.target.closest('[data-cc]'); if (!b) return
    if (e.key === 'ArrowDown') { e.preventDefault(); b.nextElementSibling?.focus() }
    if (e.key === 'ArrowUp') { e.preventDefault(); (b.previousElementSibling || q).focus() }
  })
  panel.addEventListener('toggle', (e) => { if (e.newState === 'closed') { panel.classList.remove('open'); cur?.trigger.setAttribute('aria-expanded', 'false'); cur = null } })

  function open(c) {
    (c.trigger.closest('dialog') || document.body).append(panel)
    cur = c; q.value = ''; paint()
    const r = c.trigger.getBoundingClientRect(), w = Math.max(280, r.width), h = 340, below = innerHeight - r.bottom >= h + 16 || r.top < h + 16
    Object.assign(panel.style, { left: Math.max(8, Math.min(r.left, innerWidth - w - 8)) + 'px', top: below ? r.bottom + 4 + 'px' : 'auto', bottom: below ? 'auto' : innerHeight - r.top + 4 + 'px', width: w + 'px' })
    // .menu без .open невидимо (visibility), и фокус в поле поиска не встал бы
    panel.showPopover(); panel.classList.add('open'); c.trigger.setAttribute('aria-expanded', 'true'); q.focus()
  }

  function attach(inp) {
    if (inp.dataset.flagReady) return; inp.dataset.flagReady = '1'
    const field = inp.closest('.field'), row = document.createElement('div'), ff = document.createElement('div')
    row.className = 'mp-flag-row'; ff.className = 'field mp-flag-field'
    ff.innerHTML = `<span class="label">Флаг</span><button type="button" class="select select-trigger mp-flag-trigger" aria-haspopup="listbox" aria-expanded="false"><span class="value"></span>${CHEV}</button>`
    field.before(row); row.append(ff, field)
    const trigger = ff.querySelector('button'), val = trigger.querySelector('.value')
    trigger.setAttribute('aria-label', 'Флаг страны')
    const d = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value'), max = inp.maxLength
    let flag = ''
    const sync = () => {
      val.innerHTML = flag ? `<span class="mp-flags-f">${flag}</span><span class="mp-flag-name">${esc(nameOf(ccOf(flag)))}</span>` : 'Нет'
      val.classList.toggle('placeholder', !flag)
      if (max > 0) inp.maxLength = flag ? max - flag.length - 1 : max   // сервер режет название целиком, с флагом
    }
    const split = (v) => { const m = FLAG.exec(v); flag = m ? m[1] : ''; d.set.call(inp, m ? v.slice(m[0].length) : v); sync() }
    Object.defineProperty(inp, 'value', { get() { const t = d.get.call(this); return flag ? (t ? flag + ' ' + t : flag) : t }, set: split })
    // флаг вставили в поле названия руками — переезжает в поле флага
    inp.addEventListener('input', () => { if (FLAG.test(d.get.call(inp))) split(d.get.call(inp)) })
    split(d.get.call(inp))
    const set = (f) => { flag = f; sync(); inp.dispatchEvent(new Event('input', { bubbles: true })); inp.dispatchEvent(new Event('change', { bubbles: true })) }
    const c = { set, trigger }
    // панель закрывается сама уже на нажатии мимо неё, до клика — запоминаем, была ли она открыта этим полем
    let was = false
    trigger.addEventListener('pointerdown', () => { was = panel.matches(':popover-open') && cur === c })
    trigger.addEventListener('click', () => { if (was || (panel.matches(':popover-open') && cur === c)) { if (panel.matches(':popover-open')) panel.hidePopover(); was = false } else open(c) })
    trigger.addEventListener('keydown', (e) => { if (['ArrowDown', 'Enter', ' '].includes(e.key) && !panel.matches(':popover-open')) { e.preventDefault(); open(c) } })
  }
  const init = () => document.querySelectorAll('input[data-flag]').forEach(attach)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init()
})()
