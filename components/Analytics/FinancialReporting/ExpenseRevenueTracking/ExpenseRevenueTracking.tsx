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
  { month: "January", revenue: 856, expense: 392 },
  { month: "February", revenue: 768, expense: 523 },
  { month: "March", revenue: 631, expense: 312 },
  { month: "April", revenue: 547, expense: 793 },
  { month: "May", revenue: 903, expense: 689 },
  { month: "June", revenue: 724, expense: 457 },
  { month: "July", revenue: 845, expense: 613 },
  { month: "August", revenue: 991, expense: 752 },
  { month: "September", revenue: 479, expense: 355 },
  { month: "October", revenue: 602, expense: 291 },
  { month: "November", revenue: 777, expense: 432 },
  { month: "December", revenue: 915, expense: 562 },
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

              <YAxis
                //dataKey={"price"}
                domain={[200, 1000]}
                tickCount={5}
                tickFormatter={(value) => `₵ ${value}`}
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
