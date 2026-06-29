import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { formatPrice } from "@/lib/format";
import { CATEGORY_LABELS } from "@/types/customization";
import { PALETTE_COLOR_LABELS } from "@/types/palette";
import type { Artisan, Product } from "@/types/database";
import { OCCASION_LABELS } from "@/types/database";
import { SITE_IMAGES } from "@/lib/assets";
import { getArtisan, getArtisanProducts } from "@/lib/data";
import { productHrefFromProduct } from "@/lib/product-routes";

const WORKSHOP_IMAGE = SITE_IMAGES.workshop.defaultWorkshop;

function socialImpactFootprint(artisan: Artisan): string {
  if (artisan.social_impact?.trim()) {
    return artisan.social_impact;
  }
  return artisan.location
    ? `Investing in local makers across ${artisan.location}`
    : "Investing in community craft networks across the continent";
}

interface ArtisanPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArtisanPage({ params }: ArtisanPageProps) {
  const { slug } = await params;
  const artisan = await getArtisan(slug);

  if (!artisan) {
    notFound();
  }

  const products = await getArtisanProducts(artisan.id);

  return (
    <div className="bg-nyuzi-cream text-nyuzi-ink">
      {/* Journal masthead */}
      <header className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-10">
        <BackLink href="/">Back to the house</BackLink>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-nyuzi-muted">
          Artisan journal · {artisan.location ?? "Africa"}
        </p>
        <h1 className="font-[family-name:var(--font-fraunces)] mt-4 max-w-5xl text-[clamp(2.75rem,9vw,6rem)] font-semibold leading-[0.92] tracking-tight text-nyuzi-ink">
          {artisan.display_name}
        </h1>
        {artisan.location && (
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-nyuzi-muted">
            {artisan.location}
          </p>
        )}
      </header>

      {/* Behind the Stitch */}
      <section className="border-t border-nyuzi-ink/10">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <figure className="relative min-h-[28rem] lg:min-h-[90vh]">
            <Image
              src={WORKSHOP_IMAGE}
              alt={`${artisan.display_name}'s workshop and sewing table`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nyuzi-ink/75 to-transparent px-6 py-8 sm:px-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-nyuzi-cream/70">
                Behind the stitch
              </p>
              <p className="font-[family-name:var(--font-fraunces)] mt-2 text-xl text-nyuzi-cream sm:text-2xl">
                The table where cloth becomes identity.
              </p>
            </figcaption>
          </figure>

          <div className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-nyuzi-muted">
              Field notes
            </p>

            {artisan.story ? (
              <div className="mt-6 space-y-5">
                {artisan.story.split(". ").map((sentence, index, arr) => {
                  const text =
                    index < arr.length - 1 ? `${sentence.trim()}.` : sentence.trim();
                  if (!text) return null;
                  return (
                    <p
                      key={index}
                      className={`leading-relaxed text-nyuzi-ink ${
                        index === 0
                          ? "text-lg sm:text-xl"
                          : "text-base text-nyuzi-muted"
                      }`}
                    >
                      {text}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="mt-6 text-base leading-relaxed text-nyuzi-muted">
                A maker whose hands carry generations of African textile tradition into
                every bespoke piece.
              </p>
            )}

            <aside className="mt-10 border border-nyuzi-ink/15 bg-white/40 px-5 py-5 sm:px-6 sm:py-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-nyuzi-muted">
                Social impact
              </p>
              <p className="mt-3 text-sm leading-relaxed text-nyuzi-ink sm:text-base">
                {socialImpactFootprint(artisan)}
              </p>
            </aside>

            {artisan.heritage_video_url && (
              <div className="mt-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-nyuzi-muted">
                  Heritage film
                </p>
                <div className="mt-4 aspect-video overflow-hidden border border-nyuzi-ink/10 bg-nyuzi-sand">
                  <iframe
                    src={artisan.heritage_video_url}
                    title={`${artisan.display_name} heritage film`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bespoke collection */}
      <section className="border-t border-nyuzi-ink/10 bg-nyuzi-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-nyuzi-muted">
              Available works
            </p>
            <h2 className="font-[family-name:var(--font-fraunces)] mt-3 text-3xl font-semibold leading-tight text-nyuzi-ink sm:text-4xl lg:text-5xl">
              Bespoke collection
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-nyuzi-muted sm:text-base">
              Pieces cut, stitched, and finished by {artisan.display_name} — each one
              made to order through Nyuzi.
            </p>
          </header>

          {products.length === 0 ? (
            <div className="mt-14 border border-dashed border-nyuzi-ink/20 px-6 py-20 text-center">
              <p className="font-[family-name:var(--font-fraunces)] text-2xl text-nyuzi-ink">
                New works arriving soon.
              </p>
            </div>
          ) : (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={productHrefFromProduct(product)}
                    className="group flex h-full flex-col border border-nyuzi-ink/10 bg-white/30 transition duration-500 hover:border-nyuzi-ink/25 hover:bg-white/60"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-nyuzi-sand">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-nyuzi-muted">
                        {CATEGORY_LABELS[product.category]} ·{" "}
                        {PALETTE_COLOR_LABELS[product.palette_color]}
                      </p>
                      <h3 className="font-[family-name:var(--font-fraunces)] mt-2 text-xl font-semibold leading-snug text-nyuzi-ink sm:text-2xl">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-nyuzi-muted">
                          {product.description}
                        </p>
                      )}
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-nyuzi-ink/10 pt-4 text-sm">
                        <span className="font-semibold text-nyuzi-ink">
                          {formatPrice(product.price_cents)}
                        </span>
                        <span className="text-xs uppercase tracking-[0.16em] text-nyuzi-muted">
                          {OCCASION_LABELS[product.occasion]}
                        </span>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-nyuzi-ink">
                        View piece
                        <span aria-hidden className="transition group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-14 border-t border-nyuzi-ink/10 pt-8">
            <Link
              href="/#shop"
              className="font-mono text-xs uppercase tracking-[0.2em] text-nyuzi-muted transition hover:text-nyuzi-ink"
            >
              ← Explore the full house
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
