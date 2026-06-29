import Image from "next/image";
import { Star } from "lucide-react";

interface Review {
  quote: string;
  name: string;
  place: string;
  avatar: string;
}

// TODO go-live: echte Google-reviews + portretten. byq CDN-portretten als placeholder.
const REVIEWS: Review[] = [
  {
    quote:
      "Rustig geholpen door Leroy, alle tijd genomen. Eerlijk verhaal over de auto en netjes afgeleverd.",
    name: "Sandra",
    place: "Breda",
    avatar: "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-3.webp",
  },
  {
    quote:
      "Fijne, nuchtere mensen. Geen gladde verkooppraat. Onze eerste gezinsauto met een gerust gevoel gekocht.",
    name: "Mehmet",
    place: "Etten-Leur",
    avatar: "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-1.webp",
  },
  {
    quote:
      "Auto online gevonden, bezichtiging gepland, en alles klopte. Aanrader voor wie geen gedoe wil.",
    name: "Patrick",
    place: "Oosterhout",
    avatar: "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar.webp",
  },
  {
    quote:
      "Eerlijk advies en een nette auto met garantie. Voelde echt als kopen van iemand die je kent, niet van een loket.",
    name: "Linda",
    place: "Prinsenbeek",
    avatar: "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-2.webp",
  },
];

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="flex flex-col justify-between w-[340px] sm:w-[400px] shrink-0 bg-creme rounded-[var(--radius-lg)] p-8 m-0">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} size={16} className="fill-steel text-steel" />
        ))}
      </div>
      <blockquote className="font-display font-semibold text-[clamp(18px,2vw,23px)] leading-snug tracking-[-0.01em] text-slate m-0">
        “{r.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3.5 mt-7">
        <span className="w-12 h-12 rounded-full overflow-hidden shrink-0">
          <Image src={r.avatar} alt={`${r.name} uit ${r.place}`} width={48} height={48} className="object-cover w-full h-full" />
        </span>
        <span className="leading-tight">
          <span className="block font-display font-bold text-[15px] text-slate">{r.name}</span>
          <span className="block text-[14px] text-slate-soft">{r.place}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const loop = [...REVIEWS, ...REVIEWS];
  return (
    <section className="py-[clamp(48px,7vw,96px)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-[22px] mb-10">
        <span className="font-display font-bold text-[13px] tracking-[0.14em] uppercase text-steel">
          Wat kopers zeggen
        </span>
        <h2 className="font-display font-extrabold text-[clamp(28px,4.4vw,52px)] tracking-[-0.02em] text-slate mt-2 max-w-[16ch]">
          Met een gerust gevoel gereden
        </h2>
      </div>
      <div className="marquee">
        <div className="marquee-track gap-6" style={{ ["--marquee-duration" as string]: "44s" }}>
          {loop.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
