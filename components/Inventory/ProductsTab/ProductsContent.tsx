"use client";

import React, { useState, useEffect } from "react";
import AddProducts from "@/app/(dashboard)/inventory/_components/AddProductsModal";
import ImportProductsModal from "@/app/(dashboard)/inventory/_importProductsComponents/ImportProductsModal";
import { SortOption } from "@/types/sortOption";
import { FilterState } from "@/types/filter";
import { PaginationState } from "@/types/pagination";
import ProductsTable from "./ProductsTable";
import StockTakingForm from "../ProductStock/StockTakingForm";
import DataTable from "@/components/Tables/data-table";
import { productsTabColumns, ProductsType } from "@/components/Tables/products-tab-columns";
import { productsStockTabColumns } from "../ProductStock/ProductStockColumn";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import ProductsHeader from "./ProductsTabHeader";

// Fetch functions - same as your original code
const fetchAllInventoryProducts = async () => {
  let allResults: ProductsType[] = [];
  let nextUrl = endpoints.inventoryProduct;

  while (nextUrl) {
    const response = await customAxios.get(nextUrl);
    allResults = [...allResults, ...response.data.results];
    nextUrl = response.data.links.next;

    if (nextUrl && nextUrl.includes("https://")) {
      const url = new URL(nextUrl);
      let pathname = url.pathname;

      if (pathname.includes("/api/")) {
        pathname = pathname.replace("/api/", "");
      }

      nextUrl = pathname + url.search;
    }
  }

  console.log("fetchAllInventoryProducts - Total results:", allResults.length, allResults);

  return allResults;
};


const fetchAllInventoryProductsStockTaken = async () => {
  let allResults: ProductsType[] = [];
  let nextUrl = `${endpoints.inventories}stocks-taken/`;

  while (nextUrl) {
    const response = await customAxios.get(nextUrl);
    allResults = [...allResults, ...response.data.results];
    nextUrl = response.data.links.next;

    if (nextUrl && nextUrl.includes("https://")) {
      const url = new URL(nextUrl);
      let pathname = url.pathname;

      if (pathname.includes("/api/")) {
        pathname = pathname.replace("/api/", "");
      }

      nextUrl = pathname + url.search;
    }
  }

  return allResults;
};

// Helper function to apply filters and sorting
const applyFiltersAndSorting = (
  data: ProductsType[],
  searchValue: string,
  filters: FilterState,
  sortOption: SortOption
): ProductsType[] => {
  if (!data) return [];

  let results = [...data];

  // Apply search filter
  if (searchValue) {
    const searchLower = searchValue.toLowerCase();
    results = results.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.slug.toLowerCase().includes(searchLower) ||
        (product.brand && product.brand.toLowerCase().includes(searchLower))
    );
  }

  // Apply other filters
  if (filters.unit) {
    results = results.filter((product) => product.unit === filters.unit);
  }

  if (filters.category) {
    results = results.filter((product) => product.category === filters.category);
  }

  if (filters.reorderLevel) {
    results = results.filter(
      (product) => product.reorder_level === parseInt(filters.reorderLevel)
    );
  }

  if (filters.expiryDate) {
    results = results.filter((product) => {
      const productExpiryDate = new Date(product.expiry_date);
      const selectedExpiryDate = new Date(filters.expiryDate);
      return (
        productExpiryDate.toISOString().split("T")[0] ===
        selectedExpiryDate.toISOString().split("T")[0]
      );
    });
  }

  if (filters.status) {
    results = results.filter(
      (product) => product.product_status === filters.status
    );
  }

  // Apply sorting based on selected option
  switch (sortOption) {
    case "alphabetical":
      return results.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
      return results.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    case "oldest":
      return results.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    default:
      return results;
  }
};

const ProductsContent: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState(1);
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

  // Data fetching for both tabs
  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: fetchAllInventoryProducts,
    staleTime: 5 * 60 * 1000,
  });

  

  const { data: stockData, isLoading: isLoadingStock } = useQuery({
    queryKey: ["inventoryProductsStock"],
    queryFn: fetchAllInventoryProductsStockTaken,
    staleTime: 5 * 60 * 1000,
  });

  // Separate filtered data for each tab
  const filteredProductsData = React.useMemo(() => {
    return applyFiltersAndSorting(productsData || [], searchValue, filters, sortOption);
  }, [productsData, searchValue, filters, sortOption]);

  const filteredStockData = React.useMemo(() => {
    return applyFiltersAndSorting(stockData || [], searchValue, filters, sortOption);
  }, [stockData, searchValue, filters, sortOption]);

  // Create paginated data for Products tab
  const paginatedProductsData = React.useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const paginatedResults = filteredProductsData.slice(startIndex, endIndex);

    return {
      results: paginatedResults,
      count: filteredProductsData.length,
      total_pages: Math.ceil(filteredProductsData.length / pagination.pageSize),
      links: {
        next:
          pagination.page < Math.ceil(filteredProductsData.length / pagination.pageSize)
            ? "has-next"
            : null,
        previous: pagination.page > 1 ? "has-previous" : null,
      },
    };
  }, [filteredProductsData, pagination.page, pagination.pageSize]);

  // Create paginated data for Stock tab
  const paginatedStockData = React.useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const paginatedResults = filteredStockData.slice(startIndex, endIndex);

    return {
      results: paginatedResults,
      count: filteredStockData.length,
      total_pages: Math.ceil(filteredStockData.length / pagination.pageSize),
      links: {
        next:
          pagination.page < Math.ceil(filteredStockData.length / pagination.pageSize)
            ? "has-next"
            : null,
        previous: pagination.page > 1 ? "has-previous" : null,
      },
    };
  }, [filteredStockData, pagination.page, pagination.pageSize]);

  // Update pagination total when filtered data changes
  useEffect(() => {
    const currentFilteredData = activeTab === 1 ? filteredProductsData : filteredStockData;
    setPagination(prev => ({
      ...prev,
      total: currentFilteredData.length,
      page: 1, // Reset to first page when filters change
    }));
  }, [filteredProductsData.length, filteredStockData.length, activeTab]);

  // Event handlers
  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
    // Reset search and filters when switching tabs
    setSearchValue("");
    setFilters({
      unit: "",
      category: "",
      reorderLevel: "",
      expiryDate: "",
      status: "",
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
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

  // Get current data and loading state based on active tab
  const currentPaginatedData = activeTab === 1 ? productsData : stockData;
  const currentLoading = activeTab === 1 ? isLoadingProducts : isLoadingStock;

  return (
    <div className="">
      <ProductsHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onAddProduct={() => toggleModal('addProduct', true)}
        onImportProducts={() => toggleModal('importProducts', true)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Render appropriate table based on active tab */}
      <DataTable
        columns={activeTab === 1 ? productsTabColumns : productsStockTabColumns}
        data={currentPaginatedData}
        searchValue={searchValue}
        isLoading={currentLoading}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={pagination.pageSize}
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