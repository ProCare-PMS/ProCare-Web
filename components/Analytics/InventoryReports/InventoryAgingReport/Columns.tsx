"use client";

import { DashboardTransactions, dashboardTransactions } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import DashboardModal from "@/components/Modals/DashboardModal";
import clsx from "clsx";
import InventoryAgingReportsDetails, {
  AgingReportType,
} from "./InventoryAgingReportsDetails";


interface ActionsCellProps {
  row: {
    original: AgingReportType;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const payment = row.original;
  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div>
      <span
        className="text-[#2648EA] cursor-pointer font-semibold text-sm underline"
        onClick={handleOpenModal}
      >
        View
      </span>
      {modal && (
        <InventoryAgingReportsDetails
          title="Aging Reports Details"
          item={payment}
          setModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export const Columns: ColumnDef<AgingReportType>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
    size: 900,
  },
  {
    accessorKey: "batch_id", 
    header: "Batch ID",
    size: 100,
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "brand",
    header: "Brand Name",
  },
  {
    accessorKey: "item_age",
    header: "Item Age",
  },
  {
    accessorKey: "expiry_status",
    header: "Expiry Status",
    cell: ({ row }) => {
      const expiryStatus = row.getValue("expiry_status");

      if (typeof expiryStatus !== "string") {
        return <div className="text-black">Unknown</div>;
      }

      // Extract number of months if present
      const monthsMatch = expiryStatus.match(/(\d+)\s*Months?/);
      const months = monthsMatch ? parseInt(monthsMatch[1]) : null;

      let colorClass = "";

      if (expiryStatus === "Expired") {
        colorClass = "text-red-500 bg-red-50";
      } else if (months !== null) {
        if (months <= 3 && months >= 2) {
          colorClass = "text-yellow-500 bg-yellow-50";
        } else if (months >= 4 && months <= 7) {
          colorClass = "text-blue-500 bg-blue-50";
        } else if (months >= 8) {
          colorClass = "text-green-500 bg-green-50";
        } else if (months < 2) {
          colorClass = "text-red-500 bg-red-50";
        }
      }

      return (
        <div className={clsx("px-3 py-2  rounded-[8px] inline-block", colorClass)}>
          {expiryStatus}
        </div>
      );
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
