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
