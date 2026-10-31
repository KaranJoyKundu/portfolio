import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Typewriter — types a string once, character by character, then leaves
 * a blinking caret. Under prefers-reduced-motion the full string renders
 * immediately with no caret animation, so content is never delayed.
 */
export function Typewriter({
  text,
  speed = 45,
  startDelay = 150,
  className,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? text.length : 0);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      setDone(true);
      return;
    }
    setCount(0);
    setDone(false);
    let timer = 0;
    let i = 0;
    const start = window.setTimeout(function type(): void {
      i = i + 1;
      setCount(i);
      if (i < text.length) {
        timer = window.setTimeout(type, speed);
      } else {
        setDone(true);
      }
    }, startDelay);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(start);
    };
  }, [text, speed, startDelay, reduced]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      <span
        aria-hidden
        className={`caret ${done ? "caret-idle" : ""}`}
      />
      <span className="sr-only">{text}</span>
    </span>
  );
}
