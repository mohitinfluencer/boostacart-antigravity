"use client"
import Link from "next/link"
import Image from "next/image"
import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Check } from "lucide-react"
import { getWhatsAppLink } from "@/lib/whatsapp"
import ArrowRightIcon from "@/components/icons/ArrowRightIcon"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

const ShoppingCartIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  </svg>
)

const ZapIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const UsersIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  </svg>
)

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Check current session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 right-1/3 w-56 h-56 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/favicon.png" alt="BoostACart Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-2xl font-bold text-white">BoostACart</span>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/contact"
                className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors border border-slate-700 rounded-lg hover:border-slate-600 hover:bg-slate-800/50"
              >
                Contact Us
              </Link>
              {loading ? null : user ? (
                <Link
                  href="/dashboard"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-medium"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors px-4 py-2">
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-medium"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    aria-label="Open menu"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 text-gray-300 hover:text-white hover:border-slate-600 hover:bg-slate-800/50 transition-colors"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="text-sm">Menu</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-slate-950/95 border-slate-800">
                  <SheetHeader>
                    <SheetTitle className="text-white">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href="/contact"
                      className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
                    >
                      Contact Us
                    </Link>
                    {loading ? null : user ? (
                      <Link
                        href="/dashboard"
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-center"
                      >
                        Go to Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/auth/login"
                          className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-slate-800/50"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/auth/sign-up"
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-center"
                        >
                          Get Started
                        </Link>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroGeometric
        badge="Lead Generation Platform"
        title1="Capture Add-to-Cart Shoppers"
        title2="Before They Leave"
      />

      {/* Call to Action Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 relative">
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            BoostACart helps online stores capture email and phone numbers the moment a shopper clicks "Add to Cart", so
            you can recover lost sales with WhatsApp, SMS, and email follow-ups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {loading ? (
              <div className="px-8 py-4 bg-slate-800/50 text-gray-400 rounded-lg font-semibold text-lg">Loading...</div>
            ) : (
              <Link
                href={user ? "/dashboard" : "/auth/sign-up"}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
              >
                <span className="relative z-10">{user ? "Go to Dashboard" : "Start Capturing Cart Leads"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            )}
            <a
              href="https://youtu.be/sQOZcoPP31I"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-slate-800/50 text-white rounded-lg font-semibold text-lg border border-slate-700 flex items-center justify-center transition-all duration-300 hover:border-slate-600 hover:bg-slate-700/60 hover:scale-105 hover:shadow-lg hover:shadow-slate-700/50"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* What Is BoostACart Section */}
      <section className="py-12 sm:py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 relative">
          <SpotlightCard className="p-8 sm:p-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">What Is BoostACart?</h2>
            <div className="text-lg text-gray-400 leading-relaxed space-y-4">
              <p>
                BoostACart is an add-to-cart lead capture tool for online stores. Instead of waiting for customers to
                abandon checkout, BoostACart captures their contact details at the add-to-cart stage, when purchase
                intent is highest.
              </p>
              <p>You can then follow up instantly or later using WhatsApp, SMS, or email to recover sales.</p>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* How BoostACart Works Section */}
      <section className="py-12 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">How BoostACart Works</h2>
            <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-2">
              Simple 5-step process to capture leads and recover lost sales
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <SpotlightCard className="p-6 sm:p-8">
              <ol className="space-y-4 text-gray-400">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </span>
                  <span className="pt-1">A shopper clicks "Add to Cart"</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </span>
                  <span className="pt-1">BoostACart displays a small popup or widget</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </span>
                  <span className="pt-1">The shopper enters their email or phone number</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    4
                  </span>
                  <span className="pt-1">The lead is captured instantly</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    5
                  </span>
                  <span className="pt-1">You follow up and recover the sale</span>
                </li>
              </ol>
            </SpotlightCard>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <SpotlightCard className="p-4 sm:p-6 hover:scale-[1.02] transition-transform">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white">
                <ZapIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                Lead Capture at Add-to-Cart
              </h3>
              <p className="text-xs sm:text-base text-gray-400 leading-relaxed">
                Customer clicks Add to Cart → BoostACart widget pops up and never lose anonymous shoppers again.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-4 sm:p-6 hover:scale-[1.02] transition-transform">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white">
                <TrendingUpIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Customizable Widget</h3>
              <p className="text-xs sm:text-base text-gray-400 leading-relaxed">
                Collects Name, Email, or Phone → customer details saved in your dashboard. Change text, colors, and
                design to match your brand.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-4 sm:p-6 hover:scale-[1.02] transition-transform">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white">
                <UsersIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Smart Dashboard</h3>
              <p className="text-xs sm:text-base text-gray-400 leading-relaxed">
                Redirects to Checkout or Shows Discount → you keep them moving towards purchase. Track leads, monthly
                limits, and plan status.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-4 sm:p-6 hover:scale-[1.02] transition-transform">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white">
                <ShoppingCartIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Exit-Intent Popup</h3>
              <p className="text-xs sm:text-base text-gray-400 leading-relaxed">
                Catch visitors before they leave your store and turn them into leads you can follow up with.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-4 sm:p-6 hover:scale-[1.02] transition-transform">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white">
                <TrendingUpIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Follow-Up Ready</h3>
              <p className="text-xs sm:text-base text-gray-400 leading-relaxed">
                Export leads for WhatsApp, SMS, or sales calls. Increase conversions by 20–30% and reduce cost per
                purchase.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-4 sm:p-6 hover:scale-[1.02] transition-transform">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white">
                <ZapIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Why BoostACart?</h3>
              <p className="text-xs sm:text-base text-gray-400 leading-relaxed">
                Ad spend is expensive. Purchases are fewer than Add-to-Carts. Without customer details, you can't
                recover those carts.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Who Should Use Section */}
      <section className="py-12 sm:py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 relative">
          <SpotlightCard className="p-6 sm:p-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Who Should Use BoostACart?</h2>
              <p className="text-lg text-gray-400 mb-6">BoostACart is built for:</p>
              <ul className="space-y-3 text-left text-gray-400 max-w-2xl mx-auto">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Shopify and eCommerce store owners</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Dropshipping stores</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>DTC brands</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>High-ticket product sellers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Marketing agencies managing eCommerce clients</span>
                </li>
              </ul>
              <p className="text-lg text-gray-400 mt-6">
                If you are losing customers before checkout, BoostACart helps you recover them.
              </p>
              <div className="mt-8">
                <Link
                  href="/shopify-cart-recovery"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-colors"
                >
                  Cart Recovery for Shopify Stores
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Why Store Owners Use Section */}
      <section className="py-12 sm:py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 relative">
          <SpotlightCard className="p-6 sm:p-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Why Store Owners Use BoostACart</h2>
              <ul className="space-y-4 text-left text-gray-400 max-w-2xl mx-auto">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">
                    Capture high-intent shoppers before checkout
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">
                    Recover lost carts using WhatsApp, SMS, or email
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">Increase conversion rates without ads</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">
                    Lower cost-per-purchase with owned traffic
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">
                    Automate follow-ups using integrations
                  </span>
                </li>
              </ul>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
              Choose the plan that fits your store
            </h2>
            <p className="text-base sm:text-xl text-gray-400">Capture more leads from the same ad budget</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="group bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-slate-800/50 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 transition-colors group-hover:text-blue-400">
                  Free Plan
                </h3>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">$0</div>
                <p className="text-gray-400 text-sm sm:text-base">Try it risk-free</p>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center">
                  <div className="text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">Up to 50 leads/month</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">Email support</span>
                </li>
              </ul>
              <Link
                href="/auth/sign-up"
                className="w-full py-2 sm:py-3 px-4 bg-slate-800/50 text-white rounded-lg transition-all duration-300 hover:bg-slate-700/70 hover:shadow-lg font-medium text-center block border border-slate-700 hover:border-slate-600 text-sm sm:text-base"
              >
                Get Started Free
              </Link>
            </div>

            {/* Starter Plan - Most Popular */}
            <div className="group bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border-2 border-blue-500/50 relative transition-all duration-300 hover:scale-110 hover:border-blue-400/80 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-3">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 transition-colors group-hover:text-blue-400">
                  Starter Plan
                </h3>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">$19</div>
                <p className="text-gray-400 text-sm sm:text-base">For growing stores</p>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center">
                  <div className="text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">600 leads per month</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">Priority support</span>
                </li>
              </ul>
              <a
                href={getWhatsAppLink("918303208502", "pricing")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl hover:shadow-blue-500/50 font-medium text-center block text-sm sm:text-base"
              >
                Get Started Free - Limited Time
              </a>
            </div>

            {/* Pro Plan */}
            <div className="group bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-slate-800/50 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 transition-colors group-hover:text-purple-400">
                  Pro Plan
                </h3>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">$99</div>
                <p className="text-gray-400 text-xs sm:text-base">For scaling brands with heavy traffic</p>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center">
                  <div className="text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">Unlimited leads</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400 ml-3 text-sm sm:text-base">Dedicated support</span>
                </li>
              </ul>
              <a
                href={getWhatsAppLink("918303208502", "upgrade")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 sm:py-3 px-4 bg-slate-800/50 text-white rounded-lg transition-all duration-300 hover:bg-slate-700/70 hover:shadow-lg font-medium text-center block border border-slate-700 hover:border-slate-600 text-sm sm:text-base"
              >
                Get Started Free - Limited Time
              </a>
            </div>
          </div>

          {/* Early Access Promotional Banner */}
          <div className="mt-8 sm:mt-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 sm:p-8 text-center">
              <div className="inline-block bg-green-500/20 border border-green-500/50 rounded-full px-4 py-1 mb-4">
                <span className="text-green-400 font-semibold text-sm sm:text-base">🎉 Early Access Offer</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                Completely FREE for Limited Time!
              </h3>
              <p className="text-base sm:text-lg text-gray-300 mb-2">
                All plans are <span className="text-green-400 font-semibold">100% free</span> during our early access
                period.
              </p>
              <p className="text-sm sm:text-base text-gray-400">
                Use BoostACart unlimited times, capture unlimited leads, and boost your sales without any cost. Start
                now and lock in your early access benefits!
              </p>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Still on the fence?</h3>
            <p className="text-base sm:text-xl text-gray-400 mb-6 sm:mb-8">
              Try BoostACart free and see how many sales you recover this week.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-base sm:text-lg"
            >
              Start Free Trial →
            </Link>
          </div>
        </div>
      </section>

      {/* Setup Guide Card Section */}
      <section className="py-12 sm:py-16 relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 sm:p-10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Quick Setup Guide</h3>
              <p className="text-gray-400 text-base sm:text-lg mb-6 max-w-xl mx-auto">
                Get started in minutes with our step-by-step setup guide. Configure your widget and start capturing
                leads right away.
              </p>
              <Link
                href="/setup"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                View Setup Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 relative">
          <SpotlightCard className="p-8 sm:p-12">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Ready to Stop Losing Customers at Add-to-Cart?
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of eCommerce stores using BoostACart to capture leads and recover sales. Start free today.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
            >
              Start Free Trial →
            </Link>
          </SpotlightCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-800/50 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800/50 text-center text-gray-400">
            <p>© 2026 BoostACart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
