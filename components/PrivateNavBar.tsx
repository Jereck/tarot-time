'use client'

import { PrivateNavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrivateNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full h-20 bg-gradient-to-r from-indigo-950/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-b border-white/10 shadow-2xl mb-20">
      {/* Mystical background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-2 left-20 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-4 right-32 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-3 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-5 right-1/4 w-0.5 h-0.5 bg-pink-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-2 left-2/3 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse opacity-50"></div>
      </div>

      <div className="relative z-10 flex justify-between items-center h-full px-6 lg:px-10">
        {/* Logo with mystical glow */}
        <Link href="/events" className="flex items-center group">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20 group-hover:border-white/40 transition-all duration-300">
              <Image
                src="/assets/logo.png"
                width={50}
                height={50}
                alt="Mystical Scheduling"
                className="drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <section className="flex items-center">
          <div className="flex items-center gap-2 lg:gap-4">
            {PrivateNavLinks.map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

              return (
                <Link
                  href={item.route}
                  key={item.label}
                  className={cn(
                    "relative flex gap-3 items-center px-4 py-2.5 rounded-full transition-all duration-300 group overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm border border-purple-300/40 shadow-lg shadow-purple-500/20"
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
                          ? "bg-gradient-to-r from-purple-400 to-pink-400 opacity-30"
                          : "bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20",
                      )}
                    ></div>
                    <Image
                      src={item.imgURL || "/placeholder.svg"}
                      alt={item.label}
                      width={24}
                      height={24}
                      className={cn(
                        "relative transition-all duration-300",
                        isActive
                          ? "brightness-125 drop-shadow-lg"
                          : "brightness-90 group-hover:brightness-110 group-hover:scale-110",
                      )}
                    />
                  </div>

                  {/* Label */}
                  <p
                    className={cn(
                      "relative text-sm font-medium transition-all duration-300 max-lg:hidden",
                      isActive ? "text-purple-100 drop-shadow-sm" : "text-purple-200/80 group-hover:text-purple-100",
                    )}
                  >
                    {item.label}
                  </p>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* User Button with mystical styling */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></div>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20 group-hover:border-white/40 transition-all duration-300">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-8 h-8 ring-2 ring-purple-300/30 group-hover:ring-purple-300/60 transition-all duration-300",
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
    </nav>
  )
}