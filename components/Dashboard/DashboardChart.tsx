"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { RiCheckboxBlankFill } from "react-icons/ri";

const chartData = [
  { products: "Vitamins", totalCost: 175, fill: "#0A77FF" },
  { products: "Travel", totalCost: 254, fill: "#2648EA" },
  { products: "Essentials", totalCost: 884, fill: "#D3E7FF" },
];

const chartConfig = {
  vitamins: {
    label: "Vitamins",
    color: "#0A77FF",
  },
  travel: {
    label: "Travel",
    color: "#2648EA",
  },
  essentials: {
    label: "Essentials",
    color: "#D3E7FF",
  },
} satisfies ChartConfig;

export function DashbaordChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totalCost, 0);
  }, []);

  return (
    <Card className="flex flex-col bg-white h-[428px] w-[300px] rounded-[10px]">
      <div className=" flex items-center justify-between py-2 px-4">
        <CardTitle className="text-base text-[#323539] font-inter">
          Best Selling Products
        </CardTitle>
        <BiDotsHorizontalRounded />
      </div>
      <hr className="bg-black " />
      <CardContent className="flex-1 -mt-4 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="totalCost"
              nameKey="products"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-2xl"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="bg-black text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="flex-col gap-2 text-sm -mt-8">
        {chartData.map((chart) => (
          <>
            <div
              className="flex items-center p-2 justify-between"
              key={chart.products}
            >
              <div className="flex items-center gap-3">
                <RiCheckboxBlankFill style={{ color: `${chart.fill}` }} />
                <span className="text-black font-medium font-inter text-sm">
                  {chart.products}
                </span>
              </div>
              <span className="text-black font-medium font-inter text-sm">
                ₵{chart.totalCost}
              </span>
            </div>
            <hr />
          </>
        ))}
      </div>
      <div className="flex items-center justify-between py-3 px-4">
        <span className="text-[#858C95] text-sm font-semibold font-inter">
          Total of all counter party balances
        </span>
        <Link
          href="/"
          className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
        >
          Open
          <ExternalLink className="text-[#2648EA]" />
        </Link>
      </div>
    </Card>
  );
}
