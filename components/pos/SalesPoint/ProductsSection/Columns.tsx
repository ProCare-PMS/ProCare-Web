"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoveRight, ArrowRight } from "lucide-react";

export interface ProductsType {
  brand: string;
  category: string;
  cost_price: string;
  created_at: string;
  expiry_date: string;
  id: string;
  low_stock: boolean;
  manufacture_date: string | null;
  markup_percentage: string;
  modified_at: string;
  name: string;
  pharmacy: string;
  product_status: string;
  quantity: number;
  reorder_level: number;
  selling_price: string;
  slug: string;
  strength: string;
  supplier: string;
  unit: string;
  unit_price: string | null;
  
}

// Pass the `updateQuantity` function as a prop so it can be used in the column definition
export const posProductsColumns = (
  updateQuantity: (productName: string, delta: number) => void,
  addProduct: (product: ProductsType) => void
): ColumnDef<ProductsType>[] => [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }: { row: { original: ProductsType } }) => (
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
    cell: ({ row }: { row: { original: ProductsType } }) => (
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
