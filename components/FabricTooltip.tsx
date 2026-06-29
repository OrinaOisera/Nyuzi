"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE_IMAGES } from "@/lib/assets";

export const FABRIC_HERITAGE_FALLBACK =
  "Authentic hand-woven textile sourced directly from local master artisans.";

interface FabricTooltipProps {
  image?: string;
  title: string;
  description?: string | null;
  alt?: string;
  imageClassName?: string;
  sizes?: string;
}

export function FabricTooltip({
  image,
  title,
  description,
  alt,
  imageClassName = "object-cover",
  sizes = "(max-width: 1024px) 100vw, 40vw",
}: FabricTooltipProps) {
  const [open, setOpen] = useState(false);
  const heritageText = description?.trim() || FABRIC_HERITAGE_FALLBACK;

  function handleToggle(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setOpen((current) => !current);
  }

  function handleClose(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setOpen(false);
  }

  return (
    <div className="relative h-full w-full">
      <Image
        src={image || SITE_IMAGES.fabric.defaultTextile}
        alt={alt ?? title}
        fill
        className={imageClassName}
        sizes={sizes}
      />

      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close fabric heritage" : "Reveal fabric heritage"}
        onClick={handleToggle}
        className={`absolute bottom-3 right-3 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-nyuzi-ink/75 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-nyuzi-cream shadow-lg backdrop-blur-md transition duration-300 hover:bg-nyuzi-ink sm:bottom-4 sm:right-4 sm:px-3.5 sm:py-2.5 ${
          open ? "ring-2 ring-nyuzi-cream/80" : "animate-[fabric-pin-pulse_2.4s_ease-in-out_infinite]"
        }`}
      >
        <span
          aria-hidden
          className="flex h-4 w-4 items-center justify-center rounded-full border border-nyuzi-cream/40 text-xs leading-none"
        >
          {open ? "×" : "+"}
        </span>
        <span className="hidden sm:inline">{open ? "Close" : "Reveal Heritage"}</span>
      </button>

      <div
        aria-hidden={!open}
        className={`absolute inset-0 z-30 flex items-end justify-center p-3 transition duration-500 ease-out sm:items-center sm:p-5 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-nyuzi-ink/25 backdrop-blur-[1px]"
          onClick={handleClose}
        />

        <div
          role="dialog"
          aria-label={`${title} heritage`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          className={`relative z-10 max-h-[78%] w-full max-w-sm overflow-y-auto border border-nyuzi-ink/10 bg-nyuzi-cream/95 p-4 shadow-2xl shadow-nyuzi-ink/15 backdrop-blur-md transition duration-500 ease-out sm:max-h-[70%] sm:p-5 ${
            open ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.98]"
          }`}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-nyuzi-muted">
            Fabric Heritage
          </p>
          <h4 className="font-[family-name:var(--font-fraunces)] mt-2 text-xl font-semibold leading-snug text-nyuzi-ink sm:text-2xl">
            {title}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-nyuzi-muted">{heritageText}</p>
        </div>
      </div>
    </div>
  );
}
