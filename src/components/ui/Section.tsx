import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  /** Mono kicker above the heading, e.g. "02 / About". */
  kicker?: string;
  title: string;
  lede?: string;
  children: ReactNode;
  className?: string;
  /** Render a heading level appropriate for the page outline. */
  as?: "h1" | "h2";
  id?: string;
};

export function Section({
  kicker,
  title,
  lede,
  children,
  className,
  as: Heading = "h2",
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn("mx-auto max-w-6xl px-6 py-16 sm:py-20", className)}>
      {kicker && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
          {kicker}
        </p>
      )}
      <Heading className="font-display text-2xl font-medium sm:text-3xl">{title}</Heading>
      {lede && <p className="mt-3 max-w-2xl text-muted">{lede}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
