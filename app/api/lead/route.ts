import { NextResponse } from "next/server";
import { submitLead, validateLead } from "@/lib/lead";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "ongeldige aanvraag" }, { status: 400 });
  }

  const lead = validateLead(body);
  if (!lead) {
    return NextResponse.json({ ok: false, error: "controleer je gegevens" }, { status: 422 });
  }

  const result = await submitLead(lead);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error ?? "verzenden mislukt" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
