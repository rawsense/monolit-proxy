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
