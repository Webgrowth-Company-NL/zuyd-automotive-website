import Link from "next/link";
import { Wordmark } from "@/components/brand/logo";
import { NAV, SITE, telHref } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-slate text-warm/72">
      <div className="max-w-[1200px] mx-auto px-[22px] pt-[clamp(44px,5vw,64px)] pb-7">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-9">
          <div className="max-w-[280px]">
            <Wordmark dark className="mb-4" badgeSize={42} />
            <p className="text-sm leading-relaxed">{SITE.tagline}</p>
          </div>

          <FooterCol title="Pagina's">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title="Contact">
            <span>
              {SITE.address.street.split(" - ")[0]}, {SITE.address.city}
            </span>
            <a href={telHref()} className="hover:text-white transition-colors">
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
              {SITE.email}
            </a>
          </FooterCol>

          <FooterCol title="Openingstijden">
            {SITE.openingHours.map((row) => (
              <span key={row.day} className="flex justify-between gap-4">
                <span>{row.day}</span>
                <span>{row.time}</span>
              </span>
            ))}
          </FooterCol>
        </div>

        <div className="mt-9 pt-5 border-t border-warm/15 flex flex-wrap gap-2.5 justify-between text-[13px]">
          <span>© {new Date().getFullYear()} Zuyd Automotive</span>
          <span>
            {SITE.bovag ? "BOVAG · " : ""}
            KvK {SITE.kvk} · {SITE.address.city}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-display font-bold text-[13px] tracking-[0.1em] uppercase text-creme mb-3.5">
        {title}
      </h4>
      <div className="flex flex-col gap-2.5 items-start text-[14.5px]">{children}</div>
    </div>
  );
}
