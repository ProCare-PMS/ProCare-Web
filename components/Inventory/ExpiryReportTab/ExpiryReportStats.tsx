import React from "react";
import Image from "next/image";
import { ProductsType } from "@/components/Tables/products-tab-columns";
import { differenceInMonths } from "date-fns";

interface ExpiredProduct {
  created_at: string;
  id: string;
  modified_at: string;
  pharmacy: string;
  expiry_date: string;
  product: ProductsType;
  quantity: number;
}

interface ExpiryReportStatsProps {
  isLoading: boolean;
  expiredProduct: ExpiredProduct[];
}

const ExpiryReportStats = ({ isLoading, expiredProduct }: ExpiryReportStatsProps) => {
  const currentDate = new Date(); // ✅ 

  let expiredCount = 0;
  let lessThan3Months = 0;
  let between3And6Months = 0;
  let moreThan6Months = 0;

  expiredProduct?.forEach((product: ExpiredProduct) => {
    const expiryDate = new Date(product.expiry_date);
    const monthsDifference = differenceInMonths(expiryDate, currentDate);

    if (expiryDate < currentDate) {
      expiredCount++;
    } else if (monthsDifference < 3) {
      lessThan3Months++;
    } else if (monthsDifference >= 3 && monthsDifference < 6) {
      between3And6Months++;
    } else {
      moreThan6Months++;
    }
  });

  // ✅ Dynamic stats
  const expiryStats = [
    { title: "EXPIRED", icon: "/assets/images/expiredstats.png", count: expiredCount },
    { title: "< 3 MONTHS", icon: "/assets/images/3monthstats.png", count: lessThan3Months },
    { title: "3 - 6 MONTHS", icon: "/assets/images/3months.png", count: between3And6Months },
    { title: "6+ MONTHS", icon: "/assets/images/6plusmonths.png", count: moreThan6Months },
  ];

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {expiryStats.map((stat) => (
        <div
          key={stat.title}
          className={`flex border w-[290px] border-[#D0D5DD] rounded-[8px] py-4 px-5 items-center justify-between ${
            isLoading ? "animate-pulse bg-gray-100" : ""
          }`}
        >
          {isLoading ? (
            <div className="w-[50px] h-[50px] bg-gray-200 rounded-full" />
          ) : (
            <Image src={stat.icon} width={50} height={50} alt={stat.title} />
          )}

          <div className="grid text-right">
            <h2
              className={`font-inter font-medium text-xs ${
                isLoading ? "bg-gray-200 rounded h-4 w-24 ml-auto" : "text-[#848199]"
              }`}
            >
              {!isLoading && stat.title}
            </h2>
            <div
              className={`text-2xl ${
                isLoading
                  ? "bg-gray-200 rounded h-8 w-16 mt-2 ml-auto"
                  : "text-[#344054] font-bold"
              }`}
            >
              {!isLoading && (stat.count === 0 ? "-" : stat.count)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpiryReportStats;
