import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, X, Printer } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReactToPrint } from "react-to-print";
import { Product } from "./OrderList";
import { Customer } from "./CustomerList";

interface PaymentModalProps {
  onClose: () => void;
  title: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, title }) => {
  const [orderItems, setOrderItems] = useState<Product[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load order items and customer from localStorage
    const savedOrderList = localStorage.getItem("orderList");
    const savedCustomer = localStorage.getItem("selectedCustomer");

    if (savedOrderList) {
      setOrderItems(JSON.parse(savedOrderList));
    }
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }

    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Payment Receipt",
  });

  const removeProduct = (productName: string) => {
    setOrderItems((items) => items.filter((item) => item.name !== productName));
    // Update localStorage
    const updatedItems = orderItems.filter((item) => item.name !== productName);
    localStorage.setItem("orderList", JSON.stringify(updatedItems));
  };

  const totalPrice = orderItems.reduce((total, product) => {
    return total + parseFloat(product.selling_price) * product.quantity;
  }, 0);

  const handleFinalize = () => {
    // Clear localStorage after successful payment
    localStorage.removeItem("orderList");
    localStorage.removeItem("selectedCustomer");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={componentRef}
        className="bg-white p-6 rounded-lg shadow-lg w-[800px]"
      >
        <div className="flex items-center gap-4 mb-6">
          <ArrowLeft onClick={onClose} className="cursor-pointer" />
          <h2 className="text-2xl font-bold font-inter">Payment Method</h2>
        </div>

       

        <hr className="mb-5" />

        <div className="flex items-center gap-4">
          <div className="bg-[#2648EA] text-white rounded-[12px] py-2 px-4">
            <h2>{title}</h2>
          </div>
          {customer && (
            <div className="bg-[#2648EA] text-white rounded-[12px] py-2 px-4">
              {customer.full_name}
            </div>
          )}
        </div>

        <Table className="w-full table-auto mt-3">
          <TableHeader className="bg-[#F1F4F9]">
            <TableRow>
              <TableHead className="px-4 py-2 border">Product Name</TableHead>
              <TableHead className="px-4 py-2 border">Quantity</TableHead>
              <TableHead className="px-4 py-2 border">Price</TableHead>
              <TableHead className="px-4 py-2 border">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItems.map((product) => (
              <TableRow key={product.name} className="hover:bg-gray-100">
                <TableCell className="px-6 py-4 border-b">
                  {product.name}
                </TableCell>
                <TableCell className="px-6 py-4 border-b">
                  {product.quantity}
                </TableCell>
                <TableCell className="px-6 py-4 border-b">
                  GH₵{(parseFloat(product.selling_price) * product.quantity).toFixed(2)}
                </TableCell>
                <TableCell className="px-6 py-4 border-b">
                  <button
                    className="text-red-600"
                    onClick={() => removeProduct(product.name)}
                    aria-label={`Remove ${product.name}`}
                  >
                    <X />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end font-inter mt-5">
          <div className="flex flex-col gap-y-1">
            <p className="text-sm font-normal text-[#858C95]">TOTAL PRICE</p>
            <span className="text-2xl font-bold font-inter">
              GH₵ {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-6 mt-7">
          <button className="border w-[150px] border-[#2648EA] text-[#2648EA] font-inter font-semibold text-sm py-2 px-4 rounded-[4px]">
            Hold Transaction
          </button>
          <button
            onClick={() => handlePrint()}
            className="border w-[150px] border-[#2648EA] flex items-center justify-center gap-1 text-[#2648EA] font-inter font-semibold text-sm py-2 px-4 rounded-[4px]"
          >
            <Printer className="w-4" />
            Print
          </button>
          <button className="py-2 px-4 w-[150px] rounded-[4px] bg-[#2648EA] text-white text-sm font-inter font-semibold">
            Finalize Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
