"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useBooking } from "./booking-context";
import type { BookingCar } from "./booking-context";

export function BookButton({
  car,
  children,
  onClick,
  ...props
}: ButtonProps & { car?: BookingCar | null }) {
  const { open } = useBooking();
  return (
    <Button
      onClick={(e) => {
        onClick?.(e);
        open(car ?? null);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
