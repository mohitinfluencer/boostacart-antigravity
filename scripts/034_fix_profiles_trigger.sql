-- ============================================================
-- FIX: Profile creation trigger was failing due to column mismatch
-- The trigger was trying to insert 'store_domain' column which doesn't exist
-- in the profiles table, and was also casting UUID to text incorrectly
-- ============================================================

-- First, ensure profiles table has correct columns
-- Add store_domain column if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS store_domain TEXT;

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create comprehensive trigger that handles both profiles and stores
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  store_id uuid;
  store_name_val text;
  store_domain_val text;
BEGIN
  -- Extract store info from metadata
  store_name_val := new.raw_user_meta_data ->> 'store_name';
  store_domain_val := new.raw_user_meta_data ->> 'store_domain';

  -- Insert profile - NOTE: new.id is already UUID, don't cast to text
  INSERT INTO public.profiles (id, email, store_domain, created_at, updated_at)
  VALUES (
    new.id,  -- Keep as UUID, don't cast to text
    new.email,
    store_domain_val,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    store_domain = COALESCE(EXCLUDED.store_domain, profiles.store_domain),
    updated_at = now();

  -- Create store with all required fields including shopify_domain
  IF store_name_val IS NOT NULL AND store_domain_val IS NOT NULL THEN
    INSERT INTO public.stores (
      id,
      user_id,
      name,
      domain,
      shopify_domain,
      plan,
      max_leads,
      remaining_leads,
      total_leads,
      leads_this_month,
      installed,
      created_at,
      updated_at
    )
    VALUES (
      gen_random_uuid(),
      new.id,  -- Keep as UUID, don't cast to text
      store_name_val,
      store_domain_val,
      store_domain_val,
      'Free',
      50,
      50,
      0,
      0,
      false,
      now(),
      now()
    )
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN new;
EXCEPTION WHEN OTHERS THEN
    -- Log error but don't fail user creation
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN new;
END;
$$;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- BACKFILL: Create profiles for existing users that don't have one
-- ============================================================
INSERT INTO public.profiles (id, email, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  au.created_at,
  now()
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Also create profiles from stores that exist but don't have matching profiles
INSERT INTO public.profiles (id, email, store_domain, created_at, updated_at)
SELECT 
  s.user_id::uuid,
  au.email,
  s.domain,
  s.created_at,
  now()
FROM public.stores s
JOIN auth.users au ON au.id::text = s.user_id OR au.id = s.user_id::uuid
LEFT JOIN public.profiles p ON p.id::text = s.user_id OR p.id = s.user_id::uuid
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;
