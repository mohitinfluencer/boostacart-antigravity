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

  -- Insert profile with proper columns that exist in the schema
  INSERT INTO public.profiles (id, email, store_domain, created_at, updated_at)
  VALUES (
    new.id::text,
    new.email,
    store_domain_val,
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;

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
      new.id::text,
      store_name_val,
      store_domain_val,
      store_domain_val,  -- Use domain as shopify_domain
      'Free',  -- Capitalize plan value
      50,  -- Default Free plan limit
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
