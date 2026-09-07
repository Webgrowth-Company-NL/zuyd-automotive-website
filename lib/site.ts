/**
 * Centrale bedrijfsgegevens (NAP) en navigatie.
 *
 * LET OP, vóór livegang vervangen (zie checklist):
 *  - kvk: echt KvK-nummer (memory: 42026963 te bevestigen).
 *  - bovag: true zodra lidmaatschap bevestigd.
 *  - canonical host bevestigen (www vs non-www) zodra het domein naar Vercel
 *    wijst: curl beide, één moet 200 geven en de ander 301.
 */

export const SITE = {
  name: "Zuyd Automotive",
  legalName: "Zuyd Automotive",
  tagline: "Betaalbare occasions in Breda, stuk voor stuk persoonlijk uitgekozen.",
  // TODO go-live: bevestig canonical host (1 van beide moet 200 geven, ander 301)
  baseUrl: "https://www.zuyd-automotive.nl",
  locale: "nl_NL",

  // Contact
  phoneDisplay: "+31 6 81116583",
  phoneE164: "+31681116583",
  whatsapp: "31681116583",
  email: "info@zuyd-automotive.nl",

  // Vestiging
  address: {
    street: "Riethil 14 - B80",
    postalCode: "4825 AP",
    city: "Breda",
    region: "Noord-Brabant",
    country: "NL",
    // Exacte locatie van unit 14-B80, geocodeerd via OpenStreetMap/Nominatim.
    lat: 51.605464,
    lng: 4.774011,
  },

  // TODO go-live: bevestigen
  kvk: "42026963",
  bovag: false,

  // Zuyd werkt volledig op afspraak, dus geen vaste openingstijden. Bewust ook
  // geen openingHoursSpecification in de JSON-LD: Google toont die anders als
  // harde tijden en dan staat er iemand voor een dichte deur.
  openingText: "Wij werken uitsluitend op afspraak",
  openingSub:
    "Je bent welkom op onze kleinschalige, zorgvuldig ingerichte stallingslocatie. Bel of app even, dan zorgen we dat de auto klaarstaat.",
} as const;

export const NAV = [
  { label: "Voorraad", href: "/occasions" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Inruil", href: "/inruil" },
  { label: "Detailing", href: "/detailing" },
  { label: "Contact", href: "/contact" },
] as const;

export function telHref(): string {
  return `tel:${SITE.phoneE164}`;
}

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailHref(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString().replace(/\+/g, "%20"); // mailto wil %20, geen +
  return qs ? `mailto:${SITE.email}?${qs}` : `mailto:${SITE.email}`;
}

export function mapsHref(): string {
  const q = encodeURIComponent(`${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
