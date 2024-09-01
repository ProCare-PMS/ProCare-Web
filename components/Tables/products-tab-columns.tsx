"use client";

import { ProductsTabTable } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect, useRef } from "react";
import { BiDotsVertical } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react"

interface ProductsCellProps {
  row: {
    original: ProductsTabTable;
  };
}

const ProductActionCell = ({ row }: ProductsCellProps) => {
  const [showAction, setShowAction] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BiDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-[150px] mr-12">
        <DropdownMenuItem>View Details</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const productsTabColumns: ColumnDef<ProductsTabTable>[] = [
  {
    accessorKey: "productName",
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
      )
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "brandName",
    header: "Brand",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("unitPrice"));
      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "ghs",
      }).format(amount);

      return <div className="!text-left ">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ProductActionCell,
  },
];
