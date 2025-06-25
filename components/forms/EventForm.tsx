"use client"

import { eventFormSchema } from "@/schema/events"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { useTransition } from "react"
import Link from "next/link"
import { createEvent, deleteEvent, updateEvent } from "@/server/actions/events"
import { useRouter } from "next/navigation"
import { Calendar, Clock, FileText, Power, Trash2, Save, X, Sparkles } from "lucide-react"

export default function EventForm({
  event,
}: {
  event?: {
    id: string
    name: string
    description?: string
    durationInMinutes: number
    isActive: boolean
  }
}) {
  const [isDeletePending, startDeleteTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event
      ? {
          ...event,
        }
      : {
          isActive: true,
          durationInMinutes: 30,
          description: "",
          name: "",
        },
  })

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const action = event == null ? createEvent : updateEvent.bind(null, event.id)
    try {
      await action(values)
      router.push("/events")
    } catch (error: any) {
      form.setError("root", {
        message: `There was an error saving your event ${error.message}`,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-8 flex-col">
        {form.formState.errors.root && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-4 text-red-200 text-sm">
            {form.formState.errors.root.message}
          </div>
        )}

        {/* Event Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-purple-200 font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-300" />
                Event Name
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-purple-100 placeholder:text-purple-300/50 hover:border-white/40 focus:border-purple-400 transition-colors duration-300"
                  placeholder="Tarot Reading Session"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-purple-300/70">
                The mystical name seekers will see when booking your sacred service
              </FormDescription>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="durationInMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-purple-200 font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-300" />
                Sacred Duration
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-purple-100 placeholder:text-purple-300/50 hover:border-white/40 focus:border-purple-400 transition-colors duration-300"
                  placeholder="30"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-purple-300/70">
                Duration in minutes for your mystical session
              </FormDescription>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-purple-200 font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-300" />
                Sacred Description
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-purple-100 placeholder:text-purple-300/50 hover:border-white/40 focus:border-purple-400 transition-colors duration-300 resize-none h-32"
                  placeholder="Discover the mysteries that await you in this transformative session..."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-purple-300/70">
                Optional mystical description to guide seekers to your offering
              </FormDescription>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />

        {/* Active Status */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Power className="w-5 h-5 text-purple-300" />
                    <div>
                      <FormLabel className="text-purple-200 font-semibold text-base">Event Status</FormLabel>
                      <FormDescription className="text-purple-300/70 mt-1">
                        Inactive events remain hidden from spiritual seekers
                      </FormDescription>
                    </div>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-pink-600"
                      />
                    </div>
                  </FormControl>
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-4">
          {event && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-red-200 border border-red-400/30 hover:border-red-400/60 transition-all duration-300 group"
                  variant="outline"
                  disabled={isDeletePending || form.formState.isSubmitting}
                >
                  <Trash2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-slate-900/95 backdrop-blur-lg border border-white/20 text-purple-100">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-purple-200">Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-purple-300/80">
                    This action cannot be undone. This will permanently delete this sacred event and remove it from the
                    mystical realm.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white/10 backdrop-blur-sm border border-white/20 text-purple-200 hover:bg-white/20">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0"
                    disabled={isDeletePending || form.formState.isSubmitting}
                    onClick={() => {
                      startDeleteTransition(async () => {
                        try {
                          await deleteEvent(event.id)
                          router.push("/events")
                        } catch (error: any) {
                          form.setError("root", {
                            message: `There was an error deleting your event: ${error.message}`,
                          })
                        }
                      })
                    }}
                  >
                    {isDeletePending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Forever
                      </>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button
            disabled={isDeletePending || form.formState.isSubmitting}
            type="button"
            asChild
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-purple-200 hover:bg-white/20 hover:text-purple-100 transition-all duration-300"
            variant="outline"
          >
            <Link href="/events">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Link>
          </Button>

          <Button
            className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold border-0 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group"
            disabled={isDeletePending || form.formState.isSubmitting}
            type="submit"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              {form.formState.isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Save Sacred Event
                  <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </>
              )}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
