"use client";

import React, { useState, useRef } from "react";
import { Plus, SlidersVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import FilterDropdown from "@/components/DropDown/FilterDropDown";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SortOption } from "@/types/sortOption";
import { FilterState } from "@/types/filter";
import SortDropdown from "@/components/DropDown/SortDropDown";
import ActionDropdown from "./ActionDropDown";
import StockTakingForm from "../ProductStock/StockTakingForm";

interface ProductsHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;  
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  onFilterChange: (filters: FilterState) => void;
  onAddProduct: () => void;
  onImportProducts: () => void;
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  searchValue,
  onSearchChange,
  sortOption,
  onSortChange,
  onFilterChange,
  onAddProduct,
  onImportProducts,
  activeTab,
  onTabChange,
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showStock, setShowStock] = useState(false);

  const actionMenuRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    [actionMenuRef, filterRef, sortRef],
    [
      () => setShowActionMenu(false),
      () => setShowFilters(false),
      () => setShowSortOptions(false),
    ]
  );

  const toggleDropdown = (dropdown: 'action' | 'filter' | 'sort') => {
    setShowActionMenu(dropdown === 'action');
    setShowFilters(dropdown === 'filter');
    setShowSortOptions(dropdown === 'sort');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        {/* Tab Switcher */}
        <div className="bg-[#F5F5F5] flex gap-3 p-2 rounded-[10px]">
          <span
            className={`block cursor-pointer py-1 w-[100px] text-center px-3 rounded-[8px] font-medium ${
              activeTab === 1
                ? "bg-white text-[#0B2B23] shadow-[0px_2.13px_5.32px_0px_#0A13091F] text-base border-gray-300"
                : "text-[#858C95] hover:bg-gray-200"
            }`}
            onClick={() => onTabChange(1)}
          >
            Product
          </span>
          <span
            className={`block cursor-pointer py-1 w-[100px] text-center px-3 rounded-[8px] font-medium ${
              activeTab === 2
                ? "bg-white text-[#0B2B23] shadow-[0px_2.13px_5.32px_0px_#0A13091F] text-base border-gray-300"
                : "text-[#858C95] hover:bg-gray-200"
            }`}
            onClick={() => onTabChange(2)}
          >
            Stocks
          </span>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="w-full sm:w-auto">
            <SearchFieldInput
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for product"
            />
          </div>

          <SortDropdown
            ref={sortRef}
            sortOption={sortOption}
            onSortChange={onSortChange}
            isOpen={showSortOptions}
            onToggle={() => toggleDropdown('sort')}
          />

          {/* Product Tab Actions */}
          {activeTab === 1 && (
            <ActionDropdown
              ref={actionMenuRef}
              isOpen={showActionMenu}
              onToggle={() => toggleDropdown('action')}
              onAddProduct={onAddProduct}
              onImportProducts={onImportProducts}
            />
          )}

          {/* Stock Tab Actions */}
          {activeTab === 2 && (
            <Button
              type="button"
              className="text-white flex items-center gap-2 rounded-[12px] font-inter w-full md:w-[149px]"
              variant="secondary"
              onClick={() => setShowStock(true)}
            >
              <Plus /> Add Stock
            </Button>
          )}

          {/* Filter Button */}
          <div className="relative" ref={filterRef}>
            <div
              className="border p-2 cursor-pointer border-[#494A50] rounded-[12px] hover:bg-gray-50 transition-colors"
              onClick={() => toggleDropdown('filter')}
            >
              <SlidersVertical className="text-[#494A50]" />
            </div>

            {showFilters && (
              <div className="absolute top-2 left-24 md:left-auto md:right-0 z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                <FilterDropdown onFilterChange={onFilterChange} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stock Taking Modal */}
      {showStock && (
        <StockTakingForm
          title="Add Stock Taking"
          setModal={() => setShowStock(false)}
        />
      )}
    </div>
  );
};

export default ProductsHeader;