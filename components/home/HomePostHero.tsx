"use client";

import { ArtisanWindowChapter } from "@/components/home/ArtisanWindowChapter";
import { CulturalProtocolShop } from "@/components/home/CulturalProtocolShop";
import { PillarsOfCraft } from "@/components/home/PillarsOfCraft";
import { useShopFilters } from "@/components/home/useShopFilters";
import type { ProductWithArtisan } from "@/types/database";

interface HomePostHeroProps {
  products: ProductWithArtisan[];
}

export function HomePostHero({ products }: HomePostHeroProps) {
  const filters = useShopFilters();

  return (
    <>
      <PillarsOfCraft
        activeCategory={filters.activeCategory}
        onSelectCategory={filters.setCategory}
      />
      <ArtisanWindowChapter />
      <CulturalProtocolShop products={products} filters={filters} />
    </>
  );
}
