# Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Next.js + Sanity stack with a static Astro site that renders the single homepage from in-repo content, ships zero JavaScript, and deploys to Cloudflare Pages.

**Architecture:** Astro static output. Content (hero lines, footer links, site metadata) lives in a single typed `src/site.ts`. The page is composed in `src/pages/index.astro` from a `Base.astro` layout and one `Name.astro` component (the CSS-only name hover-morph). Plain CSS, Times New Roman, no client-side JS.

**Tech Stack:** Astro (only runtime dependency), plain CSS, pnpm. Cloudflare Pages for hosting.

## Global Constraints

- Single runtime dependency: `astro`. Do not add React, Tailwind, Sanity, or a Markdown renderer.
- Zero JavaScript shipped: no `client:*` directives; built HTML must contain no `<script>` tags.
- Font: `"Times New Roman", Times, serif`, set globally. No `@font-face`, no web-font download.
- Animation: CSS only.
- Production URL: `https://soufianee.com`.
- Deploy target: Cloudflare Pages — build command `astro build`, output directory `dist`.
- External links (`https://...`) open in a new tab with `rel="noreferrer noopener"`. `mailto:` links render as plain anchors.
- Package manager: pnpm (keep `packageManager` field and `pnpm-lock.yaml`).

## File Structure

- Create: `package.json` (replace), `astro.config.mjs`, `tsconfig.json` (replace), `src/pages/index.astro`, `src/pages/404.astro`, `src/layouts/Base.astro`, `src/components/Name.astro`, `src/site.ts`, `src/styles/global.css`, `public/og.png`, `wrangler.jsonc`
- Delete: `app/`, `components/`, `utils/`, `sanity-cms/`, `sanity.config.ts`, `sanity.cli.ts`, `sanity-typegen.json`, `next.config.ts`, `next-env.d.ts`, `postcss.config.js`, `biome.json`, `out/`, `tsconfig.tsbuildinfo`
- Keep: `public/favicon.ico`, `public/favicon.png`, `public/robots.txt`, `.npmrc`, `.vscode/`, `docs/`

---

### Task 1: Astro scaffold that builds

Replace the Next/Tailwind project config with Astro config and a placeholder page, so `pnpm build` produces a static site. Legacy `app/` files are left in place for now — Astro only builds `src/`, so they don't affect the build.

**Files:**
- Create/replace: `package.json`
- Create: `astro.config.mjs`
- Create/replace: `tsconfig.json`
- Modify: `.gitignore`
- Create: `src/pages/index.astro` (placeholder)

**Interfaces:**
- Produces: a buildable Astro project. `pnpm build` emits `dist/index.html`.

- [ ] **Step 1: Replace `package.json`**

```json
{
  "name": "jazsouf-v1",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5"
  },
  "packageManager": "pnpm@10.8.1+sha512.c50088ba998c67b8ca8c99df8a5e02fd2ae2e2b29aaf238feaa9e124248d3f48f9fb6db2424949ff901cffbb5e0f0cc1ad6aedb602cd29450751d11c35023677"
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://soufianee.com",
});
```

- [ ] **Step 3: Replace `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "src/**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Update `.gitignore`**

Remove the lines `/out/` and `/studio/dist`. Ensure these lines are present (add any that are missing):

```
node_modules/
dist/
.astro/
```

- [ ] **Step 5: Create placeholder `src/pages/index.astro`**

```astro
---
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Soufiane</title>
  </head>
  <body>
    <p>Soufiane</p>
  </body>
</html>
```

- [ ] **Step 6: Install dependencies**

Run: `pnpm install`
Expected: installs `astro`, regenerates `pnpm-lock.yaml`, no errors.

- [ ] **Step 7: Build and verify output exists**

Run: `pnpm build && test -f dist/index.html && echo OK`
Expected: build completes, prints `OK`.

- [ ] **Step 8: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json .gitignore src/pages/index.astro pnpm-lock.yaml
git commit -m "feat: scaffold Astro project"
```

---

### Task 2: In-repo content and OG image

Add the typed content module and download the OG image.

**Files:**
- Create: `src/site.ts`
- Create: `public/og.png`

**Interfaces:**
- Produces:
  - `site: { title: string; description: string; url: string; ogImage: string; name: { main: string; sub: string }; tagline: string; copyright: string }`
  - `hero: Span[][]` where `type Span = { text: string; href?: string }`
  - `footerLinks: Span[]`

- [ ] **Step 1: Create `src/site.ts`**

```ts
export type Span = { text: string; href?: string };

export const site = {
  title: "Soufiane",
  description: "Soufiane El Jazouli — Tech @parc.",
  url: "https://soufianee.com",
  ogImage: "/og.png",
  name: { main: "Soufiane", sub: "jazouli" },
  tagline: "Make beautiful things that speak to people",
  copyright: "© 2025 – Soufiane El Jazouli",
};

export const hero: Span[][] = [
  [
    { text: "Tech " },
    { text: "@parc", href: "https://parc.studio" },
    { text: "." },
  ],
  [
    { text: "Reach out - " },
    { text: "soufiane@parc.studio", href: "mailto:soufiane@parc.studio" },
  ],
];

export const footerLinks: Span[] = [
  { text: "email", href: "mailto:soufiane@parc.studio" },
  { text: "github", href: "https://github.com/jazsouf" },
  { text: "bsky", href: "https://bsky.app/profile/jazsouf.bsky.social" },
];
```

- [ ] **Step 2: Download the OG image**

Run:
```bash
curl -sL "https://cdn.sanity.io/images/awmb54he/production/886912f81d108eabd482d1fdd948de265ad72b28-5520x3420.png" -o public/og.png && test -s public/og.png && echo OK
```
Expected: prints `OK` (file exists and is non-empty).

- [ ] **Step 3: Commit**

```bash
git add src/site.ts public/og.png
git commit -m "feat: add in-repo content and og image"
```

---

### Task 3: Base layout and global CSS

Add the shared HTML shell (head, meta, OG/Twitter tags) and the global stylesheet (ported colors, resets, gradients, Times New Roman). Rewire the placeholder page to use the layout.

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `src/styles/global.css`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `site` from `src/site.ts`.
- Produces: `Base.astro` accepting props `{ title?: string; description?: string }` and a default `<slot />`. Imports `../styles/global.css`.
- Produces (CSS classes used by later tasks): `.nav`, `.nav-link`, `.page`, `.header`, `.hero-line`, `.link`, `.gradientBg`, `.footer`, `.footerBg`, `.footer-content`, `.tagline`, `.copyright`.

- [ ] **Step 1: Create `src/styles/global.css`**

```css
:root {
  --color-p-color: #ffffff;
  --color-s-color: #f5f9fc;
  --color-a-color: #c5c5c5;
  --color-t-color: #1e1e24;
  --serif: "Times New Roman", Times, serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  min-width: 360px;
  scrollbar-gutter: stable;
  overflow-x: hidden;
  background: var(--color-a-color);
  font-size: 16px;
  line-height: 1.4;
  font-family: var(--serif);
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  min-height: 100svh;
  background: var(--color-p-color);
  color: var(--color-t-color);
  scroll-behavior: smooth;
}

html,
body {
  overscroll-behavior: none;
}

::selection {
  background-color: var(--color-a-color);
  color: var(--color-s-color);
}

img,
picture {
  max-width: 100%;
  display: block;
}

h1,
h2,
h3,
h4,
p,
figure,
blockquote {
  margin-block-end: 0;
}

a {
  color: currentColor;
  text-decoration-skip-ink: auto;
}

.link {
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.3s;
}

.link:hover {
  color: var(--color-t-color);
}

/* Navbar */
.nav {
  position: absolute;
  z-index: 20;
  top: 1.25rem;
  left: 2.5rem;
}

.nav-link {
  display: inline-block;
  text-transform: lowercase;
  font-size: 1.25rem;
  text-decoration: none;
}

/* Page + hero */
.page {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}

.header {
  position: relative;
  z-index: 10;
  display: grid;
  place-content: center;
  min-height: 95svh;
  padding: 0.75rem;
  text-align: center;
  line-height: 1.6;
}

.hero-line {
  font-size: 1.25rem;
  max-width: 64rem;
  padding-top: 0.375rem;
}

.gradientBg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100vw;
  min-height: 100svh;
  overflow: hidden;
  background: linear-gradient(
    177deg,
    var(--color-a-color) 10%,
    var(--color-p-color) 80%,
    var(--color-p-color) 100%
  );
}

/* Footer */
.footer {
  position: relative;
}

.footerBg {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
  width: 100vw;
  min-height: 100svh;
  overflow: hidden;
  background: linear-gradient(
    183deg,
    var(--color-p-color) 10%,
    var(--color-a-color) 80%,
    var(--color-a-color) 100%
  );
}

.footer-content {
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100svh;
  padding: 1.5rem 0;
  text-align: center;
}

.tagline {
  font-size: 1.875rem;
  padding: 0 10%;
  line-height: 1.6;
}
```

- [ ] **Step 2: Create `src/layouts/Base.astro`**

```astro
---
import { site } from "../site";
import "../styles/global.css";

interface Props {
  title?: string;
  description?: string;
}

const { title = site.title, description = site.description } = Astro.props;
const ogImage = new URL(site.ogImage, site.url).href;
const canonical = new URL(Astro.url.pathname, site.url).href;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="canonical" href={canonical} />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Rewire `src/pages/index.astro` to use the layout**

```astro
---
import Base from "../layouts/Base.astro";
---

<Base>
  <main class="page">
    <section class="header">
      <p class="hero-line">Soufiane</p>
    </section>
  </main>
</Base>
```

- [ ] **Step 4: Build and verify the font and a meta tag are present**

Run:
```bash
pnpm build && grep -q "Times New Roman" dist/_astro/*.css && grep -q 'property="og:image"' dist/index.html && echo OK
```
Expected: prints `OK`.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Base.astro src/styles/global.css src/pages/index.astro
git commit -m "feat: add base layout and global css"
```

---

### Task 4: Animated name component (CSS-only)

Build the "Soufiane" → "jazouli" hover-morph as a self-contained `.astro` component with scoped styles. Per-letter staggered slide, no JS.

**Files:**
- Create: `src/components/Name.astro`

**Interfaces:**
- Produces: `Name.astro` accepting props `{ main: string; sub?: string }` (defaults `sub` to `main`).

- [ ] **Step 1: Create `src/components/Name.astro`**

```astro
---
interface Props {
  main: string;
  sub?: string;
}

const { main, sub = main } = Astro.props;
const letters = (word: string) =>
  word.split("").map((c) => (c === " " ? " " : c));
---

<span class="name">
  <span class="sr-only">{main}</span>
  <span class="name-inner" aria-hidden="true">
    <span class="name-main">
      {letters(main).map((c, i) => <span class="ltr" style={`--i:${i}`}>{c}</span>)}
    </span>
    <span class="name-sub">
      {letters(sub).map((c, i) => <span class="ltr" style={`--i:${i}`}>{c}</span>)}
    </span>
  </span>
</span>

<style>
  .name {
    display: inline-block;
    font-weight: 500;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  .name-inner {
    position: relative;
    display: block;
    overflow: hidden;
  }

  .name-main {
    display: inline-block;
  }

  .name-sub {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
  }

  .ltr {
    display: inline-block;
    transition: transform 0.35s ease-in-out;
    transition-delay: calc(var(--i) * 30ms);
  }

  .name-sub .ltr {
    transform: translateY(100%);
  }

  .name:hover .name-main .ltr {
    transform: translateY(-100%);
  }

  .name:hover .name-sub .ltr {
    transform: translateY(0);
  }
</style>
```

- [ ] **Step 2: Build and verify the component compiles (no usage yet)**

Run: `pnpm build && echo OK`
Expected: prints `OK` (build succeeds; component is valid even though not yet imported).

- [ ] **Step 3: Commit**

```bash
git add src/components/Name.astro
git commit -m "feat: add css-only animated name component"
```

---

### Task 5: Compose the homepage

Replace the placeholder `index.astro` with the full page: navbar (Name), hero section from `hero`, footer from `footerLinks` + tagline + copyright.

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `Base.astro`, `Name.astro`, and `{ site, hero, footerLinks }` from `src/site.ts`.

- [ ] **Step 1: Replace `src/pages/index.astro`**

```astro
---
import Base from "../layouts/Base.astro";
import Name from "../components/Name.astro";
import { site, hero, footerLinks } from "../site";

const isExternal = (href?: string) => !!href && href.startsWith("http");
const extAttrs = (href?: string) =>
  isExternal(href) ? { target: "_blank", rel: "noreferrer noopener" } : {};
---

<Base>
  <nav class="nav">
    <a class="nav-link" href="/" aria-label={site.name.main}>
      <Name main={site.name.main} sub={site.name.sub} />
    </a>
  </nav>

  <main class="page">
    <section id="header" class="header">
      {
        hero.map((line) => (
          <p class="hero-line">
            {line.map((span) =>
              span.href ? (
                <a class="link" href={span.href} {...extAttrs(span.href)}>
                  {span.text}
                </a>
              ) : (
                span.text
              ),
            )}
          </p>
        ))
      }
    </section>
    <div class="gradientBg"></div>
  </main>

  <footer class="footer">
    <div class="footerBg"></div>
    <div class="footer-content">
      <p class="footer-links">
        {
          footerLinks.map((link, i) => (
            <Fragment>
              {i > 0 && " | "}
              <a class="link" href={link.href} {...extAttrs(link.href)}>
                {link.text}
              </a>
            </Fragment>
          ))
        }
      </p>
      <p class="tagline">{site.tagline}</p>
      <p class="copyright">{site.copyright}</p>
    </div>
  </footer>
</Base>
```

- [ ] **Step 2: Build and verify content + zero scripts**

Run:
```bash
pnpm build
grep -q "parc.studio" dist/index.html \
  && grep -q "github.com/jazsouf" dist/index.html \
  && grep -q "bsky.app" dist/index.html \
  && grep -q "Make beautiful things" dist/index.html \
  && grep -q 'target="_blank"' dist/index.html \
  && [ "$(grep -c "<script" dist/index.html)" -eq 0 ] \
  && echo OK
```
Expected: prints `OK` (all content present, external links open in new tab, no `<script>` tags).

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: compose homepage"
```

---

### Task 6: 404 page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create `src/pages/404.astro`**

```astro
---
import Base from "../layouts/Base.astro";
---

<Base title="Not found — Soufiane">
  <main class="page">
    <section class="header">
      <p class="hero-line">
        Page not found. <a class="link" href="/">Go home</a>.
      </p>
    </section>
  </main>
</Base>
```

- [ ] **Step 2: Build and verify 404 output**

Run: `pnpm build && grep -q "Page not found" dist/404.html && echo OK`
Expected: prints `OK`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: add 404 page"
```

---

### Task 7: Remove the legacy Next.js + Sanity codebase

Delete everything the Astro site replaced. The build must still pass afterward (Astro only depends on `src/`, `public/`, and the root config).

**Files:**
- Delete: `app/`, `components/`, `utils/`, `sanity-cms/`, `sanity.config.ts`, `sanity.cli.ts`, `sanity-typegen.json`, `next.config.ts`, `next-env.d.ts`, `postcss.config.js`, `biome.json`, `out/`, `tsconfig.tsbuildinfo`

- [ ] **Step 1: Delete legacy files and directories**

Run:
```bash
git rm -r --quiet app components utils sanity-cms \
  sanity.config.ts sanity.cli.ts sanity-typegen.json \
  next.config.ts next-env.d.ts postcss.config.js biome.json
git rm -r --quiet --cached out 2>/dev/null || true
rm -rf out tsconfig.tsbuildinfo
echo done
```
Expected: prints `done`. (`out/` is git-ignored after Task 1, so it may only need removal from disk.)

- [ ] **Step 2: Verify no source file references the removed stacks**

Run:
```bash
grep -rEl "next/|next-sanity|@sanity|sanity-cms|tailwindcss|styled-components" src astro.config.mjs package.json && echo "FOUND REFS" || echo OK
```
Expected: prints `OK` (no matches).

- [ ] **Step 3: Clean install and build**

Run: `pnpm install && pnpm build && test -f dist/index.html && echo OK`
Expected: prints `OK`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove legacy next.js and sanity codebase"
```

---

### Task 8: Cloudflare Pages config and final verification

Add a `wrangler.jsonc` so the output directory is explicit for both the dashboard and the `wrangler pages` CLI, and do a final end-to-end check.

**Files:**
- Create: `wrangler.jsonc`

- [ ] **Step 1: Create `wrangler.jsonc`**

```jsonc
{
  "name": "jazsouf-v1",
  "compatibility_date": "2026-06-24",
  "pages_build_output_dir": "dist"
}
```

- [ ] **Step 2: Final clean build and full content verification**

Run:
```bash
rm -rf dist
pnpm build
test -f dist/index.html \
  && test -f dist/404.html \
  && test -f dist/og.png \
  && grep -q "Times New Roman" dist/_astro/*.css \
  && grep -q "soufiane@parc.studio" dist/index.html \
  && [ "$(grep -c "<script" dist/index.html)" -eq 0 ] \
  && echo OK
```
Expected: prints `OK`.

- [ ] **Step 3: Visual check (manual)**

Run: `pnpm dev`
Open the printed local URL and confirm:
- Times New Roman renders throughout.
- Hovering the name in the top-left morphs "Soufiane" → "jazouli".
- Hero text is centered; top gradient and bottom footer gradient render.
- Links (`@parc`, email, github, bsky) work; external links open in a new tab.

Stop the dev server when done.

- [ ] **Step 4: Commit**

```bash
git add wrangler.jsonc
git commit -m "chore: add cloudflare pages config"
```

- [ ] **Step 5: Cloudflare Pages dashboard settings (manual, outside the repo)**

In the Cloudflare Pages project connected to this repo, set:
- Framework preset: Astro (or None).
- Build command: `pnpm build`.
- Build output directory: `dist`.
- Production branch: `main` (after this branch is merged).

---

## Self-Review

**Spec coverage:**
- Astro static, one dependency → Task 1. ✓
- Content in-repo (`.ts`) → Task 2 (`src/site.ts`). ✓ (Plan refines the spec's `.md`+`.ts` split to a single `.ts` to keep zero extra deps and preserve new-tab link behavior.)
- Plain CSS + Times New Roman → Task 3. ✓
- CSS-only name animation → Task 4. ✓
- Homepage composition (nav/hero/footer) → Task 5. ✓
- 404 → Task 6. ✓
- OG image downloaded → Task 2; meta/OG tags → Task 3. ✓
- Remove Next/Sanity/Tailwind/unused deps → Task 7. ✓
- Cloudflare Pages deploy → Task 8. ✓
- External links new tab / mailto plain → Task 5 (`extAttrs`). ✓

**Placeholder scan:** No TBD/TODO; every code step contains complete file contents.

**Type consistency:** `Span` defined in Task 2 is consumed in Task 5; `Name.astro` props `{ main, sub }` defined in Task 4 match the usage in Task 5; CSS class names produced in Task 3 match those used in Tasks 5–6.
