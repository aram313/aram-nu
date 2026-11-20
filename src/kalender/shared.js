/*
 * Fælles kalender-logik (datoer, gentagelser, tekster).
 * Skrevet i "gammeldags" JavaScript (ES5), så den også kan køre i ældre TV-browsere.
 */
(function (window) {
  'use strict';

  var cfg = window.KALENDER_CONFIG || {};
  var Kal = { cfg: cfg };

  Kal.DAYS = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'];
  Kal.DAYS_SHORT = ['man', 'tir', 'ons', 'tor', 'fre', 'lør', 'søn'];
  Kal.MONTHS = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli',
    'august', 'september', 'oktober', 'november', 'december'];
  Kal.MONTHS_SHORT = ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.',
    'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];
  Kal.NTH = { '1': 'første', '2': 'anden', '3': 'tredje', '4': 'fjerde', '-1': 'sidste' };

  /* ---------- Datoer (altid kl. 12 for at undgå sommertids-fejl) ---------- */

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  Kal.pad = pad;

  Kal.day = function (d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0); };
  Kal.today = function () { return Kal.day(new Date()); };
  Kal.ymd = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  Kal.parseYmd = function (s) {
    var p = String(s).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2], 12, 0, 0);
  };
  Kal.addDays = function (d, n) { var x = Kal.day(d); x.setDate(x.getDate() + n); return x; };
  Kal.dow = function (d) { return (d.getDay() + 6) % 7; }; // 0 = mandag
  Kal.mondayOf = function (d) { return Kal.addDays(d, -Kal.dow(d)); };
  Kal.daysBetween = function (a, b) { return Math.round((Kal.day(b) - Kal.day(a)) / 86400000); };
  Kal.daysInMonth = function (d) { return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(); };
  Kal.isoWeek = function (d) {
    var thu = Kal.addDays(d, 3 - Kal.dow(d));
    var jan4 = new Date(thu.getFullYear(), 0, 4, 12);
    var thu1 = Kal.addDays(jan4, 3 - Kal.dow(jan4));
    return 1 + Math.round(Kal.daysBetween(thu1, thu) / 7);
  };
  Kal.minutes = function (hhmm) {
    if (!hhmm) return -1;
    var p = String(hhmm).split(':');
    return (+p[0]) * 60 + (+p[1] || 0);
  };

  /* ---------- Tekster ---------- */

  Kal.cap = function (s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; };
  Kal.fmtDate = function (d) { return d.getDate() + '. ' + Kal.MONTHS[d.getMonth()]; };
  Kal.fmtShort = function (d) { return d.getDate() + '. ' + Kal.MONTHS_SHORT[d.getMonth()]; };
  Kal.fmtDayDate = function (d) { return Kal.DAYS[Kal.dow(d)] + ' ' + Kal.fmtDate(d); };
  Kal.weekRange = function (monday) {
    var sun = Kal.addDays(monday, 6);
    if (monday.getMonth() === sun.getMonth()) {
      return monday.getDate() + '.–' + sun.getDate() + '. ' + Kal.MONTHS[sun.getMonth()];
    }
    return Kal.fmtShort(monday) + ' – ' + Kal.fmtShort(sun);
  };
  Kal.timeRange = function (o) {
    if (!o.start) return 'Hele dagen';
    return o.start + (o.end ? '–' + o.end : '');
  };
  Kal.joinList = function (arr) {
    if (arr.length <= 1) return arr.join('');
    return arr.slice(0, -1).join(', ') + ' og ' + arr[arr.length - 1];
  };
  // Indsætter "bløde bindestreger" i lange ord, så fx "Bestyrelsesmøde" kan deles
  // pænt som "Bes-ty-rel-ses-møde" i smalle kolonner (kun hvis der mangler plads).
  var VOWEL = /[aeiouyæøåéèáàüöä]/i;
  var ONSET = /^(tr|kr|pr|br|dr|gr|fr|bl|kl|pl|fl|gl|sk|st|sp)$/i;
  function hyphenateWord(w) {
    if (w.length < 8) return w;
    var out = '', last = 0, i = 0, n = w.length;
    while (i < n && !VOWEL.test(w.charAt(i))) i++;
    while (i < n) {
      while (i < n && VOWEL.test(w.charAt(i))) i++;
      var c0 = i;
      while (i < n && !VOWEL.test(w.charAt(i)) && /[a-zæøåé]/i.test(w.charAt(i))) i++;
      if (i >= n || !VOWEL.test(w.charAt(i))) break;
      var cl = i - c0, cut;
      if (cl <= 1) cut = c0;
      else if (cl === 2) cut = c0 + 1;
      else cut = ONSET.test(w.substr(i - 2, 2)) ? i - 2 : i - 1;
      if (cut - last >= 2 && n - cut >= 3 && cut > 1) { out += w.substring(last, cut) + '­'; last = cut; }
    }
    return out + w.substring(last);
  }
  Kal.hyphenate = function (text) {
    return String(text || '').replace(/[A-Za-zÆØÅæøåÉé]{8,}/g, hyphenateWord);
  };

  Kal.escape = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  /* ---------- Kategorier ---------- */

  Kal.categories = function () { return cfg.kategorier || []; };
  Kal.category = function (id) {
    var list = Kal.categories();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return { id: id || 'andet', navn: 'Andet', farve: '#A3A9C9' };
  };

  /* ---------- Gentagelser ----------
   * event.repeat er enten null (enkelt dato) eller:
   *   { freq: 'week',  interval: 1|2, days: [0..6] }                       (0 = mandag)
   *   { freq: 'month', interval: 1|3|6|12, by: 'nth', nth: 1..4|-1, weekday: 0..6 }
   *   { freq: 'month', interval: 1|3|6|12, by: 'day', day: 1..31 }
   * event.exceptions = { 'YYYY-MM-DD': { cancelled, title, description, image, start_time, end_time } }
   */

  Kal.occursOn = function (ev, d, ds) {
    ds = ds || Kal.ymd(d);
    if (!ev.start_date || ds < ev.start_date) return false;
    if (ev.until && ds > ev.until) return false;
    var r = ev.repeat;
    if (!r) return ds === ev.start_date;
    var start = Kal.parseYmd(ev.start_date);
    var interval = r.interval || 1;
    if (r.freq === 'week') {
      if (!r.days || r.days.indexOf(Kal.dow(d)) < 0) return false;
      var weeks = Math.round(Kal.daysBetween(Kal.mondayOf(start), Kal.mondayOf(d)) / 7);
      return weeks % interval === 0;
    }
    if (r.freq === 'month') {
      var months = (d.getFullYear() - start.getFullYear()) * 12 + d.getMonth() - start.getMonth();
      if (months % interval !== 0) return false;
      var dim = Kal.daysInMonth(d);
      if (r.by === 'nth') {
        if (Kal.dow(d) !== r.weekday) return false;
        if (r.nth === -1) return d.getDate() + 7 > dim;
        return Math.ceil(d.getDate() / 7) === r.nth;
      }
      return d.getDate() === Math.min(r.day || start.getDate(), dim);
    }
    return false;
  };

  function occurrence(ev, d, ds) {
    var ex = (ev.exceptions && ev.exceptions[ds]) || null;
    function pick(k) {
      return (ex && ex.hasOwnProperty(k) && ex[k] !== null && ex[k] !== undefined) ? ex[k] : ev[k];
    }
    var start = pick('start_time') || null;
    return {
      key: ev.id + '|' + ds,
      event: ev,
      date: d,
      ds: ds,
      title: pick('title') || '',
      description: pick('description') || '',
      image: pick('image') || '',
      start: start,
      end: start ? (pick('end_time') || null) : null,
      cat: Kal.category(ev.category),
      cancelled: !!(ex && ex.cancelled),
      changed: !!(ex && (ex.title || ex.description || ex.image || ex.start_time || ex.hasOwnProperty('image'))),
      recurring: !!ev.repeat
    };
  }
  Kal.occurrence = occurrence;

  Kal.expand = function (events, from, to) {
    var out = [];
    var n = Kal.daysBetween(from, to);
    for (var i = 0; i <= n; i++) {
      var d = Kal.addDays(from, i);
      var ds = Kal.ymd(d);
      for (var j = 0; j < events.length; j++) {
        if (Kal.occursOn(events[j], d, ds)) out.push(occurrence(events[j], d, ds));
      }
    }
    out.sort(function (a, b) {
      if (a.ds !== b.ds) return a.ds < b.ds ? -1 : 1;
      var ma = Kal.minutes(a.start), mb = Kal.minutes(b.start);
      if (ma !== mb) return ma - mb;
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });
    return out;
  };

  Kal.monthPeriod = function (interval) {
    var p = { '1': 'hver måned', '2': 'hver anden måned', '3': 'hvert kvartal', '6': 'hvert halve år', '12': 'hvert år' };
    return p[String(interval || 1)] || ('hver ' + interval + '. måned');
  };

  Kal.describeRepeat = function (ev) {
    var r = ev.repeat;
    if (!r) return '';
    var s = '';
    if (r.freq === 'week') {
      var days = (r.days || []).slice().sort();
      var names = [];
      for (var i = 0; i < days.length; i++) names.push(Kal.DAYS[days[i]]);
      if ((r.interval || 1) === 1) {
        if (days.length === 7) s = 'Hver dag';
        else if (days.join(',') === '0,1,2,3,4') s = 'Alle hverdage';
        else s = 'Hver ' + Kal.joinList(names);
      } else {
        s = days.length === 1 ? 'Hver anden ' + names[0] : 'Hver anden uge: ' + Kal.joinList(names);
      }
    } else if (r.freq === 'month') {
      var period = Kal.monthPeriod(r.interval);
      if (r.by === 'nth') s = Kal.cap(Kal.NTH[String(r.nth)] + ' ' + Kal.DAYS[r.weekday] + ' ' + period);
      else s = 'Den ' + r.day + '. ' + period;
    }
    if (ev.until) {
      var u = Kal.parseYmd(ev.until);
      s += ' · til ' + Kal.fmtShort(u) + (u.getFullYear() !== new Date().getFullYear() ? ' ' + u.getFullYear() : '');
    }
    return s;
  };

  // Valgmuligheder for "Hvilken dag i måneden?" ud fra en valgt dato
  Kal.monthChoices = function (d) {
    var dw = Kal.dow(d), dom = d.getDate();
    var nth = Math.ceil(dom / 7);
    var isLast = dom + 7 > Kal.daysInMonth(d);
    var list = [];
    if (nth <= 4) list.push({ by: 'nth', nth: nth, weekday: dw, label: 'Den ' + Kal.NTH[String(nth)] + ' ' + Kal.DAYS[dw] });
    if (isLast) list.push({ by: 'nth', nth: -1, weekday: dw, label: 'Den sidste ' + Kal.DAYS[dw] });
    list.push({ by: 'day', day: dom, label: 'Den ' + dom + '. i måneden' });
    return list;
  };

  /* ---------- Billeder ---------- */

  Kal.isConfigured = function () { return !!(cfg.supabaseUrl && cfg.supabaseKey); };
  Kal.imageUrl = function (path) {
    if (!path) return '';
    if (/^(data:|https?:|blob:)/.test(path)) return path;
    if (Kal.isConfigured()) {
      return cfg.supabaseUrl.replace(/\/+$/, '') + '/storage/v1/object/public/billeder/' + path;
    }
    return path;
  };

  /* ---------- Demo-data (bruges indtil Supabase er sat op) ---------- */

  Kal.DEMO_KEY = 'timeout-kalender-demo-v1';

  function poster(kicker, lines, sub, c1, c2) {
    var t = '';
    for (var i = 0; i < lines.length; i++) {
      t += '<text x="64" y="' + (560 + i * 96) + '" font-family="Arial,Helvetica,sans-serif" font-size="84" font-weight="700" fill="#fff">' + Kal.escape(lines[i]) + '</text>';
    }
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>' +
      '<rect width="800" height="1000" fill="url(#g)"/>' +
      '<circle cx="660" cy="200" r="240" fill="#fff" fill-opacity=".09"/><circle cx="660" cy="200" r="150" fill="#fff" fill-opacity=".08"/>' +
      '<text x="64" y="140" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="700" letter-spacing="6" fill="#fff" fill-opacity=".85">' + Kal.escape(kicker) + '</text>' +
      t +
      '<text x="64" y="' + (560 + lines.length * 96 + 30) + '" font-family="Arial,Helvetica,sans-serif" font-size="40" fill="#fff" fill-opacity=".85">' + Kal.escape(sub) + '</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  Kal.demoEvents = function () {
    var M = Kal.mondayOf(Kal.today());
    var ymd = Kal.ymd;
    var ex1 = {}, ex2 = {};
    ex1[ymd(Kal.addDays(M, 4))] = {
      title: 'Tålmodighed i hverdagen', description: 'v/ Imam Yusuf · te og snak bagefter',
      image: poster('FREDAGSOPLÆG', ['Tålmodighed', 'i hverdagen'], 'v/ Imam Yusuf', '#4B3BD6', '#0E1B5C')
    };
    ex1[ymd(Kal.addDays(M, 11))] = {
      title: 'Ungdom og ansvar', description: 'v/ Ahmad',
      image: poster('FREDAGSOPLÆG', ['Ungdom', 'og ansvar'], 'v/ Ahmad', '#C2410C', '#4A1D6B')
    };
    ex2[ymd(Kal.addDays(M, 10))] = { cancelled: true };

    // første søndag 2+ uger frem (til kvartals-eksemplet)
    var q = Kal.addDays(M, 14);
    while (Kal.dow(q) !== 6 || q.getDate() > 7) q = Kal.addDays(q, 1);

    var id = 0;
    function ev(o) { o.id = 'demo-' + (++id); o.exceptions = o.exceptions || {}; return o; }
    return [
      ev({ title: 'Kvindernes tid', category: 'kvinder', description: 'Klubben er kun for kvinder',
        start_date: ymd(Kal.addDays(M, -28)), start_time: '17:00', end_time: '20:00',
        repeat: { freq: 'week', interval: 1, days: [1, 3] }, exceptions: ex2 }),
      ev({ title: 'Fredagsoplæg', category: 'oplaeg', description: 'Oplæg og snak bagefter',
        start_date: ymd(Kal.addDays(M, -24)), start_time: '19:00', end_time: '20:30',
        repeat: { freq: 'week', interval: 1, days: [4] }, exceptions: ex1 }),
      ev({ title: 'Halaqa', category: 'halaqa', description: '',
        start_date: ymd(Kal.addDays(M, -26)), start_time: '18:30', end_time: '19:30',
        repeat: { freq: 'week', interval: 1, days: [2] } }),
      ev({ title: 'Lektiecafé', category: 'andet', description: 'Tag dine lektier med',
        start_date: ymd(Kal.addDays(M, -28)), start_time: '15:30', end_time: '17:30',
        repeat: { freq: 'week', interval: 1, days: [0, 3] } }),
      ev({ title: 'Bestyrelsesmøde', category: 'moede', description: '',
        start_date: ymd(Kal.addDays(M, -60)), start_time: '20:00', end_time: '21:30',
        repeat: { freq: 'month', interval: 1, by: 'nth', nth: -1, weekday: 2 } }),
      ev({ title: 'Fodbold i hallen', category: 'aktivitet', description: 'Husk indendørssko',
        start_date: ymd(Kal.addDays(M, 6)), start_time: '14:00', end_time: '16:00', repeat: null }),
      ev({ title: 'Fællesspisning', category: 'aktivitet', description: 'Alle er velkomne – tag gerne en ret med',
        start_date: ymd(Kal.addDays(M, 12)), start_time: '18:00', end_time: '21:00', repeat: null,
        image: poster('ALLE ER VELKOMNE', ['Fælles-', 'spisning'], 'Tag gerne en ret med', '#0F766E', '#0B1F4D') }),
      ev({ title: 'Forældremøde', category: 'moede', description: '',
        start_date: ymd(q), start_time: '13:00', end_time: '15:00',
        repeat: { freq: 'month', interval: 3, by: 'nth', nth: 1, weekday: 6 } })
    ];
  };

  Kal.loadDemo = function () {
    try {
      var raw = window.localStorage.getItem(Kal.DEMO_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignorer */ }
    return Kal.demoEvents();
  };
  Kal.saveDemo = function (events) {
    try { window.localStorage.setItem(Kal.DEMO_KEY, JSON.stringify(events)); return true; }
    catch (e) { return false; }
  };

  window.Kal = Kal;
})(window);
