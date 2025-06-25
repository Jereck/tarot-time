import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function PublicNavBar() {
    return (
    <nav className="fixed top-0 z-50 w-full h-20 bg-gradient-to-r from-indigo-950/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-b border-white/10 shadow-2xl">
      {/* Mystical background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-2 left-20 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-4 right-32 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-3 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-5 right-1/4 w-0.5 h-0.5 bg-pink-300 rounded-full animate-ping opacity-60"></div>
      </div>

      <div className="relative z-10 flex justify-between items-center h-full px-6 lg:px-10">
        {/* Logo with mystical glow */}
        <Link href="/login" className="flex items-center group">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20 group-hover:border-white/40 transition-all duration-300">
              <Image
                src="/assets/logo.png"
                width={60}
                height={60}
                alt="Mystical Scheduling Logo"
                className="drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </Link>

        {/* Navigation Buttons */}
        <section className="flex items-center gap-4">
          <SignInButton>
            <Button className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-6 border-0 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group">
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          </SignInButton>

          <SignUpButton>
            <Button
              variant="outline"
              className="relative overflow-hidden bg-white/10 backdrop-blur-sm hover:bg-white/20 text-purple-100 hover:text-white font-semibold py-2.5 px-6 border border-purple-300/30 hover:border-purple-300/50 rounded-full shadow-lg transition-all duration-300 group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </SignUpButton>
        </section>
      </div>
    </nav>
    )
}