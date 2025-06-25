"use client"

import { DAYS_OF_WEEK_IN_ORDER } from "@/constants"
import { timeToFloat } from "@/lib/utils"
import { scheduleFormSchema } from "@/schema/schedule"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import type { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { formatTimezoneOffset } from "@/lib/formatters"
import { Button } from "../ui/button"
import { Plus, X, Globe, Clock, Sparkles } from "lucide-react"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { saveSchedule } from "@/server/actions/schedule"

type Availability = {
  startTime: string
  endTime: string
  dayOfWeek: (typeof DAYS_OF_WEEK_IN_ORDER)[number]
}

const dayIcons: Record<string, string> = {
  monday: "🌙",
  tuesday: "⭐",
  wednesday: "🔮",
  thursday: "✨",
  friday: "🌟",
  saturday: "🌙",
  sunday: "☀️",
}

export function ScheduleForm({
  schedule,
}: {
  schedule?: {
    timezone: string
    availabilities: Availability[]
  }
}) {
  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      timezone: schedule?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      availabilities: schedule?.availabilities.toSorted((a, b) => {
        return timeToFloat(a.startTime) - timeToFloat(b.startTime)
      }),
    },
  })

  const {
    append: addAvailability,
    remove: removeAvailability,
    fields: availabilityFields,
  } = useFieldArray({ name: "availabilities", control: form.control })

  const groupedAvailabilityFields = Object.groupBy(
    availabilityFields.map((field, index) => ({ ...field, index })),
    (availability) => availability.dayOfWeek,
  )

  async function onSubmit(values: z.infer<typeof scheduleFormSchema>) {
    try {
      await saveSchedule(values)
      toast("Schedule saved successfully.", {
        duration: 5000,
        className:
          "!rounded-2xl !py-4 !px-6 !bg-gradient-to-r !from-purple-600 !to-pink-600 !text-white !font-semibold !border-0 !shadow-2xl",
      })
    } catch (error: any) {
      form.setError("root", {
        message: `There was an error saving your schedule${error.message}`,
      })
    }
  }

  return (
    <Form {...form}>
      <form className="flex gap-8 flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        {form.formState.errors.root && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-4 text-red-200 text-sm">
            {form.formState.errors.root.message}
          </div>
        )}

        {/* Timezone Selection */}
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-purple-200 font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-300" />
                Timezone
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/10 backdrop-blur-sm border border-white/20 text-purple-100 hover:border-white/40 transition-colors duration-300">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-900/95 backdrop-blur-lg border border-white/20 text-purple-100">
                  {Intl.supportedValuesOf("timeZone").map((timezone) => (
                    <SelectItem
                      key={timezone}
                      value={timezone}
                      className="hover:bg-purple-600/20 focus:bg-purple-600/20"
                    >
                      {timezone}
                      {` (${formatTimezoneOffset(timezone)})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />

        {/* Weekly Schedule Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-purple-300" />
            <h3 className="text-lg font-semibold text-purple-200">Weekly Availability</h3>
          </div>

          <div className="grid gap-6">
            {DAYS_OF_WEEK_IN_ORDER.map((dayOfWeek) => (
              <div
                key={dayOfWeek}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dayIcons[dayOfWeek]}</span>
                    <h4 className="text-lg font-semibold text-purple-200 capitalize">{dayOfWeek}</h4>
                  </div>
                  <Button
                    type="button"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full w-8 h-8 p-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                    onClick={() => {
                      addAvailability({
                        dayOfWeek,
                        startTime: "9:00",
                        endTime: "17:00",
                      })
                    }}
                  >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {groupedAvailabilityFields[dayOfWeek]?.map((field, labelIndex) => (
                    <div key={field.id} className="space-y-2">
                      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        {/* Start time input */}
                        <FormField
                          control={form.control}
                          name={`availabilities.${field.index}.startTime`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-purple-100 placeholder:text-purple-300/50 hover:border-white/40 focus:border-purple-400 transition-colors duration-300"
                                  placeholder="9:00"
                                  aria-label={`${dayOfWeek} Start Time ${labelIndex + 1}`}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <span className="text-purple-300 font-medium">to</span>

                        <FormField
                          control={form.control}
                          name={`availabilities.${field.index}.endTime`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-purple-100 placeholder:text-purple-300/50 hover:border-white/40 focus:border-purple-400 transition-colors duration-300"
                                  placeholder="17:00"
                                  aria-label={`${dayOfWeek} End Time ${labelIndex + 1}`}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="button"
                          className="bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-red-200 rounded-full w-8 h-8 p-0 border border-red-400/30 hover:border-red-400/60 transition-all duration-300 group"
                          onClick={() => removeAvailability(field.index)}
                        >
                          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        </Button>
                      </div>

                      {/* Error Messages */}
                      <div className="space-y-1">
                        <FormMessage className="text-red-300 text-sm">
                          {form.formState.errors.availabilities?.at?.(field.index)?.root?.message}
                        </FormMessage>
                        <FormMessage className="text-red-300 text-sm">
                          {form.formState.errors.availabilities?.at?.(field.index)?.startTime?.message}
                        </FormMessage>
                        <FormMessage className="text-red-300 text-sm">
                          {form.formState.errors.availabilities?.at?.(field.index)?.endTime?.message}
                        </FormMessage>
                      </div>
                    </div>
                  ))}

                  {!groupedAvailabilityFields[dayOfWeek]?.length && (
                    <div className="text-center py-4 text-purple-300/60 text-sm">No availability set for this day</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-4">
          <Button
            className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group border-0 disabled:opacity-50"
            disabled={form.formState.isSubmitting}
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
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Save Sacred Schedule
                </>
              )}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
