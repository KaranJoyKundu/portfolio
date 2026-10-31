import type { Project } from "@/lib/schema";

/**
 * Bee biped robot. Facts limited to what Karan supplied:
 * Arduino Nano, Bluetooth, 3D printed. Everything else pending.
 */
const beeBipedRobot = {
  slug: "bee-biped-robot",
  title: "Bee biped robot",
  summary:
    "A biped walking robot built on an Arduino Nano, controlled over Bluetooth, with a 3D-printed body.",
  status: "in-progress",
  tags: ["Embedded", "Robotics"],
  tech: ["Arduino Nano", "Bluetooth", "3D printing"],
  order: 1,
  featured: true,
  images: { status: "placeholder", figures: [] },
  detail: { status: "placeholder" },
  contentStatus: "verified",
} satisfies Project;

export default beeBipedRobot;
