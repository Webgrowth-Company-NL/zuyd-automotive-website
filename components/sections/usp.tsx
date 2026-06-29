import { CalendarCheck, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";

const ITEMS = [
  {
    icon: UserCheck,
    title: "Persoonlijk uitgekozen",
    body: "Elke auto rijden we zelf en kiezen we met zorg. Alleen wat wij zelf zouden kopen.",
  },
  {
    icon: CalendarCheck,
    title: "Plan zelf je bezichtiging",
    body: "Kies online een moment dat jou uitkomt. Leroy staat voor je klaar, zonder gehaast.",
  },
  {
    icon: Sparkles,
    title: "Eerlijke prijs",
    body: "Een heldere prijs zonder verrassingen achteraf. Je weet precies wat je krijgt.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie op orde",
    body: "Gekeurd en met onderhoudshistorie. We leveren de auto netjes en compleet af.",
  },
];

export function Usp() {
  return (
    <section className="bg-white border-y border-line-soft">
      <div className="max-w-[1200px] mx-auto px-[22px] py-[clamp(48px,6vw,80px)]">
        <Reveal>
          <h2 className="font-display font-extrabold text-[clamp(24px,3.4vw,36px)] tracking-[-0.01em] text-slate max-w-[20ch] mb-2">
            Autokopen zoals het hoort: rustig en eerlijk
          </h2>
          <p className="text-slate-soft text-[17px] max-w-[52ch] mb-9">
            Geen druk, geen rode uitroeptekens. Wel een eerlijke auto en een persoon die je echt te
            woord staat.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map((item, i) => (
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
