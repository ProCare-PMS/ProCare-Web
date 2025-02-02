import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, X, Minus } from "lucide-react";
import PaymentOptions from "./PaymentOptions";

export type Product = {
  id?: string;
  name: string;
  quantity: number;
  selling_price: string;
};

interface OrderListProps {
  orderList: Product[];
  updateQuantity: (productName: string, delta: number) => void;
  totalPrice: number;
  onToggleOrderList: () => void;
  onClearBasket: () => void;
}

const OrderList = ({
  orderList,
  updateQuantity,
  totalPrice,
  onToggleOrderList,
  onClearBasket,
}: OrderListProps) => {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [quantityInputs, setQuantityInputs] = useState<{
    [key: string]: string;
  }>({});
  const [discount, setDiscount] = useState(() => {
    const savedDiscount = localStorage.getItem("discount");
    return savedDiscount ? parseFloat(savedDiscount) : 0;
  });

  // Update quantity inputs whenever orderList changes
  useEffect(() => {
    const updatedInputs = orderList.reduce((acc, product) => {
      acc[product.name] = product.quantity.toString();
      return acc;
    }, {} as { [key: string]: string });
    setQuantityInputs(updatedInputs);
  }, [orderList]);

  //Anytime the order list changes, the useEffect runs because of the dependency array
  useEffect(() => {
    localStorage.setItem("orderList", JSON.stringify(orderList));
  }, [orderList]);

  useEffect(() => {
    localStorage.setItem("discount", JSON.stringify(discount));
  }, [discount]);

  //handling the discount change
  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //checking if the discount value has been set in the form
    const value = event.target.value ? parseFloat(event.target.value) : 0;
    setDiscount(value);
  };

  const handleQuantityChange = (productName: string, value: string) => {
    // Allow empty value to let the user clear input
    if (value === "") {
      setQuantityInputs((prev) => ({
        ...prev,
        [productName]: "",
      }));
      return;
    }

    // Sanitize input to allow only numbers
    const sanitizedValue = value.replace(/[^\d]/g, "");
    setQuantityInputs((prev) => ({
      ...prev,
      [productName]: sanitizedValue,
    }));

    const newQuantity = parseInt(sanitizedValue, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      const product = orderList.find((p) => p.name === productName);
      if (product) {
        const delta = newQuantity - product.quantity;
        updateQuantity(productName, delta);
      }
    }
  };

  const handleIncreaseDecrease = (productName: string, delta: number) => {
    const product = orderList.find((p) => p.name === productName);
    if (product) {
      updateQuantity(productName, delta);

      // Update the input state
      const newQuantity = (product.quantity + delta).toString();
      setQuantityInputs((prev) => ({
        ...prev,
        [productName]: newQuantity,
      }));
    }
  };

  const handleRemoveItem = (productName: string) => {
    updateQuantity(productName, -Infinity); // This will now properly remove the item
    
    // Clean up the quantity inputs state
    setQuantityInputs((prev) => {
      const newInputs = { ...prev };
      delete newInputs[productName];
      return newInputs;
    });
  };

  const handlePaymentOptions = () => {
    setShowPaymentOptions(true);
  };

  const handleClearBasket = () => {
    onClearBasket();  
    setQuantityInputs({});
    setDiscount(0);
    localStorage.removeItem("discount");
  };

  const calculatedTotalPrice = orderList.reduce((total, product) => {
    return total + parseFloat(product.selling_price) * product.quantity;
  }, 0);

  const finalPrice = calculatedTotalPrice - discount;

  return (
    <div className="grid gap-y-4 w-[50%]">
      <div className="w-full h-fit pl-4 transition-all bg-white shadow-custom p-4 rounded-[8px]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4 font-inter text-[#202224]">
            Order List
          </h2>
          <div className="border-[2px] border-[#2648EA] rounded-full p-1 cursor-pointer">
            <Minus onClick={onToggleOrderList} className="cursor-pointer" />
          </div>
        </div>

        <Table className="w-full table-auto h-full">
          <TableHeader>
            <TableRow className="bg-[#F1F4F9] font-inter p-1 w-full !rounded-[60px] hover:bg-[#dbdee2]">
              <TableHead className="px-4 py-2">Product Name</TableHead>
              <TableHead className="px-4 py-2">Quantity</TableHead>
              <TableHead className="px-4 py-2">Price</TableHead>
              <TableHead className="px-4 py-2">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList.map((product) => (
              <TableRow key={product.name} className="hover:bg-gray-100">
                <TableCell className="px-4 py-4 border-b">
                  {product.name}
                </TableCell>
                <TableCell className="px-4 py-4 border-b">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleIncreaseDecrease(product.name, -1)}
                      className="text-red-600 rounded-full border border-red-600 p-1"
                    >
                      <Minus />
                    </button>
                    <input
                      type="text"
                      min={0}
                      value={quantityInputs[product.name] ?? product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(product.name, e.target.value)
                      }
                      className="w-16 text-center border rounded-md p-1"
                    />
                    <button
                      onClick={() => handleIncreaseDecrease(product.name, 1)}
                      className="text-green-600 rounded-full border border-green-600 p-1"
                    >
                      <Plus />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 border-b">
                  GH₵
                  {(
                    parseFloat(product.selling_price) * product.quantity
                  ).toFixed(2)}
                </TableCell>
                <TableCell className="px-4 py-4 border-b">
                  <button
                    className="text-red-600"
                    onClick={() => handleRemoveItem(product.name)}
                    aria-label={`Remove ${product.name}`}
                  >
                    <X />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 flex item-center justify-between">
          <p className="text-[#858C95] font-normal text-sm">DISCOUNT:</p>
          <div
            className={`flex gap-2 border-2 p-2 rounded-[4px] ${
              isFocused ? "border-[#2648EA]" : "border-gray-300"
            }`}
          >
            ₵
            <input
              type="number"
              name="discount"
              id="discount"
              value={discount || ""}
              min={0}
              onChange={handleDiscountChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="outline-none"
            />
          </div>
        </div>

        <div className="mt-6 text-lg font-semibold flex items-center justify-between font-inter">
          <p className="text-[#858C95] font-normal text-sm">TOTAL PRICE:</p>
          <span className="text-[#202224] font-bold text-xl">
            GHS: {finalPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-end gap-x-6 mt-6">
          <button
            onClick={handleClearBasket}
            className="border border-[#323539] flex-1 rounded-[4px] py-2 px-8 text-[#323539] font-inter font-semibold text-sm"
          >
            Clear Basket
          </button>
          <button
            onClick={handlePaymentOptions}
            className="bg-[#2648EA] rounded-[4px] flex-1 py-2 px-8 text-white font-inter font-semibold text-sm"
          >
            Proceed to payment
          </button>
        </div>
      </div>

      {showPaymentOptions && <PaymentOptions />}
    </div>
  );
};

export default OrderList;
