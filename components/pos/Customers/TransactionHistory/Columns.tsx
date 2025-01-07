"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { useState } from "react";
import clsx from "clsx";
import { TransactionHistory } from "./Data";
import DashboardModal from "@/components/Modals/DashboardModal";

// Define the cell component with correct typing
const ActionsCell = ({ row }: CellContext<TransactionHistory, unknown>) => {
  const payment = row.original;
  const [selectedItem, setSelectedItem] = useState<TransactionHistory | null>(
    null
  );

  return (
    <div>
      <span
        className="text-[#2648EA] cursor-pointer font-semibold text-sm underline"
        onClick={() => setSelectedItem(payment)}
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

export const transactionHistoryColumns: ColumnDef<TransactionHistory>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
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
    accessorKey: "itemsSold",
    header: "Items Sold",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <p className="rounded-3xl font-inter text-sm font-normal">
          <span
            className={clsx("rounded-3xl font-inter text-sm font-normal", {
              "text-[#219653] bg-[#21965314] !w-[40px] py-2 rounded-3xl px-3":
                value === "Bank",
              "text-[#FFA70B] bg-[#FFA70B14] px-3 !w-[40px] py-2":
                value === "Momo",
              "text-[#D34053] bg-[#D3405314] px-3 !w-[40px] py-2":
                value === "Cash",
            })}
          >
            {value}
          </span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
