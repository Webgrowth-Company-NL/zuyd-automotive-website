import Link from "next/link";
import { Car, Globe2, Sparkle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { tekst } from "@/lib/teksten";

/** Icoon en link per dienst, in de volgorde van de teksten in home__diensten. */
const DIENSTEN = [
  { icon: Car, href: "/inruil" },
  { icon: Globe2, href: "/contact" },
  { icon: Sparkle, href: "/detailing" },
];

export async function Diensten() {
  const t = await tekst("home__diensten");
  const diensten = t.items.map((item, i) => ({
    ...DIENSTEN[i % DIENSTEN.length],
    title: item.titel,
    body: item.tekst,
    linkLabel: item.linkLabel,
  }));
  return (
    <section className="max-w-[1200px] mx-auto px-[22px] py-[clamp(48px,6vw,80px)]">
      <Reveal className="mb-9">
        <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-steel">
          {t.eyebrow}
        </span>
        <h2 className="font-display font-extrabold text-[clamp(24px,3.4vw,36px)] tracking-[-0.01em] text-slate mt-3 max-w-[22ch]">
          {t.titel}
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {diensten.map((d, i) => (
          <Reveal key={d.title} delay={i * 80}>
            <div className="bg-white border border-line rounded-[var(--radius-lg)] p-7 h-full flex flex-col">
              <div className="w-[46px] h-[46px] rounded-xl bg-steel/12 grid place-items-center text-steel-deep mb-4">
                <d.icon size={22} />
              </div>
              <h3 className="font-display font-bold text-[18.5px] text-slate mb-2">{d.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-slate-soft flex-1">{d.body}</p>
              <Link
                href={d.href}
                className="inline-flex items-center gap-1.5 font-display font-bold text-[14.5px] text-steel-deep hover:text-steel mt-5 no-underline"
              >
                {d.linkLabel}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
