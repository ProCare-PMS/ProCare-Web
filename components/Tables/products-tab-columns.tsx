"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import clsx from "clsx";
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

export interface ProductsType {
  brand: string;
  category: string;
  cost_price: string;
  created_at: string;
  expiry_date: string;
  id: string;
  low_stock: boolean;
  manufacture_date: string | null;
  markup_percentage: string;
  modified_at: string;
  name: string;
  pharmacy: string;
  product_status: string;
  quantity: number;
  reorder_level: number;
  selling_price: string;
  slug: string;
  strength: string;
  supplier: string;
  unit: string;
  unit_price: string | null;
  
}
interface ProductsCellProps {
  row: {
    original: ProductsType;
  };
}

const ProductActionCell = ({ row }: ProductsCellProps) => {
  const [showAction, setShowAction] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductsType | null>(null);
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
          <DropdownMenuItem
            onClick={() => mutate(row.original.slug)} 
          >
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
        day: "2-digit",
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
              "text-[#219653] bg-[#21965314] !w-[40px] py-2 rounded-3xl px-3":
                status === "Available",
              "text-[#D34053] bg-[#D3405314] !w-[40px] py-2 rounded-3xl px-3":
                status === "Unavailable",
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
