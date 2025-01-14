import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, X, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";

// Product Type
type Product = {
  id: number;
  name: string;
  quantity: number;
  selling_price: string;
  productName: string;
};

// Generate Random Products with Unique IDs
const generateRandomProducts = (): Product[] => {
  const products = [
    { id: 1, name: "Paracetamol 250mg", quantity: 2, selling_price: "20.0" },
    { id: 2, name: "Ibuprofen 400mg", quantity: 1, selling_price: "50.0" },
    { id: 3, name: "Aspirin 100mg", quantity: 3, selling_price: "15.0" },
  ];
  return products.map((product) => ({
    ...product,
    productName: `${product.name} 10223`,
  }));
};

// Modal Component
const PaymentModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [products, setProducts] = useState<Product[]>(generateRandomProducts());
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Payment Receipt",
  });

  const onPrintClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handlePrint();
  };

  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  const removeProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const totalPrice = products.reduce((total, product) => {
    return total + parseFloat(product.selling_price) * product.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={componentRef} className="bg-white p-6 rounded-lg shadow-lg w-[800px]">
        <div className="flex items-center gap-4 mb-6">
          <ArrowLeft onClick={onClose} className="cursor-pointer" />
          <h2 className="text-2xl font-bold font-inter">Payment Method</h2>
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
              <TableRow key={product.id} className="hover:bg-gray-100">
                <TableCell className="px-6 py-4 border-b">
                  {product.name}
                </TableCell>
                <TableCell className="px-6 py-4 border-b">
                  {product.quantity}
                </TableCell>
                <TableCell className="px-6 py-4 border-b">
                  GH₵{product.selling_price}
                </TableCell>
                <TableCell className="px-6 py-4 border-b">
                  <button
                    className="text-red-600"
                    onClick={() => removeProduct(product.id)}
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
              GH₵ {totalPrice}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-6 mt-7">
          <button className="border w-[150px] border-[#2648EA] text-[#2648EA] font-inter font-semibold text-sm py-2 px-4 rounded-[4px]">
            Hold Transaction
          </button>
          <button
            onClick={onPrintClick}
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