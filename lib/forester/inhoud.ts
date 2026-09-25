/**
 * Inhoud uit Forester, met de JSON in /content als vangnet.
 *
 * Twee soorten inhoud, allebei onder sites/{SITE_ID} in Firestore:
 *
 *  - Secties: de teksten per pagina, in content/{pagina__sectie}. Hetzelfde
 *    patroon als Nordflame en Tornado, dus de editor onder Content en het
 *    tekstgereedschap van Q werken er meteen op.
 *  - Collecties: dingen met vaste velden, zoals de auto's. Het schema staat in
 *    collecties/{naam} en de items in collecties/{naam}/items/{id}. Aan het
 *    schema ziet Q welke velden er zijn en wat hij mag wijzigen.
 *
 * Wat in /content staat is de standaardwaarde. Forester vult aan en
 * overschrijft, maar een leeg veld in Forester laat de standaardtekst staan:
 * een leeg veld is bijna altijd een vergissing, en een gat op de pagina zie je
 * pas als je gaat kijken.
 *
 * Draagbaar: kopieer lib/forester/ naar een andere Next.js-site en zet
 * FORESTER_SITE_ID. De rest van dit bestand weet niets van Zuyd.
 */

import { cache } from "react";
import { getAdminDb } from "./firebase-admin";

export const SITE_ID = process.env.FORESTER_SITE_ID || "zuyd-automotive";

type Json = unknown;

/** Firestore-tijdstempels als tekst, zodat alles naar de client kan. */
function schoon(waarde: Json): Json {
  if (waarde === null || typeof waarde !== "object") return waarde;
  if (Array.isArray(waarde)) return waarde.map(schoon);
  const obj = waarde as Record<string, unknown>;
  if (typeof (obj as { toDate?: unknown }).toDate === "function") {
    return (obj as unknown as { toDate(): Date }).toDate().toISOString();
  }
  if ("_seconds" in obj && "_nanoseconds" in obj) return new Date(Number(obj._seconds) * 1000).toISOString();
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, schoon(v)]));
}

/**
 * Standaard aangevuld met wat Forester heeft.
 *
 * Objecten per veld. Een lijst uit Forester vervangt de standaardlijst in zijn
 * geheel, want een lijst inkorten moet kunnen. Een lege tekst of een lege lijst
 * telt als niet ingevuld.
 */
export function aanvullen<T>(standaard: T, uitForester: Json): T {
  if (uitForester === undefined || uitForester === null) return standaard;
  if (typeof standaard === "string") {
    return (typeof uitForester === "string" && uitForester.trim() ? uitForester : standaard) as T;
  }
  if (typeof standaard === "number") return (typeof uitForester === "number" ? uitForester : standaard) as T;
  if (typeof standaard === "boolean") return (typeof uitForester === "boolean" ? uitForester : standaard) as T;
  if (Array.isArray(standaard)) {
    if (!Array.isArray(uitForester) || uitForester.length === 0) return standaard;
    // Per positie aanvullen, zodat een item met één veld uit Forester de rest
    // van zijn velden uit de standaard houdt.
    const eerste = standaard[0];
    return uitForester.map((w, i) => aanvullen(standaard[i] ?? eerste, w)) as T;
  }
  if (standaard && typeof standaard === "object") {
    if (typeof uitForester !== "object" || Array.isArray(uitForester)) return standaard;
    const uit = { ...(standaard as Record<string, unknown>) };
    for (const [k, v] of Object.entries(uitForester as Record<string, unknown>)) {
      if (k === "updated_at" || k === "updated_by") continue;
      uit[k] = k in uit ? aanvullen(uit[k], v) : v;
    }
    return uit as T;
  }
  return (uitForester ?? standaard) as T;
}

/** Alle secties van de site, één keer per verzoek opgehaald. */
const alleSecties = cache(async (): Promise<Record<string, Json>> => {
  const db = await getAdminDb();
  if (!db) return {};
  try {
    const snap = await db.collection("sites").doc(SITE_ID).collection("content").get();
    return Object.fromEntries(snap.docs.map((d) => [d.id, schoon(d.data())]));
  } catch (err) {
    console.error("[forester] secties ophalen mislukt:", err);
    return {};
  }
});

/** Eén sectie, aangevuld op de standaard uit /content. */
export async function sectie<T>(id: string, standaard: T): Promise<T> {
  const alles = await alleSecties();
  return aanvullen(standaard, alles[id]);
}

export interface Item {
  id: string;
  volgorde?: number;
  gepubliceerd?: boolean;
}

/**
 * De items van een collectie, in volgorde en zonder wat offline staat.
 *
 * Is Forester niet bereikbaar of de collectie leeg, dan de lijst uit /content.
 * Dat de collectie leeg is kan ook betekenen dat Leroy alles verkocht heeft,
 * maar dan staat het schema er nog wel; alleen zonder schema is het echt nog
 * niet ingericht.
 */
export const collectie = cache(async function collectie<T extends Item>(naam: string, standaard: T[]): Promise<T[]> {
  const db = await getAdminDb();
  const zichtbaar = (lijst: T[]) =>
    lijst
      .filter((i) => i.gepubliceerd !== false)
      .sort((a, b) => (a.volgorde ?? 0) - (b.volgorde ?? 0));
  if (!db) return zichtbaar(standaard);
  try {
    const ref = db.collection("sites").doc(SITE_ID).collection("collecties").doc(naam);
    const [schema, items] = await Promise.all([ref.get(), ref.collection("items").get()]);
    if (!schema.exists) return zichtbaar(standaard);
    const perId = new Map(standaard.map((s) => [s.id, s]));
    return zichtbaar(
      items.docs.map((d) => {
        const data = schoon(d.data()) as Record<string, unknown>;
        // Een nieuw item uit Forester staat niet in /content. Dat krijgt geen
        // standaard van een ander item mee, anders erft een nieuwe auto de
        // highlights en het kenteken van de eerste.
        const basis = perId.get(d.id) ?? ({} as T);
        return { ...aanvullen(basis, data), id: d.id } as T;
      }),
    );
  } catch (err) {
    console.error(`[forester] collectie ${naam} ophalen mislukt:`, err);
    return zichtbaar(standaard);
  }
});
