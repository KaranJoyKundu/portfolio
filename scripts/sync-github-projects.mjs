#!/usr/bin/env node
/**
 * GITHUB PROJECT SYNC — Phase 12 of the portfolio upgrade.
 *
 * Discovers public repositories owned by the portfolio owner and turns
 * qualifying ones into generated portfolio project entries.
 *
 * Design constraints honoured here:
 * - Static-site friendly: no backend; uses the public GitHub REST API with
 *   an injectable fetch (tests pass mock responses).
 * - Read-only public data: unauthenticated requests for public repos.
 * - Safe defaults: private/fork/archived/portfolio repos are excluded.
 * - Non-destructive: generated entries never overwrite curated content; the
 *   app merges generated entries under curated ones by slug.
 * - Honest fallbacks: missing descriptions produce honest fallback summaries;
 *   nothing is fabricated.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_OWNER = "KaranJoyKundu";
export const DEFAULT_EXCLUDED = ["KaranJoyKundu/portfolio"];

const KNOWN_TAGS = new Set(["Embedded", "Analog", "Robotics", "ML", "Web"]);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function listPublicRepos({ fetchImpl, owner, perPage = 100, maxPages = 50 } = {}) {
  const fetchFn = fetchImpl ?? (globalThis.fetch);
  const repos = [];
  for (let page = 1; page <= maxPages; page += 1) {
    const url = `https://api.github.com/users/${encodeURIComponent(
      owner
    )}/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`;
    const response = await fetchFn(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "portfolio-github-sync",
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status} ${response.statusText} for ${url}`);
    }
    const batch = await response.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const repo of batch) {
      if (repo && !repo.private) repos.push(repo);
    }
    if (batch.length < perPage) break;
  }
  return repos;
}

function slugify(name) {
  const slug = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug.length > 0 ? slug : `repo-${Math.floor(Math.random() * 1e9)}`;
}

function tagFromTopics(topics) {
  const tags = [...new Set((topics ?? []).filter((t) => KNOWN_TAGS.has(t)))];
  return tags.length > 0 ? tags : ["Web"];
}

function toAutoProject(repo, overrides = {}) {
  const slug = typeof overrides.slug === "string" && SLUG_RE.test(overrides.slug)
    ? overrides.slug
    : slugify(repo.name);
  const fallbackSummary = `${repo.name} — an open-source project repository on GitHub.`;
  const summary = typeof overrides.summary === "string" && overrides.summary.length > 0
    ? overrides.summary
    : repo.description ?? fallbackSummary;
  const tags = Array.isArray(overrides.tags) && overrides.tags.length > 0
    ? overrides.tags
    : tagFromTopics(repo.topics);
  const tech = Array.isArray(overrides.tech) && overrides.tech.length > 0
    ? overrides.tech
    : [repo.language ?? "unknown"];

  const entry = {
    slug,
    title: typeof overrides.title === "string" && overrides.title.length > 0 ? overrides.title : repo.name,
    summary,
    status: overrides.status ?? "in-progress",
    tags,
    tech,
    ...(typeof overrides.year === "string" ? { year: overrides.year } : {}),
    links: {
      github: `https://github.com/${repo.full_name}`,
      ...(typeof overrides.demo === "string" ? { demo: overrides.demo } : {}),
      ...(repo.homepage && /^https?:\/\//i.test(repo.homepage) ? { demo: repo.homepage } : {}),
    },
    order: typeof overrides.order === "number" ? overrides.order : Math.floor(Date.parse(repo.created_at) / 1000),
    featured: overrides.featured === true,
    images: overrides.images ?? { status: "placeholder", figures: [] },
    ...(overrides.detail ? { detail: overrides.detail } : {}),
    contentStatus: overrides.contentStatus ?? "placeholder",
  };
  return entry;
}

/**
 * Full sync: discover qualifying repos, apply overrides, return generated
 * project entries. Throws on API failure so callers can fail safe (preserve
 * the last known-good catalog) rather than publishing an empty one.
 */
export async function syncGithubProjects({
  fetchImpl,
  owner = DEFAULT_OWNER,
  excluded = DEFAULT_EXCLUDED,
  overrides = {},
} = {}) {
  const repos = await listPublicRepos({ fetchImpl, owner });
  const excludedSet = new Set(excluded.map((e) => e.toLowerCase()));
  const qualifying = [];
  const skipped = [];
  const seenIds = new Set();

  for (const repo of repos) {
    const key = (repo.full_name ?? "").toLowerCase();
    if (excludedSet.has(key)) {
      skipped.push({ repo: repo.full_name, reason: "excluded" });
      continue;
    }
    if (repo.fork) {
      skipped.push({ repo: repo.full_name, reason: "fork" });
      continue;
    }
    if (repo.archived) {
      skipped.push({ repo: repo.full_name, reason: "archived" });
      continue;
    }
    if (seenIds.has(repo.id)) {
      skipped.push({ repo: repo.full_name, reason: "duplicate" });
      continue;
    }
    seenIds.add(repo.id);
    qualifying.push({
      repo,
      overrides: overrides[String(repo.id)] ?? overrides[repo.full_name] ?? overrides[repo.name] ?? {},
    });
  }

  const entries = qualifying.map(({ repo, overrides: entryOverrides }) => toAutoProject(repo, entryOverrides));
  return {
    owner,
    discovered: repos.length,
    qualifying: qualifying.length,
    entries,
    skipped,
  };
}

/* ── CLI ─────────────────────────────────────────────────────────────────── */

async function main() {
  const args = process.argv.slice(2);
  const ownerIndex = args.indexOf("--owner");
  const owner = ownerIndex !== -1 ? args[ownerIndex + 1] ?? DEFAULT_OWNER : DEFAULT_OWNER;
  const outIndex = args.indexOf("--out");
  const out = resolve(process.cwd(), outIndex !== -1 ? args[outIndex + 1] ?? "src/content/generated/github-projects.json" : "src/content/generated/github-projects.json");
  const overridesPathIndex = args.indexOf("--overrides");
  const overridesPath = resolve(process.cwd(), overridesPathIndex !== -1 ? args[overridesPathIndex + 1] ?? "src/content/generated/github-overrides.json" : "src/content/generated/github-overrides.json");

  const rawOverrides = {};
  try {
    const parsed = JSON.parse(readFileSync(overridesPath, "utf8"));
    if (parsed && typeof parsed === "object") rawOverrides = parsed;
  } catch {
    // Missing overrides file is fine: no manual overrides yet.
  }

  const result = await syncGithubProjects({ owner, overrides: rawOverrides });
  mkdirSync(resolve(process.cwd(), "src/content/generated"), { recursive: true });
  writeFileSync(out, JSON.stringify(result.entries, null, 2) + "\n");
  console.log(
    JSON.stringify({
      owner: result.owner,
      discovered: result.discovered,
      qualifying: result.qualifying,
      generated: result.entries.length,
      skipped: result.skipped.length,
    })
  );
}

const scriptPath = fileURLToPath(import.meta.url);
const invokedPath = process.argv[1] ? resolve(process.argv[1]) : null;
if (invokedPath && scriptPath === invokedPath) {
  void main();
}
