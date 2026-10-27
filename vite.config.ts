/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

/**
 * Base path is configurable in exactly one place: the VITE_BASE env var,
 * defaulting to the GitHub Pages subpath for KaranJoyKundu/portfolio.
 * For a custom domain or local preview, set VITE_BASE=/ .
 */
const base = process.env.VITE_BASE ?? "/portfolio/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
  },
});
