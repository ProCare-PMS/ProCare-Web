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
import CustomSelect from "@/components/CustomSelect/CustomSelect";

export const description = "A linear area chart";

const chartData = [
  // { day: "1", Stock: 450 },
  // { day: "2", Stock: 760 },
  // { day: "3", Stock: 920 },
  // { day: "4", Stock: 530 },
  // { day: "5", Stock: 610 },
  // { day: "6", Stock: 870 },
  // { day: "7", Stock: 740 },
  // { day: "8", Stock: 680 },
  // { day: "9", Stock: 820 },
  // { day: "10", Stock: 330 },
  // { day: "11", Stock: 750 },
  // { day: "12", Stock: 620 },
  // { day: "13", Stock: 900 },
  // { day: "14", Stock: 430 },
  // { day: "15", Stock: 820 },
  // { day: "16", Stock: 780 },
  // { day: "17", Stock: 920 },
  // { day: "18", Stock: 250 },
  // { day: "19", Stock: 770 },
  // { day: "20", Stock: 980 },
  // { day: "21", Stock: 840 },
  // { day: "22", Stock: 660 },
  // { day: "23", Stock: 350 },
  // { day: "24", Stock: 800 },
  // { day: "25", Stock: 910 },
  // { day: "26", Stock: 220 },
  // { day: "27", Stock: 710 },
  // { day: "28", Stock: 940 },
  // { day: "29", Stock: 380 },
  // { day: "30", Stock: 870 },
  // { day: "31", Stock: 560 },
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

export function StockLevelChart() {
  const [timeRange, setTimeRange] = useState("90d");
  return (
    <div className="w-full bg-white rounded-xl">
      <Card className="rounded-xl">
        <CardHeader className="my-1 flex items-center gap-2 space-y-0 border-b py-2 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Stock Levels</CardTitle>
            <CardDescription>
              Current Stock Level:{" "}
              <span className="text-blue-700 font-bold"></span>
            </CardDescription>
          </div>

          <div className="flex gap-2">
            <CustomSelect
              idField={"date"}
              nameField={"dateName"}
              optionData={[]}
              className="w-[15rem]"
            />

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
        {chartData.length !== 0 ? (
          <>
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
                    <linearGradient
                      id="gradientColor"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="rgba(38, 72, 234, 0.3)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>
                    <linearGradient
                      id="gradientColor2"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
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
                    dataKey="Stock"
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
                  <p>Day against Stock remaining</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <span className="block w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="block">October</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="block w-2 h-2 bg-gray-500 rounded-full"></span>
                    <span className="block">September</span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </>
        ) : (
          <p className="text-center">No data</p>
        )}
      </Card>
    </div>
  );
}
