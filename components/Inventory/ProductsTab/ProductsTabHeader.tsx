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
import { ExpandableDataTable } from "@/components/Tables/expandable-data-table";
import { productsTabColumns } from "@/components/Tables/products-tab-columns";
import { productsTabTable } from "@/type";

const ProductsTabHeader = () => {
  const [showTab, setShowTab] = useState(<ExpandableDataTable columns={productsTabColumns}
    data={productsTabTable}  />);
  const [activeTab, setActiveTab] = useState("Products");
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilter] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Tabs Section */}
        <div className="flex items-center bg-[#858C95]/50 gap-6 p-1 rounded-[10px] mb-8">
          <button
            onClick={() => {
              setShowTab(
                <ExpandableDataTable
                  columns={productsTabColumns}
                  data={productsTabTable}
                />
              );
              setActiveTab("Products");
            }}
            className={clsx(
              "px-5 py-1 text-base font-medium",
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
          <div className="flex flex-row border-2 border-[#EAEBF0] rounded-[14px] items-center flex-1 gap-2 bg-transparent p-1">
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
            <div className="border p-2 cursor-pointer border-[#494A50] rounded-[12px]">
              <SlidersVertical
                onClick={() => {
                  setShowFilter(!showFilters);
                  setShowMenu(false);
                }}
                className="text-[#494A50]"
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
