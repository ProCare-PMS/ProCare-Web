import React from "react";
import StockTransferTabHeader from "./StockTransferTabHeader";
import DataTable from "@/components/Tables/data-table";
import { stockTransferColumns } from "@/components/Tables/stock-transfer-columns";
import { stockTransferHistoryTable, stockTransferRequestsTable, stockTransferTable } from "@/type";
import StockTransferHistoryHeader from "./StockTransferHistoryHeader";
import { stockTransferHistoryColumns } from "@/components/Tables/stock-transfer-history-columns";
import StockTransferRequestsHeader from "./StockTransferRequestHeader";
import { stockTransferRequestColumns } from "@/components/Tables/stock-transfer-request-columns";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

const StockTransferTab = () => {

  const { data: inventoryBranchSyncData } = useQuery({
    queryKey: ["inventoryBranchSync"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryBranchSync).then((res) => res),
    select: (findData) => findData?.data?.results,
  });

  console.log(inventoryBranchSyncData)


  return (
    <div className="">
      {/* 
      <div className="bg-white mt shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)] p-6 rounded-[8px]">
        <StockTransferTabHeader />
        <DataTable columns={stockTransferColumns} data={stockTransferTable} />
      </div>
      */}
      {/* Stock Transfer History Table 
      <div className="bg-white mt shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)] p-6 rounded-[8px]">
        <StockTransferHistoryHeader />
        <DataTable columns={stockTransferHistoryColumns} data={stockTransferHistoryTable} />
      </div>
      */}
      <div className="bg-white mt shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)] p-6 rounded-[8px]">
        <StockTransferRequestsHeader />
        <DataTable columns={stockTransferRequestColumns} data={stockTransferRequestsTable} />
      </div>

    </div>
  );
};

export default StockTransferTab;
