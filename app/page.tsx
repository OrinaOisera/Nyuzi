import Image from "next/image";
import { Suspense } from "react";
import { HeroContent } from "@/components/home/HeroContent";
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

        <HeroContent />
      </section>

      <Suspense fallback={<div className="min-h-[40vh] bg-nyuzi-cream" aria-hidden />}>
        <HomePostHero products={products} />
      </Suspense>
    </div>
  );
}
