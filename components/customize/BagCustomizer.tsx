"use client";

import { AnkaraPrintPicker } from "@/components/customize/AnkaraPrintPicker";
import { OptionGroup } from "@/components/customize/OptionGroup";
import {
  BAG_SIZE_LABELS,
  type BagCustomization,
  type BagSize,
} from "@/types/customization";

interface BagCustomizerProps {
  value: BagCustomization;
  onChange: (value: BagCustomization) => void;
}

const SIZE_OPTIONS = (Object.entries(BAG_SIZE_LABELS) as [BagSize, string][]).map(
  ([value, label]) => ({
    value,
    label: label.split(" · ")[0],
    description: label.split(" · ")[1],
  })
);

export function BagCustomizer({ value, onChange }: BagCustomizerProps) {
  return (
    <div className="space-y-8">
      <OptionGroup
        label="Bag size"
        hint="Dimensions are approximate — artisans adjust for your preferred carry style."
        value={value.size}
        options={SIZE_OPTIONS}
        onChange={(size) => onChange({ ...value, size })}
        columns={3}
      />
      <AnkaraPrintPicker
        value={value.ankaraPrint}
        onChange={(ankaraPrint) => onChange({ ...value, ankaraPrint })}
      />
    </div>
  );
}
