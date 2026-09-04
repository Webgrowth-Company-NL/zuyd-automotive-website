/**
 * Lead-afhandeling via de Forester Lead Engine (captureFormLead).
 *
 * Alleen het inkoopformulier levert nog een lead op. Bezichtigingen lopen
 * bewust rechtstreeks via Leroy (bellen, WhatsApp of mail), dus daar komt geen
 * formulier meer aan te pas.
 *
 * Forester doet de rest: lead opslaan, notificatie naar Leroy, en de
 * bevestigingsmail naar de inzender via Postmark. Die bevestiging is een
 * instelling op de lead engine zelf (`config.settings.confirmationEmail.enabled`),
 * niet iets wat deze site verstuurt.
 *
 * TODO go-live: FORESTER_WEBSITE_ID + FORESTER_LEAD_ENGINE_INKOOP in Vercel
 * zetten. Zolang die leeg zijn logt de site de lead server-side, zodat niets
 * verloren gaat.
 */

const CAPTURE_URL =
  "https://europe-west4-webgrowth-company-lzz4e6.cloudfunctions.net/captureFormLead";

export interface InkoopLead {
  type: "inkoop";
  merk: string;
  model: string;
  bouwjaar: string;
  km: string;
  kenteken?: string;
  onderhoudshistorie?: string;
  aankomendOnderhoud?: string;
  naam: string;
  email: string;
  telefoon: string;
}

/** Keramische coating: prijs is op aanvraag, dus we vragen auto en kleur uit. */
export interface CoatingLead {
  type: "coating";
  autoType: string;
  kleur: string;
  toelichting?: string;
  naam: string;
  email: string;
  telefoon: string;
}

export type Lead = InkoopLead | CoatingLead;

export interface LeadResult {
  ok: boolean;
  error?: string;
}

const WEBSITE_ID = process.env.FORESTER_WEBSITE_ID;

function engineIdVoor(type: Lead["type"]): string | undefined {
  return type === "inkoop"
    ? process.env.FORESTER_LEAD_ENGINE_INKOOP
    : process.env.FORESTER_LEAD_ENGINE_COATING;
}

/** Vlakke payload; captureFormLead mapt op de keys name/email/phone. */
function payloadVoor(lead: Lead, engineId: string | undefined) {
  const basis = {
    websiteId: WEBSITE_ID,
    ...(engineId ? { leadEngineId: engineId } : {}),
    formId: lead.type,
    name: lead.naam,
    email: lead.email,
    phone: lead.telefoon,
    submittedAt: new Date().toISOString(),
  };

  if (lead.type === "coating") {
    return {
      ...basis,
      pageId: "/detailing",
      answer_autoType: lead.autoType,
      answer_kleur: lead.kleur,
      answer_toelichting: lead.toelichting ?? "",
    };
  }

  return {
    ...basis,
    pageId: "/inkoop",
    answer_merk: lead.merk,
    answer_model: lead.model,
    answer_bouwjaar: lead.bouwjaar,
    answer_km: lead.km,
    answer_kenteken: lead.kenteken ?? "",
    answer_onderhoudshistorie: lead.onderhoudshistorie ?? "",
    answer_aankomendOnderhoud: lead.aankomendOnderhoud ?? "",
  };
}

async function dispatchToForester(lead: Lead): Promise<LeadResult> {
  if (!WEBSITE_ID) {
    console.warn(
      "[lead] FORESTER_WEBSITE_ID ontbreekt, lead niet verstuurd, alleen gelogd:",
      JSON.stringify(lead),
    );
    return { ok: true };
  }
  const engineId = engineIdVoor(lead.type);
  if (!engineId) {
    // Zonder engine stuurt Forester geen bevestigingsmail naar de inzender.
    console.warn(`[lead] geen lead engine voor "${lead.type}", geen bevestigingsmail`);
  }

  const res = await fetch(CAPTURE_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payloadVoor(lead, engineId)),
  });

  if (!res.ok) {
    const tekst = await res.text().catch(() => "");
    console.error("[lead] captureFormLead mislukt:", res.status, tekst);
    return { ok: false, error: "verzenden mislukt" };
  }

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

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
const telOk = (t: string) => t.replace(/\D/g, "").length >= 9;

/** Eenvoudige validatie aan de systeemgrens (API route). */
export function validateLead(input: unknown): Lead | null {
  if (!input || typeof input !== "object") return null;
  const o = input as Record<string, unknown>;
  if (o.type !== "inkoop" && o.type !== "coating") return null;

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const naam = str(o.naam);
  const email = str(o.email).toLowerCase();
  const telefoon = str(o.telefoon);
  if (naam.length < 2 || !emailOk(email) || !telOk(telefoon)) return null;

  if (o.type === "coating") {
    const autoType = str(o.autoType);
    const kleur = str(o.kleur);
    if (!autoType || !kleur) return null;
    return {
      type: "coating",
      autoType,
      kleur,
      toelichting: str(o.toelichting) || undefined,
      naam,
      email,
      telefoon,
    };
  }

  const merk = str(o.merk);
  const model = str(o.model);
  if (!merk || !model) return null;

  return {
    type: "inkoop",
    merk,
    model,
    bouwjaar: str(o.bouwjaar),
    km: str(o.km),
    kenteken: str(o.kenteken) || undefined,
    onderhoudshistorie: str(o.onderhoudshistorie) || undefined,
    aankomendOnderhoud: str(o.aankomendOnderhoud) || undefined,
    naam,
    email,
    telefoon,
  };
}
