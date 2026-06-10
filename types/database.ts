export type UserRole = "buyer" | "artisan" | "admin";

export type OccasionType =
  | "traditional_wedding"
  | "formal_gala"
  | "celebration"
  | "casual_wear";

export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface Artisan {
  id: string;
  user_id: string;
  display_name: string;
  slug: string | null;
  location: string | null;
  story: string | null;
  heritage_video_url: string | null;
  behind_the_stitch_gallery: string[];
  created_at: string;
}

export interface Product {
  id: string;
  artisan_id: string;
  name: string;
  description: string | null;
  fabric_name: string;
  fabric_history: string | null;
  occasion: OccasionType;
  price_cents: number;
  image_url: string;
  overlay_png_url: string;
  is_active: boolean;
  created_at: string;
}

export interface ProductWithArtisan extends Product {
  artisan: Pick<Artisan, "id" | "display_name" | "location" | "slug">;
}

export interface Measurement {
  id: string;
  user_id: string;
  bust_cm: number;
  waist_cm: number;
  hips_cm: number;
  height_cm: number;
  created_at: string;
  updated_at: string;
}

export interface MeasurementInput {
  bust_cm: number;
  waist_cm: number;
  hips_cm: number;
  height_cm: number;
}

export interface Order {
  id: string;
  buyer_id: string;
  artisan_id: string;
  product_id: string;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  amount_cents: number;
  status: OrderStatus;
  measurement_snapshot: MeasurementInput;
  created_at: string;
}

export interface OrderWithDetails extends Order {
  product_name: string;
  buyer_name: string;
}

export interface BuyerOrderWithDetails extends Order {
  product_name: string;
  artisan_name: string;
}

export const OCCASION_LABELS: Record<OccasionType, string> = {
  traditional_wedding: "Traditional Wedding",
  formal_gala: "Formal Gala",
  celebration: "Celebration",
  casual_wear: "Casual Wear",
};

export const OCCASIONS: OccasionType[] = [
  "traditional_wedding",
  "formal_gala",
  "celebration",
  "casual_wear",
];
