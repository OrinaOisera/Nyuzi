import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { ProductCard } from "@/components/ProductCard";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { getArtisan, getArtisanProducts } from "@/lib/data";

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
  const coverImage = artisan.behind_the_stitch_gallery[0] ?? products[0]?.image_url;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <BackLink href="/">Back to shop</BackLink>
      <div className="mt-6 overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-stone-200/80">
        {coverImage && (
          <div className="relative h-56 sm:h-72">
            <Image
              src={coverImage}
              alt={artisan.display_name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-6 sm:p-8">
              <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                {artisan.display_name}
              </h1>
              {artisan.location && (
                <p className="mt-1 text-white/90">{artisan.location}</p>
              )}
            </div>
          </div>
        )}

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {artisan.story && (
              <div>
                <h2 className="text-xl font-semibold text-stone-900">Her story</h2>
                <p className="mt-3 leading-relaxed text-stone-600">{artisan.story}</p>
              </div>
            )}

            {artisan.heritage_video_url && (
              <div>
                <h2 className="text-xl font-semibold text-stone-900">Heritage</h2>
                <div className="mt-3 aspect-video overflow-hidden rounded-2xl bg-stone-100">
                  <iframe
                    src={artisan.heritage_video_url}
                    title={`${artisan.display_name} heritage video`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {artisan.behind_the_stitch_gallery.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-stone-900">Behind the stitch</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {artisan.behind_the_stitch_gallery.map((url) => (
                  <div key={url} className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={url}
                      alt="Workshop gallery"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="mt-12">
        <SectionEyebrow>Collection</SectionEyebrow>
        <div className="mt-2 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-nyuzi-ink">Shop this artisan</h2>
          <Link href="/" className="text-sm font-semibold text-amber-700 hover:underline">
            ← Back to shop
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const withArtisan = {
              ...product,
              artisan: {
                id: artisan.id,
                display_name: artisan.display_name,
                location: artisan.location,
                slug: artisan.slug,
              },
            };
            return <ProductCard key={product.id} product={withArtisan} />;
          })}
        </div>
      </section>
    </div>
  );
}
