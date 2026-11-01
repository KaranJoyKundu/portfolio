/**
 * SITE CONFIG — all external links and identity data live here and only here.
 * Facts marked [PLACEHOLDER] must not be shipped as real content.
 */
export const site = {
  name: "Karan Joy Kundu",
  shortName: "KJK",
  role: "Electronics & Communication Engineering, KUET",
  /** Draft copy — pending approval at the hero milestone. */
  tagline: "I build embedded hardware and robots — and the software that runs them.",
  location: "Khulna, Bangladesh",

  links: {
    email: "kjkundu2006@gmail.com",
    github: "https://github.com/KaranJoyKundu",
    linkedin: "https://www.linkedin.com/in/karan-joy-kundu-b460513b3/",
    facebook: "https://facebook.com/karan.kundu-0206",
  },

  /** Home strip: the one real "currently building" fact. */
  currentlyBuilding: "LM393 three-stage battery fuel gauge",

  /** Production site URL (no custom domain yet — GitHub Pages). */
  siteUrl: "https://karanjoykundu.github.io",
} as const;

export type SiteConfig = typeof site;
