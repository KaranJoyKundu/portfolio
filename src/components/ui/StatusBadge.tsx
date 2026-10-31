import type { ProjectStatus } from "@/lib/schema";
import { cn } from "@/lib/utils";

const styles: Record<ProjectStatus, { label: string; className: string }> = {
  shipped: { label: "Shipped", className: "border-accent/60 text-accent-text" },
  "in-progress": { label: "In progress", className: "border-border text-muted" },
  concept: { label: "Concept", className: "border-dashed border-border text-muted" },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = styles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em]",
        s.className
      )}
    >
      {status === "in-progress" && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
        </span>
      )}
      {s.label}
    </span>
  );
}
