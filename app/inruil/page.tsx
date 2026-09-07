import type { Metadata } from "next";
import { InruilForm } from "@/components/inruil/inruil-form";
import { breadcrumbLd, JsonLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Inruil · jouw auto in op onze occasion",
  description:
    "Wij ruilen je huidige auto graag in op de auto waar je interesse in hebt. Vul kort je gegevens in en Zuyd Automotive in Breda doet je een voorstel.",
  alternates: { canonical: "/inruil" },
};

const STEPS = [
  {
    n: 1,
    title: "Stuur je gegevens",
    body: "Merk, model, kilometerstand en een beschrijving van eventuele gebreken en beschadigingen.",
  },
  { n: 2, title: "Wij doen een voorstel", body: "Eerlijke prijs, telefonisch of via WhatsApp." },
  { n: 3, title: "Snel geregeld", body: "Akkoord? Dan handelen we het netjes voor je af." },
];

export default function InruilPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: SITE.baseUrl },
          { name: "Inruil", url: `${SITE.baseUrl}/inruil` },
        ])}
      />
      <section className="max-w-[1100px] mx-auto px-[22px] pt-[clamp(40px,6vw,72px)] pb-[clamp(40px,6vw,72px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,4vw,48px)] items-center">
          <div>
            <span className="font-display font-bold text-[13px] tracking-[0.14em] uppercase text-steel">
              Inruil
            </span>
            <h1 className="font-display font-extrabold text-[clamp(30px,4.4vw,46px)] tracking-[-0.02em] text-slate mt-3 leading-[1.07]">
              Jouw auto in op onze occasion
            </h1>
            <p className="text-[17px] leading-relaxed text-slate-soft mt-[18px] max-w-[44ch]">
              Wij ruilen je huidige auto graag in op de auto waar je interesse in hebt. Vul kort je
              gegevens in, dan nemen we contact op met een voorstel.
            </p>
            <div className="flex flex-col gap-4 mt-7">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-3.5 items-start">
                  <span className="w-[30px] h-[30px] rounded-full bg-steel text-white font-display font-extrabold text-sm grid place-items-center shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <div className="font-bold text-[15.5px] text-slate">{s.title}</div>
                    <div className="text-sm text-slate-soft">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <InruilForm />
        </div>
      </section>
    </>
  );
}
