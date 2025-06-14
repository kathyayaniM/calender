
"use client";

import { useState, useEffect, useCallback } from "react";
import CalendarHeader from "@/components/CalendarHeader";
import CalendarGrid from "@/components/CalendarGrid";
import EventDetailsModal from "@/components/EventDetailsModal";
import AddEventModal from "@/components/AddEventModal";
import type { CalendarEvent } from "@/types/calendar";
import { getMonthlyTheme } from "@/lib/themeConfig";
import {
  startOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  format as formatDate,
  addDays, 
  startOfWeek
} from "date-fns";

const EVENTS_STORAGE_KEY = "calendarEvents";

export default function EventCalendar() {
  const [today, setToday] = useState(new Date());
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState(startOfMonth(today));
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);
  const [selectedDayForDetails, setSelectedDayForDetails] = useState<Date | null>(null);
  const [eventsForSelectedDay, setEventsForSelectedDay] = useState<CalendarEvent[]>([]);

  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [selectedDateForNewEvent, setSelectedDateForNewEvent] = useState<Date | null>(null);

  useEffect(() => {
    const initialDate = new Date();
    setToday(initialDate);
    setCurrentDisplayMonth(startOfMonth(initialDate));
    
    async function loadEvents() {
      try {
        const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
        } else {
          // Fallback to empty list if events.json is not found or fails to load
          console.warn("/events.json not found or failed to load, starting with empty events list.");
          localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify([])); 
          setEvents([]);
        }
      } catch (error) {
        console.error("Failed to load events:", error);
        setEvents([]); 
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify([]));
      }
    }
    loadEvents();
  }, []);

  useEffect(() => {
    const monthIndex = currentDisplayMonth.getMonth();
    if (typeof document !== 'undefined') {
      const isDarkMode = document.documentElement.classList.contains('dark');
      // getMonthlyTheme now returns an object with primaryRaw etc.
      const themeColors = getMonthlyTheme(monthIndex, isDarkMode); 
      const root = document.documentElement;

      root.style.setProperty('--dynamic-primary', themeColors.primary.replace('hsl(', '').replace(')', ''));
      root.style.setProperty('--dynamic-primary-foreground', themeColors.primary_foreground.replace('hsl(', '').replace(')', ''));
      root.style.setProperty('--dynamic-accent', themeColors.accent.replace('hsl(', '').replace(')', ''));
      root.style.setProperty('--dynamic-accent-foreground', themeColors.accent_foreground.replace('hsl(', '').replace(')', ''));
      
      // Use the raw HSL values for sidebar accents, derived from the monthly theme's primary
      root.style.setProperty('--sidebar-accent', `hsl(${themeColors.primaryRaw})`);
      root.style.setProperty('--sidebar-accent-foreground', `hsl(${themeColors.primary_foregroundRaw})`);
      root.style.setProperty('--sidebar-primary', `hsl(${themeColors.primaryRaw})`);
      root.style.setProperty('--sidebar-primary-foreground', `hsl(${themeColors.primary_foregroundRaw})`);
      root.style.setProperty('--ring', `hsl(${themeColors.primaryRaw})`); // Main content ring
      root.style.setProperty('--sidebar-ring', `hsl(${themeColors.primaryRaw})`); // Sidebar ring
    }
  }, [currentDisplayMonth]);


  const handlePrevMonth = useCallback(() => {
    setCurrentDisplayMonth((prev) => subMonths(prev, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDisplayMonth((prev) => addMonths(prev, 1));
  }, []);

  const handleGoToToday = useCallback(() => {
    const newToday = new Date();
    setToday(newToday);
    setCurrentDisplayMonth(startOfMonth(newToday));
  }, []);
  
  const openAddEventModal = useCallback((date: Date) => {
    setSelectedDateForNewEvent(date);
    setIsAddEventModalOpen(true);
    if(isEventDetailsModalOpen) {
      setIsEventDetailsModalOpen(false);
    }
  }, [
    isEventDetailsModalOpen, 
    setSelectedDateForNewEvent, 
    setIsAddEventModalOpen, 
    setIsEventDetailsModalOpen // Explicitly add setter
  ]);

  const handleAddEventHeaderClick = useCallback(() => {
    openAddEventModal(selectedDayForDetails || today);
  }, [today, selectedDayForDetails, openAddEventModal]);

  const handleDateClick = useCallback((date: Date, dayEvents: CalendarEvent[]) => {
    setSelectedDayForDetails(date);
    setEventsForSelectedDay(dayEvents);
    setIsEventDetailsModalOpen(true);
  }, []);
  
  const closeEventDetailsModal = useCallback(() => {
    setIsEventDetailsModalOpen(false);
    setSelectedDayForDetails(null);
    setEventsForSelectedDay([]);
  }, []);

  const closeAddEventModal = useCallback(() => {
    setIsAddEventModalOpen(false);
    setSelectedDateForNewEvent(null);
  }, []);

  const handleAddEventToList = useCallback((newEventData: Omit<CalendarEvent, "id" | "date"> & { date: string }) => {
    const newEvent: CalendarEvent = {
      ...newEventData,
      id: `evt-${new Date().getTime()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setEvents(prevEvents => {
      const updatedEvents = [...prevEvents, newEvent];
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedEvents));
      return updatedEvents;
    });
    closeAddEventModal();
    if (selectedDayForDetails && newEvent.date === formatDate(selectedDayForDetails, "yyyy-MM-dd")) {
        setEventsForSelectedDay(prev => [...prev, newEvent].sort((a,b) => a.time.localeCompare(b.time)));
    }
  }, [closeAddEventModal, selectedDayForDetails]);

  const firstDayOfMonth = startOfMonth(currentDisplayMonth);
  const gridStartDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 }); 
  let daysInGrid = eachDayOfInterval({
    start: gridStartDate,
    end: addDays(gridStartDate, 41), 
  });

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
        <CalendarHeader
          currentDate={currentDisplayMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onGoToToday={handleGoToToday}
          onAddEventClick={handleAddEventHeaderClick} 
        />
        <div className="flex-grow overflow-auto">
          <CalendarGrid
            days={daysInGrid}
            currentMonth={currentDisplayMonth}
            events={events}
            onDateClick={handleDateClick}
            today={today}
          />
        </div>
        {selectedDayForDetails && (
          <EventDetailsModal
            isOpen={isEventDetailsModalOpen}
            onClose={closeEventDetailsModal}
            date={selectedDayForDetails}
            events={eventsForSelectedDay}
            onOpenAddEventModal={openAddEventModal}
          />
        )}
        {selectedDateForNewEvent && (
          <AddEventModal
            isOpen={isAddEventModalOpen}
            onClose={closeAddEventModal}
            eventDate={selectedDateForNewEvent}
            onAddEvent={handleAddEventToList}
          />
        )}
    </div>
  );
}

