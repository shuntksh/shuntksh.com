# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

A small static personal site built with Astro and deployed to Cloudflare Pages.
There is no blog, UI framework, CSS framework, or server code.

- `src/pages/index.astro` - the homepage, including the typewriter title script
- `src/pages/thruhiking-bucket-list.astro` - the hiking page, built from
  `src/data/thruhiking.json`
- `src/pages/404.astro` - the not-found page
- `src/layouts/BaseLayout.astro` - shared document shell: head metadata, fonts,
  canonical URL, and Open Graph tags; every page uses it
- `src/components/` - Astro components (marker highlight, trip checklist)
- `src/lib/` - pure TypeScript helpers and their tests
- `src/styles/global.css` - all styles; design tokens are at the top on `:root`
- `src/assets/fonts/` - Atkinson Hyperlegible files and their license, loaded
  through the Astro Fonts API configured in `astro.config.mjs`
- `scripts/og-image/` - HTML template and script for the social preview image;
  run `bun run og` after editing the template to regenerate `public/og-image.png`
- `public/` - favicon, `og-image.png`, `robots.txt`, and `_headers`
  (Cloudflare Pages security and cache headers)

Astro emits a Content Security Policy `<meta>` tag on every page
(`security.csp`). Keep scripts in Astro `<script>` blocks so they get hashed, and
do not load third-party scripts, styles, or fonts without updating the policy.

## Commands

- `bun run dev` - start the local development server
- `bun run build` - build for production
- `bun run og` - regenerate the social preview image (needs Google Chrome or
  `CHROME_PATH`)
- `bun run preview` - build and preview with Cloudflare Pages locally
- `bun run deploy` - build and deploy to Cloudflare Pages
- `bun fmt` - format code (configured in `bunfig.toml`; skips `.astro` files)
- `bun check` - type check (does not cover `.astro` files)

Use only bun for package management. npm, yarn, and pnpm are forbidden.
Dependencies are pinned to exact versions: `bun add --exact <package>`.

There is currently no linter.

## Standards

- TypeScript strict mode (`astro/tsconfigs/strictest`); give functions explicit
  return types
- Use `const` by default and never `var`; handle null and undefined explicitly
- No `console.log` in production code
- Use semantic HTML, ARIA labels, and keyboard support where relevant
- Style with plain CSS and the tokens in `global.css`
- Requires Node 22.23.4 or newer (Astro 7)

## Testing

Use `bun test` with `*.test.ts` or `*.spec.ts` files. New features and bug fixes
require tests when there is testable logic.

## Git

- Commit trailers: `Reported-by:<name>` or `Github-Issue:#<number>`
- Focus commit messages on the problem and solution, not implementation details
