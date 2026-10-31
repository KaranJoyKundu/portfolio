import type { Project } from "@/lib/schema";

/**
 * Analog op-amp ECG heart-rate monitor. Facts limited to what Karan
 * supplied: op-amp based, heart-rate monitoring, no microcontroller.
 */
const opampEcgHeartRateMonitor = {
  slug: "opamp-ecg-heart-rate-monitor",
  title: "Op-amp ECG heart-rate monitor",
  summary:
    "An ECG heart-rate monitor built with op-amp analog circuitry — signal conditioning without a microcontroller.",
  status: "in-progress",
  tags: ["Analog"],
  tech: ["Op-amps", "Analog signal conditioning"],
  order: 2,
  featured: true,
  images: { status: "placeholder", figures: [] },
  detail: { status: "placeholder" },
  contentStatus: "verified",
} satisfies Project;

export default opampEcgHeartRateMonitor;
