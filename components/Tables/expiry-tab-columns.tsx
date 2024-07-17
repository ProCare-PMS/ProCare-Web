"use client";

import { ExpiryReportTable } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect, useRef } from "react";
import { BiDotsVertical } from "react-icons/bi";
import clsx from "clsx";

interface ExpiryCellProps {
  row: {
    original: ExpiryReportTable;
  };
}

const ExpiryActionCell = ({ row }: ExpiryCellProps) => {
  const [showAction, setShowAction] = useState(false);
  return (
    <div className="relative cursor-pointer">
      <BiDotsVertical onClick={() => setShowAction(!showAction)} />
      {showAction && (
        <div className="absolute bg-blue-500 min-w-[180px] z-50 shadow-md transition top-12 hover:shadow-lg right-0 z-80 rounded-[4px]">
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

export const expiryTabColumns: ColumnDef<ExpiryReportTable>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
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
    accessorKey: "expiryDate",
    header: "Expiry Date",
  },
  {
    accessorKey: "expiryStatus",
    header: "Expiry Status",
    cell: (value: any) => (
      <p className="rounded-3xl font-inter text-sm font-normal">
        <span
          className={clsx(" rounded-3xl font-inter text-sm font-normal", {
            "text-[#219653] bg-[#21965314] !w-[40px] py-2 rounded-3xl px-3 ":
              value.getValue() === "6+ Months",
            "text-[#FFA70B] bg-[#FFA70B14] px-3 !w-[40px] py-2":
              value.getValue() === "<3 Months",
            "text-[#D34053] bg-[#D3405314] px-3 !w-[40px] py-2 ":
              value.getValue() === "Expired",
            "text-[#2648EA] bg-[#E8EBFF] px-3 !w-[40px] py-2 ":
              value.getValue() === "3-6 Months",
          })}
        >
          {value.getValue()}
        </span>
      </p>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    id: "actions",
    cell: ExpiryActionCell,
  },
];
