"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  CULTURAL_PROTOCOLS,
  DEFAULT_PROTOCOL,
  SHOP_SORT_LABELS,
  type ActiveColorFilter,
  type ProtocolFilter,
  type ShopCategoryFilter,
  type ShopSortOption,
} from "@/components/home/shop-filters";
import { PALETTE_COLORS } from "@/types/palette";

const PROTOCOL_IDS = new Set(CULTURAL_PROTOCOLS.map((p) => p.id));
const SORT_OPTIONS = new Set(Object.keys(SHOP_SORT_LABELS) as ShopSortOption[]);
const CATEGORY_VALUES = new Set<ShopCategoryFilter>([
  "all",
  "clothing",
  "bags",
  "bracelets",
]);

function parseProtocol(value: string | null): ProtocolFilter {
  if (value && PROTOCOL_IDS.has(value as ProtocolFilter)) {
    return value as ProtocolFilter;
  }
  return DEFAULT_PROTOCOL;
}

function parseCategory(value: string | null): ShopCategoryFilter {
  if (value && CATEGORY_VALUES.has(value as ShopCategoryFilter)) {
    return value as ShopCategoryFilter;
  }
  return "all";
}

function parseColor(value: string | null): ActiveColorFilter {
  if (value && PALETTE_COLORS.some((c) => c.id === value)) {
    return value as ActiveColorFilter;
  }
  return null;
}

function parseSort(value: string | null): ShopSortOption {
  if (value && SORT_OPTIONS.has(value as ShopSortOption)) {
    return value as ShopSortOption;
  }
  return "featured";
}

function buildShopHref(params: URLSearchParams): string {
  const qs = params.toString();
  return qs ? `/?${qs}#shop` : "/#shop";
}

export function useShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeProtocol = parseProtocol(searchParams.get("protocol"));
  const activeCategory = parseCategory(searchParams.get("category"));
  const activeColor = parseColor(searchParams.get("color"));
  const sortBy = parseSort(searchParams.get("sort"));
  const searchQuery = searchParams.get("q")?.trim() ?? "";

  const patchFilters = useCallback(
    (patch: {
      protocol?: ProtocolFilter;
      category?: ShopCategoryFilter;
      color?: ActiveColorFilter;
      sort?: ShopSortOption;
      query?: string;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (patch.protocol !== undefined) {
        if (patch.protocol === DEFAULT_PROTOCOL) params.delete("protocol");
        else params.set("protocol", patch.protocol);
      }

      if (patch.category !== undefined) {
        if (patch.category === "all") params.delete("category");
        else params.set("category", patch.category);
      }

      if (patch.color !== undefined) {
        if (patch.color === null) params.delete("color");
        else params.set("color", patch.color);
      }

      if (patch.sort !== undefined) {
        if (patch.sort === "featured") params.delete("sort");
        else params.set("sort", patch.sort);
      }

      if (patch.query !== undefined) {
        const trimmed = patch.query.trim();
        if (!trimmed) params.delete("q");
        else params.set("q", trimmed);
      }

      router.replace(buildShopHref(params), { scroll: false });
    },
    [router, searchParams]
  );

  const setProtocol = useCallback(
    (protocol: ProtocolFilter) => patchFilters({ protocol }),
    [patchFilters]
  );

  const setCategory = useCallback(
    (category: ShopCategoryFilter) => patchFilters({ category }),
    [patchFilters]
  );

  const setColor = useCallback(
    (color: ActiveColorFilter) => patchFilters({ color }),
    [patchFilters]
  );

  const setSort = useCallback(
    (sort: ShopSortOption) => patchFilters({ sort }),
    [patchFilters]
  );

  const setSearchQuery = useCallback(
    (query: string) => patchFilters({ query }),
    [patchFilters]
  );

  const clearFilters = useCallback(() => {
    router.replace("/#shop", { scroll: false });
  }, [router]);

  const hasActiveFilters =
    activeCategory !== "all" ||
    activeColor !== null ||
    activeProtocol !== DEFAULT_PROTOCOL ||
    sortBy !== "featured" ||
    searchQuery.length > 0;

  return {
    activeProtocol,
    activeCategory,
    activeColor,
    sortBy,
    searchQuery,
    hasActiveFilters,
    setProtocol,
    setCategory,
    setColor,
    setSort,
    setSearchQuery,
    clearFilters,
  };
}
