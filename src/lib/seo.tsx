import { site } from "@/content/site.config";

/**
 * Base path normalization: Vite's BASE_URL is e.g. "/portfolio/" (GitHub
 * Pages subpath) or "/" (custom domain). Strip trailing slashes so joining a
 * route never produces "//" segments in canonical URLs.
 */
function basePath(): string {
  const base = (import.meta.env.BASE_URL || "/").trim();
  const withoutSlash = base.length > 1 ? base.replace(/\/+$/, "") : "";
  return withoutSlash;
}

function withBase(path: string): string {
  const base = basePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.siteUrl}${base}${normalized}`;
}

/**
 * Per-page document metadata via React 19 head hoisting.
 * `path` is the route path starting with "/" (merged onto the Vite base),
 * so canonical URLs stay correct under the /portfolio/ GitHub Pages base.
 */
export function Seo({
  title,
  description,
  path = "",
  ogType = "website",
}: {
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "profile";
}) {
  const canonical = withBase(path);
  const image = `${site.siteUrl}${basePath()}/og-image.png`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={site.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}

/** Canonical URL for a route (homepage: "/portfolio/", nested: "/portfolio/projects/x"). */
export function canonicalUrl(path = ""): string {
  return withBase(path);
}

/** Absolute URL of the social/OG image for the deployed site. */
export function ogImageUrl(): string {
  return `${site.siteUrl}${basePath()}/og-image.png`;
}

/** Static JSON-LD Person schema for the home page. */
export function personJsonLd(): string {
  const url = withBase("/");
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url,
    jobTitle: "Electronics & Communication Engineering student",
    affiliation: {
      "@type": "Organization",
      name: "Khulna University of Engineering and Technology",
    },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Khulna",
        addressCountry: "BD",
      },
    },
    knowsAbout: [
      "Embedded systems",
      "Analog electronics",
      "Robotics",
      "Machine learning",
      "C",
      "C++",
      "Python",
    ],
    sameAs: [site.links.github, site.links.linkedin],
  });
}
