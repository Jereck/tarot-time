"use client"

import { PrivateNavLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { SignedIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Calendar, Users, Settings, BarChart3, Sparkles } from "lucide-react"

// Map route names to icons
const routeIcons: Record<string, any> = {
  "/events": Calendar,
  "/bookings": Users,
  "/analytics": BarChart3,
  "/settings": Settings,
}

export default function PrivateNavBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 z-50 w-full h-16 bg-gradient-to-r from-indigo-950/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-b border-white/10 shadow-2xl">
      {/* Mystical background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-2 left-20 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-4 right-32 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-3 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-5 right-1/4 w-0.5 h-0.5 bg-pink-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-2 left-2/3 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse opacity-50"></div>
      </div>

      <div className="relative z-10 flex justify-between items-center h-full px-6 lg:px-10">
        {/* Brand with mystical typography */}
        <Link href="/events" className="flex items-center gap-2 group">
          <div className="relative">
            <Moon className="w-7 h-7 text-purple-300 group-hover:text-purple-200 duration-300 group-hover:rotate-12 transform transition-transform" />
            <div className="absolute -inset-1 bg-purple-400/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              TarotTime
            </span>
            <span className="text-xs text-purple-300/70 -mt-1 hidden lg:block">Dashboard</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <section className="flex items-center">
          <div className="flex items-center gap-1 lg:gap-2">
            {PrivateNavLinks.map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
              const IconComponent = routeIcons[item.route] || Calendar

              return (
                <Link
                  href={item.route}
                  key={item.label}
                  className={cn(
                    "relative flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-300 group overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-purple-600/40 to-pink-600/40 backdrop-blur-sm border border-purple-300/50 shadow-lg shadow-purple-500/20"
                      : "hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20",
                  )}
                >
                  {/* Active state glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full"></div>
                  )}

                  {/* Icon with mystical glow */}
                  <div className="relative">
                    <div
                      className={cn(
                        "absolute -inset-1 rounded-full blur-sm transition-opacity duration-300",
                        isActive
                          ? "bg-gradient-to-r from-purple-400 to-pink-400 opacity-40"
                          : "bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20",
                      )}
                    ></div>
                    <IconComponent
                      className={cn(
                        "relative w-5 h-5 transition-all duration-300",
                        isActive
                          ? "text-purple-100 drop-shadow-lg"
                          : "text-purple-200/80 group-hover:text-purple-100 group-hover:scale-110",
                      )}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "relative text-sm font-medium transition-all duration-300 max-lg:hidden",
                      isActive ? "text-purple-100 drop-shadow-sm" : "text-purple-200/80 group-hover:text-purple-100",
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* User Section */}
        <div className="flex items-center gap-3">
          {/* Mystical indicator */}
          <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
            <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
            <span className="text-sm text-purple-200/80">Online</span>
          </div>

          {/* User Button */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></div>
            <div className="relative">
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-8 h-8 ring-2 ring-purple-300/40 group-hover:ring-purple-300/70 transition-all duration-300",
                      userButtonPopoverCard: "bg-slate-900/95 backdrop-blur-lg border border-white/20",
                      userButtonPopoverActionButton: "text-purple-100 hover:bg-purple-600/20",
                      userButtonPopoverActionButtonText: "text-purple-100",
                      userButtonPopoverFooter: "hidden",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
