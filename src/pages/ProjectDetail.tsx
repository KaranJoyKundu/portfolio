import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PlaceholderFlag } from "@/components/ui/PlaceholderFlag";
import { FigureWithCaption } from "@/components/ui/FigureWithCaption";
import { projectBySlug, caseStudyOf } from "@/lib/content";
import { NotFound } from "@/pages/NotFound";
import { Seo } from "@/lib/seo";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectBySlug(slug) : undefined;
  if (!project) return <NotFound />;

  const detail = caseStudyOf(project);
  const pending = project.detail?.status === "placeholder";

  return (
    <>
      <Seo
        title={`${project.title} — Karan Joy Kundu`}
        description={project.summary}
        path={`/projects/${project.slug}`}
      />
      <article className="mx-auto max-w-6xl px-6 pb-20">
      <Link
        to="/projects"
        className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-text"
      >
        <ArrowLeft size={14} aria-hidden /> All projects
      </Link>

      <header className="mt-6 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          {project.year && <span className="font-mono text-xs text-muted">{project.year}</span>}
          {pending && <PlaceholderFlag status="placeholder" />}
        </div>
        <h1 className="mt-4 font-display text-3xl font-medium sm:text-5xl">{project.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{project.summary}</p>
      </header>

      {project.images.status === "verified" && project.images.figures.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.images.figures.map((figure) => (
            <FigureWithCaption key={figure.src} figure={figure} />
          ))}
        </div>
      )}

      <div className="grid gap-10 pt-10 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          {detail && detail.status === "verified" ? (
            <div className="space-y-10">
              <Narrative title="Problem" body={detail.problem} />
              <Narrative title="Constraints" body={detail.constraints} />
              <Listed
                title="Design decisions"
                items={detail.decisions.map((d) => ({ head: d.title, text: d.body }))}
              />
              <Listed
                title="Challenges and fixes"
                items={detail.challenges.map((c) => ({
                  head: c.problem,
                  text: `Fix: ${c.fix}`,
                }))}
              />
              <Narrative title="Results" body={detail.results} />
              <Narrative title="What I would improve" body={detail.improvements} />
              {detail.bom && detail.bom.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-medium">Bill of materials</h2>
                  <div className="mt-3 overflow-x-auto rounded-md border border-border">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-surface2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                        <tr>
                          <th className="px-3 py-2">Part</th>
                          <th className="px-3 py-2">Spec</th>
                          <th className="px-3 py-2 text-right">Qty</th>
                          <th className="px-3 py-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {detail.bom.map((row) => (
                          <tr key={row.part}>
                            <td className="px-3 py-2 font-medium">{row.part}</td>
                            <td className="px-3 py-2 text-muted">{row.value}</td>
                            <td className="px-3 py-2 text-right font-mono text-muted">
                              ×{row.quantity}
                            </td>
                            <td className="px-3 py-2 text-muted">
                              {row.notes ?? row.ref}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </div>
          ) : (
            <CaseStudyPending flagged={pending} />
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start" aria-label="Project facts">
          <Facts title="Tech" items={project.tech} render={(t) => <Tag key={t}>{t}</Tag>} />
          <Facts title="Domains" items={project.tags} render={(t) => <Tag key={t}>{t}</Tag>} />
          {project.links?.github && (
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Source</h2>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-mono text-sm text-accent-text underline underline-offset-4"
              >
                GitHub repository
              </a>
            </div>
          )}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Status</h2>
            <p className="mt-3">
              <StatusBadge status={project.status} />
            </p>
          </div>
        </aside>
      </div>
    </article>
    </>
  );
}

function Narrative({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="font-display text-xl font-medium">{title}</h2>
      <p className="mt-3 leading-relaxed text-muted">{body}</p>
    </section>
  );
}

function Listed({
  title,
  items,
}: {
  title: string;
  items: Array<{ head: string; text: string }>;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-medium">{title}</h2>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.head} className="border-l-2 border-accent/50 pl-4">
            <p className="font-medium">{item.head}</p>
            <p className="mt-1 text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CaseStudyPending({ flagged }: { flagged: boolean }) {
  const outline = [
    "Problem and constraints",
    "Design decisions",
    "Architecture / block diagram",
    "Schematic walk-through",
    "BOM table",
    "Challenges and fixes",
    "Results",
    "What I would improve",
  ];
  return (
    <div className="rounded-md border border-dashed border-border bg-surface p-8">
      <div className="flex items-center gap-2">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          case study · in documentation
        </p>
        {flagged && <PlaceholderFlag status="placeholder" />}
      </div>
      <p className="mt-3 max-w-md text-sm text-muted">
        The full write-up is being documented. The summary above is what&apos;s
        confirmed so far; the outline below shows what the case study will cover.
      </p>
      <ul className="mt-5 space-y-1.5 font-mono text-xs text-muted">
        {outline.map((line) => (
          <li key={line} className="flex gap-2">
            <span aria-hidden className="text-accent">+</span>
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Facts<T extends string>({
  title,
  items,
  render,
}: {
  title: string;
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{title}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item}>{render(item)}</li>
        ))}
      </ul>
    </div>
  );
}
