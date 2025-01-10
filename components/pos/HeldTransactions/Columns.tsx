"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { useState } from "react";
import clsx from "clsx";
import { HeldTransactions } from "./Data";

const ActionsCell = ({ row }: CellContext<HeldTransactions, unknown>) => {
  const payment = row.original;
  const [selectedItem, setSelectedItem] = useState<HeldTransactions | null>(
    null
  );

  return <div></div>;
};

export const heldTransactionsColumns: ColumnDef<HeldTransactions>[] = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <p className="rounded-3xl font-inter text-sm font-normal">
          <span
            className={clsx("rounded-3xl font-inter text-sm font-normal", {
              "text-[#219653] bg-[#21965314] !w-[40px] py-2 rounded-3xl px-3":
                value === "Completed",
              "text-[#D34053] bg-[#D3405314] px-3 !w-[40px] py-2":
                value === "On Hold",
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
