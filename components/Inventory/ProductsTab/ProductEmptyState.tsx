import AddProducts from "@/app/(dashboard)/inventory/_components/AddProductsModal";
import ImportProductsModal from "@/app/(dashboard)/inventory/_importProductsComponents/ImportProductsModal";
import React, { useState } from "react";
import Image from "next/image";

const ProductEmptyState = () => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center font-inter">
       <Image
        src="/assets/images/emptyproduct.png"
        alt="Add Product Empty State"
        width={80}
        height={80}
      />
      <h2 className="font-bold text-xl mt-4">No products added yet</h2>
      <p className="w-[400px] text-center font-semibold">
        Click on
        <AddProducts title="Add Product" className="text-blue-700 underline" />
        or{" "}
        <ImportProductsModal
          title="Import Products"
          className="text-blue-700 underline"
        />{" "}
        to add products or view them here.
      </p>
    </div>
  );
};

export default ProductEmptyState;
