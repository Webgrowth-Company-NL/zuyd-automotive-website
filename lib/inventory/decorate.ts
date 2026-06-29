import type { Car, CarStatus, CarView } from "./types";
import { euro, km as kmFmt, pk as pkFmt, slugify } from "../format";

const BADGES: Record<CarStatus, { bg: string; color: string }> = {
  Beschikbaar: { bg: "rgba(92,115,130,.12)", color: "#42525e" },
  "Nieuw binnen": { bg: "#5c7382", color: "#eae5d8" },
  Gereserveerd: { bg: "#e7e2d6", color: "#6b7680" },
  Verkocht: { bg: "#dfdbd1", color: "#6b7680" },
};

export function carSlug(c: Car): string {
  return slugify(`${c.merk}-${c.model}-${c.variant}`) || c.id;
}

export function decorate(c: Car): CarView {
  return {
    ...c,
    slug: carSlug(c),
    title: `${c.merk} ${c.model}`,
    full: `${c.merk} ${c.model} ${c.variant}`,
    prijsFmt: euro(c.prijs),
    kmFmt: kmFmt(c.km),
    pkFmt: pkFmt(c.pk),
    badge: BADGES[c.status] ?? BADGES.Beschikbaar,
    available: c.status === "Beschikbaar" || c.status === "Nieuw binnen",
  };
}
