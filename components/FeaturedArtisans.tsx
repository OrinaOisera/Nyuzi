import { ArtisanCard } from "@/components/ArtisanCard";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { getArtisans } from "@/lib/data";

export async function FeaturedArtisans() {
  const artisans = await getArtisans();

  return (
    <section className="border-t border-nyuzi-sand bg-nyuzi-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <SectionEyebrow>Meet the makers</SectionEyebrow>
          <h2 className="font-display mt-3 text-3xl font-semibold text-nyuzi-ink sm:text-4xl">
            Featured artisans
          </h2>
          <p className="mt-3 text-nyuzi-muted">
            Every garment carries heritage — explore the people and traditions behind the cloth.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {artisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </div>
    </section>
  );
}
