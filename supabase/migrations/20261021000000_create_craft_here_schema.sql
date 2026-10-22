-- ==============================================================================
-- CRAFT-HERE.COM — PRODUCTION POSTGRESQL / SUPABASE DATABASE SCHEMA
-- Migration: 20261021000000_create_craft_here_schema.sql
-- Description: Core tables, constraints, foreign keys, indexes, and RLS policies
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM TYPES & ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'artisan', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_status AS ENUM ('draft', 'pending_review', 'published', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'processing', 'in_production', 'shipped', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('unpaid', 'authorized', 'captured', 'refunded', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status AS ENUM ('unverified', 'submitted', 'guild_verified', 'admin_verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 4. ARTISAN PROFILES
CREATE TABLE IF NOT EXISTS public.artisan_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    business_name TEXT NOT NULL,
    craft_specialty TEXT NOT NULL,
    region TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    bio TEXT NOT NULL,
    story TEXT,
    workshop_location TEXT,
    years_of_experience INTEGER CHECK (years_of_experience >= 0),
    avatar_url TEXT,
    cover_image_url TEXT,
    is_approved BOOLEAN NOT NULL DEFAULT false,
    verification_status verification_status NOT NULL DEFAULT 'submitted',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 5. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 6. PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artisan_id UUID NOT NULL REFERENCES public.artisan_profiles(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    compare_at_price DECIMAL(10, 2) CHECK (compare_at_price IS NULL OR compare_at_price > price),
    cost_price DECIMAL(10, 2) CHECK (cost_price IS NULL OR cost_price >= 0),
    currency TEXT NOT NULL DEFAULT 'USD',
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    craft_type TEXT NOT NULL,
    region_of_origin TEXT NOT NULL,
    materials TEXT[] NOT NULL DEFAULT '{}',
    dimensions TEXT,
    care_instructions TEXT,
    lead_time_days INTEGER DEFAULT 3,
    status product_status NOT NULL DEFAULT 'draft',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    tags TEXT[] NOT NULL DEFAULT '{}',
    verification_status verification_status NOT NULL DEFAULT 'unverified',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 7. PRODUCT IMAGES
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 8. PROVENANCE EVIDENCE & VERIFICATIONS
CREATE TABLE IF NOT EXISTS public.provenance_evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    artisan_id UUID REFERENCES public.artisan_profiles(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL, -- 'guild_certificate', 'workshop_photo', 'material_receipt', 'gi_tag'
    document_url TEXT NOT NULL,
    notes TEXT,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status verification_status NOT NULL DEFAULT 'submitted',
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 9. USER ADDRESSES
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    street_address TEXT NOT NULL,
    apartment TEXT,
    city TEXT NOT NULL,
    state_province TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL,
    phone TEXT,
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 10. CARTS & CART ITEMS (For persisted sessions)
CREATE TABLE IF NOT EXISTS public.carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    UNIQUE(cart_id, product_id)
);

-- 11. WISHLISTS & WISHLIST ITEMS
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.wishlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wishlist_id UUID NOT NULL REFERENCES public.wishlists(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    UNIQUE(wishlist_id, product_id)
);

-- 12. ORDERS & ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_email TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (shipping_cost >= 0),
    tax_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (tax_amount >= 0),
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    currency TEXT NOT NULL DEFAULT 'USD',
    order_status order_status NOT NULL DEFAULT 'pending',
    payment_status payment_status NOT NULL DEFAULT 'authorized',
    payment_method TEXT NOT NULL DEFAULT 'mock_checkout',
    payment_idempotency_key TEXT UNIQUE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- Order items store immutable historical snapshots
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    artisan_id UUID REFERENCES public.artisan_profiles(id) ON DELETE SET NULL,
    product_title_snapshot TEXT NOT NULL,
    unit_price_snapshot DECIMAL(10, 2) NOT NULL CHECK (unit_price_snapshot >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total_price_snapshot DECIMAL(10, 2) NOT NULL CHECK (total_price_snapshot >= 0),
    artisan_fulfillment_status order_status NOT NULL DEFAULT 'processing',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 13. NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 14. ARTISAN ONBOARDING APPLICATIONS
CREATE TABLE IF NOT EXISTS public.artisan_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    applicant_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    craft_type TEXT NOT NULL,
    workshop_location TEXT NOT NULL,
    story TEXT NOT NULL,
    portfolio_links TEXT[] DEFAULT '{}',
    status verification_status NOT NULL DEFAULT 'submitted',
    reviewer_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- ==============================================================================
-- INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_products_artisan_id ON public.products(artisan_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_artisan_id ON public.order_items(artisan_id);
CREATE INDEX IF NOT EXISTS idx_artisan_profiles_user_id ON public.artisan_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_artisan_profiles_slug ON public.artisan_profiles(slug);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisan_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provenance_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisan_applications ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can read and update their own profile; Admins can read all
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Categories: Publicly readable; Only Admins can modify
CREATE POLICY "Categories are publicly readable" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON public.categories
    FOR ALL USING (public.is_admin());

-- Artisan Profiles: Approved are readable by public; Artisans can update their own; Admins can manage all
CREATE POLICY "Public can view approved artisan profiles" ON public.artisan_profiles
    FOR SELECT USING (is_approved = true OR auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Artisans can update own profile" ON public.artisan_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all artisan profiles" ON public.artisan_profiles
    FOR ALL USING (public.is_admin());

-- Products: Published products are publicly readable; Artisans can manage their own; Admins can manage all
CREATE POLICY "Public can view published products" ON public.products
    FOR SELECT USING (
        status = 'published' 
        OR (auth.uid() IN (SELECT user_id FROM public.artisan_profiles WHERE id = products.artisan_id))
        OR public.is_admin()
    );

CREATE POLICY "Artisans can insert own products" ON public.products
    FOR INSERT WITH CHECK (
        auth.uid() IN (SELECT user_id FROM public.artisan_profiles WHERE id = artisan_id)
    );

CREATE POLICY "Artisans can update own products" ON public.products
    FOR UPDATE USING (
        auth.uid() IN (SELECT user_id FROM public.artisan_profiles WHERE id = artisan_id)
        OR public.is_admin()
    );

CREATE POLICY "Artisans can delete own draft products" ON public.products
    FOR DELETE USING (
        (auth.uid() IN (SELECT user_id FROM public.artisan_profiles WHERE id = artisan_id) AND status = 'draft')
        OR public.is_admin()
    );

-- Product Images: Publicly readable; Artisan or admin can manage
CREATE POLICY "Public can view product images" ON public.product_images
    FOR SELECT USING (true);

CREATE POLICY "Artisans can manage images of their products" ON public.product_images
    FOR ALL USING (
        auth.uid() IN (
            SELECT ap.user_id FROM public.products p
            JOIN public.artisan_profiles ap ON ap.id = p.artisan_id
            WHERE p.id = product_images.product_id
        ) OR public.is_admin()
    );

-- Orders: Customers can view their own orders; Admins can view all
CREATE POLICY "Users can view own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

-- Order Items: Visible to the purchasing user, or the artisan who made the item, or admin
CREATE POLICY "Users and Artisans can view relevant order items" ON public.order_items
    FOR SELECT USING (
        auth.uid() IN (SELECT user_id FROM public.orders WHERE id = order_items.order_id)
        OR auth.uid() IN (SELECT user_id FROM public.artisan_profiles WHERE id = order_items.artisan_id)
        OR public.is_admin()
    );

CREATE POLICY "Artisans can update fulfillment status on their items" ON public.order_items
    FOR UPDATE USING (
        auth.uid() IN (SELECT user_id FROM public.artisan_profiles WHERE id = order_items.artisan_id)
        OR public.is_admin()
    );

-- Wishlists: Authenticated users manage their own wishlist
CREATE POLICY "Users can manage own wishlist" ON public.wishlists
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlist items" ON public.wishlist_items
    FOR ALL USING (
        auth.uid() IN (SELECT user_id FROM public.wishlists WHERE id = wishlist_items.wishlist_id)
    );

-- Newsletter: Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view newsletter subscribers" ON public.newsletter_subscribers
    FOR SELECT USING (public.is_admin());
