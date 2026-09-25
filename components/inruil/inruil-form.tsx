"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Teksten } from "@/lib/teksten";

interface FormState {
  merk: string;
  model: string;
  bouwjaar: string;
  km: string;
  kenteken: string;
  gebreken: string;
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
  gebreken: "",
  onderhoudshistorie: "",
  aankomendOnderhoud: "",
  naam: "",
  email: "",
  telefoon: "",
};

export function InruilForm({ t }: { t: Teksten<"inruil__formulier"> }) {
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
        <p className="text-[15px] text-slate-soft max-w-[32ch] mx-auto mb-5 leading-relaxed">
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
      <div className="grid grid-cols-2 gap-3">
        <Input label={t.merk} placeholder={t.merkPlaceholder} required value={form.merk} onChange={set("merk")} />
        <Input label={t.model} placeholder={t.modelPlaceholder} required value={form.model} onChange={set("model")} />
        <Input
          label={t.bouwjaar}
          placeholder={t.bouwjaarPlaceholder}
          inputMode="numeric"
          required
          value={form.bouwjaar}
          onChange={set("bouwjaar")}
        />
        <Input
          label={t.km}
          placeholder={t.kmPlaceholder}
          inputMode="numeric"
          required
          value={form.km}
          onChange={set("km")}
        />
      </div>
      <Input label={t.kenteken} placeholder={t.kentekenPlaceholder} value={form.kenteken} onChange={set("kenteken")} />
      <div>
        <label className="block text-[13px] font-semibold text-slate mb-1.5">
          {t.historie}
        </label>
        <select
          value={form.onderhoudshistorie}
          onChange={(e) => setForm((f) => ({ ...f, onderhoudshistorie: e.target.value }))}
          required
          className="w-full h-12 px-3.5 border-[1.5px] border-line rounded-[10px] bg-warm font-sans text-[15px] text-slate outline-none focus:border-steel focus:bg-white transition-colors"
        >
          <option value="">{t.historieKeuze}</option>
          {t.historieOpties.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-slate mb-1.5">
          {t.gebreken}{" "}
          <span className="text-slate-soft font-normal">{t.optioneel}</span>
        </label>
        <textarea
          value={form.gebreken}
          onChange={(e) => setForm((f) => ({ ...f, gebreken: e.target.value }))}
          rows={3}
          placeholder={t.gebrekenPlaceholder}
          className="w-full px-3.5 py-3 border-[1.5px] border-line rounded-[10px] bg-warm font-sans text-[15px] text-slate outline-none focus:border-steel focus:bg-white transition-colors resize-y"
        />
        <p className="text-[12.5px] text-slate-soft mt-1.5">
          {t.gebrekenHulp}
        </p>
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-slate mb-1.5">
          {t.onderhoud}{" "}
          <span className="text-slate-soft font-normal">{t.optioneel}</span>
        </label>
        <textarea
          value={form.aankomendOnderhoud}
          onChange={(e) => setForm((f) => ({ ...f, aankomendOnderhoud: e.target.value }))}
          rows={2}
          placeholder={t.onderhoudPlaceholder}
          className="w-full px-3.5 py-3 border-[1.5px] border-line rounded-[10px] bg-warm font-sans text-[15px] text-slate outline-none focus:border-steel focus:bg-white transition-colors resize-y"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label={t.naam} placeholder={t.naamPlaceholder} required value={form.naam} onChange={set("naam")} />
        <Input
          label={t.telefoon}
          placeholder={t.telefoonPlaceholder}
          inputMode="tel"
          required
          value={form.telefoon}
          onChange={set("telefoon")}
        />
      </div>
      <Input
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
