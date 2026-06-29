"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Menu, X } from "lucide-react";
import { Wordmark, ZBadge } from "@/components/brand/logo";
import { BookButton } from "@/components/booking/book-button";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-warm/85 backdrop-blur-[14px] border-b border-line-soft">
        <div className="max-w-[1200px] mx-auto px-[22px] h-[72px] flex items-center justify-between gap-4">
        <Link href="/" aria-label="Zuyd Automotive — home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-2 rounded-[10px] font-display font-semibold text-[14.5px] transition-colors",
                  active ? "text-steel-deep bg-steel/8" : "text-slate hover:text-steel",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <BookButton size="sm" className="max-sm:px-4">
            <Calendar size={17} />
            <span className="max-sm:hidden">Plan bezichtiging</span>
            <span className="sm:hidden">Plan</span>
          </BookButton>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menu openen"
            className="lg:hidden w-[46px] h-[46px] grid place-items-center bg-white border border-line rounded-[11px] text-slate hover:border-steel transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[70] bg-warm flex flex-col z-fade lg:hidden">
          <div className="max-w-[1200px] mx-auto w-full px-[22px] h-[72px] flex items-center justify-between border-b border-line-soft shrink-0">
            <Wordmark />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Menu sluiten"
              className="w-[46px] h-[46px] grid place-items-center bg-white border border-line rounded-[11px] text-slate hover:border-steel transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="max-w-[1200px] mx-auto w-full px-[22px] py-10 flex-1 flex flex-col gap-10 justify-center">
            <nav className="flex flex-col gap-1">
              <MenuLink href="/" onClick={() => setMenuOpen(false)}>
                Home
              </MenuLink>
              {NAV.map((item) => (
                <MenuLink key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </MenuLink>
              ))}
            </nav>
            <div className="flex flex-wrap gap-3.5 items-center">
              <BookButton size="lg" onClick={() => setMenuOpen(false)}>
                Plan een bezichtiging met Leroy
              </BookButton>
              <span className="text-[15px] text-slate-soft flex items-center gap-2">
                <ZBadge size={26} />
                {SITE.address.city} · 9:00–18:00
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MenuLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="font-display font-bold text-[clamp(30px,8vw,46px)] text-slate hover:text-steel transition-colors py-1.5 tracking-[-0.01em]"
    >
      {children}
    </Link>
  );
}
