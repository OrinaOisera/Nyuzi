import Image from "next/image";
import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80";

const HERO_ACCENT =
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80";

export function Hero() {
  return (
    <section className="mesh-hero relative overflow-hidden">
      <div className="textile-stripe" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:py-28">
        <div className="max-w-xl">
          <div className="animate-fade-up">
            <SectionEyebrow>Custom African Fashion</SectionEyebrow>
          </div>
          <h1 className="animate-fade-up animate-delay-1 font-display mt-5 text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-nyuzi-ink sm:text-6xl lg:text-[4.25rem]">
            Wear the story.
            <span className="mt-1 block shimmer-text">Fit your shape.</span>
          </h1>
          <p className="animate-fade-up animate-delay-2 mt-6 text-lg leading-relaxed text-nyuzi-muted sm:text-xl">
            Handcrafted Ankara, Shweshwe, and Kente — made to your measurements with immersive
            virtual try-on.
          </p>
          <div className="animate-fade-up animate-delay-3 mt-9 flex flex-wrap gap-3">
            <Link
              href="#shop"
              className="group inline-flex items-center gap-2 rounded-full bg-nyuzi-amber px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:bg-nyuzi-amber-dark hover:shadow-xl"
            >
              Browse collection
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center rounded-full border border-stone-300/80 bg-white/60 px-8 py-4 text-sm font-semibold text-nyuzi-ink backdrop-blur-sm transition hover:border-nyuzi-amber hover:bg-white"
            >
              Try the demo
            </Link>
          </div>
          <dl className="animate-fade-up animate-delay-4 mt-12 grid grid-cols-3 gap-6">
            {[
              { value: "9+", label: "Handcrafted pieces" },
              { value: "3", label: "Featured artisans" },
              { value: "100%", label: "Custom fit" },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-nyuzi-amber/40 pl-4">
                <dt className="font-display text-3xl font-semibold text-nyuzi-ink">{stat.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-nyuzi-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up animate-delay-2 relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="fitting-room-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-nyuzi-sand">
            <Image
              src={HERO_IMAGE}
              alt="Model wearing African formal wear"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 85vw, 42vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nyuzi-ink/70 via-nyuzi-ink/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-nyuzi-gold">
                Featured piece
              </p>
              <p className="font-display mt-1 text-2xl text-white">Royal Ankara Gown</p>
              <p className="mt-1 text-sm text-white/80">Amara Okafor · Lagos, Nigeria</p>
            </div>
          </div>

          <div className="animate-float glass-panel absolute -bottom-5 -left-5 hidden max-w-[200px] rounded-2xl p-4 shadow-xl sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-nyuzi-muted">
              Virtual try-on
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-nyuzi-ink">
              See it on your photo in seconds
            </p>
          </div>

          <div className="absolute -right-4 top-8 hidden overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white sm:block lg:-right-8">
            <Image
              src={HERO_ACCENT}
              alt="Celebration dress detail"
              width={140}
              height={180}
              className="object-cover"
            />
          </div>

          <div className="absolute -top-3 right-8 hidden rounded-full bg-nyuzi-emerald px-4 py-2 text-xs font-semibold text-white shadow-lg lg:block">
            Custom fit ✦
          </div>
        </div>
      </div>
    </section>
  );
}
