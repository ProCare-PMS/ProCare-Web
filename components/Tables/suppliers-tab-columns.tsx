"use client";

import { SuppliersTabTable } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect, useRef } from "react";
import { BiDotsVertical } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SuppliersCellProps {
  row: {
    original: SuppliersTabTable;
  };
}

const ProductActionCell = ({ row }: SuppliersCellProps) => {
  const [showAction, setShowAction] = useState(false);
  return (
    <div>
      {/*
    <div className="relative cursor-pointer transition">
      <BiDotsVertical onClick={() => setShowAction(!showAction)} />
      {showAction && (
        <div className="absolute bg-white w-[180px] shadow-md transition top-12 hover:shadow-lg right-0 z-20 rounded-[4px]">
          <div className="grid transition">
            <span className="py-2 px-3 text-[#344054]">View Details</span>
            <hr />
            <span className="py-2 px-3 text-[#344054]">Edit</span>
            <hr />
            <span className="py-2 px-3 text-[#344054]">Delete</span> 
          </div>
        </div>
      )}
    </div>
    */}
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
    </div>
  );
};

export const suppliersTabColumns: ColumnDef<SuppliersTabTable>[] = [
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "lastPurchase",
    header: "Last Purchase",
  },
  {
    accessorKey: "totalPurchase",
    header: "Total Purchase",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPurchase"));
      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "ghs",
      }).format(amount);

      return <div className="!text-left">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ProductActionCell,
  },
];
