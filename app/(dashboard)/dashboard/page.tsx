import React from "react";
import DashboardNote from "./_components/DashboardNote";
import DashboardSalesStats from "./_components/DashboardSalesStats";
import DashboardTables from "./_components/DashboardTables";
import { DashboardMainTable } from "./_components/DashboardMainTable";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import { DashboardSubTables } from "@/components/Dashboard/DashboardSubTables";
import DataTable from "@/components/Tables/data-table";
import { dashboardTransactionColumns } from "@/components/Tables/columns";
import { dashboardTransactions } from "@/type";
import DashboardTableHeader from "@/components/Dashboard/DashboardTableHeader";
import { DashbaordChart } from "@/components/Dashboard/DashboardChart";


const DashbaordHomePage = () => {
  return (
    <div className="container pb-12 px-16 pt-7 bg-[#F5F5F5]">
      <div className="hidden md:block">
        <DashboardNote />
      </div>
      <DashboardStats />
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <DashboardSubTables title="Expiry List" />
        <DashboardSubTables title="Low Stock Alert" />
        <DashbaordChart />
      </div>
      <div className="bg-white shadow-custom p-4 mb-24 rounded-[8px]">
        <DashboardTableHeader />
        <DataTable
          columns={dashboardTransactionColumns}
          data={dashboardTransactions}
        />
      </div>

      {/* <DashboardMainTable /> */}
    </div>
  );
};

export default DashbaordHomePage;
