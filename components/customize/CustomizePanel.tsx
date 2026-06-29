"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccessoryCustomizer } from "@/components/customize/AccessoryCustomizer";
import { BagCustomizer } from "@/components/customize/BagCustomizer";
import { CustomizePreview } from "@/components/customize/CustomizePreview";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { createCheckoutSession } from "@/lib/actions/checkout";
import { formatCustomizationSummary } from "@/lib/format-customization";
import { formatPrice } from "@/lib/format";
import type { CustomizationSnapshot } from "@/types/customization";
import {
  CATEGORY_LABELS,
  DEFAULT_ACCESSORY,
  DEFAULT_BAG,
} from "@/types/customization";
import type { ProductWithArtisan } from "@/types/database";
import { OCCASION_LABELS } from "@/types/database";

interface CustomizePanelProps {
  product: ProductWithArtisan;
}

export function CustomizePanel({ product }: CustomizePanelProps) {
  const router = useRouter();
  const [bagOptions, setBagOptions] = useState(DEFAULT_BAG);
  const [accessoryOptions, setAccessoryOptions] = useState(DEFAULT_ACCESSORY);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const customization: CustomizationSnapshot =
    product.category === "bag"
      ? bagOptions
      : { ...accessoryOptions, type: "accessory" as const };

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    const result = await createCheckoutSession({
      productId: product.id,
      customization,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Checkout failed.");
      return;
    }

    if ("url" in result && result.url) {
      window.location.href = result.url;
      return;
    }

    if ("demo" in result && result.demo) {
      router.push(`/checkout/success?demo=1&productId=${product.id}`);
      return;
    }

    setError("Checkout could not be completed. Please try again.");
  }

  const artisanHref = product.artisan.slug
    ? `/artisan/${product.artisan.slug}`
    : `/artisan/${product.artisan.id}`;

  const categoryLabel = CATEGORY_LABELS[product.category];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div className="space-y-5 lg:sticky lg:top-24">
        <CustomizePreview
          productName={product.name}
          imageUrl={product.image_url}
          bag={product.category === "bag" ? bagOptions : undefined}
          accessory={product.category === "accessory" ? accessoryOptions : undefined}
        />

        {product.fabric_history && (
          <div className="rounded-[1.25rem] bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 ring-1 ring-amber-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-nyuzi-amber">
              About {product.fabric_name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-nyuzi-ink/80">
              {product.fabric_history}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-[1.35rem] bg-white shadow-sm ring-1 ring-stone-200/70">
          <div className="h-1 bg-gradient-to-r from-nyuzi-amber via-nyuzi-gold to-nyuzi-emerald" />
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-nyuzi-amber">
              {categoryLabel} · {OCCASION_LABELS[product.occasion]}
            </p>
            <h1 className="font-display mt-2 text-3xl font-semibold leading-tight text-nyuzi-ink">
              {product.name}
            </h1>
            {product.description && (
              <p className="mt-3 leading-relaxed text-nyuzi-muted">{product.description}</p>
            )}
            <p className="mt-5 inline-flex rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-1.5 text-xl font-semibold text-nyuzi-emerald ring-1 ring-emerald-100">
              {formatPrice(product.price_cents)}
            </p>
            <p className="mt-4 text-sm text-nyuzi-muted">
              Handcrafted by{" "}
              <Link href={artisanHref} className="font-semibold text-nyuzi-amber hover:underline">
                {product.artisan.display_name}
              </Link>
            </p>
          </div>
        </div>

        <div className="rounded-[1.35rem] bg-white p-6 shadow-sm ring-1 ring-stone-200/70">
          <h2 className="font-display text-xl font-semibold text-nyuzi-ink">
            Customize your {product.category === "bag" ? "bag" : "piece"}
          </h2>
          <p className="mt-1 text-sm text-nyuzi-muted">
            {product.category === "bag"
              ? "Select size and Ankara print — your artisan cuts and lines each bag to order."
              : "Choose bracelet or chain, size, and beads or brass with your preferred details."}
          </p>
          <div className="mt-6">
            {product.category === "bag" ? (
              <BagCustomizer value={bagOptions} onChange={setBagOptions} />
            ) : (
              <AccessoryCustomizer value={accessoryOptions} onChange={setAccessoryOptions} />
            )}
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="flex-1"
            disabled={loading}
            onClick={() => setCheckoutOpen(true)}
          >
            Order customized {product.category === "bag" ? "bag" : "piece"}
          </Button>
          <Link
            href={artisanHref}
            className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-nyuzi-amber/80 bg-white/50 px-7 py-3.5 text-base font-semibold text-nyuzi-amber transition hover:border-nyuzi-amber hover:bg-amber-50"
          >
            Meet the artisan
          </Link>
        </div>
      </div>

      <Modal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        title="Confirm your order"
      >
        <div className="space-y-4">
          <p className="leading-relaxed text-nyuzi-muted">
            You&apos;re ordering <strong className="text-nyuzi-ink">{product.name}</strong> with
            your custom selections. Your artisan will craft this piece to your specifications.
          </p>
          <p className="rounded-xl bg-nyuzi-cream px-4 py-3 text-sm text-nyuzi-ink ring-1 ring-stone-200/70">
            {formatCustomizationSummary(customization)}
          </p>
          <p className="text-lg font-semibold text-nyuzi-emerald">
            Total: {formatPrice(product.price_cents)}
          </p>
          <div className="flex gap-3 pt-1">
            <Button variant="ghost" className="flex-1" onClick={() => setCheckoutOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" disabled={loading} onClick={handleCheckout}>
              {loading ? "Processing…" : "Proceed to checkout"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
