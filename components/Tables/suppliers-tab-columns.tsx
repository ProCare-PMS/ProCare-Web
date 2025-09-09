"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import customAxios from "@/api/CustomAxios";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "@/api/Endpoints";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import { CellContext } from "@tanstack/react-table";

// Updated interface to match the actual data structure
export interface SuppliersType {
  id: string;
  name: string;
  contact: string;
  email: string;
  total_purchase_quantity: number;
  last_purchase_date: string;
  total_purchase_amount: string;
}

// Updated action cell component to match CellContext type
const ProductActionCell = ({ cell }: CellContext<SuppliersType, unknown>) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const res = await customAxios.delete(
        `${endpoints.inventorySupplier}${id}/`
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      SwalToaster("Supplier Deleted!", "success");
    },
    onError: (error) => {
      console.error("Error deleting supplier:", error);
      SwalToaster("Supplier not deleted", "error");
    },
  });

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-[150px] mr-12">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => mutate(cell.row.original.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const suppliersTabColumns: ColumnDef<SuppliersType>[] = [
  {
    accessorKey: "name",
    header: "Supplier Name",
  },
  {
    accessorKey: "contact",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "total_purchase_quantity",
    header: "Quantity",
  },
  {
    accessorKey: "last_purchase_date",
    header: "Last Purchase",
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const rawDate: string = row.getValue("last_purchase_date");
      const formattedDate: string = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit", 
        day: "2-digit",
      }).format(new Date(rawDate));

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "total_purchase_amount",
    header: "Total Purchase",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_purchase_amount"));
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