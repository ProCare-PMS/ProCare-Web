import React from "react";
import DataTable from "@/components/Tables/data-table";
import { Column } from "./Column";
import { Data } from "./Data";
import { MiniSubTable } from "@/components/MiniSubTable/MiniSubTable";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateSchema } from "@/lib/schema/schema";
import { DatePicker } from "@/components/CustomDatePicker/DatePicker";

function BestPerformingProductTable() {
  const { control, setValue } = useForm<FormData>({
    resolver: zodResolver(dateSchema),
  });

  const { data: bestPerformingProductData } = useQuery({
    queryKey: ["bestPerformingProduct"],
    queryFn: () =>
      customAxios
        .get(endpoints.analytics + "products/best-performing/")
        .then((res) => res),
    select: (bestProduct) => bestProduct?.data?.results,
  });

  //console.log({ bestPerformingProductData });
  return (
    <div className="bg-white p-6 rounded-xl flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
          Best Performing Products
        </h2>
        <div className="flex gap-3">
          <div className="w-48">
            <DatePicker
              name="date"
              placeholder="Select Date"
              control={control}
            />
          </div>
          {/* <Link
            href="/page_under_construction"
            className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
          >
            Full view
            <ExternalLink className="text-[#2648EA]" />
          </Link> */}
        </div>
      </div>
      <MiniSubTable columns={Column} data={bestPerformingProductData || []} />
    </div>
  );
}

export default BestPerformingProductTable;
