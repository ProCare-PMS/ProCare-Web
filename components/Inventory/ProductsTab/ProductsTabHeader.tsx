"use client";
// inventory with add product individually
import React, { useEffect, useState } from "react";
import ProductMiniTable from "./ProductMiniTable";
import ProductStockTable from "./ProductStockTable";
import clsx from "clsx";
import { Plus, SlidersVertical } from "lucide-react";
import AddProducts from "@/app/(dashboard)/inventory/_components/AddProductsModal";
import ImportProductsModal from "@/app/(dashboard)/inventory/_importProductsComponents/ImportProductsModal";
import { Button } from "@/components/ui/button";
import FilterDropdown from "@/components/DropDown/FilterDropDown";
import { ExpandableDataTable } from "@/components/Tables/expandable-data-table";
import { productsTabColumns } from "@/components/Tables/products-tab-columns";
import { productsTabTable } from "@/type";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";

const ProductsTabHeader = () => {
  const [showTab, setShowTab] = useState(
    <ExpandableDataTable columns={productsTabColumns} data={productsTabTable} />
  );
  const [activeTab, setActiveTab] = useState("Products");
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchValues, setSetSearchValues] = useState<string>("");

  const handleOpenModal = () => {
    setShowMenu(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Tabs Section */}
        <div className="flex items-center bg-[#F5F5F5] gap-6 p-1 rounded-[8px] mb-8">
          <button
            onClick={() => {
              setShowTab(
                <ExpandableDataTable
                  columns={productsTabColumns}
                  data={productsTabTable}
                  searchValue={searchValues}
                />
              );
              setActiveTab("Products");
            }}
            className={clsx(
              "px-5 py-1 text-base font-medium",
              activeTab === "Products"
                ? "bg-white rounded-[8px] shadow-md text-[#0B2B23]"
                : "text-[#858C95]"
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
                : "text-[#858C95]"
            )}
          >
            Stocks
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex items-center gap-3">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchValueChange}
          />

          <div className="relative">
            <Button
              type="button"
              className="text-white relative flex items-center gap-2 rounded-[12px] font-inter w-[149px]"
              variant="secondary"
              onClick={() => {
                console.log("clicked");
                setShowMenu(!showMenu);
                setShowFilter(false);
              }}
            >
              <Plus />
              Add Product
            </Button>
            {showMenu && (
              <div
                className={`bg-white absolute top-12 left-0 z-20 rounded-[8px] shadow-lg transform transition-all duration-300 ease-in-out ${
                  showMenu
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <ul className="flex justify-center flex-col items-center divide-y divide-gray-300">
                  <li className="px-3 py-2">
                    {/* MODAL COMPONENTS SHOULD ONLY OPEN WHEN THE LI IS CLICKED */}
                    {/* <AddProducts title="" setModal={handleCloseModal} /> */}
                    <button
                      type="button"
                      className="text-center"
                      onClick={handleOpenModal}
                    >
                      Add Individually
                    </button>
                  </li>
                  <hr />
                  <li className="px-3 py-2">
                    {/* <ImportProductsModal
                      title="Import Products"
                      className="text-sm px-6 py-4 font-inter font-normal text-[#344054]"
                    /> */}
                    <button type="button" className="text-center">
                      Import Products
                    </button>
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
      {isModalOpen && (
        <AddProducts title="Add Product" setModal={handleCloseModal} />
      )}
    </div>
  );
};

export default ProductsTabHeader;
