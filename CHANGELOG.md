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
- værktøj: a sheet of twelve prints with their names; the camera visits four of them, from
  330 mm down to 28 mm, and draws each one's width, depth and height.

---

<!--
Release entries look like this, newest first:

## [1.0.0] - 2026-01-15

### Added
- The thing that is now possible.

### Fixed
- The thing that used to be broken.
-->
