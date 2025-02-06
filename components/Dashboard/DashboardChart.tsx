"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { Ellipsis, Square } from "lucide-react";
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
import { DashboardStatsResponse } from "@/Types";

interface TopCategory {
  name: string;
  total_quantity: number;
}

interface DashbaordChartProps {
  data: TopCategory[];
}

export function DashbaordChart({ data }: DashbaordChartProps) {
  // Predefined colors for consistency
  const colors = ["#0A77FF", "#2648EA", "#D3E7FF"];

  // Get top 3 products by total_quantity
  const topProducts = [...data]
    .sort((a, b) => b.total_quantity - a.total_quantity)
    .slice(0, 3);

  // Generate chart data with fixed colors
  const chartData = topProducts.map((category, index) => ({
    products: category.name,
    totalCost: category.total_quantity,
    fill: colors[index], // Assign predefined colors
  }));

  // Generate chart config
  const chartConfig = chartData.reduce((acc, category) => {
    acc[category.products] = {
      label: category.products,
      color: category.fill,
    };
    return acc;
  }, {} as ChartConfig);

  // Handle empty data
  const emptyData = colors.map((color, index) => ({
    products: `- ${index + 1}`,
    totalCost: 1,
    fill: color,
  }));

  const emptyConfig = {
    "- 1": { label: "- 1", color: colors[0] },
    "- 2": { label: "- 2", color: colors[1] },
    "- 3": { label: "- 3", color: colors[2] },
  };

  const chartInfo = data.length === 0 ? emptyConfig : chartConfig;

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totalCost, 0);
  }, [chartData]);

  const displayedTotal = data.length === 0 ? 0 : totalVisitors;
  const dataArray = data.length === 0 ? emptyData : chartData;

  return (
    <Card className="flex flex-col bg-white h-[428px] w-[300px] rounded-[10px]">
      <div className="flex items-center justify-between py-2 px-4">
        <CardTitle className="text-base text-[#323539] font-inter">
          Best Selling Products
        </CardTitle>
        <Ellipsis />
      </div>
      <hr className="bg-black " />
      <CardContent className="flex-1 -mt-4 pb-0">
        <ChartContainer
          config={chartInfo}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="!bg-black !text-white cursor-pointer"
                />
              }
            />
            <Pie
              data={dataArray}
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
                        className="!text-2xl bg-green-500"
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
                          {displayedTotal.toLocaleString()}
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
        {dataArray.map((chart, index) => (
          <div key={index}>
            <div className="flex items-center p-2 justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: chart.fill }}
                ></div>
                <span className="text-black font-medium font-inter text-sm">
                  {chart.products}
                </span>
              </div>
              <span className="text-black font-medium font-inter text-sm">
                {data.length === 0 ? "-" : `₵${chart.totalCost}`}
              </span>
            </div>
            <hr />
          </div>
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
