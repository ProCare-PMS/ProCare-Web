"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { useState } from "react";

export const description = "Volumes and Frequency";

const chartData = [
  { volumes: "Bottles", frequency: 16000 },
  { volumes: "Sachets", frequency: 2000 },
  { volumes: "Packs", frequency: 4000 },
  { volumes: "Containers", frequency: 1000 },
  { volumes: "Ampoules", frequency: 7000 },
  { volumes: "Paper", frequency: 3000 },
  { volumes: "Cartons", frequency: 13000 },
  { volumes: "Syringes", frequency: 17000 },
  { volumes: "Strip", frequency: 14000 },
  { volumes: "Lamitubes", frequency: 9000 },
  { volumes: "Packaging", frequency: 19000 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "blue",
  },
} satisfies ChartConfig;

export function OrderVolumeFChart() {
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (e: any) => {
    setSelectedMonth(e.target.value);
  };
  return (
    <Card className="bg-white rounded-2xl">
      <CardHeader className="mb-2 flex justify-between items-center gap-2 space-y-0 border-b py-3 sm:flex-row">
        <CardTitle>Order Volumes Frequency</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
        <div className="w-44">
          <select
            id="month"
            name="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mt-1 block w-full border border-gray-500 px-1 py-2 focus:border-gray-500 focus:ring-opacity-50 rounded-xl"
          >
            <option value="">Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            {/* Add horizontal grid lines */}
            <CartesianGrid
              vertical={false}
              horizontal={true}
              strokeDasharray="3 3"
            />

            {/* XAxis for volume labels */}
            <XAxis
              dataKey="volumes"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            {/* YAxis with custom range and formatted ticks */}
            <YAxis
              domain={[0, 20000]} // Y-axis from 0 to 20,000
              tickCount={5} // 5 ticks for values
              interval={0} // Show all ticks
              tickLine={false}
              axisLine={false}
              ticks={[0, 5000, 10000, 15000, 20000]} // Custom ticks every 5000
              tickFormatter={(value) => value.toLocaleString()} // Format with commas
            />

            {/* Tooltip for hover interaction */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="bg-white cursor-pointer"
                />
              }
            />

            {/* Bar chart data */}
            <Bar dataKey="frequency" fill="blue" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm border-t pt-5">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Volume against Order Frequency
        </div>
      </CardFooter>
    </Card>
  );
}
