import type { Achievement } from "@/lib/schema";

/**
 * ACHIEVEMENTS — only items with contentStatus "verified" (which requires
 * a source URL) ever render. Everything below is an example of the
 * placeholder shape and is filtered out by the loader.
 */
export const rawAchievements: Achievement[] = [
  {
    contentStatus: "placeholder",
    title: "[Example] Placeholder achievement — replace or delete",
    category: "academic",
  },
];
