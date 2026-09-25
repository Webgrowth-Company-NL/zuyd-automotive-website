import { CalendarCheck, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { tekst } from "@/lib/teksten";

/** Iconen in de volgorde van de items in home__usp. */
const ICONEN = [UserCheck, CalendarCheck, Sparkles, ShieldCheck];

export async function Usp() {
  const t = await tekst("home__usp");
  const items = t.items.map((item, i) => ({
    icon: ICONEN[i % ICONEN.length],
    title: item.titel,
    body: item.tekst,
  }));
  return (
    <section className="bg-white border-y border-line-soft">
      <div className="max-w-[1200px] mx-auto px-[22px] py-[clamp(48px,6vw,80px)]">
        <Reveal>
          <h2 className="font-display font-extrabold text-[clamp(24px,3.4vw,36px)] tracking-[-0.01em] text-slate max-w-[20ch] mb-2">
            {t.titel}
          </h2>
          <p className="text-slate-soft text-[17px] max-w-[52ch] mb-9">
            {t.intro}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="bg-warm border border-line-soft rounded-[var(--radius)] p-6 h-full">
                <div className="w-[46px] h-[46px] rounded-xl bg-steel/12 grid place-items-center text-steel-deep mb-4">
                  <item.icon size={22} />
                </div>
                <h3 className="font-display font-bold text-[17.5px] text-slate mb-1.5">
                  {item.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-slate-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
