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
- `aram.nu/tokyo`: a separate travel page (not linked from the front page, `noindex`) listing 64
  halal Japanese places to eat in Tokyo, by dish or nearest first from the phone's GPS (a station or
  pasted hotel coordinates also work), with links to Google Maps and a tab of foods to try.
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

- `aram.nu/tokyo` is in Danish now, and the kimono dinner is gone from its foods to try (15 left).
- `aram.nu/tokyo` has a tab of 16 sights (Nintendo TOKYO, Skytree, Akihabara, teamLab and more), each
  with the nearest halal places from the list and the walk to them.
- `aram.nu/tokyo` has a phrasebook tab (Parlør): 22 cards in a grid; a tap shows the Japanese
  full screen, black on white, to hold up to staff. The tabs are shorter: Spisesteder, Seværdigheder,
  Mad, Parlør.
- `aram.nu/tokyo` is called just "Tokyo" and is tidied up: no intro line, section notes, jump links
  or kanji on the eating list, one short line for distances, and the tips cut to four lines.
- `aram.nu/tokyo` works offline: a service worker (`src/tokyo/sw.js`) keeps the page and its fonts on
  the phone after the first visit, and it can be added to the home screen as an app (manifest and
  icons in `src/tokyo/`). A line under the title says when the phone is offline.
- `aram.nu/tokyo`: the phrasebook has 53 cards in seven groups (halal, restaurant, shopping, transport,
  hotel, emergency with 119 and 110, practical), each Japanese line checked for meaning, politeness and
  romaji.
- `aram.nu/tokyo`: the phrasebook is smarter. A halal card at the top explains everything in one go (no
  pork, nothing from pigs, no alcohol, mirin included); yes/no questions show はい / いいえ / わかりません
  buttons for staff, and their answer appears large in Danish; "Vi er … personer" counts with − and +;
  "Kør mig til mit hotel" keeps the hotel's address on the phone; a search box finds cards by word.
  The Japanese is sized to fill the screen and breaks only between phrases, "Læs højt" reads it aloud
  where the phone has a Japanese voice, and the screen stays on while a card is shown. 55 cards.
- `aram.nu/tokyo` has the front page's look: black, white text, lowercase, the device's own sans at weight
  300, hairlines instead of boxes (no web fonts any more), and the staff card is white on black. A fourth
  tab, omregn, gathers the tools and adds more: the tax-free refund on a price, read aloud, splitting the
  bill, any number said in Japanese, and the time in Tokyo and Denmark. The phrasebook has seven
  categories to pick from, and the staff card closes with a button at the bottom or by pulling it down.
- The front page sits at the top and fits a phone's screen without scrolling; the name "aram" is no
  longer shown (it stays for screen readers and search), and the rules around the sections start and end
  with the content.
- Both pages no longer zoom: no pinch or double-tap zoom (`maximum-scale=1`, `user-scalable=no`,
  `touch-action: manipulation`, and pinch gestures stopped for Safari). The Tokyo page's fields use 16 px
  text so a phone does not zoom in on them either, and its area filter reads "Hele Tokyo".
- `aram.nu/tokyo` is rebuilt as a phone app: three tabs in a bar at the bottom (Spis, Se, Parlør), each
  view with its own title, tap targets of at least 44 px, whole rows that open the map, one style for
  lists, cards, chips and buttons, and the last tab, view and tool remembered. The foods to try moved
  into Spis as "Smag på"; Spis filters by dish and area instead of one long list, folds a chain's other
  branches away, and opens on "Nærmest" when the phone already shares its location (from far away it
  says so instead of listing distances). "Godt at vide" sits once, at the end of Parlør, now with the tax
  free rules from 1 November 2026 and the emergency numbers.
- `aram.nu/tokyo`: the phrasebook has three tools: yen to kroner both ways at the ECB rate (fetched when
  online) with how the price is said in Japanese, a table of Japanese numbers and counting words, and
  Danish to Japanese sizes for shoes, men's and women's clothes with a card to ask staff. New card:
  "… af den her, tak" with a counter.
- `aram.nu/tokyo` opens full screen from the home screen with its own icon, a bowl with chopsticks in front of a red sun.
- buehal: the story opens low beside the hall, the twelve arches in a row as the scan builds up
  setup by setup (the scanners now stand where they stood: their positions had not been turned into
  the hall's frame with the points). The measures end as a plan cut at 1 m: the chain of measures
  lies on the row of legs, a tick at each arch and the spacing between (1909 to 1927 mm). Before,
  the chain was turned 18,6° and lay 1,77 m too low, so it matched nothing.
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
- rørbro: the damage in slow motion. Seen from the road below, the bottom chord first stands straight
  as it was built, then bends slowly to its measured shape, shown three times enlarged and marked
  as such, while its scan points glow yellow to red and the camera glides along it at one steady
  speed; then the true measures (227 mm sideways, 140 mm up) and the whole bridge. Lines, faces
  and points move together with the bend (stored per vertex), so the hidden lines stay right. The
  bearing's bolt pattern is left out, so the story ends on the damage. Before that, the scan builds up
  setup by setup and is pulled onto the steel, and the model is drawn part by part.
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
- værktøj: the pipe centring cap is drawn as it is (a ring and a bar with a 1 mm centre hole); stray
  lines ran across its top because the tiny hole was welded shut when the edges were found.
- værktøj: each print's name arrives with the print as the sheet is drawn.
- A word whose point is off the screen no longer shows, instead of being pushed in at the edge.
- Words stand a little above the thing they name, not on top of it.
- A shared link to aram.nu shows a picture: the steel bridge as scan points on black
  (`src/img/del.jpg`, 1200 × 630), with the page's title and a short line.
- Code and data always come from the same version: the deploy stamps `stage.js?v=<commit>` and the
  player asks for its data with the same version, so a browser that kept old files from before a
  push no longer runs new code on old data (or the other way round). A file that could not be had
  is asked for again (three tries) instead of leaving the story black. `scripts/serve.py` serves
  the page locally without caching.
- tagværk: the roof is drawn starting where the camera first looks, so the story never opens on a
  black screen.
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
