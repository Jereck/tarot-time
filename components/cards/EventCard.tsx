import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { formatEventDescription } from "@/lib/formatters"
import { Button } from "../ui/button"
import Link from "next/link"
import { CopyEventButton } from "../CopyEventButton"
import { Clock, Edit } from "lucide-react"

type EventCardProps = {
  id: string
  isActive: boolean
  name: string
  description: string | null
  durationInMinutes: number
  clerkUserId: string
}

export default function EventCard({ id, isActive, name, description, durationInMinutes, clerkUserId }: EventCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2",
        !isActive && "from-slate-800/60 to-slate-700/60 opacity-75",
      )}
    >
      {/* Subtle top accent */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent",
          !isActive && "via-gray-400",
        )}
      />

      {/* Status dot */}
      <div className="absolute top-4 right-4">
        <div
          className={cn(
            "w-2 h-2 rounded-full",
            isActive ? "bg-emerald-400 shadow-emerald-400/50 shadow-lg" : "bg-gray-400",
          )}
        />
      </div>

      <CardHeader className="pb-3">
        <CardTitle className={cn("text-white font-semibold text-lg leading-tight pr-6", !isActive && "text-gray-300")}>
          {name}
        </CardTitle>
        <CardDescription
          className={cn("text-purple-200/70 flex items-center gap-1.5 text-sm", !isActive && "text-gray-400")}
        >
          <Clock className="w-3.5 h-3.5" />
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>

      {description && (
        <CardContent className="py-0">
          <p className={cn("text-purple-100/80 text-sm leading-relaxed line-clamp-2", !isActive && "text-gray-400")}>
            {description}
          </p>
        </CardContent>
      )}

      <CardFooter className="pt-4 flex justify-between items-center">
        <div className="flex gap-2">
          {isActive && (
            <CopyEventButton
              variant="ghost"
              eventId={id}
              clerkUserId={clerkUserId}
              className="h-8 px-3 text-purple-300 hover:text-purple-200 hover:bg-purple-800/30"
            />
          )}
        </div>

        <Button
          size="sm"
          className="bg-purple-600 hover:bg-purple-500 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
          asChild
        >
          <Link href={`/events/${id}/edit`}>
            <Edit className="w-3.5 h-3.5 mr-1.5" />
            Edit
          </Link>
        </Button>
      </CardFooter>

      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Card>
  )
}
