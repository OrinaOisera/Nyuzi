import type { MeasurementInput } from "@/types/database";

export type ProductCategory = "garment" | "bag" | "accessory";

export type BagSize = "small" | "medium" | "large";

export type AnkaraPrintId =
  | "sunset_geometric"
  | "royal_indigo"
  | "gold_adire"
  | "kente_burst"
  | "lagos_floral";

export type AccessoryKind = "bracelet" | "chain";

export type AccessoryMaterial = "beads" | "brass";

export type AccessorySize = "small" | "medium" | "large";

export type BeadColor = "coral" | "gold" | "emerald" | "ivory" | "onyx";

export type BeadPattern = "single_strand" | "woven" | "gradient" | "alternating";

export type BrassStyle = "plain_cuff" | "engraved_adinkra" | "hammered" | "twisted";

export interface GarmentCustomization {
  type: "garment";
  measurements: MeasurementInput;
}

export interface BagCustomization {
  type: "bag";
  size: BagSize;
  ankaraPrint: AnkaraPrintId;
}

export interface AccessoryCustomization {
  type: "accessory";
  kind: AccessoryKind;
  size: AccessorySize;
  material: AccessoryMaterial;
  beadColor?: BeadColor;
  beadPattern?: BeadPattern;
  brassStyle?: BrassStyle;
  engraving?: string;
}

export type CustomizationSnapshot =
  | GarmentCustomization
  | BagCustomization
  | AccessoryCustomization;

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  garment: "Garments",
  bag: "Bags",
  accessory: "Accessories",
};

export const CATEGORIES: ProductCategory[] = ["garment", "bag", "accessory"];

export const BAG_SIZE_LABELS: Record<BagSize, string> = {
  small: "Small · 25 × 20 cm",
  medium: "Medium · 35 × 28 cm",
  large: "Large · 45 × 35 cm",
};

export const ACCESSORY_SIZE_LABELS: Record<AccessorySize, string> = {
  small: "Small · 16–18 cm",
  medium: "Medium · 19–21 cm",
  large: "Large · 22–24 cm",
};

export const ACCESSORY_KIND_LABELS: Record<AccessoryKind, string> = {
  bracelet: "Bracelet",
  chain: "Chain",
};

export const BEAD_COLOR_LABELS: Record<BeadColor, string> = {
  coral: "Coral",
  gold: "Gold",
  emerald: "Emerald",
  ivory: "Ivory",
  onyx: "Onyx",
};

export const BEAD_PATTERN_LABELS: Record<BeadPattern, string> = {
  single_strand: "Single strand",
  woven: "Woven",
  gradient: "Gradient",
  alternating: "Alternating",
};

export const BRASS_STYLE_LABELS: Record<BrassStyle, string> = {
  plain_cuff: "Plain cuff",
  engraved_adinkra: "Engraved Adinkra",
  hammered: "Hammered finish",
  twisted: "Twisted band",
};

export const ANKARA_PRINTS: {
  id: AnkaraPrintId;
  name: string;
  swatchClass: string;
}[] = [
  { id: "sunset_geometric", name: "Sunset Geometric", swatchClass: "print-sunset-geometric" },
  { id: "royal_indigo", name: "Royal Indigo", swatchClass: "print-royal-indigo" },
  { id: "gold_adire", name: "Gold Adire", swatchClass: "print-gold-adire" },
  { id: "kente_burst", name: "Kente Burst", swatchClass: "print-kente-burst" },
  { id: "lagos_floral", name: "Lagos Floral", swatchClass: "print-lagos-floral" },
];

export function getAnkaraPrintName(id: AnkaraPrintId): string {
  return ANKARA_PRINTS.find((p) => p.id === id)?.name ?? id;
}

export const DEFAULT_BAG: BagCustomization = {
  type: "bag",
  size: "medium",
  ankaraPrint: "sunset_geometric",
};

export const DEFAULT_ACCESSORY: AccessoryCustomization = {
  type: "accessory",
  kind: "bracelet",
  size: "medium",
  material: "beads",
  beadColor: "gold",
  beadPattern: "woven",
};
