import type { VerifiedTimelineEntry } from "@/lib/schema";

/**
 * Vertical learning timeline drawn as a trace line with node dots.
 * Rendered entries are always verified (loader guarantees it).
 */
export function Timeline({ entries }: { entries: VerifiedTimelineEntry[] }) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-6">
      {entries.map((entry) => (
        <li key={entry.title} className="relative">
          <span
            aria-hidden
            className="absolute -left-[26px] top-1 size-2 rounded-full border border-accent bg-bg"
          />
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
            {entry.period}
          </p>
          <h3 className="mt-1 font-display text-lg font-medium">{entry.title}</h3>
          {entry.body && <p className="mt-1 text-sm text-muted">{entry.body}</p>}
        </li>
      ))}
    </ol>
  );
}
