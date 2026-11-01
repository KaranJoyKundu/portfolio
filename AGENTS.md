# AGENTS.md — Portfolio repo guide

React 19 + TypeScript (strict) + Vite 8 + Tailwind CSS 4 + Motion + Lucide +
Zod + Vitest. Deployed to GitHub Pages at `/portfolio/` (base path configurable
via `VITE_BASE`).

## Commands (Windows: use `npm.cmd`, not `npm`)

```bash
npm.cmd run check   # typecheck && lint && test && build — the CI gate, run before deploy
npm.cmd run dev
npm.cmd run preview -- --host 127.0.0.1 --port 4173   # serves dist/ at /portfolio/
npm.cmd run test
```

## Conventions

- Design tokens live in `src/styles/tokens.css` (`--c-*`, font vars, radii, motion).
  Tailwind utilities map via `@theme inline`; never hardcode hex in components.
  Contrast (WCAG AA) enforced by `src/tokens.test.ts`.
- Motion contract: ≤ 320 ms, opacity/transform only, static under
  `prefers-reduced-motion`.
- Content: `src/content/` only; unverified fields use `contentStatus: "placeholder"`
  and are suppressed in production. Tests fail on invalid content or placeholders
  that should be real.
- Fonts: Fontsource self-hosted. Fraunces (variable display) + Geist Sans (body) are
  the eager critical faces; IBM Plex Mono (labels) eager. Design B is the definitive
  production design (the Style A switch and its font packages were removed).
- Theme (`data-theme`) is persisted; inline script in `index.html` sets it before
  paint (no flash). Live OS `prefers-color-scheme` changes follow only while no
  explicit preference is stored.
- LCP: keep hero text in initial render; critical font preloads live in `index.html`.
- Base path `/portfolio/`: `vite.config.ts` (`VITE_BASE`), og/sitemap/robots URLs,
  and the GH Pages workflow all derive from it.

## Quality bars

- JS < 150 KB gz, LCP < 2.5 s, Lighthouse perf/a11y/BP/SEO > 95–100, contrast AA.
- No AI-template tells (cursor glow, tilt, typewriter, glassmorphism, etc.).
- Accessibility: semantic landmarks, focus states, `prefers-reduced-motion`.

## Deploy

`.github/workflows/deploy.yml` runs `npm run verify` → build → deploy on push to
`main`, plus a scheduled (every 6 h) and manual (`workflow_dispatch`) GitHub
project-discovery sync (`scripts/sync-github-projects.mjs`) that runs before the
build on non-push events. GitHub Pages source must be **GitHub Actions**.

## GitHub project auto-sync (Phase 12)

- `scripts/sync-github-projects.mjs` + `scripts/sync-github-projects.test.mjs`.
- Cron `0 */6 * * *` in the deploy workflow; manual via `workflow_dispatch`.
- Writes `src/content/generated/github-projects.json` (committed default: `[]`) and
  reads manual overrides from `src/content/generated/github-overrides.json`.
- Curated (`src/content/projects/*.ts`) always win on slug collision; auto entries
  are placeholder until overridden. Generated entries must pass `projectSchema`.
- Fail-safe: API failure aborts the deploy (last known-good catalog stays live).
