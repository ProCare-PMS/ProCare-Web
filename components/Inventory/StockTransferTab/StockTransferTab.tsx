import React, { useState } from "react";
import DataTable from "@/components/Tables/data-table";
import StockTransferRequestsHeader from "./StockTransferRequestHeader";
import { stockTransferRequestColumns } from "@/components/Tables/stock-transfer-request-columns";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

const StockTransferTab = () => {
  const [page, setPage] = useState(1);
  const { data: inventoryBranchSyncData } = useQuery({
    queryKey: ["inventoryBranchSync", page],
    queryFn: async () =>
      await customAxios
        .get(`${endpoints.inventoryBranchSync}?page=${page}`)
        .then((res) => res),
    select: (findData) => findData?.data,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="">
      <div className="bg-white mt shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)] p-6 rounded-[8px]">
        <StockTransferRequestsHeader />

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
    </div>
  );
};

export default StockTransferTab;
