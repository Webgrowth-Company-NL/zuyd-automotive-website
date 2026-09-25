import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/booking/booking-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE } from "@/lib/site";
import { tekst } from "@/lib/teksten";

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
    default: "Zuyd Automotive · Betrouwbare occasions in Breda",
    template: "%s · Zuyd Automotive",
  },
  description:
    "Betaalbare, persoonlijk uitgekozen occasions in Breda. Vraag naar Leroy voor een bezichtiging. Gekeurd, met eerlijk advies en garantie mogelijk.",
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
    title: "Zuyd Automotive · Betrouwbare occasions in Breda",
    description:
      "Persoonlijk uitgekozen occasions in Breda. Vraag naar Leroy voor een bezichtiging.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuyd Automotive · Betrouwbare occasions in Breda",
    description:
      "Persoonlijk uitgekozen occasions in Breda. Vraag naar Leroy voor een bezichtiging.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F6F2",
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [header, footer, afspraak] = await Promise.all([
    tekst("shared__header"),
    tekst("shared__footer"),
    tekst("shared__afspraak"),
  ]);
  return (
    <html lang="nl" className={`${archivo.variable} ${hanken.variable}`}>
      <body>
        {/* Fathom: cookieloos, dus geen toestemmingsbanner nodig. */}
        <Script
          src="https://cdn.usefathom.com/script.js"
          data-site="EJEUBSWV"
          strategy="afterInteractive"
          defer
        />
        {/* Forester: teksten aanwijzen als de site in Forester in een frame
            staat. Voor gewone bezoekers laadt het script niet eens. */}
        <Script id="forester-bewerken" strategy="afterInteractive">
          {`if (window.parent !== window) { var s = document.createElement("script"); s.src = "/forester-bewerken.js"; document.body.appendChild(s); }`}
        </Script>
        <BookingProvider t={afspraak}>
          <SiteHeader t={header} />
          <main>{children}</main>
          <SiteFooter t={footer} />
        </BookingProvider>
      </body>
    </html>
  );
}
