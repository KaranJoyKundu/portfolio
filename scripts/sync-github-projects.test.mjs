import { describe, it, expect, vi } from "vitest";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { listPublicRepos, loadOverrides, syncGithubProjects } from "./sync-github-projects.mjs";

function repo(overrides = {}) {
  return {
    id: 1,
    name: "demo",
    full_name: "KaranJoyKundu/demo",
    description: "A demo project.",
    homepage: "https://example.com",
    language: "Python",
    topics: ["ML"],
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-02-01T00:00:00Z",
    stargazers_count: 3,
    fork: false,
    archived: false,
    private: false,
    ...overrides,
  };
}

function jsonResponse(data) {
  return { ok: true, status: 200, statusText: "OK", json: async () => data };
}

describe("github project sync", () => {
  it("lists repositories across pages via the injectable fetch", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse([repo({ id: 1 }), repo({ id: 2, name: "b" })]))
      .mockResolvedValueOnce(jsonResponse([]));
    const repos = await listPublicRepos({ fetchImpl, owner: "KaranJoyKundu", perPage: 2 });
    expect(repos).toHaveLength(2);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(String(fetchImpl.mock.calls[0][0])).toContain(
      "https://api.github.com/users/KaranJoyKundu/repos"
    );
  });

  it("excludes forks, archived repos, and the portfolio repo itself", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse([
        repo({ id: 1, full_name: "KaranJoyKundu/portfolio" }),
        repo({ id: 2, full_name: "KaranJoyKundu/forked", fork: true }),
        repo({ id: 3, full_name: "KaranJoyKundu/old", archived: true }),
        repo({ id: 4, full_name: "KaranJoyKundu/kept", name: "kept", language: "C" }),
      ])
    );
    const result = await syncGithubProjects({ fetchImpl });
    expect(result.discovered).toBe(4);
    expect(result.qualifying).toBe(1);
    expect(result.entries[0].slug).toBe("kept");
  });

  it("applies manual overrides instead of fabricating metadata", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse([repo({ id: 7, name: "My Repo", full_name: "KaranJoyKundu/My Repo", description: null, language: null })])
    );
    const result = await syncGithubProjects({
      fetchImpl,
      overrides: {
        "7": { title: "My Repo", summary: "Real summary supplied by the owner.", status: "concept", tags: ["Web"] },
      },
    });
    expect(result.entries).toHaveLength(1);
    expect(result.entries[0].title).toBe("My Repo");
    expect(result.entries[0].summary).toBe("Real summary supplied by the owner.");
    expect(result.entries[0].status).toBe("concept");
  });

  it("dedupes repositories by GitHub id", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse([
        repo({ id: 9, name: "same", full_name: "KaranJoyKundu/same" }),
        repo({ id: 9, name: "same", full_name: "KaranJoyKundu/same" }),
      ])
    );
    const result = await syncGithubProjects({ fetchImpl });
    expect(result.discovered).toBe(2);
    expect(result.qualifying).toBe(1);
  });

  it("fails safely when the GitHub API errors", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 403, statusText: "rate limit exceeded" });
    await expect(syncGithubProjects({ fetchImpl })).rejects.toThrow(/GitHub API request failed/);
  });

  it("lets a manual demo override take precedence over the repository homepage", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse([
        repo({
          id: 3,
          name: "demo-repo",
          full_name: "KaranJoyKundu/demo-repo",
          homepage: "https://from-github.example.com",
        }),
      ])
    );
    const result = await syncGithubProjects({
      fetchImpl,
      overrides: { "3": { demo: "https://manual.example.com" } },
    });
    expect(result.entries).toHaveLength(1);
    expect(result.entries[0].links.demo).toBe("https://manual.example.com");
  });
});

describe("github override loading (CLI)", () => {
  it("loads overrides from a JSON file keyed by repo identifier", () => {
    const dir = mkdtempSync(join(tmpdir(), "portfolio-overrides-"));
    const path = join(dir, "overrides.json");
    writeFileSync(path, JSON.stringify({ "42": { demo: "https://manual.example.com" } }));
    expect(loadOverrides(path)).toEqual({ "42": { demo: "https://manual.example.com" } });
    rmSync(dir, { recursive: true, force: true });
  });

  it("returns empty overrides when the overrides file is missing", () => {
    expect(loadOverrides(join(tmpdir(), "portfolio-definitely-missing-overrides.json"))).toEqual({});
  });

  it("throws on a malformed overrides file instead of ignoring it", () => {
    const dir = mkdtempSync(join(tmpdir(), "portfolio-overrides-"));
    const path = join(dir, "overrides.json");
    writeFileSync(path, "{ not valid json ");
    expect(() => loadOverrides(path)).toThrow();
    rmSync(dir, { recursive: true, force: true });
  });

  it("rejects an overrides file that is not a JSON object", () => {
    const dir = mkdtempSync(join(tmpdir(), "portfolio-overrides-"));
    const path = join(dir, "overrides.json");
    writeFileSync(path, "[]");
    expect(() => loadOverrides(path)).toThrow(/Invalid overrides file structure/);
    rmSync(dir, { recursive: true, force: true });
  });

  it("treats an existing but empty overrides file as empty overrides", () => {
    const dir = mkdtempSync(join(tmpdir(), "portfolio-overrides-"));
    const path = join(dir, "overrides.json");
    writeFileSync(path, "{}");
    expect(loadOverrides(path)).toEqual({});
    rmSync(dir, { recursive: true, force: true });
  });
});
