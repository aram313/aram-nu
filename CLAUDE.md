# CLAUDE.md — aram.nu

Project-specific instructions. The workspace-wide rules are in `E:\CLAUDE.md` and
`E:\STRUCTURE.md` and apply here too — this file only adds what is specific to this
project.

## What this project is

Aram's own page at aram.nu (domain bought 2026-10-20 at Simply.com, same account as
khabar.nu). A minimal list of his projects: khabar.nu with the Khabar editor's day line under
it, his real projects as one line each that open into a full-screen story (scan points and
model wireframes on black), and four 3D-printed kufi tiles under "3d print" (no captions, no
other text there).

Owner's design rules for this page: black background, white text, **no capital letters**
(CSS lowercase), a minimal font (the device's own sans, weight 300), little text, **no
captions on the pictures**, only a few tiles ("fliserne fylder for meget").
The tiles carry the shahada and Allah's name: never animate them falling, rotating or
distorting, and keep them out of footers or decorative backgrounds.

<!-- Expand: the purpose, the users, the constraints that are not obvious from the
     code. This is the context you would want if you were picking this up cold. -->

## Stack

- **Type:** `web-app`
- **Technologies:** html, css, javascript

## Commands

<!-- Fill these in as soon as they exist. Exact, copy-pasteable, no placeholders. -->

| Task | Command |
|---|---|
| Install dependencies | none |
| Run in development | `npm run dev` (http://localhost:8790, no caching: `scripts/serve.py`) |
| Run tests | none; check the page at 375 px and 1440 px |
| Build for production | none; `src/` is served as it is |
| Remake tile images | `python scripts/prepare-images.py <lightroom folders>` (needs Pillow) |

## Architecture

`src/index.html` is the whole site. The khabar line is `lede` from
`https://raw.githubusercontent.com/aram313/nyhedsradar/digest/front.json` (public, CORS open,
cached 5 min). Do not change the Khabar repository from this project.

The project player is `src/stage.js` (`PROJECTS` there), data in `src/pts/` (formats in README). The data
is built outside this repository (Aram's work laptop, `D:\c\portfolio`), because the sources
and their paths carry client and case names. Never commit those tools, their configuration
or any path from them here.

<!-- How the pieces fit together. Where the entry point is. What depends on what.
     Update this when the shape of the project changes. -->

## Project-specific conventions

Owner's rules for the projects (2026-10-21):

- Real projects, altered a little and taken out of context; no client name, place or case
  number anywhere (text, alt text, file names).
- The point look is only for real scan data; models are white wireframe, no colours. The one
  colour is where it measures something: rørbro's damage, its scan points yellow to red by how
  far the chord is pushed out of line (Aram asked for it, 2026-10-21).
- Each project tells a story visually: scan to model to finding, or overview to detail.
- The list stays minimal: at most one line per project (a small live miniature is fine). Not
  scroll-driven; the story plays full screen on a tap.
- Each project gets the style that makes sense for it; not every one is a making-of.
- Lines must look professional: no burnt-out white, no lines popping in and out.
- Grey numbers say how big and how detailed a project is; they must come from the data.
- A datacenter may show its building, never the ring of pipes along the property line.
- Check a frame with `?p=<id>&t=<seconds>`.
- The phone comes first (Aram, 2026-10-21): check every change at phone size before desktop.
  Point and light sizes follow the drawing, not the screen (`px` in stage.js), so they never
  grow over the picture on a tall screen.
- Say what is modelled, in plain words, where it helps (a cable well that carries data is not a
  drain well); the model's own types decide, not a guess.

<!-- Anything that differs from, or adds to, the workspace standard. If nothing
     differs, say so explicitly so the next session does not go looking. -->

## Constraints and gotchas

- A browser keeps old files: serve locally with `scripts/serve.py` (no-store), never a plain
  `http.server`, or the page runs an old `stage.js` on new data. On GitHub Pages the deploy stamps
  `stage.js?v=<commit>` and the player asks for its data with the same version.
- Headless Edge screenshots narrower than about 500 px are laid out wider than the picture
  and cut off on the right. Take phone frames with Playwright and Edge as a real phone
  (390 × 844, 3× pixels, `is_mobile`, a fresh context so no old `stage.js` is cached).

<!-- Things that will bite someone who does not know them. External services that
     must be running, ports in use, data that must be seeded first, known-fragile
     areas. Add to this list every time you hit one. -->

## Definition of done

A change is finished when:

1. Tests pass.
2. `CHANGELOG.md` has an entry under `## [Unreleased]`.
3. `.project.json` has an updated `updated` date.
4. `README.md` still describes reality.
5. The work is committed with a Conventional Commit message.
6. The owner has been told what changed, in plain language.
