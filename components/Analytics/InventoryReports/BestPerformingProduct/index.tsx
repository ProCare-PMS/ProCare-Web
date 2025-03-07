"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { Column } from "./Column";
import { MiniSubTable } from "@/components/MiniSubTable/MiniSubTable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateSchema } from "@/lib/schema/schema";
import { DatePicker } from "@/components/CustomDatePicker/DatePicker";

interface BestPerformingProductType {
  id: string;
  name: string;
  category_name: string;
  quantity: number;
  selling_price: number;
  total_sales: number;
  sales_value: number;
}

interface ApiResponse {
  period: string;
  products: BestPerformingProductType[];
  total_sales_value: number;
}

function BestPerformingProductTable() {
  const { control } = useForm({
    resolver: zodResolver(dateSchema),
  });

  const { data: bestPerformingProductData } = useQuery<ApiResponse>({
    queryKey: ["bestPerformingProduct"],
    queryFn: () =>
      customAxios
        .get(endpoints.analytics + "products/best-performing/")
        .then((res) => res.data),
    select: (data) => {
      const sortedProducts = [...data.products].sort(
        (a, b) => b.sales_value - a.sales_value
      );

      return {
        ...data,
        products: sortedProducts.map((product) => ({
          ...product,
          performance: `${((product.sales_value / data.total_sales_value) * 100).toFixed(2)}%`,
        })),
      };
    },
  });

  return (
    <div className="bg-white p-6 rounded-xl flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
          Best Performing Products
        </h2>
        <div className="flex gap-3">
          <div className="w-48">
            <DatePicker name="date" placeholder="Select Date" control={control} />
          </div>
        </div>
      </div>

      <MiniSubTable columns={Column} data={bestPerformingProductData?.products || []} />
    </div>
  );
}

export default BestPerformingProductTable;
