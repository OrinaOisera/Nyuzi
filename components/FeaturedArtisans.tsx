import { ArtisanCard } from "@/components/ArtisanCard";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { getArtisans } from "@/lib/data";

export async function FeaturedArtisans() {
  const artisans = await getArtisans();

  return (
    <section className="relative overflow-hidden bg-nyuzi-ink py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 nyuzi-pattern opacity-[0.07]" />
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-nyuzi-amber/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <SectionEyebrow tone="gold">Meet the makers</SectionEyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Featured artisans
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/65">
            Every garment carries heritage — explore the people and traditions behind the cloth.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {artisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} variant="dark" />
          ))}
        </div>
      </div>
    </section>
  );
}
