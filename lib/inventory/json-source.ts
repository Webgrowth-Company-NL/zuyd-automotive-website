import type { Car, InventorySource } from "./types";
import { CARS } from "./data";
import { carSlug } from "./decorate";

/**
 * Static/json bron over de in-code CARS-array.
 * Async API zodat een latere feed/CMS-bron drop-in vervangbaar is.
 */
export class JsonInventorySource implements InventorySource {
  private readonly cars: Car[];

  constructor(cars: Car[] = CARS) {
    this.cars = cars;
  }

  async getAll(): Promise<Car[]> {
    return this.cars;
  }

  async getBySlug(slug: string): Promise<Car | null> {
    return this.cars.find((c) => carSlug(c) === slug) ?? null;
  }
}
