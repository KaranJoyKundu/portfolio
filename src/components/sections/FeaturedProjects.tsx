import { Section } from "@/components/ui/Section";
import { featuredProjects } from "@/lib/content";
import { ProjectCard } from "@/components/features/projects/ProjectCard";

/**
 * Featured layout (approved plan): one large card + two compact,
 * degrading to a single column at 360px.
 */
export function FeaturedProjects() {
  const [first, second, third] = featuredProjects;
  if (!first || !second || !third) return null;

  return (
    <Section id="featured" kicker="Featured" title="Featured projects" className="pb-8 sm:pb-12">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
          <ProjectCard project={first} variant="feature" />
        </div>
        <div>
          <ProjectCard project={second} />
        </div>
        <div>
          <ProjectCard project={third} />
        </div>
      </div>
    </Section>
  );
}
