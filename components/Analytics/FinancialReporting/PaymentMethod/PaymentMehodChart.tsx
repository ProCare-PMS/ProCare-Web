"use client";

import { Pie, PieChart, Tooltip } from "recharts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useForm } from "react-hook-form";
import { DatePicker } from "@/components/CustomDatePicker/DatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateSchema } from "@/lib/schema/schema";

export const description = "A pie chart with a legend";

const chartData = [
  { browser: "Momo", visitors: 275, fill: "#FF9F40" },
  { browser: "Cash", visitors: 200, fill: "#F4BE37" },
  { browser: "Bank", visitors: 187, fill: "#5388D8" },
];

// Calculate total visitors
const totalVisitors = chartData.reduce((acc, data) => acc + data.visitors, 0);

// Add percentage to each element in chartData
const chartDataWithPercentage = chartData.map((data) => ({
  ...data,
  percentage: ((data.visitors / totalVisitors) * 100).toFixed(2), // Calculate percentage
}));

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Momo: {
    label: "Momo",
    color: "#FF9F40",
  },
  Cash: {
    label: "Cash",
    color: "#F4BE37",
  },
  Bank: {
    label: "Bank",
    color: "#5388D8",
  },
} satisfies ChartConfig;

export function PaymentMethodChart() {
  const { control, setValue } = useForm<FormData>({
    resolver: zodResolver(dateSchema),
  });
  return (
    <Card className="flex flex-col w-full bg-white rounded-2xl h-96">
      <div className="flex justify-between py-4 px-3">
        <div>
          <CardTitle>Payment Method</CardTitle>
        </div>
        <div className="flex gap-2">
          <div className="w-48">
            <DatePicker
              name="date"
              placeholder="Select Date"
              control={control}
            />
          </div>

          <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2">
            <span>
              <CloudUploadOutlinedIcon />
            </span>
            <span>Export</span>
          </div>
        </div>
      </div>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto w-full">
          <PieChart>
            <Pie
              //data={chartDataWithPercentage}
              data={[]}
              dataKey="visitors"
              nameKey="browser"
              label={({ percentage }) => `${percentage}%`} // Show percentage on each slice
              outerRadius={100}
              fill="#8884d8"
            />
            <Tooltip
              formatter={(value, name, props) => [
                `${value} visitors`,
                `${props.payload.percentage}%`,
              ]}
            />
            <ChartLegend
              content={
                <ChartLegendContent nameKey="browser">
                  {chartDataWithPercentage.map((data) => (
                    <div key={data.browser}>
                      {data.browser}: {data.percentage}%
                    </div>
                  ))}
                </ChartLegendContent>
              }
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
