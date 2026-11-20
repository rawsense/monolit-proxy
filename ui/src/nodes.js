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
    } else if (path === 'api/kits') { const k = { id: ++demoId, name: b.name, is_default: false, users: 0, lines: [] }; s.kits.push(k); extra = { kit: k.id } }
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
  let page = 'users'
  const items = () => document.querySelectorAll('.side-item[data-page]')
  const mark = () => { document.querySelectorAll('.side-item[aria-current]').forEach((x) => x.removeAttribute('aria-current')); document.querySelector(`.side-item[data-page="${page}"]`).setAttribute('aria-current', 'page') }
  function go(p) {
    if (p === page) return
    const o = $('mp-page-' + page), n = $('mp-page-' + p); page = p
    o.classList.add('out')
    setTimeout(() => { o.hidden = true; o.classList.remove('out'); n.classList.add('out'); n.hidden = false; paint(); void n.offsetWidth; n.classList.remove('out') }, 200)
  }
  items().forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); go(a.dataset.page) }))
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
  const stKind = (n) => n.up && !n.err && n.xray_ok ? 'badge-success' : n.up || (n.waiting && !n.joined) ? 'badge-warning' : 'badge-danger'
  function paintNodes() {
    const s = S(), peopleOn = s.users.filter((u) => u.online?.length).length
    const rows = [{ id: 0, name: s.settings.server_name, addr: s.settings.domain, up: s.xray.ok, joined: true, err: '', xray_ok: true, online: peopleOn, day: s.main.day, main: true }, ...s.nodes]
    put($('nd-rows'), rows.map((n) => `<tr tabindex="0" data-id="${n.id}" class="${n.up || n.waiting ? '' : 'is-down'}">
      <th scope="row"><span class="mp-who">${esc(n.name)}</span><span class="mp-what">${esc(n.addr || 'адрес появится после команды')}</span>
        <span class="mp-m"><span class="mp-m-note">${esc(usage(n.id))}</span><span class="mp-m-exp${n.up ? '' : ' is-expired'}">${n.main ? (n.up ? 'На связи' : 'Xray не отвечает') : esc(stText(n))}</span><span class="mp-m-use">${n.up ? n.online + ' в сети' : ''}</span></span></th>
      <td>${esc(usage(n.id))}</td><td class="mp-nd-st"><span class="badge ${n.main ? (n.up ? 'badge-success' : 'badge-danger') : stKind(n)}"><span class="dot"></span>${n.main ? (n.up ? 'На связи' : 'Xray не отвечает') : esc(stText(n))}</span></td>
      <td class="num">${n.up ? n.online : ''}</td><td class="num">${n.up && n.day ? A.bytes(n.day) : ''}</td></tr>`).join(''))
    const bad = s.nodes.filter((n) => n.joined && (!n.up || n.err || !n.xray_ok)).length + (s.xray.ok ? 0 : 1)
    $('nd-badge').className = 'badge ' + (bad ? 'badge-warning' : 'badge-success')
    $('nd-badge').lastElementChild.textContent = bad ? `${bad} ${plural(bad, 'не в порядке', 'не в порядке', 'не в порядке')}` : 'Все на связи'
    $('nd-sub').textContent = `${rows.length} ${plural(rows.length, 'сервер', 'сервера', 'серверов')}`
    $('nd-count').textContent = rows.length; $('nd-dot').hidden = !bad; $('nd-count').hidden = !!bad
    if ($('nd-sheet').open && sheetId) fillSheet(false)
    if ($('nd-add').open && addId) checkJoined()
  }

  let sheetId = 0
  function fillSheet(form = true) {
    const n = node(sheetId); if (!n) { $('nd-sheet').close(); return }
    $('nd-s-t').textContent = n.name; $('nd-s-ip').textContent = n.addr || 'ещё не подключалась'
    $('nd-s-badge').className = 'badge ' + stKind(n); $('nd-s-badge').lastElementChild.textContent = stText(n)
    $('nd-s-seen').textContent = n.up && n.seen ? 'отчёт ' + since(n.seen) + ' назад' : ''
    $('nd-s-err').hidden = !n.err; $('nd-s-err-t').textContent = n.err
    put($('nd-s-kv'), [['Занята', usage(n.id)], ['Xray', n.xray || 'нет данных'], ['В сети', n.up ? n.online : 'нет данных'], ['За сутки', n.day ? A.bytes(n.day) : '0'], ['Нагрузка', n.load || 'нет данных']].map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join(''))
    if (form) { const f = $('nd-s-form'); f.name.value = n.name; f.mask.value = n.mask; f.domain.value = n.domain || ''; f.ru_direct.checked = !!n.ru_direct; window.fieldError?.(f.domain, ''); window.fieldError?.(f.mask, '') }
    const h = $('nd-s-dom-h'); h.textContent = !n.domain ? '' : n.tls ? 'Сертификат выпущен, на ноде работают Vision и Hysteria2' : n.old_agent ? 'На ноде старый агент, он не умеет выпускать сертификат. Запустите на ней «Команду для переустановки»' : n.cert_err ? 'Сертификат не выпустился: ' + n.cert_err : 'Нода выпускает сертификат, это до минуты'
    h.classList.toggle('mp-warn', !!n.domain && !n.tls && (!!n.cert_err || !!n.old_agent))
    // с доменом и сертификатом Reality маскируется под сам домен ноды: чужой сайт не используется, поле только путает
    $('nd-s-form').mask.closest('.field').hidden = !!n.tls
  }
  const openRow = (id) => { if (!Number(id)) { document.querySelector('.side-item[data-open="mp-srv"]').click(); return } sheetId = Number(id); fillSheet(); $('nd-sheet').showModal() }
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
  const chain = (l) => `<span class="mp-chain"><span class="mp-hops">${l.via ? esc(nodeName(l.via)) + icon('arrow-right') + esc(nodeName(l.out)) : esc(nodeName(l.out))}</span><span class="badge badge-mono">${PROTO[l.proto] || l.proto}</span>${l.problem ? `<span class="badge badge-warning" data-tip="${esc(l.problem)}">не работает</span>` : ''}</span>`
  function paintSubs() {
    const s = S(), k = kit(); kitId = k.id
    const th = s.kits.map((x) => `${x.id}:${x.name}:${x.users}`).join('|')
    if (th !== tabsHtml) {
      tabsHtml = th
      // вкладки библиотека запускает один раз на элемент: набор сменился — ставим новый элемент
      const box = document.createElement('div'); box.className = 'tabs'; box.id = 'kit-tabs'; box.setAttribute('role', 'tablist'); box.setAttribute('aria-label', 'Наборы')
      box.innerHTML = '<span class="line"></span>' + s.kits.map((x) => `<button class="tab" role="tab" aria-selected="${x.id === k.id}" data-kit="${x.id}">${esc(x.name)}<span class="mp-n">${x.users}</span></button>`).join('')
      $('kit-tabs').replaceWith(box); box.addEventListener('pick', pickKit); window.initInputs?.(box.parentElement)
    }
    const cur = $('kit-tabs').querySelector(`[data-kit="${k.id}"]`)
    if (cur && cur.getAttribute('aria-selected') !== 'true') $('kit-tabs').select?.(cur, false)
    if (!dragging) put($('ln-list'), k.lines.map((l) => `<div class="alist-row mp-line${l.on ? '' : ' is-off'}" data-id="${l.id}">
      <button type="button" class="icon-btn icon-btn-sm mp-grip" aria-label="Переместить «${esc(l.name)}»">${icon('grip-vertical')}</button>
      <button type="button" class="mp-line-open"><b>${esc(l.name)}</b>${chain(l)}</button>
      <input type="checkbox" role="switch" class="switch" aria-label="Показывать «${esc(l.name)}»"${l.on ? ' checked' : ''}></div>`).join('')) && window.initLayers?.($('ln-list'))
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
  $('kit-who').addEventListener('click', () => {
    const k = kit()
    $('who-dlg-t').textContent = `У кого набор «${k.name}»`
    $('who-list').innerHTML = S().users.map((u) => `<label class="choice"><input type="checkbox" class="check" value="${u.id}"${u.kit === k.id ? ' checked' : ''}${k.is_default && u.kit === k.id ? ' disabled' : ''}><span>${esc(u.name)}${u.kit !== k.id ? `<small>сейчас «${esc(S().kits.find((x) => x.id === u.kit)?.name || '')}»</small>` : ''}</span></label>`).join('') || '<p class="mp-note">Людей пока нет</p>'
    $('who-dlg').showModal()
  })
  $('who-form').addEventListener('submit', (e) => {
    e.preventDefault(); const ids = [...$('who-list').querySelectorAll('input:checked')].map((i) => Number(i.value))
    busy(e.target.querySelector('[type=submit]'), async () => { try { await call('POST', `api/kits/${kitId}/users`, { ids }); $('who-dlg').close() } catch (err) { fail(err) } })
  })

  // подключение: правка в окне
  let lineId = 0
  const lForm = $('ln-form'), lineOf = (id) => kit().lines.find((l) => l.id === Number(id))
  function fillProto(keep) {
    const e = Number(lForm.via.value) || Number(lForm.out.value), list = e ? ['reality', ...(node(e)?.domain ? ['vision', 'hy2'] : [])] : S().main.protos
    setSelect(lForm.proto, list.map((p) => `<option value="${p}">${PROTO[p]}</option>`).join(''), list.includes(keep) ? keep : list[0])
  }
  function fillVia(keep) {
    const out = Number(lForm.out.value), list = S().nodes.filter((n) => n.id !== out)
    setSelect(lForm.via, '<option value="0">Без моста</option>' + list.map((n) => `<option value="${n.id}">${esc(n.name)}</option>`).join(''), list.some((n) => n.id === Number(keep)) ? keep : 0)
  }
  let filling = false
  function openLine(l) {
    lineId = l ? l.id : 0; filling = true
    $('ln-dlg-t').textContent = l ? 'Подключение' : 'Новое подключение'; $('ln-del').hidden = !l
    lForm.name.value = l ? l.name : ''; lForm.name.placeholder = l ? '' : 'Подставится само'
    setSelect(lForm.out, [{ id: 0, name: S().settings.server_name }, ...S().nodes].map((n) => `<option value="${n.id}">${esc(n.name)}</option>`).join(''), l ? l.out : 0)
    fillVia(l ? l.via : 0); fillProto(l ? l.proto : 'vision'); filling = false
    $('ln-dlg').showModal()
  }
  lForm.out.addEventListener('change', () => { if (filling) return; filling = true; fillVia(lForm.via.value); fillProto(lForm.proto.value); filling = false })
  lForm.via.addEventListener('change', () => { if (filling) return; filling = true; fillProto(lForm.proto.value); filling = false })
  $('ln-list').addEventListener('click', (e) => { const b = e.target.closest('.mp-line-open'); if (b) openLine(lineOf(b.closest('.mp-line').dataset.id)) })
  $('ln-add').addEventListener('click', () => openLine(null))
  lForm.addEventListener('submit', (e) => {
    e.preventDefault(); const body = { name: lForm.name.value, out: Number(lForm.out.value), via: Number(lForm.via.value), proto: lForm.proto.value }
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

  // порядок: строка едет за указателем, соседи уступают место переходом
  let dragging = false
  $('ln-list').addEventListener('pointerdown', (e) => {
    const grip = e.target.closest('.mp-grip'); if (!grip) return
    const row = grip.closest('.mp-line'), list = row.parentElement, before = [...list.children].map((r) => r.dataset.id).join()
    e.preventDefault(); try { grip.setPointerCapture(e.pointerId) } catch (err) {}
    const y0 = e.clientY; let shift = 0; dragging = true
    row.classList.add('mp-drag')
    const dyNow = () => new DOMMatrix(getComputedStyle(row).transform).m42
    const step = (sib, up) => {
      const a = sib.getBoundingClientRect().top, r0 = row.getBoundingClientRect().top - dyNow()
      list.insertBefore(row, up ? sib : sib.nextSibling)
      shift += row.getBoundingClientRect().top - dyNow() - r0
      sib.animate([{ transform: `translateY(${a - sib.getBoundingClientRect().top}px)` }, { transform: 'none' }], { duration: 180, easing: 'cubic-bezier(.2,.8,.2,1)' })
    }
    const move = (ev) => {
      const dy = ev.clientY - y0 - shift, prev = row.previousElementSibling, next = row.nextElementSibling
      if (prev && dy < -prev.offsetHeight / 2) step(prev, true); else if (next && dy > next.offsetHeight / 2) step(next, false)
      row.style.transform = `translateY(${Math.round(ev.clientY - y0 - shift)}px)`
    }
    const up = async () => {
      grip.removeEventListener('pointermove', move); grip.removeEventListener('pointerup', up); grip.removeEventListener('pointercancel', up)
      const a = row.animate([{ transform: row.style.transform || 'none' }, { transform: 'none' }], { duration: 180, easing: 'cubic-bezier(.2,.8,.2,1)' })
      row.style.transform = ''; a.onfinish = () => row.classList.remove('mp-drag')
      const ids = [...list.children].map((r) => Number(r.dataset.id)); dragging = false
      if (ids.join() === before) return
      list._html = ''   // разметка уже переставлена руками: следующая отрисовка сверит с данными
      try { await call('POST', `api/kits/${kitId}/order`, { ids }) } catch (err) { fail(err); paintSubs() }
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
  document.querySelectorAll('[data-open="mp-add"]').forEach((b) => b.addEventListener('click', () => fillKit($('mp-add-form').kit)))

  function paint() {
    const s = S(); if (!s) return
    if (A.demo()) demoSeed(s)
    if (!s.kits) return   // сервер старой версии
    paintNodes(); if (page === 'subs' || !kitId) paintSubs()
  }
  document.addEventListener('mp-state', paint)
  paint()
})()
