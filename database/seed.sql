-- Nyuzi Seed Data for Aurora PostgreSQL
-- Run AFTER schema.sql
-- Image paths mirror lib/assets.ts — drop files into public/assets/ to match.

-- Demo buyer (used for hackathon checkout when auth is not wired up)
insert into profiles (id, email, full_name, role) values
  ('b0000000-0000-0000-0000-000000000001', 'demo.buyer@nyuzi.app', 'Demo Buyer', 'buyer')
on conflict (id) do nothing;

-- Artisan profiles
insert into profiles (id, email, full_name, role) values
  ('11111111-1111-1111-1111-111111111111', 'amara@nyuzi.app', 'Amara Okafor', 'artisan'),
  ('22222222-2222-2222-2222-222222222222', 'zinhle@nyuzi.app', 'Zinhle Mthembu', 'artisan'),
  ('33333333-3333-3333-3333-333333333333', 'fatou@nyuzi.app', 'Fatou Diallo', 'artisan')
on conflict (id) do nothing;

insert into artisans (
  id, user_id, display_name, slug, location, story, social_impact,
  heritage_video_url, behind_the_stitch_gallery
) values
(
  'a1111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'Amara Okafor',
  'amara-okafor',
  'Lagos, Nigeria',
  'Third-generation tailor from Lagos. Amara weaves stories of Yoruba heritage into every Ankara stitch, honoring her grandmother''s workshop traditions.',
  'Supporting 4 traditional female weavers in Enugu, Nigeria',
  'https://www.youtube.com/embed/ScMzIvxBSi4',
  '["/assets/artisans/amara/gallery-1.jpg","/assets/artisans/amara/gallery-2.jpg","/assets/artisans/amara/gallery-3.jpg"]'::jsonb
),
(
  'a2222222-2222-2222-2222-222222222222',
  '22222222-2222-2222-2222-222222222222',
  'Zinhle Mthembu',
  'zinhle-mthembu',
  'Johannesburg, South Africa',
  'Master of Shweshwe and contemporary African formal wear. Zinhle blends Xhosa ceremonial traditions with modern silhouettes for the global stage.',
  'Mentoring 6 young seamstresses through Johannesburg township cooperatives',
  'https://www.youtube.com/embed/ScMzIvxBSi4',
  '["/assets/artisans/zinhle/gallery-1.jpg","/assets/artisans/zinhle/gallery-2.jpg"]'::jsonb
),
(
  'a3333333-3333-3333-3333-333333333333',
  '33333333-3333-3333-3333-333333333333',
  'Fatou Diallo',
  'fatou-diallo',
  'Accra, Ghana',
  'Kente specialist from Kumasi. Each cloth Fatou creates carries the weight of Ashanti royal history — gold threads telling stories of kings and queens.',
  'Commissioning 3 Kente loom elders across Kumasi and Accra, Ghana',
  'https://www.youtube.com/embed/ScMzIvxBSi4',
  '["/assets/artisans/fatou/gallery-1.jpg","/assets/artisans/fatou/gallery-2.jpg","/assets/artisans/fatou/gallery-3.jpg"]'::jsonb
)
on conflict (id) do nothing;

insert into products (
  id, artisan_id, name, description, category, fabric_name, fabric_history,
  occasion, palette_color, price_cents, image_url, overlay_png_url
) values
('p1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Royal Ankara Gown', 'Floor-length Ankara gown with hand-beaded bodice', 'garment', 'Ankara', 'Ankara (Dutch wax print) arrived in West Africa in the 19th century and became a symbol of African identity and pride.', 'traditional_wedding', 'ochre_red', 28500, '/assets/products/royal-crown-dress.jpg', '/overlays/garment.svg'),
('p1111111-1111-1111-1111-111111111112', 'a1111111-1111-1111-1111-111111111111', 'Sunset Celebration Dress', 'Vibrant midi dress perfect for festive gatherings', 'garment', 'Ankara', 'Ankara patterns often tell stories through symbolic motifs passed down through generations.', 'celebration', 'ochre_red', 19500, '/assets/products/beautiful-asian-woman-wearing-hat-in-white-dress-s.jpg', '/overlays/garment.svg'),
('p1111111-1111-1111-1111-111111111113', 'a1111111-1111-1111-1111-111111111111', 'Lagos Casual Wrap', 'Effortless wrap dress for everyday elegance', 'garment', 'Ankara', 'Modern Ankara fashion bridges traditional West African aesthetics with contemporary global style.', 'casual_wear', 'kente_gold', 12500, '/assets/products/man-in-embroidered-shirt-walks-through-greenery.jpg', '/overlays/garment.svg'),
('p2222222-2222-2222-2222-222222222221', 'a2222222-2222-2222-2222-222222222222', 'Shweshwe Gala Gown', 'Structured ball gown in indigo Shweshwe', 'garment', 'Shweshwe', 'Shweshwe is South Africa''s traditional dyed cotton fabric, adopted by Xhosa women as ceremonial dress.', 'formal_gala', 'indigo_blue', 35000, '/assets/products/man-posing-in-blue-plaid-outfit-in-alleyway.jpg', '/overlays/garment.svg'),
('p2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'Heritage Wedding Ensemble', 'Two-piece Shweshwe bridal set with headwrap', 'garment', 'Shweshwe', 'In Xhosa tradition, Shweshwe is worn at umabo ceremonies, symbolizing the bride''s transition into married life.', 'traditional_wedding', 'indigo_blue', 42000, '/assets/products/tourist-smiling-and-wearing-traditional-maasai-clo.jpg', '/overlays/garment.svg'),
('p2222222-2222-2222-2222-222222222223', 'a2222222-2222-2222-2222-222222222222', 'Johannesburg Day Dress', 'Lightweight Shweshwe day dress', 'garment', 'Shweshwe', 'Contemporary South African designers have elevated Shweshwe from rural tradition to international runway fashion.', 'casual_wear', 'cowrie_cream', 15800, '/assets/products/traveler-men-phone-and-social-media-on-vacation.jpg', '/overlays/garment.svg'),
('p3333333-3333-3333-3333-333333333331', 'a3333333-3333-3333-3333-333333333333', 'Ashanti Kente Stole', 'Handwoven Kente ceremonial stole', 'garment', 'Kente', 'Kente cloth originates from the Ashanti Kingdom of Ghana, dating to the 17th century.', 'formal_gala', 'kente_gold', 22000, '/assets/products/woman-enjoying-sunny-safari-adventure.jpg', '/overlays/garment.svg'),
('p3333333-3333-3333-3333-333333333332', 'a3333333-3333-3333-3333-333333333333', 'Golden Kente Bridal', 'Full Kente wedding dress with gold thread accents', 'garment', 'Kente', 'Kente was once reserved for Ashanti royalty. Today it adorns weddings across the African diaspora.', 'traditional_wedding', 'kente_gold', 55000, '/assets/products/woman-posing-in-embroidered-dress-in-green-field.jpg', '/overlays/garment.svg'),
('p3333333-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'Festival Kente Top', 'Bold Kente crop top for celebrations', 'garment', 'Kente', 'The adweneasa pattern is among the most prestigious Kente designs, woven only by master craftsmen.', 'celebration', 'emerald_green', 16800, '/assets/products/young-woman-in-casual-traditional-white-clothes.jpg', '/overlays/garment.svg'),
('p1111111-1111-1111-1111-111111111114', 'a1111111-1111-1111-1111-111111111111', 'Lagos Ankara Tote', 'Structured tote with reinforced handles — pick your Ankara print', 'bag', 'Ankara', 'Each tote is cut from premium Dutch wax print, chosen for durability and bold pattern alignment at the seams.', 'casual_wear', 'ochre_red', 8500, '/assets/products/cheerful-beautiful-middle-age-woman-caucasian-read.jpg', '/overlays/garment.svg'),
('p2222222-2222-2222-2222-222222222224', 'a2222222-2222-2222-2222-222222222222', 'Crossbody Ankara Clutch', 'Compact crossbody with adjustable strap and magnetic closure', 'bag', 'Ankara', 'Zinhle selects Ankara prints that wrap seamlessly around the clutch body for a continuous pattern story.', 'celebration', 'mud_brown', 7200, '/assets/products/elegant-gold-bracelet-and-silver-ring-detail.jpg', '/overlays/garment.svg'),
('p3333333-3333-3333-3333-333333333334', 'a3333333-3333-3333-3333-333333333333', 'Kente Weekender', 'Spacious weekender with interior pockets — Ankara lining options', 'bag', 'Ankara', 'Fatou pairs exterior Kente panels with your chosen Ankara print for the lining and base panel.', 'casual_wear', 'mud_brown', 14500, '/assets/products/hand-adorned-with-mardi-gras-beads-at-festival.jpg', '/overlays/garment.svg'),
('p1111111-1111-1111-1111-111111111115', 'a1111111-1111-1111-1111-111111111111', 'Waist Bead Chain', 'Hand-strung waist chain — choose bead colors and weaving pattern', 'accessory', 'Glass beads', 'West African waist beads carry cultural significance — Amara strings each piece to your chosen size and palette.', 'celebration', 'kente_gold', 4500, '/assets/products/woman-in-jeans-with-beaded-necklace.jpg', '/overlays/garment.svg'),
('p3333333-3333-3333-3333-333333333335', 'a3333333-3333-3333-3333-333333333333', 'Brass Cuff Bracelet', 'Hand-forged brass cuff — customize finish and optional engraving', 'accessory', 'Brass', 'Ashanti brasswork traditions inspire Fatou''s cuffs — each piece is shaped, polished, and finished by hand in Accra.', 'formal_gala', 'mud_brown', 6800, '/assets/products/woman-s-arm-with-beaded-bracelets-at-home.jpg', '/overlays/garment.svg'),
('p2222222-2222-2222-2222-222222222225', 'a2222222-2222-2222-2222-222222222222', 'Heritage Bead Bracelet', 'Stackable bracelet or ankle chain in glass beads or brass accents', 'accessory', 'Beads & brass', 'Zinhle blends Xhosa beadwork color symbolism with contemporary stacking styles for everyday wear.', 'casual_wear', 'emerald_green', 5200, '/assets/products/woman-with-colorful-bag-and-patterned-dress.jpg', '/overlays/garment.svg')
on conflict (id) do nothing;
