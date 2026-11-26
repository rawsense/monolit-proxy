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
