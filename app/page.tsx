import { BrandStory } from "@/components/home/brand-story";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { Testimonials } from "@/components/home/testimonials";
import PaypalCheckout from "@/components/paypal/paypal-checkout";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <div>
        <h1>Checkout</h1>
        <PaypalCheckout amount="20.00" currency="USD" />
      </div>
      <BrandStory />
      <FeaturedCollections />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </SiteShell>
  );
}
