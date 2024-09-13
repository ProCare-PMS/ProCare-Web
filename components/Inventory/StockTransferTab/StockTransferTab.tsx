import React from "react";
import StockTransferTabHeader from "./StockTransferTabHeader";
import DataTable from "@/components/Tables/data-table";
import { stockTransferColumns } from "@/components/Tables/stock-transfer-columns";
import { stockTransferHistoryTable, stockTransferTable,  } from "@/type";
import StockTransferHistoryHeader from "./StockTransferHistoryHeader";
import { stockTransferHistoryColumns } from "@/components/Tables/stock-transfer-history-columns";

const StockTransferTab = () => {
  return (
    <div className="container mx-auto px-12">
      {/* 
      <div className="bg-white mt shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)] p-6 rounded-[8px]">
        <StockTransferTabHeader />
        <DataTable columns={stockTransferColumns} data={stockTransferTable} />
      </div>
      */}
      <div className="bg-white mt shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)] p-6 rounded-[8px]">
        <StockTransferHistoryHeader />
        <DataTable columns={stockTransferHistoryColumns} data={stockTransferHistoryTable} />
      </div>
    </div>
  );
};

export default StockTransferTab;
