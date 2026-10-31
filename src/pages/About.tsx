import { Timeline } from "@/components/ui/Timeline";
import { Tag } from "@/components/ui/Tag";
import { Seo } from "@/lib/seo";
import { site } from "@/content/site.config";
import { verifiedTimeline, IS_DEV } from "@/lib/content";

/**
 * ABOUT — only facts from the seed content. Copy is a draft for
 * approval; the learning timeline renders only verified entries
 * (currently none, so it stays hidden in production).
 */
export function About() {
  return (
    <>
      <Seo
        title="About — Karan Joy Kundu"
        description="Background, engineering approach, and the honest student note behind Karan Joy Kundu's work in electronics and robotics."
        path="/about"
      />
      <article className="mx-auto max-w-6xl px-6 pb-20">
      <header className="py-16 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
          01 / About
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium sm:text-5xl">
          About
        </h1>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-10">
          <div className="space-y-4 leading-relaxed text-muted">
            <p>
              I&apos;m Karan Joy Kundu, a second-year Electronics and
              Communication Engineering student at Khulna University of
              Engineering and Technology (KUET), Khulna, Bangladesh.
            </p>
            <p>
              My work sits where hardware meets code. I build embedded systems,
              analog circuits, and robots — from a Bluetooth-controlled biped
              robot to op-amp-only measurement circuits — and I write software
              in C/C++ and Python, with machine learning as a working interest
              behind Kairos, my offline local AI assistant.
            </p>
          </div>

          <section>
            <h2 className="font-display text-xl font-medium">How I work</h2>
            <ul className="mt-4 space-y-3 text-muted">
              {[
                "Build first, then document: every project here was wired, soldered, or debugged by hand before it earned a page.",
                "Understand the circuit, not just the code — I care about why a comparator stage behaves the way it does, not only that it works.",
                "Honest limits beat polished demos: the case studies carry real constraints, trade-offs, and mistakes.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-md border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-medium">Kundu Electronics</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Kundu Electronics, my family&apos;s electronics components
              business in Khulna, keeps me close to the practical side of the
              field: real parts, real availability, and what people actually
              need to build.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium">
              The honest note
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              I&apos;m a second-year student, not a professional engineer —
              and that&apos;s the point of this portfolio. Everything shown
              here was built at student level, with student constraints and
              student budgets. If you&apos;re looking at this for an
              internship or supervision, the case studies will show you
              exactly where my limits are.
            </p>
          </section>

          {verifiedTimeline.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-medium">Timeline</h2>
              <div className="mt-6">
                <Timeline entries={verifiedTimeline} />
              </div>
            </section>
          )}
          {verifiedTimeline.length === 0 && IS_DEV && (
            <section className="rounded-md border border-dashed border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                timeline · no verified entries · dev only
              </p>
              <p className="mt-2 text-sm text-muted">
                Add verified items to src/content/timeline.ts.
              </p>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start" aria-label="Facts">
          <div className="rounded-md border border-border bg-surface p-6">
            <div
              className="schematic-grid grid h-36 place-items-center rounded-md border border-border bg-surface2"
              role="img"
              aria-label="Portrait placeholder: KJK monogram"
            >
              <span className="font-mono text-2xl tracking-[0.2em] text-muted">KJK</span>
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
              Facts
            </p>
            <dl className="mt-3 space-y-2.5 text-sm">
              <Fact label="Location" value={site.location} />
              <Fact label="University" value="KUET" />
              <Fact label="Department" value="Electronics & Communication Engineering" />
              <Fact label="Year" value="Second year" />
              <Fact label="Now building" value={site.currentlyBuilding} />
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>Embedded</Tag>
              <Tag>Analog</Tag>
              <Tag>Robotics</Tag>
              <Tag>ML</Tag>
            </div>
          </div>
        </aside>
      </div>
    </article>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-muted">
        {label}
      </dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
