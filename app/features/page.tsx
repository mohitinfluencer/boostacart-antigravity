import Link from "next/link"
import { ArrowLeft, ShoppingCart, Mail, Phone, BarChart3, Download, Zap, Users, Clock, Shield } from "lucide-react"

export default function FeaturesPage() {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-white mb-6">Recover Lost Sales Before Checkout</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Turn abandoned carts into revenue with instant lead capture. Get customer contact info the moment they add
            to cart—before they leave.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Add-to-Cart Lead Capture</h3>
              <p className="text-gray-400">
                Capture leads instantly when customers add products to cart, not when they abandon it.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Phone + Email Collection</h3>
              <p className="text-gray-400">
                Collect both phone numbers and email addresses with smart validation to ensure quality leads.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real-Time Dashboard</h3>
              <p className="text-gray-400">
                Track leads, view analytics, and monitor your best-performing products all in one place.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">CSV Export & Saved Leads</h3>
              <p className="text-gray-400">
                Export all leads to CSV or save specific leads for targeted follow-up campaigns.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Shopify One-Click Install</h3>
              <p className="text-gray-400">
                Simple embed code installation. Get up and running in under 5 minutes on any Shopify store.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">WhatsApp-Ready Leads</h3>
              <p className="text-gray-400">
                Get phone numbers formatted and ready for instant WhatsApp follow-ups to recover sales.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Customer Adds to Cart</h3>
              <p className="text-gray-400">Your widget appears instantly when a customer clicks "Add to Cart"</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Lead Gets Captured</h3>
              <p className="text-gray-400">Customer enters details to unlock their exclusive discount code</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">You Follow Up & Convert</h3>
              <p className="text-gray-400">Use WhatsApp, SMS, or email to follow up and close the sale</p>
            </div>
          </div>
        </div>

        {/* Who It's For */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Who It's For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl text-center">
              <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Dropshippers</h3>
              <p className="text-gray-400">Maximize ROI on every ad click by capturing leads before checkout</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl text-center">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">D2C Brands</h3>
              <p className="text-gray-400">Build your customer list and recover abandoned carts systematically</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl text-center">
              <Clock className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Ad-Driven Stores</h3>
              <p className="text-gray-400">Turn expensive traffic into owned leads you can follow up with for free</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-slate-700/50 p-12 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Start Capturing Cart Leads Today</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of stores already recovering lost sales with BoostACart
            </p>
            <Link
              href="/dashboard"
              className="inline-flex px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
