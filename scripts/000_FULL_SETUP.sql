-- ============================================================
-- BoostACart Full Database Setup Script
-- ============================================================
-- This script can be run on any fresh Supabase instance
-- It is fully idempotent and safe to run multiple times
-- ============================================================

-- ============================================================
-- PART 1: Core Tables and Functions
-- ============================================================

-- Create plan type as TEXT with CHECK constraint (better than ENUM for flexibility)
-- Plans: Free ($0, 50 leads/month), Starter ($19, 600 leads/month), Pro ($99, unlimited)

-- Create stores table
CREATE TABLE IF NOT EXISTS public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  domain TEXT,
  shopify_domain TEXT,
  store_slug TEXT UNIQUE,
  plan TEXT NOT NULL DEFAULT 'Free' CHECK (plan IN ('Free', 'Starter', 'Pro')),
  max_leads INTEGER NOT NULL DEFAULT 50,
  total_leads INTEGER DEFAULT 0,
  leads_this_month INTEGER DEFAULT 0,
  leads_today INTEGER DEFAULT 0,
  remaining_leads INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  name TEXT,
  product_name TEXT,
  product_url TEXT,
  variant_id TEXT,
  quantity INTEGER DEFAULT 1,
  source_url TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_leads table (for bookmarking important leads)
CREATE TABLE IF NOT EXISTS public.saved_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lead_id, store_id)
);

-- Create widget_settings table
CREATE TABLE IF NOT EXISTS public.widget_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL UNIQUE REFERENCES public.stores(id) ON DELETE CASCADE,
  heading TEXT DEFAULT 'Get Exclusive Discount!',
  description TEXT DEFAULT 'Leave your details and we''ll send you a special offer',
  button_text TEXT DEFAULT 'Get My Discount',
  background_color TEXT DEFAULT '#ffffff',
  text_color TEXT DEFAULT '#1f2937',
  button_color TEXT DEFAULT '#3b82f6',
  overlay_opacity NUMERIC DEFAULT 0.8,
  is_active BOOLEAN DEFAULT true,
  show_email BOOLEAN DEFAULT true,
  show_phone BOOLEAN DEFAULT false,
  discount_code TEXT,
  redirect_url TEXT,
  show_coupon_page BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table for user metadata
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin audit log table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  admin_identifier TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- PART 2: Helper Functions
-- ============================================================

-- Function to normalize domain (removes protocols, www, trailing slashes)
CREATE OR REPLACE FUNCTION public.normalize_domain(domain_input TEXT)
RETURNS TEXT AS $$
BEGIN
  IF domain_input IS NULL THEN
    RETURN NULL;
  END IF;
  
  RETURN TRIM(
    LOWER(
      REGEXP_REPLACE(
        REGEXP_REPLACE(domain_input, '^(https?://)?(www\.)?', '', 'i'),
        '/+$', '', 'g'
      )
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to generate store slug from domain
CREATE OR REPLACE FUNCTION public.generate_store_slug(domain_input TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN REPLACE(public.normalize_domain(domain_input), '.', '-');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to get max leads based on plan
CREATE OR REPLACE FUNCTION public.get_max_leads_for_plan(plan_name TEXT)
RETURNS INTEGER AS $$
BEGIN
  RETURN CASE
    WHEN plan_name = 'Free' THEN 50
    WHEN plan_name = 'Starter' THEN 600
    WHEN plan_name = 'Pro' THEN 999999
    ELSE 50
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================
-- PART 3: Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_stores_user_id ON public.stores(user_id);
CREATE INDEX IF NOT EXISTS idx_stores_domain ON public.stores(domain);
CREATE INDEX IF NOT EXISTS idx_stores_shopify_domain ON public.stores(shopify_domain);
CREATE INDEX IF NOT EXISTS idx_stores_store_slug ON public.stores(store_slug);
CREATE INDEX IF NOT EXISTS idx_leads_store_id ON public.leads(store_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_saved_leads_store_id ON public.saved_leads(store_id);
CREATE INDEX IF NOT EXISTS idx_saved_leads_lead_id ON public.saved_leads(lead_id);

-- ============================================================
-- PART 4: Triggers
-- ============================================================

-- Trigger to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, created_at, updated_at)
  VALUES (NEW.id, NEW.email, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to normalize domain and generate slug before insert/update
CREATE OR REPLACE FUNCTION public.normalize_store_before_save()
RETURNS TRIGGER AS $$
BEGIN
  -- Normalize domain if provided
  IF NEW.domain IS NOT NULL THEN
    NEW.domain := public.normalize_domain(NEW.domain);
  END IF;
  
  -- Generate store_slug from domain if not provided
  IF NEW.store_slug IS NULL AND NEW.domain IS NOT NULL THEN
    NEW.store_slug := public.generate_store_slug(NEW.domain);
  END IF;
  
  -- Set shopify_domain if not provided (fallback to domain)
  IF NEW.shopify_domain IS NULL AND NEW.domain IS NOT NULL THEN
    NEW.shopify_domain := NEW.domain;
  END IF;
  
  -- Set max_leads based on plan
  NEW.max_leads := public.get_max_leads_for_plan(NEW.plan);
  
  -- Update timestamp
  NEW.updated_at := NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS normalize_store_trigger ON public.stores;
CREATE TRIGGER normalize_store_trigger
  BEFORE INSERT OR UPDATE ON public.stores
  FOR EACH ROW EXECUTE FUNCTION public.normalize_store_before_save();

-- Trigger to auto-create widget_settings when store is created
CREATE OR REPLACE FUNCTION public.create_default_widget_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.widget_settings (store_id)
  VALUES (NEW.id)
  ON CONFLICT (store_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS create_widget_settings_trigger ON public.stores;
CREATE TRIGGER create_widget_settings_trigger
  AFTER INSERT ON public.stores
  FOR EACH ROW EXECUTE FUNCTION public.create_default_widget_settings();

-- ============================================================
-- PART 5: Row Level Security (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.widget_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own stores" ON public.stores;
DROP POLICY IF EXISTS "Users can insert their own stores" ON public.stores;
DROP POLICY IF EXISTS "Users can update their own stores" ON public.stores;
DROP POLICY IF EXISTS "Users can delete their own stores" ON public.stores;
DROP POLICY IF EXISTS "Public can read stores by domain" ON public.stores;

DROP POLICY IF EXISTS "Users can view leads for their stores" ON public.leads;
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Users can update leads for their stores" ON public.leads;
DROP POLICY IF EXISTS "Users can delete leads for their stores" ON public.leads;

DROP POLICY IF EXISTS "Users can view saved leads for their stores" ON public.saved_leads;
DROP POLICY IF EXISTS "Users can insert saved leads for their stores" ON public.saved_leads;
DROP POLICY IF EXISTS "Users can delete saved leads for their stores" ON public.saved_leads;

DROP POLICY IF EXISTS "Users can view widget settings for their stores" ON public.widget_settings;
DROP POLICY IF EXISTS "Users can update widget settings for their stores" ON public.widget_settings;
DROP POLICY IF EXISTS "Public can read widget settings" ON public.widget_settings;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Stores policies
CREATE POLICY "Users can view their own stores" ON public.stores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stores" ON public.stores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stores" ON public.stores
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stores" ON public.stores
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public can read stores by domain" ON public.stores
  FOR SELECT USING (true);

-- Leads policies
CREATE POLICY "Users can view leads for their stores" ON public.leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stores 
      WHERE stores.id = leads.store_id 
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Public can insert leads" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update leads for their stores" ON public.leads
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.stores 
      WHERE stores.id = leads.store_id 
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete leads for their stores" ON public.leads
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.stores 
      WHERE stores.id = leads.store_id 
      AND stores.user_id = auth.uid()
    )
  );

-- Saved leads policies
CREATE POLICY "Users can view saved leads for their stores" ON public.saved_leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stores 
      WHERE stores.id = saved_leads.store_id 
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert saved leads for their stores" ON public.saved_leads
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.stores 
      WHERE stores.id = saved_leads.store_id 
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete saved leads for their stores" ON public.saved_leads
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.stores 
      WHERE stores.id = saved_leads.store_id 
      AND stores.user_id = auth.uid()
    )
  );

-- Widget settings policies
CREATE POLICY "Users can view widget settings for their stores" ON public.widget_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stores 
      WHERE stores.id = widget_settings.store_id 
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update widget settings for their stores" ON public.widget_settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.stores 
      WHERE stores.id = widget_settings.store_id 
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Public can read widget settings" ON public.widget_settings
  FOR SELECT USING (true);

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- PART 6: Store Lead Stats VIEW/TABLE
-- ============================================================

-- Create store_lead_stats as a TABLE (not VIEW) for better performance
DROP TABLE IF EXISTS public.store_lead_stats CASCADE;
DROP VIEW IF EXISTS public.store_lead_stats CASCADE;

CREATE TABLE IF NOT EXISTS public.store_lead_stats (
  store_id UUID PRIMARY KEY REFERENCES public.stores(id) ON DELETE CASCADE,
  store_name TEXT,
  domain TEXT,
  shopify_domain TEXT,
  plan TEXT,
  total_leads BIGINT DEFAULT 0,
  leads_this_month BIGINT DEFAULT 0,
  leads_today BIGINT DEFAULT 0,
  max_leads INTEGER DEFAULT 50,
  remaining_leads INTEGER DEFAULT 50,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to refresh store_lead_stats for a specific store
CREATE OR REPLACE FUNCTION public.refresh_store_lead_stats(target_store_id UUID)
RETURNS VOID AS $$
DECLARE
  v_total_leads BIGINT;
  v_leads_this_month BIGINT;
  v_leads_today BIGINT;
  v_store_name TEXT;
  v_domain TEXT;
  v_shopify_domain TEXT;
  v_plan TEXT;
  v_max_leads INTEGER;
  v_remaining_leads INTEGER;
BEGIN
  -- Get store info
  SELECT name, domain, shopify_domain, plan, max_leads
  INTO v_store_name, v_domain, v_shopify_domain, v_plan, v_max_leads
  FROM public.stores
  WHERE id = target_store_id;
  
  -- Calculate lead counts
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE created_at >= date_trunc('month', NOW())),
    COUNT(*) FILTER (WHERE created_at >= date_trunc('day', NOW()))
  INTO v_total_leads, v_leads_this_month, v_leads_today
  FROM public.leads
  WHERE store_id = target_store_id;
  
  -- Calculate remaining leads
  v_remaining_leads := GREATEST(0, v_max_leads - v_leads_this_month);
  
  -- Upsert into store_lead_stats
  INSERT INTO public.store_lead_stats (
    store_id, store_name, domain, shopify_domain, plan,
    total_leads, leads_this_month, leads_today, max_leads, remaining_leads, updated_at
  )
  VALUES (
    target_store_id, v_store_name, v_domain, v_shopify_domain, v_plan,
    v_total_leads, v_leads_this_month, v_leads_today, v_max_leads, v_remaining_leads, NOW()
  )
  ON CONFLICT (store_id) DO UPDATE SET
    store_name = EXCLUDED.store_name,
    domain = EXCLUDED.domain,
    shopify_domain = EXCLUDED.shopify_domain,
    plan = EXCLUDED.plan,
    total_leads = EXCLUDED.total_leads,
    leads_this_month = EXCLUDED.leads_this_month,
    leads_today = EXCLUDED.leads_today,
    max_leads = EXCLUDED.max_leads,
    remaining_leads = EXCLUDED.remaining_leads,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Trigger to refresh stats when a new store is created
CREATE OR REPLACE FUNCTION public.init_store_lead_stats()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.refresh_store_lead_stats(NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS init_store_lead_stats_trigger ON public.stores;
CREATE TRIGGER init_store_lead_stats_trigger
  AFTER INSERT ON public.stores
  FOR EACH ROW EXECUTE FUNCTION public.init_store_lead_stats();

-- Trigger to refresh stats when a lead is inserted
CREATE OR REPLACE FUNCTION public.refresh_stats_on_lead_insert()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.refresh_store_lead_stats(NEW.store_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS refresh_stats_on_lead_insert_trigger ON public.leads;
CREATE TRIGGER refresh_stats_on_lead_insert_trigger
  AFTER INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.refresh_stats_on_lead_insert();

-- Trigger to refresh stats when store plan changes
CREATE OR REPLACE FUNCTION public.refresh_stats_on_store_update()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.plan != OLD.plan OR NEW.max_leads != OLD.max_leads THEN
    PERFORM public.refresh_store_lead_stats(NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS refresh_stats_on_store_update_trigger ON public.stores;
CREATE TRIGGER refresh_stats_on_store_update_trigger
  AFTER UPDATE ON public.stores
  FOR EACH ROW EXECUTE FUNCTION public.refresh_stats_on_store_update();

-- Enable RLS on store_lead_stats
ALTER TABLE public.store_lead_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read store_lead_stats" ON public.store_lead_stats;
CREATE POLICY "Anyone can read store_lead_stats" ON public.store_lead_stats
  FOR SELECT USING (true);

-- ============================================================
-- PART 7: Comments and Documentation
-- ============================================================

COMMENT ON TABLE public.stores IS 'Main stores table. Each store represents a Shopify shop using BoostACart.';
COMMENT ON TABLE public.leads IS 'All leads captured by BoostACart widgets across all stores.';
COMMENT ON TABLE public.saved_leads IS 'Bookmarked leads that store owners want to follow up on.';
COMMENT ON TABLE public.widget_settings IS 'Customization settings for each store''s widget appearance.';
COMMENT ON TABLE public.store_lead_stats IS 'Real-time aggregated lead statistics per store. Automatically updated via triggers.';

COMMENT ON COLUMN public.stores.plan IS 'Pricing plan: Free ($0, 50 leads/month), Starter ($19, 600 leads/month), Pro ($99, unlimited)';
COMMENT ON COLUMN public.stores.max_leads IS 'Maximum leads allowed per month based on plan';
COMMENT ON COLUMN public.stores.total_leads IS 'DEPRECATED: Use store_lead_stats table instead';
COMMENT ON COLUMN public.stores.leads_this_month IS 'DEPRECATED: Use store_lead_stats table instead';
COMMENT ON COLUMN public.stores.remaining_leads IS 'DEPRECATED: Use store_lead_stats table instead';

-- ============================================================
-- SETUP COMPLETE
-- ============================================================

DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'BoostACart Database Setup Complete!';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Tables created: %', (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('stores', 'leads', 'saved_leads', 'widget_settings', 'profiles', 'store_lead_stats'));
  RAISE NOTICE 'Indexes created: %', (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public');
  RAISE NOTICE 'Triggers created: %', (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'public');
  RAISE NOTICE '========================================';
  RAISE NOTICE 'You can now:';
  RAISE NOTICE '1. Sign up at /auth/sign-up';
  RAISE NOTICE '2. Create a store in the dashboard';
  RAISE NOTICE '3. Customize your widget at /dashboard/customization';
  RAISE NOTICE '4. Deploy the widget to your Shopify store';
  RAISE NOTICE '========================================';
END$$;
