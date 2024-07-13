"use client";

import { ProductsTabTable } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect, useRef  } from "react";
import { BiDotsVertical } from "react-icons/bi";

interface ProductsCellProps {
  row: {
    original: ProductsTabTable;
  };
}

const ProductActionCell = ({ row }: ProductsCellProps) => {
  const [showAction, setShowAction] = useState(false);
  return (
    <div className="relative cursor-pointer">
      <BiDotsVertical onClick={() => setShowAction(!showAction)} />
      {showAction && (
        <div className="absolute bg-white min-w-[180px] shadow-md transition top-12 hover:shadow-lg right-0 z-80 rounded-[4px]">
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
  );
};

export const productsTabColumns: ColumnDef<ProductsTabTable>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
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
