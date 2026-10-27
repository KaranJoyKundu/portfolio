import { Section } from "@/components/ui/Section";

/**
 * Route exists but is only reachable when at least one achievement is
 * verified (nav link + direct visits handled by the content loader).
 */
export function Achievements() {
  return (
    <Section kicker="05 / Achievements" title="Achievements">
      <p className="max-w-2xl text-muted">No verified achievements yet.</p>
    </Section>
  );
}
