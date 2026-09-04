"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormState {
  merk: string;
  model: string;
  bouwjaar: string;
  km: string;
  kenteken: string;
  onderhoudshistorie: string;
  aankomendOnderhoud: string;
  naam: string;
  email: string;
  telefoon: string;
}

const EMPTY: FormState = {
  merk: "",
  model: "",
  bouwjaar: "",
  km: "",
  kenteken: "",
  onderhoudshistorie: "",
  aankomendOnderhoud: "",
  naam: "",
  email: "",
  telefoon: "",
};

const HISTORIE_OPTIES = [
  "Ja, volledig",
  "Deels bekend",
  "Nee, niet bekend",
];

export function InkoopForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "inkoop", ...form }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) {
        setError("Er ging iets mis. Probeer het zo nog eens of bel ons even.");
        return;
      }
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Geen verbinding. Probeer het zo nog eens of bel ons even.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-white border border-line rounded-[var(--radius-lg)] p-[clamp(22px,3vw,32px)] shadow-soft text-center">
        <div className="w-16 h-16 rounded-full bg-steel/14 grid place-items-center mx-auto mb-4 text-steel-deep">
          <Check size={30} strokeWidth={2.2} />
        </div>
        <h3 className="font-display font-extrabold text-[21px] text-slate mb-1.5">
          Bedankt, we nemen contact op
        </h3>
        <p className="text-[15px] text-slate-soft max-w-[32ch] mx-auto mb-5 leading-relaxed">
          Leroy belt je binnen één werkdag met een eerlijk voorstel.
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
          }}
        >
          Nog een auto aanmelden
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-line rounded-[var(--radius-lg)] p-[clamp(22px,3vw,32px)] shadow-soft flex flex-col gap-3.5"
    >
      <h3 className="font-display font-bold text-[19px] text-slate mb-0.5">Meld je auto aan</h3>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Merk" placeholder="Volkswagen" required value={form.merk} onChange={set("merk")} />
        <Input label="Model" placeholder="Golf" required value={form.model} onChange={set("model")} />
        <Input
          label="Bouwjaar"
          placeholder="2018"
          inputMode="numeric"
          required
          value={form.bouwjaar}
          onChange={set("bouwjaar")}
        />
        <Input
          label="Km-stand"
          placeholder="85.000"
          inputMode="numeric"
          required
          value={form.km}
          onChange={set("km")}
        />
      </div>
      <Input label="Kenteken" placeholder="XX-123-X" value={form.kenteken} onChange={set("kenteken")} />
      <div>
        <label className="block text-[13px] font-semibold text-slate mb-1.5">
          Is de onderhoudshistorie bekend?
        </label>
        <select
          value={form.onderhoudshistorie}
          onChange={(e) => setForm((f) => ({ ...f, onderhoudshistorie: e.target.value }))}
          required
          className="w-full h-12 px-3.5 border-[1.5px] border-line rounded-[10px] bg-warm font-sans text-[15px] text-slate outline-none focus:border-steel focus:bg-white transition-colors"
        >
          <option value="">Maak een keuze</option>
          {HISTORIE_OPTIES.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-slate mb-1.5">
          Welk onderhoud komt eraan?{" "}
          <span className="text-slate-soft font-normal">(optioneel)</span>
        </label>
        <textarea
          value={form.aankomendOnderhoud}
          onChange={(e) => setForm((f) => ({ ...f, aankomendOnderhoud: e.target.value }))}
          rows={2}
          placeholder="Bijv. beurt over 5.000 km, APK in maart, distributieriem gedaan"
          className="w-full px-3.5 py-3 border-[1.5px] border-line rounded-[10px] bg-warm font-sans text-[15px] text-slate outline-none focus:border-steel focus:bg-white transition-colors resize-y"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Naam" placeholder="Jouw naam" required value={form.naam} onChange={set("naam")} />
        <Input
          label="Telefoon"
          placeholder="06 12 34 56 78"
          inputMode="tel"
          required
          value={form.telefoon}
          onChange={set("telefoon")}
        />
      </div>
      <Input
        label="E-mailadres"
        placeholder="jouw@mail.nl"
        type="email"
        inputMode="email"
        required
        value={form.email}
        onChange={set("email")}
      />
      {error && <p className="text-sm text-[#b4452f]">{error}</p>}
      <Button type="submit" size="md" disabled={submitting} className="mt-1.5 h-[54px]">
        {submitting ? "Versturen…" : "Vraag een voorstel aan"}
      </Button>
      <p className="text-[12.5px] text-slate-soft text-center">
        Geen verplichtingen. We bellen je voor een eerlijke prijs.
      </p>
    </form>
  );
}

function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-slate mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full h-12 px-3.5 border-[1.5px] border-line rounded-[10px] bg-warm font-sans text-[15px] text-slate outline-none focus:border-steel focus:bg-white transition-colors"
      />
    </div>
  );
}
