import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Cog,
  Droplet,
  Fuel,
  Gauge,
  Hash,
  Mail,
  Palette,
  Phone,
  ShieldCheck,
  Zap,
  RefreshCw,
} from "lucide-react";
import { getAllSlugs, getCarBySlug, type CarView } from "@/lib/inventory";
import { Photo } from "@/components/ui/photo";
import { OccasionGallery } from "@/components/occasions/gallery";
import { ZBadge } from "@/components/brand/logo";
import { BookButton } from "@/components/booking/book-button";
import { WhatsappIcon } from "@/components/ui/icons";
import { breadcrumbLd, JsonLd, vehicleLd } from "@/lib/structured-data";
import { SITE, mailHref, telHref, whatsappHref } from "@/lib/site";
import { tekst } from "@/lib/teksten";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) return { title: "Occasion niet gevonden" };

  // Kort houden: het titel-template plakt er nog " · Zuyd Automotive" achter en
  // Google kapt rond de 60 tekens af. De volledige uitvoeringsnaam staat in de
  // H1 en in og:title, dus die blijft vindbaar.
  const title = `${car.merk} ${car.model} ${car.bouwjaar} occasion`;
  const ogTitle = `${car.full} occasion kopen in Breda`;
  const description = `${car.full} uit ${car.bouwjaar}, ${car.kmFmt}, ${car.transmissie}. ${car.prijsFmt} rijklaar bij Zuyd Automotive in Breda.`;

  return {
    title,
    description,
    alternates: { canonical: `/occasions/${car.slug}` },
    openGraph: {
      title: ogTitle,
      description,
      type: "website",
      url: `${SITE.baseUrl}/occasions/${car.slug}`,
      // Zonder deze afbeelding levert een gedeelde link in WhatsApp of op
      // social media een kale tekstkaart op, terwijl er foto's van de auto zijn.
      images: car.cover
        ? [{ url: `${SITE.baseUrl}${car.cover}`, width: 1200, height: 900, alt: `${car.full} occasion bij Zuyd Automotive` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: car.cover ? [`${SITE.baseUrl}${car.cover}`] : undefined,
    },
  };
}

function bookingCarOf(car: CarView) {
  return {
    slug: car.slug,
    full: car.full,
    prijs: car.prijs,
    prijsFmt: car.prijsFmt,
    bouwjaar: car.bouwjaar,
    kmFmt: car.kmFmt,
    cover: car.cover,
  };
}

export default async function OccasionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [car, t] = await Promise.all([getCarBySlug(slug), tekst("occasion__detail")]);
  if (!car) notFound();

  const bc = bookingCarOf(car);

  const specs = [
    { icon: Calendar, label: t.specs.bouwjaar, value: String(car.bouwjaar) },
    { icon: Gauge, label: t.specs.km, value: car.kmFmt },
    { icon: Fuel, label: t.specs.brandstof, value: car.brandstof },
    { icon: Cog, label: t.specs.transmissie, value: car.transmissie },
    { icon: Zap, label: t.specs.vermogen, value: car.pkFmt },
    { icon: Droplet, label: t.specs.verbruik, value: car.verbruik },
    { icon: Palette, label: t.specs.kleur, value: car.kleur },
    { icon: ShieldCheck, label: t.specs.apk, value: car.apk },
    { icon: Hash, label: t.specs.kenteken, value: car.kenteken ?? "" },
  ].filter((s) => s.value);

  /** Iconen bij de zekerheden, in de volgorde van occasion__detail.zekerheden. */
  const zekerheidIconen = [ShieldCheck, CheckCircle2, RefreshCw]; // onbekende specs (bv. verbruik) niet leeg tonen

  return (
    <div className="pb-[84px] lg:pb-0">
      <JsonLd
        data={[
          vehicleLd(car),
          breadcrumbLd([
            { name: "Home", url: SITE.baseUrl },
            { name: "Occasions", url: `${SITE.baseUrl}/occasions` },
            { name: car.full, url: `${SITE.baseUrl}/occasions/${car.slug}` },
          ]),
        ]}
      />

      <section className="max-w-[1200px] mx-auto px-[22px] pt-[clamp(20px,3vw,32px)] pb-[clamp(40px,5vw,64px)]">
        <Link
          href="/occasions"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-soft hover:text-steel mb-5"
        >
          <ArrowLeft size={16} />
          {t.terug}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(26px,3.5vw,44px)] items-start">
          {/* Gallery */}
          <OccasionGallery
            photos={car.photos}
            alt={`${car.full} occasion`}
            status={car.status}
            badge={car.badge}
          />

          {/* Info */}
          <div>
            <h1 className="font-display font-extrabold text-[clamp(26px,3.6vw,38px)] tracking-[-0.01em] text-slate leading-[1.12]">
              {car.title}
            </h1>
            <p className="text-[16.5px] text-slate-soft mt-1.5">{car.variant}</p>
            <div className="flex items-baseline gap-3 mt-[18px] mb-[22px]">
              <span className="font-display font-extrabold text-[clamp(30px,4vw,40px)] text-steel">
                {car.prijsFmt}
              </span>
              <span className="text-sm text-slate-soft">{t.rijklaar}</span>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] gap-2.5 mb-6">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-line rounded-[11px] p-3 flex items-center gap-3"
                >
                  <span className="w-9 h-9 rounded-[9px] bg-steel/12 grid place-items-center text-steel-deep shrink-0">
                    <s.icon size={18} />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[11.5px] text-slate-soft">{s.label}</span>
                    <span className="block font-display font-bold text-[15.5px] text-slate">
                      {s.value}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* Primary CTA. Bij een verkochte auto valt er niets meer te
                bezichtigen (Leroy, 20-09-2026), dus dan wijst dit blok naar de
                auto's die er nog wel staan. Bellen, WhatsApp en mailen blijven
                eronder gewoon staan: contact opnemen mag altijd. */}
            <div className="bg-steel rounded-[var(--radius)] p-[22px] mb-[18px]">
              <div className="flex items-center gap-3.5 mb-4">
                <ZBadge size={48} className="!bg-warm/15" />
                <div className="leading-snug">
                  <div className="font-display font-bold text-base text-white">
                    {car.status === "Verkocht" ? t.verkochtTitel : t.ctaTitel}
                  </div>
                  <div className="text-[13.5px] text-white/95">
                    {car.status === "Verkocht" ? t.verkochtTekst : t.ctaTekst}
                  </div>
                </div>
              </div>
              {car.status === "Verkocht" ? (
                <Link
                  href="/occasions"
                  className="w-full h-[54px] inline-flex items-center justify-center gap-2 bg-warm rounded-xl font-display font-bold text-[15px] text-slate hover:bg-white transition-colors"
                >
                  {t.knopVoorraad}
                </Link>
              ) : (
                <BookButton car={bc} variant="onDark" size="md" className="w-full h-[54px]">
                  {t.knopAfspraak}
                </BookButton>
              )}
            </div>

            <div className="flex gap-3">
              <a
                href={telHref()}
                className="flex-1 inline-flex items-center justify-center gap-2.5 h-[50px] bg-white border-[1.5px] border-line rounded-xl font-display font-bold text-[15px] text-slate hover:border-steel hover:text-steel-deep transition-colors"
              >
                <Phone size={17} />
                {t.bellen}
              </a>
              <a
                href={whatsappHref(`Hoi, ik heb interesse in de ${car.full} (${car.prijsFmt}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 h-[50px] bg-white border-[1.5px] border-line rounded-xl font-display font-bold text-[15px] text-slate hover:border-steel hover:text-steel-deep transition-colors"
              >
                <WhatsappIcon size={17} />
                {t.whatsapp}
              </a>
              <a
                href={
                  car.status === "Verkocht"
                    ? mailHref(
                        `Vergelijkbaar met de ${car.full}`,
                        `Hoi Leroy, ik zag dat de ${car.full} verkocht is. Komt er iets vergelijkbaars binnen?`,
                      )
                    : mailHref(
                        `Bezichtiging ${car.full}`,
                        `Hoi Leroy, ik wil graag de ${car.full} (${car.prijsFmt}) bekijken. Wanneer kan dat?`,
                      )
                }
                className="flex-1 inline-flex items-center justify-center gap-2.5 h-[50px] bg-white border-[1.5px] border-line rounded-xl font-display font-bold text-[15px] text-slate hover:border-steel hover:text-steel-deep transition-colors"
              >
                <Mail size={17} />
                {t.mailen}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Leroy quote */}
      <section className="max-w-[1200px] mx-auto px-[22px] pt-[clamp(8px,2vw,20px)] pb-[clamp(28px,3.5vw,40px)]">
        <div className="bg-slate rounded-[var(--radius-lg)] p-[clamp(26px,3.5vw,44px)] relative overflow-hidden flex flex-wrap items-center gap-[clamp(22px,3.5vw,44px)]">
          <div className="absolute -right-16 -top-16 w-60 h-60 rounded-full border-2 border-creme/[0.07]" />
          <div className="absolute right-10 -bottom-[70px] w-40 h-40 rounded-full border-2 border-creme/[0.05]" />
          <Photo
            src="/leroy/leroy-avatar.jpg"
            alt="Leroy van Zuyd Automotive"
            label="foto · leroy"
            rounded="rounded-full"
            sizes="150px"
            className="w-[clamp(112px,17vw,150px)] h-[clamp(112px,17vw,150px)] shrink-0 shadow-[0_0_0_5px_rgba(234,229,216,0.16),0_18px_40px_rgba(0,0,0,0.3)]"
          />
          <div className="flex-1 min-w-[270px] relative">
            <span className="font-display font-bold text-[12.5px] tracking-[0.16em] uppercase text-[#9fb3bd]">
              {t.quoteEyebrow}
            </span>
            <blockquote className="mt-3 font-display font-semibold text-[clamp(20px,2.5vw,28px)] leading-[1.32] tracking-[-0.01em] text-creme">
              “{car.quote}”
            </blockquote>
            <div className="flex items-center gap-3 mt-5">
              <ZBadge size={36} />
              <span className="leading-tight">
                <span className="block font-display font-bold text-[15px] text-white">{t.quoteNaam}</span>
                <span className="block text-[13px] text-creme/70">{t.quoteRol}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights + trust */}
      <section className="max-w-[1200px] mx-auto px-[22px] pb-[clamp(40px,5vw,64px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
          <div className="bg-white border border-line rounded-[var(--radius)] p-6 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full border-2 border-steel/10" />
            <h3 className="font-display font-bold text-[19px] text-slate mb-4 relative">{t.pluspunten}</h3>
            <div className="flex flex-col gap-3.5 relative">
              {car.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3 text-[15.5px] text-slate">
                  <span className="w-6 h-6 rounded-full bg-steel/13 grid place-items-center text-steel-deep shrink-0">
                    <CheckCircle2 size={14} />
                  </span>
                  {h}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-line rounded-[var(--radius)] p-6 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full border-2 border-steel/10" />
            <h3 className="font-display font-bold text-[19px] text-slate mb-4 relative">
              {t.gerustHart}
            </h3>
            <div className="flex flex-col gap-4 relative">
              {t.zekerheden.map((z, i) => (
                <TrustRow
                  key={z.titel}
                  icon={zekerheidIconen[i % zekerheidIconen.length]}
                  title={z.titel}
                  body={z.tekst}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky bottom bar (mobiel-eerst) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-warm/95 backdrop-blur-[12px] border-t border-line px-4 py-2.5 shadow-[0_-6px_24px_rgba(39,51,59,0.08)] lg:hidden">
        <div className="max-w-[1200px] mx-auto flex gap-2.5 items-center">
          <a
            href={telHref()}
            aria-label={t.bellen}
            className="w-[52px] h-[52px] shrink-0 grid place-items-center bg-white border-[1.5px] border-line rounded-xl text-slate"
          >
            <Phone size={20} />
          </a>
          <a
            href={whatsappHref(`Hoi, ik heb interesse in de ${car.full}.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.whatsapp}
            className="w-[52px] h-[52px] shrink-0 grid place-items-center bg-white border-[1.5px] border-line rounded-xl text-slate"
          >
            <WhatsappIcon size={20} />
          </a>
          {car.status === "Verkocht" ? (
            <Link
              href="/occasions"
              className="flex-1 h-[52px] inline-flex items-center justify-center gap-2 bg-steel rounded-xl font-display font-bold text-[15px] text-white hover:bg-steel-deep transition-colors"
            >
              {t.knopVoorraad}
            </Link>
          ) : (
            <BookButton car={bc} size="md" className="flex-1 h-[52px]">
              <Phone size={18} />
              {t.knopAfspraak}
            </BookButton>
          )}
        </div>
      </div>
    </div>
  );
}

function TrustRow({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="text-steel shrink-0">
        <Icon size={20} />
      </span>
      <div>
        <div className="font-bold text-[15px] text-slate">{title}</div>
        <div className="text-sm text-slate-soft">{body}</div>
      </div>
    </div>
  );
}
