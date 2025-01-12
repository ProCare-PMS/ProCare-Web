// export default SupplierPerformanceTable;
import DataTable from "@/components/Tables/data-table";
import React, { useState } from "react";
import Image from "next/image";
import { Columns } from "./Column";
import { Data } from "./Data";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateSchema } from "@/lib/schema/schema";
import { DatePicker } from "@/components/CustomDatePicker/DatePicker";

function SupplierPerformanceTable() {
  const { control, setValue } = useForm<FormData>({
    resolver: zodResolver(dateSchema),
  });
  const [searchValues, setSetSearchValues] = useState<string>("");

  //get data for the table
  const { data: analyticsPerformanceData } = useQuery({
    queryKey: ["purchasePerfomance"],
    queryFn: () =>
      customAxios
        .get(endpoints.analytics + "products/performance/")
        .then((res) => res),
    select: (foundData) => foundData.data?.results || [],
  });

  console.log({ analyticsPerformanceData });

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  return (
    <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-8">
      <div className="flex justify-between items-center my-3">
        <div>
          <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
            Supplier Performance
          </h2>
          <div>
            <span className="text-slate-300">Total Number of Purchase:</span>{" "}
            <span className="text-sky-500 bold">
              {analyticsPerformanceData?.length}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-48">
            <DatePicker
              name="date"
              placeholder="Select Date"
              control={control}
            />
          </div>

          {/* <SearchFieldInput
            value={searchValues}
            onChange={handleSearchValueChange}
          /> */}

          {/* <span className="iconHolder w-10 h-10">
            <Image
              src="/assets/images/filterFrame.svg"
              alt="filter icon"
              width={100}
              height={100}
            />
          </span> */}
          <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2">
            <span>
              <CloudUploadOutlinedIcon />
            </span>
            <span>Export</span>
          </div>
          <Link
            href={"/page_under_construction"}
            className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
          >
            Open
            <ExternalLink className="text-[#2648EA]" />
          </Link>
        </div>
      </div>

      <DataTable
        columns={Columns}
        data={analyticsPerformanceData || []}
        searchValue={searchValues}
      />
    </div>
  );
}

export default SupplierPerformanceTable;
