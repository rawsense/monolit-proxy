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

  let D = null   // { mode, domain, ip2, out_ip, alt, admin, job, watch, net, dns }

  // ---------- демо ----------
  const demo = {
    mode: 'front', domain: 'vpn.example.ru', ip2: '', out_ip: '', alt: ['old.example.ru'], admin: '/adm', job: null, dns: ['203.0.113.7'],
    net: { ips: ['203.0.113.7', '203.0.113.8'], ip1: '203.0.113.7', sites: [{ names: ['example.ru', 'www.example.ru'] }] },
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
    $('mp-a-kv').innerHTML = kv([
      ['Домен', D.domain],
      ['Смотрит на', D.dns?.length ? D.dns.join(', ') + (dnsOk === false && on.length ? ', это не этот сервер' : '') : 'никуда', dnsOk === false ? 'mp-warn' : ''],
      MODES[D.mode] ? ['Способ', MODES[D.mode][0]] : null,
      D.mode === 'ip2' ? ['Входящий IP', D.ip2] : null,
      on.length ? [on.length > 1 ? 'Адреса сервера' : 'Адрес сервера', on.join(', ')] : null,
      D.mode === 'front' && sites().length ? ['Сайты рядом', sites().join(', ')] : null,
    ])
    const alt = D.alt || []
    $('mp-a-alt').hidden = !alt.length
    $('mp-a-alt').innerHTML = alt.map((d) => `<div class="alist-row mp-alt"><span class="alist-ic"><i data-lucide="link"></i></span><span class="alist-tx"><b>${esc(d)}</b><span>Запасной: старые ссылки подписок работают</span></span>
      <button class="icon-btn icon-btn-sm" type="button" data-drop="${esc(d)}" aria-label="Убрать ${esc(d)}" data-tip="Убрать"${running ? ' disabled' : ''}><i data-lucide="trash-2"></i></button></div>`).join('')
    window.lucide?.createIcons()
    $('mp-a-edit').disabled = foreign || running || !D.net
    $('mp-a-edit').closest('.btn-row').hidden = foreign
    // исходящий IP: только когда конфигом Xray управляет monolit
    $('mp-o-sec').hidden = foreign
    $('mp-o-kv').innerHTML = kv([['Сейчас', D.out_ip || 'как решает сервер' + (D.net?.ip1 ? `, ${D.net.ip1}` : '')]])
    $('mp-o-edit').disabled = foreign || running || !D.net
  }
  const paint = () => { paintWatch(); paintAddr() }

  async function load() { D = await api('GET', 'api/addr'); paint(); if (D.job?.state === 'running' && now() - D.job.at < 900) follow() }
  document.querySelectorAll('[data-open="mp-addr"]').forEach((b) => b.addEventListener('click', () => { if (!D) $('mp-a-kv').innerHTML = kv([['Домен', A().domain()]]); load().catch(fail) }))

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
