import React from "react";
import { ProfitChart } from "./Profit/ProfitChart";
import { LossChart } from "./Loss/LossChart";
import { ExpenseRevenueTracking } from "./ExpenseRevenueTracking/ExpenseRevenueTracking";

function FinancialReporting() {
  return (
    <>
      <ProfitChart />
      <LossChart />
      <ExpenseRevenueTracking />
    </>
  );
}

export default FinancialReporting;
