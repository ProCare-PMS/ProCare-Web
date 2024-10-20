import React from "react";

const PurchaseDetails = () => {
  return (
    <div>
      <h2 className="text-[#202224] font-bold text-base font-inter">
        Purchase Details
      </h2>
      <div className="grid gap-y-2 mt-3">
        <label
          htmlFor=""
          className="text-[#323539] font-inter font-medium text-sm"
        >
          Select Supplier
        </label>
        <input
          type="number"
          name="hieght"
          placeholder="Enter height"
          id=""
          className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] w-[400px] text-[#858C95] text-sm font-normal"
        />
      </div>
    </div>
  );
};

export default PurchaseDetails;
