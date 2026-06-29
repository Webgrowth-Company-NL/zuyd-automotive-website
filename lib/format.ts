/** Nederlandse formatters — consistent over de hele site. */

export function euro(n: number): string {
  return "€ " + Number(n).toLocaleString("nl-NL");
}

export function km(n: number): string {
  return Number(n).toLocaleString("nl-NL") + " km";
}

export function pk(n: number): string {
  return n + " pk";
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
