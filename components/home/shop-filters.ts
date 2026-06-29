import type { ProductCategory } from "@/types/customization";
import { PALETTE_COLORS, type PaletteColorId } from "@/types/palette";
import type { OccasionType, ProductWithArtisan } from "@/types/database";

/** UI filter keys used by homepage pillars */
export type ShopCategoryFilter = "all" | "clothing" | "bags" | "bracelets";

export const SHOP_CATEGORY_LABELS: Record<Exclude<ShopCategoryFilter, "all">, string> = {
  clothing: "Bespoke Clothing",
  bags: "Handcrafted Bags",
  bracelets: "Artisan Bracelets",
};

export function shopCategoryToProductCategory(
  filter: ShopCategoryFilter
): ProductCategory | null {
  switch (filter) {
    case "clothing":
      return "garment";
    case "bags":
      return "bag";
    case "bracelets":
      return "accessory";
    default:
      return null;
  }
}

export type ActiveColorFilter = PaletteColorId | null;

/** Cultural protocol tabs in Chapter III shop */
export type ProtocolFilter = "gathering" | "daily" | "heritage";

export const DEFAULT_PROTOCOL: ProtocolFilter = "gathering";

export const CULTURAL_PROTOCOLS: {
  id: ProtocolFilter;
  label: string;
  subtitle: string;
  occasions: OccasionType[];
}[] = [
  {
    id: "gathering",
    label: "The Gathering",
    subtitle: "Galas & Weddings",
    occasions: ["formal_gala", "traditional_wedding", "celebration"],
  },
  {
    id: "daily",
    label: "The Daily",
    subtitle: "Contemporary Streetwear",
    occasions: ["casual_wear"],
  },
  {
    id: "heritage",
    label: "The Heritage",
    subtitle: "Traditional Ceremonies",
    occasions: ["traditional_wedding", "celebration"],
  },
];

export type ShopSortOption =
  | "featured"
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "newest"
  | "palette";

export const SHOP_SORT_LABELS: Record<ShopSortOption, string> = {
  featured: "Featured",
  price_asc: "Price · low to high",
  price_desc: "Price · high to low",
  name_asc: "Name · A to Z",
  newest: "Newest first",
  palette: "Palette color",
};

export interface ShopFilterState {
  protocol: ProtocolFilter;
  category: ShopCategoryFilter;
  color: ActiveColorFilter;
  sort: ShopSortOption;
  query: string;
}

export function productMatchesSearchQuery(
  product: ProductWithArtisan,
  query: string
): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [
    product.name,
    product.description,
    product.fabric_name,
    product.fabric_history,
    product.artisan.display_name,
    product.artisan.location,
    product.category,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return normalized.split(/\s+/).every((term) => haystack.includes(term));
}

export function filterShopProducts(
  products: ProductWithArtisan[],
  {
    protocol,
    category,
    color,
    query = "",
  }: Pick<ShopFilterState, "protocol" | "category" | "color"> & { query?: string }
): ProductWithArtisan[] {
  const protocolMeta = CULTURAL_PROTOCOLS.find((p) => p.id === protocol)!;
  const productCategory = shopCategoryToProductCategory(category);

  return products.filter((product) => {
    const matchesProtocol = protocolMeta.occasions.includes(product.occasion);
    const matchesCategory = !productCategory || product.category === productCategory;
    const matchesColor = !color || product.palette_color === color;
    const matchesSearch = productMatchesSearchQuery(product, query);
    return matchesProtocol && matchesCategory && matchesColor && matchesSearch;
  });
}

export function sortShopProducts(
  products: ProductWithArtisan[],
  sort: ShopSortOption
): ProductWithArtisan[] {
  const sorted = [...products];

  switch (sort) {
    case "price_asc":
      return sorted.sort((a, b) => a.price_cents - b.price_cents);
    case "price_desc":
      return sorted.sort((a, b) => b.price_cents - a.price_cents);
    case "name_asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    case "palette":
      return sorted.sort((a, b) => {
        const ai = PALETTE_COLORS.findIndex((c) => c.id === a.palette_color);
        const bi = PALETTE_COLORS.findIndex((c) => c.id === b.palette_color);
        return ai - bi || a.name.localeCompare(b.name);
      });
    case "featured":
    default:
      return sorted;
  }
}

export function countShopProducts(
  products: ProductWithArtisan[],
  protocol: ProtocolFilter,
  category: ShopCategoryFilter,
  color: ActiveColorFilter,
  query = ""
): number {
  return filterShopProducts(products, { protocol, category, color, query }).length;
}
