import type { Metadata } from "next";
import { InruilForm } from "@/components/inruil/inruil-form";
import { breadcrumbLd, JsonLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site";
import { tekst } from "@/lib/teksten";

export const metadata: Metadata = {
  title: "Inruil · jouw auto in op onze occasion",
  description:
    "Wij ruilen je huidige auto graag in op de auto waar je interesse in hebt. Vul kort je gegevens in en Zuyd Automotive in Breda doet je een voorstel.",
  alternates: { canonical: "/inruil" },
};

export const revalidate = 60;

export default async function InruilPage() {
  const [intro, formulier] = await Promise.all([tekst("inruil__intro"), tekst("inruil__formulier")]);
  const steps = intro.stappen.map((s, i) => ({ n: i + 1, title: s.titel, body: s.tekst }));
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
              {intro.eyebrow}
            </span>
            <h1 className="font-display font-extrabold text-[clamp(30px,4.4vw,46px)] tracking-[-0.02em] text-slate mt-3 leading-[1.07]">
              {intro.titel}
            </h1>
            <p className="text-[17px] leading-relaxed text-slate-soft mt-[18px] max-w-[44ch]">
              {intro.tekst}
            </p>
            <div className="flex flex-col gap-4 mt-7">
              {steps.map((s) => (
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
          <InruilForm t={formulier} />
        </div>
      </section>
    </>
  );
}
