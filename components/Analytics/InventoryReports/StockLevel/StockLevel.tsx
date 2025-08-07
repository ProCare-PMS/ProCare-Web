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
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useState, useEffect } from "react";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { DatePicker } from "@/components/CustomDatePicker/DatePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateSchema } from "@/lib/schema/schema";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";

// Define the form data type for react-hook-form
interface FormData {
  date?: string | Date | null;
}

export const description = "Stock levels chart with product search";

// Interface for stock level data based on API response
interface StockLevelEntry {
  date: string;
  total_quantity: number;
}

interface StockLevelResponse {
  links: {
    next: string | null;
    previous: string | null;
  };
  count: number;
  total_pages: number;
  results: {
    [month: string]: StockLevelEntry[];
  };
}

// Interface for product options
interface ProductOption {
  id: string;
  name: string;
}

const chartConfig = {
  total_quantity: {
    label: "Stock Quantity",
    color: "#2648EA",
  },
} satisfies ChartConfig;

export function StockLevelChart() {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("30"); // Default to 30 days

  const { control, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(dateSchema),
  });

  const selectedDate = watch("date");

  // Fetch available products for the dropdown
  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      customAxios
        .get(endpoints.analytics + "products/stock-levels/")
        .then((res) => res),
    select: (foundData) => {
      const products = foundData?.data?.results || foundData?.data || [];
      return products.map((product: any) => ({
        id: product.id,
        name: product.name,
        dateName: product.name, // For CustomSelect component
        date: product.id, // For CustomSelect component
      }));
    },
  });

  // Fetch stock level data
  const { data: stockLevelData, isLoading, refetch } = useQuery({
    queryKey: ["stockLevels", selectedProduct, dateRange, selectedDate],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (selectedProduct) {
        params.append('product_id', selectedProduct);
      }
      if (dateRange) {
        params.append('days', dateRange);
      }
      if (selectedDate) {
        params.append('date', String(selectedDate));
      }

      const response = await customAxios.get(
        `${endpoints.analytics}stock-levels/?${params.toString()}`
      );
      console.log("Stock levels response:", response);
      return response;
    },
    select: (foundData): StockLevelResponse => {
      const data = foundData?.data || {};
      console.log("Selected stock data:", data);
      return data;
    },
    enabled: !!selectedProduct, // Only fetch when a product is selected
  });

  // Filter products based on search
  const filteredProducts = productsData?.filter((product: ProductOption) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const handleProductChange = (e: any) => {
    setSelectedProduct(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Transform the nested month data into a flat array for the chart
  const transformStockData = () => {
    if (!stockLevelData?.results) return [];

    const allData: Array<{
      day: string;
      date: string;
      Stock: number;
      month: string;
      formattedDate: string;
    }> = [];

    // Iterate through each month
    Object.entries(stockLevelData.results).forEach(([month, entries]) => {
      entries.forEach((entry, index) => {
        const date = new Date(entry.date);
        allData.push({
          day: date.getDate().toString(),
          date: entry.date,
          Stock: entry.total_quantity,
          month: month,
          formattedDate: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })
        });
      });
    });

    // Sort by date to ensure proper chronological order
    return allData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const chartData = transformStockData();

  // Calculate current stock level (latest data point)
  const currentStockLevel = chartData.length > 0
    ? chartData[chartData.length - 1]?.Stock
    : 0;

  // Get unique months for legend
  const availableMonths = chartData.reduce((months, item) => {
    if (!months.includes(item.month)) {
      months.push(item.month);
    }
    return months;
  }, [] as string[]);

  // Calculate Y-axis domain based on data
  const getYAxisDomain = () => {
    if (!chartData.length) return [0, 1000];

    const stockValues = chartData.map(item => item.Stock);
    const minStock = Math.min(...stockValues);
    const maxStock = Math.max(...stockValues);
    const padding = (maxStock - minStock) * 0.1 || 50;

    return [
      Math.max(0, Math.floor(minStock - padding)),
      Math.ceil(maxStock + padding)
    ];
  };

  const dateRangeOptions = [
    { id: "7", dateName: "Last 7 days", date: "7" },
    { id: "30", dateName: "Last 30 days", date: "30" },
    { id: "90", dateName: "Last 90 days", date: "90" },
  ];

  return (
    <div className="w-full bg-white rounded-xl">
      <Card className="rounded-xl">
        <CardHeader className="my-1 flex items-center gap-2 space-y-0 border-b py-2 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Stock Levels</CardTitle>
            <CardDescription>
              Current Stock Level:{" "}
              <span className="text-blue-700 font-bold">
                {currentStockLevel ? currentStockLevel.toLocaleString() : '-'}
              </span>
            </CardDescription>
          </div>

          <div className="flex gap-2">
            <div className="w-48">
              <SearchFieldInput
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search products..."
              />
            </div>

            <CustomSelect
              idField="date"
              nameField="dateName"
              optionData={filteredProducts}
              className="w-[15rem]"
              value={selectedProduct}
              onChange={handleProductChange}
            />

            <CustomSelect
              idField="date"
              nameField="dateName"
              optionData={dateRangeOptions}
              className="w-[10rem]"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />

            <div className="w-48">
              <DatePicker
                name="date"
                placeholder="Select Date"
                control={control}
              />
            </div>
          </div>
        </CardHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : !selectedProduct ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <p className="text-gray-500 text-lg">Please select a product to view stock levels</p>
              <p className="text-gray-400 text-sm mt-2">Use the search box and dropdown above to choose a product</p>
            </div>
          </div>
        ) : chartData.length > 0 ? (
          <>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
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
                  </defs>

                  <CartesianGrid
                    vertical={false}
                    horizontal={true}
                    strokeDasharray="3 3"
                    stroke="#e0e4e7"
                  />

                  <XAxis
                    dataKey="formattedDate"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval="preserveStartEnd"
                  />

                  <YAxis
                    domain={getYAxisDomain()}
                    tickCount={5}
                    tickLine={true}
                    axisLine={true}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.toLocaleString()}
                  />

                  <ChartTooltip
                    cursor={{ stroke: "rgba(38, 72, 234, 0.1)", strokeWidth: 2 }}
                    content={
                      <ChartTooltipContent
                        className="bg-white border border-gray-200 shadow-lg rounded-lg p-2"
                        formatter={(value, name) => [
                          `${Number(value).toLocaleString()} units`,
                          "Stock Quantity"
                        ]}
                        labelFormatter={(label, payload) => {
                          const data = payload?.[0]?.payload;
                          return data ? `${data.date} (${data.month})` : label;
                        }}
                      />
                    }
                  />

                  <Area
                    dataKey="Stock"
                    type="monotone"
                    fill="url(#gradientColor)"
                    fillOpacity={0.4}
                    stroke="#2648EA"
                    strokeWidth={2}
                    dot={{ fill: "#2648EA", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#2648EA", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>

            <CardFooter>
              <div className="flex justify-between w-full text-sm">
                <div>
                  <p>Daily stock levels for selected product</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Total data points: {chartData.length}
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <span className="block w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="block">Stock Quantity</span>
                  </div>
                  {availableMonths.length > 0 && (
                    <div className="flex gap-2">
                      {availableMonths.map((month, index) => (
                        <div key={month} className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">{month}</span>
                          {index < availableMonths.length - 1 && (
                            <span className="text-gray-300">|</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardFooter>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <p className="text-gray-500 text-lg">No stock data available</p>
              <p className="text-gray-400 text-sm mt-2">
                Try selecting a different product or date range
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}