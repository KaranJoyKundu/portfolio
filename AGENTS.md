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
- Fonts: Fontsource self-hosted. Instrument Serif + Inter Tight + IBM Plex Mono are
  eager (critical); Fraunces + Geist lazy-load for style B (`src/lib/style.ts`).
- Theme (`data-theme`) and style (`data-style`) are persisted; inline script in
  `index.html` sets them before paint (no flash).
- LCP: keep hero text in initial render; critical font preloads live in `index.html`.
- Base path `/portfolio/`: `vite.config.ts` (`VITE_BASE`), og/sitemap/robots URLs,
  and the GH Pages workflow all derive from it.

## Quality bars

- JS < 150 KB gz, LCP < 2.5 s, Lighthouse perf/a11y/BP/SEO > 95–100, contrast AA.
- No AI-template tells (cursor glow, tilt, typewriter, glassmorphism, etc.).
- Accessibility: semantic landmarks, focus states, `prefers-reduced-motion`.

## Deploy

`.github/workflows/deploy.yml` runs `npm run check` → build → deploy on push to
`main`. GitHub Pages source must be **GitHub Actions**.
