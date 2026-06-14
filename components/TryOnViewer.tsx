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
    <div className="fitting-room-frame overflow-hidden rounded-[1.75rem] bg-nyuzi-sand ring-1 ring-stone-200/60">
      <div className="flex items-center justify-between border-b border-stone-200/60 bg-gradient-to-r from-white/90 to-nyuzi-cream/90 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400/80" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-nyuzi-gold/80" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" aria-hidden />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-nyuzi-muted">
          Fitting room
        </p>
        <div className="w-12" aria-hidden />
      </div>

      <div className="relative mx-auto aspect-[3/4] max-w-md bg-gradient-to-b from-stone-100 via-nyuzi-cream to-nyuzi-sand">
        <div className="pointer-events-none absolute inset-4 rounded-2xl border border-white/40" aria-hidden />

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

        <div className="absolute inset-0 flex items-end justify-center pb-8">
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
          <div className="absolute inset-0 flex items-center justify-center bg-nyuzi-ink/25 p-8 backdrop-blur-[3px]">
            <div className="max-w-xs rounded-2xl bg-white/95 px-6 py-5 text-center shadow-xl ring-1 ring-white">
              <p className="text-2xl" aria-hidden>
                📷
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-nyuzi-ink">
                Upload a full-body photo to preview the garment on you
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-stone-200/60 bg-white/80 px-4 py-3.5 text-center text-xs text-nyuzi-muted">
        <span className="font-semibold text-nyuzi-ink/70">
          {showUserPhoto ? "Your photo" : mode === "model" ? "Model preview" : "Awaiting photo"}
        </span>
        <span className="text-stone-300" aria-hidden>
          |
        </span>
        <span>Bust {measurements.bust_cm} cm</span>
        <span className="text-stone-300" aria-hidden>
          ·
        </span>
        <span>H {measurements.height_cm} cm</span>
      </div>
    </div>
  );
}
