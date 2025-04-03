
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import Calendar from './Calendar';

const Index: React.FC = () => {
  return (
    <div className="flex w-full h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6 overflow-hidden flex flex-col">
        <Calendar />
      </div>
    </div>
  );
};

export default Index;
