import { SiteShell } from "@/components/site-shell";
import { Hero } from "@/components/home/hero";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { FeaturedProducts } from "@/components/home/featured-products";
import { BrandStory } from "@/components/home/brand-story";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";

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
