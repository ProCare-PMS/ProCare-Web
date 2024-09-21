import React from "react";
import { StockLevelChart } from "./StockLevel/StockLevel";
import UnderPerformingProductTable from "./LowPerformingProduct";
import BestPerformingProductTable from "./BestPerformingProduct";
import InventoryAgingReportTable from "./InventoryAgingReport";
import StockAdjustment from "./StockAdjustment";

function InventoryReports() {
  return (
    <>
      <StockLevelChart />
      <div className="mt-5 flex gap-4">
        <BestPerformingProductTable />
        <UnderPerformingProductTable />
      </div>
      <StockAdjustment />
      <InventoryAgingReportTable />
    </>
  );
}

export default InventoryReports;
