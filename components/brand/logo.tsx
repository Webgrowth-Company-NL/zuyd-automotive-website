import { cn } from "@/lib/cn";

/** Rond Z-embleem uit het logo. Wordt ook gebruikt als favicon/avatar. */
export function ZBadge({ size = 40, className }: { size?: number; className?: string }) {
  const inset = Math.round(size * 0.075);
  return (
    <span
      className={cn("relative grid place-items-center rounded-full bg-steel shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className="absolute rounded-full border-[1.5px] border-creme/50"
        style={{ inset }}
      />
      <span
        className="font-display font-extrabold text-creme leading-none -mt-px"
        style={{ fontSize: Math.round(size * 0.52) }}
      >
        Z
      </span>
    </span>
  );
}

export function Wordmark({
  badgeSize = 40,
  dark = false,
  className,
}: {
  badgeSize?: number;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <ZBadge size={badgeSize} />
      <span className="flex flex-col leading-[0.84] text-left">
        <span
          className={cn(
            "font-display font-extrabold text-[19px] tracking-[0.04em]",
            dark ? "text-white" : "text-slate",
          )}
        >
          ZUYD
        </span>
        <span
          className={cn(
            "font-display font-semibold text-[8.5px] tracking-[0.32em]",
            dark ? "text-creme" : "text-steel",
          )}
        >
          AUTOMOTIVE
        </span>
      </span>
    </span>
  );
}
