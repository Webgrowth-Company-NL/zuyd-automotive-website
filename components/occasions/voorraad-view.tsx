"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CarCard } from "@/components/car-card";
import { Button } from "@/components/ui/button";
import { euro, km as kmFmt } from "@/lib/format";
import type { CarView } from "@/lib/inventory";

interface Filters {
  merk: string;
  brandstof: string;
  transmissie: string;
  maxPrijs: number;
  minBouwjaar: number;
  maxKm: number;
}

const DEFAULTS: Filters = {
  merk: "Alle merken",
  brandstof: "Alle",
  transmissie: "Alle",
  maxPrijs: 12000,
  minBouwjaar: 2015,
  maxKm: 140000,
};

export function VoorraadView({ cars }: { cars: CarView[] }) {
  const [f, setF] = useState<Filters>(DEFAULTS);

  const brandOptions = useMemo(
    () => ["Alle merken", ...Array.from(new Set(cars.map((c) => c.merk))).sort()],
    [cars],
  );

  const filtered = useMemo(
    () =>
      cars.filter(
        (c) =>
          (f.merk === "Alle merken" || c.merk === f.merk) &&
          (f.brandstof === "Alle" || c.brandstof === f.brandstof) &&
          (f.transmissie === "Alle" || c.transmissie === f.transmissie) &&
          c.prijs <= f.maxPrijs &&
          c.bouwjaar >= f.minBouwjaar &&
          c.km <= f.maxKm,
      ),
    [cars, f],
  );

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setF((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-wrap gap-7 items-start">
      {/* Filters */}
      <aside className="flex-[1_1_248px] min-w-[240px] max-w-[300px] lg:sticky lg:top-[88px] bg-white border border-line rounded-[var(--radius)] p-[22px] shadow-sm">
        <div className="flex items-center justify-between mb-[18px]">
          <span className="inline-flex items-center gap-2 font-display font-bold text-[15px] text-slate">
            <SlidersHorizontal size={17} />
            Filters
          </span>
          <button
            onClick={() => setF(DEFAULTS)}
            className="text-[13px] font-semibold text-steel hover:text-steel-deep"
          >
            Wissen
          </button>
        </div>
        <div className="flex flex-col gap-[18px]">
          <SelectField
            label="Merk"
            value={f.merk}
            onChange={(v) => set("merk", v)}
            options={brandOptions}
          />
          <SelectField
            label="Brandstof"
            value={f.brandstof}
            onChange={(v) => set("brandstof", v)}
            options={["Alle", "Benzine", "Hybride"]}
          />
          <SelectField
            label="Transmissie"
            value={f.transmissie}
            onChange={(v) => set("transmissie", v)}
            options={["Alle", "Handgeschakeld", "Automaat"]}
          />
          <RangeField
            label="Max. prijs"
            display={euro(f.maxPrijs)}
            min={8000}
            max={12000}
            step={250}
            value={f.maxPrijs}
            onChange={(v) => set("maxPrijs", v)}
          />
          <RangeField
            label="Vanaf bouwjaar"
            display={String(f.minBouwjaar)}
            min={2015}
            max={2019}
            step={1}
            value={f.minBouwjaar}
            onChange={(v) => set("minBouwjaar", v)}
          />
          <RangeField
            label="Max. km-stand"
            display={kmFmt(f.maxKm)}
            min={50000}
            max={140000}
            step={5000}
            value={f.maxKm}
            onChange={(v) => set("maxKm", v)}
          />
        </div>
      </aside>

      {/* Results */}
      <div className="flex-[999_1_320px] min-w-[300px]">
        <div className="text-[14.5px] text-slate-soft mb-4">
          <b className="text-slate font-bold">{filtered.length}</b> auto&apos;s gevonden
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[22px]">
            {filtered.map((car) => (
              <CarCard key={car.slug} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-5 bg-white border border-dashed border-line rounded-[var(--radius)]">
            <div className="font-display font-bold text-[18px] text-slate mb-1.5">
              Geen auto&apos;s met deze filters
            </div>
            <p className="text-[14.5px] text-slate-soft mb-[18px]">
              Verruim je filters om meer occasions te zien.
            </p>
            <Button size="sm" onClick={() => setF(DEFAULTS)}>
              Filters wissen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-slate mb-[7px]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[46px] px-3 border-[1.5px] border-line rounded-[10px] bg-white font-sans text-[15px] text-slate outline-none focus:border-steel cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function RangeField({
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-[13px] font-semibold text-slate">{label}</label>
        <span className="text-[13px] font-bold text-steel">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
      />
    </div>
  );
}
