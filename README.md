# Wang Lu · Portfolio

Art, printmaking and curatorial practice. The existing portfolio has been migrated without redesign or content changes.

**Website:** https://wangluprintstudio-web.github.io/

## Structure

- `index.html` — homepage
- `exhibitions.html` — online exhibitions
- `chairs.html` — Chairs: key visual, curatorial foreword and six notebook groups
- `works.html` — printmaking, illustration and material archive
- `practice.html` — studio collaboration, teaching and MIEO Studio
- `about.html` — biography, education, recognition and contact
- `exhibition-between-surfaces.html` — preserves the existing redirect to Chairs
- `assets/` — all images, responsive renditions and the portfolio PDF
- `styles.css`, `exhibition.css`, `portfolio.js` — presentation and interactions

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

See [migration/README.md](migration/README.md). Run `npm run check` to validate that the originally migrated files and all local resource links are unchanged. When making intentional future content changes, update or regenerate the manifest as part of that change.

The image-preview workspace remains a temporary browser-only preview, just as in the original. It does not save or publish uploaded pictures.

## Rights

Artwork, photographs and portfolio content remain the property of their respective rights holders. Making this repository public does not grant a reuse licence to the artwork or photographs.
