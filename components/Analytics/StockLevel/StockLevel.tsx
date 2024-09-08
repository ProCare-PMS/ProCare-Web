"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A linear area chart";

const chartData = [
  { day: "1", stock: 450 },
  { day: "2", stock: 760 },
  { day: "3", stock: 920 },
  { day: "4", stock: 530 },
  { day: "5", stock: 610 },
  { day: "6", stock: 870 },
  { day: "7", stock: 740 },
  { day: "8", stock: 680 },
  { day: "9", stock: 820 },
  { day: "10", stock: 330 },
  { day: "11", stock: 750 },
  { day: "12", stock: 620 },
  { day: "13", stock: 900 },
  { day: "14", stock: 430 },
  { day: "15", stock: 820 },
  { day: "16", stock: 780 },
  { day: "17", stock: 920 },
  { day: "18", stock: 250 },
  { day: "19", stock: 770 },
  { day: "20", stock: 980 },
  { day: "21", stock: 840 },
  { day: "22", stock: 660 },
  { day: "23", stock: 350 },
  { day: "24", stock: 800 },
  { day: "25", stock: 910 },
  { day: "26", stock: 220 },
  { day: "27", stock: 710 },
  { day: "28", stock: 940 },
  { day: "29", stock: 380 },
  { day: "30", stock: 870 },
  { day: "31", stock: 560 },
];

const chartData2 = [
  { day: "1", stock: 450 },
  { day: "2", stock: 760 },
  { day: "3", stock: 920 },
  { day: "4", stock: 530 },
  { day: "5", stock: 610 },
  { day: "6", stock: 870 },
  { day: "7", stock: 740 },
  { day: "8", stock: 680 },
  { day: "9", stock: 820 },
  { day: "10", stock: 330 },
  { day: "11", stock: 750 },
  { day: "12", stock: 620 },
  { day: "13", stock: 900 },
  { day: "14", stock: 430 },
  { day: "15", stock: 820 },
  { day: "16", stock: 780 },
  { day: "17", stock: 920 },
  { day: "18", stock: 250 },
  { day: "19", stock: 770 },
  { day: "20", stock: 980 },
  { day: "21", stock: 840 },
  { day: "22", stock: 660 },
  { day: "23", stock: 350 },
  { day: "24", stock: 800 },
  { day: "25", stock: 910 },
  { day: "26", stock: 220 },
  { day: "27", stock: 710 },
  { day: "28", stock: 940 },
  { day: "29", stock: 380 },
  { day: "30", stock: 870 },
  { day: "31", stock: 560 },
];

const chartConfig = {
  desktop: {
    label: "Stock",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function StockLevelChart() {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Stock Levels</CardTitle>
          <CardDescription>
            Current Stock Level:{" "}
            <span className="text-blue-700 font-bold">120</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
              //className="h-[200px]"
            >
              <defs>
                <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(38, 72, 234, 0.3)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="day"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />

              <YAxis
                dataKey={"price"}
                domain={[200, 1000]}
                tickCount={5}
                tickFormatter={(value) => `₵ ${value}`}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Area
                dataKey="stock"
                type="linear"
                fill="url(#gradientColor)"
                fillOpacity={0.4}
                stroke="#2648EA"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
