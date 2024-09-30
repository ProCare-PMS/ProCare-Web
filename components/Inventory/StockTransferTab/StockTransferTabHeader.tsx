import React from "react";
import { CiSearch } from "react-icons/ci";

const StockTransferTabHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-[#202224] font-semibold text-2xl">
        Other Pharmacies
      </h2>

      <div className="flex items-center gap-3">
        <div className="flex flex-row border-2 border-[#EAEBF0] rounded-xl items-center flex-1 gap-2 bg-transparent p-1">
          <CiSearch size={16} />
          <input
            type="search"
            name="search"
            placeholder="Search using pharmacy ID/name"
            id=""
            className="text-sm p-1 w-[260px] focus:outline-none bg-transparent"
          />
        </div>

        <div className="flex items-center gap-4 border-2 border-[#D0D5DD] rounded-[8px] py-1 px-3">
          <span className="font-semibold text-base text-[#6B6C74] font-inter">
            View requests
          </span>
        </div>

        <div className="flex items-center gap-4 border-2 border-[#D0D5DD] rounded-[8px] py-1 px-3">
          <span className="font-semibold text-base text-[#6B6C74] font-inter">
            View history
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockTransferTabHeader;
