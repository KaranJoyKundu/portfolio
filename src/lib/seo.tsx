import { site } from "@/content/site.config";

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
  const base = import.meta.env.BASE_URL; // e.g. "/portfolio/"
  const canonical = `${site.siteUrl}${base}${path}`;
  const image = `${site.siteUrl}${base}og-image.png`;

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

/** Static JSON-LD Person schema for the home page. */
export function personJsonLd(): string {
  const url = `${site.siteUrl}${import.meta.env.BASE_URL}`;
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
