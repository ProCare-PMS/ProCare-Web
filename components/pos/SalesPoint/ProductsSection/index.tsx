import React, { useState, useEffect } from "react";
import DataTable from "@/components/Tables/data-table";
import { posProductsColumns, Product } from "./Columns";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import OrderList from "./OrderList";
import { CircleUserRound } from "lucide-react";
import CustomerList from "./CustomerList";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";


{/* 
const productData: Product[] = [
  { name: "Product A", quantity: 10, selling_price: "100" },
  { name: "Product B", quantity: 5, selling_price: "50" },
  { name: "Product C", quantity: 20, selling_price: "200" },
  { name: "Aspirin", quantity: 20, selling_price: "200" },
  { name: "Penicillin", quantity: 20, selling_price: "200" },
  { name: "Insulin", quantity: 20, selling_price: "200" },
  { name: "Ibuprofen", quantity: 20, selling_price: "200" },
  { name: "Tumeric", quantity: 20, selling_price: "200" },
  { name: "Ginseng", quantity: 20, selling_price: "200" },
  { name: "Product E", quantity: 20, selling_price: "200" },
];
*/}

const ProductsSection = () => {
  //fetching data for the sales table
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

  console.log(inventoryProductsData);

  useEffect(() => {
    if (inventoryProductsData) {
      setData(inventoryProductsData);
    }
  }, [inventoryProductsData]);

  // Update quantity handler for both data and orderList
  const updateQuantity = (productName: string, delta: number) => {
    // Update the main data table
    setData((prevData) =>
      prevData.map((product) =>
        product.name === productName
          ? { ...product, quantity: Math.max(0, product.quantity + delta) }
          : product
      )
    );

    // Update the order list if the product exists there
    setOrderList((prevOrderList) =>
      prevOrderList.map((product) =>
        product.name === productName
          ? { ...product, quantity: Math.max(0, product.quantity + delta) }
          : product
      )
    );

    // If quantity becomes 0, optionally remove the item from the order list
    if (delta < 0) {
      setOrderList((prevOrderList) =>
        prevOrderList.filter((product) =>
          product.name === productName ? product.quantity + delta > 0 : true
        )
      );
    }
  };

  // Add to Order function that also ensures OrderList visibility
  const addToOrder = (product: Product) => {
    setOrderList((prevOrderList) => {
      // Check if product already exists in order list
      const existingProductIndex = prevOrderList.findIndex(
        (item) => item.name === product.name
      );
  
      if (existingProductIndex !== -1) {
        // If product exists, update its quantity
        const updatedList = [...prevOrderList];
        updatedList[existingProductIndex] = {
          ...updatedList[existingProductIndex],
          quantity: updatedList[existingProductIndex].quantity + 1, // Increase quantity by 1
        };
        return updatedList;
      } else {
        // If product doesn't exist, add it with quantity 1
        return [...prevOrderList, { ...product, quantity: 1 }];
      }
    });
  
    // Show the order list if it's hidden
    if (!isOrderListVisible) {
      setIsOrderListVisible(true);
    }
  };

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValues(event.target.value);
  };

  useEffect(() => {
    const total = orderList.reduce(
      (sum, product) =>
        sum + product.quantity * parseFloat(product.selling_price),
      0
    );
    setTotalPrice(total);
  }, [orderList]);

  // Handle toggle visibility of OrderList
  const handleToggleOrderList = () => {
    setIsOrderListVisible((prevState) => !prevState);
  };

  //Open Customer List Modal
  const openCustomersList = () => {
    setShowCustomer(true);
  };

  //Close Customer List Modal
  const closeCustomerList = () => {
    setShowCustomer(false);
  };

  // In ProductsSection.tsx
  const clearOrderList = () => {
    setOrderList([]);
    // Optionally hide the order list when it's cleared
    setIsOrderListVisible(false);
  };

  return (
    <div className=" flex gap-x-6  mt-8">
      <div
        className={`${
          isOrderListVisible && orderList.length > 0 ? "w-[60%]" : "w-full"
        } pr-4 transition-all bg-white shadow-custom p-4 mb-12 rounded-[8px]`}
      >
        <div className="flex justify-between items-center my-3">
          <h2 className="text-2xl font-bold font-inter text-[#202224]">
            Products
          </h2>

          <div className="flex gap-4">
            <div className="bg-[#0A77FF] rounded-[4px] p-2">
              <CircleUserRound
                onClick={openCustomersList}
                className="text-white cursor-pointer"
                color="white"
              />
            </div>
            <SearchFieldInput
              value={searchValues}
              onChange={handleSearchValueChange}
            />
          </div>
        </div>

        <DataTable
          columns={posProductsColumns(updateQuantity, addToOrder)}
          data={inventoryProductsData || []}
          searchValue={searchValues}
          isLoading={isLoading}
        />
      </div>

      {/* Modal for Customer List */}
      {showCustomers && <CustomerList onClose={closeCustomerList} />}

      {isOrderListVisible && orderList.length > 0 && (
        <OrderList
          orderList={orderList}
          updateQuantity={updateQuantity}
          totalPrice={totalPrice}
          onToggleOrderList={handleToggleOrderList}
          onClearBasket={clearOrderList}
        />
      )}
    </div>
  );
};

export default ProductsSection;
