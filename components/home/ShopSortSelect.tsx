"use client";

import {
  SHOP_SORT_LABELS,
  type ShopSortOption,
} from "@/components/home/shop-filters";

interface ShopSortSelectProps {
  value: ShopSortOption;
  onChange: (sort: ShopSortOption) => void;
}

export function ShopSortSelect({ value, onChange }: ShopSortSelectProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <label
        htmlFor="shop-sort"
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-nyuzi-muted"
      >
        Sort by
      </label>
      <select
        id="shop-sort"
        value={value}
        onChange={(e) => onChange(e.target.value as ShopSortOption)}
        className="min-w-[12rem] border border-nyuzi-ink/15 bg-nyuzi-cream px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-nyuzi-ink transition hover:border-nyuzi-ink/30 focus:border-nyuzi-ink focus:outline-none focus:ring-1 focus:ring-nyuzi-ink/20"
      >
        {(Object.keys(SHOP_SORT_LABELS) as ShopSortOption[]).map((option) => (
          <option key={option} value={option}>
            {SHOP_SORT_LABELS[option]}
          </option>
        ))}
      </select>
    </div>
  );
}
