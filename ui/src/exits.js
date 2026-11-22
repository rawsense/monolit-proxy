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
  const list = () => S()?.exits || []
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
    sel.innerHTML = off ? `<option value="0">${esc(off)}</option>` : `<option value="0">${esc(inherit)}</option>` + xs.map((x) => `<option value="${x.id}">${esc(x.name)}</option>`).join('')
    sel.value = String(!off && xs.some((x) => x.id === value) ? value : 0); sel.disabled = !!off
    failSel.value = failValue === 'block' ? 'block' : 'direct'
    const sync = () => { failSel.disabled = !!off || sel.value === '0'; failSel.dispatchEvent(new Event('change', { bubbles: true })) }
    sel.onchange = sync; sel.dispatchEvent(new Event('change', { bubbles: true }))
  }
  window.mpExits = { fill, paint }

  document.querySelectorAll('[data-open="mp-exits"]').forEach((b) => b.addEventListener('click', paint))
  const prev = A.setState
  A.setState = (s) => { prev(s); paint() }
  // общий список обновляется раз в минуту в admin.js: подхватываем тем же опросом
  setInterval(() => { if ($('mp-exits').open) paint() }, 5000)
  setTimeout(paint, 0)
})()
