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
import AddCategoryProduct from "./AddCategoryProduct";

interface AddCategoryTableProps {
  onClose: () => void;
  products: ProductsType[];
  slug: string;
  categoryName: string;
  categoryId: string;
}

interface Product {
  productName: string;
  quantity: number;
  price: string;
}

const AntiMalarialTable = ({
  onClose,
  products,
  slug,
  categoryName,
  categoryId,
}: AddCategoryTableProps) => {
  const [productsItem, setProducts] = useState<Product[]>();
  const [addProductModal, setAddProductModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  const showProductModal = () => {
    setAddProductModal(true);
  };

  const closeProductModal = () => {
    setAddProductModal(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    // Delay the actual closing to allow animation to complete
    setTimeout(() => {
      onClose();
    }, 300); // Match this with the transition duration
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isClosing ? "opacity-0" : "opacity-50"
        }`}
        onClick={handleClose}
      >
        {/* Empty div for backdrop */}
      </div>
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div
          className={`bg-white p-6 rounded-lg shadow-lg !w-[800px] pointer-events-auto transition-all duration-300 ease-in-out ${
            isClosing
              ? "opacity-0 scale-95 translate-y-4"
              : "opacity-100 scale-100 translate-y-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold font-inter">
              Anti-malarial Products
            </h2>
            <X
              onClick={handleClose}
              className="cursor-pointer hover:text-red-500 transition-colors duration-200"
            />
          </div>

          <Table className="w-full table-auto mt-3">
            <TableHeader className="bg-[#F1F4F9]">
              <TableRow>
                <TableHead className="px-4 py-2 border">Product Name</TableHead>
                <TableHead className="px-4 py-2 border">Quantity</TableHead>
                <TableHead className="px-4 py-2 border">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.name}
                  className="hover:bg-gray-100 transition-colors duration-150"
                >
                  <TableCell className="px-6 py-4 border-b">
                    {product.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 border-b">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="px-6 py-4 border-b">
                    GH₵{product.selling_price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end mt-8">
            <button
              onClick={showProductModal}
              className="border border-[#2648EA] text-[#2648EA] font-bold px-4 py-1 rounded-[6px] flex items-center gap-4 hover:bg-[#2648EA] hover:text-white transition-colors duration-200"
            >
              <Plus />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {addProductModal && (
        <AddCategoryProduct
          onProductClose={closeProductModal}
          slug={slug}
          categoryId={categoryId}
          categoryName={categoryName}
        />
      )}
    </>
  );
};

export default AntiMalarialTable;
