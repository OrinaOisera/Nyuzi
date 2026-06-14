import Image from "next/image";
import Link from "next/link";
import type { Artisan } from "@/types/database";

interface ArtisanCardProps {
  artisan: Artisan;
  variant?: "light" | "dark";
}

export function ArtisanCard({ artisan, variant = "light" }: ArtisanCardProps) {
  const href = artisan.slug ? `/artisan/${artisan.slug}` : `/artisan/${artisan.id}`;
  const cover = artisan.behind_the_stitch_gallery[0];
  const isDark = variant === "dark";

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-[1.35rem] transition duration-500 hover:-translate-y-1.5 ${
        isDark
          ? "bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-nyuzi-gold/30 hover:shadow-2xl hover:shadow-black/30"
          : "bg-white shadow-sm ring-1 ring-stone-200/80 hover:shadow-xl hover:ring-amber-200/80"
      }`}
    >
      {cover && (
        <div className="relative aspect-[4/3] overflow-hidden bg-nyuzi-sand">
          <Image
            src={cover}
            alt={artisan.display_name}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              isDark ? "from-nyuzi-ink/80" : "from-nyuzi-ink/50"
            } to-transparent`}
          />
          {isDark && (
            <span className="absolute left-3 top-3 rounded-full bg-nyuzi-gold/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-nyuzi-ink">
              Artisan
            </span>
          )}
        </div>
      )}
      <div className="p-5">
        <h3
          className={`font-display text-xl font-semibold transition ${
            isDark ? "text-white group-hover:text-nyuzi-gold" : "text-nyuzi-ink group-hover:text-nyuzi-amber"
          }`}
        >
          {artisan.display_name}
        </h3>
        {artisan.location && (
          <p className={`mt-1 text-sm ${isDark ? "text-white/55" : "text-nyuzi-muted"}`}>
            {artisan.location}
          </p>
        )}
        {artisan.story && (
          <p
            className={`mt-3 line-clamp-2 text-sm leading-relaxed ${
              isDark ? "text-white/60" : "text-nyuzi-muted"
            }`}
          >
            {artisan.story}
          </p>
        )}
        <span
          className={`mt-4 inline-flex text-sm font-semibold ${
            isDark ? "text-nyuzi-gold" : "text-nyuzi-amber"
          }`}
        >
          View collection →
        </span>
      </div>
    </Link>
  );
}
