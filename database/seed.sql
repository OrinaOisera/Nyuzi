-- Nyuzi Seed Data for Aurora PostgreSQL
-- Run AFTER schema.sql

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

insert into artisans (id, user_id, display_name, slug, location, story, heritage_video_url, behind_the_stitch_gallery) values
(
  'a1111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'Amara Okafor',
  'amara-okafor',
  'Lagos, Nigeria',
  'Third-generation tailor from Lagos. Amara weaves stories of Yoruba heritage into every Ankara stitch, honoring her grandmother''s workshop traditions.',
  'https://www.youtube.com/embed/ScMzIvxBSi4',
  '["https://images.unsplash.com/photo-1558171813-4c088a7d4e8f?w=400","https://images.unsplash.com/photo-1583292655851-d4c9b3f5d375?w=400","https://images.unsplash.com/photo-1594932224828-944e85e3e6a8?w=400"]'::jsonb
),
(
  'a2222222-2222-2222-2222-222222222222',
  '22222222-2222-2222-2222-222222222222',
  'Zinhle Mthembu',
  'zinhle-mthembu',
  'Johannesburg, South Africa',
  'Master of Shweshwe and contemporary African formal wear. Zinhle blends Xhosa ceremonial traditions with modern silhouettes for the global stage.',
  'https://www.youtube.com/embed/ScMzIvxBSi4',
  '["https://images.unsplash.com/photo-1610030469983-98e550d619fa?w=400","https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400"]'::jsonb
),
(
  'a3333333-3333-3333-3333-333333333333',
  '33333333-3333-3333-3333-333333333333',
  'Fatou Diallo',
  'fatou-diallo',
  'Accra, Ghana',
  'Kente specialist from Kumasi. Each cloth Fatou creates carries the weight of Ashanti royal history — gold threads telling stories of kings and queens.',
  'https://www.youtube.com/embed/ScMzIvxBSi4',
  '["https://images.unsplash.com/photo-1572804013309-59a88b7e92c1?w=400","https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400","https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400"]'::jsonb
)
on conflict (id) do nothing;

insert into products (id, artisan_id, name, description, category, fabric_name, fabric_history, occasion, price_cents, image_url, overlay_png_url) values
('p1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Royal Ankara Gown', 'Floor-length Ankara gown with hand-beaded bodice', 'garment', 'Ankara', 'Ankara (Dutch wax print) arrived in West Africa in the 19th century and became a symbol of African identity and pride.', 'traditional_wedding', 28500, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', '/overlays/garment.svg'),
('p1111111-1111-1111-1111-111111111112', 'a1111111-1111-1111-1111-111111111111', 'Sunset Celebration Dress', 'Vibrant midi dress perfect for festive gatherings', 'garment', 'Ankara', 'Ankara patterns often tell stories through symbolic motifs passed down through generations.', 'celebration', 19500, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600', '/overlays/garment.svg'),
('p1111111-1111-1111-1111-111111111113', 'a1111111-1111-1111-1111-111111111111', 'Lagos Casual Wrap', 'Effortless wrap dress for everyday elegance', 'garment', 'Ankara', 'Modern Ankara fashion bridges traditional West African aesthetics with contemporary global style.', 'casual_wear', 12500, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92c1?w=600', '/overlays/garment.svg'),
('p2222222-2222-2222-2222-222222222221', 'a2222222-2222-2222-2222-222222222222', 'Shweshwe Gala Gown', 'Structured ball gown in indigo Shweshwe', 'garment', 'Shweshwe', 'Shweshwe is South Africa''s traditional dyed cotton fabric, adopted by Xhosa women as ceremonial dress.', 'formal_gala', 35000, 'https://images.unsplash.com/photo-1610030469983-98e550d619fa?w=600', '/overlays/garment.svg'),
('p2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'Heritage Wedding Ensemble', 'Two-piece Shweshwe bridal set with headwrap', 'garment', 'Shweshwe', 'In Xhosa tradition, Shweshwe is worn at umabo ceremonies, symbolizing the bride''s transition into married life.', 'traditional_wedding', 42000, 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600', '/overlays/garment.svg'),
('p2222222-2222-2222-2222-222222222223', 'a2222222-2222-2222-2222-222222222222', 'Johannesburg Day Dress', 'Lightweight Shweshwe day dress', 'garment', 'Shweshwe', 'Contemporary South African designers have elevated Shweshwe from rural tradition to international runway fashion.', 'casual_wear', 15800, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', '/overlays/garment.svg'),
('p3333333-3333-3333-3333-333333333331', 'a3333333-3333-3333-3333-333333333333', 'Ashanti Kente Stole', 'Handwoven Kente ceremonial stole', 'garment', 'Kente', 'Kente cloth originates from the Ashanti Kingdom of Ghana, dating to the 17th century.', 'formal_gala', 22000, 'https://images.unsplash.com/photo-1558171813-4c088a7d4e8f?w=600', '/overlays/garment.svg'),
('p3333333-3333-3333-3333-333333333332', 'a3333333-3333-3333-3333-333333333333', 'Golden Kente Bridal', 'Full Kente wedding dress with gold thread accents', 'garment', 'Kente', 'Kente was once reserved for Ashanti royalty. Today it adorns weddings across the African diaspora.', 'traditional_wedding', 55000, 'https://images.unsplash.com/photo-1583292655851-d4c9b3f5d375?w=600', '/overlays/garment.svg'),
('p3333333-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'Festival Kente Top', 'Bold Kente crop top for celebrations', 'garment', 'Kente', 'The adweneasa pattern is among the most prestigious Kente designs, woven only by master craftsmen.', 'celebration', 16800, 'https://images.unsplash.com/photo-1594932224828-944e85e3e6a8?w=600', '/overlays/garment.svg'),
('p1111111-1111-1111-1111-111111111114', 'a1111111-1111-1111-1111-111111111111', 'Lagos Ankara Tote', 'Structured tote with reinforced handles — pick your Ankara print', 'bag', 'Ankara', 'Each tote is cut from premium Dutch wax print, chosen for durability and bold pattern alignment at the seams.', 'casual_wear', 8500, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600', '/overlays/garment.svg'),
('p2222222-2222-2222-2222-222222222224', 'a2222222-2222-2222-2222-222222222222', 'Crossbody Ankara Clutch', 'Compact crossbody with adjustable strap and magnetic closure', 'bag', 'Ankara', 'Zinhle selects Ankara prints that wrap seamlessly around the clutch body for a continuous pattern story.', 'celebration', 7200, 'https://images.unsplash.com/photo-1584917865442-de89df76aed3?w=600', '/overlays/garment.svg'),
('p3333333-3333-3333-3333-333333333334', 'a3333333-3333-3333-3333-333333333333', 'Kente Weekender', 'Spacious weekender with interior pockets — Ankara lining options', 'bag', 'Ankara', 'Fatou pairs exterior Kente panels with your chosen Ankara print for the lining and base panel.', 'casual_wear', 14500, 'https://images.unsplash.com/photo-1548036328-c9fa89d12836?w=600', '/overlays/garment.svg'),
('p1111111-1111-1111-1111-111111111115', 'a1111111-1111-1111-1111-111111111111', 'Waist Bead Chain', 'Hand-strung waist chain — choose bead colors and weaving pattern', 'accessory', 'Glass beads', 'West African waist beads carry cultural significance — Amara strings each piece to your chosen size and palette.', 'celebration', 4500, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', '/overlays/garment.svg'),
('p3333333-3333-3333-3333-333333333335', 'a3333333-3333-3333-3333-333333333333', 'Brass Cuff Bracelet', 'Hand-forged brass cuff — customize finish and optional engraving', 'accessory', 'Brass', 'Ashanti brasswork traditions inspire Fatou''s cuffs — each piece is shaped, polished, and finished by hand in Accra.', 'formal_gala', 6800, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', '/overlays/garment.svg'),
('p2222222-2222-2222-2222-222222222225', 'a2222222-2222-2222-2222-222222222222', 'Heritage Bead Bracelet', 'Stackable bracelet or ankle chain in glass beads or brass accents', 'accessory', 'Beads & brass', 'Zinhle blends Xhosa beadwork color symbolism with contemporary stacking styles for everyday wear.', 'casual_wear', 5200, 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600', '/overlays/garment.svg')
on conflict (id) do nothing;
