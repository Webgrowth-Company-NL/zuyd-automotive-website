"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, Check, MapPin, X, Car as CarIcon } from "lucide-react";
import { BookingContext, type BookingCar } from "./booking-context";
import { ZBadge } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { buildDays, SLOTS, type BookingDay } from "@/lib/booking-days";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

type Step = 1 | 2 | "done";

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [car, setCar] = useState<BookingCar | null>(null);

  const [step, setStep] = useState<Step>(1);
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [naam, setNaam] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [bericht, setBericht] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<BookingDay[]>([]);

  const open = useCallback((c?: BookingCar | null) => {
    setCar(c ?? null);
    setStep(1);
    setDay("");
    setSlot("");
    setNaam("");
    setTelefoon("");
    setBericht("");
    setError(null);
    setSubmitting(false);
    setDays(buildDays(6));
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Body scroll lock + ESC
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const telOk = (t: string) => t.replace(/\D/g, "").length >= 9;
  const step1Valid = !!(day && slot);
  const step2Valid = naam.trim().length >= 2 && telOk(telefoon);
  const chosen = useMemo(() => days.find((d) => d.key === day), [days, day]);
  const progress = step === "done" ? 100 : step === 2 ? 66 : 33;

  async function submit() {
    if (!step2Valid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "bezichtiging",
          car: car ? { slug: car.slug, full: car.full, prijs: car.prijs } : null,
          dag: day,
          dagLabel: chosen?.label ?? "",
          tijdslot: slot,
          naam: naam.trim(),
          telefoon: telefoon.trim(),
          bericht: bericht.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) {
        setError("Er ging iets mis. Probeer het zo nog eens of bel ons even.");
        return;
      }
      setStep("done");
    } catch {
      setError("Geen verbinding. Probeer het zo nog eens of bel ons even.");
    } finally {
      setSubmitting(false);
    }
  }

  const ctx = useMemo(() => ({ open }), [open]);

  return (
    <BookingContext.Provider value={ctx}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center z-fade">
          <button
            aria-label="Sluiten"
            onClick={close}
            className="absolute inset-0 bg-slate/50 backdrop-blur-[3px] cursor-default"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Bezichtiging plannen met Leroy"
            className="relative w-full max-w-[560px] max-h-[94vh] overflow-y-auto bg-warm rounded-t-[24px] shadow-lg z-sheet"
          >
            {/* Header + progress */}
            <div className="sticky top-0 z-[2] bg-warm px-[22px] pt-5 pb-4 border-b border-line-soft">
              <div className="flex items-center justify-between gap-3.5">
                <div className="flex items-center gap-3.5">
                  <ZBadge size={46} />
                  <div className="leading-tight">
                    <div className="font-display font-bold text-base text-slate">
                      Bezichtiging met Leroy
                    </div>
                    <div className="text-[13px] text-slate-soft">Persoonlijk, op je gemak</div>
                  </div>
                </div>
                <button
                  onClick={close}
                  aria-label="Sluiten"
                  className="w-10 h-10 grid place-items-center bg-white border border-line rounded-[10px] text-slate hover:border-steel transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="h-[5px] rounded-full bg-line mt-4 overflow-hidden">
                <div
                  className="h-full bg-steel rounded-full transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="p-[22px]">
              {car && step !== "done" && (
                <div className="flex items-center gap-3.5 bg-white border border-line rounded-[var(--radius)] p-3 mb-5">
                  <div className="w-16 h-12 rounded-[9px] shrink-0 bg-creme-deep" />
                  <div className="leading-tight flex-1 min-w-0">
                    <div className="font-display font-bold text-[15px] text-slate truncate">
                      {car.full}
                    </div>
                    <div className="text-[13px] text-slate-soft">
                      {car.prijsFmt} · {car.bouwjaar} · {car.kmFmt}
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 className="font-display font-bold text-[19px] text-slate mb-1">
                    Kies een dag en tijd
                  </h3>
                  <p className="text-sm text-slate-soft mb-[18px]">
                    Bij Leroy aan de {SITE.address.street.split(" - ")[0]} in {SITE.address.city}.
                  </p>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2.5 mb-[22px]">
                    {days.map((d) => {
                      const sel = day === d.key;
                      return (
                        <button
                          key={d.key}
                          onClick={() => setDay(d.key)}
                          className={cn(
                            "rounded-xl px-1.5 py-3 text-center border-[1.5px] transition-all",
                            sel ? "bg-steel border-steel" : "bg-white border-line hover:border-steel",
                          )}
                        >
                          <span
                            className={cn(
                              "block text-xs uppercase tracking-wider",
                              sel ? "text-creme/85" : "text-slate-soft",
                            )}
                          >
                            {d.dow}
                          </span>
                          <span
                            className={cn(
                              "block font-display font-extrabold text-xl my-0.5",
                              sel ? "text-creme" : "text-slate",
                            )}
                          >
                            {d.dayNum}
                          </span>
                          <span
                            className={cn(
                              "block text-[11.5px]",
                              sel ? "text-creme/85" : "text-slate-soft",
                            )}
                          >
                            {d.mon}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-[13px] font-semibold text-slate mb-2.5">Tijdslot</div>
                  <div className="flex flex-wrap gap-2.5">
                    {SLOTS.map((t) => {
                      const sel = slot === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setSlot(t)}
                          className={cn(
                            "rounded-[11px] px-[18px] py-3 font-display font-bold text-[15px] border-[1.5px] transition-all",
                            sel
                              ? "bg-steel border-steel text-creme"
                              : "bg-white border-line text-slate hover:border-steel",
                          )}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="font-display font-bold text-[19px] text-slate mb-1">
                    Jouw gegevens
                  </h3>
                  <p className="text-sm text-slate-soft mb-[18px]">
                    Zodat Leroy je kan bevestigen. Meer hoeft niet.
                  </p>
                  <Field label="Naam">
                    <input
                      value={naam}
                      onChange={(e) => setNaam(e.target.value)}
                      placeholder="Bijv. Sanne de Vries"
                      autoComplete="name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Telefoonnummer">
                    <input
                      value={telefoon}
                      onChange={(e) => setTelefoon(e.target.value)}
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="06 12 34 56 78"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Bericht" optional>
                    <textarea
                      value={bericht}
                      onChange={(e) => setBericht(e.target.value)}
                      placeholder="Heb je een vraag vooraf? Laat het weten."
                      rows={3}
                      className={cn(inputCls, "h-auto py-3.5 resize-y")}
                    />
                  </Field>
                  {error && <p className="text-sm text-[#b4452f] mt-1">{error}</p>}
                </div>
              )}

              {step === "done" && (
                <div className="text-center pt-2 pb-1 z-fade">
                  <div className="w-[66px] h-[66px] rounded-full bg-steel/15 grid place-items-center mx-auto mb-[18px] text-steel-deep">
                    <Check size={32} strokeWidth={2.2} />
                  </div>
                  <h3 className="font-display font-extrabold text-[23px] text-slate mb-1.5">
                    Tot snel, {naam.trim().split(" ")[0]}!
                  </h3>
                  <p className="text-[15px] text-slate-soft mx-auto mb-[22px] max-w-[34ch] leading-relaxed">
                    Leroy belt je kort om je afspraak te bevestigen. Je hoeft niets te betalen.
                  </p>
                  <div className="bg-white border border-line rounded-[var(--radius)] p-[18px] text-left flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-[15px] text-slate">
                      <Calendar size={18} className="text-steel shrink-0" />
                      <span>
                        <b className="font-semibold">{chosen?.label}</b> om{" "}
                        <b className="font-semibold">{slot}</b>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[15px] text-slate">
                      <MapPin size={18} className="text-steel shrink-0" />
                      <span>
                        {SITE.address.street.split(" - ")[0]}, {SITE.address.city}
                      </span>
                    </div>
                    {car && (
                      <div className="flex items-center gap-3 text-[15px] text-slate">
                        <CarIcon size={18} className="text-steel shrink-0" />
                        <span>{car.full}</span>
                      </div>
                    )}
                  </div>
                  <Button onClick={close} size="md" className="w-full mt-5">
                    Klaar
                  </Button>
                </div>
              )}
            </div>

            {/* Footer actions */}
            {step === 1 && (
              <div className="sticky bottom-0 bg-warm border-t border-line-soft p-4 px-[22px] flex gap-3">
                <Button variant="secondary" size="md" onClick={close} className="px-5">
                  Annuleer
                </Button>
                <Button
                  size="md"
                  disabled={!step1Valid}
                  onClick={() => step1Valid && setStep(2)}
                  className="flex-1"
                >
                  Volgende
                </Button>
              </div>
            )}
            {step === 2 && (
              <div className="sticky bottom-0 bg-warm border-t border-line-soft p-4 px-[22px] flex gap-3">
                <Button variant="secondary" size="md" onClick={() => setStep(1)} className="px-5">
                  Terug
                </Button>
                <Button
                  size="md"
                  disabled={!step2Valid || submitting}
                  onClick={submit}
                  className="flex-1"
                >
                  {submitting ? "Versturen…" : "Bevestig bezichtiging"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}

const inputCls =
  "w-full h-[52px] px-[15px] border-[1.5px] border-line rounded-[11px] bg-white font-sans text-base text-slate outline-none focus:border-steel transition-colors";

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="block text-[13.5px] font-semibold text-slate mb-[7px]">
        {label}
        {optional && <span className="text-slate-soft font-normal"> (optioneel)</span>}
      </label>
      {children}
    </div>
  );
}
