"use client";

import { createContext, useContext } from "react";

export interface BookingCar {
  slug: string;
  full: string;
  prijs: number;
  prijsFmt: string;
  bouwjaar: number;
  kmFmt: string;
}

interface BookingContextValue {
  open: (car?: BookingCar | null) => void;
}

export const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    // Veilige no-op buiten de provider (mag in praktijk niet voorkomen).
    return { open: () => {} };
  }
  return ctx;
}
