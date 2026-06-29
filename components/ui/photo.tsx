import Image from "next/image";
import { cn } from "@/lib/cn";

const STRIPE =
  "repeating-linear-gradient(135deg,#E7E1D2 0,#E7E1D2 16px,#E0D9C8 16px,#E0D9C8 32px)";

/**
 * Foto-slot met nette placeholder zolang er geen echte foto is.
 * Zodra `src` gevuld is, rendert het een geoptimaliseerde next/image.
 * TODO go-live: echte voertuig-/personenfoto's koppelen (zie inventory).
 */
export function Photo({
  src,
  alt,
  label,
  fill = true,
  width,
  height,
  sizes,
  priority,
  rounded = "rounded-[var(--radius-lg)]",
  className,
  imgClassName,
}: {
  src?: string;
  alt: string;
  label?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-creme-deep", rounded, className)}
      style={src ? undefined : { background: STRIPE }}
    >
      {src ? (
        fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? "100vw"}
            priority={priority}
            className={cn("object-cover", imgClassName)}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 1200}
            height={height ?? 900}
            sizes={sizes}
            priority={priority}
            className={cn("object-cover w-full h-full", imgClassName)}
          />
        )
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-mono text-[11px] tracking-[0.13em] uppercase text-[#8c8675] bg-warm/80 px-3 py-1.5 rounded-full">
            {label ?? alt}
          </span>
        </div>
      )}
    </div>
  );
}
