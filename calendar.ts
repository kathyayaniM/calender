
export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  duration: number; // in minutes
  category?: string;
  icon?: string; // Lucide icon name for the event (e.g., 'Sparkles', 'Settings2')
}

export interface CategoryStyle {
  colorClass: string; // For the left border color
  backgroundClass: string; // For the event block background
  textColorClass?: string; // Optional specific text color
  iconName?: string; // Default icon for this category if event.icon is not set
}

// Zoho-inspired Event Category Styles
export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  work: { // Example: Yellow in screenshot
    backgroundClass: 'bg-event-cat1-bg', // Pale Yellow
    colorClass: 'border-event-cat1-border', // Matching border, or a darker shade like border-yellow-400
    textColorClass: 'text-yellow-800', // Darker yellow text for contrast
    iconName: 'Briefcase',
  },
  meeting: { // Example: Light blue in screenshot
    backgroundClass: 'bg-event-cat2-bg', // Pale Cyan/Blue
    colorClass: 'border-event-cat2-border',
    textColorClass: 'text-blue-800',
    iconName: 'Users',
  },
  campaign: { // Example: Lime green in screenshot
    backgroundClass: 'bg-lime-100', // Custom or use a tailwind pastel lime
    colorClass: 'border-lime-300',
    textColorClass: 'text-lime-800',
    iconName: 'Megaphone', 
  },
  personal: { // Example: Pink/Purple in screenshot
    backgroundClass: 'bg-event-cat3-bg', // Pale Pink/Purple
    colorClass: 'border-event-cat3-border',
    textColorClass: 'text-purple-800',
    iconName: 'User',
  },
  demo: { // Example: Darker blue in screenshot
    backgroundClass: 'bg-event-cat4-bg', // Pale Darker Blue
    colorClass: 'border-event-cat4-border',
    textColorClass: 'text-sky-800', // Using sky for a slightly different blue
    iconName: 'Presentation',
  },
  important: { // No direct example, but can be a distinct color
    backgroundClass: 'bg-red-100', // Soft red
    colorClass: 'border-red-300',
    textColorClass: 'text-red-700',
    iconName: 'AlertTriangle',
  },
  default: {
    backgroundClass: 'bg-event-default-bg', // Light Grey
    colorClass: 'border-event-default-border',
    textColorClass: 'text-muted-foreground',
    iconName: 'CalendarDays',
  },
};
