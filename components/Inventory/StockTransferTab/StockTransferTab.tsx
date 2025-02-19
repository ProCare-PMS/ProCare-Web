import React, { useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import StockTransferStats from "./StockTransferStats/StockTransferStats";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import { CircleCheckBig, ListChecks } from "lucide-react";
import DataTable from "@/components/Tables/data-table";
import { otherPharmaciesColumns } from "./Columns";

const StockTransferTab = () => {
  const [searchValues, setSearchValues] = useState<string>("");
  const [page, setPage] = useState(1);
  const { data: inventoryBranchSyncData, isLoading } = useQuery({
    queryKey: ["inventoryBranchSync", page],
    queryFn: async () =>
      await customAxios
        .get(`${endpoints.inventoryBranchSync}?page=${page}`)
        .then((res) => res),
    select: (findData) => findData?.data,
  });

  console.log(inventoryBranchSyncData);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValues(event.target.value);
  };

  return (
    <div className="">
      <StockTransferStats
        data={inventoryBranchSyncData?.results}
        isLoading={isLoading}
      />

      <div className="bg-white mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)] p-6 rounded-[8px]">
        <div className="flex items-center  justify-between mb-6">
          <h2 className="text-[#202224] font-semibold text-2xl">
            Other Pharmacies
          </h2>

          <div className="flex items-center justify-between space-x-4">
            <SearchFieldInput
              value={searchValues}
              onChange={handleSearchChange}
              placeholder="Search using pharmacy ID or Name"
            />

            <button className="flex items-center gap-2 border py-2 px-3 border-[#D0D5DD] rounded-[6px]">
              <CircleCheckBig className="text-sm  text-[#6B6C74]" />
              <p className="text-[#6B6C74] font-semibold text-sm">
                View Requests
              </p>
            </button>
            <button className="flex items-center gap-2 border py-2 px-3 border-[#D0D5DD] rounded-[6px]">
              <ListChecks className="text-sm text-[#6B6C74]" />
              <p className="text-[#6B6C74] font-semibold text-sm">
                View History
              </p>
            </button>
          </div>
        </div>

        {/* DataTable*/}
        <DataTable
          columns={otherPharmaciesColumns}
          data={
            inventoryBranchSyncData || {
              results: [],
              count: 0,
              links: { next: null, previous: null },
              total_pages: 0,
            }
          }
          searchValue={searchValues}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default StockTransferTab;
