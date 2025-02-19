import React, { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { stockTransferRequestColumns } from "@/components/Tables/stock-transfer-request-columns";
import DataTable from "@/components/Tables/data-table";

const StockTransferRequest = () => {
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

  return (
    <div className="bg-white mt shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)] p-6 rounded-[8px]">
      <div className="flex items-center  justify-between mb-6">
        <h2 className="text-[#202224] font-semibold text-2xl">Requests</h2>

        <div className="flex flex-row border-2 w-[300px] border-[#EAEBF0] rounded-xl items-center  gap-2 bg-transparent p-1">
          <Search size={16} />
          <input
            type="search"
            name="search"
            placeholder="Search by transfer id"
            id=""
            className="text-sm p-1  focus:outline-none bg-transparent"
          />
        </div>
      </div>

      <DataTable
        columns={stockTransferRequestColumns}
        onPageChange={handlePageChange}
        data={
          inventoryBranchSyncData || {
            results: [],
            count: 0,
            links: { next: null, previous: null },
            total_pages: 0,
          }
        }
      />
    </div>
  );
};

export default StockTransferRequest;
