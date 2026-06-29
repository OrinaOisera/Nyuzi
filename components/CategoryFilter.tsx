"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  type ProductCategory,
} from "@/types/customization";

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category");

  function setCategory(category: ProductCategory | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Badge active={!active} onClick={() => setCategory(null)}>
        All
      </Badge>
      {CATEGORIES.map((category) => (
        <Badge
          key={category}
          active={active === category}
          onClick={() => setCategory(category)}
        >
          {CATEGORY_LABELS[category]}
        </Badge>
      ))}
    </div>
  );
}
