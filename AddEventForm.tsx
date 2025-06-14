
"use client";

import type React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { CalendarEvent } from "@/types/calendar";
import { CATEGORY_STYLES } from "@/types/calendar";

const addEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  category: z.string().optional(),
});

type AddEventFormData = z.infer<typeof addEventSchema>;

interface AddEventFormProps {
  eventDate: Date;
  onSubmit: (data: Omit<CalendarEvent, "id" | "date"> & { date: string }) => void;
  onCancel: () => void;
}

export default function AddEventForm({ eventDate, onSubmit, onCancel }: AddEventFormProps) {
  const form = useForm<AddEventFormData>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      title: "",
      time: "10:00",
      duration: 60,
      category: "default",
    },
  });

  const handleSubmit = (data: AddEventFormData) => {
    onSubmit({
      ...data,
      date: format(eventDate, "yyyy-MM-dd"),
      category: data.category || "default",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="event-date" className="text-sm font-medium text-muted-foreground">Date</Label>
          <Input
            id="event-date"
            type="text"
            value={format(eventDate, "MMMM do, yyyy")}
            readOnly
            className="mt-1 bg-muted/50"
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Event Title</FormLabel>
              <FormControl>
                <Input id="title" placeholder="e.g., Team Meeting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="time">Time (HH:MM)</FormLabel>
                <FormControl>
                  <Input id="time" type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="duration">Duration (minutes)</FormLabel>
                <FormControl>
                  <Input id="duration" type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(CATEGORY_STYLES).map((catKey) => (
                    <SelectItem key={catKey} value={catKey}>
                      {catKey.charAt(0).toUpperCase() + catKey.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-3 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Event</Button>
        </div>
      </form>
    </Form>
  );
}
