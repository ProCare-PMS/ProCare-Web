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
import { endpoints, analyticsUrls } from "@/api/Endpoints";
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
  product_name?: string;
  product_id?: string;
}

interface StockLevelResponse {
  links: {
    next: string | null;
    previous: string | null;
  };
  count: number;
  total_pages: number;
  results: StockLevelEntry[];
  summary: {
    total_products: number;
    average_stock_level: number;
    low_stock_products: number;
  };
}

// Interface for product options
interface ProductOption {
  id: string;
  name: string;
  dateName: string;
  date: string;
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
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days ago
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0] // Today
  );

  const { control, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(dateSchema),
  });

  const selectedDate = watch("date");

  // Update start date when date picker changes
  useEffect(() => {
    if (selectedDate instanceof Date) {
      setStartDate(selectedDate.toISOString().split('T')[0]);
    }
  }, [selectedDate]);

  // Fetch available products for the dropdown - using inventory products endpoint
  const { data: productsData } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: async () =>
      customAxios
        .get(endpoints.inventoryProduct)
        .then((res) => res),
    select: (foundData) => {
      const products = foundData?.data?.results || foundData?.data || [];
      return products.map((product: any) => ({
        id: product.id,
        name: product.name,
        dateName: product.name,
        date: product.id,
      }));
    },
  });

  // Fetch stock level data using the new endpoint with startdate/enddate
  const { data: stockLevelData, isLoading, refetch } = useQuery({
    queryKey: ["stockLevels", selectedProduct, startDate, endDate],
    queryFn: async () => {
      const url = analyticsUrls.stockLevels({
        startdate: startDate,
        enddate: endDate,
        product_id: selectedProduct || undefined,
      });
      const response = await customAxios.get(url);
      console.log("Stock levels response:", response);
      return response;
    },
    select: (foundData): StockLevelResponse => {
      const data = foundData?.data || {};
      console.log("Selected stock data:", data);
      
      // Handle the case where results is an object with month keys
      let flatResults: StockLevelEntry[] = [];
      
      if (data.results && typeof data.results === 'object') {
        // If results is an object with month keys, flatten it
        Object.entries(data.results).forEach(([month, entries]: [string, any]) => {
          if (Array.isArray(entries)) {
            flatResults = [...flatResults, ...entries];
          }
        });
      } else if (Array.isArray(data.results)) {
        // If results is already an array
        flatResults = data.results;
      }
      
      return {
        links: data.links || { next: null, previous: null },
        count: data.count || flatResults.length,
        total_pages: data.total_pages || 1,
        results: flatResults,
        summary: data.summary || {
          total_products: 0,
          average_stock_level: 0,
          low_stock_products: 0,
        },
      };
    },
  });



  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleExport = () => {
    console.log("Exporting stock levels data...");
  };

  // Filter products based on search
  const filteredProducts = productsData?.filter((product: ProductOption) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  // Prepare chart data - now working with flat array
  const chartData = stockLevelData?.results?.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    total_quantity: item.total_quantity,
    product_name: item.product_name,
  })) || [];

  return (
    <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-8">
      <div className="flex justify-between items-center my-3">
        <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
          Stock Levels Analytics
        </h2>

        <div className="flex gap-4">
          <div className="w-48">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              max={endDate}
            />
          </div>
          
          <div className="w-48">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={startDate}
            />
          </div>
          
          <SearchFieldInput
            value={searchValue}
            onChange={handleSearchValueChange}
            placeholder="Search products..."
          />

          <div className="w-48">
            <CustomSelect
              idField="date"
              nameField="dateName"
              optionData={[
                { date: "", dateName: "All Products" },
                ...filteredProducts.map((product: ProductOption) => ({
                  date: product.id,
                  dateName: product.name,
                }))
              ]}
              value={selectedProduct ? 
                { date: selectedProduct, dateName: filteredProducts.find((p: ProductOption) => p.id === selectedProduct)?.name || "" } : 
                { date: "", dateName: "All Products" }
              }
              onChange={(selected) => setSelectedProduct(selected?.date || "")}
            />
          </div>

          <span className="iconHolder w-10 h-10 cursor-pointer">
            <Image
              src="/assets/images/filterFrame.svg"
              alt="filter icon"
              width={100}
              height={100}
            />
          </span>
          
          <button
            onClick={handleExport}
            className="border border-gray-200 w-32 flex justify-center items-center rounded-[0.5rem] gap-2 py-2 px-4 hover:bg-gray-50"
          >
            <CloudUploadOutlinedIcon fontSize="small" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2648EA]">
              {stockLevelData?.summary?.total_products || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Stock Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stockLevelData?.summary?.average_stock_level?.toFixed(0) || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Low Stock Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stockLevelData?.summary?.low_stock_products || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Levels Trend</CardTitle>
          <CardDescription>
            Showing stock levels from {startDate} to {endDate}
            {selectedProduct && ` - ${filteredProducts.find((p: ProductOption) => p.id === selectedProduct)?.name}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
              />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="total_quantity"
                type="natural"
                fill={chartConfig.total_quantity.color}
                fillOpacity={0.4}
                stroke={chartConfig.total_quantity.color}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Stock levels from {startDate} to {endDate}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {stockLevelData?.count || 0} data points analyzed
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading stock levels...</div>
        </div>
      )}
    </div>
  );
}

export default StockLevelChart;