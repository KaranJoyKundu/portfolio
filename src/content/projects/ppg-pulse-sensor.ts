import type { Project } from "@/lib/schema";

/**
 * Finger-clip PPG pulse sensor. Karan supplied only the concept
 * description — it stays marked "concept" until he says otherwise.
 */
const ppgPulseSensor = {
  slug: "ppg-pulse-sensor",
  title: "Finger-clip PPG pulse sensor",
  summary:
    "A finger-clip photoplethysmography (PPG) pulse sensor — currently at concept stage.",
  status: "concept",
  tags: ["Analog", "Embedded"],
  tech: ["PPG"],
  order: 4,
  featured: false,
  images: { status: "placeholder", figures: [] },
  detail: { status: "placeholder" },
  contentStatus: "verified",
} satisfies Project;

export default ppgPulseSensor;
