# Portfolio — Handoff Notes

Personal portfolio for **Karan Joy Kundu** — React 19 + TypeScript (strict) +
Vite 8 + Tailwind CSS 4 (CSS-variable tokens) + Motion + Lucide + Zod + Vitest,
deployed to GitHub Pages at `https://karanjoykundu.github.io/portfolio/`.

## Current status (as of 2026-11-01)

- **Build**: green via `npm run check` (typecheck + lint + 29 tests + build).
  - Lint: 1 pre-existing warning (`src/lib/seo.tsx:43 react-refresh/only-export-components`).
  - Build: main JS **129.95 kB gz** (< 150 KB budget ✓), CSS 6.91 kB gz,
    fonts self-hosted via Fontsource (Instrument Serif, Inter Tight, IBM Plex Mono
    eager; Fraunces + Geist lazy for style B).
- **Design**: two switchable visual directions (A "Instrument Ledger", B
  "Amber Trace") via `data-style` on `<html>`; dark default, `.light` overrides.
  Accent `#F5B759` (dark) / `#B4771A` UI (light). Theme toggle is a real
  `role="switch"` button; style toggle `role="group"` + `aria-pressed`.
- **Performance** (Lighthouse, Playwright Chromium headless, local preview at
  `/portfolio/`):
  - Desktop preset: **Performance 100, LCP 0.7 s, FCP 0.2 s, TBT 0 ms, CLS 0**,
    a11y/BP/SEO 100.
  - Mobile-emulated home: **Performance 0.91, LCP 3.5 s, FCP 0.8 s, TBT 0, CLS 0**,
    a11y/BP/SEO 100.
  - Kairos project page (mobile): **Performance 0.87, LCP 2.7 s, FCP 1.6 s, TBT 240 ms, CLS 0.13**.
  - LCP element = hero paragraph; render delay ~574–662 ms (font settle).
    Critical font preloads added to `index.html` (post this writing) — desktop
    re-verified at LCP 0.7 s / perf 100.
- **Content**: everything unverified is marked `contentStatus: "placeholder"` and
  suppressed in production (tests enforce). Kairos case study shipped as
  `verified` (status `in-progress`). Bee robot content `verified`/shipped.
  `karan.md` is a private working doc — **never commit it**.
- **Deploy**: not yet done — gh CLI not installed/auth'd as of handoff.

## Commands

- `npm.cmd run check` — full gate (typecheck, lint, test, build).
- `npm.cmd run dev` / `npm.cmd run preview -- --host 127.0.0.1 --port 4173`
  (preview serves `dist/` at `/portfolio/`).
- Tests: 29 across 3 files (`src/tokens.test.ts`, content/schema tests, `App.test.tsx`).
- Lighthouse (global install): run via
  `node "C:\Users\pc\AppData\Roaming\npm\node_modules\lighthouse\cli\index.js" <url> --output=json --output-path="C:\Users\pc\AppData\Local\Temp\opencode\lhr-<name>.json --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new --no-sandbox" [--preset=desktop] --quiet`
  with `$env:CHROME_PATH = "C:\Users\pc\AppData\Local\ms-playwright\chromium-1208\chrome-win64\chrome.exe"`.

## Deployment checklist (remaining)

1. `winget install --id GitHub.cli -e --accept-package-agreements`
2. `gh auth status` → if needed, `gh auth login`
3. `gh repo create KaranJoyKundu/portfolio --public` (from a git repo — `git init` first if needed)
4. Push, enable GitHub Pages (workflow: `.github/workflows/deploy.yml` → source: GitHub Actions)
5. Post-deploy: lighthouse on the live URL, verify `/portfolio/` deep links via 404 shim.

## Open items

- Facebook profile photo / demo video public URLs (user-supplied when verified).
- Mobile-emulated Lighthouse perf bar: home at 0.91 / LCP 3.5 s (desktop passes all
  bars; mobile LCP fix still open — candidates: reduce hero reveal delay, font handling).
- Final commit + `HANDOFF.md` / `AGENTS.md` authorship.
