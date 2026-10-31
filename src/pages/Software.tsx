import { Link } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { ArrowUpRight } from "lucide-react";
import { skillGroups } from "@/lib/content";
import { Seo } from "@/lib/seo";

/**
 * SOFTWARE — skills derived from real projects, each one linked back to
 * the builds that used it. Languages listed as facts. No percentage bars.
 */
export function Software() {
  const groups = skillGroups();

  return (
    <>
      <Seo
        title="Software — Karan Joy Kundu"
        description="C/C++, Python, and the software and tooling behind the builds — every skill linked to the project that used it."
        path="/software"
      />
      <Section
      kicker="04 / Software"
      title="Software"
      lede="The software and tooling behind the builds. Every skill points to the project that used it — nothing here is a self-rating."
    >
      <section>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Languages</p>
        <p className="mt-3 text-lg">
          C/C++ <span aria-hidden className="text-muted">·</span>{" "}
          Python
        </p>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Used across coursework and projects; specific projects listed as they
          are documented.
        </p>
      </section>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.domain}>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
              {group.domain}
            </h2>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-4 border-b border-border pb-2"
                >
                  <span>{item.name}</span>
                  <span className="font-mono text-xs text-muted">
                    {item.projectSlugs.length === 1 ? (
                      <Link
                        to={`/projects/${item.projectSlugs[0]}`}
                        className="inline-flex items-center gap-1 hover:text-accent-text"
                      >
                        {item.projectSlugs[0]}
                        <ArrowUpRight size={12} aria-hidden />
                      </Link>
                    ) : (
                      `${item.projectSlugs.length} project${item.projectSlugs.length > 1 ? "s" : ""}`
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      </Section>
    </>
  );
}
