"use server"

import { createClient } from "@supabase/supabase-js"

export async function ensureStoreExists(userId: string, storeName: string, storeDomain: string) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  try {
    // Check if store already exists
    const { data: existingStore } = await supabase.from("stores").select("id").eq("user_id", userId).single()

    if (existingStore) {
      console.log("[v0] Store already exists for user:", userId)
      return { success: true, storeId: existingStore.id }
    }

    // Create store explicitly
    const { data: newStore, error } = await supabase
      .from("stores")
      .insert({
        user_id: userId,
        name: storeName,
        domain: storeDomain,
        shopify_domain: storeDomain,
        plan: "Free",
        max_leads: 50,
        remaining_leads: 50,
        total_leads: 0,
        leads_this_month: 0,
        installed: false,
      })
      .select("id")
      .single()

    if (error) {
      console.error("[v0] Failed to create store:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] Store created successfully:", newStore.id)
    return { success: true, storeId: newStore.id }
  } catch (error) {
    console.error("[v0] Error in ensureStoreExists:", error)
    return { success: false, error: "Failed to create store" }
  }
}
