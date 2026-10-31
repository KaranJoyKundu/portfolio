import type { ContentStatus } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { IS_DEV } from "@/lib/content";

/**
 * Development-only flag for unverified content blocks.
 * Production never renders this component's flag — callers instead show
 * designed fallbacks (change A), so this stays an honest dev tool.
 */
export function PlaceholderFlag({
  status,
  className,
}: {
  status: ContentStatus;
  className?: string;
}) {
  if (!IS_DEV || status !== "placeholder") return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs border border-dashed border-accent/70 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-text",
        className
      )}
    >
      Placeholder
    </span>
  );
}
