"use client";

import { DashboardTransactions, dashboardTransactions } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import DashboardModal from "../Modals/DashboardModal";
import clsx from "clsx";

export type Product = {
  name: string;
  quantity: number;
  price: string;
};

export type DashbaordModalType = {
  transactionId: string;
  date: string;
  time: string;
  itemsSold: number;
  amount: string;
  soldBy: string;
  type: string;
  status?: string;
  products: Product[];
};

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

export const dashboardTransactionColumns: ColumnDef<DashbaordModalType>[] = [
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
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "ghs",
      }).format(amount);

      return <div className="!text-left ">{formatted}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (value: any) => (
      <p className="rounded-3xl font-inter text-sm font-normal">
        <span
          className={clsx(" rounded-3xl font-inter text-sm font-normal", {
            "text-[#219653] bg-[#21965314] !w-[40px] py-2 rounded-3xl px-3 ":
              value.getValue() === "Bank",
            "text-[#FFA70B] bg-[#FFA70B14] px-3 !w-[40px] py-2":
              value.getValue() === "Momo",
            "text-[#D34053] bg-[#D3405314] px-3 !w-[40px] py-2 ":
              value.getValue() === "Cash",
          })}
        >
          {value.getValue()}
        </span>
      </p>
    ),
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
