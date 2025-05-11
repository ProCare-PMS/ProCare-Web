"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "@/api/Endpoints";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import customAxios from "@/api/CustomAxios";
import { ProductStockType } from "./prop";

interface ProductsCellProps {
  row: {
    original: ProductStockType;
  };
}

const ProductActionCell = ({ row }: ProductsCellProps) => {
  const [showAction, setShowAction] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductStockType | null>(
    null
  );
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (slug: string) => {
      const res = await customAxios.delete(
        `${endpoints.inventoryProduct}${slug}/`
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventoryProducts"] });
      SwalToaster("Products Deleted!", "success");
    },
    onError: (error) => {
      console.error("Error deleting supplier:", error);
      SwalToaster("Products not deleted", "error");
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
          <DropdownMenuItem onClick={() => mutate(row.original.slug)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {selectedItem && (
        <div>
          <p>Hello World</p>
        </div>
      )}
    </div>
  );
};

export const productsStockTabColumns: ColumnDef<ProductStockType>[] = [
  {
    accessorKey: "stock_number",
    header: "Stock Number",
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
    header: "Expected",
  },
  {
    accessorKey: "counted",
    header: "Counted",
  },
  {
    accessorKey: "difference",
    header: "Difference",
  },
  {
    accessorKey: "amount",
    header: "Net Amount",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ProductActionCell,
  },
];
