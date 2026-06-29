import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, Cog, Fuel, Gauge } from "lucide-react";
import { CarCard } from "@/components/car-card";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/reveal";
import { BookButton } from "@/components/booking/book-button";
import { buttonVariants } from "@/components/ui/button";
import type { CarView } from "@/lib/inventory";

function bookingCarOf(car: CarView) {
  return {
    slug: car.slug,
    full: car.full,
    prijs: car.prijs,
    prijsFmt: car.prijsFmt,
    bouwjaar: car.bouwjaar,
    kmFmt: car.kmFmt,
    cover: car.cover,
  };
}

function SingleSpotlight({ car }: { car: CarView }) {
  const specs = [
    { icon: Calendar, value: String(car.bouwjaar) },
    { icon: Gauge, value: car.kmFmt },
    { icon: Fuel, value: car.brandstof },
    { icon: Cog, value: car.transmissie },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(24px,4vw,48px)] items-center bg-white border border-line rounded-[var(--radius-lg)] p-[clamp(18px,2.5vw,28px)] shadow-soft">
      <Link href={`/occasions/${car.slug}`} className="relative block group">
        <Photo
          src={car.cover ?? undefined}
          alt={`${car.full} occasion`}
          label={`foto · ${car.title}`}
          sizes="(max-width: 1024px) 100vw, 560px"
          className="w-full aspect-[4/3]"
          rounded="rounded-[var(--radius)]"
        />
        <span
          className="absolute top-4 left-4 font-display font-bold text-[11.5px] px-2.5 py-1.5 rounded-full"
          style={{ background: car.badge.bg, color: car.badge.color }}
        >
          {car.status}
        </span>
      </Link>
      <div>
        <h3 className="font-display font-extrabold text-[clamp(24px,3vw,32px)] tracking-[-0.01em] text-slate leading-tight">
          {car.title}
        </h3>
        <p className="text-[16px] text-slate-soft mt-1">{car.variant}</p>
        <div className="flex items-baseline gap-3 mt-3 mb-5">
          <span className="font-display font-extrabold text-[clamp(26px,3.5vw,34px)] text-steel">
            {car.prijsFmt}
          </span>
          <span className="text-sm text-slate-soft">rijklaar incl. garantie</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {specs.map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-warm border border-line-soft rounded-lg px-3 py-2 text-[13px] text-slate"
            >
              <s.icon size={15} className="text-steel" />
              {s.value}
            </span>
          ))}
        </div>
        <ul className="flex flex-col gap-2 mb-6">
          {car.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-center gap-2.5 text-[15px] text-slate">
              <CheckCircle2 size={17} className="text-steel shrink-0" />
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <BookButton car={bookingCarOf(car)} size="md">
            <Calendar size={17} />
            Plan bezichtiging
          </BookButton>
          <Link
            href={`/occasions/${car.slug}`}
            className={buttonVariants({ variant: "secondary", size: "md" })}
          >
            Bekijk deze auto
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Featured({ cars }: { cars: CarView[] }) {
  if (cars.length === 0) return null;
  const single = cars.length === 1;

  return (
    <section className="max-w-[1200px] mx-auto px-[22px] py-[clamp(40px,5vw,64px)]">
      <div className="flex items-end justify-between gap-5 flex-wrap mb-7">
        <div>
          <span className="font-display font-bold text-[13px] tracking-[0.14em] uppercase text-steel">
            Uitgelicht
          </span>
          <h2 className="font-display font-extrabold text-[clamp(26px,3.6vw,38px)] tracking-[-0.01em] text-slate mt-2">
            {single ? "Onze occasion van dit moment" : "Onze occasions van deze week"}
          </h2>
        </div>
        <Link
          href="/occasions"
          className="inline-flex items-center gap-2 h-[46px] px-5 bg-white border-[1.5px] border-line rounded-[11px] font-display font-bold text-[14.5px] text-slate hover:border-steel hover:text-steel-deep transition-colors"
        >
          Hele voorraad
          <ArrowRight size={16} />
        </Link>
      </div>

      {single ? (
        <Reveal>
          <SingleSpotlight car={cars[0]} />
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {cars.map((car, i) => (
            <Reveal key={car.slug} delay={i * 90} className="h-full">
              <CarCard car={car} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
