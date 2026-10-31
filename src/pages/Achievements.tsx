import { Section } from "@/components/ui/Section";
import { verifiedAchievements } from "@/lib/content";
import { Seo } from "@/lib/seo";

/**
 * ACHIEVEMENTS — ledger of verified items with source links.
 * The route and nav link only exist when at least one item is verified.
 */
export function Achievements() {
  return (
    <>
      <Seo
        title="Achievements — Karan Joy Kundu"
        description="Verified academic, chess, and project achievements — each with its source."
        path="/achievements"
      />
      <Section
      kicker="05 / Achievements"
      title="Achievements"
      lede="Only items I can point to a source for. Academic, chess, and project records."
    >
      {verifiedAchievements.length === 0 ? (
        <p className="max-w-2xl text-muted">
          No verified achievements published yet.
        </p>
      ) : (
        <ol className="divide-y divide-border border-y border-border">
          {verifiedAchievements.map((a) => (
            <li
              key={a.title}
              className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-1 py-4"
            >
              <p className="font-mono text-xs text-muted">{a.year}</p>
              <p>
                {a.title}
                <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  {a.category}
                </span>
              </p>
              <a
                href={a.source}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-self-end font-mono text-xs text-accent-text underline underline-offset-4"
              >
                source
              </a>
            </li>
          ))}
        </ol>
      )}
      </Section>
    </>
  );
}
