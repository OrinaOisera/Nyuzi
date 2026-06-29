/**
 * Central image asset map for Nyuzi.
 * Drop replacement files into `public/assets/` using the same paths — no code changes needed.
 */

export const GARMENT_OVERLAY = "/overlays/garment.svg";

// ── Landing page (/) — start here when swapping African design assets ─────────

export const LANDING_PAGE = {
  /** Chapter I — full-viewport hero cover */
  hero: {
    src: "/assets/hero/fabric-hero.jpg",
    alt: "Bespoke African fashion — artisan silhouette against woven textile light",
  },
  /** Pillars of Craft — three category entry points */
  pillars: {
    clothing: {
      src: "/assets/pillars/african-clothing.png",
      alt: "Bespoke African clothing — tailored garment on display",
    },
    bags: {
      src: "/assets/pillars/Bespokebag.png",
      alt: "Handcrafted Ankara bag — woven and sculpted carry",
    },
    bracelets: {
      src: "/assets/pillars/hand-adorned-with-jewelry.jpg",
      alt: "Artisan beaded bracelet — cast and beaded adornment",
    },
  },
  /** Chapter II — Artisan Window editorial panels */
  artisanWindow: {
    workshopLagos: {
      src: "/assets/artisan-window/portrait-of-an-african-dressmaker-.jpg",
      alt: "Amara Okafor at work in her Lagos atelier",
      caption: "Amara Okafor · Lagos workshop",
    },
    ankaraGown: {
      src: "/assets/artisan-window/woman-designs-fashion.jpg",
      alt: "Royal Ankara gown — hand-finished floor-length silhouette",
      caption: "Royal Ankara · hand-finished silhouette",
    },
  },
} as const;

/** Editorial & layout imagery (shared with other routes) */
export const SITE_IMAGES = {
  hero: {
    homepageCover: LANDING_PAGE.hero.src,
  },
  pillars: {
    clothing: LANDING_PAGE.pillars.clothing.src,
    bags: LANDING_PAGE.pillars.bags.src,
    bracelets: LANDING_PAGE.pillars.bracelets.src,
  },
  artisanWindow: {
    workshopLagos: LANDING_PAGE.artisanWindow.workshopLagos.src,
    ankaraGown: LANDING_PAGE.artisanWindow.ankaraGown.src,
  },
  workshop: {
    defaultWorkshop: "/assets/workshop/default-workshop.jpg",
  },
  fabric: {
    defaultTextile: "/assets/fabric/default-textile.jpg",
  },
  legacyHero: {
    main: "/assets/legacy/hero-main.jpg",
    accent: "/assets/legacy/hero-accent.jpg",
  },
} as const;

/** Artisan behind-the-stitch gallery images keyed by artisan id */
export const ARTISAN_GALLERY_IMAGES: Record<string, readonly string[]> = {
  "a1111111-1111-1111-1111-111111111111": [
    "/assets/artisans/amara/gallery-1.jpg",
    "/assets/artisans/amara/gallery-2.jpg",
    "/assets/artisans/amara/gallery-3.jpg",
  ],
  "a2222222-2222-2222-2222-222222222222": [
    "/assets/artisans/zinhle/gallery-1.jpg",
    "/assets/artisans/zinhle/gallery-2.jpg",
  ],
  "a3333333-3333-3333-3333-333333333333": [
    "/assets/artisans/fatou/gallery-1.jpg",
    "/assets/artisans/fatou/gallery-2.jpg",
    "/assets/artisans/fatou/gallery-3.jpg",
  ],
};

/** Product catalog images keyed by product id */
export const PRODUCT_IMAGES: Record<string, string> = {
  "p1111111-1111-1111-1111-111111111111": "/assets/products/royal-crown-dress.jpg",
  "p1111111-1111-1111-1111-111111111112": "/assets/products/beautiful-asian-woman-wearing-hat-in-white-dress-s.jpg",
  "p1111111-1111-1111-1111-111111111113": "/assets/products/man-in-embroidered-shirt-walks-through-greenery.jpg",
  "p2222222-2222-2222-2222-222222222221": "/assets/products/man-posing-in-blue-plaid-outfit-in-alleyway.jpg",
  "p2222222-2222-2222-2222-222222222222": "/assets/products/tourist-smiling-and-wearing-traditional-maasai-clo.jpg",
  "p2222222-2222-2222-2222-222222222223": "/assets/products/traveler-men-phone-and-social-media-on-vacation.jpg",
  "p3333333-3333-3333-3333-333333333331": "/assets/products/woman-enjoying-sunny-safari-adventure.jpg",
  "p3333333-3333-3333-3333-333333333332": "/assets/products/woman-posing-in-embroidered-dress-in-green-field.jpg",
  "p3333333-3333-3333-3333-333333333333": "/assets/products/young-woman-in-casual-traditional-white-clothes.jpg",
  "p1111111-1111-1111-1111-111111111114": "/assets/products/cheerful-beautiful-middle-age-woman-caucasian-read.jpg",
  "p2222222-2222-2222-2222-222222222224": "/assets/products/elegant-gold-bracelet-and-silver-ring-detail.jpg",
  "p3333333-3333-3333-3333-333333333334": "/assets/products/hand-adorned-with-mardi-gras-beads-at-festival.jpg",
  "p1111111-1111-1111-1111-111111111115": "/assets/products/woman-in-jeans-with-beaded-necklace.jpg",
  "p3333333-3333-3333-3333-333333333335": "/assets/products/woman-s-arm-with-beaded-bracelets-at-home.jpg",
  "p2222222-2222-2222-2222-222222222225": "/assets/products/woman-with-colorful-bag-and-patterned-dress.jpg",
};

export function productImageUrl(productId: string): string {
  return PRODUCT_IMAGES[productId] ?? SITE_IMAGES.fabric.defaultTextile;
}

export function artisanGalleryUrls(artisanId: string): string[] {
  return [...(ARTISAN_GALLERY_IMAGES[artisanId] ?? [])];
}

/** JSON array string for SQL seed inserts */
export function artisanGalleryJson(artisanId: string): string {
  return JSON.stringify(artisanGalleryUrls(artisanId));
}
