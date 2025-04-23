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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useState } from "react";

export const description = "A multiple bar chart";

const chartData = [
  { time: "8:00am", clockIn: 32, clockOut: 47 },
  { time: "9:00am", clockIn: 29, clockOut: 44 },
  { time: "10:00am", clockIn: 15, clockOut: 48 },
  { time: "11:00am", clockIn: 38, clockOut: 33 },
  { time: "12:00pm", clockIn: 22, clockOut: 39 },
  { time: "1:00pm", clockIn: 41, clockOut: 25 },
  { time: "2:00pm", clockIn: 37, clockOut: 45 },
  { time: "3:00pm", clockIn: 48, clockOut: 19 },
  { time: "4:00pm", clockIn: 27, clockOut: 34 },
  { time: "5:00pm", clockIn: 44, clockOut: 10 },
  { time: "6:00pm", clockIn: 31, clockOut: 26 },
  { time: "7:00pm", clockIn: 50, clockOut: 15 },
];

const chartConfig = {
  clockIn: {
    label: "Clock In",
    color: "#2648EA",
  },
  clockOut: {
    label: "Clock Out",
    color: "#6FAFFF",
  },
} satisfies ChartConfig;

export function ClockInOutBars() {
  const [timeRange, setTimeRange] = useState("90d");
  return (
    <div className="w-full bg-white mt-10 rounded-2xl">
      <Card className="rounded-2xl">
        <CardHeader className="border">
          <div className="flex justify-between items-center">
            <CardTitle>Clock-In/ Clock-Out Tracking</CardTitle>

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
                    Time
                  </SelectItem>
                  <SelectItem value="30d" className="rounded-lg">
                    Last 30 days
                  </SelectItem>
                  <SelectItem value="7d" className="rounded-lg">
                    Last 7 days
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2">
                <span>
                  <CloudUploadOutlinedIcon />
                </span>
                <span>Export</span>
              </div> */}
            </div>
          </div>

          {/* <CardDescription>January - June 2024</CardDescription> */}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={[]}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                //tickFormatter={(value) => value.slice(0, 3)}
              />

              <YAxis
                //dataKey={"price"}
                domain={[10, 50]}
                tickCount={5}
                //tickFormatter={(value) => `₵ ${value}`}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dashed"
                    className="bg-white cursor-pointer"
                  />
                }
              />
              <Bar dataKey="clockIn" fill="#2648EA" radius={4} />
              <Bar dataKey="clockOut" fill="#6FAFFF" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex justify-between items-center gap-2 text-sm border pt-5">
          <div className="flex gap-2 font-medium leading-none">
            Number of employees against Clock-In/ Clock-Out times
          </div>
          <div className="flex items-center gap-4">
            <div className="my-3 mx-0 flex items-center gap-1">
              <span className="block w-2 h-2 bg-[#2648EA] rounded-full"></span>{" "}
              <span>Clock-In</span>
            </div>
            <div className="my-3 mx-0 flex items-center gap-1">
              <span className="block w-2 h-2 bg-[#6FAFFF] rounded-full"></span>{" "}
              <span>Clock-Out</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
