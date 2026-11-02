const STORAGE_KEY = "theme";

export type Theme = "dark" | "light";

function stored(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    /* private mode: don't persist, still apply */
    return null;
  }
}

function system(): Theme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

const listeners = new Set<() => void>();

function notify(): void {
  for (const fn of listeners) fn();
}

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function getTheme(): Theme {
  const storedTheme = stored();
  const theme = storedTheme ?? system();
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = theme;
  }
  return theme;
}

function setTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode: don't persist, still apply */
  }
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = theme;
  }
  notify();
}

function toggleTheme(): void {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

/**
 * System theme synchronization: when the visitor has no explicit
 * preference (nothing stored), follow the OS `prefers-color-scheme`
 * changes live; once they explicitly choose Light or Dark we stop
 * following the OS so their choice wins across reloads.
 */
function syncSystemTheme(): void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const onChange = (event: MediaQueryListEvent) => {
    if (stored() === null) {
      document.documentElement.dataset.theme = event.matches ? "light" : "dark";
      notify();
    }
  };
  media.addEventListener("change", onChange);
}

if (typeof window !== "undefined") {
  syncSystemTheme();
}

/** React `useSyncExternalStore` server snapshot. */
export function getServerTheme(): Theme {
  return "dark";
}

export { subscribe, getTheme, setTheme, toggleTheme };
