import React from "react";
import Image from "next/image";
import { SuppliersResponse } from "@/Types";

interface SuppliersProps {
  stats: SuppliersResponse[];
  isLoading: boolean;
}

const SuppliersTabStats = ({ stats = [], isLoading }: SuppliersProps) => {
  // Total suppliers count
  const totalSuppliers = stats?.length || 0;

  const topSupplier = stats.length > 0
  ? stats.reduce((max, supplier) =>
      (supplier.total_purchase_quantity || 0) > (max.total_purchase_quantity || 0)
        ? supplier
        : max
    )
  : null;

const supplyDayCounts: Record<string, number> = {};

stats.forEach((supplier) => {
  if (supplier.last_purchase_date) {
    const dayOfWeek = new Date(supplier.last_purchase_date).toLocaleDateString("en-US", { weekday: "long" });
    supplyDayCounts[dayOfWeek] = (supplyDayCounts[dayOfWeek] || 0) + 1;
  }
});

const topSupplyDay = Object.keys(supplyDayCounts).reduce((a, b) =>
  supplyDayCounts[a] > supplyDayCounts[b] ? a : b
, "");

  const statsCounts = [
    {
      icon: "/assets/images/supplier1.png",
      title: "TOTAL SUPPLIERS",
      count: isLoading ? "-" : totalSuppliers,
    },
    {
      icon: "/assets/images/supplier2.png",
      title: "TOTAL SUPPLIES (QUANTITY)",
      count: isLoading ? "-" : totalSuppliesQuantity,
    },
    {
      icon: "/assets/images/supplier3.png",
      title: "TOP SUPPLIER",
      count: isLoading ? "-" : topSupplier?.name || "-",
    },
    {
      icon: "/assets/images/supplier4.png",
      title: "TOP SUPPLY DAY",
      count: isLoading ? "-" : topSupplyDay || "-",
    },
  ];

  return (
    <div className="flex items-center lg:gap-8 justify-between">
      {statsCounts.map((statItem) => (
        <div
          key={statItem.title}
          className={`flex items-center w-[20rem] gap-4 py-4 px-5 rounded-[8px] justify-between border border-[#D0D5DD] ${
            isLoading ? "animate-pulse bg-gray-100" : ""
          }`}
        >
          {isLoading ? (
            <div className="w-[35px] h-[35px] bg-gray-200 rounded-full" />
          ) : (
            <Image src={statItem.icon} alt="stock svg" width={35} height={35} />
          )}

          <div className="flex flex-col items-end text-right">
            <span
              className={`font-inter text-xs tracking-wide text-right inline-flex text-nowrap font-medium ${
                isLoading
                  ? "bg-gray-200 rounded h-4 w-32 ml-auto"
                  : "text-[#848199]"
              }`}
            >
              {!isLoading && statItem.title}
            </span>
            <span
              className={`text-right text-nowrap font-inter font-bold text-base ${
                isLoading
                  ? "bg-gray-200 rounded h-6 w-24 mt-2 ml-auto"
                  : "text-[#344054]"
              }`}
            >
              {!isLoading && statItem.count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuppliersTabStats;
