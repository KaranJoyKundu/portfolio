import { z } from "zod";

/**
 * CONTENT SCHEMAS — the contract between content files and the site.
 *
 * Rules enforced here (build fails otherwise):
 * - A placeholder image block must contain zero figures; designs fall back
 *   to a neutral panel, so nothing fabricated is ever shipped.
 * - A placeholder case study block has no body: verified case studies carry
 *   every narrative field, placeholder ones cannot carry any claim.
 * - A verified achievement always names a source; a placeholder one never does.
 */

export const contentStatusSchema = z.enum(["verified", "placeholder"]);
export type ContentStatus = z.infer<typeof contentStatusSchema>;

export const projectStatusSchema = z.enum(["shipped", "in-progress", "concept"]);
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export const tagSchema = z.enum(["Embedded", "Analog", "Robotics", "ML", "Web"]);
export type Tag = z.infer<typeof tagSchema>;

export const achievementCategorySchema = z.enum(["academic", "chess", "project"]);
export type AchievementCategory = z.infer<typeof achievementCategorySchema>;

export const figureSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(3),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  caption: z.string().optional(),
});
export type Figure = z.infer<typeof figureSchema>;

export const bomRowSchema = z.object({
  ref: z.string().min(1),
  part: z.string().min(1),
  value: z.string().min(1),
  quantity: z.number().int().positive(),
  notes: z.string().optional(),
});
export type BomRow = z.infer<typeof bomRowSchema>;

export const imageBlockSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("verified"),
    figures: z.array(figureSchema).min(1),
  }),
  z.object({
    status: z.literal("placeholder"),
    figures: z.array(figureSchema).max(0),
  }),
]);

const decisionSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(20),
});

const challengeSchema = z.object({
  problem: z.string().min(10),
  fix: z.string().min(10),
});

export const caseStudyBlockSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("verified"),
    problem: z.string().min(20),
    constraints: z.string().min(20),
    decisions: z.array(decisionSchema).min(1),
    challenges: z.array(challengeSchema).min(1),
    results: z.string().min(20),
    improvements: z.string().min(20),
    bom: z.array(bomRowSchema).optional(),
    diagram: figureSchema.optional(),
  }),
  z.object({
    status: z.literal("placeholder"),
  }),
]);
export type CaseStudyBlock = z.infer<typeof caseStudyBlockSchema>;

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "kebab-case slug"),
  title: z.string().min(2),
  /** One factual sentence at the level of detail supplied by Karan. */
  summary: z.string().min(10),
  status: projectStatusSchema,
  tags: z.array(tagSchema).min(1),
  tech: z.array(z.string().min(1)).min(1),
  /** Only present when Karan supplies a real year. */
  year: z.string().optional(),
  links: z
    .object({
      github: z.url().optional(),
      demo: z.url().optional(),
    })
    .optional(),
  /** Stable display order, lower first. */
  order: z.number().int(),
  featured: z.boolean(),
  images: imageBlockSchema,
  detail: caseStudyBlockSchema.optional(),
  contentStatus: contentStatusSchema,
});
export type Project = z.infer<typeof projectSchema>;

export const achievementSchema = z.discriminatedUnion("contentStatus", [
  z.object({
    contentStatus: z.literal("verified"),
    title: z.string().min(3),
    category: achievementCategorySchema,
    year: z.string().min(4),
    source: z.url(),
  }),
  z.object({
    contentStatus: z.literal("placeholder"),
    title: z.string().min(3),
    category: achievementCategorySchema,
    year: z.string().optional(),
  }),
]);
export type Achievement = z.infer<typeof achievementSchema>;
export type VerifiedTimelineEntry = Extract<
  z.infer<typeof timelineEntrySchema>,
  { contentStatus: "verified" }
>;
export type VerifiedLabEntry = Extract<
  z.infer<typeof labEntrySchema>,
  { contentStatus: "verified" }
>;

/** Learning timeline entries — verified only, like achievements. */
export const timelineEntrySchema = z.discriminatedUnion("contentStatus", [
  z.object({
    contentStatus: z.literal("verified"),
    period: z.string().min(4),
    title: z.string().min(3),
    body: z.string().optional(),
  }),
  z.object({
    contentStatus: z.literal("placeholder"),
    title: z.string().min(3),
    period: z.string().optional(),
  }),
]);
export type TimelineEntry = z.infer<typeof timelineEntrySchema>;

/** Lab-notebook entries for the Engineering page — verified only. */
export const labEntrySchema = z.discriminatedUnion("contentStatus", [
  z.object({
    contentStatus: z.literal("verified"),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(3),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "ISO date"),
    excerpt: z.string().min(20),
    tags: z.array(tagSchema).min(1),
  }),
  z.object({
    contentStatus: z.literal("placeholder"),
    title: z.string().min(3),
  }),
]);
export type LabEntry = z.infer<typeof labEntrySchema>;
