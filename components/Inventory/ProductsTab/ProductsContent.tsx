"use client";

import React, { useState } from "react";
//import ProductsHeader from "./ProductsHeader/ProductsHeader";
//import ProductsTable from "./ProductsTable/ProductsTable";
import AddProducts from "@/app/(dashboard)/inventory/_components/AddProductsModal";
import ImportProductsModal from "@/app/(dashboard)/inventory/_importProductsComponents/ImportProductsModal";
//import StockTakingForm from "../ProductStock/StockTakingForm";
//import { useInventoryProducts } from "@/hooks/useProductsData";
import { useProductFilters } from "@/hooks/useProductFilters";
import { SortOption } from "@/types/sortOption";
import { FilterState } from "@/types/filter";
import { PaginationState } from "@/types/pagination";
import { useInventoryProducts } from "@/hooks/useProductData";
import ProductsTabHeader from "./ProductsTabHeader";
import ProductsTable from "./ProductsTable";
import StockTakingForm from "../ProductStock/StockTakingForm";
//import { FilterState, SortOption, PaginationState } from "@/types/products";

const ProductsContent: React.FC = () => {
  // State management
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("alphabetical");
  const [filters, setFilters] = useState<FilterState>({
    unit: "",
    category: "",
    reorderLevel: "",
    expiryDate: "",
    status: "",
  });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  // Modal states
  const [modals, setModals] = useState({
    addProduct: false,
    importProducts: false,
    stockTaking: false,
  });

  // Data fetching
  const { data: productsData, isLoading } = useInventoryProducts();

  // Apply filters and sorting
  const filteredData = useProductFilters(productsData, searchValue, filters, sortOption);

  // Update pagination total when filtered data changes
  React.useEffect(() => {
    setPagination(prev => ({
      ...prev,
      total: filteredData.length,
      page: 1, // Reset to first page when filters change
    }));
  }, [filteredData.length]);

  // Event handlers
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination(prev => ({ ...prev, pageSize, page: 1 }));
  };

  const toggleModal = (modalName: keyof typeof modals, isOpen?: boolean) => {
    setModals(prev => ({
      ...prev,
      [modalName]: isOpen ?? !prev[modalName],
    }));
  };

  return (
    <div className="">
      <ProductsTabHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onAddProduct={() => toggleModal('addProduct', true)}
        onImportProducts={() => toggleModal('importProducts', true)}
      />

      <ProductsTable
        data={filteredData}
        searchValue={searchValue}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Modals */}
      {modals.addProduct && (
        <AddProducts
          title="Add Product"
          setModal={() => toggleModal('addProduct', false)}
        />
      )}

      {modals.stockTaking && (
        <StockTakingForm
          title="Add Stock Taking"
          setModal={() => toggleModal('stockTaking', false)}
        />
      )}

      {modals.importProducts && (
        <ImportProductsModal
          setModal={() => toggleModal('importProducts', false)}
          title="Product"
        />
      )}
    </div>
  );
};

export default ProductsContent;