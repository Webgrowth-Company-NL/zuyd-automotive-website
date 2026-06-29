import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/booking/booking-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: "Zuyd Automotive — Betrouwbare occasions in Breda",
    template: "%s · Zuyd Automotive",
  },
  description:
    "Betaalbare, persoonlijk uitgekozen occasions in Breda. Plan online een bezichtiging met Leroy. Gekeurd, met garantie en eerlijk advies — zonder verkooppraat.",
  keywords: [
    "occasions Breda",
    "tweedehands auto Breda",
    "betaalbare occasion",
    "auto kopen Breda",
    "Zuyd Automotive",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.baseUrl,
    siteName: SITE.name,
    title: "Zuyd Automotive — Betrouwbare occasions in Breda",
    description:
      "Persoonlijk uitgekozen occasions in Breda. Plan online een bezichtiging met Leroy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuyd Automotive — Betrouwbare occasions in Breda",
    description:
      "Persoonlijk uitgekozen occasions in Breda. Plan online een bezichtiging met Leroy.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F6F2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${archivo.variable} ${hanken.variable}`}>
      <body>
        <BookingProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </BookingProvider>
      </body>
    </html>
  );
}
