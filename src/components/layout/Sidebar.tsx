import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav'; // Relative path to pre-existing component
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav component (from context) already handles its own fixed positioning, width, height, and background.
  // This Sidebar component acts as a wrapper, primarily for structural organization within the layout system.
  // The className prop allows for any overrides or additional styles if needed, though SidebarNav is fairly self-contained.
  return (
    <aside>
      <SidebarNav className={cn(className)} />
    </aside>
  );
};

export default Sidebar;
