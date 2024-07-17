import React from "react";
import Image from "next/image";

const expiryStats = [
  {
    title: "EXPIRED",
    icon: "/assets/images/expiredstats.png",
    count: "40",
  },
  {
    title: "< 3 MONTHS",
    icon: "/assets/images/3monthstats.png",
    count: "98",
  },
  {
    title: "3 - 6 MONTHS",
    icon: "/assets/images/3months.png",
    count: "68",
  },
  {
    title: "6+ MONTHS",
    icon: "/assets/images/6plusmonths.png",
    count: "88",
  },
];

const ExpiryReportStats = () => {
  return (
    <div className="flex items-center justify-between">
      {expiryStats.map((stat) => (
        <div
          key={stat.title}
          className="flex border w-[220px] border-[#D0D5DD] rounded-[8px] py-4 px-5 items-center justify-between"
        >
          <Image src={stat.icon} width={50} height={50} alt={stat.title} />

          <div className="grid text-right">
            <h2 className="text-[#848199] font-inter font-medium text-xs">
              {stat.title}
            </h2>
            <div className="text-[#344054] text-2xl">
              {stat.count === "0" ? "-" : stat.count}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpiryReportStats;
