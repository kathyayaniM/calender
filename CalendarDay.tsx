
import { cn } from "@/lib/utils";
import type { CalendarEvent, CategoryStyle } from "@/types/calendar";
import { CATEGORY_STYLES } from "@/types/calendar";
import { format, parse } from 'date-fns';
import Icon from '@/components/icons'; // Using the dynamic icon component
import { Sparkles } from "lucide-react"; // Default event icon

interface CalendarDayProps {
  day: Date;
  currentMonth: Date;
  events: CalendarEvent[];
  onClick: () => void;
  isCurrentMonth: boolean;
  isToday: boolean;
  className?: string;
}

export default function CalendarDay({ day, events, onClick, isCurrentMonth, isToday, className }: CalendarDayProps) {
  const MAX_VISIBLE_EVENTS = 2; // Adjust based on desired density for Zoho style

  const getCategoryStyle = (category?: string): CategoryStyle => {
    return CATEGORY_STYLES[category || 'default'] || CATEGORY_STYLES.default;
  };
  
  const EventIcon = ({ event }: { event: CalendarEvent }) => {
    const categoryStyle = getCategoryStyle(event.category);
    const iconName = event.icon || categoryStyle.iconName;
    if (iconName) {
      return <Icon name={iconName as any} className="h-3 w-3 text-muted-foreground/80" />;
    }
    return <Sparkles className="h-3 w-3 text-muted-foreground/80" />; // Default if no icon specified
  };

  return (
    <div
      className={cn(
        "relative flex flex-col p-1.5 min-h-[120px] sm:min-h-[130px] md:min-h-[140px] transition-colors duration-150 ease-in-out group", // Increased min-height
        isCurrentMonth ? "bg-card hover:bg-secondary/30" : "bg-muted/30 text-muted-foreground/60 hover:bg-muted/50",
        "cursor-pointer",
        className 
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Date ${format(day, "do MMMM yyyy")}, ${events.length} events`}
    >
      <span
        className={cn(
          "self-start text-xs font-medium p-1",
          isToday && isCurrentMonth && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center", 
          !isToday && isCurrentMonth && "text-foreground",
          !isCurrentMonth && "text-muted-foreground/70"
        )}
      >
        {format(day, "d")}
      </span>
      {isCurrentMonth && events.length > 0 && (
        <div className="mt-1 space-y-1.5 overflow-hidden flex-grow px-0.5"> {/* Reduced vertical spacing for events */}
          {events.slice(0, MAX_VISIBLE_EVENTS).map((event) => {
            const categoryStyle = getCategoryStyle(event.category);
            const startTime = parse(event.time, "HH:mm", new Date(event.date));
            const endTime = new Date(startTime.getTime() + event.duration * 60000);

            return (
              <div
                key={event.id}
                className={cn(
                  "flex items-start text-[10px] sm:text-xs p-1.5 rounded-sm overflow-hidden shadow-event relative",
                  categoryStyle.backgroundClass, 
                  categoryStyle.textColorClass || 'text-foreground/90',
                  "border-l-4", // Left border for color coding
                  categoryStyle.colorClass // This applies the border color, e.g., border-yellow-400
                )}
                title={`${event.title} at ${format(startTime, "p")} - ${format(endTime, "p")}`}
              >
                <div className="flex-grow">
                  <span className="font-semibold block truncate">{event.title}</span>
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground block">
                    {format(startTime, "hh:mma")} - {format(endTime, "hh:mma")}
                  </span>
                </div>
                <div className="absolute top-1 right-1">
                  <EventIcon event={event} />
                </div>
              </div>
            );
          })}
          {events.length > MAX_VISIBLE_EVENTS && (
            <div className="text-[10px] sm:text-xs text-primary mt-1 text-center font-medium">
              + {events.length - MAX_VISIBLE_EVENTS} more
            </div>
          )}
        </div>
      )}
    </div>
  );
}
