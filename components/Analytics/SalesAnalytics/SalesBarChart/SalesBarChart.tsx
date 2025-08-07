"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

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
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { monthsOfYear } from "@/components/CustomFunction/CustomFunction";

export const description = "Months and Sales";

const chartData = [
  { month: "January", sales: 16000 },
  { month: "February", sales: 2000 },
  { month: "March", sales: 4000 },
  { month: "April", sales: 1000 },
  { month: "May", sales: 7000 },
  { month: "June", sales: 3000 },
  { month: "July", sales: 13000 },
  { month: "August", sales: 17000 },
  { month: "September", sales: 14000 },
  { month: "October", sales: 9000 },
  { month: "November", sales: 19000 },
  { month: "December", sales: 16000 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#2648EA",
  },
} satisfies ChartConfig;

export function SalesBarChart() {
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (e: any) => {
    setSelectedMonth(e.target.value);
  };

  // Calculate total sales
  const totalSales = chartData.reduce((sum, item) => sum + item.sales, 0);

  return (
    <Card className="bg-white rounded-2xl">
      <CardHeader className="mb-2 flex justify-between items-center gap-2 space-y-0 border-b py-3 sm:flex-row">
        <div>
          <CardTitle>Sales</CardTitle>
          <CardDescription>
            Total Sales: <span className="text-blue-700 font-bold">₵ {totalSales.toLocaleString()}</span>
          </CardDescription>
        </div>

        <div className="flex gap-2">
          <div className="w-44">
            <CustomSelect
              idField="month"
              nameField="month"
              optionData={monthsOfYear}
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </div>
          {/* <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2 py-0">
            <span>
              <CloudUploadOutlinedIcon />
            </span>
            <span>Export</span>
          </div> */}
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
              stroke="#e0e4e7"
            />

            {/* XAxis for month labels */}
            <XAxis
              dataKey="month"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.slice(0, 3)} // Show first 3 letters of month
            />

            {/* YAxis with custom range and formatted ticks */}
            <YAxis
              domain={[0, 20000]} // Y-axis from 0 to 20,000
              tickCount={5} // 5 ticks for values
              tickLine={true}
              axisLine={true}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `₵${(value / 1000)}k`} // Format as currency with k suffix
            />

            {/* Tooltip for hover interaction */}
            <ChartTooltip
              cursor={{ fill: "rgba(38, 72, 234, 0.1)" }}
              content={
                <ChartTooltipContent
                  className="bg-white border border-gray-200 shadow-lg rounded-lg p-2"
                  formatter={(value, name) => [
                    `₵${Number(value).toLocaleString()}`,
                    "Sales"
                  ]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
              }
            />

            {/* Bar chart data */}
            <Bar 
              dataKey="sales" 
              fill="#2648EA" 
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm border-t pt-5">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Monthly sales performance overview
        </div>
      </CardFooter>
    </Card>
  );
}