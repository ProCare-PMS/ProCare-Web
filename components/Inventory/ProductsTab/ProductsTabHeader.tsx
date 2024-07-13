"use client";
import React, { useState } from "react";
import ProductMiniTable from "./ProductMiniTable";
import ProductStockTable from "./ProductStockTable";
import { CiSearch } from "react-icons/ci";
import clsx from "clsx";
import { Plus, SlidersVertical } from "lucide-react";
import AddProducts from "@/app/(dashboard)/inventory/_components/AddProductsModal";
import ImportProductsModal from "@/app/(dashboard)/inventory/_importProductsComponents/ImportProductsModal";
import { Button } from "@/components/ui/button";
import FilterDropdown from "@/components/DropDown/FilterDropDown";

const ProductsTabHeader = () => {
  const [showTab, setShowTab] = useState(<ProductMiniTable />);
  const [activeTab, setActiveTab] = useState("Products");
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilter] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Tabs Section */}
        <div className="flex items-center bg-[#858C95]/50 gap-6 p-1 rounded-[10px]">
          <button
            onClick={() => {
              setShowTab(<ProductMiniTable />);
              setActiveTab("Products");
            }}
            className={clsx(
              "px-5 py-1 text-base font-medium transition",
              activeTab === "Products"
                ? "bg-white rounded-[8px] shadow-md text-[#0B2B23]"
                : "text-gray-50"
            )}
          >
            Products
          </button>
          <button
            onClick={() => {
              setShowTab(<ProductStockTable />);
              setActiveTab("Stocks");
            }}
            className={clsx(
              "px-5 py-1 text-base font-medium transition",
              activeTab === "Stocks"
                ? "bg-white rounded-[8px] shadow-md text-[#0B2B23]"
                : "text-gray-50"
            )}
          >
            Stocks
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex items-center gap-3">
          <div className="flex flex-row border-2 border-[#EAEBF0] rounded-xl items-center flex-1 gap-2 bg-transparent p-1">
            <CiSearch />
            <input
              type="search"
              name="search"
              placeholder="Search for product"
              id=""
              className="text-sm p-1 w-full focus:outline-none bg-transparent"
            />
          </div>

          <div className="relative">
            <Button
              type="button"
              className="text-white relative flex items-center gap-2 rounded-[12px] font-inter w-[149px]"
              variant="secondary"
              onClick={() => {
                setShowMenu(!showMenu);
                setShowFilter(false);
              }}
            >
              <Plus />
              Add Product
            </Button>
            {showMenu && (
              <div className="bg-white absolute top-12 shadow-md hover:shadow-lg left-0 z-20 rounded-[8px]">
                <ul>
                  <li>
                    <AddProducts />
                  </li>
                  <hr />
                  <li>
                    <ImportProductsModal />
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="border p-2  cursor-pointer border-main rounded-[12px]">
              <SlidersVertical
                onClick={() => {
                  setShowFilter(!showFilters);
                  setShowMenu(false);
                }}
                className="text-main"
              />
            </div>
            {showFilters && <FilterDropdown />}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {showTab}

      {/* Add Product Button */}
    </div>
  );
};

export default ProductsTabHeader;
