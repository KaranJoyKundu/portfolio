import type { Project } from "@/lib/schema";

/**
 * LM393 three-stage battery fuel gauge. Facts limited to what Karan
 * supplied: LM393, three-stage, battery fuel gauge. Currently in build.
 */
const lm393BatteryFuelGauge = {
  slug: "lm393-battery-fuel-gauge",
  title: "LM393 battery fuel gauge",
  summary:
    "A three-stage battery fuel gauge built around the LM393 comparator.",
  status: "in-progress",
  tags: ["Embedded", "Analog"],
  tech: ["LM393", "Voltage sensing"],
  order: 3,
  featured: false,
  images: { status: "placeholder", figures: [] },
  detail: { status: "placeholder" },
  contentStatus: "verified",
} satisfies Project;

export default lm393BatteryFuelGauge;
