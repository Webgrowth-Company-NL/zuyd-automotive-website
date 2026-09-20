/**
 * De status van een auto, over de foto heen.
 *
 * Leroy, 20-09-2026: "Kan er een banner met de tekst 'verkocht' over eerste
 * foto van de Renault Clio geplaatst worden?" Er stond al een status op de
 * foto, maar als klein grijs pilletje in de hoek: dat leest niemand als
 * verkocht. Vandaar dat een auto die weg is of vastgehouden wordt nu een balk
 * over de foto krijgt, en de rest het pilletje houdt.
 *
 * Staalblauw met crème, zoals de rest van de site. Bewust geen rood: de site is
 * rustig en monochroom gehouden, en "verkocht" is geen waarschuwing.
 */

import type { CarStatus } from "@/lib/inventory";

/** Alleen deze twee krijgen een balk; de auto is dan niet meer te koop. */
const MET_BANNER: CarStatus[] = ["Verkocht", "Gereserveerd"];

export function StatusMarkering({
  status,
  badge,
  klein = false,
}: {
  status: string;
  badge: { bg: string; color: string };
  /** Op een kaartje in het overzicht is alles een maat kleiner. */
  klein?: boolean;
}) {
  if (MET_BANNER.includes(status as CarStatus)) {
    return (
      <span
        className={`absolute inset-x-0 top-1/2 -translate-y-1/2 bg-steel-deep/95 text-creme text-center font-display font-extrabold uppercase tracking-[0.18em] ${
          klein ? "py-2 text-[13px]" : "py-3 text-[15px] sm:text-[17px]"
        }`}
      >
        {status}
      </span>
    );
  }

  return (
    <span
      className={`absolute font-display font-bold rounded-full ${
        klein ? "top-3 left-3 text-[11.5px] px-2.5 py-1.5" : "top-4 left-4 text-xs px-3 py-1.5"
      }`}
      style={{ background: badge.bg, color: badge.color }}
    >
      {status}
    </span>
  );
}
