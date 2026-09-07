import type { Metadata } from "next";
import { CoatingForm } from "@/components/detailing/coating-form";
import { breadcrumbLd, JsonLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Keramische coating in Breda",
  description:
    "Keramische coating voor je auto bij Zuyd Automotive in Breda. Beschermt de lak en houdt de glans jarenlang diep. Prijs op aanvraag, afhankelijk van de auto.",
  alternates: { canonical: "/detailing" },
};

const VOORDELEN = [
  {
    title: "Bescherming die blijft",
    body: "De coating hecht op de lak en beschermt tegen vuil, regen en uitgebleekte plekken.",
  },
  {
    title: "Makkelijker schoon",
    body: "Water en vuil pakken minder houvast, dus je bent sneller klaar met wassen.",
  },
  {
    title: "Diepe glans",
    body: "De kleur blijft vol en diep staan, ook na jaren buiten staan.",
  },
];

export default function DetailingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: SITE.baseUrl },
          { name: "Car detailing", url: `${SITE.baseUrl}/detailing` },
        ])}
      />
      <section className="max-w-[1100px] mx-auto px-[22px] pt-[clamp(40px,6vw,72px)] pb-[clamp(40px,6vw,72px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,4vw,48px)] items-center">
          <div>
            <span className="font-display font-bold text-[13px] tracking-[0.14em] uppercase text-steel">
              Car detailing
            </span>
            <h1 className="font-display font-extrabold text-[clamp(30px,4.4vw,46px)] tracking-[-0.02em] text-slate mt-3 leading-[1.07]">
              Keramische coating voor je auto
            </h1>
            <p className="text-[17px] leading-relaxed text-slate-soft mt-[18px] max-w-[44ch]">
              Een keramische coating legt een beschermlaag over de lak. Je auto blijft langer mooi,
              is makkelijker schoon te houden en houdt die diepe glans. Ook voor auto&apos;s die je
              niet bij ons hebt gekocht.
            </p>
            <div className="flex flex-col gap-4 mt-7">
              {VOORDELEN.map((v) => (
                <div key={v.title} className="border-l-[3px] border-steel pl-[18px] py-0.5">
                  <div className="font-display font-bold text-[16px] text-slate">{v.title}</div>
                  <div className="text-[14.5px] leading-relaxed text-slate-soft">{v.body}</div>
                </div>
              ))}
            </div>
            <p className="text-[14.5px] text-slate-soft mt-7 bg-creme rounded-[var(--radius)] p-4">
              <b className="font-semibold text-slate">Prijs op aanvraag.</b> Wat het kost hangt af
              van de auto en de staat van de lak. Laat weten wat je rijdt, dan sturen we een prijs
              op maat.
            </p>
          </div>
          <CoatingForm />
        </div>
      </section>
    </>
  );
}
