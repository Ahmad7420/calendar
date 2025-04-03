
import React from 'react';
import { EventCard, CalendarEvent } from './EventCard';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
}

export const WeekView: React.FC<WeekViewProps> = ({ currentDate, events }) => {
  // Get start of the week (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
  // Create array of days for the week
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  // Create hours for the day (8 AM to 12 PM)
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // Starting from 8 AM
    return hour >= 12 ? `${hour === 12 ? 12 : hour - 12} PM` : `${hour} AM`;
  });

  // Format the day name and date
  const formatDayHeader = (date: Date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const dayNumber = date.getDate();
    return { dayName, dayNumber };
  };

  // Group events by day and time
  const getEventsForDay = (date: Date) => {
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === date.getDate() && 
             eventDate.getMonth() === date.getMonth() && 
             eventDate.getFullYear() === date.getFullYear();
    });
    
    return dayEvents;
  };

  // Position event based on start time
  const getEventPosition = (event: CalendarEvent) => {
    const startHour = event.start.getHours();
    const startMinute = event.start.getMinutes();
    
    // Calculate top position (1 hour = 60px height)
    const hourHeight = 60;
    const top = (startHour - 8) * hourHeight + (startMinute / 60) * hourHeight;
    
    return { top: `${top}px` };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] overflow-auto">
      {/* Week Header */}
      <div className="flex border-b min-w-[800px]">
        <div className="w-16 flex-shrink-0"></div>
        {days.map((day, index) => {
          const { dayName, dayNumber } = formatDayHeader(day);
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <div key={index} className="flex-1 px-2 py-3 text-center">
              <div className="text-xs text-muted-foreground">{dayName} {dayNumber}</div>
              {isToday && (
                <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mt-1 text-xs">
                  {dayNumber}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Time Grid */}
      <div className="flex flex-grow min-w-[800px]">
        {/* Time Labels */}
        <div className="w-16 flex-shrink-0 border-r">
          {hours.map((hour, index) => (
            <div key={index} className="h-[60px] border-b px-2 py-1">
              <div className="text-xs text-muted-foreground">{hour}</div>
            </div>
          ))}
        </div>

        {/* Day Columns */}
        {days.map((day, dayIndex) => {
          const dayEvents = getEventsForDay(day);
          
          return (
            <div key={dayIndex} className="flex-1 border-r relative">
              {/* Hour cells */}
              {hours.map((_, hourIndex) => (
                <div key={hourIndex} className="h-[60px] border-b"></div>
              ))}
              
              {/* Events */}
              {dayEvents.map((event, eventIndex) => (
                <div 
                  key={eventIndex} 
                  className="absolute w-[calc(100%-8px)] mx-1" 
                  style={getEventPosition(event)}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
