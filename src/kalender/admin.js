/*
 * Redigerings-siden: login, liste over kommende begivenheder, faste begivenheder,
 * opret/ret/slet, "kun denne dag", aflysning og billed-upload.
 */
(() => {
  'use strict';

  const cfg = Kal.cfg;
  const DEMO = !Kal.isConfigured();
  const SUPABASE_JS = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';
  const BUCKET = 'billeder';
  const FIELDS = ['title', 'category', 'description', 'start_date', 'start_time', 'end_time', 'repeat', 'until', 'image', 'exceptions'];
  const TAB_KEY = 'timeout-kalender-tab';
  const esc = Kal.escape;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const ICON = {
    repeat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    image: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>'
  };

  let sb = null;
  let events = [];
  let weeksShown = 8;
  let occMap = new Map();

  /* ================= Data (Supabase eller demo) ================= */

  const isLocalImg = (p) => p && !/^(data:|https?:|blob:)/.test(p);
  const collectImages = (ev) => {
    if (!ev) return [];
    const list = [ev.image];
    Object.values(ev.exceptions || {}).forEach((x) => list.push(x && x.image));
    return list.filter(isLocalImg);
  };
  const toRow = (ev) => {
    const row = {};
    FIELDS.forEach((k) => { row[k] = ev[k] === undefined ? null : ev[k]; });
    row.exceptions = row.exceptions || {};
    return row;
  };

  const store = {
    async list() {
      if (DEMO) return Kal.loadDemo();
      const { data, error } = await sb.from('events').select('*');
      if (error) throw error;
      return data || [];
    },
    async save(ev) {
      const row = toRow(ev);
      if (DEMO) {
        const list = Kal.loadDemo();
        row.id = ev.id || 'e' + Date.now().toString(36);
        const i = list.findIndex((x) => x.id === row.id);
        if (i >= 0) list[i] = row; else list.push(row);
        if (!Kal.saveDemo(list)) throw new Error('quota');
        return row;
      }
      row.updated_at = new Date().toISOString();
      const q = ev.id ? sb.from('events').update(row).eq('id', ev.id) : sb.from('events').insert(row);
      const { data, error } = await q.select().single();
      if (error) throw error;
      return data;
    },
    async remove(id) {
      if (DEMO) {
        Kal.saveDemo(Kal.loadDemo().filter((x) => x.id !== id));
        return;
      }
      const { error } = await sb.from('events').delete().eq('id', id);
      if (error) throw error;
    },
    async upload(blob) {
      if (DEMO) {
        return new Promise((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(r.result);
          r.onerror = rej;
          r.readAsDataURL(blob);
        });
      }
      const path = `${new Date().getFullYear()}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
      const { error } = await sb.storage.from(BUCKET).upload(path, blob, {
        contentType: 'image/jpeg', cacheControl: '31536000', upsert: false
      });
      if (error) throw error;
      return path;
    },
    async removeImages(paths) {
      if (DEMO || !paths.length) return;
      try { await sb.storage.from(BUCKET).remove(paths); } catch (e) { /* ikke kritisk */ }
    }
  };

  async function cleanupImages(before, after) {
    const keep = new Set(collectImages(after));
    await store.removeImages(collectImages(before).filter((p) => !keep.has(p)));
  }

  /* ================= Små hjælpere ================= */

  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  let toastTimer;
  function toast(text, isErr) {
    const t = $('#toast');
    t.textContent = text;
    t.className = 'toast show' + (isErr ? ' err' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.className = 'toast'; }, isErr ? 5000 : 2600);
  }

  function errText(e) {
    const m = String((e && (e.message || e.error_description)) || e || '');
    if (/invalid login credentials/i.test(m)) return 'Forkert e-mail eller adgangskode.';
    if (/email not confirmed/i.test(m)) return 'Brugeren er ikke bekræftet endnu (se VEJLEDNING, trin 3).';
    if (/jwt|token|not authenticated|row-level security/i.test(m)) return 'Du er ikke logget ind længere. Genindlæs siden og log ind igen.';
    if (/quota/i.test(m)) return 'Der er ikke plads til flere billeder i demo-tilstand.';
    if (/failed to fetch|networkerror|load failed/i.test(m)) return 'Ingen forbindelse til internettet. Prøv igen.';
    return 'Noget gik galt: ' + m;
  }

  function setBg(el, url) {
    el.style.backgroundImage = url ? `url("${String(url).replace(/"/g, '%22')}")` : '';
  }
  function applyThumbs(root) {
    $$('[data-img]', root).forEach((el) => setBg(el, el.dataset.img));
  }

  async function resizeImage(file, max) {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = url;
      });
      const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      return await new Promise((res) => c.toBlob(res, 'image/jpeg', DEMO ? 0.8 : 0.86));
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function busy(btn, label, fn) {
    const old = btn.textContent;
    btn.disabled = true;
    btn.textContent = label;
    try { return await fn(); } finally { btn.disabled = false; btn.textContent = old; }
  }

  /* ================= Ark (dialoger) ================= */

  function openSheet(html, dismissable) {
    const ov = $('#overlay'), sh = $('#sheet');
    sh.innerHTML = html;
    sh.dataset.dismiss = dismissable ? '1' : '';
    ov.hidden = false;
    sh.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    $$('[data-close]', sh).forEach((b) => b.addEventListener('click', closeSheet));
    return sh;
  }
  function closeSheet() {
    $('#overlay').hidden = true;
    $('#sheet').innerHTML = '';
    document.body.style.overflow = '';
  }
  $('#overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget && $('#sheet').dataset.dismiss) closeSheet();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('#overlay').hidden && !document.querySelector('.confirm-ov')) closeSheet();
  });

  function confirmBox({ title, text, ok = 'OK', danger = false }) {
    return new Promise((resolve) => {
      const ov = document.createElement('div');
      ov.className = 'overlay confirm-ov';
      ov.style.zIndex = 70;
      ov.innerHTML = `<div class="sheet" role="alertdialog" aria-modal="true" style="max-width:440px">
        <h2>${esc(title)}</h2><p class="lead">${esc(text)}</p>
        <div class="sheet-actions"><span class="spacer"></span>
          <button type="button" class="btn ghost" data-v="0">Annuller</button>
          <button type="button" class="btn ${danger ? 'danger' : 'primary'}" data-v="1">${esc(ok)}</button>
        </div></div>`;
      document.body.appendChild(ov);
      const done = (v) => { ov.remove(); document.removeEventListener('keydown', onKey); resolve(v); };
      const onKey = (e) => { if (e.key === 'Escape') done(false); };
      document.addEventListener('keydown', onKey);
      ov.addEventListener('click', (e) => {
        const b = e.target.closest('[data-v]');
        if (b) done(b.dataset.v === '1');
        else if (e.target === ov) done(false);
      });
      $('[data-v="1"]', ov).focus();
    });
  }

  /* ================= Login ================= */

  function showLogin() {
    $('#mainView').hidden = true;
    $('#barActions').hidden = true;
    $('#addBtn').hidden = true;
    $('#loginView').hidden = false;
    setTimeout(() => $('#email').focus(), 50);
  }

  $('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = $('#email').value.trim(), password = $('#password').value;
    const err = $('#loginError');
    err.hidden = true;
    if (!email || !password) { err.textContent = 'Skriv både e-mail og adgangskode.'; err.hidden = false; return; }
    try {
      await busy($('#loginBtn'), 'Logger ind…', async () => {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
      });
      $('#password').value = '';
      showMain();
    } catch (ex) {
      err.textContent = errText(ex);
      err.hidden = false;
    }
  });

  $('#logoutBtn').addEventListener('click', async () => {
    if (sb) await sb.auth.signOut();
    showLogin();
  });

  /* ================= Hovedvisning ================= */

  function showMain() {
    $('#loginView').hidden = true;
    $('#mainView').hidden = false;
    $('#barActions').hidden = false;
    $('#logoutBtn').hidden = DEMO;
    $('#addBtn').hidden = false;
    let tab = 'upcoming';
    try { tab = localStorage.getItem(TAB_KEY) || 'upcoming'; } catch (e) { /* ok */ }
    setTab(tab);
    refresh();
  }

  async function refresh() {
    if (!events.length) $('#upcoming').innerHTML = '<p class="loading">Henter kalenderen…</p>';
    try {
      events = await store.list();
    } catch (e) {
      toast(errText(e), true);
    }
    render();
  }

  function setTab(tab) {
    if (tab !== 'series') tab = 'upcoming';
    $$('.seg-btn').forEach((b) => {
      const on = b.dataset.tab === tab;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', on);
    });
    $('#upcoming').hidden = tab !== 'upcoming';
    $('#series').hidden = tab !== 'series';
    try { localStorage.setItem(TAB_KEY, tab); } catch (e) { /* ok */ }
  }
  $$('.seg-btn').forEach((b) => b.addEventListener('click', () => setTab(b.dataset.tab)));

  function render() {
    renderUpcoming();
    renderSeries();
  }

  function timeCell(start, end) {
    if (!start) return '<span class="item-time"><small>Hele<br>dagen</small></span>';
    return `<span class="item-time">${esc(start)}${end ? `<small>${esc(end)}</small>` : ''}</span>`;
  }

  function itemHtml(o) {
    const sub = [o.recurring ? Kal.describeRepeat(o.event) : '', o.cancelled ? '' : o.description].filter(Boolean).join(' · ');
    const tags = (o.cancelled ? '<span class="tag red">Aflyst</span>' : '') +
      (o.changed && !o.cancelled ? '<span class="tag blue">Kun denne dag</span>' : '');
    return `<button class="item${o.cancelled ? ' cancelled' : ''}" type="button" data-occ="${esc(o.key)}">
      <span class="item-bar" style="background:${esc(o.cat.farve)}"></span>
      ${timeCell(o.start, o.end)}
      <span class="item-main">
        <span class="item-title">${esc(o.title)}${tags}</span>
        ${sub ? `<span class="item-sub">${o.recurring ? ICON.repeat : ''}<span>${esc(sub)}</span></span>` : ''}
      </span>
      ${o.image ? `<span class="item-thumb" data-img="${esc(Kal.imageUrl(o.image))}"></span>` : ''}
      ${ICON.chev}
    </button>`;
  }

  function renderUpcoming() {
    const el = $('#upcoming');
    if (!events.length) {
      el.innerHTML = `<div class="empty-state"><strong>Kalenderen er tom</strong>
        Tryk på <b>Ny begivenhed</b> nederst for at komme i gang.</div>`;
      return;
    }
    const today = Kal.today(), todayStr = Kal.ymd(today), mon = Kal.mondayOf(today);
    const occ = Kal.expand(events, today, Kal.addDays(mon, weeksShown * 7 - 1));
    occMap = new Map(occ.map((o) => [o.key, o]));
    const byDay = {};
    occ.forEach((o) => { (byDay[o.ds] = byDay[o.ds] || []).push(o); });

    let html = '';
    for (let w = 0; w < weeksShown; w++) {
      const wm = Kal.addDays(mon, w * 7);
      const label = w === 0 ? `Denne uge · uge ${Kal.isoWeek(wm)}` : w === 1 ? `Næste uge · uge ${Kal.isoWeek(wm)}` : `Uge ${Kal.isoWeek(wm)}`;
      html += `<h2 class="week-h">${label} · ${Kal.weekRange(wm)}</h2>`;
      let any = false;
      for (let i = 0; i < 7; i++) {
        const d = Kal.addDays(wm, i), ds = Kal.ymd(d);
        if (ds < todayStr || !byDay[ds]) continue;
        any = true;
        html += `<h3 class="day-h">${esc(Kal.cap(Kal.fmtDayDate(d)))}${ds === todayStr ? '<span class="today">I dag</span>' : ''}</h3>`;
        byDay[ds].forEach((o) => { html += itemHtml(o); });
      }
      if (!any) html += '<p class="day-empty">Ingen begivenheder.</p>';
    }
    html += '<button class="btn more-btn" type="button" id="moreBtn">Vis flere uger</button>';
    el.innerHTML = html;
    applyThumbs(el);
  }

  function renderSeries() {
    const el = $('#series');
    const todayStr = Kal.ymd(Kal.today());
    const list = events.filter((e) => e.repeat).sort((a, b) => a.title.localeCompare(b.title, 'da'));
    if (!list.length) {
      el.innerHTML = `<div class="empty-state"><strong>Ingen faste begivenheder endnu</strong>
        Tryk på <b>Ny begivenhed</b> og vælg, hvor tit den skal gentages.</div>`;
      return;
    }
    let html = '<p class="hint" style="margin:0 0 12px">Begivenheder der gentages. Tryk for at rette eller slette hele serien.</p>';
    list.forEach((ev) => {
      const cat = Kal.category(ev.category);
      const ended = ev.until && ev.until < todayStr;
      html += `<button class="item" type="button" data-ev="${esc(ev.id)}">
        <span class="item-bar" style="background:${esc(cat.farve)}"></span>
        ${timeCell(ev.start_time, ev.end_time)}
        <span class="item-main">
          <span class="item-title">${esc(ev.title)}${ended ? '<span class="tag red">Sluttet</span>' : ''}</span>
          <span class="item-sub">${ICON.repeat}<span>${esc(Kal.describeRepeat(ev))}</span></span>
        </span>
        ${ev.image ? `<span class="item-thumb" data-img="${esc(Kal.imageUrl(ev.image))}"></span>` : ''}
        ${ICON.chev}
      </button>`;
    });
    el.innerHTML = html;
    applyThumbs(el);
  }

  $('#upcoming').addEventListener('click', (e) => {
    if (e.target.closest('#moreBtn')) { weeksShown += 8; renderUpcoming(); return; }
    const b = e.target.closest('[data-occ]');
    if (b && occMap.has(b.dataset.occ)) openOccurrence(occMap.get(b.dataset.occ));
  });
  $('#series').addEventListener('click', (e) => {
    const b = e.target.closest('[data-ev]');
    const ev = b && events.find((x) => String(x.id) === b.dataset.ev);
    if (ev) openEventForm(ev);
  });
  $('#addBtn').addEventListener('click', () => openEventForm(null));

  /* ================= Billedvælger ================= */

  function imageFieldHtml(label) {
    return `<div class="field"><span class="group-label">${label}</span>
      <div class="img-pick">
        <div class="img-prev" id="imgPrev">${ICON.image}</div>
        <div class="img-btns">
          <button type="button" class="btn" id="imgPick">Vælg billede</button>
          <button type="button" class="btn ghost" id="imgRemove">Fjern billede</button>
        </div>
      </div>
      <input type="file" accept="image/*" class="file-input" id="imgFile">
    </div>`;
  }

  // state: { image (eksisterende sti/URL), blob (nyt billede), removed }
  function setupImagePicker(root, state) {
    const prev = $('#imgPrev', root), pick = $('#imgPick', root), rm = $('#imgRemove', root), file = $('#imgFile', root);
    let objUrl = '';
    const paint = () => {
      if (objUrl) { URL.revokeObjectURL(objUrl); objUrl = ''; }
      let url = '';
      if (state.blob) url = objUrl = URL.createObjectURL(state.blob);
      else if (state.image && !state.removed) url = Kal.imageUrl(state.image);
      setBg(prev, url);
      prev.innerHTML = url ? '' : ICON.image;
      rm.hidden = !url;
      pick.textContent = url ? 'Skift billede' : 'Vælg billede';
    };
    pick.addEventListener('click', () => file.click());
    rm.addEventListener('click', () => { state.blob = null; state.removed = true; paint(); });
    file.addEventListener('change', async () => {
      const f = file.files && file.files[0];
      file.value = '';
      if (!f) return;
      try {
        state.blob = await resizeImage(f, DEMO ? 1000 : 1600);
        state.removed = false;
        paint();
      } catch (e) {
        toast('Billedet kunne ikke læses. Prøv et JPG- eller PNG-billede.', true);
      }
    });
    paint();
  }

  async function finalImage(state) {
    if (state.blob) return store.upload(state.blob);
    if (state.removed) return '';
    return state.image || '';
  }

  /* ================= Opret / ret begivenhed ================= */

  const FREQS = [['none', 'Nej'], ['week', 'Hver uge'], ['week2', 'Hver anden uge'], ['month', 'Hver måned'], ['quarter', 'Hvert kvartal']];

  function freqOf(r) {
    if (!r) return 'none';
    if (r.freq === 'week') return (r.interval || 1) === 2 ? 'week2' : 'week';
    return (r.interval || 1) === 3 ? 'quarter' : 'month';
  }
  const monthKey = (c) => (c && c.by === 'nth' ? 'nth:' + c.nth : 'day');

  function openEventForm(ev) {
    const isNew = !ev;
    const cats = Kal.categories();
    const d = ev || {
      title: '', category: cats[0] ? cats[0].id : 'andet', description: '',
      start_date: Kal.ymd(Kal.today()), start_time: '18:00', end_time: '', repeat: null, until: null, image: '', exceptions: {}
    };
    const st = {
      freq: freqOf(d.repeat),
      days: d.repeat && d.repeat.freq === 'week' ? d.repeat.days.slice() : [Kal.dow(Kal.parseYmd(d.start_date))],
      monthSel: d.repeat && d.repeat.freq === 'month' ? monthKey(d.repeat) : '',
      ends: d.until ? 'date' : 'never',
      until: d.until || '',
      img: { image: d.image || '', blob: null, removed: false }
    };

    const sh = openSheet(`
      <h2>${isNew ? 'Ny begivenhed' : 'Ret begivenhed'}</h2>
      ${!isNew && ev.repeat ? '<p class="lead">Ændringer her gælder alle datoer i serien.</p>' : '<p class="lead"></p>'}
      <form class="form" id="evForm" novalidate>
        <label class="field"><span>Titel</span>
          <input type="text" name="title" class="title-input" maxlength="80" placeholder="Fx Fredagsoplæg" value="${esc(d.title)}"></label>
        <div class="field"><span class="group-label">Type</span>
          <div class="chips">${cats.map((c) => `<label class="chip"><input type="radio" name="category" value="${esc(c.id)}"${c.id === d.category ? ' checked' : ''}><span><i style="background:${esc(c.farve)}"></i>${esc(c.navn)}</span></label>`).join('')}</div>
        </div>
        <label class="field"><span id="dateLabel">Dato</span>
          <input type="date" name="start_date" value="${esc(d.start_date)}"></label>
        <div class="row" id="timeRow">
          <label class="field"><span>Fra</span><input type="time" name="start_time" value="${esc(d.start_time || '')}"></label>
          <span class="dash">–</span>
          <label class="field"><span>Til <em>(valgfri)</em></span><input type="time" name="end_time" value="${esc(d.end_time || '')}"></label>
        </div>
        <label class="check"><input type="checkbox" name="all_day"${!isNew && !d.start_time ? ' checked' : ''}> Hele dagen</label>
        <div class="field"><span class="group-label">Gentages</span>
          <div class="chips">${FREQS.map(([v, l]) => `<label class="chip"><input type="radio" name="freq" value="${v}"${v === st.freq ? ' checked' : ''}><span>${l}</span></label>`).join('')}</div>
        </div>
        <div class="sub-box" id="repeatBox"></div>
        <label class="field"><span>Beskrivelse <em>(valgfri)</em></span>
          <textarea name="description" maxlength="240" rows="2" placeholder="Fx navn på oplægsholder, eller hvad man skal have med">${esc(d.description || '')}</textarea></label>
        ${imageFieldHtml('Billede <em>(valgfrit – fx plakat til et oplæg; vises stort på TV\'et)</em>')}
        <p class="form-error" id="formError" hidden></p>
        <div class="sheet-actions">
          ${isNew ? '' : '<button type="button" class="btn danger" id="delBtn">Slet</button>'}
          <span class="spacer"></span>
          <button type="button" class="btn ghost" data-close>Annuller</button>
          <button type="submit" class="btn primary" id="saveBtn">Gem</button>
        </div>
      </form>`, false);

    const f = $('#evForm', sh);
    const date = () => (f.start_date.value ? Kal.parseYmd(f.start_date.value) : Kal.today());

    function syncAllDay() { $('#timeRow', sh).hidden = f.all_day.checked; }

    function currentRepeat() {
      if (st.freq === 'none') return null;
      if (st.freq === 'week' || st.freq === 'week2') {
        return { freq: 'week', interval: st.freq === 'week2' ? 2 : 1, days: st.days.slice().sort() };
      }
      const choices = Kal.monthChoices(date());
      const c = choices.find((x) => monthKey(x) === st.monthSel) || choices[0];
      st.monthSel = monthKey(c);
      const r = { freq: 'month', interval: st.freq === 'quarter' ? 3 : 1, by: c.by };
      if (c.by === 'nth') { r.nth = c.nth; r.weekday = c.weekday; } else r.day = c.day;
      return r;
    }

    function updateSummary() {
      const s = $('#repSummary', sh);
      if (!s) return;
      const r = currentRepeat();
      const text = r && (r.freq !== 'week' || r.days.length) ? Kal.describeRepeat({ repeat: r, until: st.ends === 'date' ? st.until : null }) : 'Vælg mindst én dag';
      const t = f.all_day.checked ? '' : f.start_time.value ? ', kl. ' + f.start_time.value + (f.end_time.value ? '–' + f.end_time.value : '') : '';
      s.textContent = text + t;
    }

    function renderRepeatBox() {
      const box = $('#repeatBox', sh);
      $('#dateLabel', sh).textContent = st.freq === 'none' ? 'Dato' : 'Første gang';
      if (st.freq === 'none') { box.hidden = true; box.innerHTML = ''; return; }
      box.hidden = false;
      let html = '';
      if (st.freq === 'week' || st.freq === 'week2') {
        html += `<span class="group-label">På disse dage</span><div class="chips days">${Kal.DAYS_SHORT.map((n, i) =>
          `<label class="chip"><input type="checkbox" name="day" value="${i}"${st.days.includes(i) ? ' checked' : ''}><span>${Kal.cap(n)}</span></label>`).join('')}</div>`;
      } else {
        const choices = Kal.monthChoices(date());
        if (!choices.some((c) => monthKey(c) === st.monthSel)) st.monthSel = monthKey(choices[0]);
        html += `<span class="group-label">Hvilken dag i måneden?</span><div class="radio-list">${choices.map((c) =>
          `<label><input type="radio" name="msel" value="${monthKey(c)}"${monthKey(c) === st.monthSel ? ' checked' : ''}> ${esc(c.label)}</label>`).join('')}</div>`;
      }
      html += `<div class="radio-list"><span class="group-label">Slutter</span>
        <label><input type="radio" name="ends" value="never"${st.ends === 'never' ? ' checked' : ''}> Fortsætter indtil videre</label>
        <label><input type="radio" name="ends" value="date"${st.ends === 'date' ? ' checked' : ''}> Slutter den
          <input type="date" name="until" value="${esc(st.until)}"></label></div>
        <p class="summary" id="repSummary"></p>`;
      box.innerHTML = html;
      updateSummary();
    }

    f.addEventListener('change', (e) => {
      const t = e.target;
      if (t.name === 'freq') { st.freq = t.value; renderRepeatBox(); }
      else if (t.name === 'day') { st.days = $$('input[name=day]:checked', sh).map((x) => +x.value); updateSummary(); }
      else if (t.name === 'msel') { st.monthSel = t.value; updateSummary(); }
      else if (t.name === 'ends') { st.ends = t.value; if (t.value === 'date') $('input[name=until]', sh).focus(); updateSummary(); }
      else if (t.name === 'until') {
        st.until = t.value;
        if (t.value) { st.ends = 'date'; $('input[name=ends][value=date]', sh).checked = true; }
        updateSummary();
      }
      else if (t.name === 'start_date') {
        if (st.days.length <= 1) st.days = [Kal.dow(date())];
        renderRepeatBox();
      } else if (t.name === 'all_day') { syncAllDay(); updateSummary(); }
      else if (t.name === 'start_time' || t.name === 'end_time') updateSummary();
    });

    syncAllDay();
    renderRepeatBox();
    setupImagePicker(sh, st.img);
    if (isNew) setTimeout(() => f.title.focus(), 60);

    const showErr = (msg) => { const el = $('#formError', sh); el.textContent = msg; el.hidden = false; el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };

    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      $('#formError', sh).hidden = true;
      const title = f.title.value.trim();
      const allDay = f.all_day.checked;
      const start = allDay ? null : f.start_time.value || null;
      const end = allDay ? null : f.end_time.value || null;
      const repeat = currentRepeat();
      const until = repeat && st.ends === 'date' ? st.until || null : null;
      if (!title) return showErr('Skriv en titel.');
      if (!f.start_date.value) return showErr('Vælg en dato.');
      if (!allDay && !start) return showErr('Vælg et starttidspunkt – eller sæt flueben i "Hele dagen".');
      if (start && end && end <= start) return showErr('Sluttidspunktet skal være efter starttidspunktet.');
      if (repeat && repeat.freq === 'week' && !repeat.days.length) return showErr('Vælg mindst én ugedag.');
      if (repeat && st.ends === 'date' && !until) return showErr('Vælg en slutdato – eller vælg "Fortsætter indtil videre".');
      if (until && until < f.start_date.value) return showErr('Slutdatoen skal være efter startdatoen.');
      const cat = $('input[name=category]:checked', sh);

      try {
        await busy($('#saveBtn', sh), 'Gemmer…', async () => {
          const image = await finalImage(st.img);
          const saved = await store.save({
            id: ev ? ev.id : undefined,
            title,
            category: cat ? cat.value : d.category,
            description: f.description.value.trim(),
            start_date: f.start_date.value,
            start_time: start,
            end_time: start ? end : null,
            repeat,
            until,
            image: image || null,
            exceptions: repeat ? (d.exceptions || {}) : {}
          });
          await cleanupImages(ev, saved);
        });
        closeSheet();
        toast(isNew ? 'Begivenheden er tilføjet' : 'Ændringerne er gemt');
        refresh();
      } catch (ex) {
        showErr(errText(ex));
      }
    });

    const del = $('#delBtn', sh);
    if (del) {
      del.addEventListener('click', async () => {
        const ok = await confirmBox({
          title: ev.repeat ? 'Slet hele serien?' : 'Slet begivenheden?',
          text: ev.repeat ? `"${ev.title}" fjernes fra alle datoer i kalenderen. Vil du kun aflyse én dag, så tryk på datoen under "Kalender" i stedet.`
            : `"${ev.title}" fjernes fra kalenderen.`,
          ok: 'Slet', danger: true
        });
        if (!ok) return;
        try {
          await busy(del, 'Sletter…', async () => {
            await store.remove(ev.id);
            await store.removeImages(collectImages(ev));
          });
          closeSheet();
          toast('Slettet');
          refresh();
        } catch (ex) {
          showErr(errText(ex));
        }
      });
    }
  }

  /* ================= Én dato i en serie ================= */

  function openOccurrence(o) {
    if (!o.recurring) { openEventForm(o.event); return; }
    const sh = openSheet(`
      <h2>${esc(o.title)}</h2>
      <p class="lead">${esc(Kal.cap(Kal.fmtDayDate(o.date)))} · ${esc(Kal.timeRange(o))}<br>${esc(Kal.describeRepeat(o.event))}</p>
      <div class="choice-list">
        <button type="button" class="btn" data-act="one">Ret kun denne dag
          <small>Fx emne, oplægsholder eller billede for netop denne dag</small></button>
        <button type="button" class="btn" data-act="all">Ret hele serien
          <small>Tid, dage, titel osv. for alle datoer</small></button>
        <button type="button" class="btn${o.cancelled ? '' : ' danger'}" data-act="cancel">
          ${o.cancelled ? 'Genopret denne dag<small>Vises igen som normalt</small>' : 'Aflys denne dag<small>Vises som "Aflyst" på TV\'et</small>'}</button>
        <button type="button" class="btn ghost" data-close>Annuller</button>
      </div>`, true);

    $('.choice-list', sh).addEventListener('click', async (e) => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const act = b.dataset.act;
      if (act === 'one') openOccurrenceForm(o);
      else if (act === 'all') openEventForm(o.event);
      else if (act === 'cancel') {
        const ev = o.event;
        const ex = { ...(ev.exceptions || {}) };
        const cur = { ...(ex[o.ds] || {}) };
        if (o.cancelled) delete cur.cancelled; else cur.cancelled = true;
        if (Object.keys(cur).length) ex[o.ds] = cur; else delete ex[o.ds];
        try {
          await busy(b, 'Gemmer…', () => store.save({ ...ev, exceptions: ex }));
          closeSheet();
          toast(o.cancelled ? 'Dagen er genoprettet' : 'Aflyst – vises som aflyst på TV\'et');
          refresh();
        } catch (ex2) {
          toast(errText(ex2), true);
        }
      }
    });
  }

  function openOccurrenceForm(o) {
    const ev = o.event;
    const cur0 = (ev.exceptions || {})[o.ds] || {};
    const hasOverride = Object.keys(cur0).some((k) => k !== 'cancelled');
    const img = { image: o.image || '', blob: null, removed: false };

    const sh = openSheet(`
      <h2>Kun ${esc(Kal.fmtDayDate(o.date))}</h2>
      <p class="lead">Ændringerne gælder kun denne dag. Resten af "${esc(ev.title)}" er uændret.</p>
      <form class="form" id="occForm" novalidate>
        <label class="field"><span>Titel</span>
          <input type="text" name="title" class="title-input" maxlength="80" value="${esc(o.title)}"></label>
        <div class="row">
          <label class="field"><span>Fra</span><input type="time" name="start_time" value="${esc(o.start || '')}"></label>
          <span class="dash">–</span>
          <label class="field"><span>Til <em>(valgfri)</em></span><input type="time" name="end_time" value="${esc(o.end || '')}"></label>
        </div>
        <label class="field"><span>Beskrivelse <em>(valgfri)</em></span>
          <textarea name="description" maxlength="240" rows="2" placeholder="Fx navn på oplægsholder">${esc(o.description)}</textarea></label>
        ${imageFieldHtml('Billede <em>(valgfrit – vises stort på TV\'et)</em>')}
        <p class="form-error" id="formError" hidden></p>
        <div class="sheet-actions">
          ${hasOverride ? '<button type="button" class="btn ghost" id="resetBtn">Nulstil</button>' : ''}
          <span class="spacer"></span>
          <button type="button" class="btn ghost" data-close>Annuller</button>
          <button type="submit" class="btn primary" id="saveBtn">Gem</button>
        </div>
      </form>`, false);

    const f = $('#occForm', sh);
    setupImagePicker(sh, img);
    const showErr = (msg) => { const el = $('#formError', sh); el.textContent = msg; el.hidden = false; };

    async function saveException(cur) {
      const ex = { ...(ev.exceptions || {}) };
      if (Object.keys(cur).length) ex[o.ds] = cur; else delete ex[o.ds];
      const saved = await store.save({ ...ev, exceptions: ex });
      await cleanupImages(ev, saved);
    }

    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = f.title.value.trim();
      const start = f.start_time.value || '', end = f.end_time.value || '';
      if (!title) return showErr('Skriv en titel.');
      if (start && end && end <= start) return showErr('Sluttidspunktet skal være efter starttidspunktet.');
      try {
        await busy($('#saveBtn', sh), 'Gemmer…', async () => {
          const cur = cur0.cancelled ? { cancelled: true } : {};
          const diff = (k, val) => { if ((val || '') !== (ev[k] || '')) cur[k] = val || ''; };
          diff('title', title);
          diff('description', f.description.value.trim());
          diff('start_time', start);
          diff('end_time', start ? end : '');
          diff('image', await finalImage(img));
          await saveException(cur);
        });
        closeSheet();
        toast('Gemt for ' + Kal.fmtDayDate(o.date));
        refresh();
      } catch (ex) {
        showErr(errText(ex));
      }
    });

    const reset = $('#resetBtn', sh);
    if (reset) {
      reset.addEventListener('click', async () => {
        const ok = await confirmBox({ title: 'Nulstil denne dag?', text: `Dagen får igen seriens normale titel, tid, beskrivelse og billede.`, ok: 'Nulstil' });
        if (!ok) return;
        try {
          await busy(reset, 'Nulstiller…', () => saveException(cur0.cancelled ? { cancelled: true } : {}));
          closeSheet();
          toast('Dagen er nulstillet');
          refresh();
        } catch (ex) {
          showErr(errText(ex));
        }
      });
    }
  }

  /* ================= Start ================= */

  async function boot() {
    document.title = (cfg.klubNavn || 'Klubben') + ' – redigér kalender';
    if (DEMO) {
      $('#demoNote').hidden = false;
      showMain();
      return;
    }
    try {
      await loadScript(SUPABASE_JS);
      sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseKey);
      const { data } = await sb.auth.getSession();
      if (data && data.session) showMain(); else showLogin();
      sb.auth.onAuthStateChange((evt) => { if (evt === 'SIGNED_OUT') showLogin(); });
    } catch (e) {
      $('#loginView').hidden = false;
      const err = $('#loginError');
      err.textContent = 'Kunne ikke forbinde til kalenderen. Tjek internetforbindelsen og genindlæs siden.';
      err.hidden = false;
    }
  }

  boot();
})();
