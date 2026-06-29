import { SITE } from "./site";
import type { CarView } from "./inventory";

const ORG_ID = `${SITE.baseUrl}/#dealer`;

/** AutoDealer / LocalBusiness — voor de homepage en als publisher-referentie. */
export function autoDealerLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": ORG_ID,
    name: SITE.name,
    description: SITE.tagline,
    url: SITE.baseUrl,
    telephone: SITE.phoneE164,
    email: SITE.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.address.lat,
      longitude: SITE.address.lng,
    },
    areaServed: ["Breda", "Etten-Leur", "Oosterhout", "Noord-Brabant"],
    openingHoursSpecification: SITE.openingHoursSpec.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
  };
}

/** Vehicle + Offer voor een occasion-detailpagina. */
export function vehicleLd(car: CarView) {
  const url = `${SITE.baseUrl}/occasions/${car.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    "@id": `${url}#vehicle`,
    name: car.full,
    brand: { "@type": "Brand", name: car.merk },
    model: car.model,
    vehicleModelDate: String(car.bouwjaar),
    url,
    color: car.kleur,
    fuelType: car.brandstof,
    vehicleTransmission: car.transmissie,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: car.km, unitCode: "KMT" },
    vehicleEngine: { "@type": "EngineSpecification", enginePower: { "@type": "QuantitativeValue", value: car.pk, unitCode: "BHP" } },
    numberOfDoors: car.deuren,
    offers: {
      "@type": "Offer",
      price: car.prijs,
      priceCurrency: "EUR",
      availability:
        car.status === "Verkocht"
          ? "https://schema.org/SoldOut"
          : car.status === "Gereserveerd"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
      url,
      seller: { "@id": ORG_ID },
    },
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
