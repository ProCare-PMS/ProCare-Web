"use client";
import React from "react";
import DashboardNote from "./_components/DashboardNote";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import { DashboardSubTables } from "@/components/Dashboard/DashboardSubTables";
import { dashboardTransactionColumns } from "@/components/Tables/columns";
import DashboardTableHeader from "@/components/Dashboard/DashboardTableHeader";
import { DashbaordChart } from "@/components/Dashboard/DashboardChart";
import { DashboardLowStockAlert } from "@/components/Dashboard/DashboardLowStock";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import DashboardTable from "@/components/Tables/DashbaordTable";

const DashbaordHomePage = () => {
  const userdata = localStorage.getItem("user");
  const user = userdata && JSON.parse(userdata);

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () =>
      await customAxios.get(endpoints.dashboard).then((res) => res),
    select: (findData) => findData?.data,
  });

  return (
    <div className="container grid gap-y-8 pb-6 px-6 pt-7 bg-[#F5F5F5]">
      <div className="hidden md:block">
        <DashboardNote />
      </div>
      {(user?.is_pharmacist || user?.is_manager) && (
        <DashboardStats dashboardData={dashboardData} isLoading={isLoading} />
      )}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <DashboardSubTables
          title="Expiry List"
          data={dashboardData?.expiry_soon_products_list}
          isLoading={isLoading}
        />
        <DashboardLowStockAlert
          title="Low Stock Alert"
          data={[]}
          isLoading={isLoading}
        />
        <DashbaordChart data={dashboardData?.top_categories || []} />
      </div>
      <div className="bg-white shadow-custom p-4 mb-12 mt-4 rounded-[8px]">
        <DashboardTableHeader />

        <DashboardTable
          columns={dashboardTransactionColumns}
          data={dashboardData || []}
          isLoading={isLoading}
        />
      </div>

      {/* <DashboardMainTable /> */}
    </div>
  );
};

export default DashbaordHomePage;
