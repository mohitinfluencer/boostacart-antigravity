import Link from "next/link"
import { ArrowLeft, TrendingUp, Target, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <img src="/favicon.png" alt="BoostACart" className="h-8 w-8" />
              <span className="text-2xl font-bold text-white">BoostACart</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">About BoostACart</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Built for Shopify sellers who understand that every add-to-cart is a buying signal worth capturing.
          </p>
        </div>

        {/* Story Section */}
        <div className="prose prose-invert max-w-none mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Why We Built BoostACart</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We saw the same pattern across hundreds of eCommerce stores: massive traffic, decent add-to-cart rates,
              but conversion rates that didn't match the ad spend.
            </p>
            <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-lg mb-6">
              <p className="text-gray-300 text-lg font-semibold mb-4">Here's a real example:</p>
              <ul className="text-gray-400 space-y-2">
                <li>₹10,000 spent on Facebook ads</li>
                <li>350 people added products to cart</li>
                <li>Only 100 actually purchased</li>
                <li>250 potential customers lost forever</li>
              </ul>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              That's 250 people who showed interest, but you have no way to follow up with them. No email. No phone
              number. Just wasted ad spend.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              <strong className="text-white">BoostACart solves this.</strong> We help you capture contact information
              the moment someone adds to cart—before they leave, before they forget, before the opportunity is gone.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="h-8 w-8 text-blue-400" />
              <h2 className="text-3xl font-bold text-white mb-0">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Help eCommerce stores recover revenue without spending more on ads. Every business should own their
              customer relationships, not rent them from ad platforms.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl text-center">
              <TrendingUp className="h-10 w-10 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Results-Focused</h3>
              <p className="text-gray-400">Built for ROI, not vanity metrics</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl text-center">
              <Heart className="h-10 w-10 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Simple & Practical</h3>
              <p className="text-gray-400">No complicated setups, just results</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl text-center">
              <Target className="h-10 w-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Built for Sellers</h3>
              <p className="text-gray-400">By people who run stores, for people who run stores</p>
            </div>
          </div>

          {/* Closing */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl text-center">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We're not here to promise overnight success or magic formulas. We're here to help you capture the leads
              you're already generating and give you a real shot at converting them.
            </p>
            <p className="text-white text-xl font-semibold">Let's turn your traffic into owned assets.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
          >
            Start Capturing Leads Today
          </Link>
        </div>
      </div>
    </div>
  )
}
