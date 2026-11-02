import { describe, it, expect } from "vitest";
import { site } from "@/content/site.config";
import { canonicalUrl, ogImageUrl, personJsonLd } from "@/lib/seo";

/**
 * Canonical URL generation — Phase 3.2 regression coverage.
 * The Vite base is "/portfolio/" (GitHub Pages subpath); canonicals must
 * never contain duplicate slashes and must keep the base on every route.
 * Expectations are derived from the active BASE_URL so the suite passes in
 * both the production build (/portfolio/) and the test environment.
 */
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/+$/, ""); // "/portfolio" | ""

describe("SEO canonical URLs", () => {
  it("homepage canonical ends with the base + single slash (no double slash)", () => {
    expect(canonicalUrl("/")).toBe(`${site.siteUrl}${BASE}/`);
  });

  it("nested route canonical joins base + path without double slashes", () => {
    expect(canonicalUrl("/projects/kairos")).toBe(`${site.siteUrl}${BASE}/projects/kairos`);
  });

  it("og image URL sits inside the base", () => {
    expect(ogImageUrl()).toBe(`${site.siteUrl}${BASE}/og-image.png`);
  });

  it("person JSON-LD url is the homepage", () => {
    expect(personJsonLd()).toContain(`${site.siteUrl}${BASE}/`);
  });
});
