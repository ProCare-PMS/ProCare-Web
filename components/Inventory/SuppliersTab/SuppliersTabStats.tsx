import React from "react";
import Image from "next/image";

const statsCounts = [
  {
    icon: "/assets/images/supplier1.png",
    title: "TOTAL SUPPLIERS",
    count: "68",
  },
  {
    icon: "/assets/images/supplier2.png",
    title: "TOTAL SUPPLIERS(QUANTITY)",
    count: "312",
  },
  {
    icon: "/assets/images/supplier3.png",
    title: "TOP SUPPLIER",
    count: "The Med Pharma Limited",
  },
  {
    icon: "/assets/images/supplier4.png",
    title: "TOP SUPPLIER DAY",
    count: "Monday",
  },
];

const SuppliersTabStats = () => {
  return (
    <div className="flex items-center lg:gap-8 justify-between">
      {statsCounts.map((statItem) => (
        <div
          key={statItem.title}
          className="flex items-center w-[20rem] gap-4 py-4 px-5 rounded-[8px] justify-between border border-[#D0D5DD]"
        >
          <Image src={statItem.icon} alt="stock svg" width={35} height={35} />
          <div className="flex flex-col items-end text-right">
            <span className="font-inter text-xs tracking-wide text-right inline-flex text-nowrap font-medium text-[#848199]">
              {statItem.title}
            </span>
            <span className="text-[#344054] text-right text-nowrap font-inter font-bold text-base">
              {statItem.count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuppliersTabStats;
