"use client";

import Image from "next/image";
import {
  ANKARA_PRINTS,
  type AccessoryCustomization,
  type BagCustomization,
} from "@/types/customization";
import { formatCustomizationSummary } from "@/lib/format-customization";

interface CustomizePreviewProps {
  productName: string;
  imageUrl: string;
  bag?: BagCustomization;
  accessory?: AccessoryCustomization;
}

const BEAD_DOTS: Record<string, string> = {
  coral: "#e07a5f",
  gold: "#d4a017",
  emerald: "#2d6a4f",
  ivory: "#f4f1de",
  onyx: "#1a1a1a",
};

export function CustomizePreview({
  productName,
  imageUrl,
  bag,
  accessory,
}: CustomizePreviewProps) {
  const printClass = bag
    ? ANKARA_PRINTS.find((p) => p.id === bag.ankaraPrint)?.swatchClass
    : null;

  const snapshot = bag ?? accessory;
  const summary = snapshot ? formatCustomizationSummary(snapshot) : "";

  return (
    <div className="overflow-hidden rounded-[1.35rem] bg-white shadow-sm ring-1 ring-stone-200/70">
      <div className="relative aspect-square bg-nyuzi-sand">
        <Image
          src={imageUrl}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {bag && printClass && (
          <div
            className={`absolute inset-x-0 bottom-0 h-1/3 opacity-90 mix-blend-multiply ${printClass}`}
          />
        )}

        {accessory && accessory.material === "beads" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="flex flex-wrap justify-center gap-1.5 rounded-full bg-white/90 px-6 py-4 shadow-lg backdrop-blur-sm">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-full ring-1 ring-black/10"
                  style={{
                    backgroundColor:
                      BEAD_DOTS[accessory.beadColor ?? "gold"] ?? BEAD_DOTS.gold,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {accessory && accessory.material === "brass" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-amber-200 via-yellow-600 to-amber-900 shadow-2xl ring-4 ring-amber-100/50" />
          </div>
        )}
      </div>

      {summary && (
        <div className="border-t border-stone-100 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-nyuzi-amber">
            Your choices
          </p>
          <p className="mt-1 text-sm text-nyuzi-ink">{summary}</p>
        </div>
      )}
    </div>
  );
}
