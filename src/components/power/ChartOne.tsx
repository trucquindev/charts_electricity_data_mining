'use client';

import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { dataPower } from '@/api/mock-data';
// Energy data structure (dummy data for demonstration)
const energyData = dataPower.map((data) => {
  return {
    date: data.datetime,
    consumption: data.powerConsumptionTotal,
    production: data.powerProductionTotal,
    import: data.powerImportTotal,
    export: data.powerExportTotal,
  };
});

// Define chart configuration
const chartConfig = {
  consumption: {
    label: 'Power Consumption',
    color: 'hsl(var(--chart-1))',
  },
  production: {
    label: 'Power Production',
    color: 'hsl(var(--chart-2))',
  },
  import: {
    label: 'Power Import',
    color: 'hsl(var(--chart-3))',
  },
  export: {
    label: 'Power Export',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

const ChartOnePower = () => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('consumption');

  // const total = React.useMemo(
  //   () => ({
  //     consumption: energyData.reduce((acc, curr) => acc + curr.consumption, 0),
  //     production: energyData.reduce((acc, curr) => acc + curr.production, 0),
  //     import: energyData.reduce((acc, curr) => acc + curr.import, 0),
  //     export: energyData.reduce((acc, curr) => acc + curr.export, 0),
  //   }),
  //   []
  // );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Energy Data - Interactive</CardTitle>
          <CardDescription>
            Showing energy statistics for the selected period
          </CardDescription>
        </div>
        <div className="flex">
          {['consumption', 'production', 'import', 'export'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                {/* <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span> */}
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={energyData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <YAxis />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="energy"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default ChartOnePower;
