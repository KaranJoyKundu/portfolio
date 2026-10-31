import type { Figure } from "@/lib/schema";
import { assetSrc } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * Figure grid for verified project images. Dimensions come from the
 * schema (mandatory), so the grid reserves space and CLS stays zero.
 */
export function FigureWithCaption({
  figure,
  className,
}: {
  figure: Figure;
  className?: string;
}) {
  return (
    <figure className={cn("m-0", className)}>
      <img
        src={assetSrc(figure.src)}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full rounded-md border border-border bg-surface2 object-cover"
      />
      {figure.caption && (
        <figcaption className="mt-2 font-mono text-xs text-muted">
          {figure.caption}
        </figcaption>
      )}
    </figure>
  );
}
