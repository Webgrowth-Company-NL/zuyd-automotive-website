import type { Car, InventorySource } from "./types";
import { CARS } from "./data";
import { carSlug } from "./decorate";
import { collectie } from "../forester/inhoud";

/**
 * De voorraad uit Forester, met de JSON in /content als vangnet.
 * Async API zodat een latere feed (AutoTrack, Marktplaats) drop-in past.
 */
export class JsonInventorySource implements InventorySource {
  constructor(private readonly standaard: Car[] = CARS) {}

  async getAll(): Promise<Car[]> {
    return collectie("occasions", this.standaard);
  }

  async getBySlug(slug: string): Promise<Car | null> {
    return (await this.getAll()).find((c) => carSlug(c) === slug) ?? null;
  }
}
