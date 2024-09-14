import React from "react";
import SupplierPerformanceTable from "./SupplierPerformance";
import { OrderVolumeFChart } from "./OrderVolumesFrequency/OrderVolumeFChart";

function PurchaseAnalyticsPage() {
  return (
    <div>
      <SupplierPerformanceTable />
      <OrderVolumeFChart />
    </div>
  );
}

export default PurchaseAnalyticsPage;
