import type { Project } from "@/lib/schema";

/**
 * Kairos. Facts limited to what Karan supplied: offline, local AI
 * assistant running on Windows 11.
 */
const kairos = {
  slug: "kairos",
  title: "Kairos",
  summary:
    "An offline, local AI assistant that runs entirely on a Windows 11 machine.",
  status: "in-progress",
  tags: ["ML", "Web"],
  tech: ["Offline AI", "Windows 11"],
  order: 5,
  featured: true,
  images: { status: "placeholder", figures: [] },
  detail: { status: "placeholder" },
  contentStatus: "verified",
} satisfies Project;

export default kairos;
