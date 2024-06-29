import { Products } from "@/lib/definition";
import React from "react";
import ViewProductsSide from "./ViewProductsSide";
import { HiDotsVertical } from "react-icons/hi";
import { LayoutGrid } from "lucide-react";

const products: Products = [
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
    ],
  },
];

const CategoryProducts = () => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        <div className="border border-[#D0D5DD] w-[258px] rounded-[8px] py-8 px-6">
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
            <span className="text-left">
              <ViewProductsSide />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
