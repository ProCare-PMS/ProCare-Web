"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import Image from "next/image";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useState } from "react";

export const description = "A linear area chart";

const chartData = [
  // { day: "1", stock: 450 },
  // { day: "2", stock: 760 },
  // { day: "3", stock: 920 },
  // { day: "4", stock: 530 },
  // { day: "5", stock: 610 },
  // { day: "6", stock: 870 },
  // { day: "7", stock: 740 },
  // { day: "8", stock: 680 },
  // { day: "9", stock: 820 },
  // { day: "10", stock: 330 },
  // { day: "11", stock: 750 },
  // { day: "12", stock: 620 },
  // { day: "13", stock: 900 },
  // { day: "14", stock: 430 },
  // { day: "15", stock: 820 },
  // { day: "16", stock: 780 },
  // { day: "17", stock: 920 },
  // { day: "18", stock: 250 },
  // { day: "19", stock: 770 },
  // { day: "20", stock: 980 },
  // { day: "21", stock: 840 },
  // { day: "22", stock: 660 },
  // { day: "23", stock: 350 },
  // { day: "24", stock: 800 },
  // { day: "25", stock: 910 },
  // { day: "26", stock: 220 },
  // { day: "27", stock: 710 },
  // { day: "28", stock: 940 },
  // { day: "29", stock: 380 },
  // { day: "30", stock: 870 },
  // { day: "31", stock: 560 },
];

const chartData2 = [
  // { day: "1", stock: 300 },
  // { day: "2", stock: 450 },
  // { day: "3", stock: 600 },
  // { day: "4", stock: 400 },
  // { day: "5", stock: 520 },
  // { day: "6", stock: 690 },
  // { day: "7", stock: 530 },
  // { day: "8", stock: 620 },
  // { day: "9", stock: 740 },
  // { day: "10", stock: 280 },
  // { day: "11", stock: 670 },
  // { day: "12", stock: 540 },
  // { day: "13", stock: 710 },
  // { day: "14", stock: 380 },
  // { day: "15", stock: 680 },
  // { day: "16", stock: 750 },
  // { day: "17", stock: 800 },
  // { day: "18", stock: 290 },
  // { day: "19", stock: 650 },
  // { day: "20", stock: 880 },
  // { day: "21", stock: 730 },
  // { day: "22", stock: 590 },
  // { day: "23", stock: 310 },
  // { day: "24", stock: 710 },
  // { day: "25", stock: 830 },
  // { day: "26", stock: 250 },
  // { day: "27", stock: 650 },
  // { day: "28", stock: 850 },
  // { day: "29", stock: 320 },
  // { day: "30", stock: 700 },
  // { day: "31", stock: 490 },
];

const chartConfig = {
  desktop: {
    label: "Stock",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DailySalesChart() {
  const [timeRange, setTimeRange] = useState("90d");
  return (
    <div>
      <Card className="w-full bg-white rounded-2xl">
        <CardHeader className="my-1 flex items-center gap-2 space-y-0 border-b py-2 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Daily Sales</CardTitle>
            <CardDescription>
              Total Sales Today:{" "}
              <span className="text-blue-700 font-bold">₵-</span>
            </CardDescription>
          </div>

          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-[160px] rounded-[0.5rem] sm:ml-auto"
                aria-label="Select a value"
              >
                <SelectValue placeholder="All Stock" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Month
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2">
              <span>
                <CalendarMonthIcon />
              </span>
              <span>October</span>
            </div>

            {/* <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2">
              <span>
                <CloudUploadOutlinedIcon />
              </span>
              <span>Export</span>
            </div> */}
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart
              accessibilityLayer
              data={[]}
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
                <linearGradient id="gradientColor2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(153, 153, 153, 0.5)" />
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
                //dataKey={"price"}
                domain={[200, 1000]}
                tickCount={5}
                tickFormatter={(value) => `₵ ${value}`}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    hideLabel
                    className="bg-white cursor-pointer"
                  />
                }
              />
              <Area
                dataKey="stock"
                type="linear"
                fill="url(#gradientColor)"
                fillOpacity={0.4}
                stroke="#2648EA"
              />
              <Area
                dataKey="stock"
                type="linear"
                fill="url(#gradientColor2)"
                fillOpacity={0.4}
                stroke="#BABABA"
                data={[]}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between w-full text-sm">
            <div>
              <p>Day against amount sold</p>
            </div>
            <div className="flex gap-3">
              <div className="w-full">
                <span className="w-[50px] h-[20px] bg-sky-600 rounded-full"></span>
                Today
              </div>
              <div>Yesterday</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
