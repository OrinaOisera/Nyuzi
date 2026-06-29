#!/usr/bin/env bash
# Copies a local placeholder into every public/assets path.
# Replace files under public/assets/ with your own — paths match lib/assets.ts.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PLACEHOLDER="$ROOT/public/overlays/garment.png"

paths=(
  /assets/hero/homepage-cover.jpg
  /assets/pillars/clothing.jpg
  /assets/pillars/bags.jpg
  /assets/pillars/bracelets.jpg
  /assets/artisan-window/workshop-lagos.jpg
  /assets/artisan-window/ankara-gown.jpg
  /assets/workshop/default-workshop.jpg
  /assets/fabric/default-textile.jpg
  /assets/legacy/hero-main.jpg
  /assets/legacy/hero-accent.jpg
  /assets/artisans/amara/gallery-1.jpg
  /assets/artisans/amara/gallery-2.jpg
  /assets/artisans/amara/gallery-3.jpg
  /assets/artisans/zinhle/gallery-1.jpg
  /assets/artisans/zinhle/gallery-2.jpg
  /assets/artisans/fatou/gallery-1.jpg
  /assets/artisans/fatou/gallery-2.jpg
  /assets/artisans/fatou/gallery-3.jpg
  /assets/products/royal-ankara-gown.jpg
  /assets/products/sunset-celebration-dress.jpg
  /assets/products/lagos-casual-wrap.jpg
  /assets/products/shweshwe-gala-gown.jpg
  /assets/products/heritage-wedding-ensemble.jpg
  /assets/products/johannesburg-day-dress.jpg
  /assets/products/ashanti-kente-stole.jpg
  /assets/products/golden-kente-bridal.jpg
  /assets/products/festival-kente-top.jpg
  /assets/products/lagos-ankara-tote.jpg
  /assets/products/crossbody-ankara-clutch.jpg
  /assets/products/kente-weekender.jpg
  /assets/products/waist-bead-chain.jpg
  /assets/products/brass-cuff-bracelet.jpg
  /assets/products/heritage-bead-bracelet.jpg
)

for path in "${paths[@]}"; do
  dest="$ROOT/public$path"
  mkdir -p "$(dirname "$dest")"
  cp "$PLACEHOLDER" "$dest"
  echo "→ $path"
done

echo ""
echo "Populated ${#paths[@]} asset files from public/overlays/garment.png"
