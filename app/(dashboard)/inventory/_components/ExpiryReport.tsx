import React from "react";
import ExpiryStatsCards from "../_expiryReportsComponents/ExpiryStatsCards";
import EmptyState from "../_purchasesComponents/EmptyState";
import { Search, SlidersVertical } from "lucide-react";

const productsItems = [
  
];
const ExpiryReport = () => {
  return (
    <div>
      {/* Statistics Cards */}
      <ExpiryStatsCards />

      {/* Empty State */}
      {productsItems.length === 0 && <EmptyState />}

      {/* Filled State */}
      {productsItems.length > 0 && (
        <div className="bg-white p-8 rounded-[8px] mt-9">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-2xl font-inter text-[#202224]">
              Expiry Report
            </h2>
            {/* Search Inputs */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white gap-4 rounded-[12px] border border-[#EAEBF0] py-3 px-6">
                <Search width={16} className="text-[#637381]" />
                <input
                  type="search"
                  name="search"
                  placeholder="Search for product"
                  id="search"
                  className="font-inter focus:outline-none text-base font-normal text-[#637381]"
                />
              </div>
              <div className="border border-[#EAEBF0] rounded-[12px] p-3">
                <SlidersVertical className="text-main" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpiryReport;
