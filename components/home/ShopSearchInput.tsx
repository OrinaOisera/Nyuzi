"use client";

import { useEffect, useState } from "react";

interface ShopSearchInputProps {
  value: string;
  onChange: (query: string) => void;
}

export function ShopSearchInput({ value, onChange }: ShopSearchInputProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (draft !== value) {
        onChange(draft);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [draft, value, onChange]);

  function handleClear() {
    setDraft("");
    onChange("");
  }

  return (
    <div className="w-full max-w-xl">
      <label htmlFor="shop-search" className="sr-only">
        Search the collection
      </label>
      <div className="relative">
        <span
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-nyuzi-muted"
          aria-hidden
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </span>
        <input
          id="shop-search"
          type="search"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Search pieces, fabrics, artisans…"
          className="w-full border border-nyuzi-ink/15 bg-white/60 py-3 pl-11 pr-11 font-mono text-xs uppercase tracking-[0.1em] text-nyuzi-ink placeholder:normal-case placeholder:tracking-normal placeholder:text-nyuzi-muted/80 transition hover:border-nyuzi-ink/30 focus:border-nyuzi-ink focus:bg-white focus:outline-none focus:ring-1 focus:ring-nyuzi-ink/20"
        />
        {draft && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-nyuzi-muted transition hover:bg-nyuzi-ink/5 hover:text-nyuzi-ink"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-nyuzi-muted">
        Match by name, fabric, artisan, or description
      </p>
    </div>
  );
}
