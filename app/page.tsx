import { Suspense } from "react";
import { FeaturedArtisans } from "@/components/FeaturedArtisans";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { OccasionFilter } from "@/components/OccasionFilter";
import { ProductCard } from "@/components/ProductCard";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { getProducts } from "@/lib/data";
import { OCCASION_LABELS, OCCASIONS, type OccasionType } from "@/types/database";

interface HomeProps {
  searchParams: Promise<{ occasion?: string }>;
}

function isValidOccasion(value: string): value is OccasionType {
  return OCCASIONS.includes(value as OccasionType);
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const occasion =
    params.occasion && isValidOccasion(params.occasion) ? params.occasion : null;
  const products = await getProducts(occasion);

  return (
    <>
      <Hero />
      {!occasion && <HowItWorks />}

      <section id="shop" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionEyebrow>Collection</SectionEyebrow>
            <h2 className="font-display mt-2 text-3xl font-semibold text-nyuzi-ink">
              Shop by occasion
            </h2>
            <p className="mt-2 text-nyuzi-muted">
              {occasion
                ? `${OCCASION_LABELS[occasion]} · ${products.length} piece${products.length === 1 ? "" : "s"}`
                : `${products.length} handcrafted pieces from across the continent`}
            </p>
          </div>
          <Suspense fallback={<div className="h-10 w-full max-w-xl animate-pulse rounded-full bg-nyuzi-sand lg:w-96" />}>
            <OccasionFilter />
          </Suspense>
        </div>

        {products.length === 0 ? (
          <div className="mt-12 rounded-[1.25rem] border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
            <p className="font-display text-xl text-nyuzi-ink">No pieces found</p>
            <p className="mt-2 text-nyuzi-muted">Try a different occasion filter.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {!occasion && (
        <Suspense fallback={null}>
          <FeaturedArtisans />
        </Suspense>
      )}
    </>
  );
}
