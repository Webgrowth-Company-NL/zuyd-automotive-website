"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/cn";

interface Review {
  quote: string;
  name: string;
  place: string;
  avatar: string;
}

// TODO go-live: echte reviews + portretten (Google-reviews). byq CDN als placeholder.
const REVIEWS: Review[] = [
  {
    quote:
      "Rustig geholpen door Leroy, alle tijd genomen. Eerlijk verhaal over de auto en netjes afgeleverd. Precies wat je wil bij het kopen van een occasion.",
    name: "Sandra",
    place: "Breda",
    avatar: "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-3.webp",
  },
  {
    quote:
      "Fijne, nuchtere mensen. Geen gladde verkooppraat. Onze eerste gezinsauto met een gerust gevoel gekocht bij Zuyd.",
    name: "Mehmet",
    place: "Etten-Leur",
    avatar: "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-1.webp",
  },
  {
    quote:
      "Auto online gevonden, bezichtiging gepland, en alles klopte. Aanrader voor wie geen gedoe wil en gewoon een goede auto zoekt.",
    name: "Patrick",
    place: "Oosterhout",
    avatar: "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar.webp",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % REVIEWS.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: number) => setI((p) => (p + dir + REVIEWS.length) % REVIEWS.length);
  const r = REVIEWS[i];

  return (
    <section className="max-w-[1200px] mx-auto px-[22px] py-[clamp(48px,6vw,80px)]">
      <div className="flex items-end justify-between gap-5 flex-wrap mb-8">
        <div>
          <span className="font-display font-bold text-[13px] tracking-[0.14em] uppercase text-steel">
            Wat kopers zeggen
          </span>
          <h2 className="font-display font-extrabold text-[clamp(26px,3.6vw,38px)] tracking-[-0.01em] text-slate mt-2">
            Met een gerust gevoel gereden
          </h2>
        </div>
        <div className="flex gap-2.5">
          <SliderBtn label="Vorige" onClick={() => go(-1)}>
            <ArrowLeft size={18} />
          </SliderBtn>
          <SliderBtn label="Volgende" onClick={() => go(1)}>
            <ArrowRight size={18} />
          </SliderBtn>
        </div>
      </div>

      <div
        className="bg-white border border-line rounded-[var(--radius-lg)] shadow-soft overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
          <div className="relative h-[220px] md:h-auto bg-creme-deep">
            <Image
              key={r.avatar}
              src={r.avatar}
              alt={`${r.name} uit ${r.place}`}
              fill
              sizes="260px"
              className="object-cover z-fade"
            />
          </div>
          <div className="p-7 md:p-10 flex flex-col justify-center">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={17} className="fill-steel text-steel" />
              ))}
            </div>
            <blockquote
              key={r.quote}
              className="font-display font-semibold text-[clamp(18px,2.2vw,24px)] leading-snug text-slate z-fade"
            >
              “{r.quote}”
            </blockquote>
            <figcaption className="mt-5 text-[15px] text-slate-soft">
              <b className="font-display font-bold text-slate">{r.name}</b> — {r.place}
            </figcaption>
            <div className="flex gap-1.5 mt-6">
              {REVIEWS.map((_, d) => (
                <button
                  key={d}
                  onClick={() => setI(d)}
                  aria-label={`Review ${d + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    d === i ? "w-6 bg-steel" : "w-1.5 bg-line",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="w-11 h-11 grid place-items-center bg-white border border-line rounded-xl text-slate hover:border-steel hover:text-steel-deep transition-colors"
    >
      {children}
    </button>
  );
}
