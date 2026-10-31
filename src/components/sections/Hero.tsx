import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site.config";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/effects/Typewriter";
import { Waveform } from "./Waveform";

/** One restrained load-in for the hero; static under reduced motion. */
function Reveal({ delay, children }: { delay: number; children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="border-b border-border" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-20 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24">
        <div>
          <Reveal delay={0}>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
              {`// `}
              <Typewriter text={site.role} speed={38} />
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1
              id="hero-heading"
              className="mt-4 font-display text-4xl font-medium leading-tight sm:text-6xl"
            >
              {site.name}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-xl text-lg text-text">{site.tagline}</p>
            <p className="mt-3 max-w-xl text-muted">
              Second-year ECE student at Khulna University of Engineering and
              Technology, Bangladesh. I work across embedded systems, analog
              circuit design, biped robotics, and machine learning.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/projects">View Projects</Button>
              <Button to="/contact" variant="secondary">
                Contact
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <Waveform className="h-56 w-full sm:h-72" />
        </Reveal>
      </div>

      <div className="border-t border-border bg-surface">
        <p className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3 font-mono text-xs text-muted">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <span className="uppercase tracking-[0.14em]">Currently building</span>
          <span className="text-text">{site.currentlyBuilding}</span>
        </p>
      </div>
    </section>
  );
}
