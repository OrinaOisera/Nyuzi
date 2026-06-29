import { isDatabaseConfigured, query, queryOne } from "@/lib/db";
import {
  getMockArtisan,
  MOCK_ARTISANS,
  getMockProduct,
  getMockProductsByArtisan,
  getMockProductsWithArtisans,
} from "@/lib/mock-data";
import { getMockArtisanOrders, getMockBuyerOrders } from "@/lib/mock-order-store";
import type { Artisan, BuyerOrderWithDetails, OrderWithDetails, Product, ProductWithArtisan } from "@/types/database";
import { resolveProductPalette } from "@/types/palette";

interface ProductRow {
  id: string;
  artisan_id: string;
  name: string;
  description: string | null;
  category: Product["category"];
  fabric_name: string;
  fabric_history: string | null;
  occasion: Product["occasion"];
  palette_color: Product["palette_color"];
  price_cents: number;
  image_url: string;
  overlay_png_url: string;
  is_active: boolean;
  created_at: string;
  artisan_display_name: string;
  artisan_location: string | null;
  artisan_slug: string | null;
}

function mapProductRow(row: ProductRow): ProductWithArtisan {
  return {
    id: row.id,
    artisan_id: row.artisan_id,
    name: row.name,
    description: row.description,
    category: row.category ?? "garment",
    fabric_name: row.fabric_name,
    fabric_history: row.fabric_history,
    occasion: row.occasion ?? "casual_wear",
    palette_color: resolveProductPalette(row.id, row.palette_color),
    price_cents: Number(row.price_cents),
    image_url: row.image_url,
    overlay_png_url: row.overlay_png_url,
    is_active: row.is_active,
    created_at: row.created_at,
    artisan: {
      id: row.artisan_id,
      display_name: row.artisan_display_name,
      location: row.artisan_location,
      slug: row.artisan_slug,
    },
  };
}

const PRODUCT_SELECT = `
  select
    p.*,
    a.display_name as artisan_display_name,
    a.location as artisan_location,
    a.slug as artisan_slug
  from products p
  join artisans a on a.id = p.artisan_id
`;

export async function getArtisans(): Promise<Artisan[]> {
  if (!isDatabaseConfigured()) {
    return MOCK_ARTISANS;
  }

  try {
    const rows = await query<Artisan>(`select * from artisans order by display_name`);
    return rows.map((row) => ({
      ...row,
      behind_the_stitch_gallery: row.behind_the_stitch_gallery ?? [],
    }));
  } catch {
    return MOCK_ARTISANS;
  }
}

export async function getProducts(
  occasion?: string | null,
  category?: string | null
): Promise<ProductWithArtisan[]> {
  if (!isDatabaseConfigured()) {
    return getMockProductsWithArtisans(occasion, category);
  }

  try {
    const conditions = ["p.is_active = true"];
    const params: string[] = [];

    if (occasion) {
      params.push(occasion);
      conditions.push(`p.occasion = $${params.length}::occasion_type`);
    }

    if (category) {
      params.push(category);
      conditions.push(`p.category = $${params.length}::product_category`);
    }

    const rows = await query<ProductRow>(
      `${PRODUCT_SELECT}
       where ${conditions.join(" and ")}
       order by p.created_at desc`,
      params
    );

    return rows.map(mapProductRow);
  } catch {
    return getMockProductsWithArtisans(occasion, category);
  }
}

export async function getArtisan(id: string): Promise<Artisan | null> {
  if (!isDatabaseConfigured()) {
    return getMockArtisan(id) ?? null;
  }

  try {
    const row = await queryOne<Artisan>(
      `select * from artisans where id::text = $1 or slug = $1`,
      [id]
    );

    if (!row) return getMockArtisan(id) ?? null;

    return {
      ...row,
      behind_the_stitch_gallery: row.behind_the_stitch_gallery ?? [],
    };
  } catch {
    return getMockArtisan(id) ?? null;
  }
}

export async function getArtisanProducts(artisanId: string): Promise<Product[]> {
  if (!isDatabaseConfigured()) {
    return getMockProductsByArtisan(artisanId);
  }

  try {
    const rows = await query<Product>(
      `select * from products
       where artisan_id = $1 and is_active = true
       order by created_at desc`,
      [artisanId]
    );

    return rows.map((row) => ({
      ...row,
      price_cents: Number(row.price_cents),
      palette_color: resolveProductPalette(row.id, row.palette_color),
    }));
  } catch {
    return getMockProductsByArtisan(artisanId);
  }
}

export async function getProduct(
  productId: string
): Promise<ProductWithArtisan | null> {
  if (!isDatabaseConfigured()) {
    return getMockProduct(productId) ?? null;
  }

  try {
    const row = await queryOne<ProductRow>(
      `${PRODUCT_SELECT} where p.id = $1`,
      [productId]
    );

    if (!row) return getMockProduct(productId) ?? null;
    return mapProductRow(row);
  } catch {
    return getMockProduct(productId) ?? null;
  }
}

interface OrderRow {
  id: string;
  buyer_id: string;
  artisan_id: string;
  product_id: string;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  amount_cents: number;
  status: OrderWithDetails["status"];
  customization_snapshot: OrderWithDetails["customization_snapshot"];
  created_at: string;
  product_name: string;
  buyer_name: string;
}

export async function getArtisanOrders(
  artisanId: string
): Promise<OrderWithDetails[]> {
  if (!isDatabaseConfigured()) {
    return getMockArtisanOrders(artisanId);
  }

  try {
    const rows = await query<OrderRow>(
      `select
         o.id,
         o.buyer_id,
         o.artisan_id,
         o.product_id,
         o.stripe_session_id,
         o.stripe_payment_intent_id,
         o.amount_cents,
         o.status,
         o.customization_snapshot,
         o.created_at,
         p.name as product_name,
         coalesce(pr.full_name, pr.email, 'Buyer') as buyer_name
       from orders o
       join products p on p.id = o.product_id
       join profiles pr on pr.id = o.buyer_id
       where o.artisan_id = $1
       order by o.created_at desc`,
      [artisanId]
    );

    return rows.map((row) => ({
      id: row.id,
      buyer_id: row.buyer_id,
      artisan_id: row.artisan_id,
      product_id: row.product_id,
      stripe_session_id: row.stripe_session_id,
      stripe_payment_intent_id: row.stripe_payment_intent_id,
      amount_cents: Number(row.amount_cents),
      status: row.status,
      customization_snapshot: row.customization_snapshot,
      created_at: row.created_at,
      product_name: row.product_name,
      buyer_name: row.buyer_name,
    }));
  } catch {
    return getMockArtisanOrders(artisanId);
  }
}

interface BuyerOrderRow {
  id: string;
  buyer_id: string;
  artisan_id: string;
  product_id: string;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  amount_cents: number;
  status: BuyerOrderWithDetails["status"];
  customization_snapshot: BuyerOrderWithDetails["customization_snapshot"];
  created_at: string;
  product_name: string;
  artisan_name: string;
}

export async function getBuyerOrders(
  buyerId: string
): Promise<BuyerOrderWithDetails[]> {
  if (!isDatabaseConfigured()) {
    return getMockBuyerOrders(buyerId);
  }

  try {
    const rows = await query<BuyerOrderRow>(
      `select
         o.id,
         o.buyer_id,
         o.artisan_id,
         o.product_id,
         o.stripe_session_id,
         o.stripe_payment_intent_id,
         o.amount_cents,
         o.status,
         o.customization_snapshot,
         o.created_at,
         p.name as product_name,
         a.display_name as artisan_name
       from orders o
       join products p on p.id = o.product_id
       join artisans a on a.id = o.artisan_id
       where o.buyer_id = $1
       order by o.created_at desc`,
      [buyerId]
    );

    return rows.map((row) => ({
      id: row.id,
      buyer_id: row.buyer_id,
      artisan_id: row.artisan_id,
      product_id: row.product_id,
      stripe_session_id: row.stripe_session_id,
      stripe_payment_intent_id: row.stripe_payment_intent_id,
      amount_cents: Number(row.amount_cents),
      status: row.status,
      customization_snapshot: row.customization_snapshot,
      created_at: row.created_at,
      product_name: row.product_name,
      artisan_name: row.artisan_name,
    }));
  } catch {
    return getMockBuyerOrders(buyerId);
  }
}
