import { JsonInventorySource } from "./json-source";
import { decorate } from "./decorate";
import type { CarView, InventorySource } from "./types";

export type { Car, CarView, CarStatus, Fuel, Transmission, InventorySource } from "./types";
export { decorate, carSlug } from "./decorate";

/**
 * Actieve voorraadbron. Eén plek om te wisselen naar een feed/CMS-bron later.
 */
export const inventory: InventorySource = new JsonInventorySource();

/**
 * Alle auto's, met de leverbare eerst.
 *
 * Die volgorde zat alleen in `getFeaturedCars`, waardoor de voorraadpagina de
 * ruwe volgorde uit het databestand aanhield. Toen de Clio op verkocht ging
 * (20-09-2026) stond er dus een verkochte auto vooraan in de voorraad. Sorteren
 * gebeurt stabiel, dus onderling houden de leverbare auto's hun eigen volgorde.
 */
export async function getAllCars(): Promise<CarView[]> {
  const cars = await inventory.getAll();
  return cars
    .map(decorate)
    .sort((a, b) => Number(b.available) - Number(a.available));
}

export async function getFeaturedCars(count = 3): Promise<CarView[]> {
  // De leverbare auto's staan al vooraan; hier alleen nog afsnijden.
  const cars = await getAllCars();
  return cars.slice(0, count);
}

export async function getCarBySlug(slug: string): Promise<CarView | null> {
  const car = await inventory.getBySlug(slug);
  return car ? decorate(car) : null;
}

export async function getAllSlugs(): Promise<string[]> {
  const cars = await inventory.getAll();
  return cars.map((c) => decorate(c).slug);
}
