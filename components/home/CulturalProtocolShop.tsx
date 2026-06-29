"use client";

import Link from "next/link";
import { useMemo } from "react";
import { FabricTooltip } from "@/components/FabricTooltip";
import { ColorPaletteFilter } from "@/components/home/ColorPaletteFilter";
import { ShopSearchInput } from "@/components/home/ShopSearchInput";
import { ShopSortSelect } from "@/components/home/ShopSortSelect";
import {
  CULTURAL_PROTOCOLS,
  SHOP_CATEGORY_LABELS,
  SHOP_SORT_LABELS,
  countShopProducts,
  filterShopProducts,
  sortShopProducts,
} from "@/components/home/shop-filters";
import type { useShopFilters } from "@/components/home/useShopFilters";
import { formatPrice } from "@/lib/format";
import { productHrefFromProduct } from "@/lib/product-routes";
import { PALETTE_COLOR_LABELS } from "@/types/palette";
import type { ProductWithArtisan } from "@/types/database";

interface CulturalProtocolShopProps {
  products: ProductWithArtisan[];
  filters: ReturnType<typeof useShopFilters>;
}

export function CulturalProtocolShop({ products, filters }: CulturalProtocolShopProps) {
  const {
    activeProtocol,
    activeCategory,
    activeColor,
    sortBy,
    searchQuery,
    hasActiveFilters,
    setProtocol,
    setColor,
    setSort,
    setSearchQuery,
    clearFilters,
  } = filters;

  const filtered = useMemo(() => {
    const matched = filterShopProducts(products, {
      protocol: activeProtocol,
      category: activeCategory,
      color: activeColor,
      query: searchQuery,
    });
    return sortShopProducts(matched, sortBy);
  }, [products, activeProtocol, activeCategory, activeColor, searchQuery, sortBy]);

  const activeMeta = CULTURAL_PROTOCOLS.find((p) => p.id === activeProtocol)!;
  const listKey = `${activeProtocol}-${activeCategory}-${activeColor ?? "all"}-${sortBy}-${searchQuery}`;

  function handleProtocolSelect(protocol: typeof activeProtocol) {
    setProtocol(protocol);
    requestAnimationFrame(() => {
      document.getElementById("shop-results")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }

  return (
    <section id="shop" className="border-t border-nyuzi-ink/10 bg-nyuzi-cream px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-nyuzi-muted">
            Chapter III · The Store
          </p>
          <h2 className="font-[family-name:var(--font-fraunces)] mt-4 text-4xl font-semibold leading-[1.05] text-nyuzi-ink sm:text-5xl lg:text-6xl">
            Dress for the protocol of your moment.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-nyuzi-muted">
            Filter by cultural context — not by size charts. Each piece is mapped to how
            African communities actually gather, move, and celebrate.
          </p>
        </header>

        <div className="border-y border-nyuzi-ink/10 py-6">
          <nav
            aria-label="Cultural protocol filters"
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:gap-6"
          >
            {CULTURAL_PROTOCOLS.map((protocol) => {
              const isActive = activeProtocol === protocol.id;
              const count = countShopProducts(
                products,
                protocol.id,
                activeCategory,
                activeColor,
                searchQuery
              );

              return (
                <button
                  key={protocol.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleProtocolSelect(protocol.id)}
                  className={`group flex min-w-0 flex-1 flex-col items-start rounded-sm px-2 py-2 text-left transition sm:min-w-[180px] sm:flex-none lg:min-w-[220px] ${
                    isActive
                      ? "bg-nyuzi-ink/5 text-nyuzi-ink ring-1 ring-nyuzi-ink/15"
                      : "text-nyuzi-muted hover:bg-nyuzi-ink/[0.03] hover:text-nyuzi-ink"
                  }`}
                >
                  <span
                    className={`font-[family-name:var(--font-fraunces)] text-xl font-semibold sm:text-2xl ${
                      isActive ? "underline decoration-nyuzi-ink decoration-2 underline-offset-4" : ""
                    }`}
                  >
                    {protocol.label}
                    <span className="ml-2 font-mono text-sm font-normal tracking-normal text-nyuzi-muted">
                      ({count})
                    </span>
                  </span>
                  <span className="mt-1 text-xs uppercase tracking-[0.18em]">
                    {protocol.subtitle}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-nyuzi-ink/10 pt-6">
            <ShopSearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="mt-6 flex flex-col gap-6 border-t border-nyuzi-ink/10 pt-6 lg:flex-row lg:items-start lg:justify-between">
            <ColorPaletteFilter value={activeColor} onChange={setColor} />
            <ShopSortSelect value={sortBy} onChange={setSort} />
          </div>
        </div>

        <div
          id="shop-results"
          className="mt-8 flex flex-wrap items-center justify-between gap-3"
        >
          <p className="text-sm text-nyuzi-muted">
            <span className="font-semibold text-nyuzi-ink">{activeMeta.label}</span>
            {activeCategory !== "all" && (
              <>
                {" · "}
                <span className="font-semibold text-nyuzi-ink">
                  {SHOP_CATEGORY_LABELS[activeCategory]}
                </span>
              </>
            )}
            {activeColor && (
              <>
                {" · "}
                <span className="font-semibold text-nyuzi-ink">
                  {PALETTE_COLOR_LABELS[activeColor]}
                </span>
              </>
            )}
            {sortBy !== "featured" && (
              <>
                {" · "}
                <span className="font-semibold text-nyuzi-ink">
                  {SHOP_SORT_LABELS[sortBy]}
                </span>
              </>
            )}
            {searchQuery && (
              <>
                {" · "}
                <span className="font-semibold text-nyuzi-ink">
                  &ldquo;{searchQuery}&rdquo;
                </span>
              </>
            )}
            {" · "}
            <span aria-live="polite" aria-atomic="true">
              {filtered.length} piece{filtered.length === 1 ? "" : "s"}
            </span>
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-nyuzi-muted underline-offset-2 hover:text-nyuzi-ink hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 border border-dashed border-nyuzi-ink/20 px-6 py-24 text-center">
            <p className="font-[family-name:var(--font-fraunces)] text-2xl leading-snug text-nyuzi-ink sm:text-3xl">
              {searchQuery
                ? `No pieces match “${searchQuery}”.`
                : activeColor
                  ? "No pieces found in this shade. Try another ancestral hue."
                  : "No pieces match these filters yet."}
            </p>
            <p className="mt-3 text-sm text-nyuzi-muted">
              {searchQuery
                ? "Try a fabric name, artisan, or a shorter search term."
                : "Adjust your protocol, pillar, or palette selection to explore more of the collection."}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex border border-nyuzi-ink/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-nyuzi-ink transition hover:border-nyuzi-ink/40"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <ul key={listKey} className="mt-10 divide-y divide-nyuzi-ink/10">
            {filtered.map((product, index) => {
              const reversed = index % 2 === 1;

              return (
                <li key={product.id}>
                  <Link
                    href={productHrefFromProduct(product)}
                    className={`group grid gap-6 py-12 lg:grid-cols-12 lg:items-end lg:gap-10 lg:py-16 ${
                      reversed ? "lg:[direction:rtl]" : ""
                    }`}
                  >
                    <div
                      className={`relative aspect-[3/4] overflow-hidden bg-nyuzi-sand lg:col-span-5 ${
                        reversed ? "lg:[direction:ltr]" : ""
                      }`}
                    >
                      <FabricTooltip
                        image={product.image_url}
                        title={product.fabric_name}
                        description={product.fabric_history}
                        alt={product.name}
                        imageClassName="object-cover transition duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>

                    <div
                      className={`flex flex-col justify-end lg:col-span-7 lg:pb-4 ${
                        reversed ? "lg:[direction:ltr]" : ""
                      }`}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-nyuzi-muted">
                        {product.fabric_name} · {product.category}
                        {product.palette_color
                          ? ` · ${PALETTE_COLOR_LABELS[product.palette_color]}`
                          : ""}
                      </p>
                      <h3 className="font-[family-name:var(--font-fraunces)] mt-3 text-3xl font-semibold leading-tight text-nyuzi-ink transition group-hover:opacity-70 sm:text-4xl lg:text-5xl">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-nyuzi-muted">
                          {product.description}
                        </p>
                      )}
                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                        <span className="font-semibold text-nyuzi-ink">
                          {formatPrice(product.price_cents)}
                        </span>
                        <span className="text-nyuzi-muted">
                          by {product.artisan.display_name}
                        </span>
                      </div>
                      <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-nyuzi-ink">
                        View piece
                        <span aria-hidden className="transition group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
