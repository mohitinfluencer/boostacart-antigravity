"use client"
import Link from "next/link"
import Image from "next/image"
import { Menu, Check } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { getWhatsAppLink } from "@/lib/whatsapp"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

export default function PricingPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background animated lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
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

      {/* Pricing Section */}
      <section className="py-12 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative">
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">
              Choose the plan that fits your store
            </h1>
            <p className="text-base sm:text-xl text-gray-400">Capture more leads from the same ad budget</p>
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
                className="w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl hover:shadow-blue-500/50 font-medium text-center block text-sm sm:text-base"
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

          <div className="text-center mt-8 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Still on the fence?</h3>
            <p className="text-base sm:text-xl text-gray-400 mb-6 sm:mb-8">
              Try BoostACart free and see how many sales you recover this week.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 font-semibold text-base sm:text-lg"
            >
              Start Free Trial →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-800/50 py-12 relative z-10 mt-20">
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
