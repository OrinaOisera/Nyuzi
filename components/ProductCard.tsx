import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { ProductWithArtisan } from "@/types/database";
import { OCCASION_LABELS } from "@/types/database";

interface ProductCardProps {
  product: ProductWithArtisan;
}

export function ProductCard({ product }: ProductCardProps) {
  const artisanHref = product.artisan.slug
    ? `/artisan/${product.artisan.slug}`
    : `/artisan/${product.artisan.id}`;

  return (
    <article className="group overflow-hidden rounded-[1.25rem] bg-white shadow-sm ring-1 ring-stone-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/8 hover:ring-amber-200/80">
      <Link href={`/try-on/${product.id}`} className="relative block">
        <div className="relative aspect-[3/4] overflow-hidden bg-nyuzi-sand">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nyuzi-ink/55 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-nyuzi-amber backdrop-blur-sm">
            {OCCASION_LABELS[product.occasion]}
          </span>
          <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-nyuzi-ink shadow-lg">
              Virtual try-on →
            </span>
          </div>
        </div>
      </Link>
      <div className="space-y-2.5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/try-on/${product.id}`}
              className="font-display text-lg font-semibold text-nyuzi-ink transition hover:text-nyuzi-amber"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-sm text-nyuzi-muted">{product.fabric_name}</p>
          </div>
          <p className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-semibold text-nyuzi-emerald">
            {formatPrice(product.price_cents)}
          </p>
        </div>
        <p className="text-sm text-nyuzi-muted">
          by{" "}
          <Link
            href={artisanHref}
            className="font-medium text-nyuzi-amber transition hover:underline"
          >
            {product.artisan.display_name}
          </Link>
          {product.artisan.location ? ` · ${product.artisan.location}` : ""}
        </p>
      </div>
    </article>
  );
}
