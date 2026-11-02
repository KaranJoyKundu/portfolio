# Portfolio — Handoff Notes

Personal portfolio for **Karan Joy Kundu** — React 19 + TypeScript (strict) +
Vite 8 + Tailwind CSS 4 (CSS-variable tokens) + Motion + Lucide + Zod + Vitest,
deployed to GitHub Pages at `https://karanjoykundu.github.io/portfolio/`.

## Current status (as of 2026-11-01, branch `feat/design-b-final-security-performance`)

- **Branch**: `feat/design-b-final-security-performance` (from `main` @ `e5b3fa7`);
  NOT merged. Work so far: Design B finalization, theme/system fix, canonical URLs,
  mobile-nav fix, security hardening, SEO tests, GitHub sync system.
- **Build**: green via `npm run check` (typecheck + lint + **34 tests** + build).
  - Lint: 0 errors (3 pre-existing-style fast-refresh warnings in `src/lib/seo.tsx`).
  - Build: main JS **129.94 kB gz** (< 150 KB budget ✓), CSS 6.70 kB gz.
- **Design**: **Design B is the definitive production design** (Fraunces + Geist Sans +
  IBM Plex Mono labels, amber `#F5B759` accent). Style A switch, `data-style`, and the
  Style A font packages were removed. Dark default, light overrides.
- **Performance** (Lighthouse, Playwright Chromium headless, local preview at
  `/portfolio/`; live site deployed at `https://karanjoykundu.github.io/portfolio/`):
  - Live post-deploy: desktop Perf **0.99, LCP 0.8 s, FCP 0.6 s, TBT 0, CLS 0**, a11y/
    BP/SEO **100**; mobile Perf **0.95, LCP 3.0 s, FCP 0.8 s, TBT 0, CLS 0**, a11y/BP/SEO
    **100**. Local pre-deploy mobile-emulated: LCP 3.4–3.5 s; desktop 0.7–0.8 s.
  - **Open perf bar**: mobile-emulated LCP still above 2.5 s target (3.0 s live / 3.5 s
    local; desktop 0.8 s passes). Not yet re-measured after Design B switch.
- **Content**: everything unverified is marked `contentStatus: "placeholder"` and
  suppressed in production (tests enforce). Kairos case study shipped as `verified`
  (status `in-progress`). Bee robot content `verified`/shipped.
  `karan.md` is a private working doc — **never commit it**.
- **Deploy**: done earlier — workflow run `41285531119` succeeded; live site verified
  (HTTP 200, assets/CSS/fonts/OG OK, deep-link SPA fallback OK).

## GitHub project auto-sync (Phase 12, new on this branch)

- `scripts/sync-github-projects.mjs` (+ tests, mock-fetch based, 5 tests) discovers
  public repos of `KaranJoyKundu` (skip: private/fork/archived/portfolio), merges
  overrides from `src/content/generated/github-overrides.json`, writes generated
  catalog, validates via `projectSchema`.
- Wired into `.github/workflows/deploy.yml`: schedule cron `0 */6 * * *` +
  `workflow_dispatch`; sync step skipped on plain pushes; deploy skipped if sync or
  verify fails.
- Committed generated defaults: `src/content/generated/github-projects.json` = `[]`,
  `github-overrides.json` = `{}`.

## Open items

- Facebook profile photo / demo video public URLs (user-supplied when verified).
- Mobile-emulated Lighthouse perf bar: home at 3.0 s LCP live (desktop passes all
  bars; mobile LCP fix still open — candidates: hero reveal delay, font handling).
- Branch protection / Dependabot pending owner configuration (see final report).
- Final summary + PR/branch link for review before merge.
