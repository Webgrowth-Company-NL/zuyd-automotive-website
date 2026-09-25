import type { Car } from "./types";
import occasions from "@/content/occasions.json";

/**
 * De voorraad van Zuyd Automotive, uit content/occasions.json.
 *
 * Dat bestand wordt beheerd vanuit Forester: Leroy past via Q of het
 * inhoudsscherm een auto aan, Forester commit de JSON in deze repo en Vercel
 * bouwt de site opnieuw. Wat een auto is en wat er aangepast mag worden staat
 * in content/occasions.schema.json.
 */
export const CARS = occasions as Car[];
