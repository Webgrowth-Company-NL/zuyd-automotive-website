import type { Car, InventorySource } from "./types";
import { CARS } from "./data";
import { carSlug } from "./decorate";

/**
 * De voorraad uit content/occasions.json, zonder wat offline staat en in de
 * volgorde die Forester erin zet. Async API zodat een latere feed (AutoTrack,
 * Marktplaats) drop-in past.
 */
export class JsonInventorySource implements InventorySource {
  private readonly cars: Car[];

  constructor(cars: Car[] = CARS) {
    this.cars = cars
      .filter((c) => c.gepubliceerd !== false)
      .sort((a, b) => (a.volgorde ?? 0) - (b.volgorde ?? 0));
  }

  async getAll(): Promise<Car[]> {
    return this.cars;
  }

  async getBySlug(slug: string): Promise<Car | null> {
    return this.cars.find((c) => carSlug(c) === slug) ?? null;
  }
}
