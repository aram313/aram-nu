# aram.nu

Aram's own page at aram.nu: a quiet, black, lowercase list of his projects.

## What this is

One page. **khabar.nu** links to the news app and shows, under its name, the one line the
Khabar editor writes about the day's news (refreshed every five minutes).

Under **projekter** each of Aram's projects is one line: a small live miniature of the model,
its name and a short grey line of what it is and how big (rørbro, datacenter, kabeltracé,
buehal, georadar, fabrik, gammelt hus, tagværk, værktøj). A tap plays the project's story on
the whole screen, by itself, in the style that fits it: a pipe bridge scanned setup by setup
from the places its 16 scanners stood, its points pulled onto the steel (the ones off the model
by more than 2 mm left behind), the model drawn part by part in hidden lines, a bearing's bolt
pattern with its measures, and the damaged chord with its two measures, its scan points yellow
to red by how far it is pushed out of line, seen from the side as the camera goes slowly round
to its other side and out to the whole bridge again, a
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

## Publishing

`.github/workflows/pages.yml` publishes `src/` to GitHub Pages on every push to `main`. It stamps
`stage.js?v=<commit>` into the page first; the player asks for its data with the same version.
The repository `aram313/aram-nu` has Pages set to "GitHub Actions" and the custom domain
`aram.nu`. DNS at Simply.com (set 2026-10-20): four `A` records for `aram.nu` to
185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, and a `CNAME` for
`www` to `aram313.github.io`.
