// The projects. Each one is a single line in the list, with a small live miniature; a tap plays its
// story on the whole screen, in the style that fits it: a scan pulled onto its model, a crossing
// built element by element, light running through kilometres of cable, a house cut open, a sheet of
// tools with their measures. Everything is real data from my own work, taken out of context, built in
// the portfolio workspace (format in README): pts/<id>.pts scans, .lin model edges, .tri faces for
// hiding lines, .flo cable centre lines, .mini the miniature.
//
// A beat: at (seconds), text, pts/lin (strength per group 0..3), condense (pull the points onto the
// model), flow (light along the cables), cut (how far a section has moved, 0..1), pose (yaw/pitch in
// degrees, zoom > 1 is closer, at = the point looked at in the project's normalised coordinates).
// ?p=<project>&t=<seconds> opens one project held at one moment, for checking a frame.
(() => {
  const PROJECTS = [
    {
      slug: 'roerbro', id: 'bro', name: 'rørbro', pts: true, lin: true, length: 21,
      row: 'laserscanning · 130 mio. punkter',
      meta: ['laserscanning', [16, 'opstillinger'], [130246832, 'punkter'], 'median 0,39 mm mellem scan og model'],
      gain: { pts: 0.5, lin: 0.85 },
      pose: { yaw: -28, pitch: 12, zoom: 1.25 },
      beats: [
        { at: 0, text: 'en skadet rørbro i stål, laserscannet.', pts: [1] },
        { at: 4.5, text: 'punkterne trækkes ind på stålet.', pts: [1], condense: 1, lin: [0.2, 0.2],
          pose: { yaw: -12, pitch: 16, zoom: 1.35 } },
        { at: 9.5, text: 'hvert profil, hver plade og hver bolt tegnet op i 3d.', pts: [0.3], condense: 1, lin: [1, 1],
          pose: { yaw: 22, pitch: 20, zoom: 1.45 } },
        { at: 15, text: 'og skaden målt: undergurten er presset ud af sin linje.', pts: [0.08], condense: 1,
          lin: [0.14, 1, 1], pose: { yaw: 0, pitch: 58, zoom: 2.7, at: [0.053, -0.156, 0.2125] } },
      ],
    },
    {
      slug: 'datacenter', id: 'datacenter', name: 'datacenter', lin: true, tri: true, hidden: true, flo: true, length: 22,
      row: 'as-built · 63 km kabelrør',
      meta: ['as-built', [19185, 'elementer'], [63, 'km kabelrør'], [17, 'km rør']],
      gain: { lin: 0.95 }, flowSpeed: 0.03, draw: [2.4, 3.2, 4.2, 3.4],
      pose: { yaw: 18, pitch: 52, zoom: 1.12 },
      beats: [
        { at: 0, text: 'alt under jorden rundt om et datacenter.', lin: [0.8, 0, 0, 0] },
        { at: 5, text: 'én krydsning, bygget op element for element. først brøndene.', lin: [0.1, 1, 0, 0],
          pose: { yaw: 35, pitch: 30, zoom: 11, at: [-0.852, -0.324, -0.06] } },
        { at: 9, text: 'så kabelrørene, bundt for bundt.', lin: [0.08, 0.7, 0.85, 0], flow: 1 },
        { at: 13, text: 'og rørene, et for et.', lin: [0.08, 0.6, 0.75, 1], flow: 1,
          pose: { yaw: 112, pitch: 18, zoom: 14, at: [-0.852, -0.324, -0.062] } },
        { at: 17.5, text: 'lagt ind, som det ligger, så den næste, der graver, ved hvad der er.', lin: [0.1, 0.6, 0.75, 1], flow: 1,
          pose: { yaw: 160, pitch: 24, zoom: 12, at: [-0.852, -0.324, -0.062] } },
      ],
    },
    {
      slug: 'kabeltrace', id: 'kabel', name: 'kabeltracé', lin: true, flo: true, length: 21, sweep: [0.8, 0.6, 0],
      row: 'as-built · 178 km kabler',
      meta: ['as-built', [3, 'datacentergrunde'], [178, 'km kabler'], [66715, 'elementer']],
      gain: { lin: 0.9 }, flowSpeed: 0.0105,
      pose: { yaw: 250, pitch: 30, zoom: 50, at: [-0.263, -0.25, 0.0016] },
      beats: [
        { at: 0, text: 'her mødes tre kabelruter i jorden.', lin: [1, 0, 0], flow: 1 },
        { at: 5, text: 'hvert kabel lagt ind i revit, som det ligger.', lin: [1, 0.9, 0], flow: 1,
          pose: { yaw: 275, pitch: 40, zoom: 10, at: [-0.25, -0.21, 0] } },
        { at: 10.5, text: 'kilometer efter kilometer.', lin: [0.7, 0.85, 1], flow: 0.8,
          pose: { yaw: 300, pitch: 54, zoom: 2, at: [-0.12, -0.12, 0] } },
        { at: 15.5, text: '178 km kabler på tre datacentergrunde.', lin: [0.6, 0.8, 1], flow: 0.6,
          pose: { yaw: 320, pitch: 62, zoom: 1.6, at: [0, 0, 0] } },
      ],
    },
    {
      slug: 'buehal', id: 'buehal', name: 'buehal', pts: true, lin: true, length: 19,
      row: 'laserscanning · 12 stålbuer',
      meta: ['laserscanning', [26, 'opstillinger'], [38935547, 'punkter'], [12, 'stålbuer målt']],
      gain: { pts: 0.55, lin: 1 },
      pose: { yaw: 35, pitch: 22, zoom: 1.15 },
      beats: [
        { at: 0, text: 'en hal under tolv stålbuer, laserscannet.', pts: [1, 0.6] },
        { at: 4.5, text: 'stålet skilt ud af scanningen, bue for bue.', pts: [0.08, 1] },
        { at: 9, text: 'og trukket ind på buerne i modellen.', pts: [0.05, 1], condense: 1, lin: [0.45, 0.1],
          pose: { yaw: 60, pitch: 12, zoom: 1.35 } },
        { at: 13.5, text: 'hallen bygget op i revit omkring dem.', pts: [0.04, 0.25], condense: 1, lin: [1, 0.35],
          pose: { yaw: 88, pitch: 4, zoom: 1.7 } },
      ],
    },
    {
      slug: 'georadar', id: 'gade', name: 'georadar', lin: true, tri: true, hidden: true, length: 19, draw: [6, 2.4, 2.4],
      row: 'georadar · 672 rør og kabler',
      meta: ['georadar', [672, 'rør og kabler'], '150 m gade'],
      gain: { lin: 0.9 },
      pose: { yaw: 28, pitch: 38, zoom: 1.45 },
      beats: [
        { at: 0, text: 'en gade mellem to bygninger.', lin: [0, 0.8, 0.5] },
        { at: 4.5, text: 'georadaren kører gaden igennem, og det, der ligger under asfalten, dukker op.', lin: [1, 0.3, 0.12],
          pose: { yaw: 40, pitch: 34, zoom: 1.6 } },
        { at: 11, text: 'rør, kabler og brønde, ført ind i revit.', lin: [1, 0.25, 0.08],
          pose: { yaw: 58, pitch: 24, zoom: 2.3, at: [0.05, -0.2, 0] } },
        { at: 15.5, text: 'så de kan ses, før nogen graver.', lin: [1, 0.3, 0.12],
          pose: { yaw: 14, pitch: 14, zoom: 2.1, at: [0.05, -0.35, 0] } },
      ],
    },
    {
      slug: 'fabrik', id: 'fabrik', name: 'fabrik', pts: true, lin: true, length: 19, draw: [3.5, 4],
      row: 'laserscanning · 498 stålbjælker',
      meta: ['laserscanning', [1695, 'elementer'], [498, 'stålbjælker'], [144, 'stålsøjler']],
      gain: { lin: 0.85, pts: 0.6 }, condenseW: 3.6,
      pose: { yaw: 215, pitch: 16, zoom: 0.82, at: [0, 0, 0.05] },
      beats: [
        { at: 0, text: 'et stålskelet midt i en fabrik, målt op med laserscanner.', pts: [1] },
        { at: 1.2, text: 'et stålskelet midt i en fabrik, målt op med laserscanner.', pts: [1], condense: 1 },
        { at: 5, text: 'bjælke for bjælke, søjle for søjle.', pts: [0.15], condense: 1, lin: [1, 0],
          pose: { yaw: 240, pitch: 18, zoom: 0.88, at: [0, 0, 0.05] } },
        { at: 10, text: 'dæk, trapper og facader lagt ind, etage for etage.', pts: [0], condense: 1, lin: [1, 0.45],
          pose: { yaw: 265, pitch: 20, zoom: 0.9, at: [0, 0, 0.05] } },
        { at: 15, text: 'en model, der passer til det, der står.', lin: [1, 0.45], condense: 1,
          pose: { yaw: 160, pitch: 10, zoom: 1.05, at: [-0.15, -0.1, 0.2] } },
      ],
    },
    {
      slug: 'gammelt-hus', id: 'bygning', name: 'gammelt hus', lin: true, tri: true, hidden: true, length: 18, draw: [4.5],
      row: 'laserscanning · 393 elementer',
      meta: ['laserscanning', [393, 'elementer'], [117, 'vægge'], [9, 'tagflader']],
      gain: { lin: 0.95 },
      section: { n: [0, 1, 0], from: 0.6, to: 0.02 },
      pose: { yaw: 30, pitch: 18, zoom: 0.95 },
      beats: [
        { at: 0, text: 'et gammelt hus, laserscannet ude og inde.', lin: [1] },
        { at: 6, text: 'snittet åbner det: rum, trapper og etagedæk.', lin: [1], cut: 1,
          pose: { yaw: 196, pitch: 14, zoom: 1.0 } },
        { at: 12, text: 'tegnet, som det står, fra kælder til kvist.', lin: [1], cut: 1,
          pose: { yaw: 222, pitch: 24, zoom: 1.12 } },
      ],
    },
    {
      slug: 'tagvaerk', id: 'tag', name: 'tagværk', lin: true, length: 18, draw: [6],
      row: 'laserscanning · 165 m tag',
      meta: ['laserscanning', [1232, 'stykker tømmer'], '165 m tag'],
      gain: { lin: 0.95 },
      pose: { yaw: 62, pitch: 13, zoom: 9, at: [-0.72, 0, 0] },
      beats: [
        { at: 0, text: 'et gammelt tagværk, målt op med laserscanner, spær for spær.', lin: [1] },
        { at: 6, text: 'hvert stykke tømmer tegnet, som det faktisk ligger.', lin: [1], pose: { yaw: 34, pitch: 5, zoom: 15, at: [-0.3, 0, 0] } },
        { at: 11.5, text: '165 meter tag.', lin: [1], pose: { yaw: 14, pitch: 34, zoom: 1.08, at: [0, 0, 0] } },
      ],
    },
    {
      slug: 'vaerktoej', id: 'vaerktoej', name: 'værktøj', lin: true, tri: true, hidden: true, ortho: true, length: 17, draw: [7, 7],
      row: 'fusion · 3d print',
      meta: ['tegnet i fusion', '3d-printet', [9, 'af dem her']],
      gain: { lin: 1 },
      pose: { yaw: 35, pitch: 38, zoom: 1.0 },
      beats: [
        { at: 0, text: 'værktøj til landmålerne, tegnet i fusion.', lin: [1, 1] },
        { at: 8, text: 'prismeholdere, gps-fødder, holdere og dæksler, målt i millimeter.', lin: [1, 1], pose: { yaw: 55, pitch: 42, zoom: 1.05 } },
        { at: 12.5, text: 'printet og samlet i et katalog, kollegerne bestiller fra.', lin: [1, 1], pose: { yaw: 20, pitch: 30, zoom: 1.0 } },
      ],
      // [where, text, group, when]: a measure written under each part as it is drawn
      dims: [
        [[-0.5709, 0.6346, -0.1118], '330 mm', 1, 0.9], [[0.1053, 0.5695, -0.1118], '82 mm', 1, 1.6],
        [[0.7815, 0.5943, -0.1118], '61 mm', 1, 2.3], [[-0.5709, -0.2731, -0.1118], '100 mm', 1, 3.0],
        [[0.1053, -0.039, -0.1118], '28 mm', 1, 3.6], [[0.7815, -0.1274, -0.1118], '92 mm', 1, 4.3],
        [[-0.5709, -0.762, -0.1118], '64 mm', 1, 5.0], [[0.1053, -0.8088, -0.1118], '100 mm', 1, 5.7],
        [[0.7815, -0.8972, -0.1118], '168 mm', 1, 6.4],
      ],
    },
  ];

  const DRAW = 2.4;        // seconds for a layer to be drawn in, unless the project says otherwise
  const FADE_W = 1.4;      // seconds for a layer to fade to its new strength
  const POSE_W = 2.6;      // seconds for the camera to settle on a new beat
  const SWAP = 0.45;       // seconds to fade out when going to the next project
  const TRAIL = 7;         // points in the tail of each light running along a cable

  const Q = new URLSearchParams(location.search);
  // ?id=<data file>&yaw=&pitch=&zoom=&at=x,y,z&t=: any data file on its own, for tuning a camera
  if (Q.get('id')) {
    const n = (k, v) => (Q.has(k) ? +Q.get(k) : v);
    PROJECTS.push({ slug: '_test', id: Q.get('id'), name: Q.get('id'), pts: Q.has('pts'), lin: !Q.has('nolin'), flo: Q.has('flo'),
      tri: Q.has('tri'), hidden: Q.has('tri'), ortho: Q.has('ortho'),
      length: 10, row: '', meta: [], hidden_row: true, flowSpeed: n('speed', 0.02), gain: { lin: n('gain', 0.9), pts: n('pgain', 0.5) },
      pose: { yaw: n('yaw', 30), pitch: n('pitch', 30), zoom: n('zoom', 1), at: (Q.get('at') || '0,0,0').split(',').map(Number) },
      beats: [{ at: 0, text: Q.get('id'), lin: [n('g0', 1), n('g1', 1), n('g2', 1), n('g3', 1)], pts: [1, 1, 1, 1], flow: 1 }] });
    Q.set('p', '_test');
  }
  const HOLD = Q.get('p');
  const AT = parseFloat(Q.get('t'));
  const STILL = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = (n) => n.toLocaleString('da-DK');

  // ---------------------------------------------------------------- the list and the player
  const rows = document.getElementById('rows');
  const play = document.getElementById('play');
  const nameEl = document.getElementById('play-name');
  const metaEl = document.getElementById('play-meta');
  const beatsEl = document.getElementById('play-beats');
  const runEl = document.getElementById('play-run');
  const labelsEl = document.getElementById('play-labels');
  const rowEls = [];
  PROJECTS.forEach((P, i) => {
    if (P.hidden_row) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = `${P.name}<span>${P.row}</span>`;
    b.addEventListener('click', () => open(i));
    b.addEventListener('pointerenter', () => { P.hover = 1; });
    b.addEventListener('pointerleave', () => { P.hover = 0; });
    rows.append(b);
    rowEls.push([P, b]);
  });

  // ---------------------------------------------------------------- the story at a moment
  const ease = (x) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
  const lerp = (a, b, k) => a + (b - a) * k;
  const rad = (d) => (d * Math.PI) / 180;
  const pick = (b, key, g) => (g === undefined ? b[key] || 0 : (b[key] || [])[g] || 0);

  // a value set beat by beat, each change easing in over w seconds from wherever the last one was
  function value(P, key, g, t, w) {
    let from = 0, to = 0, at = -1e9;
    for (const b of P.beats) {
      if (b.at > t) break;
      from = lerp(from, to, ease((b.at - at) / w));
      to = pick(b, key, g);
      at = b.at;
    }
    return lerp(from, to, ease((t - at) / w));
  }
  function poseAt(P, t) {
    const base = Object.assign({ at: [0, 0, 0] }, P.pose);
    let from = base, to = base, at = -1e9;
    const mix = (a, b, k) => ({ yaw: lerp(a.yaw, b.yaw, k), pitch: lerp(a.pitch, b.pitch, k), zoom: a.zoom * Math.pow(b.zoom / a.zoom, k),
                                at: [0, 1, 2].map((j) => lerp(a.at[j], b.at[j], k)) });
    for (const b of P.beats) {
      if (b.at > t) break;
      if (!b.pose) continue;
      from = mix(from, to, ease((b.at - at) / POSE_W));
      to = Object.assign({}, to, b.pose, { at: b.pose.at || to.at });
      at = b.at;
    }
    return mix(from, to, ease((t - at) / POSE_W));
  }
  function firstShown(P, key, g) {
    for (const b of P.beats) if (pick(b, key, g) > 0) return b.at;
    return 1e9;
  }
  const texts = (P) => P.beats.map((b) => b.text).filter((x, k, a) => !k || x !== a[k - 1]);

  // ---------------------------------------------------------------- data
  // the data comes gzipped; it is unpacked here, unless the server already did (no gzip mark left)
  const files = new Map();
  async function unpack(url) {
    const r = await fetch(url + '.gz');
    if (!r.ok) return null;
    const b = await r.arrayBuffer();
    const z = new Uint8Array(b, 0, 2);
    if (z[0] !== 0x1f || z[1] !== 0x8b) return b;
    return new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  }
  function fetchBin(url) {
    if (!files.has(url)) files.set(url, unpack(url).catch(() => null));
    return files.get(url);
  }
  function parse(pb, lb, fb, tb) {
    const d = {};
    if (pb) {
      const [n, flags] = new Int32Array(pb, 0, 2);
      const F = flags & 1 ? Float32Array : Int16Array, size = flags & 1 ? 4 : 2;
      let o = 8;
      d.pts = { n, float: !!(flags & 1), pos: new F(pb, o, n * 3) };
      o += n * 3 * size;
      if (flags & 2) { d.pts.target = new F(pb, o, n * 3); o += n * 3 * size; }
      d.pts.shade = new Uint8Array(pb, o, n); o += n;
      d.pts.group = new Uint8Array(pb, o, n);
    }
    if (lb) {
      const [m, flags] = new Int32Array(lb, 0, 2);
      const F = flags & 1 ? Float32Array : Int16Array, size = flags & 1 ? 4 : 2;
      d.lin = { m, float: !!(flags & 1), pos: new F(lb, 8, m * 6) };
      let o = 8 + m * 6 * size;
      d.lin.n1 = new Int8Array(lb, o, m * 8); o += m * 8;
      d.lin.n2 = new Int8Array(lb, o, m * 8); o += m * 8;
      if (flags & 4) d.lin.key = new Uint16Array(lb.slice(o, o + m * 4));
      // each end also needs the other end, for the silhouette test at the edge's middle
      const other = new F(m * 6);
      for (let e = 0; e < m; e++) for (let j = 0; j < 3; j++) { other[e * 6 + j] = d.lin.pos[e * 6 + 3 + j]; other[e * 6 + 3 + j] = d.lin.pos[e * 6 + j]; }
      d.lin.other = other;
    }
    if (fb) {
      const [T, N] = new Int32Array(fb, 0, 2);
      const offs = new Int32Array(fb, 8, T + 1);
      const xyz = new Float32Array(fb, 8 + (T + 1) * 4, N * 3);
      const cum = new Float32Array(N);   // length along each track up to each point
      const lens = [];
      for (let t = 0; t < T; t++) {
        let s = 0;
        for (let i = offs[t] + 1; i < offs[t + 1]; i++) {
          s += Math.hypot(xyz[i * 3] - xyz[i * 3 - 3], xyz[i * 3 + 1] - xyz[i * 3 - 2], xyz[i * 3 + 2] - xyz[i * 3 - 1]);
          cum[i] = s;
        }
        lens.push(s);
      }
      d.flo = { T, offs, xyz, cum, lens };
    }
    if (tb) {
      const [nv, ni, flags] = new Int32Array(tb, 0, 3);
      const F = flags & 1 ? Float32Array : Int16Array, size = flags & 1 ? 4 : 2;
      let o = 12;
      d.tri = { nv, ni, float: !!(flags & 1), pos: new F(tb, o, nv * 3) };
      o += nv * 3 * size;
      o += o % 4;
      d.tri.idx = new Uint32Array(tb, o, ni);
    }
    return d;
  }
  function load(P) {
    if (!P.data) {
      P.data = Promise.all([P.pts ? fetchBin(`pts/${P.id}.pts`) : null, P.lin ? fetchBin(`pts/${P.id}.lin`) : null,
                            P.flo ? fetchBin(`pts/${P.id}.flo`) : null, P.tri ? fetchBin(`pts/${P.id}.tri`) : null])
        .then(([pb, lb, fb, tb]) => { P.cpu = parse(pb, lb, fb, tb); return P.cpu; });
    }
    return P.data;
  }

  // ---------------------------------------------------------------- gl
  function context(canvas) {
    const opts = { antialias: true, alpha: true, premultipliedAlpha: false, depth: true, powerPreference: 'high-performance' };
    const g2 = canvas.getContext('webgl2', opts);
    if (g2) return { gl: g2, max: g2.MAX, uint: true };
    const g1 = canvas.getContext('webgl', opts);
    if (!g1) return null;
    const mm = g1.getExtension('EXT_blend_minmax');
    return { gl: g1, max: mm ? mm.MAX_EXT : 0, uint: !!g1.getExtension('OES_element_index_uint') };
  }
  const VS_PTS = `
    attribute vec3 aPos, aTarget;
    attribute float aShade, aGroup;
    uniform mat4 uMVP;
    uniform vec3 uSweep;
    uniform float uSize, uGain, uNear, uFar, uCondense;
    uniform vec4 uAlpha, uReveal;
    varying float vI;
    void main() {
      float g = aGroup;
      float a = g < 0.5 ? uAlpha.x : g < 1.5 ? uAlpha.y : g < 2.5 ? uAlpha.z : uAlpha.w;
      float r = g < 0.5 ? uReveal.x : g < 1.5 ? uReveal.y : g < 2.5 ? uReveal.z : uReveal.w;
      // each point leaves at its own moment, so the cloud streams onto the model
      float d = fract(sin(dot(aPos.xy, vec2(12.9898, 78.233)) + aPos.z * 37.719) * 43758.5453);
      float c = clamp(uCondense * 1.5 - d * 0.5, 0.0, 1.0);
      c = c * c * (3.0 - 2.0 * c);
      vec4 p = uMVP * vec4(mix(aPos, aTarget, c), 1.0);
      gl_Position = p;
      gl_PointSize = uSize;
      float age = r - (dot(aPos, uSweep) * 0.5 + 0.5);
      float seen = clamp(age * 8.0, 0.0, 1.0);
      float flash = 1.0 + 1.6 * clamp(1.0 - age * 6.0, 0.0, 1.0) * seen + 3.2 * c * (1.0 - c);
      float depth = clamp((p.w - uNear) / (uFar - uNear), 0.0, 1.0);
      vI = aShade * mix(1.0, 0.25, depth) * seen * flash * uGain * a;
    }`;
  const VS_LIN = `
    attribute vec3 aPos, aOther;
    attribute vec4 aN1, aN2;
    attribute float aKey;
    uniform mat4 uMVP;
    uniform vec3 uEye, uSweep;
    uniform vec4 uClip;
    uniform float uGain, uNear, uFar, uKeyed;
    uniform vec4 uAlpha, uReveal;
    varying float vI, vClip;
    void main() {
      vec4 p = uMVP * vec4(aPos, 1.0);
      gl_Position = p;
      vClip = dot(aPos, uClip.xyz) - uClip.w;
      float g = floor(aN2.w * 127.0 + 0.5);
      float a = g < 0.5 ? uAlpha.x : g < 1.5 ? uAlpha.y : g < 2.5 ? uAlpha.z : uAlpha.w;
      float r = g < 0.5 ? uReveal.x : g < 1.5 ? uReveal.y : g < 2.5 ? uReveal.z : uReveal.w;
      // a sharp edge always shows; a smooth one where its faces turn opposite ways seen from the eye,
      // tested at the edge's middle so both ends agree
      vec3 v = uEye - 0.5 * (aPos + aOther);
      float on = max(step(0.5, aN1.w), step(dot(aN1.xyz, v) * dot(aN2.xyz, v), 0.0));
      float key = uKeyed > 0.5 ? aKey : dot(aPos, uSweep) * 0.5 + 0.5;
      float age = r - key;
      float seen = clamp(age * 14.0, 0.0, 1.0);
      float flash = 1.0 + 1.8 * clamp(1.0 - age * 6.0, 0.0, 1.0) * seen;
      float depth = clamp((p.w - uNear) / (uFar - uNear), 0.0, 1.0);
      vI = on * a * seen * flash * mix(1.0, 0.32, depth) * uGain;
    }`;
  const FS_LIN = `
    precision mediump float;
    varying float vI, vClip;
    void main() { if (vClip > 0.0) discard; gl_FragColor = vec4(vec3(vI), 1.0); }`;
  const VS_TRI = `
    attribute vec3 aPos;
    uniform mat4 uMVP;
    uniform vec4 uClip;
    varying float vClip;
    void main() { gl_Position = uMVP * vec4(aPos, 1.0); vClip = dot(aPos, uClip.xyz) - uClip.w; }`;
  const FS_TRI = `
    precision mediump float;
    varying float vClip;
    void main() { if (vClip > 0.0) discard; gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }`;
  const VS_RUN = `
    attribute vec3 aPos;
    attribute float aI;
    uniform mat4 uMVP;
    uniform float uSize, uAlpha;
    varying float vI;
    void main() {
      gl_Position = uMVP * vec4(aPos, 1.0);
      gl_PointSize = uSize * (0.5 + 0.5 * aI);
      vI = aI * uAlpha;
    }`;
  const VS_MINI = `
    attribute vec3 aPos;
    uniform mat4 uMVP;
    void main() { gl_Position = uMVP * vec4(aPos, 1.0); }`;
  const FS_MINI = `
    precision mediump float;
    uniform float uI;
    void main() { gl_FragColor = vec4(vec3(uI), 1.0); }`;
  const FS = `
    precision mediump float;
    varying float vI;
    void main() { gl_FragColor = vec4(vec3(vI), 1.0); }`;

  function program(gl, vs, fs, names) {
    const p = gl.createProgram();
    for (const [type, code] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]) {
      const s = gl.createShader(type); gl.shaderSource(s, code); gl.compileShader(s); gl.attachShader(p, s);
    }
    gl.linkProgram(p);
    const u = {};
    for (const n of names) u[n] = gl.getUniformLocation(p, n);
    return { p, u };
  }
  function buffer(gl, arr, usage, target) {
    const b = gl.createBuffer();
    gl.bindBuffer(target || gl.ARRAY_BUFFER, b);
    gl.bufferData(target || gl.ARRAY_BUFFER, arr, usage || gl.STATIC_DRAW);
    return b;
  }
  function attrib(gl, p, name, buf, size, type, norm) {
    const l = gl.getAttribLocation(p, name);
    if (l < 0) return;
    if (!buf) { gl.disableVertexAttribArray(l); gl.vertexAttrib1f(l, 0); return; }
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(l);
    gl.vertexAttribPointer(l, size, type, norm, 0, 0);
  }

  // the stage: the player's canvas
  const canvas = document.getElementById('stage');
  let S = null;   // { gl, max, uint, prog }
  function init() {
    const c = context(canvas);
    if (!c) return false;
    const gl = c.gl;
    c.prog = {
      pts: program(gl, VS_PTS, FS, ['uMVP', 'uSweep', 'uSize', 'uGain', 'uNear', 'uFar', 'uCondense', 'uAlpha', 'uReveal']),
      lin: program(gl, VS_LIN, FS_LIN, ['uMVP', 'uEye', 'uSweep', 'uClip', 'uGain', 'uNear', 'uFar', 'uKeyed', 'uAlpha', 'uReveal']),
      tri: program(gl, VS_TRI, FS_TRI, ['uMVP', 'uClip']),
      run: program(gl, VS_RUN, FS, ['uMVP', 'uSize', 'uAlpha']),
    };
    S = c;
    return true;
  }
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); S = null; for (const P of PROJECTS) P.gpu = null; });
  canvas.addEventListener('webglcontextrestored', () => { init(); kick(); });

  // the project on the gpu; at most three are kept there, the least recently shown goes first
  function gpu(P) {
    if (P.gpu) return P.gpu;
    const gl = S.gl, d = P.cpu, g = {};
    if (d.pts) {
      g.pp = buffer(gl, d.pts.pos); g.pt = buffer(gl, d.pts.target || d.pts.pos);
      g.ps = buffer(gl, d.pts.shade); g.pg = buffer(gl, d.pts.group);
    }
    if (d.lin) {
      g.lp = buffer(gl, d.lin.pos); g.lo = buffer(gl, d.lin.other); g.l1 = buffer(gl, d.lin.n1); g.l2 = buffer(gl, d.lin.n2);
      if (d.lin.key) g.lk = buffer(gl, d.lin.key);
    }
    if (d.tri && S.uint) {
      g.tp = buffer(gl, d.tri.pos);
      g.ti = buffer(gl, d.tri.idx, gl.STATIC_DRAW, gl.ELEMENT_ARRAY_BUFFER);
    }
    if (d.flo) {
      const k = Math.min(2400, d.flo.T * 8);
      const total = d.flo.lens.reduce((a, b) => a + b, 0);
      g.runs = Array.from({ length: k }, () => {   // a track chosen in proportion to its length
        let r = Math.random() * total, t = 0;
        while (t < d.flo.T - 1 && r > d.flo.lens[t]) { r -= d.flo.lens[t]; t++; }
        return { t, s: Math.random() * d.flo.lens[t], v: 0.6 + Math.random() * 0.8 };
      });
      g.runPos = new Float32Array(k * 3 * TRAIL);
      g.runI = new Float32Array(k * TRAIL);
      g.rp = buffer(gl, g.runPos, gl.DYNAMIC_DRAW); g.ri = buffer(gl, g.runI, gl.DYNAMIC_DRAW);
    }
    P.gpu = g;
    const kept = PROJECTS.filter((x) => x.gpu).sort((a, b) => (b.used || 0) - (a.used || 0));
    for (const x of kept.slice(3)) {
      for (const k in x.gpu) if (x.gpu[k] instanceof WebGLBuffer) gl.deleteBuffer(x.gpu[k]);
      x.gpu = null;
    }
    return g;
  }

  // the place on a track at length s
  function along(f, t, s, out, o) {
    let lo = f.offs[t], hi = f.offs[t + 1] - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (f.cum[m] <= s) lo = m; else hi = m; }
    const seg = f.cum[hi] - f.cum[lo] || 1, k = Math.min(1, Math.max(0, (s - f.cum[lo]) / seg));
    for (let j = 0; j < 3; j++) out[o + j] = f.xyz[lo * 3 + j] + (f.xyz[hi * 3 + j] - f.xyz[lo * 3 + j]) * k;
  }

  // ---------------------------------------------------------------- matrices
  function perspective(fov, aspect, near, far) {
    const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
    return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
  }
  function ortho(hh, aspect, near, far) {
    return [1 / (hh * aspect), 0, 0, 0, 0, 1 / hh, 0, 0, 0, 0, -2 / (far - near), 0, 0, 0, -(far + near) / (far - near), 1];
  }
  function mul(a, b) {
    const o = new Array(16).fill(0);
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
    return o;
  }
  // a camera: yaw/pitch about the point looked at, at distance D; returns mvp and the eye in model space
  function camera(cam, aspect, lift, isOrtho, extraYaw, extraPitch) {
    const yaw = rad(cam.yaw) + (extraYaw || 0), pitch = rad(cam.pitch) + (extraPitch || 0);
    const D = (3.1 / cam.zoom) * Math.max(1, Math.pow(1.6 / aspect, 0.7));
    const c = Math.cos(yaw), s = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const move = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -cam.at[0], -cam.at[1], -cam.at[2], 1];
    const rot = [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    const look = [1, 0, 0, 0, 0, sp, -cp, 0, 0, cp, sp, 0, 0, 0, -D, 1];
    const shift = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, lift, 0, 1];
    const proj = isOrtho ? ortho(D * Math.tan(0.31), aspect, D * 0.01, D * 60 + 4) : perspective(0.62, aspect, D * 0.01, D * 60 + 4);
    const dir = [-s * cp, -c * cp, sp];   // towards the viewer, in model space
    return { mvp: new Float32Array(mul(shift, mul(proj, mul(look, mul(rot, move))))), D,
             eye: [cam.at[0] + dir[0] * D, cam.at[1] + dir[1] * D, cam.at[2] + dir[2] * D] };
  }

  // ---------------------------------------------------------------- one project, one frame
  let w = 0, h = 0, dpr = 1, mx = 0, my = 0, tx = 0, ty = 0, clock = 0, dtStep = 0;
  function draw(P, alpha, t) {
    const gl = S.gl, d = P.cpu, g = gpu(P);
    P.used = clock;
    const drift = STILL ? 0 : 0.035 * Math.sin(clock * 0.21);
    const aspect = w / h;
    const cam = camera(poseAt(P, t), aspect, aspect < 1 ? 0.24 : 0.1, P.ortho, drift + mx * 0.09, my * 0.05);
    const { mvp, D } = cam;
    const sweep = P.sweep || [1, 0, 0];
    const R = Math.max(D * 0.85, 0.02), near = D - R, far = D + R * 1.6;
    const drawSec = (gr) => (P.draw && P.draw[gr]) || DRAW;
    const shown = (key, gr) => (STILL ? 9 : (t - firstShown(P, key, gr)) / drawSec(gr) * 1.15);
    const sec = P.section;
    const clip = sec ? sec.n.concat([lerp(sec.from, sec.to, value(P, 'cut', undefined, t, 2.4))]) : [0, 0, 0, 1];

    gl.disable(gl.DEPTH_TEST);
    if (d.tri && g.ti && P.hidden) {   // the faces into the depth buffer only, so lines behind them hide
      const p = S.prog.tri;
      gl.useProgram(p.p);
      gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LESS); gl.depthMask(true);
      gl.colorMask(false, false, false, false);
      gl.enable(gl.POLYGON_OFFSET_FILL); gl.polygonOffset(3.0, 8.0);
      attrib(gl, p.p, 'aPos', g.tp, 3, d.tri.float ? gl.FLOAT : gl.SHORT, !d.tri.float);
      gl.uniformMatrix4fv(p.u.uMVP, false, mvp);
      gl.uniform4fv(p.u.uClip, clip);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g.ti);
      gl.drawElements(gl.TRIANGLES, d.tri.ni, gl.UNSIGNED_INT, 0);
      gl.disable(gl.POLYGON_OFFSET_FILL);
      gl.colorMask(true, true, true, true);
      gl.depthMask(false); gl.depthFunc(gl.LEQUAL);
    }
    if (d.lin) {
      const a = [0, 1, 2, 3].map((gr) => value(P, 'lin', gr, t, FADE_W) * alpha);
      if (Math.max(...a) > 0.002) {
        const p = S.prog.lin;
        gl.useProgram(p.p);
        if (S.max) { gl.blendEquation(S.max); gl.blendFunc(gl.ONE, gl.ONE); } else { gl.blendEquation(gl.FUNC_ADD); gl.blendFunc(gl.ONE, gl.ONE); }
        const type = d.lin.float ? gl.FLOAT : gl.SHORT;
        attrib(gl, p.p, 'aPos', g.lp, 3, type, !d.lin.float);
        attrib(gl, p.p, 'aOther', g.lo, 3, type, !d.lin.float);
        attrib(gl, p.p, 'aN1', g.l1, 4, gl.BYTE, true);
        attrib(gl, p.p, 'aN2', g.l2, 4, gl.BYTE, true);
        attrib(gl, p.p, 'aKey', g.lk || null, 1, gl.UNSIGNED_SHORT, true);
        gl.uniformMatrix4fv(p.u.uMVP, false, mvp);
        gl.uniform3fv(p.u.uEye, cam.eye);
        gl.uniform3fv(p.u.uSweep, sweep);
        gl.uniform4fv(p.u.uClip, clip);
        gl.uniform1f(p.u.uKeyed, g.lk ? 1 : 0);
        gl.uniform1f(p.u.uGain, ((P.gain && P.gain.lin) || 1) * (S.max ? 1 : 0.6));
        gl.uniform1f(p.u.uNear, near); gl.uniform1f(p.u.uFar, far);
        gl.uniform4fv(p.u.uAlpha, a);
        gl.uniform4fv(p.u.uReveal, [0, 1, 2, 3].map((gr) => shown('lin', gr)));
        gl.drawArrays(gl.LINES, 0, d.lin.m * 2);
      }
    }
    gl.disable(gl.DEPTH_TEST);
    gl.blendEquation(gl.FUNC_ADD); gl.blendFunc(gl.ONE, gl.ONE);
    if (d.pts) {
      const a = [0, 1, 2, 3].map((gr) => value(P, 'pts', gr, t, FADE_W) * alpha);
      if (Math.max(...a) > 0.002) {
        const p = S.prog.pts;
        gl.useProgram(p.p);
        const type = d.pts.float ? gl.FLOAT : gl.SHORT;
        attrib(gl, p.p, 'aPos', g.pp, 3, type, !d.pts.float);
        attrib(gl, p.p, 'aTarget', g.pt, 3, type, !d.pts.float);
        attrib(gl, p.p, 'aShade', g.ps, 1, gl.UNSIGNED_BYTE, true);
        attrib(gl, p.p, 'aGroup', g.pg, 1, gl.UNSIGNED_BYTE, false);
        gl.uniformMatrix4fv(p.u.uMVP, false, mvp);
        gl.uniform3fv(p.u.uSweep, sweep);
        gl.uniform1f(p.u.uSize, Math.max(1, 1.25 * dpr));
        gl.uniform1f(p.u.uGain, ((P.gain && P.gain.pts) || 1) * Math.min(1, (0.16 * w * h) / (d.pts.n * dpr * dpr)));
        gl.uniform1f(p.u.uNear, near); gl.uniform1f(p.u.uFar, far);
        gl.uniform1f(p.u.uCondense, value(P, 'condense', undefined, t, P.condenseW || 3.2));
        gl.uniform4fv(p.u.uAlpha, a);
        gl.uniform4fv(p.u.uReveal, [0, 1, 2, 3].map((gr) => shown('pts', gr)));
        gl.drawArrays(gl.POINTS, 0, d.pts.n);
      }
    }
    const fl = value(P, 'flow', undefined, t, FADE_W) * alpha;
    if (d.flo && g.runs && fl > 0.002 && !STILL) {
      const f = d.flo, speed = P.flowSpeed || 0.02, gap = speed * 0.035;
      g.runs.forEach((r, k) => {
        r.s = (r.s + r.v * speed * dtStep) % f.lens[r.t];
        for (let j = 0; j < TRAIL; j++) {
          along(f, r.t, Math.max(0, r.s - j * gap), g.runPos, (k * TRAIL + j) * 3);
          g.runI[k * TRAIL + j] = Math.pow(1 - j / TRAIL, 1.6);
        }
      });
      const p = S.prog.run;
      gl.useProgram(p.p);
      gl.bindBuffer(gl.ARRAY_BUFFER, g.rp); gl.bufferSubData(gl.ARRAY_BUFFER, 0, g.runPos);
      gl.bindBuffer(gl.ARRAY_BUFFER, g.ri); gl.bufferSubData(gl.ARRAY_BUFFER, 0, g.runI);
      attrib(gl, p.p, 'aPos', g.rp, 3, gl.FLOAT, false);
      attrib(gl, p.p, 'aI', g.ri, 1, gl.FLOAT, false);
      gl.uniformMatrix4fv(p.u.uMVP, false, mvp);
      gl.uniform1f(p.u.uSize, 3.4 * dpr);
      gl.uniform1f(p.u.uAlpha, fl);
      gl.drawArrays(gl.POINTS, 0, g.runs.length * TRAIL);
    }
    labels(P, mvp, t, alpha);
  }

  // dimension labels: text placed on the screen where a model point lands
  function labels(P, mvp, t, alpha) {
    if (!P.dims) { labelsEl.textContent = ''; return; }
    if (labelsEl.dataset.p !== P.slug) {
      labelsEl.dataset.p = P.slug;
      labelsEl.innerHTML = P.dims.map((x) => `<span>${x[1]}</span>`).join('');
    }
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    [...labelsEl.children].forEach((el, k) => {
      const [xyz, , group, at] = P.dims[k];
      const v = [0, 1, 2, 3].map((r) => mvp[r] * xyz[0] + mvp[4 + r] * xyz[1] + mvp[8 + r] * xyz[2] + mvp[12 + r]);
      const show = value(P, 'lin', group, t, FADE_W) * alpha * ease((t - (at || 0)) / 0.8);
      el.style.opacity = show.toFixed(3);
      el.style.transform = `translate(${((v[0] / v[3]) * 0.5 + 0.5) * cw}px, ${(0.5 - (v[1] / v[3]) * 0.5) * ch}px)`;
    });
  }

  // ---------------------------------------------------------------- playing
  let cur = -1, tau = 0, out = -1, then = -1, raf = 0, last = 0, ready = false;
  function caption(P) {
    nameEl.textContent = P.name;
    const start = (n) => (STILL || HOLD ? fmt(n) : '0');   // counted up once the project is on screen
    metaEl.innerHTML = P.meta.map((m) => (Array.isArray(m) ? `<span data-n="${m[0]}">${start(m[0])}</span> ${m[1]}` : m)).join(' · ');
    beatsEl.innerHTML = texts(P).map((x) => `<li>${x}</li>`).join('');
    runEl.style.transform = 'scaleX(0)';
    labelsEl.textContent = ''; labelsEl.dataset.p = '';
  }
  function countUp() {
    const nums = [...metaEl.querySelectorAll('[data-n]')];
    const t0 = performance.now();
    const step = (now) => {
      const k = ease((now - t0) / 1400);
      for (const el of nums) el.textContent = fmt(Math.round(+el.dataset.n * k));
      if (k < 1 && play.open) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function show(i) {
    cur = i;
    const P = PROJECTS[i];
    tau = HOLD ? (AT >= 0 ? AT : 0) : STILL ? P.beats[P.beats.length - 1].at + 3 : 0;
    ready = false;
    caption(P);
    load(P).then(() => {
      if (cur !== i) return;
      ready = true;
      if (!STILL && !HOLD) countUp();
      kick();
    });
    load(PROJECTS[(i + 1) % PROJECTS.length]);   // the next one, ahead of time
  }
  function open(i) {
    if (!S && !init()) return;
    if (!play.open) play.showModal();
    show(i);
    kick();
  }
  function step(d) {
    const n = PROJECTS.filter((x) => !x.hidden_row).length;
    if (play.open && out < 0 && n) { out = 0; then = (cur + d + n) % n; kick(); }
  }

  function frame(now) {
    raf = 0;
    if (!play.open || !S) return;
    const gl = S.gl;
    dtStep = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    clock += dtStep;
    mx += (tx - mx) * Math.min(1, dtStep * 3); my += (ty - my) * Math.min(1, dtStep * 3);
    const P = PROJECTS[cur];
    if (ready && !HOLD && !STILL) tau = Math.min(tau + dtStep, P.length + 600);
    let alpha = Math.min(1, ease(tau / 0.6) + (HOLD || STILL ? 1 : 0));
    if (out >= 0) {
      out += dtStep;
      alpha *= 1 - ease(out / SWAP);
      if (out >= SWAP) { out = -1; show(then); }
    }
    dpr = Math.min(devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    if (cw * ch * dpr * dpr > 4.2e6) dpr = Math.sqrt(4.2e6 / (cw * ch));
    const W = Math.round(cw * dpr), H = Math.round(ch * dpr);
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
    w = W; h = H;
    gl.viewport(0, 0, W, H);
    gl.clearColor(0, 0, 0, 1); gl.clearDepth(1);
    gl.depthMask(true);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.BLEND);
    if (ready && P.cpu) draw(P, alpha, tau);
    // the words: the current beat and how far the story has come
    const list = texts(P), now_ = P.beats.filter((b) => b.at <= tau).pop() || P.beats[0];
    const k = STILL ? -1 : list.indexOf(now_.text);
    [...beatsEl.children].forEach((li, j) => li.classList.toggle('on', j === k));
    runEl.style.transform = `scaleX(${Math.min(1, tau / P.length).toFixed(4)})`;
    raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }

  // tap to close, arrows or a swipe for the next project
  let touch = null;
  play.addEventListener('click', () => { if (!touch || !touch.moved) play.close(); });
  play.addEventListener('close', () => { cancelAnimationFrame(raf); raf = 0; cur = -1; labelsEl.textContent = ''; });
  play.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
  });
  play.addEventListener('touchstart', (e) => { touch = { x: e.touches[0].clientX, y: e.touches[0].clientY, moved: false }; }, { passive: true });
  play.addEventListener('touchend', (e) => {
    if (!touch) return;
    const dx = e.changedTouches[0].clientX - touch.x, dy = e.changedTouches[0].clientY - touch.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) { touch.moved = true; step(dx < 0 ? 1 : -1); }
    setTimeout(() => { touch = null; }, 0);
  });
  addEventListener('pointermove', (e) => { tx = (e.clientX / innerWidth - 0.5) * 2; ty = (e.clientY / innerHeight - 0.5) * 2; }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && play.open) kick(); });

  // ---------------------------------------------------------------- the miniatures in the list
  // One small canvas over the list draws every project's miniature at the start of its line, slowly
  // turning; the line under the pointer turns a little faster and brighter.
  const mini = document.createElement('canvas');
  mini.setAttribute('aria-hidden', 'true');
  rows.prepend(mini);
  let MG = null, mraf = 0, mlast = 0, mclock = 0, inView = false;
  const minis = new Map();
  function miniInit() {
    const c = context(mini);
    if (!c) return false;
    c.prog = program(c.gl, VS_MINI, FS_MINI, ['uMVP', 'uI']);
    MG = c;
    for (const [P] of rowEls) {
      fetchBin(`pts/${P.id}.mini`).then((b) => {
        if (!b || !MG) return;
        const m = new Int32Array(b, 0, 1)[0];
        minis.set(P, { m, buf: buffer(MG.gl, new Int16Array(b, 4, m * 6)) });
        mkick();
      });
    }
    return true;
  }
  mini.addEventListener('webglcontextlost', (e) => { e.preventDefault(); MG = null; minis.clear(); });
  mini.addEventListener('webglcontextrestored', () => { miniInit(); });
  function miniFrame(now) {
    mraf = 0;
    if (!MG || !inView || play.open) return;
    const gl = MG.gl, p = MG.prog;
    const dt = mlast ? Math.min(0.05, (now - mlast) / 1000) : 0;
    mlast = now; mclock += dt;
    const r = Math.min(devicePixelRatio || 1, 2);
    const W = Math.round(mini.clientWidth * r), H = Math.round(mini.clientHeight * r);
    if (mini.width !== W || mini.height !== H) { mini.width = W; mini.height = H; }
    gl.viewport(0, 0, W, H);
    gl.disable(gl.SCISSOR_TEST);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.SCISSOR_TEST);
    gl.enable(gl.BLEND);
    if (MG.max) gl.blendEquation(MG.max);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.useProgram(p.p);
    const top = mini.getBoundingClientRect().top;
    rowEls.forEach(([P, b], i) => {
      const d = minis.get(P);
      if (!d) return;
      const rb = b.getBoundingClientRect();
      const bw = 34 * r, bh = 20 * r, x = 0, y = H - ((rb.top - top) + (rb.height + 20) / 2) * r;
      gl.viewport(x, y, bw, bh); gl.scissor(x, y, bw, bh);
      P.spin = (P.spin === undefined ? i * 40 : P.spin) + dt * (P.hover ? 60 : 16);   // degrees
      P.glow = (P.glow || 0) + ((P.hover ? 1 : 0) - (P.glow || 0)) * Math.min(1, dt * 6);
      const cam = camera({ yaw: P.spin, pitch: 26, zoom: 1.05, at: [0, 0, 0] }, bw / bh, 0, true);
      gl.uniformMatrix4fv(p.u.uMVP, false, cam.mvp);
      gl.uniform1f(p.u.uI, 0.42 + 0.58 * P.glow);
      attrib(gl, p.p, 'aPos', d.buf, 3, gl.SHORT, true);
      gl.drawArrays(gl.LINES, 0, d.m * 2);
    });
    gl.disable(gl.SCISSOR_TEST);
    mraf = requestAnimationFrame(miniFrame);
  }
  function mkick() { if (!mraf && MG && inView) { mlast = 0; mraf = requestAnimationFrame(miniFrame); } }
  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (inView && !MG && !STILL) miniInit();
    mkick();
  }).observe(rows);
  play.addEventListener('close', mkick);

  // ?p=roerbro&t=12 opens that project held at that moment
  if (HOLD) {
    const i = PROJECTS.findIndex((x) => x.slug === HOLD || x.id === HOLD);
    if (i >= 0) open(i);
  }
})();
