import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { BookButton } from "@/components/booking/book-button";
import { WhatsappIcon } from "@/components/ui/icons";
import { autoDealerLd, breadcrumbLd, JsonLd } from "@/lib/structured-data";
import { SITE, mailHref, mapsHref, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact · kom langs in Breda",
  description:
    "Zuyd Automotive aan de Riethil 14 in Breda. Bekijk openingstijden en bel, app of mail Leroy voor een afspraak, dan staat de auto klaar.",
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
                <div className="font-display font-bold text-base text-slate mb-2">
                  {SITE.openingText}
                </div>
                <div className="text-[14.5px] text-slate-soft leading-relaxed">
                  {SITE.openingSub}
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
              <a
                href={mailHref(
                  "Afspraak voor een bezichtiging",
                  "Hoi Leroy, ik wil graag langskomen om een auto te bekijken. Wanneer kan dat?",
                )}
                className="flex-1 inline-flex items-center justify-center gap-2.5 h-[52px] bg-white border-[1.5px] border-line rounded-xl font-display font-bold text-[15px] text-slate hover:border-steel hover:text-steel-deep transition-colors"
              >
                <Mail size={17} />
                Mailen
              </a>
            </div>
          </div>

          <div>
            <div className="relative w-full aspect-[4/3.2] rounded-[var(--radius)] overflow-hidden shadow-soft border border-line">
              {/* OpenStreetMap-embed: geen API-sleutel nodig. De kaart is gewoon
                  bruikbaar (zoomen/slepen); voor een route stuurt de knop je door
                  naar Maps, zodat je die op je telefoon meteen kunt starten. */}
              <iframe
                title={`Kaart met de locatie van Zuyd Automotive aan de ${SITE.address.street} in ${SITE.address.city}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${SITE.address.lng - 0.004}%2C${SITE.address.lat - 0.003}%2C${SITE.address.lng + 0.004}%2C${SITE.address.lat + 0.003}&layer=mapnik&marker=${SITE.address.lat}%2C${SITE.address.lng}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
              <a
                href={mapsHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 z-[1] inline-flex items-center gap-2 bg-white/95 backdrop-blur border border-line rounded-full px-4 py-2 font-display font-bold text-[13.5px] text-slate hover:text-steel-deep hover:border-steel transition-colors shadow-soft no-underline"
              >
                <MapPin size={15} />
                Route plannen
              </a>
            </div>
            <div className="bg-steel rounded-[var(--radius)] p-6 mt-3.5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-display font-bold text-[17px] text-white">
                  Een auto bekijken?
                </div>
                <div className="text-sm text-creme/88">Leroy plant de afspraak zo met je in.</div>
              </div>
              <BookButton variant="onDark" size="md">
                Maak een afspraak
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
