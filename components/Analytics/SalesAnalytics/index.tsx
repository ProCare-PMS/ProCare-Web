import React from "react";
import { SalesBarChart } from "./SalesBarChart/SalesBarChart";
import BestSellingProductTable from "./BestSellingProduct";
import { DailySalesChart } from "./DailySalesChart/DailySalesChart";
import DailySalesTransactionTable from "./DailyTransactionTable";

function SalesAnalyticsPage() {
  return (
    <>
      <SalesBarChart />
      <BestSellingProductTable />
      <DailySalesChart />
      <DailySalesTransactionTable />
    </>
  );
}

export default SalesAnalyticsPage;
