# Migration inventory · 2026-09-21

Original: https://wanglu-print-studio-portfolio.wangluapple.chatgpt.site/

The original frontend source was available, so no screenshot-based reconstruction or redesign was needed. Original site files are copied byte-for-byte. Only independent project documentation, a local preview server, validation and GitHub Pages support files are added.

## Page structure retained

| Page | Main content |
| --- | --- |
| Home | Five-link navigation, introductory statement, Chairs feature, three category links, footer |
| Exhibitions | Chairs exhibit entry, curatorial approach |
| Chairs | Title and credit, key visual, foreword, observation, product overview, six groups, closing links |
| Works | Chairs entry, printmaking, illustration, ceramics, temporary image-preview workspace |
| Practice | Artist assistant, screenprinting, teaching support, MIEO Studio historical data |
| About | Current curation, portrait, education, tools, language, recognition, contact, PDF |
| Previous exhibition URL | Redirects to Chairs, as on the original website |

## Text, images and visual style

- Existing Chinese and English text, titles, captions, alt text and metadata are preserved.
- Original off-white background, serif headings, type sizes, spacing, image proportions and responsive rules are preserved.
- All original public image files and responsive variants are local; Chairs includes all 20 supplied images.
- Fonts remain the original system-font stack. No remote font service is required. Rendering can vary slightly by the visitor's installed fonts, just as before migration.
- The portfolio PDF is unchanged.

## Interaction retained

- Chinese / English switching and browser-local language preference.
- Image enlargement dialog, close button, outside click and Escape.
- Page navigation, exhibition anchors, product index, back-to-top and legacy homepage anchors.
- Email and LinkedIn links and portfolio PDF access.
- Temporary image-preview controls, including file-type/size checks and captions. These were never a persistent CMS and are not presented as one now.

## Platform-specific code excluded

Cloudflare injects its own script into the original hosted HTML response. That host-specific script is not part of the portfolio source and is not copied. No ChatGPT access gate, Sites configuration, source credential, internal file path or unrelated job application document is included.

`original-file-manifest.json` records the original public-file sizes and SHA-256 fingerprints, checked against the original production responses (excluding only that injected hosting script for HTML). It provides a reproducible integrity check for migration.

## Intended deployment

Public repository: `wangluprintstudio-web/wangluprintstudio-web.github.io`.
GitHub Pages uses `main`, repository root, with `.nojekyll`.
The existing `wangluapple.github.io` repository and the original Sites website are left intact.
