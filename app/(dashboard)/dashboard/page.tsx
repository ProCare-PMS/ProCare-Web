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
import { DashboardLowStockAlert } from "@/components/Dashboard/DashboardLowStock";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

const DashbaordHomePage = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () =>
      await customAxios.get(endpoints.dashboard).then((res) => res),
    select: (findData) => findData?.data,
  });

  console.log(dashboardData)

  return (
    <div className="container grid gap-y-8 pb-6 px-6 pt-7 bg-[#F5F5F5]">
      <div className="hidden md:block">
        <DashboardNote />
      </div>
      <DashboardStats dashboardData={dashboardData} isLoading={isLoading} />
      <div className="flex flex-col md:flex-row items-center gap-6">
        <DashboardSubTables title="Expiry List" data={[]} isLoading={isLoading} />
        <DashboardLowStockAlert title="Low Stock Alert" data={[]} isLoading={isLoading} />
        <DashbaordChart data={dashboardData} />
      </div>
      <div className="bg-white shadow-custom p-4 mb-12 mt-4 rounded-[8px]">
        <DashboardTableHeader />
        <DataTable
          columns={dashboardTransactionColumns}
          data={dashboardData || []}
        />
      </div>

      {/* <DashboardMainTable /> */}
    </div>
  );
};

export default DashbaordHomePage;
