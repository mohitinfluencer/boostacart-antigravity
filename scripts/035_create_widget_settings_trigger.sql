-- Migration: Auto-create widget_settings when a store is created
-- This ensures every new store has default widget settings

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS create_widget_settings_trigger ON public.stores;

-- Drop the function if it exists
DROP FUNCTION IF EXISTS public.create_widget_settings_for_new_store();

-- Create the function to auto-create widget_settings
CREATE OR REPLACE FUNCTION public.create_widget_settings_for_new_store()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert default widget settings for the new store
  -- Only specify store_id, all other columns will use their default values
  INSERT INTO public.widget_settings (store_id)
  VALUES (NEW.id)
  ON CONFLICT (store_id) DO NOTHING; -- Skip if already exists
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER create_widget_settings_trigger
  AFTER INSERT ON public.stores
  FOR EACH ROW
  EXECUTE FUNCTION public.create_widget_settings_for_new_store();

-- Backfill widget_settings for existing stores that don't have settings
-- Only insert store_id, all other columns will use their default values
INSERT INTO public.widget_settings (store_id)
SELECT s.id
FROM public.stores s
LEFT JOIN public.widget_settings ws ON s.id = ws.store_id
WHERE ws.store_id IS NULL;

-- Verify the backfill
SELECT 
  COUNT(*) as stores_without_settings
FROM public.stores s
LEFT JOIN public.widget_settings ws ON s.id = ws.store_id
WHERE ws.store_id IS NULL;
