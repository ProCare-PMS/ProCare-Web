import { DashboardStatsResponse } from "@/Types";
import Image from "next/image";
import React from "react";

interface ProductsTabStatsProps {
  // Add any additional props if needed
  dashboardData: DashboardStatsResponse;
}

const ProductsTabStats = ({ dashboardData }: ProductsTabStatsProps) => {
  const statsCounts = [
    {
      icon: "/assets/images/stock.png",
      title: "STOCK COUNT",
      count:
        dashboardData?.items_in_stock === 0
          ? "-"
          : dashboardData?.items_in_stock,
    },
    {
      icon: "/assets/images/categorystats.png",
      title: "CATEGORIES",
      count:
        dashboardData?.top_categories.length === 0
          ? "-"
          : dashboardData?.top_categories.length,
    },
    {
      icon: "/assets/images/supplierstats.png",
      title: "SUPPLIERS",
      count:
        dashboardData?.total_suppliers === 0
          ? "-"
          : dashboardData?.total_suppliers,
    },
    {
      icon: "/assets/images/stockstats.png",
      title: "LOW STOCK",
      count:
        dashboardData?.low_stock_products === 0
          ? "-"
          : dashboardData?.low_stock_products,
    },
    {
      icon: "/assets/images/expirystats.png",
      title: "EXPIRY",
      count:
        dashboardData?.expiring_soon_products === 0
          ? "-"
          : dashboardData?.expiring_soon_products,
    },
  ];

  return (
    <div className="flex items-center lg:gap-4 justify-between">
      {statsCounts.map((statItem: any, index: number) => (
        <div key={index}>
          <div className=" flex items-center py-4 w-[230px] px-2 rounded-[8px] justify-between border border-[#D0D5DD]">
            <Image src={statItem.icon} alt="stock svg" width={35} height={35} />
            <div className="flex flex-col text-right mr-4">
              <span className="font-inter text-xs w-[150px] text-nowrap font-medium text-[#848199]">
                {statItem.title}
              </span>
              <span className="text-[#344054] text-right font-inter font-bold text-2xl">
                {statItem.count}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsTabStats;
