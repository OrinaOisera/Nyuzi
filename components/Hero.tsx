import Image from "next/image";
import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80";

export function Hero() {
  return (
    <section className="nyuzi-pattern relative overflow-hidden border-b border-nyuzi-sand">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-emerald-200/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <SectionEyebrow>Custom African Fashion</SectionEyebrow>
          <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-nyuzi-ink sm:text-5xl lg:text-6xl">
            Wear the story.
            <span className="block text-nyuzi-amber">Fit your shape.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-nyuzi-muted">
            Handcrafted Ankara, Shweshwe, and Kente from African artisans — tailored to your
            measurements with immersive virtual try-on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#shop"
              className="inline-flex items-center justify-center rounded-full bg-nyuzi-amber px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/15 transition hover:bg-nyuzi-amber-dark"
            >
              Browse collection
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-nyuzi-ink transition hover:border-nyuzi-amber hover:bg-white"
            >
              Try the demo
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-nyuzi-sand pt-8">
            <div>
              <dt className="text-2xl font-semibold text-nyuzi-ink">9+</dt>
              <dd className="text-xs text-nyuzi-muted">Handcrafted pieces</dd>
            </div>
            <div>
              <dt className="text-2xl font-semibold text-nyuzi-ink">3</dt>
              <dd className="text-xs text-nyuzi-muted">Featured artisans</dd>
            </div>
            <div>
              <dt className="text-2xl font-semibold text-nyuzi-ink">100%</dt>
              <dd className="text-xs text-nyuzi-muted">Custom fit</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="fitting-room-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-nyuzi-sand">
            <Image
              src={HERO_IMAGE}
              alt="Model wearing African formal wear"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nyuzi-ink/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-sm font-medium text-white/90">Royal Ankara Gown</p>
              <p className="font-display text-xl text-white">By Amara Okafor · Lagos</p>
            </div>
          </div>
          <div className="glass-panel absolute -bottom-4 -left-4 hidden rounded-2xl px-4 py-3 shadow-lg sm:block">
            <p className="text-xs font-medium text-nyuzi-muted">Virtual try-on</p>
            <p className="text-sm font-semibold text-nyuzi-ink">Preview on your photo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
