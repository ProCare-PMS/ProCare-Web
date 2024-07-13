import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";
import { FaAngleDown } from "react-icons/fa6";

const FilterDropdown = () => {
  return (
    <div className="bg-white absolute top-12 py-8 px-6 w-[453px] shadow-md hover:shadow-lg right-4 z-20 rounded-[8px]">
      <h3 className="font-semibold font-inter mb-4 text-[#344054] text-sm">
        Filter
      </h3>
      <hr className="text-[#F0F0F0]" />
      <div className="flex flex-col items-center">
        {/* Unit Filter */}
        <div className="flex flex-col my-4 w-full">
          <Label
            htmlFor="unit"
            className="pb-2 text-sm font-normal text-[#323539] font-inter"
          >
            Unit
          </Label>
          <select
            name="cars"
            id="cars"
            className="border focus:outline-none font-inter font-normal text-sm text-[#858C95] border-[#E5E5E7] rounded py-3 px-2"
          >
            <option value="volvo">Select unit</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
            <FaAngleDown />
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col w-full">
          <Label
            htmlFor="unit"
            className="pb-2 text-sm font-normal text-[#323539] font-inter"
          >
            Category
          </Label>
          <select
            name="cars"
            id="cars"
            className="border focus:outline-none font-inter font-normal text-sm text-[#858C95] border-[#E5E5E7] rounded py-3 px-2"
          >
            <option value="volvo">Select unit</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>

        {/* Re-order level Filter */}
        <div className="flex flex-col w-full my-4">
          <Label
            htmlFor="unit"
            className="pb-2 text-sm font-normal text-[#323539] font-inter"
          >
            Re-order level
          </Label>
          <select
            name="cars"
            id="cars"
            className="border focus:outline-none font-inter font-normal text-sm text-[#858C95] border-[#E5E5E7] rounded py-3 px-2"
          >
            <option value="volvo">Select re-order level</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>

        {/* Expiry Date Filter */}
        <div className="flex flex-col w-full">
          <Label
            htmlFor="unit"
            className="pb-2 text-sm font-normal text-[#323539] font-inter"
          >
            Expiry Date
          </Label>
          <select
            name="cars"
            id="cars"
            className="border focus:outline-none font-inter font-normal text-sm text-[#858C95] border-[#E5E5E7] rounded py-3 px-2"
          >
            <option value="volvo">Select unit</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col w-full">
          <Label
            htmlFor="unit"
            className="pb-2 text-sm font-normal text-[#323539] font-inter"
          >
            Status
          </Label>
          <select
            name="cars"
            id="cars"
            className="border focus:outline-none font-inter font-normal text-sm text-[#858C95] border-[#E5E5E7] rounded py-3 px-2"
          >
            <option value="volvo">Select status</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>

        <hr className="my-4 border border-[#F0F0F0]" />
      </div>

      <div className="flex items-center justify-between">
        <Button className="border font-inter font-semibold w-[126px] text-[#5C5D65] text-base border-[#B6B7BB] rounded">
          Reset
        </Button>
        <Button
          className="text-white rounded font-inter w-[126px]"
          variant="secondary"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterDropdown;
