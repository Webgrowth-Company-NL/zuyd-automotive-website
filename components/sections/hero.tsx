"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Check } from "lucide-react";
import { BookButton } from "@/components/booking/book-button";
import { buttonVariants } from "@/components/ui/button";
import { ZBadge } from "@/components/brand/logo";
import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/cn";

const ROTATING = [
  "persoonlijk uitgekozen",
  "gekeurd & met garantie",
  "zonder verkooppraat",
  "klaar voor de weg",
];

// byq-supply CDN portretten als tijdelijke social-proof avatars.
// TODO go-live: vervangen door echte klant-/teamfoto's of weglaten.
const AVATARS = [
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar.webp",
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-1.webp",
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-2.webp",
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-3.webp",
];

export function Hero({ heroImage }: { heroImage?: string }) {
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);

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
            Occasions in Breda · persoonlijk geselecteerd
          </span>

          <h1 className="font-display font-extrabold text-[clamp(34px,5.4vw,58px)] leading-[1.04] tracking-[-0.02em] text-slate mt-[22px]">
            Betrouwbare occasions in Breda,
            <span className="relative block h-[1.12em] overflow-hidden text-steel">
              {ROTATING.map((word, i) => (
                <span
                  key={word}
                  className="absolute inset-x-0 transition-all duration-500 ease-out"
                  style={{
                    transform: `translateY(${(i - idx) * 100}%)`,
                    opacity: i === idx ? 1 : 0,
                  }}
                  aria-hidden={i !== idx}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p className="text-[clamp(16px,2vw,19px)] leading-relaxed text-slate-soft max-w-[40ch] mt-5">
            Een eerlijke auto, zonder verkooppraat. Plan online zelf je persoonlijke bezichtiging met
            Leroy en bekijk hem rustig op je gemak.
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <BookButton size="lg">
              <Calendar size={18} />
              Plan een bezichtiging
            </BookButton>
            <Link href="/occasions" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Bekijk de voorraad
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
              <b className="font-display font-bold text-slate">4,9</b> gemiddeld · kopers uit Breda e.o.
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
            alt="Renault Clio E-Tech Hybrid R.S. Line — occasion bij Zuyd Automotive in Breda"
            label="uitgelichte auto · hoofdfoto"
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="relative z-[1] w-full aspect-[4/3.1] shadow-lg"
          />
          {/* Rating chip top-right */}
          <div className="absolute z-[2] right-3 top-3 bg-white/92 backdrop-blur border border-line rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-soft">
            <Check size={15} className="text-steel" />
            <span className="text-[12.5px] font-semibold text-slate">Gekeurd & garantie</span>
          </div>
          {/* Floating Leroy card */}
          <div className="absolute -left-1.5 -bottom-[18px] z-[2] bg-white border border-line rounded-2xl px-[18px] py-3.5 shadow-lg flex items-center gap-3.5 max-w-[280px]">
            <ZBadge size={46} />
            <span className="leading-snug">
              <span className="block font-display font-bold text-[14.5px] text-slate">
                Welkom bij Leroy
              </span>
              <span className="block text-[13px] text-slate-soft">Hij laat je de auto rustig zien</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
