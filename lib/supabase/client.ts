import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("[Supabase] Initializing client...")
    console.log("[Supabase] URL Defined:", !!url)
    console.log("[Supabase] Key Defined:", !!key)

    if (url) console.log("[Supabase] URL Value:", url)

    // Fallback to placeholder to prevent build crash if env vars are missing
    const finalUrl = url || "https://placeholder.supabase.co"
    const finalKey = key || "placeholder-key"

    client = createBrowserClient(finalUrl, finalKey)
  }
  return client
}
