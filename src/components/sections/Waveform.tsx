import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Signal waveform — the one hero animation.
 * A synthetic multi-tone signal on an SVG path. Pointer x adds a local
 * amplitude bump; scroll eases the frequency; the phase drifts slowly.
 * With prefers-reduced-motion it renders one static frame and attaches
 * no listeners at all.
 *
 * All coordinates are in the normalized 0..100 viewBox space; the panel
 * stretches it (preserveAspectRatio="none") and uses non-scaling strokes.
 */
export function Waveform({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;
    const wrapEl: HTMLDivElement = wrap;
    const pathEl: SVGPathElement = path;

    // Mutable signal state.
    const state = {
      pointerX: 0.5,
      targetX: 0.5,
      energy: 0,
      targetEnergy: 0,
      freq: 2.1,
      targetFreq: 2.1,
      phase: 0,
      raf: 0,
      running: false,
      last: 0,
    };

    function draw(): void {
      const { freq, phase, pointerX, energy } = state;
      const points: string[] = [];
      const steps = 64;
      for (let i = 0; i <= steps; i++) {
        const x = i / steps;
        const carrier = Math.sin(x * Math.PI * 2 * freq + phase) * 0.7;
        const harmonic = Math.sin(x * Math.PI * 2 * freq * 2.3 + phase * 1.6) * 0.3;
        const bump = energy * Math.exp(-((x - pointerX) ** 2) * 24);
        const ripple = bump * Math.sin(x * 42 + phase * 2.4);
        const y =
          50 -
          (carrier + harmonic) * (16 + bump * 12) -
          ripple * 5;
        points.push(`${(x * 100).toFixed(2)},${y.toFixed(2)}`);
      }
      pathEl.setAttribute("d", `M${points.join(" L")}`);
    }

    function tick(now: number): void {
      const dt = state.last === 0 ? 16 : Math.min(now - state.last, 50);
      state.last = now;
      state.pointerX += (state.targetX - state.pointerX) * 0.12;
      state.energy += (state.targetEnergy - state.energy) * 0.08;
      state.freq += (state.targetFreq - state.freq) * 0.06;
      state.phase += dt * 0.0016;
      draw();
      state.raf = requestAnimationFrame(tick);
    }

    function start(): void {
      if (state.running) return;
      state.running = true;
      state.last = 0;
      state.raf = requestAnimationFrame(tick);
    }

    function stop(): void {
      state.running = false;
      cancelAnimationFrame(state.raf);
    }

    function idleStop(): void {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(stop, 2000);
    }

    function onPointerMove(e: PointerEvent): void {
      const rect = wrapEl.getBoundingClientRect();
      state.targetX = (e.clientX - rect.left) / rect.width;
      state.targetEnergy = 0.8;
      start();
      idleStop();
    }

    function onPointerLeave(): void {
      state.targetEnergy = 0;
    }

    function onScroll(): void {
      const rect = wrapEl.getBoundingClientRect();
      const norm = (rect.top + rect.height / 2) / window.innerHeight;
      state.targetFreq = 2.1 + norm * 1.6;
      start();
      idleStop();
    }

    let timeout = 0;

    if (reduced) {
      // Static frame — no listeners, no loop.
      draw();
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      // Very old engines / test environments: render one static frame.
      draw();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry!.isIntersecting) start();
      else stop();
    });
    observer.observe(wrap);

    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    draw(); // visible static frame even before any interaction
    idleStop();

    return () => {
      observer.disconnect();
      stop();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timeout);
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className={`schematic-grid relative overflow-hidden rounded-md border border-border bg-surface ${className ?? ""}`}
    >
      <p className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        ch1 · live
      </p>
      <span className="absolute right-4 top-3 size-1.5 rounded-full bg-accent" aria-hidden />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <line x1="0" y1="50" x2="100" y2="50" stroke="var(--c-border)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path
          ref={pathRef}
          fill="none"
          stroke="var(--c-accent)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
