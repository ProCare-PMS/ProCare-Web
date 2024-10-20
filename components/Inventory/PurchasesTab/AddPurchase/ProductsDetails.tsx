import React from "react";

const ProductsDetails = () => {
  return (
    <div>
      <h2 className="text-[#202224] font-bold text-base font-inter">
        Products Details
      </h2>
      <div className="grid grid-cols-3 gap-5">
        {/* Full Name */}
        <div className="grid gap-y-2 mt-3">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Select Product
          </label>
          <input
            type="number"
            name="hieght"
            placeholder="Enter height"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Weight */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Quantity
          </label>
          <input
            type="number"
            name="weight"
            placeholder="Enter weight"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Blood Type */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Unit Price(GHS)
          </label>
          <input
            type="text"
            name="blood type"
            placeholder="Enter Blood type"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="grid">
          <h3 className="font-inter text-[#858C95] font-normal text-sm">
            TOTAL AMOUNT(GHS)
          </h3>
          <span className="font-bold text-xl mt-2 font-inter text-[#202224]">
            GHS 17,399
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="border border-[#323539] flex-1 rounded-[4px] py-2 px-8 text-[#323539] font-inter font-semibold text-sm">
            Add Product
          </button>
          <button className="bg-[#2648EA] rounded-[4px] flex-1 py-2 px-8 text-white font-inter font-semibold text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
