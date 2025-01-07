"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomerPosTable } from "./Data";
import ViewCustomer from "../ViewCustomer/ViewCustomer";

interface CustomerCellProps {
  row: {
    original: CustomerPosTable;
  };
}

const CustomerActionCell = ({ row }: CustomerCellProps) => {
  const [showAction, setShowAction] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BiDotsVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-[150px] rounded-[6px] mr-12">
          <DropdownMenuItem
            onClick={() => setModal(true)}
            className="cursor-pointer font-semibold hover:!text-gray-700 p-2"
          >
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer p-2 font-semibold hover:!text-gray-700">
            Total Transactions
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer p-2 font-semibold hover:!text-gray-700">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {modal && <ViewCustomer setModal={() => setModal(false)} />}
    </>
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
