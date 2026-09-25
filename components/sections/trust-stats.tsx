import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";
import type { CarView } from "@/lib/inventory";
import { tekst, vul } from "@/lib/teksten";

function StatCard({ eyebrow, value, label }: { eyebrow: string; value: string; label: string }) {
  return (
    <div className="flex flex-col justify-between gap-6 bg-creme rounded-[var(--radius-lg)] p-7 min-h-[180px]">
      <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-steel-deep">
        {eyebrow}
      </span>
      <div>
        <div className="font-display font-extrabold text-[clamp(36px,4vw,52px)] leading-none text-slate">
          {value}
        </div>
        <div className="text-[15px] text-slate-soft mt-2">{label}</div>
      </div>
    </div>
  );
}

/**
 * De twee sfeerfoto's komen uit de echte voorraad, zodat er geen placeholder
 * blijft staan en het meebeweegt als de voorraad wisselt. De eerste auto slaan
 * we over: die staat al groot in de hero.
 */
export async function TrustStats({ cars = [] }: { cars?: CarView[] }) {
  const t = await tekst("home__vertrouwen");
  const [stat1, stat2] = t.stats;
  const metFoto = cars.filter((c) => c.cover);
  const sfeerbeelden: (CarView | undefined)[] = [metFoto[1], metFoto[2] ?? metFoto[0]];

  return (
    <section className="bg-white border-y border-line-soft">
      <div className="max-w-[1200px] mx-auto px-[22px] py-[clamp(48px,6vw,80px)]">
        <Reveal className="mb-10">
          <div className="w-full h-0 border-b border-dashed border-slate/15 mb-7" />
          <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-steel">
            {t.eyebrow}
          </span>
          <h2 className="font-display font-extrabold text-[clamp(26px,3.6vw,42px)] tracking-[-0.02em] text-slate mt-3 max-w-[18ch]">
            {t.titel}
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 [grid-auto-rows:auto]">
            {stat1 && <StatCard eyebrow={t.statEyebrow} value={stat1.waarde} label={stat1.label} />}

            <Photo
              src="/leroy/leroy-voor-de-box.jpg"
              alt="Leroy laat een occasion zien in de garage van Zuyd Automotive in Breda"
              label="foto · bezichtiging"
              sizes="(max-width: 1024px) 100vw, 280px"
              className="h-[300px] lg:h-auto lg:row-span-2"
              rounded="rounded-[var(--radius-lg)]"
            />

            {stat2 && <StatCard eyebrow={t.statEyebrow} value={stat2.waarde} label={stat2.label} />}

            {sfeerbeelden.map((car, i) => (
              <Photo
                key={car?.slug ?? `leeg-${i}`}
                src={car?.cover ?? undefined}
                alt={car ? `${car.full} occasion bij Zuyd Automotive` : "Occasion van Zuyd Automotive"}
                label="foto · occasion"
                sizes="(max-width: 1024px) 100vw, 280px"
                className="h-[300px]"
                rounded="rounded-[var(--radius-lg)]"
              />
            ))}

            <div className="sm:col-span-2 relative flex flex-col justify-between gap-6 bg-steel rounded-[var(--radius-lg)] p-8 min-h-[300px] overflow-hidden text-creme">
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/95 relative z-10">
                {t.garantieEyebrow}
              </span>
              <div className="relative z-10">
                <div className="font-display font-extrabold text-[clamp(30px,3.4vw,42px)] leading-[1.1]">
                  {t.garantieTitel}
                </div>
                <div className="text-[15px] text-white/95 mt-2 max-w-[36ch]">
                  {t.garantieTekst}
                  {" "}
                  {vul(t.garantieAdres, { stad: SITE.address.city })}
                </div>
              </div>
              <div className="absolute border border-dashed border-creme/40 rounded-full w-[400px] h-[400px] -bottom-44 -right-32" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
