import React, { useState, useEffect } from "react";
import DataTable from "@/components/Tables/data-table";
import { posProductsColumns, Product } from "./Columns";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import OrderList from "./OrderList";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import CustomerList from "./CustomerList";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

const ProductsSection = () => {
  const { data: inventoryProductsData, isLoading } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryProduct).then((res) => res),
    select: (findData) => findData?.data?.results,
  });

  const [searchValues, setSearchValues] = useState<string>("");
  const [data, setData] = useState<Product[]>(inventoryProductsData || []);
  const [orderList, setOrderList] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isOrderListVisible, setIsOrderListVisible] = useState(false);
  const [showCustomers, setShowCustomer] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (inventoryProductsData) {
      setData(inventoryProductsData);
    }
  }, [inventoryProductsData]);

  useEffect(() => {
    const savedOrderList = localStorage.getItem('orderList');
    if (savedOrderList) {
      const parsedOrderList = JSON.parse(savedOrderList);
      setCartItemCount(parsedOrderList.reduce((total: number, item: Product) => total + item.quantity, 0));
      setOrderList(parsedOrderList);
    }
  }, []);

  const toggleOrderList = () => {
    if (cartItemCount > 0) {
      setIsOrderListVisible(!isOrderListVisible);
    }
  };

  const updateQuantity = (productName: string, delta: number) => {
    setData((prevData) =>
      prevData.map((product) =>
        product.name === productName
          ? { ...product, quantity: Math.max(0, product.quantity + delta) }
          : product
      )
    );

    setOrderList((prevOrderList) => {
      const updatedList = prevOrderList.map((product) =>
        product.name === productName
          ? { ...product, quantity: Math.max(0, product.quantity + delta) }
          : product
      ).filter(product => product.quantity > 0);
      
      localStorage.setItem('orderList', JSON.stringify(updatedList));
      setCartItemCount(updatedList.reduce((total, item) => total + item.quantity, 0));
      return updatedList;
    });
  };

  const addToOrder = (product: Product) => {
    setOrderList((prevOrderList) => {
      const existingProductIndex = prevOrderList.findIndex(
        (item) => item.name === product.name
      );

      let updatedList;
      if (existingProductIndex !== -1) {
        updatedList = [...prevOrderList];
        updatedList[existingProductIndex] = {
          ...updatedList[existingProductIndex],
          quantity:  1,
        };
      } else {
        updatedList = [...prevOrderList, { ...product, quantity: 1 }];
      }

      localStorage.setItem('orderList', JSON.stringify(updatedList));
      setCartItemCount(updatedList.reduce((total, item) => total + item.quantity, 0));
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

  return (
    <div className="flex gap-x-6 mt-8">
      <div
        className={`${
          isOrderListVisible && orderList.length > 0 ? "w-[60%]" : "w-full"
        } pr-4 transition-all bg-white shadow-custom p-4 mb-12 rounded-[8px] relative`}
      >
        <div className="flex justify-between items-center my-3">
          <h2 className="text-2xl font-bold font-inter text-[#202224]">
            Products
          </h2>

          <div className="flex gap-4">
            <div className="bg-[#0A77FF] rounded-[4px] p-2">
              <CircleUserRound
                onClick={() => setShowCustomer(true)}
                className="text-white cursor-pointer"
                color="white"
              />
            </div>
            <SearchFieldInput
              value={searchValues}
              onChange={handleSearchValueChange}
              placeholder="Search for product"
            />
          </div>
        </div>

        <DataTable
          columns={posProductsColumns(updateQuantity, addToOrder)}
          data={inventoryProductsData || []}
          searchValue={searchValues}
          isLoading={isLoading}
        />
        
        {cartItemCount > 0 && (
          <div 
            className="absolute top-32 right-8 cursor-pointer hover:scale-105 transition-transform"
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