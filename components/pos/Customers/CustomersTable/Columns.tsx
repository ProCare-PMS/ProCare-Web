"use client";

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
import { CustomerPosTable } from "./Data";

interface CustomerCellProps {
  row: {
    original: CustomerPosTable;
  };
}

const CustomerActionCell = ({ row }: CustomerCellProps) => {
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

export const customersTabColumns: ColumnDef<CustomerPosTable>[] = [
  {
    accessorKey: "customerId",
    //header: "Product Name",
    header: "Customer ID",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
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
    id: "actions",
    header: "Actions",
    cell: CustomerActionCell,
  },
];
