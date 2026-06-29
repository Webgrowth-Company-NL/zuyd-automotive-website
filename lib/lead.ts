/**
 * Lead-afhandeling — Forester Lead Engine (gestubd).
 *
 * TODO go-live:
 *  - Zet FORESTER_LEAD_ENGINE_ID + endpoint/credentials in .env.
 *  - Implementeer `dispatchToForester` met de echte Lead Engine-call
 *    (zelfde patroon als captureFormLead / andere klantsites).
 *  - Tot dat moment loggen we de lead server-side zodat niets verloren gaat.
 */

export type LeadType = "bezichtiging" | "inkoop";

export interface BezichtigingLead {
  type: "bezichtiging";
  car?: { slug: string; full: string; prijs: number } | null;
  dag: string; // ISO date (yyyy-mm-dd)
  dagLabel: string;
  tijdslot: string;
  naam: string;
  telefoon: string;
  bericht?: string;
}

export interface InkoopLead {
  type: "inkoop";
  merk: string;
  model: string;
  bouwjaar: string;
  km: string;
  kenteken?: string;
  naam: string;
  telefoon: string;
}

export type Lead = BezichtigingLead | InkoopLead;

export interface LeadResult {
  ok: boolean;
  error?: string;
}

const LEAD_ENGINE_ID = process.env.FORESTER_LEAD_ENGINE_ID;

async function dispatchToForester(lead: Lead): Promise<LeadResult> {
  // STUB: echte Forester Lead Engine-koppeling komt hier.
  // Verwacht payload-vorm sluit aan op de bestaande lead-engine flow.
  if (!LEAD_ENGINE_ID) {
    console.info("[lead] (stub, geen FORESTER_LEAD_ENGINE_ID) ontvangen:", JSON.stringify(lead));
    return { ok: true };
  }

  // Voorbeeld van de toekomstige call (uitgeschakeld tot endpoint bekend is):
  // const res = await fetch(`${process.env.FORESTER_LEAD_ENGINE_URL}/${LEAD_ENGINE_ID}`, {
  //   method: "POST",
  //   headers: { "content-type": "application/json" },
  //   body: JSON.stringify(lead),
  // });
  // return { ok: res.ok };
  console.info("[lead] ontvangen voor engine", LEAD_ENGINE_ID, JSON.stringify(lead));
  return { ok: true };
}

export async function submitLead(lead: Lead): Promise<LeadResult> {
  try {
    return await dispatchToForester(lead);
  } catch (err) {
    console.error("[lead] verzenden mislukt:", err);
    return { ok: false, error: "verzenden mislukt" };
  }
}

/** Eenvoudige validatie aan de systeemgrens (API route). */
export function validateLead(input: unknown): Lead | null {
  if (!input || typeof input !== "object") return null;
  const o = input as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const telOk = (t: string) => t.replace(/\D/g, "").length >= 9;

  if (o.type === "bezichtiging") {
    const naam = str(o.naam);
    const telefoon = str(o.telefoon);
    const dag = str(o.dag);
    const tijdslot = str(o.tijdslot);
    if (naam.length < 2 || !telOk(telefoon) || !dag || !tijdslot) return null;
    const car =
      o.car && typeof o.car === "object"
        ? {
            slug: str((o.car as Record<string, unknown>).slug),
            full: str((o.car as Record<string, unknown>).full),
            prijs: Number((o.car as Record<string, unknown>).prijs) || 0,
          }
        : null;
    return {
      type: "bezichtiging",
      car,
      dag,
      dagLabel: str(o.dagLabel),
      tijdslot,
      naam,
      telefoon,
      bericht: str(o.bericht) || undefined,
    };
  }

  if (o.type === "inkoop") {
    const naam = str(o.naam);
    const telefoon = str(o.telefoon);
    const merk = str(o.merk);
    const model = str(o.model);
    if (naam.length < 2 || !telOk(telefoon) || !merk || !model) return null;
    return {
      type: "inkoop",
      merk,
      model,
      bouwjaar: str(o.bouwjaar),
      km: str(o.km),
      kenteken: str(o.kenteken) || undefined,
      naam,
      telefoon,
    };
  }

  return null;
}
