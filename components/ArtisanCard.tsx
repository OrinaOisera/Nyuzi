import Image from "next/image";
import Link from "next/link";
import type { Artisan } from "@/types/database";

interface ArtisanCardProps {
  artisan: Artisan;
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  const href = artisan.slug ? `/artisan/${artisan.slug}` : `/artisan/${artisan.id}`;
  const cover = artisan.behind_the_stitch_gallery[0];

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[1.25rem] bg-white shadow-sm ring-1 ring-stone-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-amber-200/80"
    >
      {cover && (
        <div className="relative aspect-[4/3] overflow-hidden bg-nyuzi-sand">
          <Image
            src={cover}
            alt={artisan.display_name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nyuzi-ink/40 to-transparent" />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-nyuzi-ink group-hover:text-nyuzi-amber">
          {artisan.display_name}
        </h3>
        {artisan.location && (
          <p className="mt-1 text-sm text-nyuzi-muted">{artisan.location}</p>
        )}
        {artisan.story && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-nyuzi-muted">
            {artisan.story}
          </p>
        )}
        <span className="mt-4 inline-flex text-sm font-semibold text-nyuzi-amber">
          View collection →
        </span>
      </div>
    </Link>
  );
}
