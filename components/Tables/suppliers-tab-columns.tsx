"use client";

import { SuppliersTabTable } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect, useRef } from "react";
import customAxios from "@/api/CustomAxios";
import { Ellipsis } from "lucide-react"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "@/api/Endpoints";
import SwalToaster from "@/components/SwalToaster/SwalToaster";

interface SuppliersCellProps {
  row: {
    original: SuppliersTabTable;
  };
}

const ProductActionCell = ({ row }: SuppliersCellProps) => {
  const [showAction, setShowAction] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    // Destructure mutate from the result
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
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-[150px] mr-12">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => mutate(row.original.id)} 
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const suppliersTabColumns: ColumnDef<SuppliersTabTable>[] = [
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
