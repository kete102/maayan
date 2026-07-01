import { BrandStory } from "@/components/home/brand-story";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { Testimonials } from "@/components/home/testimonials";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <BrandStory />
      <FeaturedCollections />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </SiteShell>
  );
}
