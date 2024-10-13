import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "./Columns";
import PaymentModal from "./PaymentModal";
import PaymentOptions from "./PaymentOptions";

interface OrderListProps {
  orderList: Product[];
  updateQuantity: (productName: string, delta: number) => void;
  totalPrice: number;
  onToggleOrderList: () => void; // Add prop for toggling visibility
}

const OrderList = ({
  orderList,
  updateQuantity,
  totalPrice,
  onToggleOrderList,
}: OrderListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)

  const handlePaymentOptions = () => {
    setShowPaymentOptions(true)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="grid gap-y-4">
      <div className="w-full h-fit pl-4 transition-all bg-white shadow-custom p-4 rounded-[8px]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Order List</h2>
          <FaMinus
            onClick={onToggleOrderList}
            className="cursor-pointer"
          />{" "}
          {/* Handle click */}
        </div>

        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2 border">Product Name</TableHead>
              <TableHead className="px-4 py-2 border">Quantity</TableHead>
              <TableHead className="px-4 py-2 border">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList.map((product) => (
              <TableRow key={product.productName} className="hover:bg-gray-100">
                <TableCell className="px-6 py-4 border-b">
                  {product.productName}
                </TableCell>
                <TableCell className="px-6 py-4 border-b">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(product.productName, -1)}
                      className="text-red-600 rounded-full border border-red-600 p-1"
                      disabled={product.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="px-4">{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.productName, 1)}
                      className="text-green-600 rounded-full border border-green-600 p-1"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 border-b">
                  {product.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Total Price */}
        <div className="mt-6 text-lg font-semibold flex items-center justify-between font-inter">
          <p className="text-[#858C95] font-normal text-sm">Total Price:</p>
          <span className="text-[#202224] font-bold text-xl">
            GHS: {totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-end gap-x-6 mt-6">
          <button className="border border-[#323539] rounded-[4px] py-2 px-8 text-[#323539] font-inter font-semibold text-sm">
            Clear Basket
          </button>
          <button
            onClick={handlePaymentOptions}
            className="bg-[#2648EA] rounded-[4px] py-2 px-8 text-white font-inter font-semibold text-sm"
          >
            Proceed to payment
          </button>
        </div>
      </div>

      {showPaymentOptions && <PaymentOptions /> }
    </div>
  );
};

export default OrderList;
