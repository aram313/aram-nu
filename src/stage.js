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
      slug: 'roerbro', id: 'bro', name: 'rørbro', pts: true, lin: true, tri: true, hidden: true, hot: true, length: 35.5,
      row: 'laserscanning · 130 mio. punkter',
      meta: ['laserscanning', [16, 'opstillinger'], [130246832, 'punkter'], '94 % inden for 2 mm'],
      gain: { pts: 0.5, lin: 0.85 }, ptsDraw: 4, draw: [3.6, 3.6, 1, 1], half: 8.221,
      // where the 16 scanners stood, in the order they scanned
      stations: [[0.0525, 1.1970, -0.2408], [0.2967, 0.0797, -0.2538], [0.2347, -0.9288, -0.2567], [1.0869, -0.2855, -0.2348],
        [0.6847, -0.2562, -0.2324], [0.6970, 0.3465, -0.2348], [1.0987, 0.4160, -0.2308], [0.9152, 0.0088, -0.2412],
        [-0.6262, -0.3770, -0.2414], [-1.1100, -0.2786, -0.2413], [-0.9428, -0.0063, -0.2224], [-0.6049, 0.4091, -0.2399],
        [-1.1293, 0.2907, -0.2092], [-0.5280, -0.7282, -0.2416], [0.1766, -0.3771, -0.2534], [0.7028, 0.7200, -0.2248]],
      pose: { yaw: -30, pitch: 24, zoom: 0.92 },
      beats: [
        { at: 0, text: 'en skadet rørbro i stål, scannet fra 16 opstillinger.', pts: [1, 1] },
        { at: 4.8, text: 'punkterne trækkes ind på stålet, og 94 % ligger inden for 2 mm.', pts: [1, 0.3], condense: 1,
          pose: { yaw: -14, pitch: 16, zoom: 1.3 } },
        { at: 9.6, text: 'hvert profil og hver plade tegnet op i 3d, 156 dele.', pts: [0.2, 0.08], condense: 1, lin: [1, 1, 0, 0],
          pose: { yaw: 22, pitch: 20, zoom: 1.4 } },
        { at: 14.4, text: 'boltgrupperne målt ind, så det nye stål passer på de gamle bolte.', pts: [0.08, 0.03], condense: 1, lin: [1, 1, 1, 0],
          pose: { yaw: 35, pitch: 42, zoom: 24, at: [-0.8202, -0.1808, 0.1839] } },
        { at: 19.2, text: 'og skaden målt: undergurten er presset 227 mm ud af sin linje.', pts: [0.04, 0.02], condense: 1,
          lin: [0.1, 0.45, 0, 1], pose: { yaw: -12, pitch: 14, zoom: 4.6, at: [0.0387, -0.1683, 0.2047], w: 3.2 } },
        { at: 21.6, text: 'og skaden målt: undergurten er presset 227 mm ud af sin linje.', pts: [0.04, 0.02], condense: 1, lin: [0.1, 0.45, 0, 1], hot: 1 },
        { at: 23.2, text: 'og skaden målt: undergurten er presset 227 mm ud af sin linje.', pts: [0.04, 0.02], condense: 1,
          lin: [0.1, 0.45, 0, 1], hot: 1, pose: { yaw: 168, pitch: 14, zoom: 4.6, at: [0.0387, -0.1683, 0.2047], w: 7.5 } },
        { at: 30.8, text: 'og skaden målt: undergurten er presset 227 mm ud af sin linje.', pts: [0.04, 0.02], condense: 1,
          lin: [0.7, 0.8, 0, 0], hot: 1, pose: { yaw: 198, pitch: 22, zoom: 1.25, at: [0, 0, 0], w: 3.6 } },
      ],
      // [where, text, group, when]: the bearing's hole pattern (mm, from the delivered bolt table), then the damage
      dims: [[[-0.8298, -0.2021, 0.1877], '60', 2, 15.2], [[-0.8146, -0.2021, 0.1877], '189', 2, 15.5], [[-0.7897, -0.1809, 0.1877], '161', 2, 15.8],
        [[0.0387, -0.1683, 0.2362], '227 mm', 3, 22], [[0.0507, -0.1284, 0.2048], '140 mm', 3, 22.4]],
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
      slug: 'kabeltrace', id: 'kabel', name: 'kabeltracé', flo: true, tube: true, length: 23,
      row: 'as-built · 178 km kabler',
      meta: ['as-built', [3, 'datacentergrunde'], [178, 'km kabler'], [66715, 'elementer']],
      gain: { tube: 0.92 }, flowSpeed: 0.0105, runs: 500, rideW: 7.6, miniPitch: 64, start: { cut: 1 }, half: 625,
      // where the section and the camera ride: the middle of one bundle of cables, every 5 m
      route: [[-0.33403, -0.15136, 0.0031], [-0.33145, -0.15634, 0.00309], [-0.32777, -0.16335, 0.00309], [-0.32402, -0.17042, 0.00309],
        [-0.32025, -0.17748, 0.00312], [-0.31646, -0.18452, 0.00315], [-0.31266, -0.19154, 0.00316], [-0.30884, -0.19858, 0.00315],
        [-0.30496, -0.20561, 0.00312], [-0.3011, -0.21259, 0.00305], [-0.29729, -0.21956, 0.00294], [-0.29354, -0.22659, 0.0028],
        [-0.28982, -0.2337, 0.00271], [-0.28568, -0.24073, 0.00265], [-0.28001, -0.24642, 0.00252], [-0.27276, -0.24991, 0.00228],
        [-0.26469, -0.25172, 0.00192], [-0.25629, -0.25279, 0.00153], [-0.24775, -0.25255, 0.00113], [-0.23962, -0.25056, 0.00083],
        [-0.23203, -0.24744, 0.00063], [-0.22468, -0.24386, 0.00048], [-0.21748, -0.24009, 0.00033], [-0.21046, -0.23638, 0.0002],
        [-0.20294, -0.23253, 0.00009]],
      pose: { follow: true, yaw: 6, pitch: 15, zoom: 320 },
      beats: [
        { at: 0, text: 'et kabeltracé i snit.', tube: 1, cut: 1 },
        { at: 2.6, text: 'hvert rør i sin rigtige diameter.', tube: 1, cut: 1, sizes: 1 },
        { at: 6.2, text: 'som de ligger i jorden, meter for meter.', tube: 1, cut: 1, ride: 1,
          pose: { follow: true, yaw: 14, pitch: 21, zoom: 270, w: 3.5 } },
        { at: 14, text: 'kilometer efter kilometer.', tube: 1, ride: 1, flow: 1,
          pose: { yaw: -16, pitch: 8, zoom: 30, at: [-0.268, -0.252, 0.0025], w: 4.5 } },
        { at: 18.5, text: '178 km kabler på tre datacentergrunde.', tube: 1, ride: 1, flow: 0.8,
          pose: { yaw: -22, pitch: 11, zoom: 24, at: [-0.29, -0.2, 0.003], w: 6 } },
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
      slug: 'georadar', id: 'gade', name: 'georadar', lin: true, tri: true, hidden: true, flo: true, tube: true, length: 21,
      row: 'georadar · 672 rør og kabler',
      meta: ['georadar', [672, 'rør og kabler'], '150 m gade'],
      gain: { lin: 0.9, tube: 0.95 }, rideW: 9, ringR: 0.16, half: 58.27,
      // the radar's way down the middle of the street at ground level; its band spans the street
      route: [[0.0474, -1.0159, -0.099], [0.0474, 0.5286, -0.099]],
      scan: { group: 0, width: [-0.1288, 0.1288], depth: 0.0687 },
      pose: { yaw: 8, pitch: 34, zoom: 2.6, at: [0.047, -0.55, -0.1] },
      beats: [
        { at: 0, text: 'en gade mellem to bygninger.', lin: [0, 0.4, 0.25] },
        { at: 2.6, text: 'georadaren kører gaden igennem.', lin: [1, 0.3, 0.2], tube: 1, cut: 1, ride: 1,
          pose: { follow: true, yaw: 0, pitch: 38, zoom: 6.5, w: 3 } },
        { at: 6.8, text: 'det, der ligger under asfalten, dukker op.', lin: [1, 0.3, 0.2], tube: 1, cut: 1, ride: 1 },
        { at: 12, text: 'rør, kabler og brønde, ført ind i revit.', lin: [1, 0.3, 0.18], tube: 1, ride: 1,
          pose: { yaw: 30, pitch: 48, zoom: 2.0, at: [0.05, -0.25, -0.13], w: 4 } },
        { at: 16.5, text: 'så de kan ses, før nogen graver.', lin: [1, 0.3, 0.18], tube: 1, ride: 1,
          pose: { yaw: 52, pitch: 30, zoom: 4.2, at: [0.05, -0.55, -0.14], w: 4 } },
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
      slug: 'vaerktoej', id: 'vaerktoej', name: 'værktøj', lin: true, tri: true, hidden: true, ortho: true, length: 24, draw: [6],
      row: 'fusion · 3d print',
      meta: ['tegnet i fusion', '3d-printet', [12, 'af dem her']],
      gain: { lin: 1 },
      // [name, box in the page's coordinates, width / depth / height in mm, where it is tallest]
      parts: [
        ['gps-fod med spids, 330 mm', [-1.0000, 0.4594, -0.0728, -0.4665, 0.5079, 0.0663], ['330', '30', '86'], [-0.9724, 0.4835]],
        ['armeringsholder', [-0.3856, 0.2815, -0.0728, 0.0186, 0.6857, 0.0728], ['250', '250', '90'], [-0.1835, 0.4836]],
        ['laptopbeslag', [0.2935, 0.2736, -0.0728, 0.4390, 0.6937, -0.0002], ['90', '259,9', '44,9'], [0.3684, 0.6880]],
        ['tabletholder til georadar', [0.8351, 0.3155, -0.0728, 0.9968, 0.6518, 0.0178], ['100', '208', '56'], [0.8663, 0.5073]],
        ['gps-wrap', [-0.8642, -0.1970, -0.0728, -0.6023, 0.0649, 0.0375], ['162', '162', '68,2'], [-0.7335, -0.0664]],
        ['centrering til rør ø160', [-0.3194, -0.2020, -0.0728, -0.0476, 0.0698, -0.0243], ['168,1', '168,1', '30'], [-0.1836, -0.0661]],
        ['rund gps-fod ø100', [0.2854, -0.1469, -0.0728, 0.4470, 0.0148, 0.0663], ['100', '100', '86'], [0.3663, -0.0663]],
        ['monitordæksel', [0.8319, -0.1501, -0.0728, 1.0000, 0.0180, -0.0113], ['104', '104', '38'], [0.9148, -0.0673]],
        ['vaterpasfod', [-0.8076, -0.6937, -0.0728, -0.6589, -0.5379, 0.0307], ['91,9', '96,4', '64'], [-0.7333, -0.6016]],
        ['prismekegle', [-0.2330, -0.6653, -0.0728, -0.1340, -0.5663, 0.0517], ['61,2', '61,2', '77'], [-0.1835, -0.6158]],
        ['prismeholder til pæl', [0.3177, -0.6643, -0.0728, 0.4147, -0.5673, 0.0053], ['60', '60', '48,3'], [0.3662, -0.6158]],
        ['kugleprismeholder', [0.8933, -0.6384, -0.0728, 0.9386, -0.5932, 0.0396], ['28', '28', '69,5'], [0.9159, -0.6158]],
      ],
      pose: { yaw: 35, pitch: 40, zoom: 0.88, at: [0.02, -0.21, 0] },
      beats: [
        { at: 0, text: 'værktøj til landmålerne, tegnet i fusion.', lin: [1], names: 1 },
        { at: 5.5, text: 'hver del målsat i millimeter.', lin: [1], focus: 0,
          pose: { yaw: 24, pitch: 30, zoom: 1.75, at: [-0.733, 0.484, -0.003] } },
        { at: 9.2, text: 'hver del målsat i millimeter.', lin: [1], focus: 3,
          pose: { yaw: 40, pitch: 34, zoom: 2.6, at: [0.916, 0.484, -0.027] } },
        { at: 12.9, text: 'hver del målsat i millimeter.', lin: [1], focus: 7,
          pose: { yaw: 32, pitch: 40, zoom: 4.4, at: [0.916, -0.066, -0.042] } },
        { at: 16.6, text: 'hver del målsat i millimeter.', lin: [1], focus: 11,
          pose: { yaw: 26, pitch: 22, zoom: 6.5, at: [0.916, -0.616, -0.017] } },
        { at: 20.3, text: 'printet og samlet i et katalog, kollegerne bestiller fra.', lin: [1], names: 1,
          pose: { yaw: 40, pitch: 44, zoom: 0.88, at: [0.02, -0.21, 0] } },
      ],
    },
  ];

  const DRAW = 2.4;        // seconds for a layer to be drawn in, unless the project says otherwise
  const FADE_W = 1.4;      // seconds for a layer to fade to its new strength
  const POSE_W = 2.6;      // seconds for the camera to settle on a new beat
  const SWAP = 0.45;       // seconds to fade out when going to the next project
  const TRAIL = 7;         // points in the tail of each light running along a cable
  const RINGS = 64;        // at most this many cables cut by a moving section
  const RING_N = 48;       // segments in each ring
  const BAND = 64;         // line segments in a georadar's band and curtain
  const DIMS = 256;        // line segments in the measures on a sheet of parts
  const SCAN_N = 20;       // segments in the ring that marks a scanner

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
  // a beat sets a value, one per group (an array), or names the one group it is about (a number)
  const pick = (b, key, g) => (g === undefined ? b[key] || 0 : typeof b[key] === 'number' ? +(b[key] === g) : (b[key] || [])[g] || 0);

  // a value set beat by beat, each change easing in over w seconds from wherever the last one was
  // (from 0, or from the project's start value: a section already there when the story opens)
  function value(P, key, g, t, w) {
    let from = g === undefined && P.start ? P.start[key] || 0 : 0, to = from, at = -1e9;
    for (const b of P.beats) {
      if (b.at > t) break;
      from = lerp(from, to, ease((b.at - at) / w));
      to = pick(b, key, g);
      at = b.at;
    }
    return lerp(from, to, ease((t - at) / w));
  }
  // the camera at time t. A pose with follow rides along the project's route: it looks at the place
  // the ride has reached, its yaw turned from the route's heading there.
  function poseAt(P, t) {
    const base = Object.assign({ at: [0, 0, 0] }, P.pose);
    const where = (p, k) => {
      if (!p.follow) return p;
      const s = value(P, 'ride', undefined, k, P.rideW || 8);
      const a = routeAt(P, s - 0.1).pos, b = routeAt(P, s + 0.1).pos;
      return Object.assign({}, p, { at: routeAt(P, s).pos, yaw: p.yaw + (Math.atan2(b[0] - a[0], b[1] - a[1]) * 180) / Math.PI });
    };
    // over a big change of zoom the point looked at moves with the zoom, so the picture never races sideways
    const mix = (a, b, k) => {
      const r = b.zoom / a.zoom;
      const ka = r > 4 ? 1 - (Math.pow(r, 1 - k) - 1) / (r - 1) : r < 0.25 ? (Math.pow(1 / r, k) - 1) / (1 / r - 1) : k;
      return { yaw: lerp(a.yaw, b.yaw, k), pitch: lerp(a.pitch, b.pitch, k), zoom: a.zoom * Math.pow(r, k),
               at: [0, 1, 2].map((j) => lerp(a.at[j], b.at[j], ka)) };
    };
    // from one riding view to another, the old one rides along too while it hands over
    let from = base, to = base, at = -1e9, wide = POSE_W, live = null;
    for (const b of P.beats) {
      if (b.at > t) break;
      if (!b.pose) continue;
      from = mix(live ? where(live, b.at) : from, where(to, b.at), ease((b.at - at) / wide));
      live = to.follow && b.pose.follow ? to : null;
      to = Object.assign({}, to, { follow: false }, b.pose, { at: b.pose.at || to.at });
      at = b.at;
      wide = b.pose.w || POSE_W;
    }
    return mix(live ? where(live, t) : from, where(to, t), ease((t - at) / wide));
  }
  // the place and heading on a project's route at s (0..1): a Catmull-Rom curve through its points
  function routeAt(P, s) {
    const R = P.route, n = R.length - 1;
    const x = Math.min(n - 1e-6, Math.max(0, s * n)), i = Math.floor(x), u = x - i;
    const p = (k) => R[Math.max(0, Math.min(n, k))];
    const a = p(i - 1), b = p(i), c = p(i + 1), d = p(i + 2);
    const pos = [0, 1, 2].map((j) => 0.5 * (2 * b[j] + (c[j] - a[j]) * u + (2 * a[j] - 5 * b[j] + 4 * c[j] - d[j]) * u * u
                                            + (3 * b[j] - a[j] - 3 * c[j] + d[j]) * u * u * u));
    const tan = [0, 1, 2].map((j) => 0.5 * ((c[j] - a[j]) + 2 * (2 * a[j] - 5 * b[j] + 4 * c[j] - d[j]) * u
                                            + 3 * (3 * b[j] - a[j] - 3 * c[j] + d[j]) * u * u));
    const l = Math.hypot(tan[0], tan[1], tan[2]) || 1;
    return { pos, tan: tan.map((v) => v / l) };
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
  function parse(pb, lb, fb, tb, hb) {
    const d = {};
    if (pb) {
      const [n, flags] = new Int32Array(pb, 0, 2);
      const F = flags & 1 ? Float32Array : Int16Array, size = flags & 1 ? 4 : 2;
      let o = 8;
      d.pts = { n, float: !!(flags & 1), pos: new F(pb, o, n * 3) };
      o += n * 3 * size;
      if (flags & 2) { d.pts.target = new F(pb, o, n * 3); o += n * 3 * size; }
      d.pts.shade = new Uint8Array(pb, o, n); o += n;
      d.pts.group = new Uint8Array(pb, o, n); o += n;
      if (flags & 4) d.pts.key = new Uint16Array(pb.slice(o, o + n * 2));   // when each point appears
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
      const ro = 8 + (T + 1) * 4 + N * 12;   // each track's radius, in newer files
      if (fb.byteLength >= ro + T * 4) d.flo.rad = new Float32Array(fb, ro, T);
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
    if (hb) {   // scan points with a value: how far that part is pushed out of line
      const [n, flags] = new Int32Array(hb, 0, 2);
      const F = flags & 1 ? Float32Array : Int16Array, size = flags & 1 ? 4 : 2;
      d.hot = { n, float: !!(flags & 1), pos: new F(hb, 8, n * 3), v: new Uint8Array(hb, 8 + n * 3 * size, n) };
    }
    return d;
  }
  function load(P) {
    if (!P.data) {
      P.data = Promise.all([P.pts ? fetchBin(`pts/${P.id}.pts`) : null, P.lin ? fetchBin(`pts/${P.id}.lin`) : null,
                            P.flo ? fetchBin(`pts/${P.id}.flo`) : null, P.tri ? fetchBin(`pts/${P.id}.tri`) : null,
                            P.hot ? fetchBin(`pts/${P.id}.hot`) : null])
        .then(([pb, lb, fb, tb, hb]) => { P.cpu = parse(pb, lb, fb, tb, hb); return P.cpu; });
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
    attribute float aShade, aGroup, aKey;
    uniform mat4 uMVP;
    uniform vec3 uSweep;
    uniform float uSize, uGain, uNear, uFar, uCondense, uKeyed;
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
      // a keyed point appears at its own moment (setup by setup), with a sharper front
      float age = r - (uKeyed > 0.5 ? aKey : dot(aPos, uSweep) * 0.5 + 0.5);
      float sharp = uKeyed > 0.5 ? 3.0 : 1.0;
      float seen = clamp(age * 8.0 * sharp, 0.0, 1.0);
      float moves = step(1e-5, length(aTarget - aPos));
      float flash = 1.0 + 1.6 * clamp(1.0 - age * 6.0 * sharp, 0.0, 1.0) * seen + 3.2 * c * (1.0 - c) * moves;
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
    uniform float uGain, uNear, uFar, uKeyed, uPartK;
    uniform float uPartW[16];
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
      // on a sheet of parts each part is one step of the key, and has a strength of its own
      float pw = uPartK > 0.0 ? uPartW[int(clamp(floor(aKey / uPartK + 0.5), 0.0, 15.0))] : 1.0;
      vI = on * a * seen * flash * mix(1.0, 0.32, depth) * uGain * pw;
    }`;
  // beyond a section only uKeep of a line is left (0 = cut away)
  const FS_LIN = `
    precision mediump float;
    uniform float uKeep;
    varying float vI, vClip;
    void main() {
      float k = vClip > 0.0 ? uKeep : 1.0;
      if (k < 0.004) discard;
      gl_FragColor = vec4(vec3(vI * k), 1.0);
    }`;
  // a cable or pipe from its centre line: its two outlines, where the tube turns away from the eye,
  // set off from the centre line by its radius, so it is drawn whole at any distance
  const VS_TUBE = `
    attribute vec3 aPos, aOther;
    attribute float aSide, aRad;
    uniform mat4 uMVP;
    uniform vec3 uEye;
    uniform vec4 uClip;
    uniform float uGain, uNear, uFar, uAlpha, uReveal;
    uniform vec3 uKeyDir;
    uniform vec2 uKeyRange;
    varying float vI, vClip;
    void main() {
      vec3 s = cross(aOther - aPos, uEye - aPos);
      float l = length(s);
      vec3 o = l > 0.0 ? s * (aRad * aSide / l) : vec3(0.0);
      vec4 p = uMVP * vec4(aPos + o, 1.0);
      gl_Position = p;
      vClip = dot(aPos, uClip.xyz) - uClip.w;
      float depth = clamp((p.w - uNear) / (uFar - uNear), 0.0, 1.0);
      float age = uReveal - (dot(aPos, uKeyDir) - uKeyRange.x) / (uKeyRange.y - uKeyRange.x);
      float seen = clamp(age * 14.0, 0.0, 1.0);
      float flash = 1.0 + 1.8 * clamp(1.0 - age * 6.0, 0.0, 1.0) * seen;
      vI = uAlpha * seen * flash * mix(1.0, 0.32, depth) * uGain;
    }`;
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
  // lights along the cables (and the rings of a section): smaller and fainter further away
  const VS_RUN = `
    attribute vec3 aPos;
    attribute float aI;
    uniform mat4 uMVP;
    uniform float uSize, uAlpha, uRef, uNear, uFar;
    varying float vI;
    void main() {
      vec4 p = uMVP * vec4(aPos, 1.0);
      gl_Position = p;
      gl_PointSize = uSize * (0.5 + 0.5 * aI) * clamp(uRef / max(p.w, 1e-6), 0.3, 1.0);
      float depth = clamp((p.w - uNear) / (uFar - uNear), 0.0, 1.0);
      vI = aI * uAlpha * mix(1.0, 0.35, depth);
    }`;
  const VS_MINI = `
    attribute vec3 aPos;
    uniform mat4 uMVP;
    void main() { gl_Position = uMVP * vec4(aPos, 1.0); }`;
  const FS_MINI = `
    precision mediump float;
    uniform float uI;
    void main() { gl_FragColor = vec4(vec3(uI), 1.0); }`;
  // a damage map: each point yellow to red by how far its part is pushed out of line
  const VS_HOT = `
    attribute vec3 aPos;
    attribute float aV;
    uniform mat4 uMVP;
    uniform float uSize, uNear, uFar, uAlpha, uReveal;
    varying vec3 vC;
    void main() {
      vec4 p = uMVP * vec4(aPos, 1.0);
      gl_Position = p;
      gl_PointSize = uSize;
      float seen = clamp((aV - (1.0 - uReveal)) * 5.0, 0.0, 1.0) * smoothstep(0.0, 0.05, aV);
      float depth = clamp((p.w - uNear) / (uFar - uNear), 0.0, 1.0);
      vC = mix(vec3(1.0, 0.8, 0.22), vec3(0.96, 0.2, 0.13), aV) * seen * mix(1.0, 0.4, depth) * uAlpha;
    }`;
  const FS_HOT = `
    precision mediump float;
    varying vec3 vC;
    void main() { gl_FragColor = vec4(vC, 1.0); }`;
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
      pts: program(gl, VS_PTS, FS, ['uMVP', 'uSweep', 'uSize', 'uGain', 'uNear', 'uFar', 'uCondense', 'uAlpha', 'uReveal', 'uKeyed']),
      lin: program(gl, VS_LIN, FS_LIN, ['uMVP', 'uEye', 'uSweep', 'uClip', 'uKeep', 'uGain', 'uNear', 'uFar', 'uKeyed', 'uAlpha', 'uReveal',
                                        'uPartK', 'uPartW']),
      tube: program(gl, VS_TUBE, FS_LIN, ['uMVP', 'uEye', 'uClip', 'uKeep', 'uGain', 'uNear', 'uFar', 'uAlpha', 'uReveal', 'uKeyDir', 'uKeyRange']),
      tri: program(gl, VS_TRI, FS_TRI, ['uMVP', 'uClip']),
      run: program(gl, VS_RUN, FS, ['uMVP', 'uSize', 'uAlpha', 'uRef', 'uNear', 'uFar']),
      hot: program(gl, VS_HOT, FS_HOT, ['uMVP', 'uSize', 'uNear', 'uFar', 'uAlpha', 'uReveal']),
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
      if (d.pts.key) g.pk = buffer(gl, d.pts.key);
    }
    if (d.lin) {
      g.lp = buffer(gl, d.lin.pos); g.lo = buffer(gl, d.lin.other); g.l1 = buffer(gl, d.lin.n1); g.l2 = buffer(gl, d.lin.n2);
      if (d.lin.key) g.lk = buffer(gl, d.lin.key);
    }
    if (d.hot) { g.hp = buffer(gl, d.hot.pos); g.hv = buffer(gl, d.hot.v); }
    if (d.tri && S.uint) {
      g.tp = buffer(gl, d.tri.pos);
      g.ti = buffer(gl, d.tri.idx, gl.STATIC_DRAW, gl.ELEMENT_ARRAY_BUFFER);
    }
    if (d.flo) {
      const k = Math.min(P.runs || 2400, d.flo.T * 8);
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
    if (d.flo && d.flo.rad && P.tube) {   // every segment of every track twice, once for each outline
      const f = d.flo;
      let n = 0;
      for (let t = 0; t < f.T; t++) n += f.offs[t + 1] - f.offs[t] - 1;
      const pos = new Float32Array(n * 12), oth = new Float32Array(n * 12), side = new Float32Array(n * 4), r = new Float32Array(n * 4);
      let v = 0;
      for (let t = 0; t < f.T; t++) {
        for (let i = f.offs[t]; i < f.offs[t + 1] - 1; i++) {
          for (const [a, b, sg] of [[i, i + 1, 1], [i + 1, i, -1], [i, i + 1, -1], [i + 1, i, 1]]) {
            for (let j = 0; j < 3; j++) { pos[v * 3 + j] = f.xyz[a * 3 + j]; oth[v * 3 + j] = f.xyz[b * 3 + j]; }
            side[v] = sg; r[v] = f.rad[t]; v++;
          }
        }
      }
      g.tubeN = v;
      g.tubeP = buffer(gl, pos); g.tubeO = buffer(gl, oth); g.tubeS = buffer(gl, side); g.tubeR = buffer(gl, r);
      // each track's bounds, so a section only looks at the tracks near it
      g.tbox = [];
      for (let t = 0; t < f.T; t++) {
        const lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
        for (let i = f.offs[t]; i < f.offs[t + 1]; i++) for (let j = 0; j < 3; j++) { lo[j] = Math.min(lo[j], f.xyz[i * 3 + j]); hi[j] = Math.max(hi[j], f.xyz[i * 3 + j]); }
        g.tbox.push([lo, hi]);
      }
      g.ringPos = new Float32Array(RINGS * RING_N * 2 * 3);
      g.ringI = new Float32Array(RINGS * RING_N * 2);
      g.gp = buffer(gl, g.ringPos, gl.DYNAMIC_DRAW); g.gi = buffer(gl, g.ringI, gl.DYNAMIC_DRAW);
      g.bandPos = new Float32Array(BAND * 2 * 3);
      g.bandI = new Float32Array(BAND * 2);
      g.bp = buffer(gl, g.bandPos, gl.DYNAMIC_DRAW); g.bi = buffer(gl, g.bandI, gl.DYNAMIC_DRAW);
    }
    if (P.stations) {
      g.scanPos = new Float32Array(P.stations.length * (SCAN_N + 1) * 2 * 3);
      g.scanI = new Float32Array(P.stations.length * (SCAN_N + 1) * 2);
      g.sp = buffer(gl, g.scanPos, gl.DYNAMIC_DRAW); g.si = buffer(gl, g.scanI, gl.DYNAMIC_DRAW);
    }
    if (P.parts) {
      g.dimPos = new Float32Array(DIMS * 2 * 3);
      g.dimI = new Float32Array(DIMS * 2);
      g.dp = buffer(gl, g.dimPos, gl.DYNAMIC_DRAW); g.di = buffer(gl, g.dimI, gl.DYNAMIC_DRAW);
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
    const shownPts = (gr) => (STILL ? 9 : (t - firstShown(P, 'pts', gr)) / (P.ptsDraw || drawSec(gr)) * 1.15);
    const sec = P.section;
    let clip = sec ? sec.n.concat([lerp(sec.from, sec.to, value(P, 'cut', undefined, t, 2.4))]) : [0, 0, 0, 1];
    let keep = 0, cut = null;
    const words = [];
    // a scan reveals what lies along the route up to where its band has come
    const scanned = STILL || !P.scan ? 9 : value(P, 'ride', undefined, t, P.rideW || 8);
    if (P.route) {   // a section across the route where the ride has come to; what lies before it fades away
      const k = value(P, 'cut', undefined, t, 2.4);
      const { pos: c, tan: n } = routeAt(P, value(P, 'ride', undefined, t, P.rideW || 8));
      clip = [-n[0], -n[1], -n[2], -(c[0] * n[0] + c[1] * n[1] + c[2] * n[2])];
      keep = P.scan ? 1 : 1 - k;
      if (k > 0.002) cut = { c, n, k };
    }

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
        gl.uniform1f(p.u.uKeep, keep);
        gl.uniform1f(p.u.uKeyed, g.lk ? 1 : 0);
        const pw = new Float32Array(16).fill(1);
        if (P.parts) {   // while one part is in focus, the others step back
          const f = P.parts.map((_, k) => value(P, 'focus', k, t, 0.8)), any = Math.max(...f);
          f.forEach((x, k) => { pw[k] = 1 - 0.72 * Math.min(1, Math.max(0, any - x)); });
        }
        gl.uniform1f(p.u.uPartK, P.parts ? 0.9 / P.parts.length : 0);
        gl.uniform1fv(p.u.uPartW, pw);
        gl.uniform1f(p.u.uGain, ((P.gain && P.gain.lin) || 1) * (S.max ? 1 : 0.6));
        gl.uniform1f(p.u.uNear, near); gl.uniform1f(p.u.uFar, far);
        gl.uniform4fv(p.u.uAlpha, a);
        gl.uniform4fv(p.u.uReveal, [0, 1, 2, 3].map((gr) => (P.scan && gr === P.scan.group ? scanned : shown('lin', gr))));
        gl.drawArrays(gl.LINES, 0, d.lin.m * 2);
      }
    }
    if (P.parts) words.push(...sheet(P, g, cam, mvp, t, alpha));
    gl.disable(gl.DEPTH_TEST);
    if (g.tubeN) {
      const a = value(P, 'tube', undefined, t, FADE_W) * alpha;
      if (d.tri && g.ti && P.hidden) gl.enable(gl.DEPTH_TEST);   // behind the buildings' faces
      if (a > 0.002) {
        const p = S.prog.tube;
        gl.useProgram(p.p);
        const R0 = P.route && P.route[0], R1 = P.route && P.route[P.route.length - 1];
        const kd = P.scan ? [R1[0] - R0[0], R1[1] - R0[1], R1[2] - R0[2]] : [0, 0, 0], kl = Math.hypot(...kd) || 1;
        for (let j = 0; j < 3; j++) kd[j] /= kl;
        gl.uniform3fv(p.u.uKeyDir, kd);
        gl.uniform2fv(p.u.uKeyRange, P.scan ? [R0[0] * kd[0] + R0[1] * kd[1] + R0[2] * kd[2], R1[0] * kd[0] + R1[1] * kd[1] + R1[2] * kd[2]] : [0, 1]);
        gl.uniform1f(p.u.uReveal, scanned);
        gl.blendEquation(S.max || gl.FUNC_ADD); gl.blendFunc(gl.ONE, gl.ONE);
        attrib(gl, p.p, 'aPos', g.tubeP, 3, gl.FLOAT, false);
        attrib(gl, p.p, 'aOther', g.tubeO, 3, gl.FLOAT, false);
        attrib(gl, p.p, 'aSide', g.tubeS, 1, gl.FLOAT, false);
        attrib(gl, p.p, 'aRad', g.tubeR, 1, gl.FLOAT, false);
        gl.uniformMatrix4fv(p.u.uMVP, false, mvp);
        gl.uniform3fv(p.u.uEye, cam.eye);
        gl.uniform4fv(p.u.uClip, clip);
        gl.uniform1f(p.u.uKeep, keep);
        gl.uniform1f(p.u.uGain, ((P.gain && P.gain.tube) || 1) * (S.max ? 1 : 0.6));
        gl.uniform1f(p.u.uNear, near); gl.uniform1f(p.u.uFar, far);
        gl.uniform1f(p.u.uAlpha, a);
        gl.drawArrays(gl.LINES, 0, g.tubeN);
      }
      if (cut) words.push(...rings(P, g, cut, mvp, t, alpha));
      if (cut && P.scan) band(P, g, cut, mvp, alpha);
      gl.disable(gl.DEPTH_TEST);
    }
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
        attrib(gl, p.p, 'aKey', g.pk || null, 1, gl.UNSIGNED_SHORT, true);
        gl.uniform1f(p.u.uKeyed, g.pk ? 1 : 0);
        gl.uniformMatrix4fv(p.u.uMVP, false, mvp);
        gl.uniform3fv(p.u.uSweep, sweep);
        gl.uniform1f(p.u.uSize, Math.max(1, 1.25 * dpr));
        gl.uniform1f(p.u.uGain, ((P.gain && P.gain.pts) || 1) * Math.min(1, (0.16 * w * h) / (d.pts.n * dpr * dpr)));
        gl.uniform1f(p.u.uNear, near); gl.uniform1f(p.u.uFar, far);
        gl.uniform1f(p.u.uCondense, value(P, 'condense', undefined, t, P.condenseW || 3.2));
        gl.uniform4fv(p.u.uAlpha, a);
        gl.uniform4fv(p.u.uReveal, [0, 1, 2, 3].map((gr) => shownPts(gr)));
        gl.drawArrays(gl.POINTS, 0, d.pts.n);
      }
    }
    if (P.stations) scanners(P, g, mvp, shownPts(0), (1 - value(P, 'condense', undefined, t, 1.6)) * value(P, 'pts', 0, t, FADE_W) * alpha);
    const ha = value(P, 'hot', undefined, t, FADE_W) * alpha;
    if (g.hp && ha > 0.002) {
      const p = S.prog.hot;
      gl.useProgram(p.p);
      gl.blendEquation(S.max || gl.FUNC_ADD); gl.blendFunc(gl.ONE, gl.ONE);
      attrib(gl, p.p, 'aPos', g.hp, 3, d.hot.float ? gl.FLOAT : gl.SHORT, !d.hot.float);
      attrib(gl, p.p, 'aV', g.hv, 1, gl.UNSIGNED_BYTE, true);
      gl.uniformMatrix4fv(p.u.uMVP, false, mvp);
      gl.uniform1f(p.u.uSize, Math.max(1.5, 2.2 * dpr));
      gl.uniform1f(p.u.uNear, near); gl.uniform1f(p.u.uFar, far);
      gl.uniform1f(p.u.uAlpha, ha);
      gl.uniform1f(p.u.uReveal, STILL ? 9 : (t - firstShown(P, 'hot')) / 1.8);
      gl.drawArrays(gl.POINTS, 0, d.hot.n);
      gl.blendEquation(gl.FUNC_ADD);
    }
    const fl = value(P, 'flow', undefined, t, FADE_W) * alpha;
    if (d.flo && g.runs && fl > 0.002 && !STILL) {
      const f = d.flo, speed = P.flowSpeed || 0.02, gap = speed * 0.035;
      g.runs.forEach((r, k) => {
        r.s = (r.s + r.v * speed * dtStep) % f.lens[r.t];
        for (let j = 0; j < TRAIL; j++) {
          const o = (k * TRAIL + j) * 3;
          along(f, r.t, Math.max(0, r.s - j * gap), g.runPos, o);
          // a light before the section is cut away with its cable
          const gone = cut && (g.runPos[o] - cut.c[0]) * cut.n[0] + (g.runPos[o + 1] - cut.c[1]) * cut.n[1]
                              + (g.runPos[o + 2] - cut.c[2]) * cut.n[2] < 0;
          g.runI[k * TRAIL + j] = Math.pow(1 - j / TRAIL, 1.6) * (gone ? keep : 1);
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
      gl.uniform1f(p.u.uRef, D); gl.uniform1f(p.u.uNear, near); gl.uniform1f(p.u.uFar, far);
      gl.uniform1f(p.u.uAlpha, fl);
      gl.drawArrays(gl.POINTS, 0, g.runs.length * TRAIL);
    }
    if (P.dims) {
      P.dims.forEach(([xyz, text, group, when], k) => {
        const [x, y] = screen(mvp, xyz);
        words.push({ key: 'd' + k, text, x, y, o: value(P, 'lin', group, t, FADE_W) * alpha * ease((t - (when || 0)) / 0.8) });
      });
    }
    labels(words);
  }

  // the cables a section cuts, each a ring of its own diameter where it crosses the section, drawn
  // round like with a compass when the section first appears
  function rings(P, g, cut, mvp, t, alpha) {
    const f = P.cpu.flo, { c, n } = cut, R = P.ringR || 0.016;
    const side = [n[1], -n[0], 0], sl = Math.hypot(side[0], side[1]) || 1;   // to the right, seen along the route
    side[0] /= sl; side[1] /= sl;
    const up = [side[1] * n[2] - side[2] * n[1], side[2] * n[0] - side[0] * n[2], side[0] * n[1] - side[1] * n[0]];
    const hits = [];
    for (let tr = 0; tr < f.T && hits.length < RINGS; tr++) {
      const [lo, hi] = g.tbox[tr];
      if (c[0] < lo[0] - R || c[0] > hi[0] + R || c[1] < lo[1] - R || c[1] > hi[1] + R || c[2] < lo[2] - R || c[2] > hi[2] + R) continue;
      let s0 = 0;
      for (let i = f.offs[tr]; i < f.offs[tr + 1]; i++) {
        const s1 = (f.xyz[i * 3] - c[0]) * n[0] + (f.xyz[i * 3 + 1] - c[1]) * n[1] + (f.xyz[i * 3 + 2] - c[2]) * n[2];
        if (i > f.offs[tr] && (s0 > 0) !== (s1 > 0)) {
          const u = s0 / (s0 - s1), q = [0, 1, 2].map((j) => f.xyz[(i - 1) * 3 + j] + (f.xyz[i * 3 + j] - f.xyz[(i - 1) * 3 + j]) * u);
          if (Math.hypot(q[0] - c[0], q[1] - c[1], q[2] - c[2]) < R) {
            hits.push({ q, r: f.rad[tr], x: (q[0] - c[0]) * side[0] + (q[1] - c[1]) * side[1] });
          }
        }
        s0 = s1;
      }
    }
    hits.sort((a, b) => a.x - b.x);
    const t0 = firstShown(P, 'tube'), I = cut.k * alpha;
    // each size once, beside its ring furthest right and up
    const sizes = new Map(), o = value(P, 'sizes', undefined, t, 0.8) * cut.k * alpha;
    if (o > 0.002) {
      for (const h of hits) {
        const mm = Math.round(h.r * 2 * P.half * 1000), u = h.q.map((v, e) => v - c[e]);
        const score = u[0] * side[0] + u[1] * side[1] + u[2] * up[2] * 1.5;
        if (!sizes.has(mm) || score > sizes.get(mm).score) sizes.set(mm, { h, score });
      }
    }
    const words = [...sizes].map(([mm, { h }]) => {
      const [x, y] = screen(mvp, h.q.map((v, e) => v + h.r * side[e]));
      return { key: 'r' + mm, text: 'ø' + mm, x: x + 7, y, o, side: true };
    });
    let v = 0;
    hits.slice(0, RINGS).forEach((h, k) => {
      const arc = STILL ? 1 : ease((t - t0 - 0.35 - k * 0.06) / 0.9);
      for (let j = 0; j < RING_N * arc; j++) {
        for (const a of [j, Math.min(j + 1, RING_N * arc)]) {
          const th = Math.PI / 2 - (2 * Math.PI * a) / RING_N, cs = Math.cos(th) * h.r, sn = Math.sin(th) * h.r;
          for (let e = 0; e < 3; e++) g.ringPos[v * 3 + e] = h.q[e] + cs * side[e] + sn * up[e];
          g.ringI[v++] = I;
        }
      }
    });
    if (!v) return words;
    const gl = S.gl, p = S.prog.run;
    gl.useProgram(p.p);
    gl.blendEquation(S.max || gl.FUNC_ADD); gl.blendFunc(gl.ONE, gl.ONE);
    gl.bindBuffer(gl.ARRAY_BUFFER, g.gp); gl.bufferSubData(gl.ARRAY_BUFFER, 0, g.ringPos.subarray(0, v * 3));
    gl.bindBuffer(gl.ARRAY_BUFFER, g.gi); gl.bufferSubData(gl.ARRAY_BUFFER, 0, g.ringI.subarray(0, v));
    attrib(gl, p.p, 'aPos', g.gp, 3, gl.FLOAT, false);
    attrib(gl, p.p, 'aI', g.gi, 1, gl.FLOAT, false);
    gl.uniformMatrix4fv(p.u.uMVP, false, mvp);
    gl.uniform1f(p.u.uSize, 1);
    gl.uniform1f(p.u.uRef, 1e9); gl.uniform1f(p.u.uNear, 0); gl.uniform1f(p.u.uFar, 1e9);   // the cut face at full strength
    gl.uniform1f(p.u.uAlpha, 1);
    gl.drawArrays(gl.LINES, 0, v);
    return words;
  }

  // where the scanners stood: a small ring at the scanner's head and its tripod down to the ground, lit
  // while that setup's points come in, then faint until the points are pulled onto the model
  function scanners(P, g, mvp, r, k) {
    if (k < 0.002) return;
    const n = P.stations.length, rad = 0.22 / P.half, leg = 1.55 / P.half;
    let v = 0;
    P.stations.forEach((c, j) => {
      const on = ease(1 - Math.abs(r * n - (j + 0.5)) / 1.2), seen = ease((r * n - j) * 2);
      const I = k * seen * (0.22 + 0.78 * on);
      if (I < 0.002) return;
      for (let i = 0; i < SCAN_N; i++) {
        for (const a of [i, i + 1]) {
          const th = (2 * Math.PI * a) / SCAN_N;
          g.scanPos.set([c[0] + Math.cos(th) * rad, c[1] + Math.sin(th) * rad, c[2]], v * 3); g.scanI[v++] = I;
        }
      }
      g.scanPos.set(c, v * 3); g.scanI[v++] = I * 0.6;
      g.scanPos.set([c[0], c[1], c[2] - leg], v * 3); g.scanI[v++] = 0;
    });
    if (!v) return;
    const gl = S.gl, p = S.prog.run;
    gl.useProgram(p.p);
    gl.blendEquation(S.max || gl.FUNC_ADD); gl.blendFunc(gl.ONE, gl.ONE);
    gl.bindBuffer(gl.ARRAY_BUFFER, g.sp); gl.bufferSubData(gl.ARRAY_BUFFER, 0, g.scanPos.subarray(0, v * 3));
    gl.bindBuffer(gl.ARRAY_BUFFER, g.si); gl.bufferSubData(gl.ARRAY_BUFFER, 0, g.scanI.subarray(0, v));
    attrib(gl, p.p, 'aPos', g.sp, 3, gl.FLOAT, false);
    attrib(gl, p.p, 'aI', g.si, 1, gl.FLOAT, false);
    gl.uniformMatrix4fv(p.u.uMVP, false, mvp);
    gl.uniform1f(p.u.uSize, 1);
    gl.uniform1f(p.u.uRef, 1e9); gl.uniform1f(p.u.uNear, 0); gl.uniform1f(p.u.uFar, 1e9);
    gl.uniform1f(p.u.uAlpha, 1);
    gl.drawArrays(gl.LINES, 0, v);
    gl.blendEquation(gl.FUNC_ADD);
  }

  // a georadar's band across the street, two fading lines behind it, and the faint curtain it sees
  // down into the ground
  function band(P, g, cut, mvp, alpha) {
    const { c, n } = cut, B = P.scan, I = cut.k * alpha, m = 1 / P.half;
    const sl = Math.hypot(n[0], n[1]) || 1, side = [n[1] / sl, -n[0] / sl, 0];
    const at = (u, back, down) => [0, 1, 2].map((e) => c[e] + side[e] * u - n[e] * back - (e === 2 ? down : 0));
    let v = 0;
    const seg = (a, b, ia, ib) => {
      if (v + 2 > BAND * 2) return;
      g.bandPos.set(a, v * 3); g.bandI[v++] = ia;
      g.bandPos.set(b, v * 3); g.bandI[v++] = ib;
    };
    for (const [back, i] of [[0, 1], [0.7, 0.4], [1.6, 0.16]]) seg(at(B.width[0], back * m, 0), at(B.width[1], back * m, 0), I * i, I * i);
    const k = 40;
    for (let j = 0; j <= k; j++) {
      const u = lerp(B.width[0], B.width[1], j / k);
      seg(at(u, 0, 0), at(u, 0, B.depth), I * 0.18, 0);
    }
    const gl = S.gl, p = S.prog.run;
    gl.useProgram(p.p);
    gl.blendEquation(S.max || gl.FUNC_ADD); gl.blendFunc(gl.ONE, gl.ONE);
    gl.bindBuffer(gl.ARRAY_BUFFER, g.bp); gl.bufferSubData(gl.ARRAY_BUFFER, 0, g.bandPos.subarray(0, v * 3));
    gl.bindBuffer(gl.ARRAY_BUFFER, g.bi); gl.bufferSubData(gl.ARRAY_BUFFER, 0, g.bandI.subarray(0, v));
    attrib(gl, p.p, 'aPos', g.bp, 3, gl.FLOAT, false);
    attrib(gl, p.p, 'aI', g.bi, 1, gl.FLOAT, false);
    gl.uniformMatrix4fv(p.u.uMVP, false, mvp);
    gl.uniform1f(p.u.uSize, 1);
    gl.uniform1f(p.u.uRef, 1e9); gl.uniform1f(p.u.uNear, 0); gl.uniform1f(p.u.uFar, 1e9);
    gl.uniform1f(p.u.uAlpha, 1);
    gl.drawArrays(gl.LINES, 0, v);
  }

  // a sheet of parts: each one's name under it, and on the part in focus its three measures, drawn
  // out from the middle as it comes into focus: width and depth on the ground on the sides facing
  // the eye, height up its far corner
  function sheet(P, g, cam, mvp, t, alpha) {
    const words = [], e = cam.eye, names = value(P, 'names', undefined, t, 0.8);
    // the names on the whole sheet only where a row of four has room for them on the screen
    const box0 = P.parts[0][1], box3 = P.parts[3][1];
    const [ax] = screen(mvp, [box0[0], box0[1], box0[2]]), [bx] = screen(mvp, [box3[3], box3[1], box3[2]]);
    const room = ease((Math.abs(bx - ax) / 4 - 120) / 60);
    let v = 0;
    const seg = (a, b, i) => {
      if (v + 2 > DIMS * 2 || i < 0.002) return;
      g.dimPos.set(a, v * 3); g.dimI[v++] = i;
      g.dimPos.set(b, v * 3); g.dimI[v++] = i;
    };
    P.parts.forEach(([name, [x0, y0, z0, x1, y1, z1], mm, top], k) => {
      const vis = value(P, 'focus', k, t, 0.8) * alpha, grow = ease(vis);
      const xc = (x0 + x1) / 2, yc = (y0 + y1) / 2, zc = (z0 + z1) / 2;
      const o = 0.16 * Math.max(x1 - x0, y1 - y0, z1 - z0), tk = 0.22 * o;
      const sy = e[1] < yc ? -1 : 1, yF = sy < 0 ? y0 : y1;
      // the height goes up the end where the part is tallest (or the far end), the depth on the other
      const xE = Math.abs(top[0] - xc) > 0.2 * (x1 - x0) ? (top[0] < xc ? x0 : x1) : e[0] < xc ? x1 : x0;
      const xD = xE === x0 ? x1 : x0, sx = xD === x0 ? -1 : 1;
      // the name, centred under the part as it lands on the screen (and under its measures in focus)
      const corners = [];
      for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [z0, z1]) corners.push(screen(mvp, [x, y, z]));
      const low = Math.max(...corners.map((q) => q[1])) + 16;
      const dimLow = Math.max(low, screen(mvp, [xc, yF + sy * o * 1.9, z0])[1] + 16, screen(mvp, [xD + sx * o * 1.9, yc, z0])[1] + 16);
      const [nx] = screen(mvp, [xc, yc, z0]), ny = lerp(low, dimLow, grow);
      words.push({ key: 'n' + k, text: name, x: nx, y: ny, o: Math.max(vis, names * room * alpha) });
      if (vis < 0.002) return;
      const I = 0.85 * vis, X = 0.42 * vis;
      // width, along x, in front
      const yW = yF + sy * o, hw = ((x1 - x0) / 2) * grow;
      seg([xc - hw, yW, z0], [xc + hw, yW, z0], I);
      for (const x of [x0, x1]) {
        seg([x, yF + sy * o * 0.25, z0], [x, yF + sy * o * 1.25, z0], X);
        if (grow > 0.98) seg([x - tk, yW - sy * tk, z0], [x + tk, yW + sy * tk, z0], I);
      }
      // depth, along y, on the side
      const xW = xD + sx * o, hd = ((y1 - y0) / 2) * grow;
      seg([xW, yc - hd, z0], [xW, yc + hd, z0], I);
      for (const y of [y0, y1]) {
        seg([xD + sx * o * 0.25, y, z0], [xD + sx * o * 1.25, y, z0], X);
        if (grow > 0.98) seg([xW - sx * tk, y - tk, z0], [xW + sx * tk, y + tk, z0], I);
      }
      // height, up the front corner at that end
      const xH = xE - sx * o, hh = ((z1 - z0) / 2) * grow;
      seg([xH, yF, zc - hh], [xH, yF, zc + hh], I);
      for (const z of [z0, z1]) {
        seg([xE - sx * o * 0.25, yF, z], [xE - sx * o * 1.25, yF, z], X);
        if (grow > 0.98) seg([xH - tk, yF, z - tk], [xH + tk, yF, z + tk], I);
      }
      const label = (key, text, xyz) => { const [x, y] = screen(mvp, xyz); words.push({ key, text, x, y, o: vis * ease((vis - 0.5) * 2) }); };
      label('w' + k, mm[0], [xc, yF + sy * o * 1.9, z0]);
      label('d' + k, mm[1], [xD + sx * o * 1.9, yc, z0]);
      label('h' + k, mm[2], [xE - sx * o * 1.9, yF, zc]);
    });
    if (v) {
      const gl = S.gl, p = S.prog.run;
      gl.useProgram(p.p);
      gl.blendEquation(S.max || gl.FUNC_ADD); gl.blendFunc(gl.ONE, gl.ONE);
      gl.bindBuffer(gl.ARRAY_BUFFER, g.dp); gl.bufferSubData(gl.ARRAY_BUFFER, 0, g.dimPos.subarray(0, v * 3));
      gl.bindBuffer(gl.ARRAY_BUFFER, g.di); gl.bufferSubData(gl.ARRAY_BUFFER, 0, g.dimI.subarray(0, v));
      attrib(gl, p.p, 'aPos', g.dp, 3, gl.FLOAT, false);
      attrib(gl, p.p, 'aI', g.di, 1, gl.FLOAT, false);
      gl.uniformMatrix4fv(p.u.uMVP, false, mvp);
      gl.uniform1f(p.u.uSize, 1);
      gl.uniform1f(p.u.uRef, 1e9); gl.uniform1f(p.u.uNear, 0); gl.uniform1f(p.u.uFar, 1e9);
      gl.uniform1f(p.u.uAlpha, 1);
      gl.drawArrays(gl.LINES, 0, v);
    }
    return words;
  }

  // words on the drawing (measures under parts, sizes beside rings), where a model point lands on screen
  function screen(mvp, xyz) {
    const v = [0, 1, 3].map((r) => mvp[r] * xyz[0] + mvp[4 + r] * xyz[1] + mvp[8 + r] * xyz[2] + mvp[12 + r]);
    return [((v[0] / v[2]) * 0.5 + 0.5) * canvas.clientWidth, (0.5 - (v[1] / v[2]) * 0.5) * canvas.clientHeight];
  }
  // centred on their point (or starting at it, beside a ring), and kept inside the screen
  function labels(words) {
    const old = new Map([...labelsEl.children].map((el) => [el.dataset.k, el]));
    const cw = canvas.clientWidth, M = 12;
    for (const w_ of words) {
      let el = old.get(w_.key);
      if (!el) { el = document.createElement('span'); el.dataset.k = w_.key; labelsEl.append(el); }
      old.delete(w_.key);
      if (el.textContent !== w_.text) { el.textContent = w_.text; el.w = 0; }
      if (!el.w && w_.o > 0.002) el.w = el.offsetWidth;   // measured once per text
      const half = w_.side ? 0 : (el.w || 0) / 2;
      const x = Math.min(cw - M - (w_.side ? el.w || 0 : half), Math.max(M + half, w_.x)) - half;
      el.style.opacity = w_.o.toFixed(3);
      el.style.transform = `translate(${x.toFixed(1)}px, ${w_.y.toFixed(1)}px) translateY(-50%)`;
    }
    for (const el of old.values()) el.remove();
  }

  // ---------------------------------------------------------------- playing
  let cur = -1, tau = 0, out = -1, then = -1, raf = 0, last = 0, ready = false;
  function caption(P) {
    nameEl.textContent = P.name;
    const start = (n) => (STILL || HOLD ? fmt(n) : '0');   // counted up once the project is on screen
    metaEl.innerHTML = P.meta.map((m) => (Array.isArray(m) ? `<span data-n="${m[0]}">${start(m[0])}</span> ${m[1]}` : m)).join(' · ');
    beatsEl.innerHTML = texts(P).map((x) => `<li>${x}</li>`).join('');
    runEl.style.transform = 'scaleX(0)';
    labelsEl.textContent = '';
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
      const cam = camera({ yaw: P.spin, pitch: P.miniPitch || 26, zoom: 1.05, at: [0, 0, 0] }, bw / bh, 0, true);
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
