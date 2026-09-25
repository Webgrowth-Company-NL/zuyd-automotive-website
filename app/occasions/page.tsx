import type { Metadata } from "next";
import { getAllCars } from "@/lib/inventory";
import { VoorraadView } from "@/components/occasions/voorraad-view";
import { breadcrumbLd, JsonLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site";
import { tekst } from "@/lib/teksten";

export const metadata: Metadata = {
  title: "Occasions in Breda · onze voorraad",
  description:
    "Bekijk de occasions van Zuyd Automotive in Breda. Filter op merk, prijs, brandstof, bouwjaar en kilometerstand. Stuk voor stuk persoonlijk uitgekozen.",
  alternates: { canonical: "/occasions" },
};


export default async function OccasionsPage() {
  const [cars, intro, voorraad, kaart] = await Promise.all([
    getAllCars(),
    tekst("occasions__intro"),
    tekst("occasions__voorraad"),
    tekst("shared__autokaart"),
  ]);

  return (
    <section className="max-w-[1200px] mx-auto px-[22px] pt-[clamp(34px,5vw,56px)] pb-[clamp(48px,6vw,80px)]">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: SITE.baseUrl },
          { name: "Occasions", url: `${SITE.baseUrl}/occasions` },
        ])}
      />
      <div className="mb-7">
        <span className="font-display font-bold text-[13px] tracking-[0.14em] uppercase text-steel">
          {intro.eyebrow}
        </span>
        <h1 className="font-display font-extrabold text-[clamp(30px,4.2vw,44px)] tracking-[-0.01em] text-slate mt-2">
          {intro.titel}
        </h1>
        <p className="text-[16.5px] text-slate-soft mt-2.5 max-w-[54ch]">
          {intro.tekst}
        </p>
      </div>
      <VoorraadView cars={cars} t={voorraad} kaartKnop={kaart.knop} />
    </section>
  );
}
