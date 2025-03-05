import React from "react";
import Image from "next/image";

interface StockTransferProps {
  isLoading: boolean;
  data: any
}

const StockTransferStats = ({ isLoading }: StockTransferProps) => {
  const stockTransfer = [
    {
      icon: "/icons/total_transfers_icon.svg",
      title: "TOTAL TRANSFERS",
      count: "-",
      bgColor: "#F4F7FE"
    },
    {
      icon: "/icons/total_requests_icon.svg",
      title: "TOTAL REQUESTS",
      count: "-",
      bgColor: "#F4F7FE"
    }, 
    {
      icon: "/icons/approved_requests_icon.svg",
      title: "APPROVED REQUESTS",
      count: "-",
      bgColor: "#F3FFF6"
    },
    {
      icon: "/icons/rejected.svg",
      title: "REJECTED REQUESTS",
      count: "-",
      bgColor: "#FFEFEE"
    },
    {
      icon: "/icons/pending_requests_icon.svg",
      title: "PENDING REQUESTS",
      count: "-",
      bgColor: "#FFFAF2"
    },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stockTransfer.map((statItem: any, index: number) => (
        <div key={index}>
          <div
            className={`flex items-center py-4 w-full md:w-[230px] px-2 rounded-[8px] justify-between border border-[#D0D5DD] ${
              isLoading ? "animate-pulse bg-gray-100" : ""
            }`}
          >
            {isLoading ? (
              <div className="w-[35px] h-[35px] bg-gray-200 rounded-full" />
            ) : (
              <div className="rounded-full p-2 flex items-center justify-center w-10 h-10" style={{ backgroundColor: `${statItem.bgColor}` }}>
              <Image
                src={statItem.icon}
                alt="stock svg"
                width={20}
                height={20}
              />
              </div>
            )}
            <div className="flex flex-col text-right mr-4">
              <span
                className={`font-inter text-xs w-[150px] text-nowrap font-medium ${
                  isLoading
                    ? "bg-gray-200 rounded h-4 w-20 ml-auto"
                    : "text-[#848199]"
                }`}
              >
                {!isLoading && statItem.title}
              </span>
              <span
                className={`text-[#2B3674] text-right font-inter font-bold text-2xl ${
                  isLoading ? "bg-gray-200 rounded h-8 w-16 mt-2 ml-auto" : ""
                }`}
              >
                {!isLoading && statItem.count}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockTransferStats;
