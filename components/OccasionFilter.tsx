"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { OCCASION_LABELS, OCCASIONS, type OccasionType } from "@/types/database";

export function OccasionFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("occasion");

  function setOccasion(occasion: OccasionType | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (occasion) {
      params.set("occasion", occasion);
    } else {
      params.delete("occasion");
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Badge active={!active} onClick={() => setOccasion(null)}>
        All
      </Badge>
      {OCCASIONS.map((occasion) => (
        <Badge
          key={occasion}
          active={active === occasion}
          onClick={() => setOccasion(occasion)}
        >
          {OCCASION_LABELS[occasion]}
        </Badge>
      ))}
    </div>
  );
}
