# Changelog

All notable changes to this project are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Categories: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.

## [Unreleased]

### Added

- Project scaffolded from the `web-app` workspace template.
- The page: black, lowercase, minimal; khabar.nu with the editor's day line; "3d, bim &
  elektronik" with four 3D-printed kufi tiles that open large on tap.
- GitHub Pages workflow for publishing `src/` (replaces the template's npm CI).
- Published at https://aram.nu (GitHub Pages, DNS at Simply.com).
- "projekter": each of Aram's projects as one line with a small live miniature, and a tap
  plays its story on the whole screen in the style that fits it: rørbro and buehal (scan
  pulled onto the model), datacenter (a crossing built element by element, light in the
  cables), kabeltracé (from a junction up to kilometres of cable), georadar (the radar runs
  the street), fabrik (steel settling out of a cloud of points), gammelt hus (hidden lines,
  cut open by a section), tagværk (rafter after rafter), værktøj (a sheet of nine prints with
  measures). Lines blend with "max" and hide behind faces; numbers come from the models.
  Arrow keys or a swipe for the next project, tap or Esc to close. Player in `src/stage.js`,
  data gzipped in `src/pts/` (about 13 MB, loaded one project at a time).

### Changed

- buehal: the scan builds up setup by setup from where its 26 scanners stood; the hall is
  drawn in hidden lines; at the end it is cut open along its length and the measured spacing
  between the twelve arches stands as a chain of measures at 1 m height (1909 to 1927 mm).
- kabeltracé: the section names each group of rings from the model's own types: the two
  132 kV feeders (one in reserve), 10 kV, fibre and the earth conductor, each with its size.
- datacenter: everything under the ground is drawn as tubes of its real diameter and sorted by
  what it carries, from the model's own worksets and systems: cables for data and for power,
  rain and sewage, water and fire water. The tubes are laid out from the crossing, and light
  runs only in the ducts that carry data. At the crossing, the wells are named (the cable well
  for data, the sewer and pump wells) and built first, then the ducts, then the pipes on top.
  A section across the data duct bank shows its 24 ducts in rings, the ground and how deep it
  lies (1,35 m there), and the story ends on the whole site again. On a phone the site turns
  upright, and words on the drawing step clear of each other.
- Points and lights keep their size against the drawing, so they no longer grow over the
  picture on a phone.
- Scan points are as bright on a sharp phone screen as on a desktop: their brightness is shared
  out over the screen's real pixels, not its CSS pixels, so a phone at 3x no longer dims them to a third.
- Tubes keep their outline round bends: the two outlines of neighbouring segments meet
  instead of leaving a gap on the outside of each bend.
- Tubes read as pipes at any distance: a faint body between their outlines, and the two outlines
  never close up into one line far away (they keep at least about 2 px between them).
- kabeltracé: the short flex pieces that join the pipe lengths are part of their cables again
  (the rules could not name them, so they were left as tiny loose pieces and dropped).
- Lines can come in eight groups instead of four.
- With reduced motion, the list keeps its miniatures as still drawings (they light up under the
  pointer but do not turn), and a story's last picture shows only the words that belong to it.
- The grey numbers in every story fit on one line on a phone (checked at 360 and 390 px); the
  longest ones keep their three strongest numbers.
- rørbro: the scan builds up setup by setup from where the 16 scanners stood; the points are
  pulled onto the steel and the 6 % that lie more than 2 mm off the model stay behind; the model
  is drawn part by part from the bottom in hidden lines; a bearing's bolt group is shown close
  with its hole pattern (60, 189 and 161 mm, from the delivered bolt table); the damage is
  shown with its measures (227 mm sideways, 140 mm up, as in the delivered report) and the
  damaged chord's scan points yellow to red by how far it is pushed out of line, seen from the
  side while the camera goes slowly round to the other side, then out to the whole bridge. The
  grey numbers fit on one line.
- kabeltracé: a section rides along a bundle of cables through a bend, each cable cut as a
  ring of its real diameter (from the model) with the sizes written beside them, then out to
  a long view up the route with light in the cables. The cables are whole tubes now, joined
  from thousands of pipe lengths and bends, so no lines are missing.
- georadar: a radar band with a faint curtain into the ground runs the street, and the pipes
  and wells appear behind it as it passes; the buildings are reduced to walls, floors and
  columns, drawn faintly.
- georadar: the words say what the model knows: the radar finds where something lies, not
  what it is, so every line is drawn as a 300 mm pipe at the depth it was found (as the
  model's own types say); three pipes are measured from the ground down (0,5, 2,4 and 1,0 m)
  and three wells carry their surveyed sizes. The numbers now count lines, not pipe pieces:
  85 lines, 47 wells, 90 m of street.
- georadar: drawn clean instead of as the model's raw geometry: each well and manhole a round
  shaft of its surveyed size and depth, the buildings plain wall planes from the walls' own lines
  and heights (no windows, panels, beams or ground triangles). The radar runs the whole street at
  one steady speed while the story goes on, instead of slowing to a stop half way.
- fabrik: no made-up points any more (the scan itself is not part of the site, so the points
  that settled onto the model were invented); the steel is drawn member by member from the
  ground, and four members are lit and named by the profile they were fitted with (upe 160,
  upe 220, ipe 120, w8x15). The numbers count what is shown: 298 steel beams, 32 m high. The
  stair stringers of the lower building next to the tower rise with that building, not with the
  tower's steel, so nothing is built in the air beside the tower.
- gammelt hus: after the section opens the house, the camera goes up close to the roof truss and
  out again; nothing is written on the drawing.
- tagværk: told from the model's own types: first the 596 pieces of timber the scanner saw
  (surveyed), then the 636 estimated from them, then three pieces the model notes as bowed,
  crooked and bent; the end runs along the whole 165 m roof (on a phone, seen down its length).
- værktøj: a sheet of twelve prints with their names; the camera visits four of them, from
  330 mm down to 28 mm, and draws each one's width, depth and height.
- værktøj: on a phone the sheet turns upright, so all twelve prints fit the screen.
- værktøj: each print's name arrives with the print as the sheet is drawn.
- A word whose point is off the screen no longer shows, instead of being pushed in at the edge.
- Words stand a little above the thing they name, not on top of it.
- A shared link to aram.nu shows a picture: the steel bridge as scan points on black
  (`src/img/del.jpg`, 1200 × 630), with the page's title and a short line.
- While a story's data is still on its way, a faint light runs along its progress line (a still
  line with reduced motion), so a slow connection does not look like a broken page.

---

<!--
Release entries look like this, newest first:

## [1.0.0] - 2026-01-15

### Added
- The thing that is now possible.

### Fixed
- The thing that used to be broken.
-->
