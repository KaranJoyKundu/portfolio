import { rawProjects } from "@/content/projects";
import { rawAchievements } from "@/content/achievements";
import type { CaseStudyBlock, Project } from "@/lib/schema";

/**
 * CONTENT LOADER — the only way pages read content.
 *
 * Validation strategy: schemas are enforced by content.test.ts at
 * build/CI time (change C keeps the runtime bundle lean, so Zod is not
 * shipped to the browser). Invalid content therefore still fails the
 * build, but the runtime bundle stays small.
 *
 * Production placeholder rules (approved plan, change A):
 * - Placeholder case-study bodies never render in production; pages show
 *   the honest "in documentation" panel instead.
 * - Placeholder image blocks never render figures (schema requires zero)
 *   so nothing fabricated ships; covers use a designed panel.
 * - Achievements render only when verified, and the nav link is hidden
 *   until at least one verified item exists.
 */

export const IS_DEV: boolean = import.meta.env.DEV;

/** Typed, order-sorted project list (validated in content.test.ts). */
export const projects: Project[] = [...rawProjects].sort((a, b) => a.order - b.order);

export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Case study visibility: placeholder bodies are dev-only.
 * Production gets `null` and the page renders its honest fallback.
 */
export function caseStudyOf(project: Project, dev: boolean = IS_DEV): CaseStudyBlock | null {
  if (!project.detail) return null;
  if (project.detail.status === "verified") return project.detail;
  return dev ? project.detail : null;
}

/** Static list of every placeholder block, for the CI report. */
export function placeholderInventory(): Array<{ kind: string; ref: string }> {
  const items: Array<{ kind: string; ref: string }> = [];
  for (const p of projects) {
    if (p.images.status === "placeholder") {
      items.push({ kind: "project-images", ref: p.slug });
    }
    if (p.detail?.status === "placeholder") {
      items.push({ kind: "project-detail", ref: p.slug });
    }
    if (!p.year) items.push({ kind: "project-year", ref: p.slug });
    if (!p.links?.github) items.push({ kind: "project-github", ref: p.slug });
    if (!p.links?.demo) items.push({ kind: "project-demo", ref: p.slug });
  }
  for (const a of rawAchievements) {
    if (a.contentStatus === "placeholder") {
      items.push({ kind: "achievement", ref: a.title });
    }
  }
  return items;
}

/** Achievements that pass the verified gate — these, and only these, render. */
export const verifiedAchievements = rawAchievements.filter(
  (a) => a.contentStatus === "verified"
);

export const hasVerifiedAchievements: boolean = verifiedAchievements.length > 0;
