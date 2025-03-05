import React, { useState, useEffect } from "react";
import DataTable from "@/components/Tables/data-table";
import { posProductsColumns } from "./Columns";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import OrderList from "./OrderList";
import { CircleUserRound, ShoppingCart, Menu, X } from "lucide-react";
import CustomerList from "./CustomerList";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { ProductsType } from "@/components/Tables/products-tab-columns";

// Define an interface for the query response
interface InventoryResponse {
  results: ProductsType[];
  total_pages: number;
  count: number;
  links: {
    next: string | null;
    previous: string | null;
  };
}

const ProductsSection = () => {
  const [page, setPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: inventoryProductsData, isLoading } = useQuery<InventoryResponse>({
    queryKey: ["inventoryProducts", page],
    queryFn: async () => {
      const response = await customAxios.get(`${endpoints.inventoryProduct}?page=${page}`);
      
      return {
        results: response.data.results.sort(
          (a: ProductsType, b: ProductsType) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
        total_pages: response.data.total_pages,
        count: response.data.count,
        links: response.data.links,
      };
    },
  });

  const [searchValues, setSearchValues] = useState<string>("");
  const [data, setData] = useState<ProductsType[]>(inventoryProductsData?.results || []);
  const [orderList, setOrderList] = useState<ProductsType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isOrderListVisible, setIsOrderListVisible] = useState(false);
  const [showCustomers, setShowCustomer] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (inventoryProductsData) {
      setData(inventoryProductsData.results);
    }
  }, [inventoryProductsData]);

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
    setPage(newPage);
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
      setCartItemCount(updatedList.length);
      
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
        updatedList = prevOrderList;
      }
  
      localStorage.setItem("orderList", JSON.stringify(updatedList));
      setCartItemCount(updatedList.length);
      return updatedList;
    });
  
    setIsOrderListVisible(true);
  };

  const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues(event.target.value);
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

            <div className={`
              ${isMobileMenuOpen ? 'block' : 'hidden'} 
              md:block 
              w-full md:w-auto
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
          data={inventoryProductsData || { results: [], count: 0, links: { next: null, previous: null }, total_pages: 0 }}
          searchValue={searchValues}
          isLoading={isLoading}
          onPageChange={handlePageChange}
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