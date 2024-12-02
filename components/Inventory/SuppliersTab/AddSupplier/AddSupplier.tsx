import React from "react";
import { MoveLeft } from "lucide-react";

interface AddSupplierProps {
  onClose: () => void;
}

const AddSupplier = ({ onClose }: AddSupplierProps) => {
  return (
    <div className="bg-white shadow-custom py-4 px-8 mb-12 rounded-[8px] mt-8 grid gap-y-5 ">
      <div className="flex items-center gap-4 mb-4">
        <MoveLeft onClick={onClose} className="cursor-pointer" />
        <h3 className="font-bold text-2xl font-inter">Add Supplier</h3>
      </div>
      <hr />
      <h3 className="text-[#202224] font-inter font-bold text-base">
        SUPPLIER DETAILS
      </h3>

      <form action="">
        <div className="grid grid-cols-3 gap-4">
          {/* Supplier Name */}
          <div className="grid gap-y-2">
            <label
              htmlFor=""
              className="text-[#323539] font-inter font-medium text-sm"
            >
              Supplier Name
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
            />
          </div>
          {/* Phone Number */}
          <div className="grid gap-y-2">
            <label
              htmlFor=""
              className="text-[#323539] font-inter font-medium text-sm"
            >
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Enter phone number"
              className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
            />
          </div>
          {/* Email */}
          <div className="grid gap-y-2">
            <label
              htmlFor=""
              className="text-[#323539] font-inter font-medium text-sm"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
            />
          </div>
        </div>
        {/* Quantity Form */}
        <div className="grid gap-y-2 mt-6">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Quantity
          </label>
          <input
            type="number"
            placeholder="Enter quantity"
            className="rounded-[4px] w-[33%] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>

        <div className="mt-8 flex items-center justify-end">
          <button
            type="submit"
            className="bg-[#2648EA] rounded-[4px] py-2 px-8 text-white font-inter font-semibold text-sm"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplier;
