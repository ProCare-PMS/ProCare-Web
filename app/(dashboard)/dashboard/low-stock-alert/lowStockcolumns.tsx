import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import clsx from "clsx";

interface LowStockType {
  productName: string;
  unit: string;
  brand: string;
  quantity: number;
  date: string;
  restock_date: string;
}

export const lowStockColumns: ColumnDef<LowStockType>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    accessorFn: (row: any) => row?.name || "N/A", // Map `product.name` to `name`
  },
  {
    accessorKey: "unit",
    header: "Unit",
    accessorFn: (row: any) => row.unit || "N/A",
  },
  {
    accessorKey: "brand",
    header: "Brand",
    accessorFn: (row: any) => row.brand || "No Brand",
  },
  {
    accessorKey: "quantity",
    header: "Items Remaining",
    // accessorFn: (row: any) => row.quantity || 0,
    cell: ({ row }) => {
      return (
        <span className="rounded-3xl text-sm font-normal text-[#D34053] bg-[#D3405314] px-3 text-center mx-auto py-2">
          {row.original.quantity}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Last Restock Date",
    accessorFn: (row: any) => {
      if (!row.modified_at) return "N/A";
      const date = new Date(row.modified_at);
      return date.toLocaleDateString(); // Shows only date part
    },
  },
  {
    accessorKey: "restock_date",
    header: "Last Restock Time",
    accessorFn: (row: any) => {
      if (!row.modified_at) return "N/A";
      const date = new Date(row.modified_at);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }); // Shows only time part (e.g., "11:54 PM")
    },
  },
];
