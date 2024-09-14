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
    accessorKey: "name",
    header: "Supplier Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity Sold",
  },
  {
    accessorKey: "frequency",
    header: "Delivery Frequency",
  },
  {
    accessorKey: "accuracy",
    header: "Order Accuracy(%)",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => `$${getValue()}`,
  },
  {
    id: "actions",
    cell: ActionsCell, // Ensure you have the ActionsCell defined elsewhere in your code
  },
];
