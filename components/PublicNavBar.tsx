import Link from "next/link"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { Sparkles, Moon, Stars } from "lucide-react"

export default function PublicNavBar() {
  return (
    <nav className="fixed top-0 z-50 w-full h-16 bg-gradient-to-r from-indigo-950/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-b border-white/10 shadow-2xl">
      {/* Mystical background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-2 left-20 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-4 right-32 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-3 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-5 right-1/4 w-0.5 h-0.5 bg-pink-300 rounded-full animate-ping opacity-60"></div>
      </div>

      <div className="relative z-10 flex justify-between items-center h-full px-6 lg:px-10">
        {/* Brand with mystical typography */}
        <Link href="/login" className="flex items-center gap-2 group">
          <div className="relative">
            <Moon className="w-8 h-8 text-purple-300 group-hover:text-purple-200 duration-300 group-hover:rotate-12 transform transition-transform" />
            <div className="absolute -inset-1 bg-purple-400/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              MysticTime
            </span>
            <span className="text-xs text-purple-300/70 -mt-1 hidden sm:block">Sacred Scheduling</span>
          </div>
        </Link>

        {/* Navigation Buttons */}
        <section className="flex items-center gap-4">
          <SignInButton>
            <Button className="relative overflow-hidden bg-transparent hover:bg-white/10 text-purple-200 hover:text-white font-medium py-2 px-6 border border-purple-300/30 hover:border-purple-300/60 rounded-full transition-all duration-300 group">
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Sign In
              </span>
            </Button>
          </SignInButton>

          <SignUpButton>
            <Button className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-6 border-0 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group">
              <span className="relative z-10 flex items-center gap-2">
                <Stars className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                Get Started
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          </SignUpButton>
        </section>
      </div>
    </nav>
  )
}
