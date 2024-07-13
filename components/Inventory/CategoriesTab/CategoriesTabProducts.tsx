import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LayoutGrid } from "lucide-react";
import { Products } from "@/lib/definition";
import ViewProductsSide from "../../../app/(dashboard)/inventory/_categoryProducts/ViewProductsSide";
import CategoriesTabSideBar from "./CategoriesTabSideBar";

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
];

const CategoriesTabProducts = () => {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-4 gap-7">
        {products.map((product) => (
          <div
            className="border border-[#D0D5DD] w-[260px] rounded-[8px] py-8 px-6"
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
              <span className="text-left text-[#2648EA] underline">
                <CategoriesTabSideBar />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesTabProducts;
