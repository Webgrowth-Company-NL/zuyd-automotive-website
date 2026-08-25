import type { Metadata } from "next";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/reveal";
import { BookButton } from "@/components/booking/book-button";
import { breadcrumbLd, JsonLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Over ons — Leroy van Zuyd Automotive",
  description:
    "Zuyd Automotive wordt gerund door Leroy. Eén aanspreekpunt, één belofte: eerlijke, persoonlijk uitgekozen occasions in Breda. Maak kennis met de man achter Zuyd.",
  alternates: { canonical: "/over-ons" },
};

const VALUES = [
  { title: "Nuchter & eerlijk", body: "We zeggen het zoals het is. Ook als een auto niet bij je past." },
  { title: "Persoonlijk", body: "Vast aanspreekpunt, van bezichtiging tot sleutels." },
  { title: "Zorgvuldig", body: "Elke auto gekeurd en netjes afgeleverd, met garantie." },
];

export default function OverOnsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: SITE.baseUrl },
          { name: "Over ons", url: `${SITE.baseUrl}/over-ons` },
        ])}
      />
      <section className="max-w-[1100px] mx-auto px-[22px] pt-[clamp(40px,6vw,76px)] pb-[clamp(30px,4vw,48px)] text-center">
        <span className="font-display font-bold text-[13px] tracking-[0.14em] uppercase text-steel">
          Over ons
        </span>
        <h1 className="font-display font-extrabold text-[clamp(30px,4.6vw,50px)] tracking-[-0.02em] text-slate mt-3 max-w-[18ch] mx-auto leading-[1.06]">
          Een eerlijke auto, persoonlijk uitgezocht
        </h1>
        <p className="text-[clamp(16px,2vw,19px)] leading-relaxed text-slate-soft mt-5 max-w-[56ch] mx-auto">
          Zuyd Automotive begon met een simpel idee: autokopen kan ook rustig, eerlijk en persoonlijk.
          Geen showroom vol druk, maar één vast aanspreekpunt dat je echt verder helpt.
        </p>
      </section>

      <section className="max-w-[1100px] mx-auto px-[22px] pt-[clamp(20px,3vw,30px)] pb-[clamp(40px,5vw,64px)]">
        <Reveal>
          <Photo
            src="/leroy/pand.jpg"
            alt="Het pand van Zuyd Automotive aan de Riethil in Breda"
            label="foto · het pand aan de riethil"
            sizes="(max-width: 1100px) 100vw, 1056px"
            className="w-full aspect-[16/7] shadow-soft"
          />
        </Reveal>
      </section>

      <section className="bg-white border-y border-line-soft">
        <div className="max-w-[1100px] mx-auto px-[22px] py-[clamp(48px,6vw,80px)]">
          <h2 className="font-display font-extrabold text-[clamp(24px,3.4vw,34px)] text-slate text-center mb-2">
            De man achter Zuyd
          </h2>
          <p className="text-center text-slate-soft text-[16.5px] max-w-[46ch] mx-auto mb-10">
            Bij ons koop je geen auto van een onbekende. Je koopt &apos;m van Leroy.
          </p>
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-stretch bg-warm border border-line-soft rounded-[var(--radius)] overflow-hidden">
              <Photo
                src="/leroy/leroy-portret.jpg"
                alt="Leroy van Zuyd Automotive voor de garage aan de Riethil in Breda"
                label="foto · leroy"
                rounded="rounded-none"
                sizes="(max-width: 640px) 100vw, 480px"
                className="aspect-[4/3] sm:h-full"
              />
              <div className="p-[clamp(22px,3vw,34px)] flex flex-col justify-center">
                <h3 className="font-display font-extrabold text-[clamp(21px,2.4vw,26px)] text-slate">
                  Leroy
                </h3>
                <p className="text-[13.5px] font-semibold text-steel mt-1 mb-3.5 tracking-[0.02em]">
                  Eigenaar · inkoop, verkoop en bezichtigingen
                </p>
                <p className="text-[15.5px] leading-relaxed text-slate-soft">
                  Leroy zoekt elke auto zelf uit en keurt hem voordat hij in de voorraad komt. Alleen
                  wat technisch in orde is en wat hij zelf zou rijden, verkoopt hij door.
                </p>
                <p className="text-[15.5px] leading-relaxed text-slate-soft mt-3">
                  Kom je langs, dan ontvangt hij je persoonlijk en laat hij de auto rustig zien. Hij
                  vertelt eerlijk wat je mag verwachten en denkt met je mee — zonder druk.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-[22px] py-[clamp(48px,6vw,80px)]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="border-l-[3px] border-steel pl-[18px] py-1">
              <h3 className="font-display font-bold text-[18px] text-slate mb-1.5">{v.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-slate-soft">{v.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <BookButton size="lg">Kom langs — plan een bezichtiging</BookButton>
        </div>
      </section>
    </>
  );
}
