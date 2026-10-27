const STORAGE_KEY = "theme";

export type Theme = "dark" | "light";

function current(): Theme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
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

export function getTheme(): Theme {
  return current();
}

export function setTheme(theme: Theme): void {
  document.documentElement.classList.toggle("light", theme === "light");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode: don't persist, still apply */
  }
  notify();
}

export function toggleTheme(): void {
  setTheme(current() === "dark" ? "light" : "dark");
}
