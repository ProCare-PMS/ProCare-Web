import React from "react";
import { ProfitChart } from "./Profit/ProfitChart";
import { LossChart } from "./Loss/LossChart";
import { ExpenseRevenueTracking } from "./ExpenseRevenueTracking/ExpenseRevenueTracking";
import ExpenseRevenueTable from "./ExpenseRevenueTable";
import { PaymentMethodChart } from "./PaymentMethod/PaymentMehodChart";
import PaymentMethodListTable from "./PaymentMethodListTable";

function FinancialReporting() {
  return (
    <>
      <ProfitChart />
      <LossChart />
      <ExpenseRevenueTracking />
      <ExpenseRevenueTable />
      <div className="flex justify-between w-full gap-2">
        <div className="w-1/2">
          <PaymentMethodChart />
        </div>
        <div className="w-1/2">
          <PaymentMethodListTable />
        </div>
      </div>
    </>
  );
}

export default FinancialReporting;
