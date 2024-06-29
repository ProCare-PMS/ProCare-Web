import Image from "next/image";
import React from "react";

const statsCounts = [
  {
    icon: "/assets/images/stock.png",
    title: "STOCK COUNT",
    count: "312",
  },
  {
    icon: "/assets/images/categorystats.png",
    title: "CATEGORIES",
    count: "40",
  },
  {
    icon: "/assets/images/supplierstats.png",
    title: "SUPPLIERS",
    count: "68",
  },
  {
    icon: "/assets/images/stockstats.png",
    title: "LOW STOCK",
    count: "27",
  },
  {
    icon: "/assets/images/expirystats.png",
    title: "EXPIRY",
    count: "5",
  },
];

const ProductsStatsCards = () => {
  return (
    <div className="flex items-center lg:gap-8 justify-between">
      {statsCounts.map((statItem) => (
        <div
          key={statItem.title}
          className=" flex items-center gap-14 py-4 px-5 rounded-[8px] justify-between border border-[#D0D5DD]"
        >
          <Image src={statItem.icon} alt="stock svg" width={25} height={25} />
          <div className="flex flex-col">
            <span className="font-inter text-xs font-medium text-[#848199]">
              {statItem.title}
            </span>
            <span className="text-[#344054] text-right font-inter font-bold text-2xl">
              {statItem.count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsStatsCards;
