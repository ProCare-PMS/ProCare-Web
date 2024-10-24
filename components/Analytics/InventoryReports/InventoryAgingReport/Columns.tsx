"use client";

import { DashboardTransactions, dashboardTransactions } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import DashboardModal from "@/components/Modals/DashboardModal";
import clsx from "clsx";

interface ActionsCellProps {
  row: {
    original: DashboardTransactions;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const payment = row.original;
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<DashboardTransactions | null>(null);

  return (
    <div>
      <span
        className="text-[#2648EA] cursor-pointer font-semibold text-sm underline"
        onClick={() => {
          setModal(true);
          setSelectedItem(payment);
        }}
      >
        View
      </span>
      {selectedItem && (
        <DashboardModal
          title="Transaction Details"
          item={selectedItem}
          setModal={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export const Columns: ColumnDef<any>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    size: 900,
  },
  {
    accessorKey: "batchId",
    header: "Batch ID",
    size: 100,
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "brandName",
    header: "Brand Name",
  },
  {
    accessorKey: "itemAge",
    header: "Item Age",
  },
  {
    accessorKey: "expiryStatus",
    header: "Expiry Status",
    cell: ({ row }) => {
      const expiryStatus = row.getValue("expiryStatus");

      // Type guard to check if expiryStatus is a string
      if (typeof expiryStatus !== "string") {
        return <div className="text-black">Unknown</div>;
      }

      let color = "text-black"; // default color

      if (expiryStatus.includes("week")) {
        color = "text-red-500";
      } else if (expiryStatus.includes("month")) {
        color = "text-yellow-500";
      } else if (expiryStatus.includes("year")) {
        color = "text-green-500";
      }

      return <div className={clsx(color)}>{expiryStatus}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    id: "actions",
    cell: ActionsCell,
    size: 40,
  },
];
