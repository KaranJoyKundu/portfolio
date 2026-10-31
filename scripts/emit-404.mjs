#!/usr/bin/env node
/**
 * Emits dist/404.html — the GitHub Pages SPA deep-link shim — with the
 * correct base path baked in from the single VITE_BASE source (same
 * default as vite.config.ts). Run right after `vite build`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const base = process.env.VITE_BASE ?? "/portfolio/";
const app = base.endsWith("/") ? base : `${base}/`;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Karan Joy Kundu</title>
    <script>
      /* GitHub Pages SPA fallback: stash the real URL, bounce to the app. */
      (function () {
        try { sessionStorage.setItem("redirect", location.href); } catch (e) {}
        location.replace(${JSON.stringify(app)});
      })();
    </script>
  </head>
  <body></body>
</html>
`;

const dist = resolve(process.cwd(), "dist");
mkdirSync(dist, { recursive: true });
writeFileSync(resolve(dist, "404.html"), html);
console.log(`emitted dist/404.html with base ${app}`);
