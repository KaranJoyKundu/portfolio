import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { getTheme, subscribe, toggleTheme, type Theme } from "@/lib/theme";

function subscribeTheme(cb: () => void): () => void {
  return subscribe(cb);
}

export function ThemeToggle() {
  const theme: Theme = useSyncExternalStore(subscribeTheme, getTheme, () => "dark");
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="grid size-9 place-items-center rounded-xs border border-border bg-surface text-muted transition-colors duration-[var(--dur-fast)] hover:text-text hover:border-muted"
    >
      {theme === "dark" ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}
