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
  {
    id: "audi-a4-avant-20-tfsi-ultra",
    merk: "Audi",
    model: "A4 Avant",
    variant: "2.0 TFSI ultra MHEV 190 pk S tronic",
    prijs: 19500,
    bouwjaar: 2018,
    km: 147512,
    brandstof: "Benzine",
    transmissie: "Automaat",
    pk: 190,
    kleur: "Grijs metallic",
    deuren: 5,
    apk: "12-2026",
    verbruik: "",
    status: "Beschikbaar",
    highlights: [
      "S line interieurpakket en panoramadak",
      "Adaptieve cruise control en Audi navigatie",
      "Volledige en aantoonbare onderhoudshistorie",
      "Lichte schade aan de achterbumper — zie foto's",
    ],
    quote:
      "Een complete A4 Avant met panoramadak en S line interieur, onderhouden volgens fabrieksvoorschrift. De achterbumper heeft een lichte beschadiging; dat zie je op de foto's en dat zit in de prijs.",
    images: [
      "/occasions/a4/1.jpg", // 3/4 voor (cover)
      "/occasions/a4/2.jpg", // zijkant
      "/occasions/a4/3.jpg", // 3/4 voor links
      "/occasions/a4/4.jpg", // 3/4 achter
      "/occasions/a4/5.jpg", // achter
    ],
  },
  {
    id: "toyota-yaris-15-hybrid-dynamic",
    merk: "Toyota",
    model: "Yaris",
    variant: "1.5 Full Hybrid CVT Dynamic",
    prijs: 8250,
    bouwjaar: 2012,
    km: 189638,
    brandstof: "Hybride",
    transmissie: "Automaat",
    pk: 74,
    kleur: "Zwart",
    deuren: 5,
    apk: "07-2027",
    verbruik: "",
    status: "Beschikbaar",
    highlights: [
      "Volledig hybride: zuinig én automaat",
      "Navigatie, achteruitrijcamera en keyless start",
      "Cruise control, climate control en lichtmetalen velgen",
      "Onderhoud juli 2026 gedaan, APK tot 07-2027",
    ],
    quote:
      "Deze Yaris heeft kilometers gelopen, maar de historie is aantoonbaar en het onderhoud is net gedaan. Zoek je goedkoop en zorgeloos rijden met een automaat, dan is dit een hele verstandige.",
    images: [
      "/occasions/yaris/1.jpg", // 3/4 voor (cover)
      "/occasions/yaris/2.jpg", // zijkant
      "/occasions/yaris/3.jpg", // voor
      "/occasions/yaris/4.jpg", // 3/4 achter
      "/occasions/yaris/5.jpg", // achter
    ],
  },
];
