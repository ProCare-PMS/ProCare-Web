"use client";
import React, { useState } from "react";
import { SlidersVertical, ArrowLeft } from "lucide-react";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Tables/data-table";
import { useRouter } from "next/navigation";
import { lowStockColumns } from "./lowStockcolumns";

const LowStockAlertPage = () => {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const router = useRouter();

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  const { data: inventoryLowStocksData, isLoading } = useQuery({
    queryKey: ["inventoryLowStock"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryLowStock).then((res) => res),
    select: (findData) => findData?.data,
  });


  return (
    <div className="container grid gap-y-8 pb-6 px-6 mt-7 bg-[#F5F5F5] min-h-full">
      <div className="p-6 bg-white mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ArrowLeft
              className="mr-3 text-[#3B3C41] cursor-pointer"
              onClick={() => router.back()}
            />
            <h2 className="text-[#202224] font-semibold text-2xl font-inter">
              Low Stock List
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <SearchFieldInput
              value={searchValues}
              onChange={handleSearchValueChange}
              placeholder="Search for purchase"
            />

            <div className="border p-2  cursor-pointer border-main rounded-[12px]">
              <SlidersVertical className="text-main" />
            </div>
          </div>
        </div>

        <DataTable
          columns={lowStockColumns}
          data={{
            results: inventoryLowStocksData || [],
            count: inventoryLowStocksData?.length || 0,
            links: { next: null, previous: null },
            total_pages: 1,
          }}
          searchValue={searchValues}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default LowStockAlertPage;
