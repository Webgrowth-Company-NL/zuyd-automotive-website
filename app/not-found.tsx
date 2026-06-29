import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ZBadge } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <section className="max-w-[1100px] mx-auto px-[22px] py-[clamp(60px,10vw,120px)] text-center">
      <ZBadge size={64} className="mx-auto mb-6" />
      <h1 className="font-display font-extrabold text-[clamp(30px,5vw,48px)] tracking-[-0.02em] text-slate">
        Deze pagina bestaat niet
      </h1>
      <p className="text-[17px] text-slate-soft mt-4 max-w-[44ch] mx-auto">
        Misschien is de auto net verkocht of klopt de link niet. Bekijk gerust de rest van onze
        voorraad.
      </p>
      <div className="flex flex-wrap gap-3.5 justify-center mt-8">
        <Link href="/occasions" className={buttonVariants({ variant: "primary", size: "lg" })}>
          Naar de voorraad
        </Link>
        <Link href="/" className={buttonVariants({ variant: "secondary", size: "lg" })}>
          Terug naar home
        </Link>
      </div>
    </section>
  );
}
