-- Migration 002: palette colors, artisan social impact, customization_snapshot column
-- Run on existing Nyuzi databases created before this migration:
--   psql "$DATABASE_URL" -f database/migrations/002_palette_social_impact_customization.sql

do $$ begin
  create type palette_color as enum (
    'indigo_blue',
    'ochre_red',
    'kente_gold',
    'mud_brown',
    'emerald_green',
    'cowrie_cream'
  );
exception
  when duplicate_object then null;
end $$;

alter table artisans
  add column if not exists social_impact text;

alter table products
  add column if not exists palette_color palette_color not null default 'mud_brown';

alter table orders
  add column if not exists customization_snapshot jsonb;

update orders
set customization_snapshot = measurement_snapshot
where customization_snapshot is null
  and measurement_snapshot is not null;

alter table orders
  alter column customization_snapshot set not null;

-- Optional: drop legacy column after verifying app reads customization_snapshot
-- alter table orders drop column if exists measurement_snapshot;

create index if not exists idx_products_palette
  on products(palette_color) where is_active = true;

-- Seed palette + social impact for known demo IDs (safe to re-run)
update artisans set social_impact = 'Supporting 4 traditional female weavers in Enugu, Nigeria'
where slug = 'amara-okafor';

update artisans set social_impact = 'Mentoring 6 young seamstresses through Johannesburg township cooperatives'
where slug = 'zinhle-mthembu';

update artisans set social_impact = 'Commissioning 3 Kente loom elders across Kumasi and Accra, Ghana'
where slug = 'fatou-diallo';

update products set palette_color = 'ochre_red'::palette_color where id = 'p1111111-1111-1111-1111-111111111111';
update products set palette_color = 'ochre_red'::palette_color where id = 'p1111111-1111-1111-1111-111111111112';
update products set palette_color = 'kente_gold'::palette_color where id = 'p1111111-1111-1111-1111-111111111113';
update products set palette_color = 'indigo_blue'::palette_color where id = 'p2222222-2222-2222-2222-222222222221';
update products set palette_color = 'indigo_blue'::palette_color where id = 'p2222222-2222-2222-2222-222222222222';
update products set palette_color = 'cowrie_cream'::palette_color where id = 'p2222222-2222-2222-2222-222222222223';
update products set palette_color = 'kente_gold'::palette_color where id = 'p3333333-3333-3333-3333-333333333331';
update products set palette_color = 'kente_gold'::palette_color where id = 'p3333333-3333-3333-3333-333333333332';
update products set palette_color = 'emerald_green'::palette_color where id = 'p3333333-3333-3333-3333-333333333333';
update products set palette_color = 'ochre_red'::palette_color where id = 'p1111111-1111-1111-1111-111111111114';
update products set palette_color = 'mud_brown'::palette_color where id = 'p2222222-2222-2222-2222-222222222224';
update products set palette_color = 'mud_brown'::palette_color where id = 'p3333333-3333-3333-3333-333333333334';
update products set palette_color = 'kente_gold'::palette_color where id = 'p1111111-1111-1111-1111-111111111115';
update products set palette_color = 'mud_brown'::palette_color where id = 'p3333333-3333-3333-3333-333333333335';
update products set palette_color = 'emerald_green'::palette_color where id = 'p2222222-2222-2222-2222-222222222225';
