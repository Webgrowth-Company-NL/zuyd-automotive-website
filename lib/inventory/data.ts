import type { Car } from "./types";

/**
 * Live voorraad van Zuyd Automotive.
 * Foto's staan lokaal in /public/occasions/<id>/ (van de Marktplaats-advertentie).
 * Nieuwe auto toevoegen = nieuw object + foto's in /public; de UI leest alles
 * via de InventorySource-abstractie.
 */
export const CARS: Car[] = [
  {
    id: "clio-etech-rs-line",
    merk: "Renault",
    model: "Clio",
    variant: "1.6 E-Tech Hybrid R.S. Line 140",
    prijs: 17990,
    bouwjaar: 2022,
    km: 31368,
    brandstof: "Hybride",
    transmissie: "Automaat",
    pk: 140,
    kleur: "Blue Iron metallic",
    deuren: 5,
    apk: "01-2028",
    verbruik: "1 op 23,0",
    status: "Beschikbaar",
    highlights: [
      "Eerste eigenaar, 31.368 km",
      "Adaptive cruise control & Apple CarPlay",
      "Achteruitrijcamera & RS Line sportstoelen",
      "Dealeronderhouden, APK tot 01-2028",
    ],
    quote:
      "Eén eigenaar, volledig dealeronderhouden en die zuinige E-Tech hybride: deze Clio rijdt als nieuw en is helemaal compleet.",
    images: [
      "/occasions/clio/5.jpg", // 3/4 voor (cover)
      "/occasions/clio/2.jpg", // zijkant
      "/occasions/clio/4.jpg", // voor
      "/occasions/clio/3.jpg", // achter
      "/occasions/clio/1.jpg", // interieur
    ],
  },
];
