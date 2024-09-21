"use client";
import React from "react";
import DashboardNote from "./_components/DashboardNote";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import { DashboardSubTables } from "@/components/Dashboard/DashboardSubTables";
import DataTable from "@/components/Tables/data-table";
import { dashboardTransactionColumns } from "@/components/Tables/columns";
import { dashboardTransactions } from "@/type";
import DashboardTableHeader from "@/components/Dashboard/DashboardTableHeader";
import { DashbaordChart } from "@/components/Dashboard/DashboardChart";

const DashbaordHomePage = () => {
  return (
    <div className="container grid gap-y-8 pb-6 px-8 pt-7 bg-[#F5F5F5]">
      <div className="hidden md:block">
        <DashboardNote />
      </div>
      <DashboardStats />
      <div className="flex flex-col md:flex-row items-center gap-6">
        <DashboardSubTables title="Expiry List" />
        <DashboardSubTables title="Low Stock Alert" />
        <DashbaordChart />
      </div>
      <div className="bg-white shadow-custom p-4 mb-12 mt-4 rounded-[8px]">
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
