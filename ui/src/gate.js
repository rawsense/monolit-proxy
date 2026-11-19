// Заглушка входа: проверяет только заполненность, ждёт как настоящий сервер и всегда отвечает «неверный логин или пароль».
// Запрос уходит на /api/v1/authenticate своего же сервера, тот отвечает 401 и ничего не хранит
(() => {
  const $ = (id) => document.getElementById(id), f = $('g-form'), host = location.hostname
  const named = host && !/^[\d.]+$|^\[/.test(host)   // по голому IP имя не показываем
  if (named) { $('g-host').textContent = host; document.title = 'Вход · ' + host }
  $('g-copy').textContent = '© ' + new Date().getFullYear() + (named ? ' ' + host : '')
  const err = (inp, t) => window.fieldError ? window.fieldError(inp, t) : t && alert(t)
  let tries = 0
  f.addEventListener('submit', (e) => {
    e.preventDefault()
    const lg = f.login, pw = f.password, btn = f.querySelector('button[type=submit]')
    if (!lg.value.trim()) { err(lg, 'Введите логин'); lg.focus(); return }
    err(lg, '')
    if (!pw.value) { err(pw, 'Введите пароль'); pw.focus(); return }
    btn.classList.add('is-loading'); btn.disabled = true
    const wait = new Promise((ok) => setTimeout(ok, 700 + Math.random() * 600))
    const req = fetch('/api/v1/authenticate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ login: lg.value.trim(), password: pw.value }) }).catch(() => {})
    Promise.all([wait, req]).then(() => {
      btn.classList.remove('is-loading'); btn.disabled = false
      tries++; pw.value = ''
      err(pw, tries >= 5 ? 'Слишком много попыток, попробуйте позже' : 'Неверный логин или пароль'); pw.focus()
    })
  })
  $('g-forgot').addEventListener('click', (e) => {
    e.preventDefault(); err(f.login, ''); err(f.password, 'Для восстановления доступа обратитесь к администратору')
  })
})()
