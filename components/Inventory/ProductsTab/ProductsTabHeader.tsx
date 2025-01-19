"use client";

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
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
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

const ProductsTabHeader: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Products");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchValues, setSearchValues] = useState<string>("");
  const [showImport, setShowImport] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { data: inventoryProductsData } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryProduct).then((res) => res),
    select: (findData) => findData?.data?.results,
  });

  const renderTabContent = (): JSX.Element | null => {
    switch (activeTab) {
      case "Products":
        return (
          <ExpandableDataTable
            columns={productsTabColumns}
            data={inventoryProductsData || []}
            searchValue={searchValues}
            emptyState="products"
          />
        );
      case "Stocks":
        return <ProductStockTable />;
      default:
        return null;
    }
  };

  const toggleMenu = (): void => {
    setShowMenu((prev) => !prev);
    setShowFilters(false);
  };

  const toggleFilters = (): void => {
    setShowFilters((prev) => !prev);
    setShowMenu(false);
  };

  const handleTabClick = (tabName: string): void => {
    setActiveTab(tabName);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValues(event.target.value);
  };

  const showAddProductsModal = () => {
    setIsModalOpen(true);
    setShowImport(false);
    setShowMenu(false);
  };

  const showImportModal = () => {
    setShowImport(true);
    setIsModalOpen(false);
    setShowMenu(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        {/* Tabs Section */}
        <div className="flex items-center bg-[#F5F5F5] gap-6 p-1 rounded-[8px] ">
          {["Products", "Stocks"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={clsx(
                "px-5 py-1 text-base font-medium",
                activeTab === tab
                  ? "bg-white rounded-[8px] shadow-md text-[#0B2B23]"
                  : "text-[#858C95]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search and Actions Section */}
        <div className="flex items-center gap-3">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchChange}
          />

          <div className="relative" ref={menuRef}>
            <Button
              type="button"
              className="text-white flex items-center gap-2 rounded-[12px] font-inter w-[149px]"
              variant="secondary"
              onClick={toggleMenu}
            >
              <Plus /> Add Product
            </Button>

            {showMenu && (
              <div className="bg-white absolute w-[160px] top-12 left-0 z-20 rounded-[8px] shadow-2xl">
                <ul className="flex flex-col items-center divide-y divide-gray-300">
                  <li className="px-3 py-2">
                    <button type="button" onClick={showAddProductsModal}>
                      Add Individually
                    </button>
                  </li>
                  <li className="px-3 py-2">
                    <button type="button" onClick={showImportModal}>
                      Import Products
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <div
              className="border p-2 cursor-pointer border-[#494A50] rounded-[12px]"
              onClick={toggleFilters}
            >
              <SlidersVertical className="text-[#494A50]" />
            </div>

            {showFilters && <FilterDropdown />}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Add Product Modal */}
      {isModalOpen && (
        <AddProducts
          title="Add Product"
          setModal={() => setIsModalOpen(false)}
        />
      )}

      {/* Import Products */}
      {showImport && (
        <ImportProductsModal
          setModal={() => setShowImport(false)}
          title="Product"
        />
      )}
    </div>
  );
};

export default ProductsTabHeader;
