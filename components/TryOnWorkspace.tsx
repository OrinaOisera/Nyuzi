"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createCheckoutSession } from "@/lib/actions/checkout";
import { saveMeasurements } from "@/lib/actions/measurements";
import { formatPrice } from "@/lib/format";
import type { BodyBuild } from "@/types/customization";
import type { MeasurementInput, ProductWithArtisan } from "@/types/database";
import { OCCASION_LABELS } from "@/types/database";

type Unit = "cm" | "in";

const BODY_BUILDS: { id: BodyBuild; label: string; hint: string }[] = [
  { id: "slender", label: "Slender", hint: "Linear frame, minimal taper" },
  { id: "athletic", label: "Athletic", hint: "Broader shoulders, defined core" },
  { id: "curvy", label: "Curvy", hint: "Full bust and hip balance" },
];

const BUILD_PRESETS: Record<
  BodyBuild,
  { bust_cm: number; waist_cm: number; hips_cm: number; height_cm: number }
> = {
  slender: { bust_cm: 86, waist_cm: 68, hips_cm: 90, height_cm: 168 },
  athletic: { bust_cm: 94, waist_cm: 76, hips_cm: 98, height_cm: 172 },
  curvy: { bust_cm: 98, waist_cm: 72, hips_cm: 104, height_cm: 165 },
};

const UNDERTONE_HEX = ["#FDEBD0", "#E8C4A0", "#C68642", "#8D5524", "#3D2314"] as const;

const DEFAULT_METRICS_CM = {
  shoulder: 42,
  chest: 90,
  sleeve: 60,
};

function cmToIn(cm: number): number {
  return Math.round((cm / 2.54) * 10) / 10;
}

function inToCm(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10;
}

function displayValue(cm: number, unit: Unit): number {
  return unit === "cm" ? cm : cmToIn(cm);
}

function formatMetric(cm: number, unit: Unit): string {
  const value = displayValue(cm, unit);
  return unit === "cm" ? `${value} cm` : `${value} in`;
}

interface TryOnWorkspaceProps {
  product: ProductWithArtisan;
}

export function TryOnWorkspace({ product }: TryOnWorkspaceProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [heritageOpen, setHeritageOpen] = useState(false);
  const [bodyBuild, setBodyBuild] = useState<BodyBuild>("athletic");
  const [undertone, setUndertone] = useState(3);
  const [unit, setUnit] = useState<Unit>("cm");
  const [shoulderCm, setShoulderCm] = useState(DEFAULT_METRICS_CM.shoulder);
  const [chestCm, setChestCm] = useState(DEFAULT_METRICS_CM.chest);
  const [sleeveCm, setSleeveCm] = useState(DEFAULT_METRICS_CM.sleeve);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const undertoneColor = UNDERTONE_HEX[undertone - 1];

  const measurements: MeasurementInput = useMemo(() => {
    const preset = BUILD_PRESETS[bodyBuild];
    return {
      bust_cm: chestCm,
      waist_cm: preset.waist_cm,
      hips_cm: preset.hips_cm,
      height_cm: preset.height_cm,
    };
  }, [bodyBuild, chestCm]);

  function applyBodyBuild(build: BodyBuild) {
    setBodyBuild(build);
    const preset = BUILD_PRESETS[build];
    setChestCm(preset.bust_cm);
  }

  function handleSliderChange(setter: (v: number) => void, displayVal: number) {
    setter(unit === "cm" ? displayVal : inToCm(displayVal));
  }

  async function handleCheckout() {
    if (currentStep < 4) {
      setError("Complete all vault steps before ordering.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const saved = await saveMeasurements(measurements);
      if (!saved.success) {
        setError(saved.error ?? "Could not save your measurements. Please try again.");
        return;
      }

      const result = await createCheckoutSession({
        productId: product.id,
        customization: {
          type: "garment",
          measurements,
          bodyBuild,
          undertone,
          shoulder_cm: shoulderCm,
          sleeve_cm: sleeveCm,
          unit,
        },
      });

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
    } catch {
      setError("Checkout could not be completed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function advanceStep() {
    setCurrentStep((s) => Math.min(4, s + 1));
  }

  const artisanHref = product.artisan.slug
    ? `/artisan/${product.artisan.slug}`
    : `/artisan/${product.artisan.id}`;

  const heritageDescription =
    product.fabric_history ??
    `${product.fabric_name} carries regional artisanal meaning — woven and finished by ${product.artisan.display_name}.`;

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12">
      {/* LEFT — Visual canvas */}
      <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
        <div className="relative aspect-[3/4] overflow-hidden border border-nyuzi-ink/10 bg-nyuzi-sand">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />

          <button
            type="button"
            onClick={() => setHeritageOpen((open) => !open)}
            aria-expanded={heritageOpen}
            className="absolute left-4 top-4 z-20 flex items-center gap-2 border border-nyuzi-cream/40 bg-nyuzi-ink/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-nyuzi-cream backdrop-blur-sm transition hover:bg-nyuzi-ink/90"
          >
            <span
              className={`inline-flex h-4 w-4 items-center justify-center rounded-full border border-nyuzi-cream/60 text-xs leading-none ${
                heritageOpen ? "bg-nyuzi-cream text-nyuzi-ink" : ""
              }`}
            >
              +
            </span>
            Reveal Heritage
          </button>

          <div
            className={`absolute inset-0 z-10 flex items-end p-5 transition-opacity duration-500 ${
              heritageOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="max-w-md border border-nyuzi-ink/10 bg-nyuzi-cream/95 p-5 text-nyuzi-ink backdrop-blur-sm sm:p-6">
              <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold leading-tight sm:text-3xl">
                {product.fabric_name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-nyuzi-muted">
                {heritageDescription}
              </p>
            </div>
          </div>
        </div>

        <div
          className="border border-nyuzi-ink/10 p-5 transition-colors duration-500"
          style={{ backgroundColor: undertoneColor }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-nyuzi-ink/70">
            Melanin canvas preview
          </p>
          <div className="mt-4 flex items-end justify-center">
            <svg
              viewBox="0 0 120 220"
              className="h-44 w-auto drop-shadow-sm"
              aria-hidden
            >
              <ellipse cx="60" cy="28" rx="22" ry="26" fill="rgba(26,22,20,0.12)" />
              <path
                d="M36 54 Q60 48 84 54 L92 110 Q60 118 28 110 Z"
                fill="rgba(26,22,20,0.08)"
              />
              <path
                d="M28 110 L22 200 Q60 208 98 200 L92 110 Z"
                fill="rgba(26,22,20,0.06)"
              />
              <line
                x1="28"
                y1="110"
                x2="12"
                y2="165"
                stroke="rgba(26,22,20,0.15)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="92"
                y1="110"
                x2="108"
                y2="165"
                stroke="rgba(26,22,20,0.15)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-nyuzi-ink/60">
            Undertone {undertone} · {undertoneColor}
          </p>
        </div>
      </aside>

      {/* RIGHT — Measurement vault wizard */}
      <div className="flex min-h-[32rem] flex-col border border-nyuzi-ink/10 bg-white/40 lg:min-h-[calc(100vh-8rem)]">
        <div className="border-b border-nyuzi-ink/10 px-5 py-5 sm:px-8 sm:py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-nyuzi-muted">
            Custom fit workspace
          </p>
          <h1 className="font-[family-name:var(--font-fraunces)] mt-2 text-2xl font-semibold text-nyuzi-ink sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-nyuzi-muted">
            {OCCASION_LABELS[product.occasion]} · {formatPrice(product.price_cents)} ·{" "}
            <Link href={artisanHref} className="font-medium text-nyuzi-ink underline-offset-2 hover:underline">
              {product.artisan.display_name}
            </Link>
          </p>

          <ol className="mt-6 flex gap-3 sm:gap-4" aria-label="Wizard progress">
            {[1, 2, 3, 4].map((step) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={`font-[family-name:var(--font-fraunces)] flex h-8 w-8 items-center justify-center text-sm font-semibold transition ${
                    currentStep >= step
                      ? "bg-nyuzi-ink text-nyuzi-cream"
                      : "border border-nyuzi-ink/20 text-nyuzi-muted"
                  }`}
                >
                  {step}
                </span>
                {step < 4 && (
                  <span
                    className={`hidden h-px w-6 sm:block ${
                      currentStep > step ? "bg-nyuzi-ink" : "bg-nyuzi-ink/15"
                    }`}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          {currentStep === 1 && (
            <section>
              <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-nyuzi-ink sm:text-2xl">
                Base geometry
              </h2>
              <p className="mt-2 text-sm text-nyuzi-muted">
                Select the build closest to your natural frame.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {BODY_BUILDS.map((build) => {
                  const active = bodyBuild === build.id;
                  return (
                    <button
                      key={build.id}
                      type="button"
                      onClick={() => applyBodyBuild(build.id)}
                      className={`border px-4 py-5 text-left transition ${
                        active
                          ? "border-nyuzi-ink bg-nyuzi-ink text-nyuzi-cream"
                          : "border-nyuzi-ink/15 bg-nyuzi-cream text-nyuzi-ink hover:border-nyuzi-ink/30"
                      }`}
                    >
                      <span className="font-[family-name:var(--font-fraunces)] text-lg font-semibold">
                        {build.label}
                      </span>
                      <span
                        className={`mt-1 block text-xs ${
                          active ? "text-nyuzi-cream/80" : "text-nyuzi-muted"
                        }`}
                      >
                        {build.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {currentStep === 2 && (
            <section>
              <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-nyuzi-ink sm:text-2xl">
                Melanin canvas
              </h2>
              <p className="mt-2 text-sm text-nyuzi-muted">
                Calibrate undertone — updates the silhouette preview in real time.
              </p>
              <div className="mt-8">
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em] text-nyuzi-muted">
                  <span>1</span>
                  <span className="text-nyuzi-ink">Tone {undertone}</span>
                  <span>5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={undertone}
                  onChange={(e) => setUndertone(Number(e.target.value))}
                  className="mt-4 h-1 w-full cursor-pointer appearance-none bg-nyuzi-ink/15 accent-nyuzi-ink"
                />
                <div className="mt-4 flex gap-2">
                  {UNDERTONE_HEX.map((hex, index) => (
                    <span
                      key={hex}
                      className={`h-8 flex-1 border border-nyuzi-ink/10 transition ${
                        undertone === index + 1 ? "ring-2 ring-nyuzi-ink ring-offset-2 ring-offset-nyuzi-cream" : ""
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {currentStep === 3 && (
            <section>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-nyuzi-ink sm:text-2xl">
                    Bespoke metrics
                  </h2>
                  <p className="mt-2 text-sm text-nyuzi-muted">
                    Fine-tune shoulder, chest, and sleeve for your artisan pattern.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setUnit((u) => (u === "cm" ? "in" : "cm"))}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-nyuzi-ink underline-offset-4 hover:underline"
                >
                  Switch to {unit === "cm" ? "in" : "cm"}
                </button>
              </div>

              <div className="mt-8 space-y-8">
                {(
                  [
                    {
                      label: "Shoulder width",
                      cm: shoulderCm,
                      setCm: setShoulderCm,
                      min: unit === "cm" ? 34 : cmToIn(34),
                      max: unit === "cm" ? 52 : cmToIn(52),
                      step: unit === "cm" ? 0.5 : 0.25,
                    },
                    {
                      label: "Chest circumference",
                      cm: chestCm,
                      setCm: setChestCm,
                      min: unit === "cm" ? 76 : cmToIn(76),
                      max: unit === "cm" ? 120 : cmToIn(120),
                      step: unit === "cm" ? 0.5 : 0.25,
                    },
                    {
                      label: "Sleeve length",
                      cm: sleeveCm,
                      setCm: setSleeveCm,
                      min: unit === "cm" ? 52 : cmToIn(52),
                      max: unit === "cm" ? 68 : cmToIn(68),
                      step: unit === "cm" ? 0.5 : 0.25,
                    },
                  ] as const
                ).map((metric) => (
                  <div key={metric.label}>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-nyuzi-ink">
                        {metric.label}
                      </label>
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-nyuzi-muted">
                        {formatMetric(metric.cm, unit)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={metric.min}
                      max={metric.max}
                      step={metric.step}
                      value={displayValue(metric.cm, unit)}
                      onChange={(e) =>
                        handleSliderChange(metric.setCm, Number(e.target.value))
                      }
                      className="mt-3 h-1 w-full cursor-pointer appearance-none bg-nyuzi-ink/15 accent-nyuzi-ink"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {currentStep === 4 && (
            <section className="flex min-h-[16rem] flex-col items-center justify-center text-center">
              <p className="font-[family-name:var(--font-fraunces)] text-4xl font-semibold text-nyuzi-ink sm:text-5xl">
                ✓
              </p>
              <h2 className="font-[family-name:var(--font-fraunces)] mt-4 text-2xl font-semibold text-nyuzi-ink sm:text-3xl">
                Silhouette Profile Secured in Vault
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-nyuzi-muted">
                {bodyBuild.charAt(0).toUpperCase() + bodyBuild.slice(1)} build · undertone{" "}
                {undertone} · chest {formatMetric(chestCm, unit)}
              </p>
            </section>
          )}
        </div>

        <div className="border-t border-nyuzi-ink/10 px-5 py-5 sm:px-8 sm:py-6">
          {error && (
            <p className="mb-4 text-sm text-red-700">{error}</p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                disabled={loading}
                className="border border-nyuzi-ink/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-nyuzi-ink transition hover:border-nyuzi-ink/40 disabled:opacity-50 sm:flex-1"
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={advanceStep}
                className="bg-nyuzi-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-nyuzi-cream transition hover:opacity-90 sm:flex-1"
              >
                {currentStep === 3 ? "Secure to vault" : "Continue"}
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleCheckout}
                className="w-full rounded-md bg-nyuzi-ink px-8 py-4 text-xs uppercase tracking-widest text-nyuzi-cream transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Processing…" : "Order Custom Fit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
