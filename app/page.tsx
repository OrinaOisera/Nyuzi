import { Suspense } from "react";
import { CallToAction } from "@/components/CallToAction";
import { FabricMarquee } from "@/components/FabricMarquee";
import { FeaturedArtisans } from "@/components/FeaturedArtisans";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { OccasionFilter } from "@/components/OccasionFilter";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
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
  const [featured, ...rest] = products;

  return (
    <>
      <Hero />
      <FabricMarquee />

      {!occasion && (
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
                Shop by occasion
              </h2>
              <p className="mt-2 max-w-lg text-nyuzi-muted">
                {occasion
                  ? `${OCCASION_LABELS[occasion]} · ${products.length} piece${products.length === 1 ? "" : "s"}`
                  : `${products.length} handcrafted pieces — each one made to celebrate who you are.`}
              </p>
            </div>
            <Suspense
              fallback={
                <div className="h-10 w-full max-w-xl animate-pulse rounded-full bg-nyuzi-sand lg:w-96" />
              }
            >
              <OccasionFilter />
            </Suspense>
          </div>
        </ScrollReveal>

        {products.length === 0 ? (
          <div className="mt-14 rounded-[1.35rem] border border-dashed border-stone-300 bg-white px-6 py-24 text-center">
            <p className="font-display text-2xl text-nyuzi-ink">No pieces found</p>
            <p className="mt-2 text-nyuzi-muted">Try a different occasion filter.</p>
          </div>
        ) : (
          <ScrollReveal>
            <div
              className={`grid gap-6 ${
                !occasion && featured
                  ? "sm:grid-cols-2 lg:grid-cols-4"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {!occasion && featured && (
                <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-nyuzi-amber">
                    Editor&apos;s pick
                  </p>
                  <ProductCard product={featured} featured />
                </div>
              )}
              {(occasion ? products : rest).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </ScrollReveal>
        )}
      </section>

      {!occasion && (
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
