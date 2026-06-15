import type { CustomizationSnapshot } from "@/types/customization";
import {
  ACCESSORY_KIND_LABELS,
  ACCESSORY_SIZE_LABELS,
  BAG_SIZE_LABELS,
  BEAD_COLOR_LABELS,
  BEAD_PATTERN_LABELS,
  BRASS_STYLE_LABELS,
  getAnkaraPrintName,
} from "@/types/customization";
import type { MeasurementInput } from "@/types/database";

/** Legacy orders may only have measurement fields */
export function isGarmentSnapshot(
  snapshot: CustomizationSnapshot | MeasurementInput
): snapshot is { type: "garment"; measurements: MeasurementInput } {
  return "type" in snapshot && snapshot.type === "garment";
}

export function formatCustomizationSummary(
  snapshot: CustomizationSnapshot | MeasurementInput
): string {
  if (!("type" in snapshot)) {
    return `B ${snapshot.bust_cm} · W ${snapshot.waist_cm} · H ${snapshot.hips_cm} · ${snapshot.height_cm} cm`;
  }

  switch (snapshot.type) {
    case "garment":
      return `B ${snapshot.measurements.bust_cm} · W ${snapshot.measurements.waist_cm} · H ${snapshot.measurements.hips_cm} · ${snapshot.measurements.height_cm} cm`;
    case "bag":
      return `${BAG_SIZE_LABELS[snapshot.size].split(" · ")[0]} · ${getAnkaraPrintName(snapshot.ankaraPrint)} print`;
    case "accessory": {
      const parts = [
        ACCESSORY_KIND_LABELS[snapshot.kind],
        ACCESSORY_SIZE_LABELS[snapshot.size].split(" · ")[0],
        snapshot.material === "beads" ? "Beads" : "Brass",
      ];
      if (snapshot.material === "beads" && snapshot.beadColor && snapshot.beadPattern) {
        parts.push(BEAD_COLOR_LABELS[snapshot.beadColor], BEAD_PATTERN_LABELS[snapshot.beadPattern]);
      }
      if (snapshot.material === "brass" && snapshot.brassStyle) {
        parts.push(BRASS_STYLE_LABELS[snapshot.brassStyle]);
        if (snapshot.engraving?.trim()) parts.push(`"${snapshot.engraving.trim()}"`);
      }
      return parts.join(" · ");
    }
    default:
      return "Custom order";
  }
}
