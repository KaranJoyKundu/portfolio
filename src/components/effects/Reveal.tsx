import { motion, useReducedMotion } from "motion/react";
import type { PropsWithChildren } from "react";

/**
 * Scroll reveal — mild fade-up the first time a block enters the viewport,
 * then never again. Static render under reduced motion. Kept subtle so
 * scroll stays calm and CLS stays zero (opacity/transform only).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: PropsWithChildren<{ delay?: number; className?: string }>) {
  const reduced = useReducedMotion();
  // Static render engines (old + jsdom): opacity/transform only would
  // need IntersectionObserver; without it, skip the animation.
  const noObserver = typeof IntersectionObserver === "undefined";
  if (reduced || noObserver) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
