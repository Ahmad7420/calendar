
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Filter, Plus, Search } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  view: string;
  onViewChange: (view: string) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevious,
  onNext,
  onToday,
  view,
  onViewChange
}) => {
  // Format the month and year
  const monthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  // Calculate the date range for display
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  
  const dateRangeText = `${startDate.getDate()} ${startDate.toLocaleDateString('en-US', { month: 'short' })} - ${endDate.getDate()} ${endDate.toLocaleDateString('en-US', { month: 'short' })} ${endDate.getFullYear()}`;

  return (
    <div className="pb-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground text-sm">Stay Organized and On Track with Your Personalized Calendar</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-background flex items-center justify-center text-xs text-white">AB</div>
            <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-background flex items-center justify-center text-xs text-white">CD</div>
            <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-background flex items-center justify-center text-xs text-white">EF</div>
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-background flex items-center justify-center text-xs">+10</div>
          </div>
          <Button variant="outline" size="sm">
            Invite
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="all" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Scheduled</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="reminders">Task Reminders</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search..." className="pl-9 pr-3 py-2 h-10 rounded-md border text-sm w-full" />
          </div>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button size="sm" className="ml-auto sm:ml-0">
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <Button onClick={onPrevious} variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={onNext} variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="text-md font-medium ml-2">{monthYear}</div>
          <Button onClick={onToday} variant="outline" size="sm" className="ml-4 h-8">
            Today
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={onViewChange} className="w-auto">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="hidden sm:block text-sm font-medium bg-secondary rounded-md px-3 py-1">
            {dateRangeText}
          </div>
        </div>
      </div>
    </div>
  );
};
