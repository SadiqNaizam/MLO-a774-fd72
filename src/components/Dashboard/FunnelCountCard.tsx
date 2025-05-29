import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  time: string;
  color: string; // Tailwind bg color class e.g., 'bg-red-500'
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, time: '2 days', color: 'bg-red-400' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, time: '2 days', color: 'bg-yellow-400' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, time: '5 days', color: 'bg-indigo-500' }, // Matched color from image
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, time: '8 days', color: 'bg-green-400' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, time: '10 days', color: 'bg-purple-500' }, // Matched color from image
];

const totalLeadsInFunnel = funnelData.reduce((sum, stage) => sum + stage.count, 0);

interface FunnelCountCardProps {
  className?: string;
}

const FunnelCountCard: React.FC<FunnelCountCardProps> = ({ className }) => {
  const totalActiveLeads = 600; // From image

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold text-foreground">{totalActiveLeads}</span>
          <span className="ml-2 text-sm text-muted-foreground">active leads</span>
        </div>

        <div className="w-full h-3.5 rounded-full flex overflow-hidden mb-6 bg-muted">
          {funnelData.map((stage) => (
            <TooltipProvider key={stage.id} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(stage.color, 'h-full')}
                    style={{ width: `${(stage.count / totalLeadsInFunnel) * 100}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.count} leads</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="space-y-3">
          {funnelData.map((stage, index) => (
            <div key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
              <div className={cn('w-3 h-3 rounded-sm', stage.color)}></div>
              <div className="text-foreground truncate">{stage.name}</div>
              <div className="text-muted-foreground justify-self-end font-medium">{stage.count}</div>
              <div className="text-muted-foreground justify-self-end font-medium">${stage.value}</div>
              <div className="text-muted-foreground justify-self-end relative">
                {stage.time}
                {stage.id === 'qualified' && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="absolute -top-8 -right-4 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                          average time on this stage
                          <Info size={10} className="inline ml-1 opacity-0" /> {/* Hidden, only for visual layout consistency with image example */} 
                        </span>
                      </TooltipTrigger>
                      {/* No TooltipContent needed as the text is directly displayed */}
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelCountCard;
