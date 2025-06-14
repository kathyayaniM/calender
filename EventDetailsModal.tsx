
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CalendarEvent, CategoryStyle } from "@/types/calendar";
import { CATEGORY_STYLES } from "@/types/calendar";
import Icon from '@/components/icons';
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  events: CalendarEvent[];
  onOpenAddEventModal: (date: Date) => void;
}

export default function EventDetailsModal({
  isOpen,
  onClose,
  date,
  events,
  onOpenAddEventModal,
}: EventDetailsModalProps) {
  if (!date) return null;

  const getCategoryStyle = (category?: string): CategoryStyle => {
    const styleKey = category && category in CATEGORY_STYLES ? category : 'default';
    return CATEGORY_STYLES[styleKey];
  };

  const sortedEvents = [...events].sort((a, b) => {
    const timeA = parse(a.time, "HH:mm", new Date());
    const timeB = parse(b.time, "HH:mm", new Date());
    return timeA.getTime() - timeB.getTime();
  });

  const handleAddNewEventClick = () => {
    onOpenAddEventModal(date);
    onClose(); // Close this modal after triggering the add event modal
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:sm:max-w-[550px] bg-popover text-popover-foreground rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-foreground">
            Events for {format(date, "MMMM do, yyyy")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {sortedEvents.length > 0
              ? `You have ${sortedEvents.length} event(s) scheduled.`
              : "No events scheduled for this day."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] p-1">
          {sortedEvents.length > 0 ? (
            <ul className="space-y-3 pr-3">
              {sortedEvents.map((event) => {
                const categoryStyle = getCategoryStyle(event.category);
                const IconComponent = categoryStyle.iconName ? Icon : null;
                const startTime = parse(event.time, "HH:mm", new Date(event.date));
                const endTime = new Date(startTime.getTime() + event.duration * 60000);

                return (
                  <li
                    key={event.id}
                    className={cn(
                        "p-3 rounded-md flex items-start space-x-3",
                        categoryStyle.colorClass,
                        categoryStyle.textColorClass || 'text-foreground' 
                      )}
                  >
                    {IconComponent && (
                      <div className="flex-shrink-0 mt-1">
                        <IconComponent name={categoryStyle.iconName as any} className="h-5 w-5" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm">
                        {format(startTime, "p")} - {format(endTime, "p")} ({event.duration} mins)
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Relax! No events for today.
            </p>
          )}
        </ScrollArea>
        <DialogFooter className="pt-4">
          <Button onClick={handleAddNewEventClick} variant="default">
            Add New Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
