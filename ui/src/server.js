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
      warp: { on: true, registered: true, plus: true, account: 'free' }, proto: { vision: true, hy2: true, xhttp: true, hy2_known: true, xhttp_known: true },
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
    if (path === 'api/proto') { if ('hy2' in body) m.proto.hy2 = body.hy2; if ('xhttp' in body) m.proto.xhttp = body.xhttp; if (body.socks) Object.assign(m.socks, body.socks); hist('Протоколы'); return { ok: true, manage: m } }
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
    const s = M.socks
    if (document.activeElement?.form !== sForm) { sForm.on.checked = s.on; sForm.port.value = s.port; sForm.user.value = s.user; sForm.pass.value = s.pass }
    $('mp-socks-cf').hidden = !s.on
    if (document.activeElement?.form !== sForm) $('mp-socks-f').hidden = !s.on
    if (s.on) window.mpAdmin.setCopy($('mp-socks-url'), $('mp-socks-copy'), socksUrl())
    $('mp-mtg').hidden = !M.managed || !M.mtg
    if (M.mtg) { $('mp-mtg-on').checked = ST?.mtg === 'running'; window.mpAdmin.setCopy($('mp-mtg-url'), $('mp-mtg-copy'), M.mtg.link) }
  }
  for (const k of ['hy2', 'xhttp']) $('mp-pr-' + k).addEventListener('change', async (e) => {
    const on = e.target.checked; e.target.disabled = true
    try { take(await run('PATCH', 'api/proto', { [k]: on })); paintAll(); toast({ type: 'success', title: `${k === 'hy2' ? 'Hysteria2' : 'XHTTP'} ${on ? 'включён' : 'выключен'}` }) }
    catch (err) { e.target.checked = !on; fail(err) } finally { e.target.disabled = false }
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
  for (const id of ['mp-srv', 'mp-routes', 'mp-warp', 'mp-proto', 'mp-hist'])
    document.querySelectorAll(`[data-open="${id}"]`).forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); if (M) paintAll(); ensure().catch(fail) }))
})()
