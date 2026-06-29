import Link from "next/link";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/reveal";
import { BookButton } from "@/components/booking/book-button";
import { buttonVariants } from "@/components/ui/button";

export function Personal() {
  return (
    <section className="bg-slate relative overflow-hidden">
      <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full border-2 border-creme/[0.07]" />
      <div className="absolute right-8 top-9 w-44 h-44 rounded-full border-2 border-creme/[0.06]" />
      <div className="max-w-[1200px] mx-auto px-[22px] py-[clamp(56px,7vw,96px)] relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,4vw,56px)] items-center">
          <Reveal>
            <Photo
              alt="Leroy en Max van Zuyd Automotive"
              label="foto · leroy & max"
              sizes="(max-width: 1024px) 100vw, 560px"
              className="w-full aspect-[5/4] outline outline-1 outline-creme/12 shadow-[0_24px_60px_rgba(0,0,0,0.34)]"
            />
          </Reveal>
          <Reveal delay={120}>
            <span className="font-display font-bold text-[13px] tracking-[0.16em] uppercase text-[#9fb3bd]">
              Wie zijn wij
            </span>
            <h2 className="font-display font-extrabold text-[clamp(28px,3.8vw,44px)] tracking-[-0.015em] text-creme mt-3 leading-[1.05]">
              Twee mensen,
              <br />
              één belofte
            </h2>
            <p className="text-[17px] leading-relaxed text-warm/78 mt-5 max-w-[46ch]">
              Zuyd Automotive wordt gerund door Leroy en Max. Met z&apos;n tweeën, en dat merk je. Wij
              kennen elke auto in onze voorraad persoonlijk en nemen de tijd om hem je rustig te laten
              zien. Geen verkooppraat, gewoon eerlijk advies.
            </p>
            <p className="text-[17px] leading-relaxed text-warm/78 mt-3.5 max-w-[46ch]">
              Bij ons koop je geen nummer, maar een auto die wij met een gerust hart aan je meegeven.
            </p>
            <div className="flex flex-wrap gap-3.5 mt-7">
              <BookButton variant="onDark" size="md">
                Plan een bezichtiging
              </BookButton>
              <Link href="/over-ons" className={buttonVariants({ variant: "onDarkOutline", size: "md" })}>
                Leer ons kennen
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
