/**
 * De teksten van de site, per sectie, uit content/secties.json.
 *
 * Dat bestand wordt beheerd vanuit Forester (via Q of het inhoudsscherm), dat
 * de wijziging in deze repo commit. De site leest alleen het bestand: hij weet
 * niets van Forester of een database.
 *
 * Async met opzet: de pagina's wachten er al op, en zo blijft de aanroep gelijk
 * als de bron ooit verandert.
 */

import type { Metadata } from "next";

import SECTIES from "@/content/secties.json";
import { SITE } from "@/lib/site";

export type Secties = typeof SECTIES;
export type SectieId = keyof Secties;
/** Het type van één sectie, ook bruikbaar in client components (alleen type). */
export type Teksten<K extends SectieId> = Secties[K];

export async function tekst<K extends SectieId>(id: K): Promise<Secties[K]> {
  return SECTIES[id];
}

/** Vult {naam}-plekken in een tekst, bv. "{stad} · Riethil 14." */
export function vul(sjabloon: string, waarden: Record<string, string>): string {
  return sjabloon.replace(/\{(\w+)\}/g, (heel, naam: string) => waarden[naam] ?? heel);
}

type Meta = { titel: string; omschrijving: string; zoekwoord: string };

/**
 * Titel en omschrijving van een pagina, uit <pagina>__meta. Aan te passen in
 * Forester (Inhoud, Op de site, knop SEO). Het zoekwoord is alleen voor de
 * checks in Forester en komt niet in de HTML.
 *
 * openGraph en twitter gaan mee, want een pagina die die zelf zet vervangt
 * ze uit de layout helemaal, ook de deelafbeelding uit opengraph-image.tsx.
 * Die zetten we er daarom zelf weer bij.
 */
export async function metaVan(pagina: string, pad: string, opties: { absoluut?: boolean } = {}): Promise<Metadata> {
  const m = (SECTIES as Record<string, unknown>)[`${pagina}__meta`] as Meta | undefined;
  if (!m) return { alternates: { canonical: pad } };
  const volledig = opties.absoluut ? m.titel : `${m.titel} · ${SITE.name}`;
  return {
    title: opties.absoluut ? { absolute: m.titel } : m.titel,
    description: m.omschrijving,
    alternates: { canonical: pad },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      url: pad === "/" ? SITE.baseUrl : `${SITE.baseUrl}${pad}`,
      title: volledig,
      description: m.omschrijving,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: { card: "summary_large_image", title: volledig, description: m.omschrijving, images: ["/opengraph-image"] },
  };
}
