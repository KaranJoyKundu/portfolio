import type { Tag } from "@/lib/schema";

export type ProjectFilterValue = "All" | Tag;

const FILTERS: ProjectFilterValue[] = ["All", "Embedded", "Analog", "Robotics", "ML", "Web"];

type Props = {
  value: ProjectFilterValue;
  counts: Map<ProjectFilterValue, number>;
  onChange: (value: ProjectFilterValue) => void;
};

/** Monospaced filter chips — plain buttons with aria-pressed, fully keyboard accessible. */
export function ProjectFilter({ value, counts, onChange }: Props) {
  return (
    <div role="group" aria-label="Filter projects by domain" className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const active = f === value;
        const count = counts.get(f) ?? 0;
        return (
          <button
            key={f}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(f)}
            className={
              active
                ? "rounded-xs bg-btn-bg px-3 py-1.5 font-mono text-xs text-btn-fg"
                : "rounded-xs border border-border px-3 py-1.5 font-mono text-xs text-muted transition-colors duration-[var(--dur-fast)] hover:border-muted hover:text-text"
            }
          >
            {f}
            <span className={active ? "opacity-70" : "opacity-50"}> · {count}</span>
          </button>
        );
      })}
    </div>
  );
}
