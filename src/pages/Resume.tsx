import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { projects, IS_DEV } from "@/lib/content";
import { site } from "@/content/site.config";

/**
 * RESUME — web view driven by content (education, projects, skills).
 * No PDF yet: printing is offered honestly via the browser print dialog;
 * a hosted PDF becomes a real link once Karan supplies one.
 */
export function Resume() {
  return (
    <Section
      kicker="06 / Resume"
      title="Resume"
      lede="A web view of the essentials. Print it with your browser's print dialog for a clean PDF."
    >
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => window.print()}>Print / Save as PDF</Button>
        {IS_DEV && (
          <span className="inline-flex items-center rounded-xs border border-dashed border-accent/70 px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-text">
            hostable PDF · placeholder
          </span>
        )}
      </div>

      <div id="resume-body" className="resume mt-12 space-y-10">
        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
            Education
          </h2>
          <div className="mt-3 space-y-1">
            <p className="font-medium">
              Department of Electronics and Communication Engineering, KUET
            </p>
            <p className="text-sm text-muted">
              Second-year undergraduate student · {site.location}
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
            Projects
          </h2>
          <ul className="mt-3 space-y-4">
            {projects.map((p) => (
              <li key={p.slug}>
                <p className="font-medium">
                  {p.title}
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    {p.status.replace("-", " ")}
                  </span>
                </p>
                <p className="text-sm text-muted">{p.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
            Skills
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {[...new Set(projects.flatMap((p) => p.tech))].map((t) => (
              <li key={t} className="rounded-xs border border-border px-2 py-0.5 font-mono text-xs text-muted">
                {t}
              </li>
            ))}
            <li className="rounded-xs border border-border px-2 py-0.5 font-mono text-xs text-muted">
              C/C++
            </li>
            <li className="rounded-xs border border-border px-2 py-0.5 font-mono text-xs text-muted">
              Python
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
            Background
          </h2>
          <p className="mt-3 text-sm text-muted">
            Associated with Kundu Electronics, a family electronics components
            business in Khulna.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
            Contact
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            <li>{site.links.email}</li>
            <li>{site.links.github.replace("https://", "")}</li>
          </ul>
        </section>
      </div>
    </Section>
  );
}
