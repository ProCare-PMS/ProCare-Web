"use client"
import React, { useState, useEffect, useMemo, useRef } from "react";
import DataTable from "@/components/Tables/data-table";
import { posProductsColumns } from "./Columns";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import OrderList from "./OrderList";
import { CircleUserRound, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import CustomerList from "./CustomerList";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { ProductsType } from "@/components/Tables/products-tab-columns";
import { Button } from "@/components/ui/button";

// Define sort options
type SortOption = "alphabetical" | "newest" | "oldest";

// Fetch all data function - similar to the one in the first code
const fetchAllInventoryProducts = async () => {
  let allResults: ProductsType[] = [];
  let nextUrl = endpoints.inventoryProduct;
  
  // Keep fetching until there's no next page
  while (nextUrl) {
    const response = await customAxios.get(nextUrl);
    allResults = [...allResults, ...response.data.results];
    nextUrl = response.data.links.next;
    
    // If using actual URLs for pagination, extract the endpoint
    if (nextUrl && nextUrl.includes('https://')) {
      const url = new URL(nextUrl);
      let pathname = url.pathname;
      
      // Fix duplicate /api/api/ issue
      if (pathname.includes('/api/')) {
        pathname = pathname.replace('/api/', '');
      }
      
      nextUrl = pathname + url.search;
    }
  }
  
  return allResults;
};

const ProductsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValues, setSearchValues] = useState<string>("");
  const [orderList, setOrderList] = useState<ProductsType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isOrderListVisible, setIsOrderListVisible] = useState(false);
  const [showCustomers, setShowCustomer] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [sortOption, setSortOption] = useState<SortOption>("newest"); // Default to newest
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

  // Fetch all inventory products data
  const { data: allProductsData, isLoading } = useQuery({
    queryKey: ["allInventoryProducts"],
    queryFn: fetchAllInventoryProducts,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes to reduce API calls
  });

  // Apply filtering, searching, and sorting to all data
  const filteredProducts = useMemo(() => {
    if (!allProductsData) return [];
    
    let results = [...allProductsData];
    
    // Apply search filter
    if (searchValues) {
      const searchLower = searchValues.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        (product.slug && product.slug.toLowerCase().includes(searchLower)) ||
        (product.brand && product.brand.toLowerCase().includes(searchLower))
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
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "oldest":
        // Sort by oldest first (creation date)
        return results.sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      default:
        return results;
    }
  }, [allProductsData, searchValues, sortOption]);
  
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
        next: currentPage < Math.ceil(filteredProducts.length / pageSize) ? "has-next" : null,
        previous: currentPage > 1 ? "has-previous" : null
      }
    };
  }, [filteredProducts, currentPage, pageSize]);

  useEffect(() => {
    const savedOrderList = localStorage.getItem('orderList');
    if (savedOrderList) {
      try {
        const parsedOrderList = JSON.parse(savedOrderList);
        const validOrderList = parsedOrderList.filter((item: ProductsType) => item && item.quantity !== undefined);
  
        setCartItemCount(validOrderList.reduce((total: number, item: ProductsType) => total + item.quantity, 0));
        setOrderList(validOrderList);
      } catch (error) {
        console.error("Error parsing order list from localStorage:", error);
        localStorage.removeItem('orderList');
      }
    }
  }, []);

  const toggleSortOptions = (): void => {
    setShowSortOptions((prev) => !prev);
  };

  const handleSortOptionChange = (option: SortOption): void => {
    setSortOption(option);
    setShowSortOptions(false);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  // Get sort option display text
  const getSortOptionText = (option: SortOption): string => {
    switch (option) {
      case "alphabetical": return "A-Z";
      case "newest": return "Newest";
      case "oldest": return "Oldest";
      default: return "Sort";
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
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

  const toggleOrderList = (e?: React.MouseEvent) => {
    if (e) {
      const target = e.target as HTMLElement;
      const isInputOrButton = target.closest('input, button');
      if (isInputOrButton) {
        return;
      }
    }
    
    if (cartItemCount > 0) {
      setIsOrderListVisible(!isOrderListVisible);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const updateQuantity = (productName: string, delta: number) => {
    setOrderList((prevOrderList) => {
      let updatedList;
      
      if (delta === -Infinity) {
        updatedList = prevOrderList.filter(product => product.name !== productName);
      } else {
        updatedList = prevOrderList.map((product) =>
          product.name === productName
            ? { ...product, quantity: Math.max(0, product.quantity + delta) }
            : product
        ).filter(product => product.quantity > 0);
      }
  
      localStorage.setItem("orderList", JSON.stringify(updatedList));
      setCartItemCount(updatedList.reduce((total, item) => total + item.quantity, 0));
      
      return updatedList;
    });
  };
  
  const addToOrder = (product: ProductsType) => {
    setOrderList((prevOrderList) => {
      const existingProduct = prevOrderList.find(item => item.name === product.name);
  
      let updatedList;
      if (!existingProduct) {
        // Convert ProductsType to Product by adding quantity
        const newProduct: ProductsType = { ...product, quantity: 1 };
        updatedList = [...prevOrderList, newProduct];
      } else {
        // If product already exists in cart, increment quantity by 1
        updatedList = prevOrderList.map(item => 
          item.name === product.name 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
  
      localStorage.setItem("orderList", JSON.stringify(updatedList));
      setCartItemCount(updatedList.reduce((total, item) => total + item.quantity, 0));
      return updatedList;
    });
  
    setIsOrderListVisible(true);
  };

  const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues(event.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  useEffect(() => {
    const total = orderList.reduce(
      (sum, product) => sum + product.quantity * parseFloat(product.selling_price),
      0
    );
    setTotalPrice(total);
  }, [orderList]);

  const clearOrderList = () => {
    setOrderList([]);
    setIsOrderListVisible(false);
    setCartItemCount(0);
    localStorage.removeItem('orderList');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row gap-x-0 md:gap-x-6 mt-8">
      <div
        className={`
          w-full 
          ${isOrderListVisible && orderList.length > 0 ? "md:w-[60%]" : "md:w-full"} 
          pr-0 md:pr-4 
          transition-all 
          bg-white 
          shadow-custom 
          p-4 
          mb-12 
          rounded-[8px] 
          relative
        `}
      >
        <div className="flex flex-col md:flex-row justify-between items-center my-3">
          <h2 className="text-2xl font-bold font-inter text-[#202224] mb-4 md:mb-0">
            Products
          </h2>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4">
                <div className="bg-[#0A77FF] rounded-[4px] p-2">
                  <CircleUserRound
                    onClick={() => setShowCustomer(true)}
                    className="text-white cursor-pointer"
                    color="white"
                  />
                </div>
                <div className="md:hidden">
                  {isMobileMenuOpen ? (
                    <X 
                      onClick={toggleMobileMenu} 
                      className="text-gray-600 cursor-pointer" 
                    />
                  ) : (
                    <Menu 
                      onClick={toggleMobileMenu} 
                      className="text-gray-600 cursor-pointer" 
                    />
                  )}
                </div>
              </div>
            </div>
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
                  <div 
                    className="bg-white absolute w-[160px] top-12 left-0 z-20 rounded-[8px] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    <ul className="flex flex-col text-[#344054] items-center divide-y divide-gray-300">
                      <li className="px-3 py-2 text-sm w-full hover:bg-gray-50 transition-colors">
                        <button 
                          type="button" 
                          onClick={() => handleSortOptionChange("alphabetical")}
                          className={`w-full text-left ${sortOption === "alphabetical" ? "font-semibold" : ""}`}
                        >
                          A-Z
                        </button>
                      </li>
                      <li className="px-3 py-2 text-sm w-full hover:bg-gray-50 transition-colors">
                        <button 
                          type="button" 
                          onClick={() => handleSortOptionChange("newest")}
                          className={`w-full text-left ${sortOption === "newest" ? "font-semibold" : ""}`}
                        >
                          Newest
                        </button>
                      </li>
                      <li className="px-3 py-2 text-sm w-full hover:bg-gray-50 transition-colors">
                        <button 
                          type="button" 
                          onClick={() => handleSortOptionChange("oldest")}
                          className={`w-full text-left ${sortOption === "oldest" ? "font-semibold" : ""}`}
                        >
                          Oldest
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

            <div className={`
              ${isMobileMenuOpen ? 'block' : 'hidden'} 
              md:block 
              w-full md:w-auto
              flex flex-col md:flex-row gap-2
            `}>
              <SearchFieldInput
                value={searchValues}
                onChange={handleSearchValueChange}
                placeholder="Search for product"
              />
              
              
            </div>
          </div>
        </div>

        <DataTable
          columns={posProductsColumns(updateQuantity, addToOrder)}
          data={paginatedData || { results: [], count: 0, links: { next: null, previous: null }, total_pages: 0 }}
          searchValue={searchValues}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
        />
        
        {cartItemCount > 0 && (
          <div 
            className="absolute top-32 right-2 md:right-8 cursor-pointer hover:scale-105 transition-transform"
            onClick={toggleOrderList}
          >
            <div className="relative">
              <div className="bg-[#2648EA] rounded-full p-2">
                <ShoppingCart className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </div>
            </div>
          </div>
        )}
      </div>

      {showCustomers && <CustomerList onClose={() => setShowCustomer(false)} />}

      {isOrderListVisible && orderList.length > 0 && (
        <OrderList
          orderList={orderList}
          updateQuantity={updateQuantity}
          totalPrice={totalPrice}
          onToggleOrderList={toggleOrderList}
          onClearBasket={clearOrderList}
        />
      )}
    </div>
  );
};

export default ProductsSection;