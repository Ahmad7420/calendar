
import React from 'react';
import { Search, Bell, Calendar, Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

const SidebarItem = ({ icon, label, active, href = "#" }: SidebarItemProps) => {
  return (
    <a 
      href={href} 
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
        active 
          ? "bg-secondary text-primary" 
          : "text-muted-foreground hover:bg-secondary hover:text-primary"
      )}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

const ProjectItem = ({ name, color, active }: { name: string; color: string; active?: boolean }) => {
  return (
    <a 
      href="#" 
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
        active 
          ? "bg-secondary text-primary" 
          : "text-muted-foreground hover:bg-secondary hover:text-primary"
      )}
    >
      <div className={`w-5 h-5 rounded-md ${color}`}></div>
      <span>{name}</span>
    </a>
  );
};

export const Sidebar = () => {
  return (
    <div className="w-60 h-screen border-r border-border bg-card p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex items-center justify-center font-bold">M</div>
        <div className="font-semibold">Manageko</div>
      </div>
      
      <div className="mb-6 mt-2">
        <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-3">MAIN MENU</h3>
        <div className="space-y-1">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-secondary pl-9 pr-3 py-2 rounded-md text-sm" 
            />
          </div>
          <SidebarItem icon={<Bell className="h-4 w-4" />} label="Notification" />
          <SidebarItem icon={<Calendar className="h-4 w-4" />} label="Calendar" active />
          <SidebarItem icon={<Settings className="h-4 w-4" />} label="Settings" />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between px-3 mb-2">
          <h3 className="text-xs font-semibold text-muted-foreground">MY PROJECTS</h3>
        </div>
        <div className="space-y-1">
          <ProjectItem name="Dashboard Project" color="bg-purple-500" />
          <ProjectItem name="Customer Project" color="bg-blue-500" />
          <ProjectItem name="Angular Studio" color="bg-red-500" />
          <button className="flex items-center gap-2 px-3 py-2 w-full text-sm text-muted-foreground hover:text-primary">
            <Plus className="h-4 w-4" />
            <span>Create New</span>
          </button>
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="bg-secondary/50 rounded-lg p-3 relative">
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1">
            <Bell className="h-4 w-4" />
          </div>
          <h4 className="font-medium text-sm mb-1">Add an extra security to your account</h4>
          <p className="text-xs text-muted-foreground mb-3">Your account is not secure. Protect it now!</p>
          <Button variant="default" size="sm" className="w-full">Enable 2-step verification</Button>
          <div className="text-xs text-center mt-2 text-muted-foreground">Learn more</div>
        </div>
      </div>
    </div>
  );
};
