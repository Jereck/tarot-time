'use client';

import { SignIn } from "@clerk/nextjs";
import { neobrutalism, shadesOfPurple } from "@clerk/themes";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-pink-300 rounded-full animate-ping opacity-50"></div>
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-32 right-1/3 w-1 h-1 bg-yellow-200 rounded-full animate-ping opacity-70"></div>
      </div>

      {/* Mystical gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-900/10"></div>

      <main className="relative z-10 flex items-center justify-center min-h-screen p-6 lg:p-10">
        <div className="flex items-center gap-12 lg:gap-24 max-lg:flex-col max-lg:text-center animate-fade-in">
          {/* Left Section - Hero Content */}
          <section className="flex flex-col items-center space-y-8 max-w-2xl">
            {/* Logo with mystical glow */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full opacity-30 group-hover:opacity-50 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                <Image
                  src="/assets/logo.png"
                  width={280}
                  height={280}
                  alt="Mystical Scheduling Logo"
                  className="drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Hero Text */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                Mystically Manage
                <br />
                <span className="text-3xl lg:text-5xl">Your Sacred Time</span>
              </h1>

              <p className="text-lg lg:text-xl text-purple-100/90 font-light leading-relaxed max-w-lg">
                Effortlessly manage your spiritual practice with the enchanted scheduling tool designed for
                <span className="text-pink-300 font-medium"> tarot readers</span>,
                <span className="text-blue-300 font-medium"> astrologers</span>, and
                <span className="text-purple-300 font-medium"> mystics</span>
              </p>

              {/* Feature highlights */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-300/30">
                  <span className="text-purple-200 text-sm font-medium">✨ Intuitive Booking</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-300/30">
                  <span className="text-pink-200 text-sm font-medium">🌙 Client Management</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-300/30">
                  <span className="text-blue-200 text-sm font-medium">🔮 Sacred Scheduling</span>
                </div>
              </div>
            </div>

            {/* Planning illustration with mystical frame */}
            <div className="relative mt-8">
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <Image
                  src="/assets/planning.svg"
                  width={450}
                  height={450}
                  alt="Mystical Planning Illustration"
                  className="drop-shadow-xl"
                />
              </div>
            </div>
          </section>

          {/* Right Section - Sign In */}
          <div className="relative">
            {/* Mystical glow behind sign-in */}
            <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-3xl blur-3xl opacity-60"></div>

            {/* Sign-in container */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Begin Your Journey</h2>
                <p className="text-purple-200/80 text-sm">Step into your mystical scheduling realm</p>
              </div>

              <SignIn
                routing="hash"
                appearance={{
                  baseTheme: neobrutalism,
                  elements: {
                    rootBox: "shadow-2xl",
                    card: "bg-white/95 backdrop-blur-sm border-0 shadow-xl",
                    headerTitle: "text-purple-900",
                    headerSubtitle: "text-purple-700",
                    formButtonPrimary:
                      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300",
                    formFieldInput: "border-purple-200 focus:border-purple-400 focus:ring-purple-400/20",
                    footerActionLink: "text-purple-600 hover:text-purple-700",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom mystical elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>
  )
}