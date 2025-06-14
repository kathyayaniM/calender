
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddEventForm from "./AddEventForm";
import type { CalendarEvent } from "@/types/calendar";
import { format } from "date-fns";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventDate: Date | null;
  onAddEvent: (eventData: Omit<CalendarEvent, "id" | "date"> & { date: string }) => void;
}

export default function AddEventModal({
  isOpen,
  onClose,
  eventDate,
  onAddEvent,
}: AddEventModalProps) {
  if (!eventDate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-popover text-popover-foreground rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-foreground">
            Add New Event
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in the details for your new event on {format(eventDate, "MMMM do, yyyy")}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <AddEventForm
            eventDate={eventDate}
            onSubmit={onAddEvent}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
