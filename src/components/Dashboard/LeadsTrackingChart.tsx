import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarDays, ChevronDown, Dot } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';

const chartData = [
  { name: 'March', closedWon: 65, closedLost: 80 },
  { name: 'April', closedWon: 40, closedLost: 55 },
  { name: 'May', closedWon: 95, closedLost: 38 },
  { name: 'June', closedWon: 62, closedLost: 5 },
  { name: 'July', closedWon: 75, closedLost: 42 },
  { name: 'August', closedWon: 30, closedLost: 90 },
];

interface LeadsTrackingChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border border-border rounded shadow-lg">
        <p className="font-semibold">{label}</p>
        {payload.map((pld: any) => (
          <p key={pld.dataKey} style={{ color: pld.color }} className="text-sm">
            {`${pld.name}: ${pld.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LeadsTrackingChart: React.FC<LeadsTrackingChartProps> = ({ className }) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('Last 6 months');
  const timePeriods = ['Today', 'Last 7 days', 'Last 30 days', 'Last 6 months', 'Last 12 months', 'All time'] as const;

  const totalClosed = 680; // from image
  const totalLost = 70; // from image

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center text-sm text-muted-foreground">
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
      </CardHeader>
      <CardContent>
        <div className="flex space-x-6 mb-6">
          <div>
            <span className="text-3xl font-bold text-foreground">{totalClosed}</span>
            <span className="ml-2 text-sm text-muted-foreground">total closed</span>
          </div>
          <div>
            <span className="text-3xl font-bold text-foreground">{totalLost}</span>
            <span className="ml-2 text-sm text-muted-foreground">total lost</span>
          </div>
        </div>

        <div className="h-72 w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 'dataMax + 10']}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#059669" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} dot={{ r: 4, fill: '#059669', strokeWidth: 0 }} activeDot={{ r: 6 }}/>
              <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#DC2626" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} dot={{ r: 4, fill: '#DC2626', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-[#059669] mr-2"></span> Closed won
            </div>
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-[#DC2626] mr-2"></span> Closed lost
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
