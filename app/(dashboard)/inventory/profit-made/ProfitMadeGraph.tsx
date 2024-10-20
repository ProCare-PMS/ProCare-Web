"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive line chart";

const chartData = [
  { month: "JAN", desktop: 200, mobile: 300 },
  { month: "FEB", desktop: 500, mobile: 530 },
  { month: "MAR", desktop: 330, mobile: 0 },
  { month: "APR", desktop: 560, mobile: 539 },
  { month: "MAY", desktop: 560, mobile: 0 },
  { month: "JUN", desktop: 610, mobile: 340 },
  { month: "JUL", desktop: 230, mobile: 180 },
  { month: "AUG", desktop: 240, mobile: 420 },
  { month: "SEP", desktop: 700, mobile: 600 },
  { month: "OCT", desktop: 640, mobile: 590 },
  { month: "NOV", desktop: 327, mobile: 350 },
  { month: "DEC", desktop: 292, mobile: 210 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "#03124f",
  },
  mobile: {
    label: "Mobile",
    color: "#03124f",
  },
} satisfies ChartConfig;

export function ProfitMadeGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  return (
    <div>
      <div className="">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart accessibilityLayer data={chartData} margin={{}}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="bg-white cursor-pointer"
                />
              }
            />
            <Tooltip />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke="#03124f"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
