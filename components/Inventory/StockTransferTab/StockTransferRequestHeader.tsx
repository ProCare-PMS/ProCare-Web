import React from "react";
import { Search } from 'lucide-react';

const StockTransferRequestsHeader = () => {
  return (
    <div className="flex items-center  justify-between mb-6">
      <h2 className="text-[#202224] font-semibold text-2xl">Requests</h2>

      <div className="flex flex-row border-2 w-[300px] border-[#EAEBF0] rounded-xl items-center  gap-2 bg-transparent p-1">
        <Search size={16} />
        <input
          type="search"
          name="search"
          placeholder="Search by transfer id"
          id=""
          className="text-sm p-1  focus:outline-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default StockTransferRequestsHeader;
