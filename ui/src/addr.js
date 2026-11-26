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
    netsave: { tool: 'ifupdown', dev: 'ens3', file: '/etc/network/interfaces', missing: ['203.0.113.8'], stale: ['198.51.100.4'], manual: '' }, netsave_failed: true,
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
    if (path === 'api/addr/ip' && body.probe) { await sleep(1200); return { probe: body.ip.endsWith('.9') ? { state: 'blocked', ok: 0, of: 2, error: '' } : { state: 'ok', ok: 2, of: 2, error: '' } } }
    if (path === 'api/addr/ip') { demo.fwd = `${demo.ip2}>${body.ip}`; demo.ip2 = body.ip; demo.fresh = []; if (demo.cf.on) demo.cf.ip = body.ip; return { ok: true } }
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
    const cfDone = dnsOk === false && cfSet()
    paintMove(running, on)
    $('mp-a-kv').innerHTML = kv([
      ['Домен', D.domain],
      ['Смотрит на', cfDone ? `${D.cf.ip}, обновляется, до минуты` : D.dns?.length ? D.dns.join(', ') + (dnsOk === false && on.length ? (D.dns.some((a) => on.includes(a)) ? ', это не входящий адрес' : ', это не этот сервер') : '') : 'никуда', dnsOk === false && !cfDone ? 'mp-warn' : ''],
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
  // Cloudflare подключён, и в записи уже входящий адрес: остальной интернет увидит его, когда истечёт прежнее время жизни записи
  const cfSet = () => !!D.cf?.on && !D.cf.error && D.mode === 'ip2' && !!D.ip2 && D.cf.ip === D.ip2
  // ---------- свободный адрес сервера: перевести на него VPN одной кнопкой ----------
  // Хостер добавил IP: Xray переезжает на него без переустановки, старый адрес пересылает на новый, пока расходится DNS
  function paintMove(running, on) {
    const fresh = D.mode === 'ip2' ? D.fresh || [] : [], box = $('mp-a-new')
    box.hidden = !fresh.length
    box.innerHTML = fresh.map((ip) => `<div class="alert alert-info mp-alert"><i data-lucide="map-pin"></i><div><b>На сервере свободный адрес ${esc(ip)}</b><span>VPN переедет на него без переустановки</span>
      <div class="btn-row mp-alert-act"><button class="btn btn-secondary btn-sm" type="button" data-ipmove="${esc(ip)}"${running ? ' disabled' : ''}><span>Перевести VPN</span></button></div></div></div>`).join('')
    // домен ещё смотрит на прежний адрес: что именно поменять в DNS
    const need = D.mode === 'ip2' && D.ip2 && D.dns?.length && on.length && !D.dns.includes(D.ip2) && !cfSet()
    $('mp-a-rec').hidden = !need
    $('mp-a-rec-act').hidden = !D.cf?.on
    if (need) { $('mp-a-rec-t').textContent = `${D.domain} смотрит на ${D.dns.join(', ')}, а VPN работает на этом адресе`; $('mp-a-rec-ip').value = D.ip2; $('mp-a-rec-copy').dataset.copy = D.ip2 }
  }
  $('mp-a-new').addEventListener('click', async (e) => {
    const b = e.target.closest('[data-ipmove]'); if (!b) return
    const ip = b.dataset.ipmove
    // сначала проверяем адрес из России: переводить VPN на уже заблокированный адрес незачем
    let p = null
    await busy(b, async () => { try { p = (await api('POST', 'api/addr/ip', { ip, probe: true })).probe } catch (err) { p = { state: 'unknown', error: err.message } } })
    const blocked = p?.state === 'blocked', seen = p?.of ? `открылся с ${p.ok} из ${p.of} точек` : ''
    const about = seen && p.state !== 'unknown' ? `Проверка из России: ${seen}. ` : 'Проверить его из России не получилось. '
    if (!await A().confirm(blocked ? `${ip} из России не открывается` : `Перевести VPN на ${ip}?`, `${about}Xray перезапустится, подключения оборвутся на несколько секунд. ${D.ip2} продолжит принимать подключения, пока меняется DNS`, blocked ? 'Всё равно перевести' : 'Перевести')) return
    await busy(b, async () => {
      try {
        await waitJob(await api('POST', 'api/addr/ip', { ip }))
        await load()
        // пересылка, настройки сети и запись DNS доезжают за несколько секунд после перезапуска Xray
        for (const ms of [5000, 20000, 60000]) setTimeout(() => load().catch(() => {}), ms)
        toast({ type: 'success', title: 'VPN переведён на ' + ip, text: D.dns?.includes(ip) ? 'Домен уже смотрит на этот адрес' : D.cf?.on ? 'A-запись в Cloudflare меняется сама, это до минуты' : `Поменяйте A-запись ${D.domain} на ${ip}` })
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
    // настройки сети админка правит сама: предупреждение показываем, только когда сама не смогла или не умеет
    const self = !!n && n.tool !== 'none' && !n.manual && !D.netsave_failed
    $('mp-a-boot').hidden = (!miss.length && !stale.length) || self
    if ($('mp-a-boot').hidden) return
    $('mp-a-boot-t').textContent = miss.length ? 'После перезагрузки адрес пропадёт' : 'В настройках сети старый адрес'
    $('mp-a-boot-p').textContent = n.manual || (miss.length && stale.length ? `В настройках сети записан ${stale.join(', ')}, а работает ${miss.join(', ')}`
      : miss.length ? `${miss.join(', ')} не записан в настройках сети` : `В настройках сети остался ${stale.join(', ')}, которого на сервере уже нет`)
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
    // Cloudflare подключён и домен в его зоне: запись админка поменяет сама, спрашивать про несовпадение незачем
    if (warn && cfCan(dom)) { txt = `${dnsA.length ? 'Смотрит на ' + dnsA.join(', ') : 'Пока никуда не смотрит'}. Cloudflare поменяет запись на ${want[0]} сам`; warn = false }
    h.textContent = txt; h.classList.toggle('mp-warn', warn)
    $('mp-a-force-f').hidden = !warn
  }
  const cfCan = (dom) => { const z = D.cf?.on && !D.cf.error && !D.cf.proxied && !D.cf.many ? D.cf.zone : ''; return !!z && (dom === z || dom.endsWith('.' + z)) }
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
