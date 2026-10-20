# aram.nu

Aram's own page at aram.nu: a quiet, black, lowercase list of his projects.

## What this is

One page with two entries. **khabar.nu** links to the news app and shows, under its name,
the one line the Khabar editor writes about the day's news (refreshed every five minutes).
Under the heading **3d print** are four 3D-printed square-kufi tiles; a tap
opens a tile large on black.

## Status

**active** · Created 2026-10-20 · Type: `web-app` · Not published yet (see below).

## Run it locally

Requirements: Python (`py`).

```
npm run dev
```

Then open http://localhost:8790. (Without npm: `py -m http.server 8790 --directory src`.)

## How it is built

- `src/index.html` is the whole site: markup, style and a small script. No build step.
- The khabar line comes from `front.json` on the `digest` branch of the public
  `aram313/nyhedsradar` repository (the `lede` field). If it cannot be read, the line says
  "dagens nyheder".
- `src/img/` holds web copies of the tile photos, made by `scripts/prepare-images.py` from
  Aram's Lightroom exports (`Downloads\lightroom-download-2024-07-02T12_03_21Z` and
  `…T12_53_12Z`). Change which tiles show in `SHOWN` there and in `TILES` in the page.

## Publishing

`.github/workflows/pages.yml` publishes `src/` to GitHub Pages on every push to `main`.
Publishing needs a GitHub repository with Pages set to "GitHub Actions" and the custom
domain `aram.nu`, plus DNS at Simply.com: four `A` records for `aram.nu` to
185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, and a `CNAME` for
`www` to `aram313.github.io`.
