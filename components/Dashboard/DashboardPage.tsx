"use client";

import React, { useState } from "react";
import DashboardNote from "../../app/(dashboard)/dashboard/_components/DashboardNote";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import DashboardSubTables from "@/components/Dashboard/DashboardSubTables";
import { dashboardTransactionColumns } from "@/components/Tables/columns";
import DashboardTableHeader from "@/components/Dashboard/DashboardTableHeader";
import DashbaordChart from "@/components/Dashboard/DashboardChart";
import DashboardLowStockAlert from "@/components/Dashboard/DashboardLowStock";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import DataTable from "@/components/Tables/data-table";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const DashboardHomePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [page, setPage] = useState(1);

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () =>
      await customAxios.get(endpoints.dashboard).then((res) => res.data),
  });

  const { data: recentTransactionsData } = useQuery({
    queryKey: ["recentTransactionsData", page],
    queryFn: async () =>
      await customAxios.get(`${endpoints.sales}?page=${page}`).then((res) => res.data),
  });

  return (
    <div className="container grid gap-y-8 pb-6 px-6 pt-7 bg-[#F5F5F5]">
      <div className="hidden md:block">
        <DashboardNote />
      </div>
      {/* {(user?.is_pharmacist || user?.is_manager) && (
        <DashboardStats dashboardData={dashboardData} isLoading={isLoading} />
      )} */}
      {/* <div className="flex overflow-hidden flex-col md:flex-row items-center gap-6">
        <DashboardSubTables
          title="Expiry List"
          data={dashboardData?.expiring_soon_products_list}
          isLoading={isLoading}
        />
        <DashboardLowStockAlert
          title="Low Stock Alert"
          data={dashboardData?.low_stock_products_list}
          isLoading={isLoading}
        />
        <DashbaordChart data={dashboardData?.top_categories || []} />
      </div> */}
      <div className="bg-white shadow-custom p-4 mb-12 mt-4 rounded-[8px] w-full overflow-hidden">
        <DashboardTableHeader />
        <div className="w-full overflow-x-auto">
          <DataTable
            columns={dashboardTransactionColumns}
            data={
              recentTransactionsData || {
                results: [],
                count: 0,
                links: { next: null, previous: null },
                total_pages: 0,
              }
            }
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
