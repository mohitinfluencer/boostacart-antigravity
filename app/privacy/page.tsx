import Link from "next/link"
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from "lucide-react"

export default function PrivacyPage() {
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
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: January 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white mb-0">What Data We Collect</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              BoostACart collects the following information to provide lead capture services:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>
                <strong className="text-white">Customer contact information:</strong> Name, email address, and phone
                number submitted through your widget
              </li>
              <li>
                <strong className="text-white">Store information:</strong> Your Shopify store domain, store name, and
                widget configuration settings
              </li>
              <li>
                <strong className="text-white">Product context:</strong> Product names and URLs that customers interact
                with
              </li>
              <li>
                <strong className="text-white">Usage data:</strong> Lead counts, timestamps, and basic analytics
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white mb-0">Why We Collect This Data</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              We collect this information for the following purposes:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>To provide lead capture and storage services</li>
              <li>To display leads in your dashboard</li>
              <li>To generate analytics and reports</li>
              <li>To enforce plan limits and usage restrictions</li>
              <li>To provide customer support</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white mb-0">How We Protect Your Data</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">Your data security is our priority:</p>
            <ul className="text-gray-300 space-y-2">
              <li>
                <strong className="text-white">Secure storage:</strong> All data is stored in encrypted databases with
                industry-standard security
              </li>
              <li>
                <strong className="text-white">Access control:</strong> Only you can access your leads through your
                authenticated dashboard
              </li>
              <li>
                <strong className="text-white">Not sold or shared:</strong> We never sell, rent, or share your leads
                with third parties
              </li>
              <li>
                <strong className="text-white">Shopify compliance:</strong> We follow Shopify's data protection and
                privacy requirements
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <UserCheck className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white mb-0">Your Rights</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">You have the following rights regarding your data:</p>
            <ul className="text-gray-300 space-y-2">
              <li>
                <strong className="text-white">Access:</strong> You can view all your captured leads anytime in your
                dashboard
              </li>
              <li>
                <strong className="text-white">Export:</strong> Download your leads as CSV files at any time
              </li>
              <li>
                <strong className="text-white">Delete:</strong> Request deletion of your account and all associated data
              </li>
              <li>
                <strong className="text-white">Control:</strong> You control who sees your widget and what fields are
                collected
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your lead data for as long as your account is active. If you close your account, all data will
              be permanently deleted within 30 days unless you request immediate deletion.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
            <p className="text-gray-300 leading-relaxed">
              BoostACart uses essential cookies for authentication and session management. We do not use advertising
              cookies or sell your browsing data.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or how we handle your data, contact us:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>Email: boostacart@gmail.com</li>
              <li>WhatsApp: +91 8303208502</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
