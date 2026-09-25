/**
 * Firebase Admin, alleen aan de serverkant.
 *
 * Gedeeld Firebase-project met Forester OS. Ontbreekt de sleutel of lukt het
 * starten niet, dan geeft dit null terug en valt de site terug op de JSON in
 * /content. De site gaat daardoor nooit plat op Forester.
 */

import type { Firestore } from "firebase-admin/firestore";

let db: Firestore | null = null;
let bezig: Promise<Firestore | null> | null = null;

async function start(): Promise<Firestore | null> {
  const sleutel = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!sleutel) return null;
  try {
    const { getApps, initializeApp, cert } = await import("firebase-admin/app");
    const { getFirestore } = await import("firebase-admin/firestore");
    const app = getApps()[0] ?? initializeApp({ credential: cert(JSON.parse(sleutel)) });
    return getFirestore(app);
  } catch (err) {
    console.error("[forester] Firebase starten mislukt:", err);
    return null;
  }
}

export async function getAdminDb(): Promise<Firestore | null> {
  if (db) return db;
  bezig ??= start().then((d) => {
    db = d;
    bezig = null;
    return d;
  });
  return bezig;
}
