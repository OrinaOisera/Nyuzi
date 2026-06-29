"use client";

import { PALETTE_COLORS, type PaletteColorId } from "@/types/palette";

interface ColorPaletteFilterProps {
  value: PaletteColorId | null;
  onChange: (color: PaletteColorId | null) => void;
}

export function ColorPaletteFilter({ value, onChange }: ColorPaletteFilterProps) {
  function handleSelect(id: PaletteColorId) {
    onChange(value === id ? null : id);
  }

  return (
    <div className="border-t border-nyuzi-ink/10 pt-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-nyuzi-muted">
        Filter by palette
      </p>
      <div
        role="group"
        aria-label="Filter by cultural palette color"
        className="mt-4 flex flex-wrap items-center gap-4 sm:gap-5"
      >
        {PALETTE_COLORS.map((color) => {
          const isActive = value === color.id;
          const isLight = color.id === "cowrie_cream";

          return (
            <div key={color.id} className="group relative">
              <button
                type="button"
                aria-pressed={isActive}
                aria-label={color.name}
                onClick={() => handleSelect(color.id)}
                className={`relative flex h-9 w-9 items-center justify-center rounded-full transition duration-300 sm:h-10 sm:w-10 ${
                  isActive
                    ? "ring-2 ring-nyuzi-ink ring-offset-2 ring-offset-nyuzi-cream"
                    : "ring-1 ring-nyuzi-ink/20 hover:ring-nyuzi-ink/40"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {isActive && (
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isLight ? "bg-nyuzi-ink/70" : "bg-white/90"
                    }`}
                  />
                )}
              </button>

              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-sm bg-nyuzi-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-nyuzi-cream opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {color.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
