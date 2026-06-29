import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CarCard } from "@/components/car-card";
import { Reveal } from "@/components/reveal";
import type { CarView } from "@/lib/inventory";

export function Featured({ cars }: { cars: CarView[] }) {
  return (
    <section className="max-w-[1200px] mx-auto px-[22px] py-[clamp(40px,5vw,64px)]">
      <div className="flex items-end justify-between gap-5 flex-wrap mb-7">
        <div>
          <span className="font-display font-bold text-[13px] tracking-[0.14em] uppercase text-steel">
            Uitgelicht
          </span>
          <h2 className="font-display font-extrabold text-[clamp(26px,3.6vw,38px)] tracking-[-0.01em] text-slate mt-2">
            Onze occasions van deze week
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
        {cars.map((car, i) => (
          <Reveal key={car.slug} delay={i * 90} className="h-full">
            <CarCard car={car} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
