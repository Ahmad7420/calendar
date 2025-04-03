
import React from 'react';
import { cn } from '@/lib/utils';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

interface EventCardProps {
  event: CalendarEvent;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, className }) => {
  // Format time as HH:MM AM/PM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  // Get duration in minutes
  const getDurationInMinutes = () => {
    return (event.end.getTime() - event.start.getTime()) / (1000 * 60);
  };

  // Calculate height based on duration (roughly 1.5px per minute)
  const height = `${Math.max(30, getDurationInMinutes() * 1.2)}px`;

  return (
    <div 
      className={cn(
        "rounded-md p-2 text-xs overflow-hidden",
        className
      )}
      style={{ 
        backgroundColor: `${event.color}20`, // Use color with transparency
        borderLeft: `3px solid ${event.color}`,
        height 
      }}
    >
      <div className="font-medium text-xs" style={{ color: event.color }}>{formatTime(event.start)} - {formatTime(event.end)}</div>
      <div className="font-medium mt-0.5">{event.title}</div>
    </div>
  );
};
