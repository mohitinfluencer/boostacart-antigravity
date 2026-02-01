# BoostACart Sign-Up System Fix

## Problem Summary
Users were unable to sign up due to:
1. Database trigger not creating profiles and stores correctly
2. Missing `shopify_domain` field in store creation
3. Non-capitalized plan values ("free" instead of "Free")
4. RLS policies not properly handling UUID to text casting
5. Unconfirmed email addresses blocking login

## Solution Overview

### Phase 1: Database Trigger (Script 031)
Creates a comprehensive trigger that:
- Extracts `store_name` and `store_domain` from `raw_user_meta_data`
- Inserts profile with all required fields
- Inserts store with:
  - Proper field names matching schema
  - `shopify_domain` set to domain value
  - Capitalized "Free" plan
  - Default limits (50 for Free tier)
  - All timestamp fields
- Handles errors gracefully without failing user creation

### Phase 2: RLS Policies (Script 032)
Fixes authentication by:
- Enabling RLS on profiles and stores tables
- Using `auth.uid()::text` for proper UUID to text casting
- Creating separate INSERT, SELECT, UPDATE, DELETE policies
- Allowing public read access to stores for widget loading
- Authenticating all user operations through auth.uid()

### Phase 3: Email Confirmation (Script 033)
Confirms all previously unconfirmed emails so existing users can log in.

## How It Works

1. **User Signs Up**
   - Frontend passes `store_name` and `store_domain` in metadata
   - Supabase creates auth user

2. **Trigger Fires**
   - Function receives new auth user event
   - Extracts metadata
   - Creates profile with user ID and email
   - Creates store with all required fields

3. **User Can Log In**
   - Email is confirmed
   - Auth token is issued
   - Dashboard queries `stores` table with proper RLS
   - Store loads successfully

## Implementation Steps

1. Run Script 031 to create the new trigger
2. Run Script 032 to fix RLS policies
3. Run Script 033 to confirm existing emails
4. Test: Create new account and verify dashboard loads

## Schema Requirements

### profiles table columns:
- id (text, primary key)
- email (text)
- store_domain (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)

### stores table columns:
- id (uuid)
- user_id (text)
- name (text)
- domain (text)
- shopify_domain (text, NOT NULL)
- plan (text, default "Free")
- max_leads (integer, default 50)
- remaining_leads (integer, default 50)
- total_leads (integer, default 0)
- leads_this_month (integer, default 0)
- installed (boolean, default false)
- created_at (timestamp)
- updated_at (timestamp)

## Testing Checklist

- [ ] Create new account with test email
- [ ] Verify profile created in `profiles` table
- [ ] Verify store created in `stores` table
- [ ] Verify `shopify_domain` is populated
- [ ] Verify plan is "Free" (capitalized)
- [ ] Log in without "Email not confirmed" error
- [ ] Dashboard loads without "No Store Found" error
- [ ] Widget URL works: `/embed/{domain}`

## Troubleshooting

### "Tenant or user not found" error
- Make sure you're running scripts on the correct database
- Verify auth schema exists before running trigger

### "Email not confirmed" after sign-up
- Run Script 033 to confirm all emails
- Check Supabase Auth settings for email confirmation requirements

### "No Store Found" on dashboard
- Verify `stores` table has proper RLS policies
- Check that `user_id` column exists and is populated
- Verify `shopify_domain` is NOT NULL
