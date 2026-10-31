import { useCallback, useSyncExternalStore } from "react";
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
 * useTilt — subtle 3D card tilt following the pointer, max ~4°, with a
 * soft specular highlight position. Returned as a callback ref that
 * attaches the pointer listeners directly (React 19 supports cleanup
 * functions from callback refs). On non-hover or reduced-motion devices
 * it does nothing — those users just get the normal hover border.
 */
export function useTilt<T extends HTMLElement>(maxDeg = 4) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const enabled = !reduced && fine;

  const setRef = useCallback(
    (el: T | null): void | (() => void) => {
      if (!el || !enabled) return undefined;

      function onMove(e: PointerEvent): void {
        const rect = el!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * 2 * maxDeg;
        const ry = (x - 0.5) * 2 * maxDeg;
        el!.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
        el!.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
        el!.style.setProperty("--tilt-mx", `${(x * 100).toFixed(1)}%`);
        el!.style.setProperty("--tilt-my", `${(y * 100).toFixed(1)}%`);
        el!.style.setProperty(
          "--tilt-glow",
          `${Math.max(0, 1 - Math.hypot(x - 0.5, y - 0.5) * 1.6).toFixed(3)}`
        );
      }
      function onLeave(): void {
        el!.style.setProperty("--tilt-x", "0deg");
        el!.style.setProperty("--tilt-y", "0deg");
        el!.style.setProperty("--tilt-glow", "0");
        el!.style.setProperty("--tilt-mx", "50%");
        el!.style.setProperty("--tilt-my", "50%");
      }

      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
      onLeave();
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    [enabled, maxDeg]
  );

  return setRef;
}
