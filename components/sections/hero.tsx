"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Phone } from "lucide-react";
import { BookButton } from "@/components/booking/book-button";
import { buttonVariants } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/cn";
import type { Teksten } from "@/lib/teksten";

// byq-supply CDN portretten als tijdelijke social-proof avatars.
// TODO go-live: vervangen door echte klant-/teamfoto's of weglaten.
const AVATARS = [
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar.webp",
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-1.webp",
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-2.webp",
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-3.webp",
];

export function Hero({ heroImage, t }: { heroImage?: string; t: Teksten<"home__hero"> }) {
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);
  const ROTATING = t.roterend;
  const aantal = ROTATING.length;

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setIdx((i) => (i + 1) % aantal), 2600);
    return () => clearInterval(timer);
  }, [aantal]);

  return (
    <section className="max-w-[1200px] mx-auto px-[22px] pt-[clamp(40px,7vw,76px)] pb-[clamp(36px,5vw,56px)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,4vw,56px)] items-center">
        {/* Left */}
        <div
          className={cn(
            "transition-all duration-700 ease-out",
            mounted ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-[10px] translate-y-3",
          )}
        >
          <span className="inline-flex items-center gap-2 bg-white border border-line text-steel-deep font-semibold text-[13px] px-3.5 py-1.5 rounded-full shadow-sm">
            <span className="w-[7px] h-[7px] rounded-full bg-steel" />
            {t.eyebrow}
          </span>

          {/* De rotator staat bewust BUITEN de h1: alle varianten zitten in de
              DOM voor de animatie, en binnen de h1 leest een zoekmachine ze als
              één lange kop aan elkaar geplakt. */}
          <h1 className="font-display font-extrabold text-[clamp(34px,5.4vw,58px)] leading-[1.04] tracking-[-0.02em] text-slate mt-[22px]">
            {t.titel}
          </h1>
          <div
            aria-hidden
            className="font-display font-extrabold text-[clamp(34px,5.4vw,58px)] leading-[1.04] tracking-[-0.02em] relative block h-[1.12em] overflow-hidden text-steel"
          >
            {ROTATING.map((word, i) => (
              <span
                key={word}
                className="absolute inset-x-0 transition-all duration-500 ease-out"
                style={{
                  transform: `translateY(${(i - idx) * 100}%)`,
                  opacity: i === idx ? 1 : 0,
                }}
              >
                {word}
              </span>
            ))}
          </div>

          <p className="text-[clamp(16px,2vw,19px)] leading-relaxed text-slate-soft max-w-[40ch] mt-5">
            {t.intro}
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <BookButton size="lg">
              <Phone size={18} />
              {t.knopAfspraak}
            </BookButton>
            <Link href="/occasions" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              {t.knopVoorraad}
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-8">
            <div className="flex items-center">
              {AVATARS.map((src, i) => (
                <span
                  key={src}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 border-warm overflow-hidden transition-opacity duration-700",
                    i > 0 && "-ml-3.5",
                    mounted ? "opacity-100" : "opacity-0",
                  )}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <Image src={src} alt="" width={40} height={40} className="object-cover w-full h-full" />
                </span>
              ))}
            </div>
            <span className="text-[14.5px] text-slate-soft">
              <b className="font-display font-bold text-slate">{t.beoordeling}</b> {t.beoordelingTekst}
            </span>
          </div>
        </div>

        {/* Right */}
        <div
          className={cn(
            "relative transition-all duration-700 ease-out delay-150",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          <div className="absolute -right-4 -top-4 bottom-10 left-11 bg-steel rounded-[var(--radius-lg)] z-0" />
          <Photo
            src={heroImage}
            alt="Renault Clio E-Tech Hybrid R.S. Line · occasion bij Zuyd Automotive in Breda"
            label="uitgelichte auto · hoofdfoto"
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="relative z-[1] w-full aspect-[4/3.1] shadow-lg"
          />
          {/* Rating chip top-right */}
          <div className="absolute z-[2] right-3 top-3 bg-white/92 backdrop-blur border border-line rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-soft">
            <Check size={15} className="text-steel" />
            <span className="text-[12.5px] font-semibold text-slate">{t.fotoLabel}</span>
          </div>
          {/* Floating Leroy card */}
          <div className="absolute -left-1.5 -bottom-[18px] z-[2] bg-white border border-line rounded-2xl px-[18px] py-3.5 shadow-lg flex items-center gap-3.5 max-w-[280px]">
            <Photo
              src="/leroy/leroy-avatar.jpg"
              alt="Leroy van Zuyd Automotive"
              rounded="rounded-full"
              sizes="46px"
              className="w-[46px] h-[46px] shrink-0"
            />
            <span className="leading-snug">
              <span className="block font-display font-bold text-[14.5px] text-slate">
                {t.leroyTitel}
              </span>
              <span className="block text-[13px] text-slate-soft">{t.leroyTekst}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
