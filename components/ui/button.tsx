import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "onDark"
  | "onDarkOutline"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 font-display font-bold rounded-xl cursor-pointer transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 no-underline whitespace-nowrap select-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-steel text-creme shadow-soft hover:bg-steel-deep hover:-translate-y-px active:translate-y-0",
  secondary:
    "bg-white text-slate border-[1.5px] border-line hover:border-steel hover:text-steel-deep",
  onDark: "bg-creme text-steel-700 hover:bg-white shadow-soft",
  onDarkOutline:
    "bg-transparent text-creme border-[1.5px] border-creme/35 hover:border-creme",
  ghost: "bg-transparent text-slate hover:text-steel",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-[46px] px-5 text-[14.5px]",
  md: "h-[52px] px-6 text-[15.5px]",
  lg: "h-[56px] px-7 text-[16.5px]",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
});
