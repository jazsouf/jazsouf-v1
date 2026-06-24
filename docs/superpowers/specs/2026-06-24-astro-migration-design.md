# Migrate jazsouf-v1 from Next.js + Sanity to a static Astro site

**Date:** 2026-06-24
**Status:** Approved (pending spec review)

## Goal

Replace the Next.js + Sanity stack with a minimal static Astro site. The live
site is a single homepage with a handful of lines of text. Strip everything that
isn't needed to render it: no CMS, no React, no Tailwind, no client-side JS.

## Decisions

- **Framework:** Astro, static output. One runtime dependency (`astro`).
- **Hydration:** none. Zero JavaScript shipped.
- **Content:** lives in the repo (no Sanity). Prose in Markdown, labels/meta in a
  typed `.ts` config.
- **Styling:** plain CSS (drop Tailwind). Font: `"Times New Roman", Times, serif`
  (system font — no `@font-face`, no web-font download).
- **Animation:** CSS only. The "Soufiane" → "jazouli" name hover-morph is kept.
- **Components:** native `.astro` (no React).
- **Deploy:** Cloudflare Pages. Build command `astro build`, output dir `dist`.

## Content (migrated from Sanity, now in-repo)

All current live content, pulled once from Sanity before Sanity is removed:

- **Hero** (`src/content/home.md`):
  - `Tech [@parc](https://parc.studio).`
  - `Reach out - [soufiane@parc.studio](mailto:soufiane@parc.studio)`
- **Footer** (`src/content/footer.md`):
  - `[email](mailto:soufiane@parc.studio) | [github](https://github.com/jazsouf) | [bsky](https://bsky.app/profile/jazsouf.bsky.social)`
- **Config** (`src/site.config.ts`):
  - `title: "Soufiane"`
  - `name: { main: "Soufiane", sub: "jazouli" }`
  - `tagline: "Make beautiful things that speak to people"`
  - `copyright: "© 2025 – Soufiane El Jazouli"`
  - `ogImage: "/og.png"`
  - `url: "https://soufianee.com"`
- **OG image:** downloaded once from Sanity's CDN to `public/og.png`.

External links (`https://`) open in a new tab with `rel="noreferrer noopener"`;
`mailto:` links render as plain anchors. This matches the existing behavior.

## Target file layout

```
src/
  layouts/Base.astro        # <html>/<head>: title, meta description, OG/Twitter tags, imports global.css
  pages/index.astro         # composes nav (Name) + hero section + footer section
  pages/404.astro           # minimal not-found
  components/Name.astro      # "Soufiane" -> "jazouli" per-letter CSS hover morph (self-contained styles)
  content/home.md           # hero prose
  content/footer.md         # footer prose
  site.config.ts            # title, name, tagline, copyright, ogImage, url
  styles/global.css         # color custom-properties, resets, .gradientBg/.footerBg, name keyframes
public/
  favicon.ico, favicon.png  # kept
  robots.txt                # kept
  og.png                    # downloaded from Sanity
astro.config.mjs            # output: 'static' (default)
tsconfig.json               # Astro's strict base
package.json                # lean: astro (+ biome dev, optional)
```

The homepage is a single page, so the header and footer sections live inline in
`index.astro`. Only the animated name is extracted into `Name.astro` because its
markup and CSS are substantial.

## Rendering details

- `index.astro` imports `home.md` and `footer.md` and renders their compiled
  HTML (Astro renders Markdown natively — no markdown dependency added).
- `Base.astro` builds `<head>`:
  - `<title>` and `<meta name="description">` from `site.config.ts` /
    a short static description.
  - Open Graph + Twitter card tags using `ogImage` and `url`.
- `Name.astro`: two stacked spans (main + sub), letters split into
  `<span style="--i: N">`; on `:hover` the main slides up and the sub slides in,
  staggered via `transition-delay: calc(var(--i) * 30ms)`. No JS.

## Styling

Ported from the existing `app/globals.css`, keeping only what the homepage uses:

- Color custom-properties (`--color-p-color`, `--color-a-color`, `--color-t-color`,
  etc.).
- Base resets (margins, `img`/`picture` block display, `::selection`,
  `overscroll-behavior`, `scroll-behavior: smooth`).
- `.gradientBg` and `.footerBg` linear-gradients.
- The name-morph keyframes/transitions.
- Global `font-family: "Times New Roman", Times, serif`.

Dropped: Tailwind's `@theme`/`@import "tailwindcss"`, the unused `fade-in` /
`hard-fade-in` / `smooth-fade-in` / `move` keyframes, code-highlight (`sugar-high`)
variables, and the vestigial "goo" SVG filter (it is not visibly applied).

## Removed from the repo

- All Sanity: `sanity-cms/`, `sanity.config.ts`, `sanity.cli.ts`,
  `sanity-typegen.json`, `sanity-cms/extract.json`, and Sanity env vars in
  `.env.local`.
- All Next.js: `app/`, `next.config.ts`, `next-env.d.ts`.
- All React components in `components/` and helpers in `utils/` (replaced by the
  `.astro` files above).
- Tailwind / PostCSS: `postcss.config.js`, `autoprefixer`, `@tailwindcss/postcss`,
  `tailwindcss`.
- Now-unused deps: `react`, `react-dom`, `next`, `next-sanity`, `@sanity/*`,
  `groq`, `@portabletext/react`, `sugar-high`, `lucide-react`, `clsx`, `dayjs`,
  `styled-components`, `babel-plugin-react-compiler`.
- Build artifacts: `out/`, `tsconfig.tsbuildinfo`, `/studio/dist`.

## Kept

- `public/` assets (favicon, robots.txt).
- `biome.json` for lint/format (dev-only; optional but low-cost to keep).
- `pnpm` as package manager; `pnpm-lock.yaml` regenerated.
- `.gitignore` updated: drop `/out/` and `/studio/dist`, add `dist/` and
  `node_modules/`.

## Deploy: Cloudflare Pages

- Static build, no Astro adapter required.
- Cloudflare Pages settings: **build command** `astro build` (or
  `pnpm build`), **output directory** `dist`.
- Optional: a `wrangler.jsonc` with `pages_build_output_dir = "dist"` to support
  `wrangler pages deploy` from the CLI. Not required for the dashboard git
  integration.

## Verification

- `pnpm build` produces `dist/index.html` containing the hero and footer text
  and links, with no `<script>` tags in the output.
- Visual check in a browser: layout matches current site, Times New Roman applied,
  name hover-morph animates, gradients render.
- Links resolve correctly (parc.studio, mailto, github, bsky); external links open
  in a new tab.

## Out of scope

- The old `projects/[slug]`, error pages, and embedded Studio are not recreated.
- Content editing is now a code change (edit the `.md` / `.ts` files and redeploy).
- OG image is used at its original resolution; resizing/optimization is a later
  nicety, not part of this migration.
