"use client";

import Image from "next/image";
import type { MeasurementInput } from "@/types/database";

const DEFAULT_MEASUREMENTS: MeasurementInput = {
  bust_cm: 90,
  waist_cm: 70,
  hips_cm: 95,
  height_cm: 165,
};

interface TryOnViewerProps {
  productName: string;
  productImageUrl: string;
  overlayUrl: string;
  photoUrl: string | null;
  measurements: MeasurementInput;
  mode: "model" | "photo";
}

export function TryOnViewer({
  productName,
  productImageUrl,
  overlayUrl,
  photoUrl,
  measurements,
  mode,
}: TryOnViewerProps) {
  const scaleX = measurements.bust_cm / DEFAULT_MEASUREMENTS.bust_cm;
  const scaleY = measurements.height_cm / DEFAULT_MEASUREMENTS.height_cm;
  const showUserPhoto = mode === "photo" && photoUrl;

  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-nyuzi-sand ring-1 ring-stone-200/80">
      <div className="border-b border-stone-200/80 bg-white/60 px-4 py-3">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-nyuzi-muted">
          Fitting room preview
        </p>
      </div>

      <div className="relative mx-auto aspect-[3/4] max-w-md bg-gradient-to-b from-stone-100 to-nyuzi-sand">
        {showUserPhoto ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt="Your photo"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-nyuzi-ink/5" />
          </>
        ) : (
          <Image
            src={productImageUrl}
            alt={productName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}

        <div className="absolute inset-0 flex items-end justify-center pb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={overlayUrl}
            alt={`${productName} overlay`}
            className="h-[72%] w-auto object-contain drop-shadow-2xl transition-transform duration-500 ease-out"
            style={{
              transform: `scale(${scaleX}, ${scaleY})`,
              transformOrigin: "center bottom",
              mixBlendMode: showUserPhoto ? "multiply" : "normal",
              opacity: showUserPhoto ? 0.92 : 0.88,
            }}
          />
        </div>

        {!showUserPhoto && mode === "photo" && (
          <div className="absolute inset-0 flex items-center justify-center bg-nyuzi-ink/30 p-8 text-center backdrop-blur-[2px]">
            <div className="rounded-2xl bg-white/90 px-5 py-4 shadow-lg">
              <p className="text-sm font-medium text-nyuzi-ink">
                Upload a full-body photo to preview the garment on you
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-stone-200/80 bg-white/70 px-4 py-3 text-center text-xs text-nyuzi-muted">
        <span>{showUserPhoto ? "Your photo" : mode === "model" ? "Model preview" : "Awaiting photo"}</span>
        <span aria-hidden>·</span>
        <span>Bust {measurements.bust_cm} cm</span>
        <span aria-hidden>·</span>
        <span>Height {measurements.height_cm} cm</span>
      </div>
    </div>
  );
}
