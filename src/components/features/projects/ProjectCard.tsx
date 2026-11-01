import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { ProjectCover } from "./ProjectCover";

type Props = {
  project: Project;
  /** "feature" renders the large home-page card; "compact" the small one. */
  variant?: "feature" | "compact";
};

export function ProjectCard({ project, variant = "compact" }: Props) {
  const feature = variant === "feature";
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface transition-colors duration-[var(--dur-base)] hover:border-muted focus-visible:border-muted"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b border-border",
          feature ? "aspect-[16/8]" : "aspect-[16/9]"
        )}
      >
        <ProjectCover project={project} eager={feature} />
      </div>

      <div className={cn("flex flex-1 flex-col", feature ? "gap-3 p-6" : "gap-2.5 p-4")}>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <h3
          className={cn(
            "font-display font-medium",
            feature ? "text-2xl" : "text-lg"
          )}
        >
          {project.title}
        </h3>

        <p className={cn("text-muted", feature ? "text-base" : "text-sm")}>
          {project.summary}
        </p>

        <div className="mt-auto flex items-center gap-4 pt-2 font-mono text-xs">
          <span className="inline-flex items-center gap-1 text-accent-text">
            {project.detail ? "Read case study" : "Details"}
            <ArrowUpRight
              size={14}
              aria-hidden
              className="transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          {project.links?.github && (
            <span className="inline-flex items-center gap-1 text-muted">
              Source
              <ArrowUpRight
                size={14}
                aria-hidden
                className="transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
