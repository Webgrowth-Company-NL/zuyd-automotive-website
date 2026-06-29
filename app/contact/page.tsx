import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { BookButton } from "@/components/booking/book-button";
import { WhatsappIcon } from "@/components/ui/icons";
import { autoDealerLd, breadcrumbLd, JsonLd } from "@/lib/structured-data";
import { SITE, mapsHref, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — kom langs in Breda",
  description:
    "Zuyd Automotive aan de Riethil 14 in Breda. Bekijk openingstijden, bel of app ons, of plan vooraf een bezichtiging met Leroy zodat de auto klaarstaat.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          autoDealerLd(),
          breadcrumbLd([
            { name: "Home", url: SITE.baseUrl },
            { name: "Contact", url: `${SITE.baseUrl}/contact` },
          ]),
        ]}
      />
      <section className="max-w-[1100px] mx-auto px-[22px] pt-[clamp(40px,6vw,72px)] pb-[clamp(30px,4vw,44px)]">
        <span className="font-display font-bold text-[13px] tracking-[0.14em] uppercase text-steel">
          Contact
        </span>
        <h1 className="font-display font-extrabold text-[clamp(30px,4.4vw,46px)] tracking-[-0.02em] text-slate mt-3 leading-[1.07]">
          Kom langs in Breda
        </h1>
        <p className="text-[17px] leading-relaxed text-slate-soft mt-3.5 max-w-[50ch]">
          Je bent welkom aan de {SITE.address.street.split(" - ")[0]}. Plan vooraf even een
          bezichtiging, dan staat de auto voor je klaar en nemen we rustig de tijd.
        </p>
      </section>

      <section className="max-w-[1100px] mx-auto px-[22px] pb-[clamp(40px,5vw,64px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col gap-3.5">
            <div className="bg-white border border-line rounded-[var(--radius)] p-[22px] flex gap-3.5 items-start">
              <IconBox>
                <MapPin size={20} />
              </IconBox>
              <div>
                <div className="font-display font-bold text-base text-slate mb-1">Adres</div>
                <div className="text-[15px] text-slate-soft leading-relaxed">
                  {SITE.address.street}
                  <br />
                  {SITE.address.postalCode} {SITE.address.city}
                </div>
              </div>
            </div>

            <div className="bg-white border border-line rounded-[var(--radius)] p-[22px] flex gap-3.5 items-start">
              <IconBox>
                <Clock size={20} />
              </IconBox>
              <div className="flex-1">
                <div className="font-display font-bold text-base text-slate mb-2">Openingstijden</div>
                <div className="flex flex-col gap-1.5 text-[14.5px] text-slate-soft">
                  {SITE.openingHours.map((row) => (
                    <span key={row.day} className="flex justify-between">
                      <span>{row.day}</span>
                      <span>{row.time}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={telHref()}
                className="flex-1 inline-flex items-center justify-center gap-2.5 h-[52px] bg-white border-[1.5px] border-line rounded-xl font-display font-bold text-[15px] text-slate hover:border-steel hover:text-steel-deep transition-colors"
              >
                <Phone size={17} />
                Bellen
              </a>
              <a
                href={whatsappHref("Hoi, ik heb een vraag over jullie occasions.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 h-[52px] bg-white border-[1.5px] border-line rounded-xl font-display font-bold text-[15px] text-slate hover:border-steel hover:text-steel-deep transition-colors"
              >
                <WhatsappIcon size={17} />
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <a href={mapsHref()} target="_blank" rel="noopener noreferrer" className="block group">
              <div className="relative">
                <Photo
                  alt={`Locatie van Zuyd Automotive: ${SITE.address.street}, ${SITE.address.city}`}
                  label={`kaart · ${SITE.address.city.toLowerCase()}`}
                  sizes="(max-width: 1024px) 100vw, 528px"
                  className="w-full aspect-[4/3.2] shadow-soft"
                />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-[50%_50%_50%_0] bg-steel -rotate-45 shadow-soft transition-transform group-hover:scale-110" />
              </div>
            </a>
            <div className="bg-steel rounded-[var(--radius)] p-6 mt-3.5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-display font-bold text-[17px] text-white">
                  Liever zeker van een moment?
                </div>
                <div className="text-sm text-creme/88">Plan online een bezichtiging met Leroy.</div>
              </div>
              <BookButton variant="onDark" size="md">
                Plan bezichtiging
              </BookButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-11 h-11 rounded-[11px] bg-steel/12 grid place-items-center text-steel-deep shrink-0">
      {children}
    </span>
  );
}
