/*
 * TV-visning: viser denne og næste uge + fremhævede begivenheder med billede.
 * ES5 (ingen nyere JavaScript), så den virker i så mange TV-browsere som muligt.
 */
(function () {
  'use strict';

  var Kal = window.Kal, cfg = Kal.cfg, esc = Kal.escape;
  var CACHE_KEY = 'timeout-kalender-cache-v1';
  var events = [];
  var offline = false;
  var loadedAt = new Date();
  var lastMinute = '';
  var panelSig = '';
  var slideIdx = 0, slideCount = 0;

  function $(id) { return document.getElementById(id); }
  function nowMinutes(now) { return now.getHours() * 60 + now.getMinutes(); }

  // 1rem = 1 % af skærmbredden. Sættes her (og ikke kun med CSS "vw"),
  // fordi gamle TV-browsere ikke kender vw-enheden.
  function screenWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 1280;
  }
  function setRem() {
    document.documentElement.style.fontSize = (screenWidth() / 100) + 'px';
  }
  setRem();

  /* ---------- Data ---------- */

  function readCache() {
    try { return JSON.parse(window.localStorage.getItem(CACHE_KEY)) || []; } catch (e) { return []; }
  }

  function load(done) {
    if (!Kal.isConfigured()) {
      events = Kal.loadDemo();
      done();
      return;
    }
    var x = new XMLHttpRequest();
    x.open('GET', cfg.supabaseUrl.replace(/\/+$/, '') + '/rest/v1/events?select=*', true);
    x.setRequestHeader('apikey', cfg.supabaseKey);
    if (/^eyJ/.test(cfg.supabaseKey)) x.setRequestHeader('Authorization', 'Bearer ' + cfg.supabaseKey);
    try { x.timeout = 20000; } catch (e) { /* ældre browsere */ }
    x.onreadystatechange = function () {
      if (x.readyState !== 4) return;
      var ok = false;
      if (x.status >= 200 && x.status < 300) {
        try {
          events = JSON.parse(x.responseText) || [];
          ok = true;
          try { window.localStorage.setItem(CACHE_KEY, x.responseText); } catch (e) { /* fuld */ }
        } catch (e) { ok = false; }
      }
      offline = !ok;
      if (!ok && !events.length) events = readCache();
      done();
    };
    x.send();
  }

  /* ---------- Hjælpere ---------- */

  function endMinutes(o) {
    var s = Kal.minutes(o.start);
    if (s < 0) return 24 * 60;
    var e = o.end ? Kal.minutes(o.end) : s + 60;
    return e > s ? e : 24 * 60;
  }
  function isOver(o, todayStr, nowMin) {
    if (o.ds < todayStr) return true;
    if (o.ds > todayStr) return false;
    return o.start ? nowMin >= endMinutes(o) : false;
  }
  function whenLabel(o, today) {
    var diff = Kal.daysBetween(today, o.date);
    var day = diff === 0 ? 'I dag' : diff === 1 ? 'I morgen' :
      Kal.cap(Kal.DAYS[Kal.dow(o.date)]) + ' ' + Kal.fmtShort(o.date);
    return day + ' · ' + Kal.timeRange(o);
  }

  /* ---------- Ugerne ---------- */

  function card(o, isToday, nowMin) {
    var cls = 'ev';
    var isNow = false;
    if (o.cancelled) cls += ' cancelled';
    else if (isToday && o.start) {
      var s = Kal.minutes(o.start), e = endMinutes(o);
      if (nowMin >= s && nowMin < e) { cls += ' now'; isNow = true; }
      else if (nowMin >= e) cls += ' past';
    }
    var color = o.cat.farve;
    return '<div class="' + cls + '">' +
      '<i class="bar" style="background:' + color + '"></i>' +
      '<div class="t" style="color:' + color + '">' + (o.cancelled ? 'Aflyst' : esc(Kal.timeRange(o))) +
        (isNow ? '<b class="nu">NU</b>' : '') + '</div>' +
      '<div class="n">' + esc(Kal.hyphenate(o.title)) + '</div>' +
      (o.description && !o.cancelled ? '<div class="d">' + esc(o.description) + '</div>' : '') +
      '</div>';
  }

  function renderWeeks(now) {
    var today = Kal.day(now), todayStr = Kal.ymd(today), nowMin = nowMinutes(now);
    var mon = Kal.mondayOf(today);
    var occ = Kal.expand(events, mon, Kal.addDays(mon, 13));
    var byDay = {};
    for (var k = 0; k < occ.length; k++) (byDay[occ[k].ds] = byDay[occ[k].ds] || []).push(occ[k]);

    var html = '';
    for (var w = 0; w < 2; w++) {
      var wm = Kal.addDays(mon, w * 7);
      html += '<div class="week week-' + w + '"><div class="week-head">' +
        '<span class="wk-title">' + (w === 0 ? 'Denne uge' : 'Næste uge') + '</span>' +
        '<span class="wk-sub">Uge ' + Kal.isoWeek(wm) + ' · ' + Kal.weekRange(wm) + '</span>' +
        '</div><div class="days">';
      for (var i = 0; i < 7; i++) {
        var d = Kal.addDays(wm, i), ds = Kal.ymd(d), isToday = ds === todayStr;
        html += '<div class="day' + (isToday ? ' today' : ds < todayStr ? ' past-day' : '') + '" style="left:' + (i * 100 / 7) + '%"><div class="box">' +
          '<div class="day-head"><span class="dn">' + Kal.DAYS_SHORT[i] + '</span><span class="dd">' + d.getDate() + '.</span>' +
          (isToday ? '<span class="badge">I dag</span>' : '') + '</div><div class="day-body">';
        var list = byDay[ds] || [];
        for (var j = 0; j < list.length; j++) html += card(list[j], isToday, nowMin);
        html += '</div></div></div>';
      }
      html += '</div></div>';
    }
    $('weeks').innerHTML = html;
    fitTitles();
    fitDays();
  }

  // Lange danske ord (fx "Bestyrelsesmøde") må ikke knækkes midt i ordet:
  // gør i stedet skriften en anelse mindre, indtil ordet kan være der.
  function fitTitles() {
    var titles = document.querySelectorAll ? document.querySelectorAll('.ev .n') : [];
    var rem = screenWidth() / 100;
    for (var i = 0; i < titles.length; i++) {
      var el = titles[i];
      var size = 1.28;
      while (el.scrollWidth > el.clientWidth + 1 && size > 1.1) {
        size -= 0.04;
        el.style.fontSize = (size * rem) + 'px';
      }
      if (el.scrollWidth > el.clientWidth + 1) el.className += ' brk';
    }
  }

  // Hvis en dag har flere begivenheder end der er plads til: gør kortene mindre,
  // og skjul derefter (først overståede, så de sidste) med "+N mere".
  function fitDays() {
    var bodies = document.querySelectorAll ? document.querySelectorAll('.day-body') : [];
    for (var b = 0; b < bodies.length; b++) {
      var body = bodies[b];
      if (body.scrollHeight <= body.clientHeight + 1) continue;
      body.className += ' compact';
      if (body.scrollHeight <= body.clientHeight + 1) continue;
      var cards = [], past = [], rest = [];
      for (var c = 0; c < body.children.length; c++) cards.push(body.children[c]);
      for (c = 0; c < cards.length; c++) (/\bpast\b/.test(cards[c].className) ? past : rest).push(cards[c]);
      var order = past.concat(rest.reverse());
      var more = document.createElement('div');
      more.className = 'more';
      body.appendChild(more);
      var hidden = 0;
      while (body.scrollHeight > body.clientHeight + 1 && hidden < order.length - 1) {
        order[hidden].style.display = 'none';
        hidden++;
        more.innerHTML = '+ ' + hidden + ' mere';
      }
    }
  }

  /* ---------- Højre panel ---------- */

  function renderPanel(now, force) {
    var today = Kal.day(now), todayStr = Kal.ymd(today), nowMin = nowMinutes(now);
    var mon = Kal.mondayOf(today);
    var occ = Kal.expand(events, today, Kal.addDays(mon, 13));
    var upcoming = [], withImg = [];
    for (var i = 0; i < occ.length; i++) {
      var o = occ[i];
      if (o.cancelled || isOver(o, todayStr, nowMin)) continue;
      upcoming.push(o);
      if (o.image && withImg.length < 8) withImg.push(o);
    }

    var sigParts = [todayStr];
    var list = withImg.length ? withImg : upcoming.slice(0, 6);
    for (i = 0; i < list.length; i++) sigParts.push(list[i].key + list[i].title + list[i].image + list[i].description + list[i].start + list[i].end);
    var sig = (withImg.length ? 'S' : 'A') + sigParts.join('#');
    if (sig === panelSig && !force) return;
    panelSig = sig;

    var panel = $('panel');
    if (withImg.length) {
      var html = '';
      for (i = 0; i < withImg.length; i++) {
        var s = withImg[i];
        html += '<div class="slide' + (i === 0 ? ' on' : '') + '">' +
          '<div class="panel-label">Det sker</div>' +
          '<div class="img"></div><div class="info">' +
          '<div class="when" style="color:' + s.cat.farve + '">' + esc(whenLabel(s, today)) + '</div>' +
          '<div class="title">' + esc(Kal.hyphenate(s.title)) + '</div>' +
          (s.description ? '<div class="desc">' + esc(s.description) + '</div>' : '') +
          '</div></div>';
      }
      if (withImg.length > 1) {
        html += '<div class="dots">';
        for (i = 0; i < withImg.length; i++) html += '<i' + (i === 0 ? ' class="on"' : '') + '></i>';
        html += '</div>';
      }
      panel.innerHTML = html;
      var imgs = panel.getElementsByClassName ? panel.getElementsByClassName('img') : [];
      for (i = 0; i < imgs.length; i++) {
        imgs[i].style.backgroundImage = 'url("' + Kal.imageUrl(withImg[i].image).replace(/"/g, '%22') + '")';
      }
      slideIdx = 0;
      slideCount = withImg.length;
      return;
    }

    slideCount = 0;
    var todays = [];
    for (i = 0; i < upcoming.length; i++) if (upcoming[i].ds === todayStr) todays.push(upcoming[i]);
    var rows = todays.length ? todays : upcoming.slice(0, 5);
    var out = '<div class="panel-label">' + (todays.length ? 'Resten af dagen' : 'Det sker snart') + '</div>';
    if (!rows.length) {
      out += '<div class="empty">Ingen planlagte begivenheder de næste to uger</div>';
    } else {
      out += '<div class="agenda">';
      for (i = 0; i < rows.length; i++) {
        var r = rows[i];
        out += '<div class="ag"><i class="bar" style="background:' + r.cat.farve + '"></i>' +
          '<div class="when" style="color:' + r.cat.farve + '">' + esc(todays.length ? Kal.timeRange(r) : whenLabel(r, today)) + '</div>' +
          '<div class="title">' + esc(r.title) + '</div>' +
          (r.description ? '<div class="desc">' + esc(r.description) + '</div>' : '') + '</div>';
      }
      out += '</div>';
    }
    panel.innerHTML = out;
  }

  function nextSlide() {
    if (slideCount < 2) return;
    var panel = $('panel');
    var slides = panel.getElementsByClassName('slide');
    var dots = panel.getElementsByTagName('i');
    slideIdx = (slideIdx + 1) % slideCount;
    for (var i = 0; i < slides.length; i++) slides[i].className = 'slide' + (i === slideIdx ? ' on' : '');
    var dotIdx = 0;
    for (i = 0; i < dots.length; i++) {
      if (dots[i].parentNode.className !== 'dots') continue;
      dots[i].className = dotIdx === slideIdx ? 'on' : '';
      dotIdx++;
    }
  }

  /* ---------- Ur og status ---------- */

  function renderClock(now) {
    $('clock').innerHTML = Kal.pad(now.getHours()) + ':' + Kal.pad(now.getMinutes());
    $('today').innerHTML = esc(Kal.cap(Kal.fmtDayDate(now)));
    var st = '';
    if (!Kal.isConfigured()) st = '<span class="pill">Demo – ikke forbundet endnu</span>';
    else if (offline) st = '<span class="pill">Ingen forbindelse – viser senest hentede kalender</span>';
    $('status').innerHTML = st;
  }

  function renderAll(force) {
    var now = new Date();
    renderClock(now);
    renderWeeks(now);
    renderPanel(now, force);
  }

  /* ---------- Start ---------- */

  function tick() {
    var now = new Date();
    var minute = Kal.ymd(now) + ' ' + now.getHours() + ':' + now.getMinutes();
    if (minute === lastMinute) return;
    lastMinute = minute;
    renderAll(false);
    // Genindlæs hele siden én gang i døgnet (kl. 04), så TV'et altid kører nyeste version
    if (now.getHours() === 4 && now.getMinutes() === 0 && now - loadedAt > 3600000) window.location.reload();
  }

  load(function () {
    renderAll(true);
    setInterval(tick, 1000);
    setInterval(nextSlide, (cfg.skiftBilledeHvertSekund || 12) * 1000);
    setInterval(function () { load(function () { renderAll(false); }); },
      (cfg.hentNyeDataHvertMinut || 2) * 60000);
  });

  window.addEventListener('resize', function () { setRem(); renderAll(true); });
  // Demo: opdatér med det samme, når der rettes i admin i en anden fane
  window.addEventListener('storage', function (e) {
    if (e.key === Kal.DEMO_KEY && !Kal.isConfigured()) load(function () { renderAll(false); });
  });
})();
