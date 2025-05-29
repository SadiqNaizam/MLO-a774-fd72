import React from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutGrid, 
  Users, 
  UserCircle, 
  FileText, 
  FileSpreadsheet, 
  ShoppingBag, 
  Mail as MailIcon, 
  Archive, 
  CalendarDays, 
  HelpCircle, 
  Settings,
  Menu 
} from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href, isActive, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center px-4 py-2.5 text-sm font-medium rounded-md',
        'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
      )}
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </a>
  );
};

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activeItem, setActiveItem] = React.useState<string>('Dashboard');

  const navItems = [
    { id: 'Dashboard', icon: LayoutGrid, label: 'Dashboard', href: '#' },
    { id: 'Leads', icon: Users, label: 'Leads', href: '#' },
    { id: 'Customers', icon: UserCircle, label: 'Customers', href: '#' },
    { id: 'Proposals', icon: FileText, label: 'Proposals', href: '#' },
    { id: 'Invoices', icon: FileSpreadsheet, label: 'Invoices', href: '#' },
    { id: 'Items', icon: ShoppingBag, label: 'Items', href: '#' },
    { id: 'Mail', icon: MailIcon, label: 'Mail', href: '#' },
    { id: 'Shoebox', icon: Archive, label: 'Shoebox', href: '#' },
    { id: 'Calendar', icon: CalendarDays, label: 'Calendar', href: '#' },
  ];

  const bottomNavItems = [
    { id: 'Help', icon: HelpCircle, label: 'Help', href: '#' },
    { id: 'Settings', icon: Settings, label: 'Settings', href: '#' },
  ];

  return (
    <div className={cn('w-60 bg-sidebar text-sidebar-foreground h-screen fixed flex flex-col p-4 space-y-1', className)}>
      <div className="flex items-center justify-between h-16 px-2 mb-4">
        {/* Logo Placeholder */}
        <div className="flex items-center">
          <div className="bg-primary text-primary-foreground rounded-full p-2 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
          </div>
          <span className="font-semibold text-xl text-foreground">LeadTrack</span>
        </div>
        <button className="md:hidden p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent">
          <Menu size={24} />
        </button>
      </div>
      
      <nav className="flex-grow space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-sidebar-border pt-4">
        {bottomNavItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={activeItem === item.id} // Optional: make bottom items activatable too
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarNav;
