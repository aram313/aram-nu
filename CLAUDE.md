# CLAUDE.md — aram.nu

Project-specific instructions. The workspace-wide rules are in `E:\CLAUDE.md` and
`E:\STRUCTURE.md` and apply here too — this file only adds what is specific to this
project.

## What this project is

Aram's own page at aram.nu (domain bought 2026-10-20 at Simply.com, same account as
khabar.nu). A minimal list of his projects: khabar.nu with the Khabar editor's day line under
it, and one line about his 3D, BIM and electronics work over four 3D-printed kufi tiles
(no captions, no other text there).

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
| Run in development | `npm run dev` (http://localhost:8790) |
| Run tests | none; check the page at 375 px and 1440 px |
| Build for production | none; `src/` is served as it is |
| Remake tile images | `python scripts/prepare-images.py <lightroom folders>` (needs Pillow) |

## Architecture

`src/index.html` is the whole site. The khabar line is `lede` from
`https://raw.githubusercontent.com/aram313/nyhedsradar/digest/front.json` (public, CORS open,
cached 5 min). Do not change the Khabar repository from this project.

<!-- How the pieces fit together. Where the entry point is. What depends on what.
     Update this when the shape of the project changes. -->

## Project-specific conventions

<!-- Anything that differs from, or adds to, the workspace standard. If nothing
     differs, say so explicitly so the next session does not go looking. -->

## Constraints and gotchas

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
