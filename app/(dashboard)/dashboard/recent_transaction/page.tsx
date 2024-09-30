import DashboardTableHeader from "@/components/Dashboard/DashboardTableHeader";
import { dashboardTransactionColumns } from "@/components/Tables/columns";
import DataTable from "@/components/Tables/data-table";
import { dashboardTransactions } from "@/type";
import React from "react";

function RecentTransactionsPage() {
  return (
    <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px]">
      <DashboardTableHeader />
      <DataTable
        columns={dashboardTransactionColumns}
        data={dashboardTransactions}
      />
    </div>
  );
}

export default RecentTransactionsPage;
