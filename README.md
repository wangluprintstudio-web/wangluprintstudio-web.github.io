# Wang Lu · Portfolio

Art, printmaking and curatorial practice. The original portfolio was migrated without redesign. Subsequent, requested portfolio additions are recorded below.

**Website:** https://wangluprintstudio-web.github.io/

## Structure

- `index.html` — homepage
- `exhibitions.html` — online exhibitions
- `chairs.html` — Chairs: key visual, curatorial foreword and six notebook groups
- `after-617.html` — AFTER 6:17 PM: original graphic design and an AI-assisted curatorial simulation
- `works.html` — graphic design, printmaking, illustration and material archive
- `practice.html` — studio collaboration, teaching and MIEO Studio
- `about.html` — biography, education, recognition and contact
- `exhibition-between-surfaces.html` — preserves the existing redirect to Chairs
- `assets/` — all images, responsive renditions and the portfolio PDF
- `styles.css`, `exhibition.css`, `portfolio.js` — presentation and interactions
- `after617.css`, `after617.js` — the new study and accessible visitor-route tabs

## Portfolio update — 2026-09-27

Added three original poster exercises supplied by Wang Lu, without cropping, retouching or changing their pixels. An accompanying **unrealised curatorial study** develops a bilingual foreword, three viewing units and an interactive conceptual route. The spatial image is AI-generated and labelled as such, not an actual exhibition photograph or evidence of 3D modelling. The venue, dates and Lin Yu credit printed on the posters are fictional assignment details, explained alongside the originals. Existing projects remain available.

Generation provenance and the exact prompt are in [process/after617-image-prompt.txt](process/after617-image-prompt.txt). The image was generated with the built-in image-generation tool; the route is a code-native SVG, not a measured venue or construction drawing.

## Run independently

This is a plain static HTML/CSS/JavaScript website. It requires no ChatGPT account, platform SDK, database, secrets, external image server or build service.

Open `index.html` directly, or install Node.js 18+ and run:

```sh
npm start
```

Then open http://127.0.0.1:4173/. No dependency installation is needed.

## Publish

GitHub Pages: **Deploy from a branch → main → / (root)**.
`.nojekyll` keeps the files as a plain static site. All internal paths are relative, so the site also works under a repository subdirectory.

## Migration record and checks

See [migration/README.md](migration/README.md). Run `npm run check` to validate current HTML pages, local resource links, anchors and unique IDs. The migration manifest remains an immutable historical snapshot, not a claim that later additions are byte-identical. `node scripts/check.cjs --original` compares against that snapshot and will intentionally report later changed files.

The image-preview workspace remains a temporary browser-only preview, just as in the original. It does not save or publish uploaded pictures.

## Rights

Artwork, photographs and portfolio content remain the property of their respective rights holders. Making this repository public does not grant a reuse licence to the artwork or photographs.
