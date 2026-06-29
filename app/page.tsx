import { getAllCars, getFeaturedCars } from "@/lib/inventory";
import { autoDealerLd, JsonLd } from "@/lib/structured-data";
import { Hero } from "@/components/sections/hero";
import { Featured } from "@/components/sections/featured";
import { Usp } from "@/components/sections/usp";
import { Personal } from "@/components/sections/personal";
import { TrustStats } from "@/components/sections/trust-stats";
import { ShowcaseMarquee } from "@/components/sections/showcase-marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { ClosingCta } from "@/components/sections/closing-cta";

export default async function HomePage() {
  const [featured, all] = await Promise.all([getFeaturedCars(3), getAllCars()]);

  return (
    <>
      <JsonLd data={autoDealerLd()} />
      <Hero heroImage={featured[0]?.cover ?? undefined} />
      <Featured cars={featured} />
      <Usp />
      <Personal />
      <ShowcaseMarquee cars={all} />
      <TrustStats />
      <Testimonials />
      <ClosingCta />
    </>
  );
}
