import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { CATEGORY_LABELS } from "@/types/customization";
import type { ProductWithArtisan } from "@/types/database";
import { OCCASION_LABELS } from "@/types/database";

interface ProductCardProps {
  product: ProductWithArtisan;
  featured?: boolean;
}

function productHref(product: ProductWithArtisan): string {
  return product.category === "garment"
    ? `/try-on/${product.id}`
    : `/customize/${product.id}`;
}

function productCta(product: ProductWithArtisan): string {
  if (product.category === "bag") return "Customize bag";
  if (product.category === "accessory") return "Customize piece";
  return "Try on virtually";
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const artisanHref = product.artisan.slug
    ? `/artisan/${product.artisan.slug}`
    : `/artisan/${product.artisan.id}`;

  const badgeLabel =
    product.category === "garment"
      ? OCCASION_LABELS[product.occasion]
      : CATEGORY_LABELS[product.category];

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.35rem] bg-white transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-stone-900/10 ${
        featured
          ? "ring-2 ring-nyuzi-amber/30 shadow-lg shadow-amber-900/5"
          : "ring-1 ring-stone-200/80 shadow-sm hover:ring-amber-200/90"
      }`}
    >
      <Link href={productHref(product)} className="relative block">
        <div className={`relative overflow-hidden bg-nyuzi-sand ${featured ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nyuzi-ink/70 via-nyuzi-ink/5 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-nyuzi-ink/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            {badgeLabel}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-nyuzi-emerald backdrop-blur-sm">
            {formatPrice(product.price_cents)}
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-nyuzi-gold">
              {product.fabric_name}
            </p>
            <p className="font-display mt-1 text-xl font-semibold text-white drop-shadow-sm">
              {product.name}
            </p>
            <span className="mt-3 inline-flex translate-y-2 items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-nyuzi-ink opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {productCta(product)}
              <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </Link>
      <div className="border-t border-stone-100 px-5 py-4">
        <p className="text-sm text-nyuzi-muted">
          by{" "}
          <Link
            href={artisanHref}
            className="font-semibold text-nyuzi-amber transition hover:underline"
          >
            {product.artisan.display_name}
          </Link>
          {product.artisan.location && (
            <span className="text-nyuzi-muted/70"> · {product.artisan.location}</span>
          )}
        </p>
      </div>
    </article>
  );
}
