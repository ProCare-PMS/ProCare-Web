import React, { useState } from "react";
import Image from "next/image";
import { Columns } from "./Columns";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useQuery } from "@tanstack/react-query";
import { DatePicker } from "@/components/CustomDatePicker/DatePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateSchema } from "@/lib/schema/schema";
import DashboardTable from "@/components/Tables/DashbaordTable";

function StockAdjustment() {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const { control, setValue } = useForm<FormData>({
    resolver: zodResolver(dateSchema),
  });

  const { data: stockAdjustmentData, isLoading, error } = useQuery({
    queryKey: ["stockAdjustmentData"],
    queryFn: async () => {
      const response = await customAxios.get(endpoints.analytics + "stock-adjustments/recent/");
      return response;
    },
    select: (foundData) => {
      return foundData?.data?.results || [];
    },
  });

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  return (
    <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-8">
      <div className="flex justify-between items-center my-3">
        <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
          Stock Adjustments
        </h2>

        <div className="flex gap-4">

          <div className="w-48">
            <DatePicker
              name="date"
              placeholder="Select Date"
              control={control}
            />
          </div>

          <span className="iconHolder w-10 h-10">
            <Image
              src="/assets/images/filterFrame.svg"
              alt="filter icon"
              width={100}
              height={100}
            />
          </span>
        </div>
      </div>

      <DashboardTable
        columns={Columns}
        data={stockAdjustmentData || []}
        isLoading={isLoading}
      />
    </div>
  );
}

export default StockAdjustment;