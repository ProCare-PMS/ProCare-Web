import React from "react";

const StockTransferTopForm = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="grid gap-y-2">
        <label htmlFor="" className="text-[#323539] font-medium text-sm">
          Select Product
        </label>
        <select
          name="providers"
          id=""
          className="border w-full border-[#E6E6E6] text-[#858C95] font-normal text-sm outline-none shadow-sm rounded-[6px] py-1 px-3"
        >
          <option value="Select Network Provider">Select Product</option>
        </select>
      </div>

      {/*Quanity*/}
      <div className="grid">
        <label htmlFor="" className="text-[#323539] font-medium text-sm">Quantity</label>
        <input
          type="number"
          className="bg-white border border-[#E5E5E7] rounded text-[#858C95] font-normal text-sm font-inter py-1 px-3"
          name=""
          placeholder="Enter quantity"
          id=""
        />
      </div>

      {/* Unit Price */}
      <div className="grid">
        <label htmlFor="" className="text-[#323539] font-medium text-sm">Unit Price(GHS)</label>
        <input
          type="number"
          name=""
          disabled
          value="200"
          className="bg-white border border-[#E5E5E7] rounded text-[#858C95] font-normal text-sm font-inter py-1 px-3"
          id=""
        />
      </div>
    </div>
  );
};

export default StockTransferTopForm;
