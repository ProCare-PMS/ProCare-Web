"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

interface FilterState {
  unit: string;
  category: string;
  reorderLevel: string;
  expiryDate: string;
  status: string;
}

interface FilterDropdownProps {
  onFilterChange: (filters: FilterState) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    unit: "",
    category: "",
    reorderLevel: "",
    expiryDate: "",
    status: "",
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      customAxios
        .get(endpoints.inventoryCategories)
        .then((res) => res?.data?.results),
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      unit: "",
      category: "",
      reorderLevel: "",
      expiryDate: "",
      status: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white absolute top-6 py-8 px-6 w-[300px] shadow-md hover:shadow-lg right-4 z-20 rounded-[8px]">
      <h3 className="font-semibold font-inter mb-4 text-[#344054] text-sm">Filter</h3>
      <hr className="text-[#F0F0F0]" />
      <form onSubmit={handleApply}>
        <div className="flex flex-col items-center">
          <div className="flex flex-col my-4 w-full">
            <Label htmlFor="unit" className="pb-2 text-sm font-normal text-[#323539] font-inter">
              Unit
            </Label>
            <select
              name="unit"
              value={filters.unit}
              onChange={handleFilterChange}
              className="border focus:outline-none font-inter font-normal text-sm text-[#858C95] border-[#E5E5E7] rounded py-3 px-2"
            >
              <option value="">Select unit</option>
              <option value="Pack">Pack</option>
              <option value="Strip">Strip</option>
              <option value="Tablet">Tablet</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <Label htmlFor="category" className="pb-2 text-sm font-normal text-[#323539] font-inter">
              Category
            </Label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="border focus:outline-none font-inter font-normal text-sm text-[#858C95] border-[#E5E5E7] rounded py-3 px-2"
            >
              <option value="">Select Category</option>
              {categories?.map((category: any) => (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full my-4">
            <Label htmlFor="status" className="pb-2 text-sm font-normal text-[#323539] font-inter">
              Status
            </Label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border focus:outline-none font-inter font-normal text-sm text-[#858C95] border-[#E5E5E7] rounded py-3 px-2"
            >
              <option value="">Select status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <Label htmlFor="expiryDate" className="pb-2 text-sm font-normal text-[#323539] font-inter">
              Expiry Date
            </Label>
            <input
              type="date"
              name="expiryDate"
              value={filters.expiryDate}
              onChange={handleFilterChange}
              className="border focus:outline-none font-inter font-normal text-sm text-[#858C95] border-[#E5E5E7] rounded py-3 px-2"
            />
          </div>
        </div>

        <hr className="my-4 border border-[#F0F0F0]" />

        <div className="flex items-center justify-between">
          <Button
            type="button"
            onClick={handleReset}
            className="border font-inter font-semibold w-[95px] text-[#5C5D65] text-base border-[#B6B7BB] rounded"
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="text-white rounded font-inter w-[95px]"
            variant="secondary"
          >
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterDropdown;