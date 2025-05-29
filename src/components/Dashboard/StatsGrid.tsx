import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReasonStat {
  percentage: string;
  description: string;
}

const reasonsData: ReasonStat[] = [
  { percentage: '40%', description: 'The proposal is unclear' },
  { percentage: '20%', description: 'However venture pursuit' },
  { percentage: '10%', description: 'Other' },
  { percentage: '30%', description: 'The proposal is unclear' }, // Duplicated from image
];

interface OtherStat {
  value: string;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const otherDataStats: OtherStat[] = [
  { value: '900', label: 'total leads count' },
  { value: '12', label: 'days in average to convert lead' },
  { value: '30', label: 'inactive leads', hasInfo: true, infoText: 'Leads that have not been contacted in over 90 days.' },
];

interface StatsGridProps {
  className?: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-8', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-8 gap-y-6">
          {reasonsData.map((reason, index) => (
            <div key={index}>
              <p className="text-3xl font-bold text-foreground">{reason.percentage}</p>
              <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Other data</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-x-4 md:gap-x-6">
          {otherDataStats.map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center md:justify-start">
                {stat.label}
                {stat.hasInfo && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="ml-1.5 h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{stat.infoText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsGrid;
