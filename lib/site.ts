/**
 * Centrale bedrijfsgegevens (NAP) en navigatie.
 *
 * LET OP — vóór livegang vervangen (zie checklist):
 *  - phone / whatsapp: echte nummers (E.164). Nu placeholder.
 *  - email: echt adres.
 *  - kvk: echt KvK-nummer (memory: 42026963 te bevestigen).
 *  - bovag: true zodra lidmaatschap bevestigd.
 *  - canonical host bevestigen (www vs non-www) in BASE_URL.
 */

export const SITE = {
  name: "Zuyd Automotive",
  legalName: "Zuyd Automotive",
  tagline: "Betaalbare occasions in Breda, persoonlijk uitgekozen door Leroy en Max.",
  // TODO go-live: bevestig canonical host (1 van beide moet 200 geven, ander 301)
  baseUrl: "https://www.zuydautomotive.nl",
  locale: "nl_NL",

  // Contact — TODO go-live: echte gegevens
  phoneDisplay: "06 12 34 56 78",
  phoneE164: "+31612345678",
  whatsapp: "31612345678",
  email: "hallo@zuydautomotive.nl",

  // Vestiging
  address: {
    street: "Riethil 14 - B80",
    postalCode: "4825 AP",
    city: "Breda",
    region: "Noord-Brabant",
    country: "NL",
    // Benaderend (Breda-Noord) — TODO go-live: exacte coördinaten voor kaart/JSON-LD
    lat: 51.6097,
    lng: 4.7758,
  },

  // TODO go-live: bevestigen
  kvk: "42026963",
  bovag: false,

  openingHours: [
    { day: "ma — vr", time: "09:00 – 18:00" },
    { day: "za", time: "10:00 – 16:00" },
    { day: "zo", time: "op afspraak" },
  ],

  // Voor schema.org openingHoursSpecification
  openingHoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { days: ["Saturday"], opens: "10:00", closes: "16:00" },
  ],
} as const;

export const NAV = [
  { label: "Voorraad", href: "/occasions" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Inkoop & inruil", href: "/inkoop" },
  { label: "Contact", href: "/contact" },
] as const;

export function telHref(): string {
  return `tel:${SITE.phoneE164}`;
}

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mapsHref(): string {
  const q = encodeURIComponent(`${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
