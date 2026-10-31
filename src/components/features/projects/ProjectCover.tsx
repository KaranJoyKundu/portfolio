import type { Project } from "@/lib/schema";
import { assetSrc } from "@/lib/asset";
import { PlaceholderFlag } from "@/components/ui/PlaceholderFlag";

/**
 * Project cover: verified figures render as a real image (dimensions
 * required by the schema, no layout shift). Placeholder blocks render a
 * neutral designed panel — a schematic grid with a device-ID label — in
 * both themes, with the dashed flag only in development.
 */
export function ProjectCover({ project }: { project: Project }) {
  if (project.images.status === "verified") {
    const figure = project.images.figures[0];
    if (!figure) return null;
    return (
      <img
        src={assetSrc(figure.src)}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="schematic-grid relative grid h-full place-items-center bg-surface2">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {`img · ${project.slug}`}
        </p>
        <PlaceholderFlag status="placeholder" className="mt-2" />
      </div>
    </div>
  );
}
