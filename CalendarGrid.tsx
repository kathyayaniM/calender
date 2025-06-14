
import CalendarDay from "@/components/CalendarDay";
import type { CalendarEvent } from "@/types/calendar";
import { isSameDay, isSameMonth, format } from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  days: Date[];
  currentMonth: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date, eventsOnDay: CalendarEvent[]) => void;
  today: Date;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({
  days,
  currentMonth,
  events,
  onDateClick,
  today,
}: CalendarGridProps) {
  return (
    <div className="bg-card flex flex-col h-full shadow-none border-t"> {/* Removed rounded-lg and shadow, added border-t */}
      <div className="grid grid-cols-7 border-b">
        {WEEK_DAYS.map((dayName, index) => (
          <div
            key={dayName}
            className={cn(
              "p-2 py-2 text-center text-xs sm:text-sm font-medium text-muted-foreground",
              index < WEEK_DAYS.length -1 && "border-r",
              dayName.toLowerCase() === format(today, "E").toLowerCase() && isSameMonth(today, currentMonth) ? "text-primary font-semibold" : "" // Highlight current day of week header
            )}
          >
            {dayName.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6 flex-grow">
        {days.map((day, index) => {
          const eventsOnDay = events.filter((event) =>
            isSameDay(new Date(event.date + 'T00:00:00'), day) 
          );
          const isCurrentMonthDay = isSameMonth(day, currentMonth);
          
          const row = Math.floor(index / 7);
          const col = index % 7;

          return (
            <CalendarDay
              key={day.toISOString()}
              day={day}
              currentMonth={currentMonth}
              events={eventsOnDay}
              onClick={() => onDateClick(day, eventsOnDay)}
              isCurrentMonth={isCurrentMonthDay}
              isToday={isSameDay(day, today)}
              className={cn(
                col < 6 && "border-r", 
                row < 5 && "border-b"  
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
