import { useEffect, useRef, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const finePointerQuery = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(onChange: () => void): () => void {
  if (typeof window.matchMedia !== "function") return () => undefined;
  const mq = window.matchMedia(finePointerQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function finePointerMatches(): boolean {
  return typeof window.matchMedia === "function"
    ? window.matchMedia(finePointerQuery).matches
    : false;
}

function useFinePointer(): boolean {
  return useSyncExternalStore(subscribeFinePointer, finePointerMatches, () => false);
}

/**
 * Soft cursor glow — a large, low-opacity radial gradient that trails the
 * pointer with a lerped rAF loop (cheap: one transformed element).
 * Active only on hover-capable fine pointers; under reduced motion it
 * never mounts, so static users get nothing extra.
 */
export function CursorGlow() {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const active = !reduced && fine;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    const pos = { x: -200, y: -200, tx: -200, ty: -200 };
    let raf = 0;
    let visible = false;

    function tick(): void {
      pos.x += (pos.tx - pos.x) * 0.14;
      pos.y += (pos.ty - pos.y) * 0.14;
      el!.style.transform = `translate3d(${pos.x - 180}px, ${pos.y - 180}px, 0)`;
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent): void {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      if (!visible) {
        visible = true;
        el!.style.opacity = "1";
        tick();
      }
    }
    function onLeave(): void {
      el!.style.opacity = "0";
      visible = false;
      cancelAnimationFrame(raf);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden
      ref={ref}
      className="cursor-glow pointer-events-none fixed left-0 top-0 -z-10 size-[360px] rounded-full opacity-0 transition-opacity duration-500"
    />
  );
}
