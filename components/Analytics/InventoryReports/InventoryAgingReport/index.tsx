import DataTable from "@/components/Tables/data-table";
import React, { useState } from "react";
import Image from "next/image";
import { Columns } from "./Columns";
import { Data } from "./Data";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

function InventoryAgingReportTable() {
  const [searchValues, setSetSearchValues] = useState<string>("");

  const { data: agingReportData, isLoading } = useQuery({
    queryKey: ["agingReportData"],
    queryFn: () =>
      customAxios
        .get(endpoints.analytics + "inventory-aging/")
        .then((res) => res),
    select: (data) => data.data,
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
          Inventory Aging Report
        </h2>

        <div className="flex gap-4">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchValueChange}
          />

          <span className="iconHolder w-10 h-10">
            <Image
              src="/assets/images/filterFrame.svg"
              alt="filter icon"
              width={100}
              height={100}
            />
          </span>
          {/* <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2">
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
          </Link> */}
        </div>
      </div>

      <DataTable
        columns={Columns}
        data={
          agingReportData || {
            results: [],
            count: 0,
            links: { next: null, previous: null },
            total_pages: 0,
          }
        }
        isLoading={isLoading}
        searchValue={searchValues}
      />
    </div>
  );
}

export default InventoryAgingReportTable;
