import Image from "next/image";
import { Star } from "lucide-react";
import { tekst } from "@/lib/teksten";

interface Review {
  quote: string;
  name: string;
  place: string;
  avatar: string;
}

// TODO go-live: echte Google-reviews + portretten. byq CDN-portretten als placeholder.
// De teksten staan in home__testimonials; de portretten gaan op volgorde mee.
const AVATARS = [
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-3.webp",
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-1.webp",
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar.webp",
  "https://byqsupply-components.netlify.app/haldenmiller/images/ContactAvatar-2.webp",
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

export async function Testimonials() {
  const t = await tekst("home__testimonials");
  const reviews: Review[] = t.reviews.map((r, i) => ({
    quote: r.quote,
    name: r.naam,
    place: r.plaats,
    avatar: AVATARS[i % AVATARS.length],
  }));
  const loop = [...reviews, ...reviews];
  return (
    <section className="py-[clamp(48px,7vw,96px)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-[22px] mb-10">
        <span className="font-display font-bold text-[13px] tracking-[0.14em] uppercase text-steel">
          {t.eyebrow}
        </span>
        <h2 className="font-display font-extrabold text-[clamp(28px,4.4vw,52px)] tracking-[-0.02em] text-slate mt-2 max-w-[16ch]">
          {t.titel}
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
