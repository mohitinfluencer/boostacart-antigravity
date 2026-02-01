"use client"

import type React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Users, Bookmark, UserIcon, MessageCircle, PhoneCall, Lock, Menu, X } from "lucide-react"
import Image from "next/image"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/total-leads", label: "Total Leads", icon: Users },
    { href: "/dashboard/saved-leads", label: "Saved Leads", icon: Bookmark },
    { href: "/dashboard/account", label: "Account", icon: UserIcon },
  ]

  const comingSoonItems = [
    { label: "WhatsApp Follow-ups", icon: MessageCircle },
    { label: "AI Voice Agent", icon: PhoneCall },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-slate-800/80 backdrop-blur-sm text-white rounded-lg hover:bg-slate-700/80 transition-colors border border-white/10"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-white/5 backdrop-blur-sm border-r border-white/10 flex-shrink-0 transition-all duration-300 overflow-hidden`}
      >
        <div className="flex flex-col h-full w-64">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-white/10 mt-12">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/favicon.png" alt="BoostACart Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-white font-semibold text-lg">BoostACart</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}

            {/* Divider */}
            <div className="pt-6 pb-2">
              <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Upcoming Features</div>
            </div>

            {/* Coming Soon Items */}
            {comingSoonItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="relative group" title="This feature is under development">
                  <div className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-600 cursor-not-allowed opacity-60">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    <Lock className="h-4 w-4" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/10">
                    This feature is under development
                  </div>
                </div>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
