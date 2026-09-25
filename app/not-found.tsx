import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ZBadge } from "@/components/brand/logo";
import { tekst } from "@/lib/teksten";

export default async function NotFound() {
  const t = await tekst("notfound__tekst");
  return (
    <section className="max-w-[1100px] mx-auto px-[22px] py-[clamp(60px,10vw,120px)] text-center">
      <ZBadge size={64} className="mx-auto mb-6" />
      <h1 className="font-display font-extrabold text-[clamp(30px,5vw,48px)] tracking-[-0.02em] text-slate">
        {t.titel}
      </h1>
      <p className="text-[17px] text-slate-soft mt-4 max-w-[44ch] mx-auto">
        {t.tekst}
      </p>
      <div className="flex flex-wrap gap-3.5 justify-center mt-8">
        <Link href="/occasions" className={buttonVariants({ variant: "primary", size: "lg" })}>
          {t.knopVoorraad}
        </Link>
        <Link href="/" className={buttonVariants({ variant: "secondary", size: "lg" })}>
          {t.knopHome}
        </Link>
      </div>
    </section>
  );
}
