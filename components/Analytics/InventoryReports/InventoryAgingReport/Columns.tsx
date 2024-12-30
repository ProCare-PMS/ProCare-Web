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

export const Columns: ColumnDef<any>[] = [
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
      } else if (expiryStatus === "Expired") {
        color = "text-red-500";
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
