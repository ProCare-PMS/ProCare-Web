"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect, useRef } from "react";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import clsx from "clsx";

interface ProductsType {
  name: string;
  unit: string;
  brand: string;
  quantity: number;
  expiry_date: string;
  unitPrice: string;
  product_status: string;
  category: string;
  reorder_evel: number;
  productDetails?: {
    batchNo: string;
    productQuantity: number;
    productExpiry: string;
    productPrice: number;
  };
}
interface ProductsCellProps {
  row: {
    original: ProductsType;
  };
}

const ProductActionCell = ({ row }: ProductsCellProps) => {
  const item = row.original;
  const [showAction, setShowAction] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductsType | null>(null);

  return (
    <div>
      <div className="relative cursor-pointer">
        <Ellipsis onClick={() => setShowAction(!showAction)} />
        {showAction && (
          <div className="absolute !bg-white min-w-[180px] z-50 shadow-md transition top-12 hover:shadow-lg right-0 z-80 rounded-[4px]">
            <div className="grid transition">
              <button className="py-2 px-3 text-[#344054]">View Details</button>
              <hr />
              <button className="py-2 px-3 text-[#344054]">Delete</button>
            </div>
          </div>
        )}
      </div>
      {selectedItem && (
        <div>
          <p>Hello World</p>
        </div>
      )}
    </div>
  );
};

export const productsTabColumns: ColumnDef<ProductsType>[] = [
  {
    accessorKey: "name",
    //header: "Product Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "expiry_date",
    header: "Expiry Date",
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const rawDate: string = row.getValue("expiry_date");
      const formattedDate: string = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date(rawDate));

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "selling_price",
    header: "Unit Price",
    cell: ({ row }) => {
      const value = row.getValue("selling_price");
      // Convert string to number and handle invalid/empty values
      const amount = typeof value === "string" ? parseFloat(value) : 0;

      if (isNaN(amount)) {
        return <div className="!text-left">GHS 0.00</div>;
      }

      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
      }).format(amount);

      return <div className="!text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "product_status",
    header: "Status",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      const status = quantity > 0 ? "Available" : "Unavailable";
  
      return (
        <p className="rounded-3xl font-inter text-sm font-normal">
          <span
            className={clsx("rounded-3xl px-3 py-2", {
              "text-[#219653] bg-[#21965314] !w-[40px] py-2 rounded-3xl px-3": status === "Available",
              "text-[#D34053] bg-[#D3405314] !w-[40px] py-2 rounded-3xl px-3": status === "Unavailable",
            })}
          >
            {status}
          </span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ProductActionCell,
  },
];
