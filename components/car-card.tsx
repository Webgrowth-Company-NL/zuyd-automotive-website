import Link from "next/link";
import { ArrowRight, Calendar, Fuel, Gauge } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import type { CarView } from "@/lib/inventory";

export function CarCard({ car, priority }: { car: CarView; priority?: boolean }) {
  return (
    <Link
      href={`/occasions/${car.slug}`}
      className="group h-full bg-white border border-line rounded-[var(--radius)] overflow-hidden shadow-sm flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3]">
        <Photo
          src={car.cover ?? undefined}
          alt={`${car.full} occasion`}
          label={`foto · ${car.title}`}
          rounded="rounded-none"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 290px"
          className="w-full h-full"
        />
        <span
          className="absolute top-3 left-3 font-display font-bold text-[11.5px] px-2.5 py-1.5 rounded-full"
          style={{ background: car.badge.bg, color: car.badge.color }}
        >
          {car.status}
        </span>
      </div>
      <div className="p-[18px] pb-5 flex flex-col gap-3.5 flex-1">
        <div>
          <h3 className="font-display font-bold text-[18px] text-slate leading-tight">
            {car.title}
          </h3>
          <p className="mt-0.5 text-[13.5px] text-slate-soft">{car.variant}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <SpecChip icon={<Calendar size={14} />}>{car.bouwjaar}</SpecChip>
          <SpecChip icon={<Gauge size={14} />}>{car.kmFmt}</SpecChip>
          <SpecChip icon={<Fuel size={14} />}>{car.brandstof}</SpecChip>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-1.5 border-t border-line-soft">
          <span className="font-display font-extrabold text-[22px] text-slate">{car.prijsFmt}</span>
          <span className="inline-flex items-center gap-1.5 h-10 px-[15px] bg-steel text-creme font-display font-bold text-[13.5px] rounded-[10px] transition-colors group-hover:bg-steel-deep">
            Bekijk
            <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SpecChip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-warm border border-line-soft rounded-lg px-2.5 py-1.5 text-[12.5px] text-slate-soft">
      {icon}
      {children}
    </span>
  );
}
