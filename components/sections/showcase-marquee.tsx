import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import type { CarView } from "@/lib/inventory";

interface Shot {
  src: string;
  href: string;
  title: string;
  labels: string[];
}

/**
 * "Zuyd in beeld" — byq for-human-stijl filmische image-marquee met de échte
 * voertuigfoto's. Pauzeert bij hover. Geen stockbeeld: alleen onze eigen auto's.
 */
function ShotCard({ shot }: { shot: Shot }) {
  return (
    <Link
      href={shot.href}
      className="group relative flex-none w-[300px] sm:w-[420px] h-[420px] sm:h-[500px] rounded-[var(--radius-lg)] overflow-hidden"
    >
      <Image
        src={shot.src}
        alt={shot.title}
        fill
        sizes="(max-width: 640px) 300px, 420px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate/85 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1.5">
        {shot.labels.map((label) => (
          <span
            key={label}
            className="flex items-center gap-2.5 text-creme uppercase text-[12px] tracking-wide font-display font-semibold"
          >
            <Plus size={12} className="text-creme" />
            {label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 mt-2 font-display font-bold text-[15px] text-white">
          {shot.title}
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function ShowcaseMarquee({ cars }: { cars: CarView[] }) {
  // Vlakke lijst van échte foto's; bij placeholder (geen foto's) tonen we niets.
  const shots: Shot[] = cars.flatMap((car) =>
    car.photos.map((src) => ({
      src,
      href: `/occasions/${car.slug}`,
      title: `${car.title} · ${car.prijsFmt}`,
      labels: [`${car.brandstof} · ${car.transmissie}`, `${car.bouwjaar} · ${car.kmFmt}`],
    })),
  );
  if (shots.length === 0) return null;

  // Genoeg kaarten voor een vloeiende loop (verdubbel tot minstens 6).
  let base = shots;
  while (base.length < 6) base = [...base, ...shots];
  const loop = [...base, ...base];
  const duration = Math.max(base.length * 6, 40);

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
          {loop.map((shot, i) => (
            <ShotCard key={`${shot.src}-${i}`} shot={shot} />
          ))}
        </div>
      </div>
    </section>
  );
}
