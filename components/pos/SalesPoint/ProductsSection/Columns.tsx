"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MoveRight, ArrowRight } from "lucide-react";

export type Product = {
  name: string;
  quantity: number;
  selling_price: string;
};

// Pass the `updateQuantity` function as a prop so it can be used in the column definition
export const posProductsColumns = (
  updateQuantity: (productName: string, delta: number) => void,
  addProduct: (product: Product) => void
): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }: { row: { original: Product } }) => (
      <div className="">
        <div className="">{row.original.quantity}</div>
      </div>
    ),
  },
  {
    accessorKey: "selling_price",
    header: "Unit Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("selling_price"));
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
