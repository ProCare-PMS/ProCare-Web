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
  // { month: "January", loss: 500 },
  // { month: "February", loss: 800 },
  // { month: "March", loss: 300 },
  // { month: "April", loss: 750 },
  // { month: "May", loss: 600 },
  // { month: "June", loss: 400 },
  // { month: "July", loss: 900 },
  // { month: "August", loss: 350 },
  // { month: "September", loss: 650 },
  // { month: "October", loss: 700 },
  // { month: "November", loss: 950 },
  // { month: "December", loss: 500 },
];

const chartConfig = {
  desktop: {
    label: "Loss",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LossChart() {
  //const [timeRange, setTimeRange] = useState("90d");
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (e: any) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="w-full bg-white mt-10 rounded-2xl">
      <Card className="rounded-2xl">
        <CardHeader className="my-1 flex items-center gap-2 space-y-0 border-b py-2 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Loss</CardTitle>
            <CardDescription>
              Total Loss: <span className="text-blue-700 font-bold">₵ -</span>
            </CardDescription>
          </div>

          <div className="flex gap-2">
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

            <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2">
              <span>
                <CalendarMonthIcon />
              </span>
              <span>October</span>
            </div>

            <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2">
              <span>
                <CloudUploadOutlinedIcon />
              </span>
              <span>Export</span>
            </div>
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
            >
              <defs>
                <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(211, 64, 83, 0.5)" />{" "}
                  {/* Red at 0% */}
                  <stop offset="50%" stopColor="#D3405380" />{" "}
                  {/* Red (#D34053) at 50% with 50% opacity */}
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />{" "}
                  {/* Transparent white at 100% */}
                </linearGradient>
              </defs>
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="month"
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
                dataKey="loss"
                type="linear"
                fill="url(#gradientColor)"
                fillOpacity={0.4}
                stroke="#D34053"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="border-t pt-5">
          <div className="flex justify-between w-full text-sm">
            <div>
              <p>Day against Loss</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
