
"use client";

import React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button, buttonVariants } from "@/components/ui/button"; // Added buttonVariants import
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronDown,
  ChevronsLeftRight,
  Plus,
  Circle, // For App Calendars placeholder
  Tag, // Placeholder for Resources
  Home, // Placeholder for Calendar icon next to "Calendar" title
} from "lucide-react";
import { cn } from '@/lib/utils';
// Assuming a shared icon for dropdowns, or use specific ones
// import { ChevronDownIcon } from "@radix-ui/react-icons";

const AppTitle = () => (
  <div className="flex items-center space-x-2 p-4 text-xl font-semibold text-sidebar-foreground">
    {/* <Home className="h-6 w-6 text-sidebar-foreground" />  Could be a logo */}
    <span>Calendar</span>
  </div>
);

const calendarSections = [
  {
    title: "MY CALENDARS",
    items: [
      { id: "my-cal-1", label: "Paula team calendar", checked: true, color: "bg-green-500" },
      { id: "my-cal-2", label: "Team Calendar", checked: true, color: "bg-blue-500" },
    ],
    type: "checkbox"
  },
  {
    title: "GROUP CALENDARS",
    items: [
      { id: "group-cal-1", label: "Content Discussion", checked: true, color: "bg-purple-500" },
      { id: "group-cal-2", label: "Zylker Tech", checked: true, color: "bg-yellow-500" },
      { id: "group-cal-3", label: "Marketing Event", checked: false, color: "bg-pink-500" },
    ],
    type: "checkbox"
  },
  {
    title: "APP CALENDARS",
    items: [
      { id: "app-cal-1", label: "Holidays in United States", color: "bg-red-400" },
      { id: "app-cal-2", label: "Birthdays", color: "bg-teal-400" },
    ],
    type: "circle" // To render a circle instead of checkbox
  },
];


export default function AppSidebar() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  // State for checkbox controls
  const [calendarItems, setCalendarItems] = React.useState(() => {
    const initialState: Record<string, boolean> = {};
    calendarSections.forEach(section => {
      if (section.type === "checkbox") {
        section.items.forEach(item => {
          initialState[item.id] = item.checked || false;
        });
      }
    });
    return initialState;
  });

  const handleCheckboxChange = (id: string) => {
    setCalendarItems(prev => ({ ...prev, [id]: !prev[id] }));
  };


  return (
    <Sidebar
      variant="sidebar" // This ensures it's a fixed sidebar, not floating
      collapsible="icon" // Allows collapse to icon state
      side="left"
      className="border-r bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] md:w-[var(--sidebar-width)] group-data-[collapsible=icon]:md:w-[var(--sidebar-width-icon)]"
      // style={{ '--sidebar-width': '280px' } as React.CSSProperties} // Control width via var
    >
      <SidebarHeader className="p-0">
        <AppTitle />
      </SidebarHeader>

      <SidebarContent className="flex flex-col p-3 space-y-3 overflow-y-auto">
        <Button variant="default" size="lg" className="w-full justify-between bg-primary hover:bg-primary/90 text-primary-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:aspect-square group-data-[collapsible=icon]:p-0">
          <div className="flex items-center group-data-[collapsible=icon]:justify-center flex-grow">
            <Plus className="h-5 w-5 mr-2 group-data-[collapsible=icon]:mr-0 flex-shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">New Event</span>
          </div>
          <ChevronDown className="h-4 w-4 ml-2 group-data-[collapsible=icon]:hidden flex-shrink-0" />
        </Button>

        {/* Placeholder for "Calendar" and "Resources" links from screenshot */}
         <SidebarMenu className="px-0 group-data-[collapsible=icon]:mt-1 group-data-[collapsible=icon]:space-y-1">
            <SidebarMenuItem>
                 <SidebarMenuButton
                    variant="ghost" // Use ghost for non-active, or default for active
                    size="default" // controls padding and height
                    className="w-full justify-start text-sm font-medium bg-sidebar-accent/10 text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10"
                    tooltip="Calendar"
                    isActive // Mark as active
                >
                    <Home className="h-4 w-4 mr-2 group-data-[collapsible=icon]:mr-0 flex-shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden truncate flex-grow">Calendar</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                 <SidebarMenuButton
                    variant="ghost"
                    size="default"
                    className="w-full justify-start text-sm font-normal text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10"
                    tooltip="Resources"
                >
                    <Tag className="h-4 w-4 mr-2 group-data-[collapsible=icon]:mr-0 flex-shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden truncate flex-grow">Resources</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>


        {calendarSections.map((section) => (
          <SidebarGroup key={section.title} className="p-0 mt-2">
            <SidebarGroupLabel className="px-1 py-1 text-xs font-semibold uppercase tracking-wider text-sidebar-muted-foreground group-data-[collapsible=icon]:hidden">
              {section.title}
            </SidebarGroupLabel>
            <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:py-2">
              {/* Placeholder icon for collapsed sections */}
              <Circle className="h-4 w-4 text-sidebar-muted-foreground" />
            </div>
            <SidebarMenu className="px-1 group-data-[collapsible=icon]:mt-1 group-data-[collapsible=icon]:space-y-0.5">
              {section.items.map(item => (
                <SidebarMenuItem key={item.id}>
                  <div 
                    className={cn(
                        "flex items-center w-full text-sm font-normal text-sidebar-foreground hover:bg-sidebar-accent/10 rounded-md py-1.5 px-2 cursor-pointer group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:p-0",
                        section.type === "checkbox" && calendarItems[item.id] && section.title === "MY CALENDARS" && "bg-sidebar-muted-foreground/20" // Active style for "Paula team calendar"
                    )}
                    onClick={section.type === "checkbox" ? () => handleCheckboxChange(item.id) : undefined}
                    title={item.label} // For tooltip on hover in collapsed mode
                   >
                    {section.type === "checkbox" ? (
                      <Checkbox
                        id={item.id}
                        checked={calendarItems[item.id]}
                        onCheckedChange={() => handleCheckboxChange(item.id)}
                        className="h-4 w-4 mr-2.5 border-sidebar-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary group-data-[collapsible=icon]:mr-0 flex-shrink-0"
                      />
                    ) : (
                      <div className={cn("h-3 w-3 rounded-full mr-2.5 group-data-[collapsible=icon]:mr-0 flex-shrink-0", item.color)} />
                    )}
                    <span className="group-data-[collapsible=icon]:hidden truncate flex-grow">{item.label}</span>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}

        <Button variant="link" size="sm" className="text-sidebar-muted-foreground hover:text-sidebar-foreground justify-start px-1 group-data-[collapsible=icon]:hidden">
          More...
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
        
        <div className="mt-auto pt-3 border-t border-sidebar-border group-data-[collapsible=icon]:hidden">
           <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md p-0 [&_button]:h-7 [&_button]:w-7 [&_caption_label]:text-sm [&_caption_label]:font-medium [&_table]:w-full text-sidebar-foreground"
            classNames={{
                head_cell: "text-sidebar-muted-foreground w-8 font-normal text-[0.8rem]",
                cell: "text-center text-sm p-0 relative text-sidebar-foreground focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-sidebar-accent/30 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                day: cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-sidebar-accent/20"
                ),
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-sidebar-accent/20 text-sidebar-accent-foreground",
                day_outside: "text-sidebar-muted-foreground opacity-50",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-sidebar-muted-foreground hover:bg-sidebar-accent/10"
                ),
                caption_label: "text-sidebar-foreground",
            }}
            numberOfMonths={1}
          />
        </div>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border group-data-[collapsible=icon]:justify-center">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-muted-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-accent group-data-[collapsible=icon]:mx-auto">
            <ChevronsLeftRight className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

    