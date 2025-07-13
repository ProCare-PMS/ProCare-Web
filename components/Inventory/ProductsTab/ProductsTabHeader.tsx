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
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  searchValue,
  onSearchChange,
  sortOption,
  onSortChange,
  onFilterChange,
  onAddProduct,
  onImportProducts,
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showStock, setShowStock] = useState(false);
  const [toggleShow, setToggleShow] = useState<number>(1);

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
        <div className="bg-gray-100 flex gap-3 p-2 rounded-xl">
          <span
            className={`block cursor-pointer py-1 px-3 rounded-xl ${
              toggleShow === 1
                ? "bg-white border border-gray-300 shadow"
                : "hover:bg-gray-200 text-gray-400"
            }`}
            onClick={() => setToggleShow(1)}
          >
            Product
          </span>
          <span
            className={`block cursor-pointer py-1 px-3 rounded-xl ${
              toggleShow === 2
                ? "bg-white border border-gray-300 shadow"
                : "hover:bg-gray-200 text-gray-400"
            }`}
            onClick={() => setToggleShow(2)}
          >
            Stocks
          </span>
        </div>

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

          {toggleShow === 1 && (
            <ActionDropdown
              ref={actionMenuRef}
              isOpen={showActionMenu}
              onToggle={() => toggleDropdown('action')}
              onAddProduct={onAddProduct}
              onImportProducts={onImportProducts}
            />
          )}

          {toggleShow === 2 && (
            <Button
              type="button"
              className="text-white flex items-center gap-2 rounded-[12px] font-inter w-full md:w-[149px]"
              variant="secondary"
              onClick={() => setShowStock(true)}
            >
              <Plus /> Add Stock
            </Button>
          )}

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