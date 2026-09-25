import { getAllCars, getFeaturedCars } from "@/lib/inventory";
import { autoDealerLd, JsonLd } from "@/lib/structured-data";
import { Hero } from "@/components/sections/hero";
import { Featured } from "@/components/sections/featured";
import { Usp } from "@/components/sections/usp";
import { Diensten } from "@/components/sections/diensten";
import { Personal } from "@/components/sections/personal";
import { TrustStats } from "@/components/sections/trust-stats";
import { ShowcaseMarquee } from "@/components/sections/showcase-marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { ClosingCta } from "@/components/sections/closing-cta";
import { tekst } from "@/lib/teksten";


export default async function HomePage() {
  const [featured, all, hero] = await Promise.all([
    getFeaturedCars(3),
    getAllCars(),
    tekst("home__hero"),
  ]);

  return (
    <>
      <JsonLd data={autoDealerLd()} />
      <Hero heroImage={featured[0]?.cover ?? undefined} t={hero} />
      <Featured cars={featured} />
      <Usp />
      <Personal />
      <Diensten />
      <ShowcaseMarquee cars={all} />
      <TrustStats cars={all} />
      <Testimonials />
      <ClosingCta />
    </>
  );
}
