import { JsonInventorySource } from "./json-source";
import { decorate } from "./decorate";
import type { CarView, InventorySource } from "./types";

export type { Car, CarView, CarStatus, Fuel, Transmission, InventorySource } from "./types";
export { decorate, carSlug } from "./decorate";

/**
 * Actieve voorraadbron. Eén plek om te wisselen naar een feed/CMS-bron later.
 */
export const inventory: InventorySource = new JsonInventorySource();

export async function getAllCars(): Promise<CarView[]> {
  const cars = await inventory.getAll();
  return cars.map(decorate);
}

export async function getFeaturedCars(count = 3): Promise<CarView[]> {
  const cars = await getAllCars();
  // Toon eerst de leverbare auto's; vul aan tot count.
  const ordered = [...cars].sort((a, b) => Number(b.available) - Number(a.available));
  return ordered.slice(0, count);
}

export async function getCarBySlug(slug: string): Promise<CarView | null> {
  const car = await inventory.getBySlug(slug);
  return car ? decorate(car) : null;
}

export async function getAllSlugs(): Promise<string[]> {
  const cars = await inventory.getAll();
  return cars.map((c) => decorate(c).slug);
}
