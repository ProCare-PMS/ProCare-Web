import Image from "next/image";
import React from "react";

const ExpiryStatsCards = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        {/*Expired Stats Card */}
        <div className="flex border w-[220px] border-[#D0D5DD] rounded-[8px] py-4 px-5 items-center justify-between">
          <Image
            src="/assets/images/expiredstats.png"
            width={50}
            height={50}
            alt="Expired cards"
          />

          <div className="grid text-right">
            <h2 className="text-[#848199] font-inter font-medium text-xs">
              EXPIRED
            </h2>
            <span className="text-[#344054] text-2xl">-</span>
          </div>
        </div>

        {/*Three Months Stats Card */}
        <div className="flex w-[220px] items-center justify-between border border-[#D0D5DD] rounded-[8px] py-4 px-5">
          <Image
            src="/assets/images/3monthstats.png"
            width={50}
            height={50}
            alt="Expired cards"
          />

          <div className="grid text-right">
            <h2 className="text-[#848199] font-inter font-medium text-xs">
              {" "}
              3 MONTHS
            </h2>
            <span>-</span>
          </div>
        </div>

        {/*Three to Six Months Stats Card */}
        <div className="flex w-[220px] items-center justify-between border border-[#D0D5DD] rounded-[8px] py-4 px-5">
          <Image
            src="/assets/images/3months.png"
            width={50}
            height={50}
            alt="Expired cards"
          />

          <div className="grid text-right">
            <h2 className="text-[#848199] font-inter font-medium text-xs">
              3 - 6 MONTHS
            </h2>
            <span>-</span>
          </div>
        </div>

        {/* Six Plus Months Stats Card */}
        <div className="flex w-[220px] items-center justify-between border border-[#D0D5DD] rounded-[8px] py-4 px-5">
          <Image
            src="/assets/images/6plusmonths.png"
            width={50}
            height={50}
            alt="Expired cards"
          />

          <div className="grid text-right">
            <h2 className="text-[#848199] font-inter font-medium text-xs">
              6+ MONTHS
            </h2>
            <span>-</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiryStatsCards;
