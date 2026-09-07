"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Phone, Mail, X } from "lucide-react";
import { BookingContext, type BookingCar } from "./booking-context";
import { ZBadge } from "@/components/brand/logo";
import { WhatsappIcon } from "@/components/ui/icons";
import { SITE, mailHref, telHref, whatsappHref } from "@/lib/site";

/**
 * Afspraak maken loopt bewust via Leroy zelf: bellen, appen of mailen.
 * Deze schil houdt de bestaande `BookButton`-aanroepen intact en geeft de
 * auto waar de bezoeker vandaan komt mee in het WhatsApp- en mailbericht.
 */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [car, setCar] = useState<BookingCar | null>(null);

  const open = useCallback((c?: BookingCar | null) => {
    setCar(c ?? null);
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

  const ctx = useMemo(() => ({ open }), [open]);

  const onderwerp = car
    ? `Bezichtiging ${car.full}`
    : "Afspraak voor een bezichtiging";
  const bericht = car
    ? `Hoi Leroy, ik wil graag de ${car.full} (${car.prijsFmt}) bekijken. Wanneer kan dat?`
    : "Hoi Leroy, ik wil graag langskomen om een auto te bekijken. Wanneer kan dat?";

  return (
    <BookingContext.Provider value={ctx}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center z-fade">
          <button
            aria-label="Sluiten"
            onClick={close}
            className="absolute inset-0 bg-slate/50 backdrop-blur-[3px] cursor-default"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Afspraak maken met Leroy"
            className="relative w-full max-w-[460px] max-h-[94vh] overflow-y-auto bg-warm rounded-t-[24px] sm:rounded-[24px] shadow-lg z-sheet"
          >
            <div className="flex items-center justify-between gap-3.5 px-[22px] pt-5 pb-4 border-b border-line-soft">
              <div className="flex items-center gap-3.5">
                <ZBadge size={46} />
                <div className="leading-tight">
                  <div className="font-display font-bold text-base text-slate">
                    Afspraak met Leroy
                  </div>
                  <div className="text-[13px] text-slate-soft">
                    Even contact, dan staat het zo
                  </div>
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

            <div className="p-[22px]">
              {car && (
                <div className="flex items-center gap-3.5 bg-white border border-line rounded-[var(--radius)] p-3 mb-5">
                  <div className="relative w-16 h-12 rounded-[9px] shrink-0 overflow-hidden bg-creme-deep">
                    {car.cover && (
                      <Image src={car.cover} alt={car.full} fill sizes="64px" className="object-cover" />
                    )}
                  </div>
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

              <p className="text-[15px] text-slate-soft leading-relaxed mb-[18px]">
                Leroy plant de afspraak liever even persoonlijk. Bellen gaat het
                snelst, appen of mailen mag ook.
              </p>

              <div className="flex flex-col gap-2.5">
                <ContactKnop
                  href={telHref()}
                  icon={<Phone size={19} />}
                  label="Bel Leroy"
                  detail={SITE.phoneDisplay}
                  primair
                />
                <ContactKnop
                  href={whatsappHref(bericht)}
                  icon={<WhatsappIcon size={19} />}
                  label="Stuur een appje"
                  detail="Meestal snel antwoord"
                  extern
                />
                <ContactKnop
                  href={mailHref(onderwerp, bericht)}
                  icon={<Mail size={19} />}
                  label="Mail Leroy"
                  detail={SITE.email}
                />
              </div>

              <div className="border-t border-line-soft mt-[22px] pt-4">
                <div className="text-[13px] font-semibold text-slate mb-1">
                  {SITE.openingText}
                </div>
                <p className="text-[13.5px] text-slate-soft leading-relaxed">
                  {SITE.address.street.split(" - ")[0]}, {SITE.address.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}

function ContactKnop({
  href,
  icon,
  label,
  detail,
  primair,
  extern,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  detail: string;
  primair?: boolean;
  extern?: boolean;
}) {
  return (
    <a
      href={href}
      {...(extern ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={
        primair
          ? "flex items-center gap-3.5 h-[62px] px-[18px] rounded-xl bg-steel text-white shadow-soft hover:bg-steel-deep transition-colors no-underline"
          : "flex items-center gap-3.5 h-[62px] px-[18px] rounded-xl bg-white border-[1.5px] border-line text-slate hover:border-steel hover:text-steel-deep transition-colors no-underline"
      }
    >
      <span className={primair ? "text-white shrink-0" : "text-steel-deep shrink-0"}>{icon}</span>
      <span className="leading-tight min-w-0">
        <span className="block font-display font-bold text-[15.5px]">{label}</span>
        <span className={primair ? "block text-[13px] text-white/95 truncate" : "block text-[13px] text-slate-soft truncate"}>
          {detail}
        </span>
      </span>
    </a>
  );
}
