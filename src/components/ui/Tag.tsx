import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Monospaced technical chip for tech tags and filters. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs border border-border bg-surface px-2 py-0.5 font-mono text-xs text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
