export type PaletteColorId =
  | "indigo_blue"
  | "ochre_red"
  | "kente_gold"
  | "mud_brown"
  | "emerald_green"
  | "cowrie_cream";

export const PALETTE_COLORS: {
  id: PaletteColorId;
  name: string;
  hex: string;
}[] = [
  { id: "indigo_blue", name: "Indigo Blue", hex: "#0F1E36" },
  { id: "ochre_red", name: "Ochre Red", hex: "#A84428" },
  { id: "kente_gold", name: "Kente Gold", hex: "#DCA134" },
  { id: "mud_brown", name: "Mud Brown", hex: "#3D2B20" },
  { id: "emerald_green", name: "Emerald Green", hex: "#1B4D3E" },
  { id: "cowrie_cream", name: "Cowrie Cream", hex: "#F9F6F0" },
];

export const PALETTE_COLOR_LABELS: Record<PaletteColorId, string> = Object.fromEntries(
  PALETTE_COLORS.map((c) => [c.id, c.name])
) as Record<PaletteColorId, string>;

export const PRODUCT_PALETTE_COLORS: Record<string, PaletteColorId> = {
  "p1111111-1111-1111-1111-111111111111": "ochre_red",
  "p1111111-1111-1111-1111-111111111112": "ochre_red",
  "p1111111-1111-1111-1111-111111111113": "kente_gold",
  "p2222222-2222-2222-2222-222222222221": "indigo_blue",
  "p2222222-2222-2222-2222-222222222222": "indigo_blue",
  "p2222222-2222-2222-2222-222222222223": "cowrie_cream",
  "p3333333-3333-3333-3333-333333333331": "kente_gold",
  "p3333333-3333-3333-3333-333333333332": "kente_gold",
  "p3333333-3333-3333-3333-333333333333": "emerald_green",
  "p1111111-1111-1111-1111-111111111114": "ochre_red",
  "p2222222-2222-2222-2222-222222222224": "mud_brown",
  "p3333333-3333-3333-3333-333333333334": "mud_brown",
  "p1111111-1111-1111-1111-111111111115": "kente_gold",
  "p3333333-3333-3333-3333-333333333335": "mud_brown",
  "p2222222-2222-2222-2222-222222222225": "emerald_green",
};

export function resolveProductPalette(
  productId: string,
  paletteColor?: PaletteColorId | null
): PaletteColorId {
  return paletteColor ?? PRODUCT_PALETTE_COLORS[productId] ?? "mud_brown";
}
