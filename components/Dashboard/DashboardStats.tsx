"use client";
import React from "react";
import { DashboardStatsResponse } from "@/Types";
import DashboardStatsCard from "./DashboardStatsCard";

interface DashboardStatsProps {
  dashboardData?: DashboardStatsResponse;
  isLoading?: boolean;
}

const DashboardStats = ({ dashboardData, isLoading }: DashboardStatsProps) => {
  const [showDetails, setShowDetails] = React.useState<number | null>(null);

  const handleShowDetails = (index: number) => {
    setShowDetails((prevIndex) => (prevIndex === index ? null : index));
  };

  const stats = [
    {
      title: "Daily Sales",
      value: dashboardData?.daily_sales === "0.00" ? "₵ -" : `₵${dashboardData?.daily_sales}`,
      subtitle: "monthly growth",
      imageSrc: dashboardData?.daily_sales === "0.00" ? "/icons/dailysalesline.png" : "/icons/ItemsSold.png",
      link: "inventory/daily-sales",
      badgeText: dashboardData?.daily_items_sold === 0 ? "-" : "Personal",
      badgeColor: "bg-[#ECF4FC] text-[#0A77FF]",
    },
    {
      title: "Items Sold",
      value: dashboardData?.daily_items_sold === 0 ? "- items" : `${dashboardData?.daily_items_sold} items`,
      subtitle: "",
      imageSrc: dashboardData?.daily_items_sold === 0 ? "/icons/itemssoldline.png" : "/icons/Line.png",
      link: "inventory/item-sold",
      badgeText: dashboardData?.daily_sales === "0.00" ? "-" : "Decline",
      badgeColor: "bg-[#FFEFEE] text-[#C8322B]",
    },
    {
      title: "Profit Made",
      value: dashboardData?.daily_profit === "0.00" ? "₵ -" : `₵${dashboardData?.daily_profit}`,
      subtitle: "in profit",
      imageSrc: dashboardData?.daily_profit === "0.00" ? "/icons/profitmadeline.png" : "/icons/Graphics.png",
      link: "inventory/profit-made",
      badgeText: dashboardData?.daily_profit === "0.00" ? "-" : "Rise",
      badgeColor: "bg-[#F3FFF6] text-[#2AA63C]",
    },
    {
      title: "Items In Stock",
      value: dashboardData?.items_in_stock === 0 ? "-" : `${dashboardData?.items_in_stock}`,
      subtitle: "monthly restock",
      imageSrc: dashboardData?.items_in_stock === 0 ? "/icons/dailysalesline.png" : "/icons/ItemsSold.png",
      link: "inventory/items-in-stock",
      badgeText: dashboardData?.items_in_stock === 0 ? "-" : "+20",
      badgeColor: "bg-[#ECF4FC] text-[#0A77FF]",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row items-center font-inter justify-between gap-3 py-2">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="flex flex-col shadow-custom rounded-xl px-5 py-4 bg-white w-full md:w-[18rem] relative animate-pulse"
          >
            <div className="flex items-center mb-4 justify-between">
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="flex items-center gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="h-16 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center font-inter justify-between gap-3 py-2">
      {stats.map((stat, index) => (
        <DashboardStatsCard
          key={index}
          {...stat}
          buttonIndex={index}
          showDetails={showDetails}
          onToggleDetails={handleShowDetails}
        />
      ))}
    </div>
  );
};

export default DashboardStats;