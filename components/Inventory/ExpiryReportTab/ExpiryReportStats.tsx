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

interface ExpiryReportStatsProps {
  isLoading: boolean;
}

const ExpiryReportStats = ({ isLoading }: ExpiryReportStatsProps) => {
  return (
    <div className="flex items-center justify-between">
      {expiryStats.map((stat) => (
        <div
          key={stat.title}
          className={`flex border w-[290px] border-[#D0D5DD] rounded-[8px] py-4 px-5 items-center justify-between ${
            isLoading ? 'animate-pulse bg-gray-100' : ''
          }`}
        >
          {isLoading ? (
            <div className="w-[50px] h-[50px] bg-gray-200 rounded-full" />
          ) : (
            <Image src={stat.icon} width={50} height={50} alt={stat.title} />
          )}

          <div className="grid text-right">
            <h2 className={`font-inter font-medium text-xs ${
              isLoading ? 'bg-gray-200 rounded h-4 w-24 ml-auto' : 'text-[#848199]'
            }`}>
              {!isLoading && stat.title}
            </h2>
            <div className={`text-2xl ${
              isLoading ? 'bg-gray-200 rounded h-8 w-16 mt-2 ml-auto' : 'text-[#344054]'
            }`}>
              {!isLoading && (stat.count === "0" ? "-" : stat.count)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpiryReportStats;