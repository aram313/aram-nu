# aram.nu

Aram's own page at aram.nu: a quiet, black, lowercase list of his projects.

## What this is

One page that fits a phone's screen without scrolling, with no name shown at the top, and no zoom.
**khabar.nu** links to the news app and shows, under its name, the one line the
Khabar editor writes about the day's news (refreshed every five minutes).

Under **projekter** each of Aram's projects is one line: a small live miniature of the model,
its name and a short grey line of what it is and how big (rørbro, datacenter, kabeltracé,
buehal, georadar, fabrik, gammelt hus, tagværk, værktøj). A tap plays the project's story on
the whole screen, by itself, in the style that fits it: a pipe bridge scanned setup by setup
from the places its 16 scanners stood, its points pulled onto the steel (the ones off the model
by more than 2 mm left behind), the model drawn part by part in hidden lines, and then the damage
in slow motion: seen from the road below, the bottom chord stands straight as it was built and
slowly bends to its measured shape, shown three times enlarged (and marked so), its scan points
glowing yellow to red by how far they are pushed, before the true measures (227 mm sideways,
140 mm up) and the whole bridge again, a
datacenter crossing built as it was laid (wells named for what they carry, ducts for data
and power, pipes on top, light only in the ducts for data, a section through the data duct
bank with its depth), a section riding
along a bundle of cables (each cable a ring of its own diameter where the section cuts it)
and out to a long view of the route, a georadar band running a street with what lies under
the asphalt appearing behind it (the radar finds where, not what: each line is drawn as a
300 mm pipe at the depth it was found, three are measured from the ground, and the wells
stand at their surveyed sizes), a house drawn in hidden lines and cut open, with a close look at its roof truss, an old roof drawn
rafter by rafter, first the timber the scanner saw, then the timber estimated from it, then the
pieces the model notes as crooked, bent or bowed, a factory's
steel tower drawn member by member from the ground, four of its members named by the profile
they were fitted to the scan with, a sheet of twelve 3D-printed tools where the camera
visits four and measures each in three directions. One lowercase line tells each beat, over
the project's numbers. A tap or Esc closes it; the arrow keys or a swipe go to the next
project.

The projects are real work, taken out of context: cropped, turned and stripped of any
client name, place or case number. A datacenter is shown around its building, never with
the ring of pipes along its property line, which would give the site away; a cable route is
shown in part, never whole.

Under the heading **3d print** are four 3D-printed square-kufi tiles; a tap opens a tile
large on black.

## Status

**active** · Created 2026-10-20 · Type: `web-app` · Live at https://aram.nu since 2026-10-20 (repo `aram313/aram-nu`).

## Run it locally

Requirements: Python (`py`).

```
npm run dev
```

Then open http://localhost:8790. (Without npm: `py scripts/serve.py 8790`.) It serves `src/` with caching
turned off and stamps `stage.js` with the newest file's time, so the browser never runs old code on new data.

## How it is built

- `src/index.html` is the page: markup, style and the khabar and tile script. No build step.
- `src/stage.js` is the project player and the list's miniatures. `PROJECTS` there lists each
  project's line, numbers, style and beats (text, how strongly each group of points and lines
  shows, the pull of the points onto the model, the light along the cables, a moving section,
  camera moves). Lines are drawn with "max" blending, so crossings never burn to white, and,
  for models with faces, as hidden lines: the faces go into the depth buffer first.
- Cables and pipes with a centre line are drawn as tubes: two outlines set off from the centre
  line by the radius, where the tube turns away from the eye, so they are whole at any
  distance, with a faint body between them; far away the outlines keep a least gap on screen. A project with a `route` can ride it: `ride` moves along it, a pose with
  `follow` keeps the camera on that place (with `glide` the ride keeps one steady speed from start to end), and `cut` puts a section across it there. The
  section cuts away what lies before it and draws a ring where it cuts each cable; with
  `scan` (georadar) it cuts nothing and instead reveals what lies behind it, as a band
  across the street with a faint curtain into the ground. Tube outlines meet at bends (each
  point's direction is the mean of its two segments, with a mitre at sharp ones). With
  `notes` words name what is what for a stretch of the story. With `parts` (the tool sheet) each
  part has its name under it, and `focus` gives one part its width, depth and height.
- A measured bend (`bend` in the build, `bendk` in the beats): the lines, faces and damage points of a
  member store how far they move from straight to as measured, and the player draws position +
  bend × bendk (−1 straight, 0 as measured, 2 three times enlarged), easing over `bendW` seconds.
- The data is in `src/pts/`, gzipped (`.gz`, unpacked in the page). Every file starts with int32
  count and int32 flags (1 = float32 positions instead of int16, 2 = targets, 4 = keys):
  - `<id>.pts` points: xyz (centred, longest half-axis 1), the point each one is pulled to on
    the model's edges, a shade byte, a group byte, and with flag 4 a uint16 key per point:
    when it appears (setup by setup, outward from that setup's scanner).
  - `<id>.lin` model edges: xyz for both ends, per end int8 (normal 1, sharp flag) and int8
    (normal 2, group 0 to 7), and with flag 4 a uint16 key per end: when it is drawn (element by
    element, along an axis or along a route). A sharp edge always shows; a smooth one only
    while it is a silhouette, tested at the edge's middle.
  - `<id>.tri` faces for hiding lines: vertex count, index count, flags, xyz, uint32 indices.
  - `<id>.flo` centre lines of cables and pipes: track count, point count, int32 offsets,
    float32 xyz, a float32 radius per track and, where the project sorts them, a uint8 kind
    per track. The light runs along these, and tubes and section rings are drawn from them.
  - `<id>.mini` the miniature: count, int16 xyz of the model's longest edges.
  - `<id>.hot` points with a value: count, flags, xyz, a uint8 value per point (how far that
    part is pushed out of line), drawn yellow to red.
    With flag 2, after the values (padded to an even length) int16 xyz per point: how far it moves
    with the bend. `.lin` with flag 8 has the same per end after its keys, and `.tri` with flag 2 per
    vertex after its indices.
  The files are made in Aram's private workspace from the models and scans (not in this
  repository, since the sources carry client names).
- A section may also lie flat: `section: { n: [0, 0, 1] }` sinks a level cut (buehal's plan at
  1 m). A camera looking straight down does not drift round.
- `?p=<project>&t=<seconds>` opens one project held at one moment, for checking a frame;
  `?id=<data file>&yaw=&pitch=&zoom=&at=x,y,z` shows any data file on its own, for tuning a
  camera. Reduced motion shows each project's last beat, still.
- The khabar line comes from `front.json` on the `digest` branch of the public
  `aram313/nyhedsradar` repository (the `lede` field). If it cannot be read, the line says
  "dagens nyheder".
- `src/img/del.jpg` is the picture a shared link shows (Open Graph), a frame of the bridge's scan
  rendered by the player itself at 1200 × 630 without words.
- `src/img/` holds web copies of the tile photos, made by `scripts/prepare-images.py` from
  Aram's Lightroom exports (`Downloads\lightroom-download-2024-07-02T12_03_21Z` and
  `…T12_53_12Z`). Change which tiles show in `SHOWN` there and in `TILES` in the page.

## The Tokyo page

`src/tokyo/index.html` is a separate page at https://aram.nu/tokyo: Aram's travel guide to Tokyo in
Danish, in the front page's look (black, white text, lowercase, the device's own sans at weight 300,
hairlines, grey for anything secondary), built like a phone app with five tabs in a bar at the bottom.
Everything you tap opens the same sheet from the bottom, with the details and what you can do.

- **spis**: 97 places to eat, nearly all Japanese food made halal. "desserter" has Tokyo's viral sweets
  (soufflé pancakes, Harajuku crepes, taiyaki, fruit daifuku, kakigori, Dubai chocolate, purin) with what to
  watch for (gelatine, liqueur) and where to get them, marked when a shop is not certified; a dessert's sheet
  shows staff the question about gelatine and alcohol in one tap. "andre køkkener" has eleven good Malaysian,
  Pakistani, Indian, Lebanese, Arab, Chinese, Uzbek and Uyghur places for a break. Dish chips (a row that scrolls sideways, with a fade on each
  side where there is more) and one "where" choice: "hele tokyo" groups the places by dish, each dish
  in its own frame with its places and, at the foot, the dishes to read about; "min placering", a station or "mit hotel" sorts them by
  distance, also within a dish. If the location is not ready, one line says why and the list stays. A
  place's sheet has its Japanese address, the map, and cards that ask the way or tell a taxi driver where
  to go, in Japanese with the name and address. At its foot, "planlæg" puts the place in the plan tab,
  "været her" turns it green in every list, and a quiet "ikke interesseret" moves it to the archive; the
  gear (spis and oplev) opens settings with the archive, where it can be brought back. Sights work the same way.
- **oplev**: 63 things to see and shops in six kinds (udsigt, oplevelser, spil & hobby, elektronik, butikker,
  byliv), chosen by chips like the dishes under spis, each kind in its own frame; no temples or shrines. The
  same "where" choice as spis (shared) sorts them nearest first. Each has the nearest halal places and "spørg
  om vej" with its Japanese name and address; places far out say how far and how to get there. The last
  chip, "overalt", has 18 things met everywhere in Tokyo to try or to notice, with buttons into the halal
  card, phrase cards, omregn or the mosques on the map.
- **plan**: what you have planned, places to eat and sights together, nearest first when a point is chosen
  under spis (a chain shows its nearest branch), with a ✓ on each to mark it been; below, where you have been.
- **parlør**: "vis frem" holds the halal card and 59 cards in seven categories to show staff; "forstå"
  lists 24 things staff say, with romaji, meaning, "hør" and the answers to tap. A card shows the
  Japanese full screen, black on white, with your Danish as one small grey line at the top. Staff never
  touch the phone: one short Japanese line asks them to answer with ○ or ×, point, hold up fingers, show
  the price on their calculator or write on paper, and a quiet grey line under it says what you may hear
  (hai, iie, migi, juppun …). The halal card is two short lists: not ok (pork, meat that is not halal,
  alcohol, gelatine) and ok (fish, shellfish, eggs, halal meat).
- **omregn**: yen and kroner both ways at the ECB rate with how the price is said (read aloud where the
  phone has a Japanese voice) and the tax-free refund, Danish to Japanese sizes for shoes and clothes
  with a card to ask staff, any number said in Japanese with a table of numbers and counting words, and
  the time in Tokyo and Denmark.

The page remembers the last tab, views, dish, place, category and your marks in `localStorage`. It is not linked
from the front page and carries `noindex`. The page (data, styles, script) is `index.html`; next to it,
`sw.js` keeps it working offline and quick to open (the page comes from the phone's cache at once and a
fresh copy is fetched in the background for next time; its cache name carries a version, so a new page
replaces the old cache), and `manifest.webmanifest` with the icons ("/tokyo" in white on black)
makes it a full-screen app when added to a phone's home screen. Like the front page, it does not zoom.
The exchange rate is fetched from `api.frankfurter.dev` when online; offline the built-in rate is used.
Location needs the page on https, which Pages gives.

## Publishing

`.github/workflows/pages.yml` publishes `src/` to GitHub Pages on every push to `main`. It stamps
`stage.js?v=<commit>` into the page first; the player asks for its data with the same version.
The repository `aram313/aram-nu` has Pages set to "GitHub Actions" and the custom domain
`aram.nu`. DNS at Simply.com (set 2026-10-20): four `A` records for `aram.nu` to
185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, and a `CNAME` for
`www` to `aram313.github.io`.
