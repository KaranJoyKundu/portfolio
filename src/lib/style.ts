const STORAGE_KEY = "style";

export type Style = "a" | "b";

function current(): Style {
  if (typeof document === "undefined") return "a";
  const value = document.documentElement.dataset.style;
  return value === "b" ? "b" : "a";
}

const listeners = new Set<() => void>();

function notify(): void {
  for (const fn of listeners) fn();
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getStyle(): Style {
  return current();
}

export function setStyle(style: Style): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.style = style;
  try {
    localStorage.setItem(STORAGE_KEY, style);
  } catch {
    /* private mode: don't persist, still apply */
  }
  if (style === "b") {
    void ensureStyleFonts("b");
  }
  notify();
}

export function toggleStyle(): void {
  setStyle(current() === "a" ? "b" : "a");
}

/**
 * Style B fonts (Fraunces + Geist) are lazy: only the default style's fonts
 * (Instrument Serif, Inter Tight, IBM Plex Mono) ship in the first load. When
 * the visitor switches to style B we await FontSource's async CSS chunks before
 * the style is applied, so text never swaps mid-sentence.
 */
export async function ensureStyleFonts(style: Style): Promise<void> {
  if (style !== "b") return;
  await Promise.all([import("@fontsource-variable/fraunces"), import("@fontsource/geist-sans")]);
}
