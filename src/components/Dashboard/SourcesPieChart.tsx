import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { Info } from 'lucide-react';

interface SourceDataPoint {
  name: string;
  value: number;
  percentage: number;
  color: string; // Hex color for Recharts
  tailwindColor: string; // Tailwind bg color class for legend dot
}

const sourcesData: SourceDataPoint[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#F87171', tailwindColor: 'bg-red-400' }, // approx red-400
  { name: 'Behance', value: 1000, percentage: 40, color: '#FBBF24', tailwindColor: 'bg-yellow-400' }, // approx amber-400
  { name: 'Instagram', value: 1000, percentage: 10, color: '#38BDF8', tailwindColor: 'bg-sky-400' }, // approx sky-400, from image (darker teal)
  { name: 'Dribbble', value: 1000, percentage: 10, color: '#A7F3D0', tailwindColor: 'bg-emerald-300' }, // approx emerald-300, from image (lighter green)
];

interface SourcesPieChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as SourceDataPoint;
    return (
      <div className="bg-background p-2 border border-border rounded shadow-lg">
        <p className="font-semibold">{`${data.name}`}</p>
        <p className="text-sm text-muted-foreground">{`Value: $${data.value}`}</p>
        <p className="text-sm text-muted-foreground">{`Share: ${data.percentage}%`}</p>
      </div>
    );
  }
  return null;
};

const SourcesPieChart: React.FC<SourcesPieChartProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<'Leads came' | 'Leads Converted' | 'Total deals size'>('Leads Converted' as const);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sourcesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={50} // Donut chart
                fill="#8884d8"
                dataKey="value"
                strokeWidth={0} // No border between slices
              >
                {sourcesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2 mb-6">
          {sourcesData.map((source) => (
            <div key={source.name} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-3 text-sm">
              <div className={cn('w-3 h-3 rounded-sm', source.tailwindColor)}></div>
              <div className="text-foreground truncate">{source.name}</div>
              <div className="text-muted-foreground justify-self-end font-medium">${source.value}</div>
              <div className="text-muted-foreground justify-self-end font-medium relative">
                {source.percentage}%
                {source.name === 'Dribbble' && ( // Example for tooltip placement based on image
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="absolute -top-8 -right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                            from leads total
                            <Info size={10} className="inline ml-1 opacity-0" />
                            </span>
                        </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-md">
            <TabsTrigger value="Leads came" className="text-xs px-2 py-1.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">Leads came</TabsTrigger>
            <TabsTrigger value="Leads Converted" className="text-xs px-2 py-1.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">Leads Converted</TabsTrigger>
            <TabsTrigger value="Total deals size" className="text-xs px-2 py-1.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">Total deals size</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SourcesPieChart;
