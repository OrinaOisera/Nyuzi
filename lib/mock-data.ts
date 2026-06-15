import type { Artisan, Product, ProductWithArtisan } from "@/types/database";

const OVERLAY_URL = "/overlays/garment.svg";

export const MOCK_ARTISANS: Artisan[] = [
  {
    id: "a1111111-1111-1111-1111-111111111111",
    user_id: "11111111-1111-1111-1111-111111111111",
    display_name: "Amara Okafor",
    slug: "amara-okafor",
    location: "Lagos, Nigeria",
    story:
      "Third-generation tailor from Lagos. Amara weaves stories of Yoruba heritage into every Ankara stitch, honoring her grandmother's workshop traditions.",
    heritage_video_url: "https://www.youtube.com/embed/ScMzIvxBSi4",
    behind_the_stitch_gallery: [
      "https://images.unsplash.com/photo-1558171813-4c088a7d4e8f?w=400",
      "https://images.unsplash.com/photo-1583292655851-d4c9b3f5d375?w=400",
      "https://images.unsplash.com/photo-1594932224828-944e85e3e6a8?w=400",
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "a2222222-2222-2222-2222-222222222222",
    user_id: "22222222-2222-2222-2222-222222222222",
    display_name: "Zinhle Mthembu",
    slug: "zinhle-mthembu",
    location: "Johannesburg, South Africa",
    story:
      "Master of Shweshwe and contemporary African formal wear. Zinhle blends Xhosa ceremonial traditions with modern silhouettes for the global stage.",
    heritage_video_url: "https://www.youtube.com/embed/ScMzIvxBSi4",
    behind_the_stitch_gallery: [
      "https://images.unsplash.com/photo-1610030469983-98e550d619fa?w=400",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "a3333333-3333-3333-3333-333333333333",
    user_id: "33333333-3333-3333-3333-333333333333",
    display_name: "Fatou Diallo",
    slug: "fatou-diallo",
    location: "Accra, Ghana",
    story:
      "Kente specialist from Kumasi. Each cloth Fatou creates carries the weight of Ashanti royal history — gold threads telling stories of kings and queens.",
    heritage_video_url: "https://www.youtube.com/embed/ScMzIvxBSi4",
    behind_the_stitch_gallery: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92c1?w=400",
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400",
    ],
    created_at: new Date().toISOString(),
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1111111-1111-1111-1111-111111111111",
    artisan_id: "a1111111-1111-1111-1111-111111111111",
    name: "Royal Ankara Gown",
    description: "Floor-length Ankara gown with hand-beaded bodice",
    category: "garment",
    fabric_name: "Ankara",
    fabric_history:
      "Ankara (Dutch wax print) arrived in West Africa in the 19th century and became a symbol of African identity and pride. Each pattern carries meaning — fertility, wealth, or social status.",
    occasion: "traditional_wedding",
    price_cents: 28500,
    image_url:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p1111111-1111-1111-1111-111111111112",
    artisan_id: "a1111111-1111-1111-1111-111111111111",
    name: "Sunset Celebration Dress",
    description: "Vibrant midi dress perfect for festive gatherings",
    category: "garment",
    fabric_name: "Ankara",
    fabric_history:
      "Ankara patterns often tell stories — the record or speaking prints convey messages through symbolic motifs passed down through generations.",
    occasion: "celebration",
    price_cents: 19500,
    image_url:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p1111111-1111-1111-1111-111111111113",
    artisan_id: "a1111111-1111-1111-1111-111111111111",
    name: "Lagos Casual Wrap",
    description: "Effortless wrap dress for everyday elegance",
    category: "garment",
    fabric_name: "Ankara",
    fabric_history:
      "Modern Ankara fashion bridges traditional West African aesthetics with contemporary global style.",
    occasion: "casual_wear",
    price_cents: 12500,
    image_url:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92c1?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p2222222-2222-2222-2222-222222222221",
    artisan_id: "a2222222-2222-2222-2222-222222222222",
    name: "Shweshwe Gala Gown",
    description: "Structured ball gown in indigo Shweshwe",
    category: "garment",
    fabric_name: "Shweshwe",
    fabric_history:
      "Shweshwe is South Africa's traditional dyed cotton fabric, originally brought by German settlers and adopted by Xhosa women as ceremonial dress.",
    occasion: "formal_gala",
    price_cents: 35000,
    image_url:
      "https://images.unsplash.com/photo-1610030469983-98e550d619fa?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p2222222-2222-2222-2222-222222222222",
    artisan_id: "a2222222-2222-2222-2222-222222222222",
    name: "Heritage Wedding Ensemble",
    description: "Two-piece Shweshwe bridal set with headwrap",
    category: "garment",
    fabric_name: "Shweshwe",
    fabric_history:
      "In Xhosa tradition, Shweshwe is worn at umabo ceremonies, symbolizing the bride's transition into married life.",
    occasion: "traditional_wedding",
    price_cents: 42000,
    image_url:
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p2222222-2222-2222-2222-222222222223",
    artisan_id: "a2222222-2222-2222-2222-222222222222",
    name: "Johannesburg Day Dress",
    description: "Lightweight Shweshwe day dress",
    category: "garment",
    fabric_name: "Shweshwe",
    fabric_history:
      "Contemporary South African designers have elevated Shweshwe from rural tradition to international runway fashion.",
    occasion: "casual_wear",
    price_cents: 15800,
    image_url:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p3333333-3333-3333-3333-333333333331",
    artisan_id: "a3333333-3333-3333-3333-333333333333",
    name: "Ashanti Kente Stole",
    description: "Handwoven Kente ceremonial stole",
    category: "garment",
    fabric_name: "Kente",
    fabric_history:
      "Kente cloth originates from the Ashanti Kingdom of Ghana, dating to the 17th century. Each color and pattern carries specific meaning.",
    occasion: "formal_gala",
    price_cents: 22000,
    image_url:
      "https://images.unsplash.com/photo-1558171813-4c088a7d4e8f?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p3333333-3333-3333-3333-333333333332",
    artisan_id: "a3333333-3333-3333-3333-333333333333",
    name: "Golden Kente Bridal",
    description: "Full Kente wedding dress with gold thread accents",
    category: "garment",
    fabric_name: "Kente",
    fabric_history:
      "Kente was once reserved for Ashanti royalty. Today it adorns weddings and celebrations across the African diaspora.",
    occasion: "traditional_wedding",
    price_cents: 55000,
    image_url:
      "https://images.unsplash.com/photo-1583292655851-d4c9b3f5d375?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p3333333-3333-3333-3333-333333333333",
    artisan_id: "a3333333-3333-3333-3333-333333333333",
    name: "Festival Kente Top",
    description: "Bold Kente crop top for celebrations",
    category: "garment",
    fabric_name: "Kente",
    fabric_history:
      "The adweneasa pattern is among the most prestigious Kente designs, woven only by master craftsmen.",
    occasion: "celebration",
    price_cents: 16800,
    image_url:
      "https://images.unsplash.com/photo-1594932224828-944e85e3e6a8?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p1111111-1111-1111-1111-111111111114",
    artisan_id: "a1111111-1111-1111-1111-111111111111",
    name: "Lagos Ankara Tote",
    description: "Structured tote with reinforced handles — pick your Ankara print",
    category: "bag",
    fabric_name: "Ankara",
    fabric_history:
      "Each tote is cut from premium Dutch wax print, chosen for durability and bold pattern alignment at the seams.",
    occasion: "casual_wear",
    price_cents: 8500,
    image_url:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p2222222-2222-2222-2222-222222222224",
    artisan_id: "a2222222-2222-2222-2222-222222222222",
    name: "Crossbody Ankara Clutch",
    description: "Compact crossbody with adjustable strap and magnetic closure",
    category: "bag",
    fabric_name: "Ankara",
    fabric_history:
      "Zinhle selects Ankara prints that wrap seamlessly around the clutch body for a continuous pattern story.",
    occasion: "celebration",
    price_cents: 7200,
    image_url:
      "https://images.unsplash.com/photo-1584917865442-de89df76aed3?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p3333333-3333-3333-3333-333333333334",
    artisan_id: "a3333333-3333-3333-3333-333333333333",
    name: "Kente Weekender",
    description: "Spacious weekender with interior pockets — Ankara lining options",
    category: "bag",
    fabric_name: "Ankara",
    fabric_history:
      "Fatou pairs exterior Kente panels with your chosen Ankara print for the lining and base panel.",
    occasion: "casual_wear",
    price_cents: 14500,
    image_url:
      "https://images.unsplash.com/photo-1548036328-c9fa89d12836?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p1111111-1111-1111-1111-111111111115",
    artisan_id: "a1111111-1111-1111-1111-111111111111",
    name: "Waist Bead Chain",
    description: "Hand-strung waist chain — choose bead colors and weaving pattern",
    category: "accessory",
    fabric_name: "Glass beads",
    fabric_history:
      "West African waist beads carry cultural significance — Amara strings each piece to your chosen size and palette.",
    occasion: "celebration",
    price_cents: 4500,
    image_url:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p3333333-3333-3333-3333-333333333335",
    artisan_id: "a3333333-3333-3333-3333-333333333333",
    name: "Brass Cuff Bracelet",
    description: "Hand-forged brass cuff — customize finish and optional engraving",
    category: "accessory",
    fabric_name: "Brass",
    fabric_history:
      "Ashanti brasswork traditions inspire Fatou's cuffs — each piece is shaped, polished, and finished by hand in Accra.",
    occasion: "formal_gala",
    price_cents: 6800,
    image_url:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "p2222222-2222-2222-2222-222222222225",
    artisan_id: "a2222222-2222-2222-2222-222222222222",
    name: "Heritage Bead Bracelet",
    description: "Stackable bracelet or ankle chain in glass beads or brass accents",
    category: "accessory",
    fabric_name: "Beads & brass",
    fabric_history:
      "Zinhle blends Xhosa beadwork color symbolism with contemporary stacking styles for everyday wear.",
    occasion: "casual_wear",
    price_cents: 5200,
    image_url:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600",
    overlay_png_url: OVERLAY_URL,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

const artisanMap = new Map(MOCK_ARTISANS.map((a) => [a.id, a]));

export function getMockProductsWithArtisans(
  occasion?: string | null,
  category?: string | null
): ProductWithArtisan[] {
  let products = MOCK_PRODUCTS.filter((p) => p.is_active);

  if (category) {
    products = products.filter((p) => p.category === category);
  }

  if (occasion) {
    products = products.filter((p) => p.occasion === occasion);
  }

  return products.map((product) => {
    const artisan = artisanMap.get(product.artisan_id)!;
    return {
      ...product,
      artisan: {
        id: artisan.id,
        display_name: artisan.display_name,
        location: artisan.location,
        slug: artisan.slug,
      },
    };
  });
}

export function getMockArtisan(id: string): Artisan | undefined {
  return MOCK_ARTISANS.find((a) => a.id === id || a.slug === id);
}

export function getMockProduct(id: string): ProductWithArtisan | undefined {
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  if (!product) return undefined;
  const artisan = artisanMap.get(product.artisan_id);
  if (!artisan) return undefined;
  return {
    ...product,
    artisan: {
      id: artisan.id,
      display_name: artisan.display_name,
      location: artisan.location,
      slug: artisan.slug,
    },
  };
}

export function getMockProductsByArtisan(artisanId: string): Product[] {
  return MOCK_PRODUCTS.filter(
    (p) => p.artisan_id === artisanId && p.is_active
  );
}

export const MOCK_ORDERS = [
  {
    id: "o1111111-1111-1111-1111-111111111111",
    buyer_id: "b0000000-0000-0000-0000-000000000001",
    artisan_id: "a1111111-1111-1111-1111-111111111111",
    product_id: "p1111111-1111-1111-1111-111111111111",
    stripe_session_id: null,
    stripe_payment_intent_id: null,
    amount_cents: 28500,
    status: "paid" as const,
    measurement_snapshot: {
      type: "garment" as const,
      measurements: {
        bust_cm: 92,
        waist_cm: 72,
        hips_cm: 98,
        height_cm: 168,
      },
    },
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    product_name: "Royal Ankara Gown",
    buyer_name: "Demo Buyer",
  },
  {
    id: "o1111111-1111-1111-1111-111111111112",
    buyer_id: "b0000000-0000-0000-0000-000000000001",
    artisan_id: "a1111111-1111-1111-1111-111111111111",
    product_id: "p1111111-1111-1111-1111-111111111112",
    stripe_session_id: null,
    stripe_payment_intent_id: null,
    amount_cents: 19500,
    status: "pending" as const,
    measurement_snapshot: {
      type: "garment" as const,
      measurements: {
        bust_cm: 88,
        waist_cm: 68,
        hips_cm: 94,
        height_cm: 162,
      },
    },
    created_at: new Date(Date.now() - 86400000).toISOString(),
    product_name: "Sunset Celebration Dress",
    buyer_name: "Demo Buyer",
  },
  {
    id: "o2222222-2222-2222-2222-222222222221",
    buyer_id: "b0000000-0000-0000-0000-000000000001",
    artisan_id: "a2222222-2222-2222-2222-222222222222",
    product_id: "p2222222-2222-2222-2222-222222222221",
    stripe_session_id: null,
    stripe_payment_intent_id: null,
    amount_cents: 35000,
    status: "fulfilled" as const,
    measurement_snapshot: {
      type: "garment" as const,
      measurements: {
        bust_cm: 95,
        waist_cm: 74,
        hips_cm: 100,
        height_cm: 170,
      },
    },
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    product_name: "Shweshwe Gala Gown",
    buyer_name: "Demo Buyer",
  },
];

