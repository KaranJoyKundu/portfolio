/**
 * Circuit-trace background — an SVG board pattern behind the page.
 * Animated paths trace pulses (stroke-dashoffset); the global
 * prefers-reduced-motion CSS freeze turns them into a static etch.
 * Decorative: aria-hidden, pointer-events: none, fixed position,
 * layout-neutral (never shifts content).
 */
export function CircuitTrace() {

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <svg
        className="h-full w-full circuit-trace"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* horizontal traces */}
        <path d="M-40 140 H 320 L 380 200 H 720" />
        <path d="M1480 220 H 1080 L 1020 280 H 620 L 560 340 H 80" />
        <path d="M-40 700 H 260 L 320 640 H 780 L 840 700 H 1480" />
        <path d="M1480 760 H 1160 L 1100 820 H 540" />
        {/* vertical traces */}
        <path d="M1100 -40 V 140 L 1140 180 V 420" />
        <path d="M340 940 V 760 L 300 720 V 560" />
        <path d="M1280 940 V 700 L 1240 660 V 480" />
        {/* node pads */}
        <circle cx="380" cy="200" r="5" className="circuit-node" />
        <circle cx="840" cy="700" r="5" className="circuit-node" />
        <circle cx="320" cy="640" r="5" className="circuit-node" />
        <circle cx="1140" cy="420" r="5" className="circuit-node" />
        <circle cx="300" cy="560" r="5" className="circuit-node" />
      </svg>
    </div>
  );
}
