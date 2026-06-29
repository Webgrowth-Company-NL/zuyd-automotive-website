export type CarStatus = "Beschikbaar" | "Nieuw binnen" | "Gereserveerd" | "Verkocht";

export type Fuel = "Benzine" | "Diesel" | "Hybride" | "Elektrisch";
export type Transmission = "Handgeschakeld" | "Automaat";

/** Ruwe auto-record zoals de bron hem levert. */
export interface Car {
  id: string;
  merk: string;
  model: string;
  variant: string;
  prijs: number;
  bouwjaar: number;
  km: number;
  brandstof: Fuel;
  transmissie: Transmission;
  pk: number;
  kleur: string;
  deuren: number;
  apk: string;
  verbruik: string;
  status: CarStatus;
  highlights: string[];
  quote: string;
  /** Voertuigfoto's (lokaal in /public of later via feed/CMS). Leeg = placeholder. */
  images?: string[];
}

/** Afgeleide weergavevelden bovenop Car. */
export interface CarView extends Car {
  slug: string;
  title: string;
  full: string;
  prijsFmt: string;
  kmFmt: string;
  pkFmt: string;
  badge: { bg: string; color: string };
  available: boolean;
  /** Hoofdfoto (eerste image) of null bij placeholder. */
  cover: string | null;
  /** Alle foto's (genormaliseerd, evt. leeg). */
  photos: string[];
}

/**
 * Abstractie zodat de UI niet aan een specifieke databron vastzit.
 * Nu een json/static source; later vervangbaar door feed (AutoTrack/
 * Marktplaats/Gaspedaal) of CMS zonder de UI te raken.
 */
export interface InventorySource {
  getAll(): Promise<Car[]>;
  getBySlug(slug: string): Promise<Car | null>;
}
