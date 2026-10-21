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
pattern with its measures and the damaged chord sighted along with its two measures, a
datacenter crossing built element by element with light in its cables, a section riding
along a bundle of cables (each cable a ring of its own diameter where the section cuts it)
and out to a long view of the route, a georadar band running a street with what lies under
the asphalt appearing behind it, a house drawn in hidden lines and cut open, a factory's
steel settling out of a cloud of points, a sheet of twelve 3D-printed tools where the camera
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

Then open http://localhost:8790. (Without npm: `py -m http.server 8790 --directory src`.)

## How it is built

- `src/index.html` is the page: markup, style and the khabar and tile script. No build step.
- `src/stage.js` is the project player and the list's miniatures. `PROJECTS` there lists each
  project's line, numbers, style and beats (text, how strongly each group of points and lines
  shows, the pull of the points onto the model, the light along the cables, a moving section,
  camera moves). Lines are drawn with "max" blending, so crossings never burn to white, and,
  for models with faces, as hidden lines: the faces go into the depth buffer first.
- Cables and pipes with a centre line are drawn as tubes: two outlines set off from the centre
  line by the radius, where the tube turns away from the eye, so they are whole at any
  distance. A project with a `route` can ride it: `ride` moves along it, a pose with
  `follow` keeps the camera on that place, and `cut` puts a section across it there. The
  section cuts away what lies before it and draws a ring where it cuts each cable; with
  `scan` (georadar) it cuts nothing and instead reveals what lies behind it, as a band
  across the street with a faint curtain into the ground. With `parts` (the tool sheet) each
  part has its name under it, and `focus` gives one part its width, depth and height.
- The data is in `src/pts/`, gzipped (`.gz`, unpacked in the page). Every file starts with int32
  count and int32 flags (1 = float32 positions instead of int16, 2 = targets, 4 = keys):
  - `<id>.pts` points: xyz (centred, longest half-axis 1), the point each one is pulled to on
    the model's edges, a shade byte, a group byte, and with flag 4 a uint16 key per point:
    when it appears (setup by setup, outward from that setup's scanner).
  - `<id>.lin` model edges: xyz for both ends, per end int8 (normal 1, sharp flag) and int8
    (normal 2, group), and with flag 4 a uint16 key per end: when it is drawn (element by
    element, along an axis or along a route). A sharp edge always shows; a smooth one only
    while it is a silhouette, tested at the edge's middle.
  - `<id>.tri` faces for hiding lines: vertex count, index count, flags, xyz, uint32 indices.
  - `<id>.flo` centre lines of cables and pipes: track count, point count, int32 offsets,
    float32 xyz, and a float32 radius per track. The light runs along these, and tubes and
    section rings are drawn from them.
  - `<id>.mini` the miniature: count, int16 xyz of the model's longest edges.
  The files are made in Aram's private workspace from the models and scans (not in this
  repository, since the sources carry client names).
- `?p=<project>&t=<seconds>` opens one project held at one moment, for checking a frame;
  `?id=<data file>&yaw=&pitch=&zoom=&at=x,y,z` shows any data file on its own, for tuning a
  camera. Reduced motion shows each project's last beat, still.
- The khabar line comes from `front.json` on the `digest` branch of the public
  `aram313/nyhedsradar` repository (the `lede` field). If it cannot be read, the line says
  "dagens nyheder".
- `src/img/` holds web copies of the tile photos, made by `scripts/prepare-images.py` from
  Aram's Lightroom exports (`Downloads\lightroom-download-2024-07-02T12_03_21Z` and
  `…T12_53_12Z`). Change which tiles show in `SHOWN` there and in `TILES` in the page.

## Publishing

`.github/workflows/pages.yml` publishes `src/` to GitHub Pages on every push to `main`.
The repository `aram313/aram-nu` has Pages set to "GitHub Actions" and the custom domain
`aram.nu`. DNS at Simply.com (set 2026-10-20): four `A` records for `aram.nu` to
185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, and a `CNAME` for
`www` to `aram313.github.io`.
