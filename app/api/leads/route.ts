import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      store_id,
      shopify_domain,
      name,
      email,
      phone,
      detected_product,
      product_name,
      product_title,
      product_url,
      product_handle,
      product_id,
      variant_id,
    } = body

    console.log("[API] Lead payload:", {
      store_id,
      name,
      email,
      detected_product,
      product_name,
      product_url,
      product_handle,
      product_id,
      variant_id,
    })

    if (!store_id || !name || !shopify_domain) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (phone) {
      const trimmedPhone = phone.trim()
      let isValid = false

      if (trimmedPhone.startsWith("+")) {
        // International format: 10-15 digits after +
        const digitsOnly = trimmedPhone.slice(1).replace(/\D/g, "")
        isValid = digitsOnly.length >= 10 && digitsOnly.length <= 15
      } else {
        // Indian format: exactly 10 digits starting with 6-9
        const digitsOnly = trimmedPhone.replace(/\D/g, "")
        isValid = digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly)
      }

      if (!isValid) {
        console.log("[API] ❌ Invalid phone number:", phone)
        return NextResponse.json({ error: "Invalid phone number" }, { status: 400 })
      }
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { data: statsData, error: statsError } = await supabase
      .from("store_lead_stats")
      .select("leads_this_month, max_leads, remaining_leads, plan")
      .eq("shopify_domain", shopify_domain)
      .maybeSingle()

    if (statsError) {
      console.error("[API] Error fetching store stats:", statsError)
      return NextResponse.json({ error: "Failed to verify plan limits" }, { status: 500 })
    }

    if (!statsData) {
      console.error("[API] No stats found for shopify_domain:", shopify_domain)
      return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    const currentUsage = statsData.leads_this_month || 0
    const maxAllowed = statsData.max_leads || 50

    console.log("[API] Plan validation - Plan:", statsData.plan, "Usage:", currentUsage, "/", maxAllowed)

    if (currentUsage >= maxAllowed) {
      console.log("[API] ❌ Rejecting lead - plan limit reached")
      return NextResponse.json(
        {
          success: false,
          reason: "PLAN_LIMIT_REACHED",
          error: "Plan limit reached. Upgrade to continue capturing leads.",
          currentUsage,
          maxAllowed,
        },
        { status: 403 },
      )
    }

    const finalProductName = product_name || product_title || detected_product || "Unknown Product"

    console.log("[API] Saving lead with product:", finalProductName)

    const { error: leadError } = await supabase.from("leads").insert({
      store_id,
      name,
      email: email || null,
      phone: phone || null,
      detected_product: finalProductName,
      product_name: finalProductName,
      product_title: product_title || null,
      product_url: product_url || null,
      product_handle: product_handle || null,
      product_id: product_id || null,
      variant_id: variant_id || null,
    })

    if (leadError) {
      console.error("[API] Lead insert error:", leadError)
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 })
    }

    console.log("[API] ✅ Lead saved successfully:", {
      product_name: finalProductName,
      product_url: product_url || "none",
      detected_product: finalProductName,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[API] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
