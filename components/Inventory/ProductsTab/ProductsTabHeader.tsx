"use client";

import React, { useState, useRef } from "react";
import { Plus, SlidersVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import FilterDropdown from "@/components/DropDown/FilterDropDown";
//import SortDropdown from "./SortDropdown";
//import ActionDropdown from "./ActionDropdown";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SortOption } from "@/types/sortOption";
import { FilterState } from "@/types/filter";
import SortDropdown from "@/components/DropDown/SortDropDown";
import ActionDropdown from "./ActionDropDown";
//import { FilterState, SortOption } from "@/types/products";

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
    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
      <h2 className="text-[#202224] font-semibold text-2xl mb-4 md:mb-0">
        Products
      </h2>

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

        <ActionDropdown
          ref={actionMenuRef}
          isOpen={showActionMenu}
          onToggle={() => toggleDropdown('action')}
          onAddProduct={onAddProduct}
          onImportProducts={onImportProducts}
        />

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
  );
};

export default ProductsHeader;