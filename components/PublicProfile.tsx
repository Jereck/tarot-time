"use client"

import { getPublicEvents, type PublicEvent } from "@/server/actions/events"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import { Copy, Eye, Sparkles, Moon, Stars, Calendar } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { toast } from "sonner"
import PublicEventCard from "./cards/PublicEventCard"

type PublicProfileProps = {
  userId: string
  fullName: string | null
}

export default function PublicProfile({ userId, fullName }: PublicProfileProps) {
  const [events, setEvents] = useState<PublicEvent[] | null>(null)
  const { user } = useUser()

  const copyProfileUrl = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/book/${userId}`)
      toast("Profile URL copied to clipboard!", {
        duration: 3000,
        className:
          "!rounded-2xl !py-4 !px-6 !bg-gradient-to-r !from-purple-600 !to-pink-600 !text-white !font-semibold !border-0 !shadow-2xl",
      })
    } catch (error) {
      console.error("Failed to copy URL:", error)
    }
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getPublicEvents(userId)
        setEvents(fetchedEvents)
      } catch (error) {
        console.error("Error fetching events:", error)
        setEvents([])
      }
    }

    fetchEvents()
  }, [userId])

  if (events === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-60"></div>
          <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse opacity-80"></div>
          <div className="absolute top-60 left-1/3 w-1 h-1 bg-pink-300 rounded-full animate-ping opacity-50"></div>
          <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-pulse opacity-60"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loading />
            <p className="text-purple-200/80 mt-4 text-lg">Loading mystical profile...</p>
          </div>
        </div>
      </div>
    )
  }

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
        <div className="absolute top-80 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-60"></div>
      </div>

      {/* Mystical gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-900/10"></div>

      <div className="relative z-10 max-w-6xl mx-auto p-6 pt-24 pb-16">
        {/* Preview Notice for Owner */}
        {user?.id === userId && (
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 shadow-lg">
              <div className="flex items-center gap-2 text-purple-200">
                <Eye className="w-4 h-4 text-purple-300" />
                <p className="font-medium">This is your mystical public presence</p>
                <Sparkles className="w-4 h-4 text-pink-300 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              {fullName}
            </h1>
            <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-3xl opacity-50 -z-10"></div>
          </div>

          {/* Copy Profile URL Button */}
          {user?.id === userId && (
            <div className="mb-8">
              <Button
                className="relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-purple-200 hover:bg-white/20 hover:text-purple-100 hover:border-white/40 transition-all duration-300 group rounded-full px-6 py-3"
                onClick={copyProfileUrl}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Copy className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Share Your Mystical Profile
                  <Stars className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          )}

          {/* Welcome Message */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Moon className="w-6 h-6 text-purple-300" />
                <h2 className="text-2xl font-bold text-purple-100">Sacred Connections Await</h2>
                <Moon className="w-6 h-6 text-purple-300 scale-x-[-1]" />
              </div>
              <p className="text-purple-200/80 text-lg leading-relaxed">
                Choose from my mystical offerings below and let's embark on a transformative journey together through
                the cosmic realms of insight and wisdom.
              </p>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-purple-300" />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                Mystical Services
              </h3>
              <Sparkles className="w-6 h-6 text-pink-300 animate-pulse" />
            </div>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 shadow-2xl max-w-md mx-auto">
                <div className="relative mb-6">
                  <Moon className="w-16 h-16 text-purple-300 mx-auto" />
                  <div className="absolute -inset-4 bg-purple-400/30 rounded-full blur-lg opacity-60"></div>
                </div>
                <h4 className="text-xl font-semibold text-purple-200 mb-3">The Stars Are Aligning</h4>
                <p className="text-purple-300/80">
                  New mystical offerings are being prepared. Please return soon to discover the sacred services that
                  await.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <PublicEventCard {...event} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mystical Footer Decoration */}
        <div className="flex justify-center items-center gap-4 mt-16 opacity-60">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-300/30">
            <span className="text-purple-200 text-sm font-medium">✨ Guided by Intuition</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-300/30">
            <span className="text-pink-200 text-sm font-medium">🌙 Powered by Cosmic Energy</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-300/30">
            <span className="text-blue-200 text-sm font-medium">🔮 Mystical Wisdom</span>
          </div>
        </div>
      </div>

      {/* Bottom mystical elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>
  )
}
