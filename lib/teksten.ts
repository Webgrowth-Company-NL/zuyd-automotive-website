/**
 * De teksten van de site, per sectie.
 *
 * De standaardtekst staat in content/secties.json. Forester (via Q of de
 * editor) kan elke sectie aanvullen of overschrijven; zie lib/forester/inhoud.
 * Alleen aanroepen vanuit server components. Client components krijgen hun
 * tekst als prop mee van de dichtstbijzijnde page of layout.
 */

import SECTIES from "@/content/secties.json";
import { sectie } from "@/lib/forester/inhoud";

export type Secties = typeof SECTIES;
export type SectieId = keyof Secties;
/** Het type van één sectie, ook bruikbaar in client components (alleen type). */
export type Teksten<K extends SectieId> = Secties[K];

export function tekst<K extends SectieId>(id: K): Promise<Secties[K]> {
  return sectie(id, SECTIES[id]);
}

/** Vult {naam}-plekken in een tekst, bv. "{stad} · Riethil 14." */
export function vul(sjabloon: string, waarden: Record<string, string>): string {
  return sjabloon.replace(/\{(\w+)\}/g, (heel, naam: string) => waarden[naam] ?? heel);
}
