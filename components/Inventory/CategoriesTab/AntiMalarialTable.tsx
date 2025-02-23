import { ArrowLeft, X, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductsType } from "@/components/Tables/products-tab-columns";
//import { Product } from "@/components/POS/SalesPoint/ProductsSection/Columns";

interface AddCategoryTableProps {
  onClose: () => void;
  products: ProductsType[];
}

interface Product {
  productName: string;
  quantity: number;
  price: string;
}

const generateRandomProducts = (): Product[] => {
  const products = [
    { productName: "Paracetamol 250mg", quantity: 2, price: "20.0" },
    { productName: "Paracetamol 250mg", quantity: 1, price: "50.0" },
    { productName: "Paracetamol 250mg", quantity: 3, price: "15.0" },
  ];
  return products.map((product) => ({
    ...product,
    productName: `${product.productName} 5550`,
  }));
};

const AntiMalarialTable = ({ onClose, products }: AddCategoryTableProps) => {
  const [productsItem, setProducts] = useState<Product[]>();

  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px]">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold  font-inter">
            Anti-malarial Products
          </h2>
          <X onClick={onClose} className="cursor-pointer" />
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
              <TableRow key={product.name} className="hover:bg-gray-100">
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
                  <button className="text-blue-600">
                    <span>View</span>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end mt-8">
          <button className="border border-[#2648EA] text-[#2648EA] font-bold px-4 py-1 rounded-[6px] flex items-center gap-4">
            <Plus />
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AntiMalarialTable;
