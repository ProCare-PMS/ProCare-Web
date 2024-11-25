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
import { Product } from "./Columns";
import { ArrowLeft, X } from "lucide-react";

const generateRandomProducts = (): Product[] => {
  const products = [
    { productName: "Paracetamol 250mg", quantity: 2, price: "20.0" },
    { productName: "Paracetamol 250mg", quantity: 1, price: "50.0" },
    { productName: "Paracetamol 250mg", quantity: 3, price: "15.0" },
  ];
  return products.map((product) => ({
    ...product,
    productName: `${product.productName} 10223`,
  }));
};

// Modal Component
const PaymentModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [products, setProducts] = useState<Product[]>(generateRandomProducts());

  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  const removeProduct = (productName: string) => {
    setProducts(
      products.filter((product) => product.productName !== productName)
    );
  };

  const totalPrice = products.reduce((total, product) => {
    return total + parseFloat(product.price) * product.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px]">
        <div className="flex items-center gap-4 mb-6">
          <ArrowLeft onClick={onClose} className="cursor-pointer" />
          <h2 className="text-2xl font-bold  font-inter">Payment Method</h2>
        </div>
        <hr className="mb-5" />
        <div className="flex items-center gap-4">
          <div className="bg-[#2648EA] text-white rounded-[12px] py-2 px-4">
            Credit card
          </div>
          <div className="bg-[#2648EA] text-white rounded-[12px] py-2 px-4">
            Hatake Kakashi
          </div>
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
            {products.map((product) => (
              <TableRow key={product.productName} className="hover:bg-gray-100">
                <TableCell className="px-6 py-4 border-b">
                  {product.productName}
                </TableCell>
                <TableCell className="px-6 py-4 border-b">
                  {product.quantity}
                </TableCell>
                <TableCell className="px-6 py-4 border-b">
                  GH₵{product.price}
                </TableCell>
                <TableCell className="px-6 py-4 border-b">
                  <button
                    className="text-red-600"
                    onClick={() => removeProduct(product.productName)}
                  >
                    <X />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex  justify-end font-inter mt-5">
          <div className="flex flex-col gap-y-1">
            <p className="text-sm font-normal text-[#858C95]">TOTAL PRICE</p>
            <span className="text-2xl font-bold font-inter">
              GH₵ {totalPrice}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-6 mt-7">
          <button className="border border-[#2648EA] text-[#2648EA] font-inter font-semibold text-sm py-2 px-4 rounded-[4px]">
            Hold Transaction
          </button>
          <button className="py-2 px-4 rounded-[4px] bg-[#2648EA] text-white text-sm font-inter font-semibold">
            Finalize Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
