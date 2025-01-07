"use client";
import React from "react";
import { DashboardStatsResponse } from "@/Types";
import DashboardStatsCard from "./DashboardStatsCard";

interface DashboardStatsProps {
  dashboardData: DashboardStatsResponse;
}

const DashboardStats = ({ dashboardData }: DashboardStatsProps) => {
  const [showDetails, setShowDetails] = React.useState<number | null>(null);

  const handleShowDetails = (index: number) => {
    //console.log("kkk", index, showDetails);

    setShowDetails((prevIndex) => (prevIndex === index ? null : index));
  };
  console.log(dashboardData);

  const stats = [
    {
      title: "Daily Sales",
      value:
        dashboardData?.daily_sales === "0.00"
          ? "₵ -"
          : `₵${dashboardData?.daily_sales}`,
      subtitle: "monthly growth",
      imageSrc:
        dashboardData?.daily_sales === "0.00"
          ? "/icons/dailysalesline.png"
          : "/icons/ItemsSold.png",
      link: "inventory/daily-sales",
      badgeText: dashboardData?.daily_items_sold === 0 ? "-" : "Personal",
      badgeColor: "bg-[#ECF4FC] text-[#0A77FF]",
    },
    {
      title: "Items Sold",
      value:
        dashboardData?.daily_items_sold === 0
          ? "- items"
          : `${dashboardData?.daily_items_sold} items`,
      subtitle: "",
      imageSrc:
        dashboardData?.daily_items_sold === 0
          ? "/icons/itemssoldline.png"
          : "/icons/Line.png",
      link: "inventory/item-sold",
      badgeText: dashboardData?.daily_sales === "0.00" ? "-" : "Decline",
      badgeColor: "bg-[#FFEFEE] text-[#C8322B]",
    },
    {
      title: "Profit Made",
      value:
        dashboardData?.daily_profit === "0.00"
          ? "₵ -"
          : `₵${dashboardData?.daily_profit}`,
      subtitle: "in profit",
      imageSrc:
        dashboardData?.daily_profit === "0.00"
          ? "/icons/profitmadeline.png"
          : "/icons/Graphics.png",
      link: "inventory/profit-made",
      badgeText: dashboardData?.daily_profit === "0.00" ? "-" : "Rise",
      badgeColor: "bg-[#F3FFF6] text-[#2AA63C]",
    },
    {
      title: "Items In Stock",
      value:
        dashboardData?.items_in_stock === 0
          ? "-"
          : `${dashboardData?.items_in_stock}`,
      subtitle: "monthly restock",
      imageSrc:
        dashboardData?.items_in_stock === 0
          ? "/icons/dailysalesline.png"
          : "/icons/ItemsSold.png",
      link: "inventory/items-in-stock",
      badgeText: dashboardData?.items_in_stock === 0 ? "-" : "+20",
      badgeColor: "bg-[#ECF4FC] text-[#0A77FF]",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center font-inter justify-between gap-3  py-2">
      {stats.map((stat, index) => (
        <DashboardStatsCard
          key={index}
          {...stat}
          buttonIndex={index}
          showDetails={showDetails}
          onToggleDetails={handleShowDetails}
        />
      ))}
      {/* 
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col shadow-custom rounded-xl px-5 py-4 bg-white w-[18rem] relative"
        >
          <div className="flex items-center mb-4 justify-between">
            <h3 className="font-medium text-[#202224] text-xl font-inter">
              {item.title}
            </h3>
            <div className="dotHolder">
              <span className="text-2xl font-inter text-[#858C95]">
                <button onClick={() => handleShowDetails(index)} className="">
                  <span>...</span>
                </button>
              </span>
              {showDetails === index && (
                <div className="detailsCard bg-white text-black text-sm absolute top-12 right-5 px-6 py-2 rounded-[0.4rem] shadow-2xl">
                  <Link href={item.links} key={index}>
                    View Details
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div>
              <h3 className="text-2xl font-inter mb-4 font-semibold">
                {item.amount || item.itemAmount}
              </h3>
              <div className="flex items-center gap-2 text-[#858C95]  text-xs">
                <span
                  className="font-inter rounded-[7rem] text-xs font-medium px-3 py-1"
                  style={{
                    backgroundColor: item.growth.background,
                    color: item.growth.color,
                  }}
                >
                  {item.growth.mainLabel}
                </span>
                {item.growth.label}
              </div>
            </div>
            <div className="pt-4">
              <Image width={60} height={60} src={item.icon} alt={item?.alt} />
            </div>
          </div>
        </div>
      ))}
        */}
    </div>
  );
};

export default DashboardStats;
