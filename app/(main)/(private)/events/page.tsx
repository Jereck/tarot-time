import EventCard from "@/components/cards/EventCard"
import { Button } from "@/components/ui/button"
import { getEvents } from "@/server/actions/events"
import { auth } from "@clerk/nextjs/server"
import { CalendarPlus, CalendarRange, Sparkles } from "lucide-react"
import Link from "next/link"

export default async function EventsPage() {
  const { userId, redirectToSignIn } = await auth()
  if (!userId) return redirectToSignIn()

  const events = await getEvents(userId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 relative overflow-hidden">
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-900/10"></div>

      <section className="relative z-10 flex flex-col items-center gap-16 animate-fade-in pt-28 pb-16 px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-center text-center lg:text-left">
          <div className="relative">
            <h1 className="text-5xl xl:text-7xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              Sacred Events
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-3xl opacity-50 -z-10"></div>
          </div>

          <Button
            className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 px-8 text-xl font-bold rounded-full shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group border-0"
            asChild
          >
            <Link href="/events/new">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <CalendarPlus className="mr-3 size-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Create Event</span>
              <Sparkles className="ml-3 size-5 group-hover:scale-125 transition-transform duration-300" />
            </Link>
          </Button>
        </div>

        {events.length > 0 ? (
          <div className="w-full max-w-7xl">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events.map((event) => (
                <div key={event.id} className="group">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-1 shadow-2xl">
                      <EventCard {...event} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 text-center max-w-2xl">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-full blur-3xl opacity-60"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-full p-8 border border-white/20 shadow-2xl">
                <CalendarRange className="size-20 text-purple-200 drop-shadow-lg" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                Your Mystical Journey Awaits
              </h2>
              <p className="text-lg text-purple-100/80 leading-relaxed">
                You haven't created any sacred events yet. Begin your spiritual scheduling journey by creating your
                first mystical event!
              </p>
            </div>

            <Button
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 px-10 text-xl font-bold rounded-full shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group border-0"
              asChild
            >
              <Link href="/events/new">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <CalendarPlus className="mr-4 size-7 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Create Your First Event</span>
                <Sparkles className="ml-4 size-6 group-hover:scale-125 transition-transform duration-300" />
              </Link>
            </Button>

            <div className="flex gap-4 mt-8 opacity-60">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-300/30">
                <span className="text-purple-200 text-sm font-medium">✨ Tarot Sessions</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-300/30">
                <span className="text-pink-200 text-sm font-medium">🌙 Astrology Readings</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-300/30">
                <span className="text-blue-200 text-sm font-medium">🔮 Spiritual Guidance</span>
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>
  )
}
