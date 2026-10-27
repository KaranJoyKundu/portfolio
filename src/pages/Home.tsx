import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";

export function Home() {
  return (
    <>
      <Hero />
      <Section kicker="Featured" title="Featured projects">
        <p className="max-w-2xl text-muted">Coming in the projects milestone.</p>
      </Section>
    </>
  );
}
