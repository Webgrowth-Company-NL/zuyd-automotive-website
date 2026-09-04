"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormState {
  autoType: string;
  kleur: string;
  toelichting: string;
  naam: string;
  email: string;
  telefoon: string;
}

const EMPTY: FormState = {
  autoType: "",
  kleur: "",
  toelichting: "",
  naam: "",
  email: "",
  telefoon: "",
};

export function CoatingForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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
        body: JSON.stringify({ type: "coating", ...form }),
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
          Bedankt, we sturen je een prijs
        </h3>
        <p className="text-[15px] text-slate-soft max-w-[34ch] mx-auto mb-5 leading-relaxed">
          De prijs hangt af van de auto en de staat van de lak. We nemen contact op met een
          voorstel op maat.
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
      <h3 className="font-display font-bold text-[19px] text-slate mb-0.5">Vraag een prijs aan</h3>
      <p className="text-[14px] text-slate-soft -mt-2 mb-1">
        De prijs is afhankelijk van de auto, dus we horen graag welke het is.
      </p>
      <Veld
        label="Wat voor auto is het?"
        placeholder="Bijv. Volkswagen Golf 2019"
        required
        value={form.autoType}
        onChange={set("autoType")}
      />
      <Veld
        label="Welke kleur?"
        placeholder="Bijv. zwart metallic"
        required
        value={form.kleur}
        onChange={set("kleur")}
      />
      <div>
        <label className="block text-[13px] font-semibold text-slate mb-1.5">
          Toelichting <span className="text-slate-soft font-normal">(optioneel)</span>
        </label>
        <textarea
          value={form.toelichting}
          onChange={set("toelichting")}
          rows={3}
          placeholder="Staat van de lak, krassen, wensen, laat het weten."
          className={inputCls + " py-3 h-auto resize-y"}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Veld label="Naam" placeholder="Jouw naam" required value={form.naam} onChange={set("naam")} />
        <Veld
          label="Telefoon"
          placeholder="06 12 34 56 78"
          inputMode="tel"
          required
          value={form.telefoon}
          onChange={set("telefoon")}
        />
      </div>
      <Veld
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
        {submitting ? "Versturen…" : "Vraag een prijs aan"}
      </Button>
      <p className="text-[12.5px] text-slate-soft text-center">
        Vrijblijvend. We nemen contact op met een prijs op maat.
      </p>
    </form>
  );
}

const inputCls =
  "w-full h-12 px-3.5 border-[1.5px] border-line rounded-[10px] bg-warm font-sans text-[15px] text-slate outline-none focus:border-steel focus:bg-white transition-colors";

function Veld({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-slate mb-1.5">{label}</label>
      <input {...props} className={inputCls} />
    </div>
  );
}
