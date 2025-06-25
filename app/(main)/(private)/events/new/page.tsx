import EventForm from "@/components/forms/EventForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarPlus, Sparkles, Stars } from "lucide-react"

export default function NewEventPage() {
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
      </div>

      {/* Mystical gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-900/10"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 pt-24">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <CalendarPlus className="w-8 h-8 text-purple-300" />
              <div className="absolute -inset-2 bg-purple-400/30 rounded-full blur-lg opacity-60"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
              Create Sacred Event
            </h1>
            <Stars className="w-6 h-6 text-pink-300 animate-pulse" />
          </div>
          <p className="text-purple-200/80 text-lg">Design your mystical offering for spiritual seekers</p>
        </div>

        {/* Event Form Card */}
        <div className="relative w-full max-w-2xl">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-60"></div>
          <Card className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10">
              <CardTitle className="text-2xl font-bold text-purple-100 flex items-center gap-3">
                <CalendarPlus className="w-6 h-6 text-purple-300" />
                Event Details
                <div className="ml-auto bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                  <span className="text-sm text-purple-200/80 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Mystical
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <EventForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom mystical elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>
  )
}
