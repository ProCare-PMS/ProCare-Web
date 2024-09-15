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
    accessorKey: "adjustmentId",
    header: "Transaction ID",
    cell: ({ getValue }) => `Receipt# ${getValue()}`,
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "quantity",
    header: "Quantity Sold",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => {
      const amount = getValue<number>();
      return `₵ ${new Intl.NumberFormat().format(amount)}`;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (value: any) => (
      <p className="rounded-3xl font-inter text-sm font-normal w-full">
        <span
          className={clsx(" rounded-3xl font-inter text-sm font-normal", {
            "text-[#219653] bg-[#21965314]  py-2 rounded-3xl px-3 ":
              value.getValue() === "Bank",
            "text-[#FFA70B] bg-[#FFA70B14] px-3  py-2":
              value.getValue() === "Insurance",
            "text-[#D34053] bg-[#D3405314] px-3 py-2 ":
              value.getValue() === `Cash`,

            "text-[#f5f83f] bg-[#ccaf0b14] px-2 py-2 ":
              value.getValue() === `Momo`,
          })}
        >
          {value.getValue()}
        </span>
      </p>
    ),
  },
  {
    id: "actions",
    cell: ActionsCell, // Ensure you have the ActionsCell defined elsewhere in your code
  },
];
