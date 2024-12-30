"use client";

import { DashboardTransactions, dashboardTransactions } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import DashboardModal from "@/components/Modals/DashboardModal";
import clsx from "clsx";
import BestSellingProductDetails, {
  BestSellingProductType,
} from "./BestSellingProductDetails";

interface ActionsCellProps {
  row: {
    original: BestSellingProductType;
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
        <BestSellingProductDetails
          title="Best Selling Profits Details"
          item={payment}
          setModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export const Columns: ColumnDef<BestSellingProductType>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "batchId",
    header: "Batch ID",
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
    accessorKey: "manufacture_date",
    header: "Item Age",
    // cell: ({ row }) => {
    //   const itemValue = row?.getValue("manufacture_date");
    //   return itemValue.toDateString();
    // },
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
  },
];
