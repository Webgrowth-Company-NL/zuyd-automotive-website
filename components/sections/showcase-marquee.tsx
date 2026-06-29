import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import type { CarView } from "@/lib/inventory";

/**
 * "Zuyd in beeld" — byq for-human-stijl filmische marquee van de échte occasions.
 * Geen stockfoto's (off-brand); premium editorial spotlight-kaarten met de
 * merk-gradient + overlay. TODO go-live: echte voertuigfoto's als achtergrond.
 */
function SpotlightCard({ car }: { car: CarView }) {
  return (
    <Link
      href={`/occasions/${car.slug}`}
      className="group relative flex-none w-[300px] sm:w-[360px] h-[440px] sm:h-[480px] rounded-[var(--radius-lg)] overflow-hidden bg-gradient-to-br from-steel to-slate"
    >
      {/* decoratieve ringen (byq-decor) */}
      <span className="absolute -right-16 -top-16 w-56 h-56 rounded-full border-2 border-creme/10" />
      <span className="absolute right-6 top-6 w-32 h-32 rounded-full border-2 border-creme/[0.07]" />
      {/* groot, subtiel model-woordmerk op de achtergrond */}
      <span className="absolute -left-2 bottom-24 font-display font-extrabold text-[clamp(56px,9vw,84px)] leading-none text-white/[0.06] uppercase tracking-tight select-none">
        {car.model}
      </span>

      {/* top: status + prijs */}
      <div className="relative z-10 flex items-start justify-between p-6">
        <span
          className="font-display font-bold text-[11.5px] px-2.5 py-1.5 rounded-full"
          style={{ background: car.badge.bg, color: car.badge.color }}
        >
          {car.status}
        </span>
        <span className="font-display font-extrabold text-[19px] text-creme bg-white/10 backdrop-blur px-3 py-1.5 rounded-full">
          {car.prijsFmt}
        </span>
      </div>

      {/* bottom overlay */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 pt-16 bg-gradient-to-t from-slate/90 via-slate/50 to-transparent">
        <div className="flex flex-col gap-1 mb-4">
          {[`${car.bouwjaar} · ${car.kmFmt}`, `${car.brandstof} · ${car.transmissie}`].map((t) => (
            <span key={t} className="flex items-center gap-2 text-creme/90 text-[12.5px] uppercase tracking-wide font-display font-semibold">
              <Plus size={12} className="text-creme" />
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-display font-extrabold text-[22px] text-white leading-tight">
          {car.title}
        </h3>
        <p className="text-creme/80 text-[14px] mt-0.5">{car.variant}</p>
        <span className="inline-flex items-center gap-1.5 mt-4 font-display font-bold text-[14px] text-creme group-hover:gap-2.5 transition-all">
          Bekijk deze auto
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}

export function ShowcaseMarquee({ cars }: { cars: CarView[] }) {
  if (cars.length === 0) return null;
  const loop = [...cars, ...cars];
  const duration = Math.max(cars.length * 6, 38);

  return (
    <section className="py-[clamp(40px,6vw,80px)] overflow-hidden bg-warm">
      <div className="max-w-[1200px] mx-auto px-[22px] mb-9 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <span className="font-display font-bold text-[13px] tracking-[0.14em] uppercase text-steel">
            Onze occasions
          </span>
          <h2 className="font-display font-extrabold text-[clamp(28px,4.4vw,52px)] tracking-[-0.02em] text-slate mt-2">
            Zuyd in beeld
          </h2>
        </div>
        <Link
          href="/occasions"
          className="font-display font-bold text-[14.5px] text-steel hover:text-steel-deep shrink-0"
        >
          Bekijk de hele voorraad →
        </Link>
      </div>
      <div className="marquee">
        <div className="marquee-track gap-5" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
          {loop.map((car, i) => (
            <SpotlightCard key={`${car.slug}-${i}`} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
