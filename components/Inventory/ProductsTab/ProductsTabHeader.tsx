"use client";

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import ProductStockTable from "./ProductStockTable";
import clsx from "clsx";
import { Plus, SlidersVertical } from "lucide-react";
import AddProducts from "@/app/(dashboard)/inventory/_components/AddProductsModal";
import ImportProductsModal from "@/app/(dashboard)/inventory/_importProductsComponents/ImportProductsModal";
import { Button } from "@/components/ui/button";
import FilterDropdown from "@/components/DropDown/FilterDropDown";
import {
  productsTabColumns,
  ProductsType,
} from "@/components/Tables/products-tab-columns";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { ColumnFiltersState } from "@tanstack/react-table";
import DataTable from "@/components/Tables/data-table";

interface FilterState {
  unit: string;
  category: string;
  reorderLevel: string;
  expiryDate: string;
  status: string;
}

const ProductsTabHeader: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Products");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchValues, setSearchValues] = useState<string>("");
  const [showImport, setShowImport] = useState<boolean>(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    unit: "",
    category: "",
    reorderLevel: "",
    expiryDate: "",
    status: "",
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const { data: inventoryProductsData, isLoading } = useQuery({
    queryKey: ["inventoryProducts", page],
    queryFn: async () => {
      const response = await customAxios.get(
        `${endpoints.inventoryProduct}?page=${page}`
      );
      return response.data;
    },
    select: (data) => {
      let filteredResults = data.results;

      if (filters.unit) {
        filteredResults = filteredResults.filter(
          (product: ProductsType) => product.unit === filters.unit
        );
      }
      if (filters.category) {
        filteredResults = filteredResults.filter(
          (product: ProductsType) => product.category === filters.category
        );
      }
      if (filters.reorderLevel) {
        filteredResults = filteredResults.filter(
          (product: ProductsType) =>
            product.reorder_level === parseInt(filters.reorderLevel)
        );
      }
      if (filters.expiryDate) {
        filteredResults = filteredResults.filter((product: ProductsType) => {
          const productExpiryDate = new Date(product.expiry_date);
          const selectedExpiryDate = new Date(filters.expiryDate);
          return (
            productExpiryDate.toISOString().split("T")[0] ===
            selectedExpiryDate.toISOString().split("T")[0]
          );
        });
      }
      if (filters.status) {
        filteredResults = filteredResults.filter(
          (product: ProductsType) => product.product_status === filters.status
        );
      }

      return {
        results: filteredResults.sort(
          (a: ProductsType, b: ProductsType) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
        total_pages: data.total_pages,
        count: data.count,
        links: data.links,
      };
    },
  });

  console.log(inventoryProductsData);

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[#202224] font-semibold text-2xl">Products</h2>

        <div className="flex items-center gap-3">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchChange}
            placeholder="Search for product"
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
                <ul className="flex flex-col text-[#344054] items-center divide-y divide-gray-300">
                  <li className="px-3 py-2 text-sm">
                    <button type="button" onClick={() => setIsModalOpen(true)}>
                      Add Individually
                    </button>
                  </li>
                  <li className="px-3 py-2 text-sm">
                    <button type="button" onClick={() => setShowImport(true)}>
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

            {showFilters && (
              <FilterDropdown onFilterChange={handleFilterChange} />
            )}
          </div>
        </div>
      </div>

      <DataTable
        columns={productsTabColumns}
        data={
          inventoryProductsData || {
            results: [],
            count: 0,
            links: { next: null, previous: null },
            total_pages: 0,
          }
        }
        searchValue={searchValues}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />

      {isModalOpen && (
        <AddProducts
          title="Add Product"
          setModal={() => setIsModalOpen(false)}
        />
      )}

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
