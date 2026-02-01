# BoostACart Database Migration Scripts

This directory contains SQL migration scripts for setting up the BoostACart database.

## Quick Start (New Installation)

If you're setting up BoostACart for the first time on a fresh Supabase instance:

**Run only this one file:**
\`\`\`
scripts/000_FULL_SETUP.sql
\`\`\`

This single script contains everything you need:
- All tables (stores, leads, saved_leads, widget_settings, profiles, store_lead_stats)
- All indexes for optimal performance
- All triggers for automation
- All RLS policies for security
- All helper functions

## How to Run

### Option 1: Using Supabase Dashboard
1. Go to your Supabase project
2. Navigate to SQL Editor
3. Copy and paste the contents of `scripts/000_FULL_SETUP.sql`
4. Click "Run"

### Option 2: Using v0 Preview
1. Click the "Run Files" button in the v0 interface
2. Select `scripts/000_FULL_SETUP.sql`
3. Click "Run"

## Migration Safety

The `000_FULL_SETUP.sql` script is:
- **Idempotent**: Safe to run multiple times without breaking anything
- **No Hard-coded Data**: Does not reference specific users or stores
- **Error-safe**: Uses `IF NOT EXISTS`, `IF EXISTS`, `ON CONFLICT DO NOTHING`
- **Universal**: Works on any Supabase instance, whether fresh or existing

## What Gets Created

### Tables
1. `stores` - Store information and plan details
2. `leads` - All captured leads from widgets
3. `saved_leads` - Bookmarked leads for follow-up
4. `widget_settings` - Widget customization per store
5. `profiles` - User profile metadata
6. `store_lead_stats` - Real-time lead statistics (auto-updated)
7. `admin_audit_logs` - Admin action tracking

### Key Features
- Automatic domain normalization (removes https://, www, trailing slashes)
- Automatic store slug generation from domain
- Automatic max_leads calculation based on plan
- Automatic widget_settings creation when a store is created
- Real-time lead statistics via `store_lead_stats` table with triggers
- Complete Row-Level Security (RLS) for data protection

### Pricing Plans
- **Free**: $0/month, 50 leads/month
- **Starter**: $19/month, 600 leads/month
- **Pro**: $99/month, unlimited leads (999,999 limit in database)

## Legacy Scripts (DO NOT USE)

The numbered scripts (001-030) and other files in this directory are legacy migration scripts that were created incrementally during development. They:
- Contain hard-coded references to specific stores (e.g., "monsoonkart")
- May fail with "Tenant or user not found" errors on fresh instances
- Are kept for historical reference only

**Always use `000_FULL_SETUP.sql` instead.**

## Troubleshooting

### "Tenant or user not found" Error
This error occurs when running legacy scripts that reference specific users or stores. Solution: Use `000_FULL_SETUP.sql` instead.

### "relation already exists" Error
This is safe to ignore. The script uses `IF NOT EXISTS` clauses, so existing tables won't be affected.

### Tables Not Created
1. Check Supabase logs for specific errors
2. Ensure you're running the script in the SQL Editor (not Terminal)
3. Verify your Supabase project has sufficient permissions

## After Setup

Once the database is set up:

1. **Test the application**:
   - Sign up at `/auth/sign-up`
   - Create a store in the dashboard
   - Customize the widget at `/dashboard/customization`

2. **Verify tables exist**:
   \`\`\`sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   \`\`\`

3. **Check RLS is enabled**:
   \`\`\`sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public';
   \`\`\`

4. **View initial stats**:
   \`\`\`sql
   SELECT * FROM public.store_lead_stats;
   \`\`\`

## Support

If you encounter issues:
1. Check the Supabase logs for detailed error messages
2. Verify you're using Postgres 14 or higher
3. Ensure RLS is enabled on your Supabase project
4. Check that the `auth.users` table exists (created automatically by Supabase)

## Architecture Notes

### Lead Counting System
The app uses `store_lead_stats` table as the single source of truth for all metrics:
- **Dashboard**: Reads from `store_lead_stats`
- **Widget**: Checks `remaining_leads` from `store_lead_stats` before submission
- **API**: Inserts into `leads` table, which triggers automatic stats refresh

The old counter columns (`total_leads`, `leads_this_month`, `remaining_leads`) in the `stores` table are deprecated but kept for backwards compatibility.

### Security Model
- Users can only see their own stores and leads (enforced by RLS)
- Anyone can insert leads (for public widgets)
- Anyone can read store and widget settings (for public widgets)
- Admin actions are logged to `admin_audit_logs`

### Performance
- Indexed on all foreign keys and common query fields
- `store_lead_stats` table is updated via triggers, not computed on-demand
- Normalized domains for consistent lookups
