import AddProducts from "@/app/(dashboard)/inventory/_components/AddProductsModal";
import ImportProductsModal from "@/app/(dashboard)/inventory/_importProductsComponents/ImportProductsModal";
import React, { useState } from "react";
import Image from "next/image";

const ProductEmptyState = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isShowImport, setIsShowImport] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center font-inter">
        <Image
          src="/assets/images/emptyproduct.png"
          alt="Add Product Empty State"
          width={80}
          height={80}
        />
        <h2 className="font-bold text-xl mt-4">No products added yet</h2>
        <h2 className="w-[400px] text-center font-semibold">
          Click on
          <button
            className="text-blue-700 underline mx-2"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Add Individually
          </button>
          {/* 
        <AddProducts
          title="Add Product"
          setModal={() => setIsModalOpen(true)}
        />
        className="text-blue-700 underline" */}
          or{" "}
          {/* 
        <ImportProductsModal
          title="Import Products"
          className="text-blue-700 underline h-0"
          
        />*/}{" "}
          <button
            className="text-blue-700 underline mx-2"
            type="button"
            onClick={() => setIsShowImport(true)}
          >
            Import Products
          </button>
          to add products or view them here.
        </h2>
      </div>
      {isModalOpen && (
        <AddProducts
          title="Add Product"
          setModal={() => setIsModalOpen(false)}
        />
      )}
      {isShowImport && (
        <ImportProductsModal setModal={() => setIsShowImport(false)} />
      )}
    </>
  );
};

export default ProductEmptyState;
