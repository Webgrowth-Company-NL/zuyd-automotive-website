import type { Car } from "./types";
import occasions from "@/content/occasions.json";

/**
 * Standaardvoorraad van Zuyd Automotive.
 *
 * De echte voorraad staat in Forester (sites/zuyd-automotive/collecties/
 * occasions), waar Leroy hem via Q bijwerkt. Deze JSON is het vangnet als
 * Forester niet bereikbaar is, en de bron waarmee de collectie is gevuld
 * (scripts/forester-vullen.mjs). Een wijziging hier komt dus niet vanzelf
 * live; die hoort in Forester.
 */
export const CARS = occasions as Car[];
