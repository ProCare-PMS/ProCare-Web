import React from "react";
import CategoryProducts from "../_categoryProducts/CategoryProducts";

const InventoryCategories = () => {
  return (
    <div>
      {/* Category Top Bar */}
      <div className="flex items-center gap-9">
        <div className="border w-[250px] flex gap-5 items-center border-[#D0D5DD] py-3 px-5 rounded-[8px]">
          <h2>Logo</h2>
          <div className="grid">
            <span className="font-inter text-[#848199] font-medium text-xs text-left">
              No Of Categories
            </span>
            <span className="font-bold font-inter text-lg">68</span>
          </div>
        </div>

        <div className="border w-[250px] flex gap-5 items-center border-[#D0D5DD] py-3 px-5 rounded-[8px]">
          <h2>Logo</h2>
          <div className="grid text-right">
            <span className="font-inter text-[#848199] font-medium text-xs text-left">
              Top Category
            </span>
            <span className="font-bold font-inter text-lg">Anti-malarials</span>
          </div>
        </div>
      </div>

      <hr className="my-12 text-[#DEDEE0]" />
      <CategoryProducts />
    </div>
  );
};

export default InventoryCategories;
