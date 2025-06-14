
import EventCalendar from '@/components/EventCalendar';
import AppSidebar from '@/components/AppSidebar';
import { SidebarInset } from "@/components/ui/sidebar";

export default function HomePage() {
  return (
    <div className="flex h-screen bg-sidebar"> {/* Overall page uses sidebar bg due to fixed sidebar */}
      <AppSidebar />
      {/* SidebarInset will adapt to the theme's background and foreground for main content */}
      <SidebarInset className="flex flex-col flex-1 overflow-hidden bg-background"> {/* Explicitly set main content bg */}
        <EventCalendar />
      </SidebarInset>
    </div>
  );
}
