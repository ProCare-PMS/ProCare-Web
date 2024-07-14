import React from "react";
import DataTable from "@/components/Tables/data-table";

function LowStockIndex() {
  return (
    <>
      <div className="container-fluid">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <span className="block"></span> <h4>Low Stock List</h4>
          </div>
          <div>
            <div>
              <input
                type="text"
                className="w-full bg-[#F9FAFB] border border-[#E4E7EC] py-3 rounded-3xl px-5 text-xs font-medium text-[#B0B3B8] outline-0"
                placeholder="Search for product"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LowStockIndex;
