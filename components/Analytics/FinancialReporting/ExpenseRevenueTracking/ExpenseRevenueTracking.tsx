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

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", revenue: 186, expense: 80 },
  { month: "February", revenue: 305, expense: 200 },
  { month: "March", revenue: 237, expense: 120 },
  { month: "April", revenue: 73, expense: 190 },
  { month: "May", revenue: 209, expense: 130 },
  { month: "June", revenue: 214, expense: 140 },
  { month: "July", revenue: 214, expense: 140 },
  { month: "August", revenue: 214, expense: 140 },
  { month: "September", revenue: 214, expense: 140 },
  { month: "October", revenue: 214, expense: 140 },
  { month: "November", revenue: 214, expense: 140 },
  { month: "December", revenue: 214, expense: 140 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2648EA",
  },
  expense: {
    label: "Expense",
    color: "#6FAFFF",
  },
} satisfies ChartConfig;

export function ExpenseRevenueTracking() {
  return (
    <div className="w-full bg-white mt-10 rounded-2xl">
      <Card className="rounded-2xl">
        <CardHeader className="border">
          <CardTitle>Expense/Revenue Tracking</CardTitle>
          {/* <CardDescription>January - June 2024</CardDescription> */}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                //tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="revenue" fill="#2648EA" radius={4} />
              <Bar dataKey="expense" fill="#6FAFFF" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm border pt-5">
          <div className="flex gap-2 font-medium leading-none">
            Revenue/Expense against Amount
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
