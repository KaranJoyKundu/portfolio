import { Link } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { PlaceholderFlag } from "@/components/ui/PlaceholderFlag";
import { verifiedLabEntries, projects, IS_DEV } from "@/lib/content";

const BENCH_SLUGS = ["lm393-battery-fuel-gauge", "opamp-ecg-heart-rate-monitor", "ppg-pulse-sensor"];

export function Engineering() {
  const bench = BENCH_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p) => p !== undefined
  );

  return (
    <Section
      kicker="03 / Engineering"
      title="Engineering"
      lede="Circuits, robotics, and hardware experiments — documented like a lab notebook: what was wired, what was measured, what broke."
    >
      {verifiedLabEntries.length > 0 ? (
        <ol className="divide-y divide-border border-y border-border">
          {verifiedLabEntries.map((entry) => (
            <li key={entry.slug} className="py-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <time className="font-mono text-xs text-accent-text" dateTime={entry.date}>
                  {entry.date}
                </time>
                <h2 className="font-display text-lg font-medium">{entry.title}</h2>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-muted">{entry.excerpt}</p>
              <div className="mt-2 flex gap-2">
                {entry.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </li>
          ))}
        </ol>
      ) : IS_DEV ? (
        <div className="rounded-md border border-dashed border-border bg-surface p-6">
          <div className="flex items-center gap-2">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              lab notebook · no verified entries
            </p>
            <PlaceholderFlag status="placeholder" />
          </div>
          <p className="mt-2 text-sm text-muted">Add entries to src/content/lab-entries.ts.</p>
        </div>
      ) : (
        <p className="max-w-2xl text-muted">
          The lab notebook starts soon. Entries will cover circuit builds,
          measurements, and the lessons in between.
        </p>
      )}

      <h2 className="mt-14 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        On the bench
      </h2>
      <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {bench.map((p) => (
          <li key={p.slug} className="rounded-md border border-border bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              {p.status.replace("-", " ")}
            </p>
            <h3 className="mt-2 font-display text-lg font-medium">
              <Link
                to={`/projects/${p.slug}`}
                className="hover:text-accent-text"
              >
                {p.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-muted">{p.summary}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
