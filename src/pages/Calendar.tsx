
import React, { useState, useEffect } from 'react';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { WeekView } from '@/components/calendar/WeekView';
import { CalendarEvent } from '@/components/calendar/EventCard';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    // Generate some fake events for the current week
    generateEvents();
  }, [currentDate]);

  const generateEvents = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const newEvents: CalendarEvent[] = [];
    
    // Add some demo events
    const eventTypes = [
      { title: 'Client Presentation', color: '#9b87f5' },
      { title: 'Team Meeting', color: '#4fa7ff' },
      { title: 'Design Review', color: '#f57bff' },
      { title: 'Project Kickoff', color: '#5cebdf' },
      { title: 'Client Feedback', color: '#ff9f7b' },
      { title: 'Planning & Goal Setting', color: '#e879c8' },
      { title: 'Development Team Sync', color: '#a16afd' },
      { title: 'Weekly Material Workshop', color: '#33d69f' },
    ];
    
    // Generate 15 random events throughout the week
    for (let i = 0; i < 15; i++) {
      const dayOffset = Math.floor(Math.random() * 7); // 0-6 days into the week
      const eventDate = new Date(startOfWeek);
      eventDate.setDate(startOfWeek.getDate() + dayOffset);
      
      // Random start time between 8 AM and 5 PM
      const startHour = Math.floor(Math.random() * 9) + 8; // 8 AM to 5 PM
      const startMinute = Math.random() > 0.5 ? 30 : 0; // Either on the hour or half hour
      
      eventDate.setHours(startHour, startMinute, 0);
      
      // Duration between 30 mins and 2 hours
      const durationMinutes = [30, 60, 90, 120][Math.floor(Math.random() * 4)];
      
      const endDate = new Date(eventDate);
      endDate.setMinutes(endDate.getMinutes() + durationMinutes);
      
      // Pick a random event type
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      newEvents.push({
        id: `event-${i}`,
        title: eventType.title,
        start: eventDate,
        end: endDate,
        color: eventType.color
      });
    }
    
    setEvents(newEvents);
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        view={view}
        onViewChange={setView}
      />
      <WeekView currentDate={currentDate} events={events} />
    </div>
  );
};

export default Calendar;
