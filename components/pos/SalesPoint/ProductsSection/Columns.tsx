"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MoveRight, ArrowRight } from 'lucide-react';

export type Product = {
  productName: string;
  quantity: number;
  price: string;
};

// Pass the `updateQuantity` function as a prop so it can be used in the column definition
export const posProductsColumns = (
  updateQuantity: (productName: string, delta: number) => void,
  addProduct: (product: Product) => void
): ColumnDef<Product>[] => [
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }: { row: { original: Product } }) => (
      <div className="flex items-center space-x-2">
        <button
          className="text-red-600 rounded-full border border-red-600 p-1"
          onClick={() => updateQuantity(row.original.productName, -1)}
        >
          <FaMinus />
        </button>
        <div className="w-4 text-center">{row.original.quantity}</div>
        <button
          className="text-green-600  rounded-full border border-green-600 p-1"
          onClick={() => updateQuantity(row.original.productName, 1)}
        >
          <FaPlus />
        </button>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "ghs",
      }).format(amount);

      return <div className="!text-left ">{formatted}</div>;
    },
  },
  {
    id: "actions", // Custom column for actions
    header: "Actions",
    cell: ({ row }: { row: { original: Product } }) => (
      <button
        className="flex items-center space-x-2 text-white bg-[#2648EA] px-4 py-1 rounded-[20px]"
        onClick={() => addProduct(row.original)} // Trigger addProduct
      >
        <span className="font-semibold text-sm">ADD</span>
        <ArrowRight />
      </button>
    ),
  },
];
