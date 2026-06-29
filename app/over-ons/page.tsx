import type { Metadata } from "next";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/reveal";
import { BookButton } from "@/components/booking/book-button";
import { breadcrumbLd, JsonLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Over ons — Leroy en Max",
  description:
    "Zuyd Automotive wordt gerund door Leroy en Max. Twee mensen, één belofte: eerlijke, persoonlijk uitgekozen occasions in Breda. Maak kennis met de mensen achter Zuyd.",
  alternates: { canonical: "/over-ons" },
};

const TEAM = [
  {
    naam: "Leroy",
    rol: "Verkoop & bezichtigingen",
    label: "foto · leroy",
    body: "Leroy ontvangt je en laat de auto rustig zien. Hij vertelt eerlijk wat je mag verwachten en denkt met je mee — zonder druk.",
  },
  {
    naam: "Max",
    rol: "Inkoop & techniek",
    label: "foto · max",
    body: "Max selecteert en keurt elke auto. Alleen wat technisch in orde is en wat we zelf zouden rijden, komt in de voorraad.",
  },
];

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
          Geen showroom vol druk, maar twee mensen die je echt verder helpen.
        </p>
      </section>

      <section className="max-w-[1100px] mx-auto px-[22px] pt-[clamp(20px,3vw,30px)] pb-[clamp(40px,5vw,64px)]">
        <Reveal>
          <Photo
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
            De mensen achter Zuyd
          </h2>
          <p className="text-center text-slate-soft text-[16.5px] max-w-[46ch] mx-auto mb-10">
            Bij ons koop je geen auto van een onbekende. Je koopt &apos;m van Leroy of Max.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TEAM.map((m, i) => (
              <Reveal key={m.naam} delay={i * 100}>
                <div className="bg-warm border border-line-soft rounded-[var(--radius)] overflow-hidden h-full">
                  <Photo
                    alt={`${m.naam} van Zuyd Automotive`}
                    label={m.label}
                    rounded="rounded-none"
                    sizes="(max-width: 640px) 100vw, 528px"
                    className="aspect-[4/3]"
                  />
                  <div className="p-[22px]">
                    <h3 className="font-display font-extrabold text-[21px] text-slate">{m.naam}</h3>
                    <p className="text-[13.5px] font-semibold text-steel mt-1 mb-3 tracking-[0.02em]">
                      {m.rol}
                    </p>
                    <p className="text-[15px] leading-relaxed text-slate-soft">{m.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
