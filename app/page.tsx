import { Suspense } from "react";
import { CallToAction } from "@/components/CallToAction";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FabricMarquee } from "@/components/FabricMarquee";
import { FeaturedArtisans } from "@/components/FeaturedArtisans";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { OccasionFilter } from "@/components/OccasionFilter";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { getProducts } from "@/lib/data";
import { CATEGORY_LABELS, CATEGORIES, type ProductCategory } from "@/types/customization";
import { OCCASION_LABELS, OCCASIONS, type OccasionType } from "@/types/database";

interface HomeProps {
  searchParams: Promise<{ occasion?: string; category?: string }>;
}

function isValidOccasion(value: string): value is OccasionType {
  return OCCASIONS.includes(value as OccasionType);
}

function isValidCategory(value: string): value is ProductCategory {
  return CATEGORIES.includes(value as ProductCategory);
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const occasion =
    params.occasion && isValidOccasion(params.occasion) ? params.occasion : null;
  const category =
    params.category && isValidCategory(params.category) ? params.category : null;
  const products = await getProducts(occasion, category);
  const [featured, ...rest] = products;

  const filterLabel = category
    ? CATEGORY_LABELS[category]
    : occasion
      ? OCCASION_LABELS[occasion]
      : null;

  return (
    <>
      <Hero />
      <FabricMarquee />

      {!occasion && !category && (
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>
      )}

      <section
        id="shop"
        className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" />

        <ScrollReveal>
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionEyebrow>Collection</SectionEyebrow>
              <h2 className="font-display mt-3 text-3xl font-semibold text-nyuzi-ink sm:text-4xl">
                {category ? `Shop ${CATEGORY_LABELS[category].toLowerCase()}` : "Shop by occasion"}
              </h2>
              <p className="mt-2 max-w-lg text-nyuzi-muted">
                {filterLabel
                  ? `${filterLabel} · ${products.length} piece${products.length === 1 ? "" : "s"}`
                  : `${products.length} handcrafted pieces — garments, bags, and accessories made to celebrate who you are.`}
              </p>
            </div>
            <div className="flex w-full max-w-xl flex-col gap-3 lg:max-w-md">
              <Suspense
                fallback={
                  <div className="h-10 w-full animate-pulse rounded-full bg-nyuzi-sand" />
                }
              >
                <CategoryFilter />
              </Suspense>
              <Suspense
                fallback={
                  <div className="h-10 w-full animate-pulse rounded-full bg-nyuzi-sand" />
                }
              >
                <OccasionFilter />
              </Suspense>
            </div>
          </div>
        </ScrollReveal>

        {products.length === 0 ? (
          <div className="mt-14 rounded-[1.35rem] border border-dashed border-stone-300 bg-white px-6 py-24 text-center">
            <p className="font-display text-2xl text-nyuzi-ink">No pieces found</p>
            <p className="mt-2 text-nyuzi-muted">Try a different category or occasion filter.</p>
          </div>
        ) : (
          <ScrollReveal>
            <div
              className={`grid gap-6 ${
                !occasion && !category && featured
                  ? "sm:grid-cols-2 lg:grid-cols-4"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {!occasion && !category && featured && (
                <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-nyuzi-amber">
                    Editor&apos;s pick
                  </p>
                  <ProductCard product={featured} featured />
                </div>
              )}
              {(occasion || category ? products : rest).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </ScrollReveal>
        )}
      </section>

      {!occasion && !category && (
        <>
          <ScrollReveal>
            <FeaturedArtisans />
          </ScrollReveal>
          <ScrollReveal>
            <CallToAction />
          </ScrollReveal>
        </>
      )}
    </>
  );
}
