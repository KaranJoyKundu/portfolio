import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Seo, personJsonLd } from "@/lib/seo";

export function Home() {
  return (
    <>
      <Seo
        title="Karan Joy Kundu — Electronics & Communication Engineering, KUET"
        description="Portfolio of Karan Joy Kundu, second-year ECE student at KUET, Bangladesh. Embedded systems, analog electronics, robotics, and machine learning."
        path="/"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />
      <Hero />
      <FeaturedProjects />
    </>
  );
}
