-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Fix profiles RLS policies to use text casting
DROP POLICY IF EXISTS profiles_insert_own ON public.profiles;
DROP POLICY IF EXISTS profiles_select_own ON public.profiles;
DROP POLICY IF EXISTS profiles_update_own ON public.profiles;
DROP POLICY IF EXISTS profiles_delete_own ON public.profiles;

CREATE POLICY profiles_insert_own
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = id);

CREATE POLICY profiles_select_own
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id);

CREATE POLICY profiles_update_own
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id)
  WITH CHECK (auth.uid()::text = id);

CREATE POLICY profiles_delete_own
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = id);

-- Fix stores RLS policies to use text casting
DROP POLICY IF EXISTS stores_insert_own ON public.stores;
DROP POLICY IF EXISTS stores_select_own ON public.stores;
DROP POLICY IF EXISTS stores_update_own ON public.stores;
DROP POLICY IF EXISTS stores_delete_own ON public.stores;
DROP POLICY IF EXISTS "Public read stores" ON public.stores;

CREATE POLICY stores_insert_own
  ON public.stores
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY stores_select_own
  ON public.stores
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY stores_update_own
  ON public.stores
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY stores_delete_own
  ON public.stores
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Public can read stores (for widget access)
CREATE POLICY "Public read stores"
  ON public.stores
  FOR SELECT
  USING (true);
