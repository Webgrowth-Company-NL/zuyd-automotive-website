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

import SECTIES from "@/content/secties.json";

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
