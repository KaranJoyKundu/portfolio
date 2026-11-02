/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";

/**
 * Deployment-workflow regression guards (Phase 12 / user review fixes):
 * - Project sync must run before every production build and must never be
 *   skipped on plain pushes to main.
 * - Pull requests must run full CI validation (sync → verify → build) but
 *   must never deploy.
 */
const workflowPath = resolve(process.cwd(), ".github/workflows/deploy.yml");
const workflow = readFileSync(workflowPath, "utf8");

describe("GitHub Actions deploy workflow", () => {
  it("runs project synchronization before every production build", () => {
    // The sync step must not be conditioned on the event; it runs on pushes,
    // schedules, and manual runs alike so the catalog can never silently go
    // stale (or empty) on a later ordinary push.
    expect(workflow).not.toContain("if: github.event_name != 'push'");
    expect(workflow).toContain("run: node scripts/sync-github-projects.mjs --out src/content/generated/github-projects.json");
  });

  it("declares pull_request CI validation", () => {
    expect(workflow).toContain("pull_request");
    expect(workflow).toContain("pull-request-validation");
  });

  it("does not deploy from pull request events", () => {
    expect(workflow).toMatch(/deploy:[\s\S]*?if:\s*github\.event_name != 'pull_request'/);
  });

  it("keeps the production build gated to non-PR events", () => {
    expect(workflow).toMatch(/build:[\s\S]*?if:\s*github\.event_name != 'pull_request'/);
  });
});
