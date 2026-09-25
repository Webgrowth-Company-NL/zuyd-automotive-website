/**
 * Zet de inhoud uit /content in Forester (Firestore + Storage).
 *
 *   node scripts/forester-vullen.mjs            alleen wat er nog niet staat
 *   node scripts/forester-vullen.mjs --droog    laat zien wat er zou gebeuren
 *   node scripts/forester-vullen.mjs --overschrijf   ook bestaande items en secties
 *
 * Zonder --overschrijf blijft alles wat al in Forester staat onaangeroerd. Dat
 * is de standaard met een reden: na de eerste keer is Forester de bron, en wat
 * Leroy via Q aanpaste (een kilometerstand, een verkochte auto) mag niet worden
 * teruggezet door een script dat de oude JSON nog eens inleest.
 *
 * Het schema wordt wel altijd bijgewerkt: dat is van ons, niet van de klant.
 *
 * Foto's: lokale paden (/occasions/audi/1.jpg) gaan naar Storage onder
 * sites/{SITE_ID}/{collectie}/{item}/ en worden in het item vervangen door de
 * Storage-URL. Een foto die er al staat wordt niet opnieuw geüpload.
 *
 * Sleutel: FIREBASE_SERVICE_ACCOUNT_KEY uit de omgeving, of anders uit
 * .env.local van Forester (../../Webgrowth Company Platform/.env.local).
 * Draagbaar: pas SITE_ID en COLLECTIES aan voor een andere site.
 */

import { existsSync, readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cert, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const SITE_ID = process.env.FORESTER_SITE_ID || "zuyd-automotive";
const BUCKET = process.env.FIREBASE_STORAGE_BUCKET || "webgrowth-company-lzz4e6.firebasestorage.app";
const COLLECTIES = [{ naam: "occasions", items: "content/occasions.json", schema: "content/occasions.schema.json" }];
const SECTIES = "content/secties.json";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DROOG = process.argv.includes("--droog");
const OVERSCHRIJF = process.argv.includes("--overschrijf");

function sleutel() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) return process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  const env = path.resolve(ROOT, "../../Webgrowth Company Platform/.env.local");
  if (!existsSync(env)) throw new Error("Geen FIREBASE_SERVICE_ACCOUNT_KEY en geen Forester .env.local gevonden");
  const regel = readFileSync(env, "utf8")
    .split(/\r?\n/)
    .find((r) => r.startsWith("FIREBASE_SERVICE_ACCOUNT_KEY="));
  if (!regel) throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY staat niet in Forester .env.local");
  return regel.slice("FIREBASE_SERVICE_ACCOUNT_KEY=".length).replace(/^"(.*)"$/, "$1");
}

const lees = (p) => JSON.parse(readFileSync(path.join(ROOT, p), "utf8"));

initializeApp({ credential: cert(JSON.parse(sleutel())) });
const db = getFirestore();
const bucket = getStorage().bucket(BUCKET);
const site = db.collection("sites").doc(SITE_ID);

/** Een lokale foto naar Storage, of de URL als hij er al staat. */
async function foto(lokaal, doel) {
  if (/^https?:\/\//.test(lokaal)) return lokaal;
  const bron = path.join(ROOT, "public", lokaal.replace(/^\//, ""));
  if (!existsSync(bron)) {
    console.warn(`  ! foto ontbreekt: ${lokaal}`);
    return null;
  }
  const bestand = bucket.file(doel);
  const [bestaat] = await bestand.exists();
  let token;
  if (bestaat) {
    const [meta] = await bestand.getMetadata();
    token = meta.metadata?.firebaseStorageDownloadTokens;
  }
  if (!token) {
    token = randomUUID();
    if (DROOG) return `(upload ${lokaal} -> ${doel})`;
    await bucket.upload(bron, {
      destination: doel,
      metadata: {
        contentType: "image/jpeg",
        cacheControl: "public, max-age=31536000, immutable",
        metadata: { firebaseStorageDownloadTokens: token },
      },
    });
  }
  return `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(doel)}?alt=media&token=${token}`;
}

async function schrijf(ref, data, omschrijving) {
  const bestaat = (await ref.get()).exists;
  if (bestaat && !OVERSCHRIJF) {
    console.log(`  = ${omschrijving} staat er al, overgeslagen`);
    return;
  }
  console.log(`  ${bestaat ? "~" : "+"} ${omschrijving}`);
  if (!DROOG) await ref.set({ ...data, updated_at: FieldValue.serverTimestamp(), updated_by: "script:forester-vullen" });
}

for (const c of COLLECTIES) {
  const schema = lees(c.schema);
  const ref = site.collection("collecties").doc(c.naam);
  console.log(`Collectie ${c.naam}`);
  console.log(`  ~ schema (${schema.velden.length} velden)`);
  if (!DROOG) await ref.set({ ...schema, updated_at: FieldValue.serverTimestamp() });

  for (const item of lees(c.items)) {
    const { id, ...velden } = item;
    const fotoVeld = schema.fotoVeld ?? "images";
    if (Array.isArray(velden[fotoVeld])) {
      const urls = [];
      for (const lokaal of velden[fotoVeld]) {
        const naam = path.basename(lokaal);
        const url = await foto(lokaal, `sites/${SITE_ID}/${c.naam}/${id}/${naam}`);
        if (url) urls.push(url);
      }
      velden[fotoVeld] = urls;
    }
    await schrijf(ref.collection("items").doc(id), velden, `${velden.merk ?? ""} ${velden.model ?? id}`.trim());
  }
}

if (existsSync(path.join(ROOT, SECTIES))) {
  const secties = lees(SECTIES);
  console.log(`Secties (${Object.keys(secties).length})`);
  for (const [id, data] of Object.entries(secties)) {
    await schrijf(site.collection("content").doc(id), data, id);
  }
} else {
  console.log(`Geen ${SECTIES}, secties overgeslagen`);
}

console.log(DROOG ? "\nDroog: er is niets geschreven." : "\nKlaar.");
process.exit(0);
