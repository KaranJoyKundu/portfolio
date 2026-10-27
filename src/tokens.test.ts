/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";

/**
 * WCAG 2.2 AA contrast gate — change C from the approved plan.
 * Parses the hex values out of tokens.css and verifies every
 * text/background pair the UI actually renders, per theme.
 * Fails the build below AA.
 */

const css = readFileSync(resolve(process.cwd(), "src/styles/tokens.css"), "utf8");

type Palette = Record<string, string>;

function paletteOf(block: string): Palette {
  const vars: Palette = {};
  const re = /--c-([a-z0-9-]+):\s*#([0-9a-fA-F]{6})/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(block)) !== null) {
    vars[match[1] as string] = `#${match[2]}`;
  }
  return vars;
}

/** Extract a CSS declaration block by selector, skipping comments. */
function blockOf(selector: string): string {
  const re = new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\n\\}`);
  const match = re.exec(css);
  expect(match, `tokens.css is missing a ${selector} block`).not.toBeNull();
  return match![1] as string;
}

const dark = paletteOf(blockOf(":root"));
const light = paletteOf(blockOf("\\.light"));

function channel(hex: string, i: number): number {
  const v = Number.parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function luminance(hex: string): number {
  return (
    0.2126 * channel(hex, 0) + 0.7152 * channel(hex, 1) + 0.0722 * channel(hex, 2)
  );
}

function contrast(fg: string, bg: string): number {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/** [foreground, background, minimum] — 4.5 for body text, 3 for large text/UI. */
const SHARED_PAIRS: Array<[fg: string, bg: string, min: number]> = [
  ["text", "bg", 4.5],
  ["text", "surface", 4.5],
  ["text", "surface-2", 4.5],
  ["muted", "bg", 4.5],
  ["muted", "surface", 4.5],
  ["accent-text", "bg", 4.5],
  ["accent-text", "surface", 4.5],
];

const THEME_PAIRS: Record<string, Array<[fg: string, bg: string, min: number]>> = {
  dark: [
    ["on-accent", "btn-bg", 4.5], // amber fill buttons
    ["btn-fg", "btn-bg", 4.5],
    ["accent", "bg", 3],
  ],
  light: [
    ["btn-fg", "btn-bg", 4.5], // ink fill buttons with amber text
    ["accent", "bg", 3],
  ],
};

describe.each([
  ["dark", dark, THEME_PAIRS["dark"] as Array<[string, string, number]>],
  ["light", light, THEME_PAIRS["light"] as Array<[string, string, number]>],
])("WCAG contrast (%s theme)", (_name, palette, themePairs) => {
  for (const [fg, bg, min] of [...SHARED_PAIRS, ...themePairs]) {
    it(`${fg} on ${bg} >= ${min}:1`, () => {
      const fgHex = palette[fg];
      const bgHex = palette[bg];
      expect(fgHex, `token --c-${fg} missing`).toBeDefined();
      expect(bgHex, `token --c-${bg} missing`).toBeDefined();
      const ratio = contrast(fgHex as string, bgHex as string);
      expect(
        ratio,
        `${fg} (${fgHex}) on ${bg} (${bgHex}) is ${ratio.toFixed(2)}:1`
      ).toBeGreaterThanOrEqual(min);
    });
  }
});
