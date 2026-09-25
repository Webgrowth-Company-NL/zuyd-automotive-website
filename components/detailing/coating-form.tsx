"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Teksten } from "@/lib/teksten";

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

export function CoatingForm({ t }: { t: Teksten<"detailing__formulier"> }) {
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
        setError(t.foutMislukt);
        return;
      }
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(t.foutVerbinding);
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
          {t.bedanktTitel}
        </h3>
        <p className="text-[15px] text-slate-soft max-w-[34ch] mx-auto mb-5 leading-relaxed">
          {t.bedanktTekst}
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
          }}
        >
          {t.bedanktKnop}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-line rounded-[var(--radius-lg)] p-[clamp(22px,3vw,32px)] shadow-soft flex flex-col gap-3.5"
    >
      <h3 className="font-display font-bold text-[19px] text-slate mb-0.5">{t.titel}</h3>
      <p className="text-[14px] text-slate-soft -mt-2 mb-1">
        {t.intro}
      </p>
      <Veld
        label={t.autoType}
        placeholder={t.autoTypePlaceholder}
        required
        value={form.autoType}
        onChange={set("autoType")}
      />
      <Veld
        label={t.kleur}
        placeholder={t.kleurPlaceholder}
        required
        value={form.kleur}
        onChange={set("kleur")}
      />
      <div>
        <label className="block text-[13px] font-semibold text-slate mb-1.5">
          {t.toelichting}{" "}
          <span className="text-slate-soft font-normal">{t.optioneel}</span>
        </label>
        <textarea
          value={form.toelichting}
          onChange={set("toelichting")}
          rows={3}
          placeholder={t.toelichtingPlaceholder}
          className={inputCls + " py-3 h-auto resize-y"}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Veld label={t.naam} placeholder={t.naamPlaceholder} required value={form.naam} onChange={set("naam")} />
        <Veld
          label={t.telefoon}
          placeholder={t.telefoonPlaceholder}
          inputMode="tel"
          required
          value={form.telefoon}
          onChange={set("telefoon")}
        />
      </div>
      <Veld
        label={t.email}
        placeholder={t.emailPlaceholder}
        type="email"
        inputMode="email"
        required
        value={form.email}
        onChange={set("email")}
      />
      {error && <p className="text-sm text-[#b4452f]">{error}</p>}
      <Button type="submit" size="md" disabled={submitting} className="mt-1.5 h-[54px]">
        {submitting ? t.knopBezig : t.knop}
      </Button>
      <p className="text-[12.5px] text-slate-soft text-center">
        {t.voetnoot}
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
