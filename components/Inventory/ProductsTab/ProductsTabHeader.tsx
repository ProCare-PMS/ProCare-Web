"use client";

import React, {
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Plus, SlidersVertical, ChevronDown } from "lucide-react";
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
import DataTable from "@/components/Tables/data-table";
import AddProducts from "@/app/(dashboard)/inventory/_components/AddProductsModal";
import ImportProductsModal from "@/app/(dashboard)/inventory/_importProductsComponents/ImportProductsModal";
import { productsStockTabColumns } from "../ProductStock/ProductStockColumn";
import StockTakingForm from "../ProductStock/StockTakingForm";

interface FilterState {
  unit: string;
  category: string;
  reorderLevel: string;
  expiryDate: string;
  status: string;
}

// Define sort options
type SortOption = "alphabetical" | "newest" | "oldest";

// Fetch all data function - this can be reused
const fetchAllInventoryProducts = async () => {
  let allResults: ProductsType[] = [];
  let nextUrl = endpoints.inventoryProduct;

  // Keep fetching until there's no next page
  while (nextUrl) {
    const response = await customAxios.get(nextUrl);
    allResults = [...allResults, ...response.data.results];
    nextUrl = response.data.links.next;

    // If using actual URLs for pagination, extract the endpoint
    if (nextUrl && nextUrl.includes("https://")) {
      const url = new URL(nextUrl);
      let pathname = url.pathname;

      // Fix duplicate /api/api/ issue
      if (pathname.includes("/api/")) {
        pathname = pathname.replace("/api/", "");
      }

      nextUrl = pathname + url.search;
    }
  }

  return allResults;
};

const fetchAllInventoryProductsStockTaken = async () => {
  let allResults: ProductsType[] = [];
  let nextUrl = `${endpoints.inventories}stocks-taken/`;

  // Keep fetching until there's no next page
  while (nextUrl) {
    const response = await customAxios.get(nextUrl);
    allResults = [...allResults, ...response.data.results];
    nextUrl = response.data.links.next;

    // If using actual URLs for pagination, extract the endpoint
    if (nextUrl && nextUrl.includes("https://")) {
      const url = new URL(nextUrl);
      let pathname = url.pathname;

      // Fix duplicate /api/api/ issue
      if (pathname.includes("/api/")) {
        pathname = pathname.replace("/api/", "");
      }

      nextUrl = pathname + url.search;
    }
  }

  return allResults;
};

const ProductsTabHeader: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showStock, setShowStock] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchValues, setSearchValues] = useState<string>("");
  const [showImport, setShowImport] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<SortOption>("alphabetical"); // Default to alphabetical
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [filters, setFilters] = useState<FilterState>({
    unit: "",
    category: "",
    reorderLevel: "",
    expiryDate: "",
    status: "",
  });
  const [toggleShow, setToggleShow] = useState<number>(1);

  // Fetch all inventory products data
  const { data: allProductsData, isLoading: isLoadingAllProducts } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: fetchAllInventoryProducts,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes to reduce API calls
  });

  //fetch all inventory products stock taken data
  const { data: allProductsDataStock, isLoading: isLoadingAllProductsStock } =
    useQuery({
      queryKey: ["inventoryProductsStock"],
      queryFn: fetchAllInventoryProductsStockTaken,
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes to reduce API calls
    });

  // Apply filtering, searching, and sorting to all data
  const filteredProducts = useMemo(() => {
    if (!allProductsData) return [];

    let results = [...allProductsData];

    // Apply search filter
    if (searchValues) {
      const searchLower = searchValues.toLowerCase();
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
      results = results.filter(
        (product) => product.category === filters.category
      );
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
        // Sort alphabetically by name
        return results.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        // Sort by newest first (creation date)
        return results.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "oldest":
        // Sort by oldest first (creation date)
        return results.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      default:
        return results;
    }
  }, [allProductsData, searchValues, filters, sortOption]);

  // Apply filtering, searching, and sorting to all data
  const filteredStockProducts = useMemo(() => {
    if (!allProductsDataStock) return [];

    let results = [...allProductsDataStock];

    // Apply search filter
    if (searchValues) {
      const searchLower = searchValues.toLowerCase();
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
      results = results.filter(
        (product) => product.category === filters.category
      );
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
        // Sort alphabetically by name
        return results.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        // Sort by newest first (creation date)
        return results.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "oldest":
        // Sort by oldest first (creation date)
        return results.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      default:
        return results;
    }
  }, [allProductsDataStock, searchValues, filters, sortOption]);

  // Create paginated data for the current view
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = filteredProducts.slice(startIndex, endIndex);

    return {
      results: paginatedResults,
      count: filteredProducts.length,
      total_pages: Math.ceil(filteredProducts.length / pageSize),
      links: {
        next:
          currentPage < Math.ceil(filteredProducts.length / pageSize)
            ? "has-next"
            : null,
        previous: currentPage > 1 ? "has-previous" : null,
      },
    };
  }, [filteredProducts, currentPage, pageSize]);

  //created paginated data for stock taking
  const stockDataPaginated = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = filteredStockProducts.slice(startIndex, endIndex);

    return {
      results: paginatedResults,
      count: filteredStockProducts.length,
      total_pages: Math.ceil(filteredStockProducts.length / pageSize),
      links: {
        next:
          currentPage < Math.ceil(filteredStockProducts.length / pageSize)
            ? "has-next"
            : null,
        previous: currentPage > 1 ? "has-previous" : null,
      },
    };
  }, [filteredStockProducts, currentPage, pageSize]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const toggleMenu = (): void => {
    setShowMenu((prev) => !prev);
    setShowFilters(false);
    setShowSortOptions(false);
  };

  const toggleFilters = (): void => {
    setShowFilters((prev) => !prev);
    setShowMenu(false);
    setShowSortOptions(false);
  };

  const toggleSortOptions = (): void => {
    setShowSortOptions((prev) => !prev);
    setShowMenu(false);
    setShowFilters(false);
  };

  const handleSortOptionChange = (option: SortOption): void => {
    setSortOption(option);
    setShowSortOptions(false);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValues(event.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as Node)
    ) {
      setShowFilters(false);
    }
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setShowSortOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Functions to handle modal opening with dropdown closing
  const openAddProductModal = () => {
    setIsModalOpen(true);
    setShowMenu(false);
  };

  const openImportModal = () => {
    setShowImport(true);
    setShowMenu(false);
  };

  // Get sort option display text
  const getSortOptionText = (option: SortOption): string => {
    switch (option) {
      case "alphabetical":
        return "A-Z";
      case "newest":
        return "Newest";
      case "oldest":
        return "Oldest";
      default:
        return "Sort";
    }
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

        <div className="flex flex-col md:flex-row items-center gap-3">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchChange}
            placeholder="Search for product"
          />

          {/* Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <Button
              type="button"
              className="flex items-center gap-2 rounded-[12px] bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-inter w-full md:w-[120px]"
              variant="outline"
              onClick={toggleSortOptions}
            >
              {getSortOptionText(sortOption)} <ChevronDown size={16} />
            </Button>

            {showSortOptions && (
              <div className="bg-white absolute w-[160px] top-12 left-0 z-20 rounded-[8px] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                <ul className="flex flex-col text-[#344054] items-center divide-y divide-gray-300">
                  <li className="px-3 py-2 text-sm w-full hover:bg-gray-50 transition-colors">
                    <button
                      type="button"
                      onClick={() => handleSortOptionChange("alphabetical")}
                      className={`w-full text-left ${
                        sortOption === "alphabetical" ? "font-semibold" : ""
                      }`}
                    >
                      A-Z
                    </button>
                  </li>
                  <li className="px-3 py-2 text-sm w-full hover:bg-gray-50 transition-colors">
                    <button
                      type="button"
                      onClick={() => handleSortOptionChange("newest")}
                      className={`w-full text-left ${
                        sortOption === "newest" ? "font-semibold" : ""
                      }`}
                    >
                      Newest
                    </button>
                  </li>
                  <li className="px-3 py-2 text-sm w-full hover:bg-gray-50 transition-colors">
                    <button
                      type="button"
                      onClick={() => handleSortOptionChange("oldest")}
                      className={`w-full text-left ${
                        sortOption === "oldest" ? "font-semibold" : ""
                      }`}
                    >
                      Oldest
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative" ref={menuRef}>
            {toggleShow === 1 && (
              <Button
                type="button"
                className="text-white flex items-center gap-2 rounded-[12px] font-inter w-full md:w-[149px]"
                variant="secondary"
                onClick={toggleMenu}
              >
                <Plus /> Add Product
              </Button>
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

            {showMenu && (
              <div className="bg-white absolute w-[160px] top-12 left-0 z-20 rounded-[8px] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                <ul className="flex flex-col text-[#344054] items-center divide-y divide-gray-300">
                  <li className="px-3 py-2 text-sm w-full hover:bg-gray-50 transition-colors">
                    <button
                      type="button"
                      onClick={openAddProductModal}
                      className="w-full text-left"
                    >
                      Add Individually
                    </button>
                  </li>
                  <li className="px-3 py-2 text-sm w-full hover:bg-gray-50 transition-colors">
                    <button
                      type="button"
                      onClick={openImportModal}
                      className="w-full text-left"
                    >
                      Import Products
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative" ref={filterRef}>
            <div
              className="border p-2 cursor-pointer border-[#494A50] rounded-[12px] hover:bg-gray-50 transition-colors"
              onClick={toggleFilters}
            >
              <SlidersVertical className="text-[#494A50]" />
            </div>

            {showFilters && (
              <div className="absolute top-2 left-24 md:right-0 z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                <FilterDropdown onFilterChange={handleFilterChange} />
              </div>
            )}
          </div>
        </div>
      </div>

      {toggleShow === 1 && (
        <DataTable
          columns={productsTabColumns}
          data={paginatedData}
          searchValue={searchValues}
          isLoading={isLoadingAllProducts}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
        />
      )}

      {toggleShow === 2 && (
        <DataTable
          columns={productsStockTabColumns}
          data={stockDataPaginated}
          searchValue={searchValues}
          isLoading={isLoadingAllProductsStock}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
        />
      )}

      {isModalOpen && (
        <AddProducts
          title="Add Product"
          setModal={() => setIsModalOpen(false)}
        />
      )}

      {showStock && (
        <StockTakingForm
          title="Add Stock Taking"
          setModal={() => setShowStock(false)}
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
