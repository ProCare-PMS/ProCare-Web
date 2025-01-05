import React, { useState, useEffect } from "react";
import DataTable from "@/components/Tables/data-table";
import { posProductsColumns, Product } from "./Columns";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import OrderList from "./OrderList";
import PaymentOptions from "./PaymentOptions";
import { CircleUserRound } from "lucide-react";
import CustomerList from "./CustomerList";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";


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

const ProductsSection = () => {
  //fetching data for the sales table
  const { data: inventoryProductsData } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryProduct).then((res) => res),
    select: (findData) => findData?.data?.results,
  });
  
  const [searchValues, setSearchValues] = useState<string>("");
  const [data, setData] = useState(productData);
  const [orderList, setOrderList] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isOrderListVisible, setIsOrderListVisible] = useState(false);
  const [showCustomers, setShowCustomer] = useState(false);

  

  console.log(inventoryProductsData)

  useEffect(() => {
    if (inventoryProductsData) {
      setOrderList(inventoryProductsData);
    }
  }, [inventoryProductsData]);


  // Update quantity handler for both data and orderList
  const updateQuantity = (productName: string, delta: number) => {
    setData((prevData) =>
      prevData.map((product) =>
        product.name === productName
          ? { ...product, quantity: product.quantity + delta }
          : product
      )
    );

    setOrderList((prevOrderList) =>
      prevOrderList.map((product) =>
        product.name === productName
          ? { ...product, quantity: product.quantity + delta }
          : product
      )
    );
  };

  // Add to Order function that also ensures OrderList visibility
  const addToOrder = (product: Product) => {
    setOrderList((prevOrderList) => {
      const existingProduct = prevOrderList.find(
        (item) => item.name === product.name
      );
      if (existingProduct) {
        // Updating quantity if the product exists
        const updatedOrderList = prevOrderList.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity }
            : item
        );
        setOrderList(updatedOrderList);
      } else {
        // Adding a new product if it doesn't exist
        setOrderList([...prevOrderList, { ...product, quantity: product.quantity }]);
      }

      // Make sure OrderList is visible when items are added
      if (!isOrderListVisible) {
        setIsOrderListVisible(true);
      }

      return prevOrderList;
    });
  };

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValues(event.target.value);
  };

  useEffect(() => {
    const total = orderList.reduce(
      (sum, product) => sum + product.quantity * parseFloat(product.selling_price),
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
        />
      )}
    </div>
  );
};

export default ProductsSection;
