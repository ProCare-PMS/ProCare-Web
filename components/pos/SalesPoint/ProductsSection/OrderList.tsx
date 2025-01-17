import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, X } from "lucide-react";
import PaymentModal from "./PaymentModal";
import PaymentOptions from "./PaymentOptions";

export type Product = {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [quantityInputs, setQuantityInputs] = useState<{ [key: string]: string }>({});

  // Update quantity inputs whenever orderList changes
  useEffect(() => {
    const updatedInputs = orderList.reduce((acc, product) => {
      acc[product.name] = product.quantity.toString();
      return acc;
    }, {} as { [key: string]: string });
    setQuantityInputs(updatedInputs);
  }, [orderList]);

  useEffect(() => {
    localStorage.setItem('orderList', JSON.stringify(orderList));
  }, [orderList]);

  const handlePaymentOptions = () => {
    setShowPaymentOptions(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowPaymentOptions(false);
  };

  const handleRemoveItem = (productName: string) => {
    const product = orderList.find(p => p.name === productName);
    if (product) {
      updateQuantity(productName, -product.quantity);
      const newQuantityInputs = { ...quantityInputs };
      delete newQuantityInputs[productName];
      setQuantityInputs(newQuantityInputs);
    }
  };

  const handleQuantityChange = (productName: string, value: string) => {
    // Only allow numbers
    const sanitizedValue = value.replace(/[^\d]/g, '');
    
    // If empty, set to "1"
    const finalValue = sanitizedValue === '' ? '1' : sanitizedValue;
    
    // Update the input state
    setQuantityInputs(prev => ({
      ...prev,
      [productName]: finalValue
    }));

    // Find current product
    const product = orderList.find(p => p.name === productName);
    if (product) {
      const newQuantity = parseInt(finalValue);
      const delta = newQuantity - product.quantity;
      if (!isNaN(newQuantity) && newQuantity >= 1) {
        updateQuantity(productName, delta);
      }
    }
  };

  const handleIncreaseDecrease = (productName: string, delta: number) => {
    const product = orderList.find(p => p.name === productName);
    if (product && (product.quantity + delta >= 1)) {
      updateQuantity(productName, delta);
      // Update the input state immediately
      const newQuantity = (product.quantity + delta).toString();
      setQuantityInputs(prev => ({
        ...prev,
        [productName]: newQuantity
      }));
    }
  };

  const handleClearBasket = () => {
    localStorage.removeItem('orderList');
    onClearBasket();
    setQuantityInputs({});
  };

  const calculatedTotalPrice = orderList.reduce((total, product) => {
    return total + (parseFloat(product.selling_price) * product.quantity);
  }, 0);

  return (
    <div className="grid gap-y-4 w-[50%]">
      <div className="w-full h-fit pl-4 transition-all bg-white shadow-custom p-4 rounded-[8px]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4 font-inter text-[#202224]">
            Order List
          </h2>
          <FaMinus onClick={onToggleOrderList} className="cursor-pointer" />
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
                      disabled={product.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <input
                      type="text"
                      value={quantityInputs[product.name] || product.quantity}
                      onChange={(e) => handleQuantityChange(product.name, e.target.value)}
                      className="w-16 text-center border rounded-md p-1"
                      min="1"
                    />
                    <button
                      onClick={() => handleIncreaseDecrease(product.name, 1)}
                      className="text-green-600 rounded-full border border-green-600 p-1"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 border-b">
                  {product.selling_price}
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
          <p className="text-[#858C95] font-normal text-sm">Discount:</p>
          <div className="bg-[#0A77FF] rounded-[4px] p-2">
            <Plus className="text-white cursor-pointer" />
          </div>
        </div>

        <div className="mt-6 text-lg font-semibold flex items-center justify-between font-inter">
          <p className="text-[#858C95] font-normal text-sm">Total Price:</p>
          <span className="text-[#202224] font-bold text-xl">
            GHS: {calculatedTotalPrice.toFixed(2)}
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