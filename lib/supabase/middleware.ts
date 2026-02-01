import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  if (request.nextUrl.pathname.startsWith("/embed/")) {
    supabaseResponse.headers.delete("X-Frame-Options")
    supabaseResponse.headers.set("Content-Security-Policy", "frame-ancestors *")
    supabaseResponse.headers.set("Access-Control-Allow-Origin", "*")
    supabaseResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    supabaseResponse.headers.set("Access-Control-Allow-Headers", "Content-Type")
    return supabaseResponse
  }

  if (
    request.nextUrl.pathname.startsWith("/widget/") ||
    request.nextUrl.pathname.startsWith("/api/widget") ||
    request.nextUrl.pathname.startsWith("/api/leads")
  ) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect unauthenticated users to login for protected routes
  if (!user && (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/admin"))) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  if (
    user &&
    (request.nextUrl.pathname.startsWith("/auth/login") || request.nextUrl.pathname.startsWith("/auth/sign-up"))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
