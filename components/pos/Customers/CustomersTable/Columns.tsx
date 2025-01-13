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

export interface CustomerType {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  gender: string;
  birth_date: string;
  height: string;
  weight: string;
  blood_type: string;
  blood_pressure: string;
  allergies: string;
  chronic_conditions: string;
  med_info_product: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
  additional_info: string;
  age: string;
}

interface CustomerCellProps {
  row: {
    original: CustomerType;
  };
}

const CustomerActionCell = ({ row }: CustomerCellProps) => {
  const payment = row.original;
  const [showAction, setShowAction] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CustomerType | null>(null);

  console.log();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BiDotsVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-[150px] rounded-[6px] mr-12">
          <DropdownMenuItem
            onClick={() => {
              setModal(true);
              setSelectedItem(payment);
            }}
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

      {modal && (
        <ViewCustomer item={selectedItem} setModal={() => setModal(false)} />
      )}
    </>
  );
};

export const customersTabColumns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "id",
    //header: "Product Name",
    header: "Customer ID",
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "phone_number",
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
