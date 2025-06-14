
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Search,
  Bell,
  Settings,
  Printer,
  LayoutGrid,
  MailQuestion, // For "Yet to respond"
  ChevronDown,
  Plus
} from "lucide-react";
import { format, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import React from 'react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void; // Will act as prev period (week/month)
  onNextMonth: () => void; // Will act as next period
  onGoToToday: () => void;
  onAddEventClick: () => void;
  // onSetView: (view: "Month" | "Week" | "Day") => void; // For view switcher
  // currentView: "Month" | "Week" | "Day";
}

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onGoToToday,
  onAddEventClick,
}: CalendarHeaderProps) {
  const [currentView, setCurrentView] = React.useState<"Month" | "Week" | "Day">("Month"); // Default to Month view

  const displayDateRange = () => {
    if (currentView === "Month") {
      return format(currentDate, "MMMM yyyy");
    }
    // For Week view (approximation, as we are still month-based internally)
    const start = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday
    const end = endOfWeek(currentDate, { weekStartsOn: 0 });
    if (start.getMonth() === end.getMonth()) {
      return `${format(start, "d")} - ${format(end, "d MMM, yyyy")}`;
    }
    return `${format(start, "d MMM")} - ${format(end, "d MMM, yyyy")}`;
  };


  return (
    <div className="flex flex-col sticky top-0 z-10 bg-card border-b">
      {/* Top bar: Search, actions, user */}
      <div className="flex items-center justify-between p-2 md:p-3 border-b">
        <div className="flex items-center space-x-2">
           <CalendarDays className="h-6 w-6 text-primary flex-shrink-0" />
           <h1 className="text-xl font-semibold text-foreground">
             Calendar
           </h1>
        </div>
        <div className="flex-1 max-w-md px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search Events ( / )" 
              className="pl-10 pr-4 py-2 h-9 text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
          <Button variant="ghost" size="icon" aria-label="Add something new">
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 p-1 h-auto rounded-full hover:bg-secondary/50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="Uziql Renta" data-ai-hint="professional woman" />
                  <AvatarFallback>UR</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start leading-none">
                    <span className="text-xs font-medium text-foreground">Uziql Renta</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Controls bar: Title, date nav, view switcher, add event */}
      <div className="flex items-center justify-between p-2 md:p-3">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-medium text-foreground">Full Event Schedule</h2>
          <Button variant="outline" size="sm" onClick={onGoToToday} className="h-8 text-xs px-2.5">
            This Week
          </Button>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onPrevMonth} aria-label="Previous period" className="h-8 w-8 p-1">
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </Button>
            <span className="text-base font-medium text-foreground mx-2 w-40 text-center">
              {displayDateRange()}
            </span>
            <Button variant="ghost" size="icon" onClick={onNextMonth} aria-label="Next period" className="h-8 w-8 p-1">
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-3">
                {currentView}
                <ChevronDown className="h-4 w-4 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem onClick={() => setCurrentView("Month")} className={currentView === 'Month' ? 'bg-accent' : ''}>Month View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentView("Week")} className={currentView === 'Week' ? 'bg-accent' : ''}>Week View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentView("Day")} className={currentView === 'Day' ? 'bg-accent' : ''}>Day View</DropdownMenuItem>
              <DropdownMenuItem>Timeline View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-primary">
            <MailQuestion className="h-4 w-4 mr-1.5" /> Yet to respond
          </Button>
          <Button variant="ghost" size="icon" aria-label="Print" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <Printer className="h-4 w-4" />
          </Button>
           <Button variant="ghost" size="icon" aria-label="Apps" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Settings" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="default" size="sm" className="h-8 px-4" onClick={onAddEventClick}>
            <Plus className="h-4 w-4 mr-1.5" /> Add Event
          </Button>
        </div>
      </div>
    </div>
  );
}
