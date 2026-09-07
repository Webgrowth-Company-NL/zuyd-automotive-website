import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { BookButton } from "@/components/booking/book-button";
import { buttonVariants } from "@/components/ui/button";

export function ClosingCta() {
  return (
    <section className="max-w-[1200px] mx-auto px-[22px] py-[clamp(40px,6vw,72px)]">
      <Reveal>
        <div className="bg-steel rounded-[var(--radius-lg)] p-[clamp(36px,5vw,64px)] relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-60 h-60 rounded-full border-2 border-creme/16" />
          <div className="absolute right-7 top-7 w-40 h-40 rounded-full border-2 border-creme/12" />
          <div className="relative max-w-[620px]">
            <h2 className="font-display font-extrabold text-[clamp(27px,4vw,42px)] tracking-[-0.01em] text-white leading-tight">
              Klaar om je volgende auto te ontmoeten?
            </h2>
            <p className="text-[17px] leading-relaxed text-white/95 mt-4 mb-7 max-w-[46ch]">
              Bel of app even en vraag naar Leroy. We werken op afspraak, dus zeg wanneer het je
              uitkomt en de auto staat klaar.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <BookButton variant="onDark" size="lg">
                Maak een afspraak
              </BookButton>
              <Link
                href="/occasions"
                className={buttonVariants({ variant: "onDarkOutline", size: "lg" })}
              >
                Bekijk de voorraad
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
