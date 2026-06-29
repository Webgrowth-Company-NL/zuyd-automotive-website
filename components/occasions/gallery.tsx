"use client";

import { useState } from "react";
import Image from "next/image";
import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/cn";

export function OccasionGallery({
  photos,
  alt,
  status,
  badge,
}: {
  photos: string[];
  alt: string;
  status: string;
  badge: { bg: string; color: string };
}) {
  const [active, setActive] = useState(0);
  const hasPhotos = photos.length > 0;

  return (
    <div>
      <div className="relative">
        {hasPhotos ? (
          <div className="relative w-full aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden shadow-soft bg-creme-deep">
            <Image
              key={photos[active]}
              src={photos[active]}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover z-fade"
            />
          </div>
        ) : (
          <Photo alt={alt} label={`foto · ${alt}`} priority sizes="(max-width: 1024px) 100vw, 560px" className="w-full aspect-[4/3] shadow-soft" />
        )}
        <span
          className="absolute top-4 left-4 font-display font-bold text-xs px-3 py-1.5 rounded-full"
          style={{ background: badge.bg, color: badge.color }}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 mt-2.5">
        {hasPhotos
          ? photos.slice(0, 8).map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                aria-label={`Foto ${i + 1}`}
                className={cn(
                  "relative aspect-[4/3] rounded-[11px] overflow-hidden bg-creme-deep transition-all",
                  i === active ? "outline outline-2 outline-steel" : "opacity-75 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))
          : Array.from({ length: 4 }).map((_, t) => (
              <Photo
                key={t}
                alt=""
                label=""
                rounded="rounded-[11px]"
                sizes="120px"
                className={cn("aspect-[4/3]", t === 0 ? "outline outline-2 outline-steel" : "opacity-70")}
              />
            ))}
      </div>
    </div>
  );
}
