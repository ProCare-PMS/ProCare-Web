import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LayoutGrid } from "lucide-react";
import { Products } from "@/lib/definition";
import ViewProductsSide from "../../../app/(dashboard)/inventory/_categoryProducts/ViewProductsSide";
import CategoriesTabSideBar from "./CategoriesTabSideBar";
import AddCategoryTable from "./AntiMalarialTable";
import AntiMalarialTable from "./AntiMalarialTable";

const products: Products[] = [
  {
    id: 1,
    productTitle: "Anti-malarials",
    products: [
      {
        id: 1,
        name: "Paracetamol - 500g",
        price: 1000,
        quantity: 1,
      },
      {
        id: 2,
        name: "Paracetamol - 500g",
        price: 1000,
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    productTitle: "Antihypertensives",
  },
  {
    id: 3,
    productTitle: "Cosmetics",
  },
  {
    id: 4,
    productTitle: "Cosmetics",
  },
  {
    id: 5,
    productTitle: "Cosmetics",
  },
  {
    id: 6,
    productTitle: "Cosmetics",
  },
  {
    id: 7,
    productTitle: "Cosmetics",
  },
  {
    id: 8,
    productTitle: "Cosmetics",
  },
  {
    id: 9,
    productTitle: "Cosmetics",
  },
  {
    id: 10,
    productTitle: "Cosmetics",
  },
];

const CategoriesTabProducts = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);


  const openCategoryTable = () => {
    setIsModalOpen(true)
  };

  const onClose = () => {
    setIsModalOpen(false);
  }


  return (
    <div className="mt-8">
      <div className="grid grid-cols-5 gap-8">
        {products.map((product) => (
          <div
            className="border border-[#D0D5DD] w-[230px] rounded-[8px] py-8 px-6"
            key={product.id}
          >
            <div className="flex justify-between mb-6">
              <div className="rounded-full bg-[#E8EBFF] p-2">
                <LayoutGrid className="text-[#2648EA]" />
              </div>
              <div>
                <HiDotsVertical className="text-[#475467]" />
              </div>
            </div>

            <div className="">
              <h1 className="text-[#344054] mb-2 font-inter font-semibold text-xl">
                Anti-malarials
              </h1>
              <span className="text-left text-[#2648EA] font-medium font-inter text-base cursor-pointer underline" onClick={openCategoryTable}>
                View 23 products
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <AntiMalarialTable  onClose={onClose} /> }
    </div>
  );
};

export default CategoriesTabProducts;
