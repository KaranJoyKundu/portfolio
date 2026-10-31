import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { projects } from "@/lib/content";
import { Seo } from "@/lib/seo";
import type { Tag as TagType } from "@/lib/schema";
import { ProjectCard } from "@/components/features/projects/ProjectCard";
import { ProjectFilter, type ProjectFilterValue } from "@/components/features/projects/ProjectFilter";

const TAG_ORDER: TagType[] = ["Embedded", "Analog", "Robotics", "ML", "Web"];

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilterValue>("All");

  const counts = useMemo(() => {
    const map = new Map<ProjectFilterValue, number>();
    map.set("All", projects.length);
    for (const t of TAG_ORDER) {
      map.set(t, projects.filter((p) => p.tags.includes(t)).length);
    }
    return map;
  }, []);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter]
  );

  return (
    <>
      <Seo
        title="Projects — Karan Joy Kundu"
        description="Hardware, circuits, and software actually built: biped robot, op-amp ECG monitor, LM393 fuel gauge, PPG sensor, Kairos offline AI assistant."
        path="/projects"
      />
      <Section kicker="02 / Projects" title="Projects" lede="Hardware, circuits, and software actually built — with case studies as the details come in.">
        <ProjectFilter value={filter} counts={counts} onChange={setFilter} />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
        {visible.length === 0 && (
          <p className="mt-8 font-mono text-sm text-muted">No projects in this domain yet.</p>
        )}
        <p className="mt-10 font-mono text-xs text-muted">
          Note: case studies land as details are documented. <Tag>detailed write-ups pending</Tag>
        </p>
      </Section>
    </>
  );
}
