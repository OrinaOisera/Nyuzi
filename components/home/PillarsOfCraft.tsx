"use client";

import Image from "next/image";
import { LANDING_PAGE } from "@/lib/assets";
import type { ShopCategoryFilter } from "@/components/home/shop-filters";

const PILLARS: {
  shopCategory: Exclude<ShopCategoryFilter, "all">;
  title: string;
  subtext: string;
  image: string;
  alt: string;
}[] = [
  {
    shopCategory: "clothing",
    title: "Bespoke Clothing",
    subtext: "The Loom & Stitch",
    image: LANDING_PAGE.pillars.clothing.src,
    alt: LANDING_PAGE.pillars.clothing.alt,
  },
  {
    shopCategory: "bags",
    title: "Handcrafted Bags",
    subtext: "The Woven & Sculpted",
    image: LANDING_PAGE.pillars.bags.src,
    alt: LANDING_PAGE.pillars.bags.alt,
  },
  {
    shopCategory: "bracelets",
    title: "Artisan Bracelets",
    subtext: "The Cast & Beaded",
    image: LANDING_PAGE.pillars.bracelets.src,
    alt: LANDING_PAGE.pillars.bracelets.alt,
  },
];

interface PillarsOfCraftProps {
  activeCategory: ShopCategoryFilter;
  onSelectCategory: (category: ShopCategoryFilter) => void;
}

export function PillarsOfCraft({ activeCategory, onSelectCategory }: PillarsOfCraftProps) {
  function handleSelect(category: Exclude<ShopCategoryFilter, "all">) {
    onSelectCategory(activeCategory === category ? "all" : category);
    requestAnimationFrame(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <section className="border-t border-nyuzi-ink/10 bg-nyuzi-cream px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-nyuzi-muted">
            Offerings
          </p>
          <h2 className="font-[family-name:var(--font-fraunces)] mt-3 text-4xl font-semibold leading-[1.05] text-nyuzi-ink sm:text-5xl">
            The Pillars of Craft
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-nyuzi-muted sm:text-base">
            Three disciplines. One commitment to silhouette, story, and hand-finished detail.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PILLARS.map((pillar) => {
            const isActive = activeCategory === pillar.shopCategory;

            return (
              <button
                key={pillar.shopCategory}
                type="button"
                onClick={() => handleSelect(pillar.shopCategory)}
                aria-pressed={isActive}
                className={`group w-full text-left transition ${
                  isActive ? "ring-2 ring-nyuzi-ink ring-offset-4 ring-offset-nyuzi-cream" : ""
                }`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-nyuzi-sand">
                  <Image
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-nyuzi-ink/0 transition duration-500 group-hover:bg-nyuzi-ink/10" />
                </div>

                <div className="mt-5">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-nyuzi-muted">
                    {pillar.subtext}
                  </p>
                  <h3 className="font-[family-name:var(--font-fraunces)] mt-2 text-2xl font-semibold leading-tight text-nyuzi-ink sm:text-3xl">
                    {pillar.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
