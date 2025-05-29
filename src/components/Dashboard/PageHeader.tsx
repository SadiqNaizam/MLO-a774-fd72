import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarDays, ChevronDown } from 'lucide-react';

interface PageHeaderProps {
  className?: string;
  activeTab?: 'Sales' | 'Leads';
  onTabChange?: (tab: 'Sales' | 'Leads') => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  className,
  activeTab = 'Leads' as const,
  onTabChange,
}) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('Last 6 months');

  const handleTabChange = (value: string) => {
    if (onTabChange && (value === 'Sales' || value === 'Leads')) {
      onTabChange(value as 'Sales' | 'Leads');
    }
  };

  const timePeriods = [
    'Today',
    'Last 7 days',
    'Last 30 days',
    'Last 6 months',
    'Last 12 months',
    'All time'
  ] as const;

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-auto">
        <TabsList className="bg-muted p-1 rounded-md">
          <TabsTrigger 
            value="Sales" 
            className="px-4 py-1.5 text-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger 
            value="Leads" 
            className="px-4 py-1.5 text-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm"
          >
            Leads
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            {selectedPeriod}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {timePeriods.map(period => (
            <DropdownMenuItem key={period} onClick={() => setSelectedPeriod(period)}>
              {period}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PageHeader;
