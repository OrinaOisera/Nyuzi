-- Nyuzi Database Schema for AWS Aurora PostgreSQL
-- Run against your Aurora cluster (psql, RDS Query Editor, or migration tool).

create extension if not exists "uuid-ossp";

create type user_role as enum ('buyer', 'artisan', 'admin');
create type occasion_type as enum (
  'traditional_wedding',
  'formal_gala',
  'celebration',
  'casual_wear'
);
create type order_status as enum ('pending', 'paid', 'fulfilled', 'cancelled');
create type product_category as enum ('garment', 'bag', 'accessory');

create table profiles (
  id uuid primary key default uuid_generate_v4(),
  email text unique,
  full_name text,
  avatar_url text,
  role user_role not null default 'buyer',
  created_at timestamptz not null default now()
);

create table artisans (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  display_name text not null,
  slug text unique,
  location text,
  story text,
  heritage_video_url text,
  behind_the_stitch_gallery jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table products (
  id uuid primary key default uuid_generate_v4(),
  artisan_id uuid not null references artisans(id) on delete cascade,
  name text not null,
  description text,
  category product_category not null default 'garment',
  fabric_name text not null,
  fabric_history text,
  occasion occasion_type not null default 'casual_wear',
  price_cents integer not null check (price_cents > 0),
  image_url text not null,
  overlay_png_url text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table measurements (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  bust_cm numeric(5,1) not null,
  waist_cm numeric(5,1) not null,
  hips_cm numeric(5,1) not null,
  height_cm numeric(5,1) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default uuid_generate_v4(),
  buyer_id uuid not null references profiles(id) on delete cascade,
  artisan_id uuid not null references artisans(id) on delete restrict,
  product_id uuid not null references products(id) on delete restrict,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  amount_cents integer not null,
  status order_status not null default 'pending',
  measurement_snapshot jsonb not null,
  created_at timestamptz not null default now()
);

create index idx_products_occasion on products(occasion) where is_active = true;
create index idx_products_category on products(category) where is_active = true;
create index idx_products_artisan on products(artisan_id);
create index idx_orders_buyer on orders(buyer_id);
create index idx_measurements_user on measurements(user_id, updated_at desc);
