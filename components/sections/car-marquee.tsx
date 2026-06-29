import Link from "next/link";
import { Photo } from "@/components/ui/photo";
import type { CarView } from "@/lib/inventory";

/** Doorlopende band met occasions (CSS-marquee, pauzeert bij hover). */
export function CarMarquee({ cars }: { cars: CarView[] }) {
  const items = [...cars, ...cars]; // verdubbeld voor naadloze loop

  return (
    <section className="py-[clamp(28px,4vw,44px)] overflow-hidden border-y border-line-soft bg-white">
      <div className="max-w-[1200px] mx-auto px-[22px] mb-6 flex items-end justify-between gap-4 flex-wrap">
        <h2 className="font-display font-bold text-[clamp(18px,2.4vw,24px)] text-slate">
          Een greep uit de voorraad
        </h2>
        <Link
          href="/occasions"
          className="font-display font-bold text-[14.5px] text-steel hover:text-steel-deep"
        >
          Bekijk alles →
        </Link>
      </div>
      <div className="marquee relative">
        <div
          className="marquee-track gap-4"
          style={{ ["--marquee-duration" as string]: `${Math.max(items.length * 4, 36)}s` }}
        >
          {items.map((car, idx) => (
            <Link
              key={`${car.slug}-${idx}`}
              href={`/occasions/${car.slug}`}
              className="group w-[260px] shrink-0 bg-warm border border-line rounded-[var(--radius)] overflow-hidden hover:border-steel transition-colors"
              aria-hidden={idx >= cars.length}
              tabIndex={idx >= cars.length ? -1 : undefined}
            >
              <Photo
                alt={`${car.full} occasion`}
                label={`foto · ${car.title}`}
                rounded="rounded-none"
                sizes="260px"
                className="w-full aspect-[16/10]"
              />
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-display font-bold text-[15px] text-slate truncate">
                    {car.title}
                  </div>
                  <div className="text-[12.5px] text-slate-soft truncate">{car.bouwjaar} · {car.kmFmt}</div>
                </div>
                <span className="font-display font-extrabold text-[15px] text-steel-deep shrink-0">
                  {car.prijsFmt}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
