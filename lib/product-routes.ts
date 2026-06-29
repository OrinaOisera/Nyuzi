import type { ProductCategory } from "@/types/customization";

/** Garments → virtual try-on; bags & accessories → customize workspace */
export function productHref(
  productId: string,
  category: ProductCategory
): string {
  return category === "garment"
    ? `/try-on/${productId}`
    : `/customize/${productId}`;
}

export function productHrefFromProduct(product: {
  id: string;
  category: ProductCategory;
}): string {
  return productHref(product.id, product.category);
}
