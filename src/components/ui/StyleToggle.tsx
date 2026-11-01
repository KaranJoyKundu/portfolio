import { useSyncExternalStore } from "react";
import { getStyle, setStyle, subscribe, type Style } from "@/lib/style";

const OPTIONS: ReadonlyArray<{ value: Style; label: string; title: string }> = [
  { value: "a", label: "A", title: "Style A — Instrument Ledger" },
  { value: "b", label: "B", title: "Style B — Amber Trace" },
];

function subscribeStyle(cb: () => void): () => void {
  return subscribe(cb);
}

export function StyleToggle() {
  const style: Style = useSyncExternalStore(subscribeStyle, getStyle, () => "a");

  return (
    <div
      role="group"
      aria-label="Design direction"
      className="flex items-center rounded-xs border border-border bg-surface"
    >
      {OPTIONS.map((option) => {
        const active = style === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            title={option.title}
            onClick={() => setStyle(option.value)}
            className={`px-3 py-1.5 font-mono text-xs transition-colors duration-[var(--dur-fast)] ${
              active
                ? "bg-btn-bg text-btn-fg"
                : "text-muted hover:text-text"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
