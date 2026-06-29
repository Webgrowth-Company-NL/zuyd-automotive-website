export interface BookingDay {
  key: string; // yyyy-mm-dd
  dow: string;
  dayNum: number;
  mon: string;
  label: string;
}

const DOW = ["zo", "ma", "di", "wo", "do", "vr", "za"];
const MON = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

/** Volgende `count` werkdagen (geen zondag), vanaf morgen. Client-side aanroepen. */
export function buildDays(count = 6, from: Date = new Date()): BookingDay[] {
  const out: BookingDay[] = [];
  let i = 0;
  while (out.length < count) {
    i++;
    const x = new Date(from);
    x.setDate(x.getDate() + i);
    if (x.getDay() === 0) continue; // zondag overslaan
    out.push({
      key: x.toISOString().slice(0, 10),
      dow: DOW[x.getDay()],
      dayNum: x.getDate(),
      mon: MON[x.getMonth()],
      label: `${DOW[x.getDay()]} ${x.getDate()} ${MON[x.getMonth()]}`,
    });
  }
  return out;
}

export const SLOTS = ["10:00", "11:00", "13:30", "15:00", "16:30"];
