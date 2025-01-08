import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";

const ReturnsFilters = () => {
  return (
    <div className="bg-white absolute top-12 py-8 px-6 w-[353px] shadow-md hover:shadow-lg right-4 z-20 rounded-[8px]">
      <h3 className="font-semibold font-inter mb-4 text-[#344054] text-sm">
        Filter
      </h3>
      <hr className="text-[#F0F0F0]" />
      <div className="flex flex-col items-center">
        {/* Return Date */}
        <div className="flex flex-col my-4 w-full">
          <Label
            htmlFor="date"
            className="pb-2 text-sm font-normal text-[#323539] font-inter"
          >
            Return Date
          </Label>
          <input
            type="date"
            name="date"
            id="date"
            className="border focus:outline-none font-inter font-normal text-sm text-[#858C95] border-[#E5E5E7] rounded py-3 px-2"
            placeholder="Select Date"
          />
        </div>

        {/* Payment Method */}
        <div className="flex flex-col w-full">
          <Label
            htmlFor="payment_method"
            className="pb-2 text-sm font-normal text-[#323539] font-inter"
          >
            Payment Method
          </Label>
          <select
            name="payment_method"
            id="payment_method"
            className="border focus:outline-none font-inter font-normal text-sm text-[#858C95] border-[#E5E5E7] rounded py-3 px-2"
          >
            <option value="select payment method">Select payment method</option>
            <option value="bank">Bank</option>
            <option value="cash">Cash</option>
            <option value="momo">Momo</option>
          </select>
        </div>

        <hr className="my-4 border border-[#F0F0F0]" />
      </div>

      <div className="flex items-center justify-between">
        <Button className="border font-inter font-semibold w-[86px] text-[#5C5D65] text-base border-[#B6B7BB] rounded">
          Reset
        </Button>
        <Button
          className="text-white rounded font-inter w-[86px]"
          variant="secondary"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default ReturnsFilters;
