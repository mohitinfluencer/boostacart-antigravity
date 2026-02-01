import Link from "next/link"
import { ArrowLeft, FileText, AlertCircle, Shield } from "lucide-react"

export default function TermsPage() {
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
          <FileText className="h-16 w-16 text-blue-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: January 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Service Description</h2>
            <p className="text-gray-300 leading-relaxed">
              BoostACart provides a lead capture widget service for Shopify eCommerce stores. Our service allows you to
              collect customer contact information when they add products to cart, helping you recover abandoned sales
              through follow-up communications.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white mb-0">Plan Limits and Usage</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">Each plan includes specific lead limits:</p>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li>
                <strong className="text-white">Free Plan:</strong> 50 leads per month
              </li>
              <li>
                <strong className="text-white">Starter Plan ($19/month):</strong> 600 leads per month
              </li>
              <li>
                <strong className="text-white">Pro Plan ($99/month):</strong> Unlimited leads
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              Once you reach your plan limit, the widget will stop collecting new leads until you upgrade or your
              monthly limit resets. Lead limits reset on the first day of each calendar month.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Fair Usage Policy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">You agree to use BoostACart responsibly:</p>
            <ul className="text-gray-300 space-y-2">
              <li>Do not use the service for spam or unsolicited communications</li>
              <li>Do not attempt to circumvent plan limits through multiple accounts</li>
              <li>Do not collect leads for purposes other than legitimate sales follow-up</li>
              <li>Comply with all applicable data protection and privacy laws</li>
              <li>Obtain proper consent from customers when collecting their information</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white mb-0">No Guarantee of Results</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              BoostACart is a tool to help you capture leads. We do not guarantee any specific sales results, conversion
              rates, or revenue increases. Your results depend on many factors including your products, pricing,
              follow-up strategy, and market conditions.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Account Responsibility</h2>
            <p className="text-gray-300 leading-relaxed mb-4">You are responsible for:</p>
            <ul className="text-gray-300 space-y-2">
              <li>Maintaining the security of your account credentials</li>
              <li>All activity that occurs under your account</li>
              <li>Ensuring your widget settings comply with your local laws</li>
              <li>How you use the leads collected through our service</li>
              <li>Keeping your payment information current for paid plans</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
            <p className="text-gray-300 leading-relaxed mb-4">For paid plans:</p>
            <ul className="text-gray-300 space-y-2">
              <li>Billing is monthly and recurring</li>
              <li>Payment is due at the start of each billing period</li>
              <li>You can cancel anytime; no refunds for partial months</li>
              <li>Prices may change with 30 days notice</li>
              <li>Failed payments may result in service suspension</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Termination Rights</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account if:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>You violate these Terms of Service</li>
              <li>You use the service for illegal or fraudulent purposes</li>
              <li>Your payment fails repeatedly</li>
              <li>You engage in abusive behavior toward our support team</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              You may cancel your account at any time from your dashboard settings or by contacting support.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              BoostACart is provided "as is" without warranties. We are not liable for any indirect, incidental, or
              consequential damages arising from your use of the service. Our total liability is limited to the amount
              you paid in the last 3 months.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These terms are governed by the laws of India. Any disputes will be resolved in the courts of India.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
            <p className="text-gray-300 leading-relaxed mb-4">Questions about these terms? Contact us:</p>
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
