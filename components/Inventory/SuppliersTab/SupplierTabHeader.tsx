import React from "react";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Plus, SlidersVertical } from "lucide-react";

const SupplierTabHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-[#202224] font-semibold text-2xl">Suppliers</h2>

      <div className="flex items-center gap-3">
        <div className="flex flex-row border-2 border-[#EAEBF0] rounded-xl items-center flex-1 gap-2 bg-transparent p-1">
          <CiSearch size={16} />
          <input
            type="search"
            name="search"
            placeholder="Search for product"
            id=""
            className="text-sm p-1 w-full focus:outline-none bg-transparent"
          />
        </div>

        <Button
          type="button"
          className="text-white relative flex items-center gap-2 rounded-[12px] font-inter w-[149px]"
          variant="secondary"
        >
          <Plus />
          Add Supplier
        </Button>

        <div className="border p-2  cursor-pointer border-main rounded-[12px]">
          <SlidersVertical className="text-main" />
        </div>
      </div>
    </div>
  );
};

export default SupplierTabHeader;
