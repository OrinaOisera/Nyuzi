import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { HomePostHero } from "@/components/home/HomePostHero";
import { LANDING_PAGE } from "@/lib/assets";
import { getProducts } from "@/lib/data";

export default async function Home() {
  const products = await getProducts();
  const hero = LANDING_PAGE.hero;

  return (
    <div className="bg-nyuzi-cream text-nyuzi-ink">
      {/* Chapter I — Hero Cover */}
      <section className="relative flex min-h-[100svh] flex-col justify-end">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nyuzi-ink/85 via-nyuzi-ink/35 to-nyuzi-ink/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24 lg:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-nyuzi-cream/70">
            Chapter I · Nyuzi
          </p>
          <h1 className="font-[family-name:var(--font-fraunces)] mt-6 max-w-5xl text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-nyuzi-cream">
            Custom African fashion:
            <span className="mt-4 block max-w-4xl text-[clamp(1.35rem,3.8vw,2.75rem)] font-normal leading-snug text-nyuzi-cream/95">
              Garments, bags, and adornments shaped by artisan hands and your exact
              measurements, bespoke &amp; tailored to your story.
            </span>
          </h1>
          <Link
            href="#shop"
            className="mt-10 inline-flex items-center justify-center bg-nyuzi-ink px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-nyuzi-cream transition hover:bg-nyuzi-ink/90"
          >
            Sculpt My Silhouette
          </Link>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[40vh] bg-nyuzi-cream" aria-hidden />}>
        <HomePostHero products={products} />
      </Suspense>
    </div>
  );
}
