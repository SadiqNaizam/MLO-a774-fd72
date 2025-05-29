import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  // The Sidebar and Header components render pre-existing components (SidebarNav, TopHeader)
  // which have fixed positioning and specific dimensions (w-60 for Sidebar, h-[60px] for Header).
  // SidebarNav is fixed to the left (w-60, h-screen).
  // TopHeader is fixed to the top (h-[60px], left-60, right-0).

  return (
    <div className="bg-background text-foreground">
      {/* Header is fixed, positioned by TopHeader.tsx: top-0, left-60, right-0, h-[60px] */}
      <Header />
      {/* Sidebar is fixed, positioned by SidebarNav.tsx: top-0, left-0, w-60, h-screen */}
      <Sidebar />
      
      {/* Main content area must be offset to account for the fixed Sidebar and Header. */}
      {/* It should also handle its own scrolling. */}
      <main
        className={cn(
          // Offset for the fixed sidebar (width w-60 defined in SidebarNav)
          "ml-60", 
          // Ensure this container can fill available viewport height for proper scroll behavior.
          "min-h-screen", 
          // Sizing and overflow behavior from Layout Requirements: overall.sizing.mainContent
          "min-w-0 overflow-y-auto"
        )}
      >
        {/* This inner div applies layout styles specified in Layout Requirements: mainContent.layout */}
        {/* - mt-[60px]: Pushes content down to clear the fixed Header (height h-[60px] defined in TopHeader) */}
        {/* - p-6: Padding around the content */}
        {/* - flex flex-col gap-8: Structures the direct children of the content area */}
        <div className="p-6 mt-[60px] flex flex-col gap-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
