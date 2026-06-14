"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MeasurementForm } from "@/components/MeasurementForm";
import { PhotoUpload } from "@/components/PhotoUpload";
import { TryOnViewer } from "@/components/TryOnViewer";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { createCheckoutSession } from "@/lib/actions/checkout";
import { saveMeasurements } from "@/lib/actions/measurements";
import { formatPrice } from "@/lib/format";
import type { MeasurementInput, ProductWithArtisan } from "@/types/database";
import { OCCASION_LABELS } from "@/types/database";

const DEFAULT_MEASUREMENTS: MeasurementInput = {
  bust_cm: 90,
  waist_cm: 70,
  hips_cm: 95,
  height_cm: 165,
};

interface TryOnPanelProps {
  product: ProductWithArtisan;
}

function ViewModeToggle({
  mode,
  onChange,
}: {
  mode: "model" | "photo";
  onChange: (mode: "model" | "photo") => void;
}) {
  const options: { value: "model" | "photo"; label: string }[] = [
    { value: "model", label: "Model" },
    { value: "photo", label: "Your photo" },
  ];

  return (
    <div className="inline-flex rounded-full bg-nyuzi-sand p-1 ring-1 ring-stone-200/80">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            mode === option.value
              ? "bg-white text-nyuzi-ink shadow-sm"
              : "text-nyuzi-muted hover:text-nyuzi-ink"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function TryOnPanel({ product }: TryOnPanelProps) {
  const router = useRouter();
  const [measurements, setMeasurements] = useState<MeasurementInput>(DEFAULT_MEASUREMENTS);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"model" | "photo">("model");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSaveMeasurements() {
    const result = await saveMeasurements(measurements);
    if (!result.success) {
      setError(result.error ?? "Could not save measurements.");
      return;
    }
    setError(null);
  }

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    await saveMeasurements(measurements);
    const result = await createCheckoutSession({
      productId: product.id,
      measurements,
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
  }

  const artisanHref = product.artisan.slug
    ? `/artisan/${product.artisan.slug}`
    : `/artisan/${product.artisan.id}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div className="space-y-5 lg:sticky lg:top-24">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ViewModeToggle mode={viewMode} onChange={setViewMode} />
        </div>

        {viewMode === "photo" && (
          <PhotoUpload
            photoUrl={photoUrl}
            onPhotoChange={(url) => {
              setPhotoUrl(url);
              if (url) setViewMode("photo");
            }}
          />
        )}

        <TryOnViewer
          productName={product.name}
          productImageUrl={product.image_url}
          overlayUrl={product.overlay_png_url}
          photoUrl={photoUrl}
          measurements={measurements}
          mode={viewMode}
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
              {OCCASION_LABELS[product.occasion]}
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
              Custom-fit by{" "}
              <Link href={artisanHref} className="font-semibold text-nyuzi-amber hover:underline">
                {product.artisan.display_name}
              </Link>
            </p>
          </div>
        </div>

        <div className="rounded-[1.35rem] bg-white p-6 shadow-sm ring-1 ring-stone-200/70">
          <h2 className="font-display text-xl font-semibold text-nyuzi-ink">Your measurements</h2>
          <p className="mt-1 text-sm text-nyuzi-muted">
            Adjust values to see the overlay update in real time.
          </p>
          <div className="mt-5">
            <MeasurementForm
              initial={DEFAULT_MEASUREMENTS}
              onChange={setMeasurements}
              onSave={handleSaveMeasurements}
            />
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
            Order custom fit
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
            You&apos;re ordering <strong className="text-nyuzi-ink">{product.name}</strong> in a
            custom fit. Your artisan will tailor this piece to your exact measurements.
          </p>
          <ul className="space-y-2 rounded-xl bg-nyuzi-cream p-4 text-sm text-nyuzi-ink ring-1 ring-stone-200/70">
            <li>Bust: {measurements.bust_cm} cm</li>
            <li>Waist: {measurements.waist_cm} cm</li>
            <li>Hips: {measurements.hips_cm} cm</li>
            <li>Height: {measurements.height_cm} cm</li>
          </ul>
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
