"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import TransactionDetails, {
  TransactionItem,
} from "../TransactionDetails/TransactionDetails";
import clsx from "clsx";

interface ActionsCellProps {
  row: {
    original: TransactionItem;
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
        <TransactionDetails
          title="Transaction Details"
          item={payment}
          setModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export const Columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ getValue }) => `Receipt# ${getValue()}`,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      // Explicitly cast the value to the expected type
      const user = (
        row.getValue("user") as { userName: string; email: string }[]
      )[0];

      return (
        <div>
          <span className="font-bold block">{user.userName}</span>
          <span className="text-sm text-gray-500 block">{user.email}</span>
        </div>
      );
    },
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
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => `₵  ${getValue()}`,
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
              value.getValue() === "Momo",
            "text-[#D34053] bg-[#D3405314] py-2 px-3":
              value.getValue() === `Cash`,

            "text-[#f5f83f] bg-[#ccaf0b14] px-2 py-2 ":
              value.getValue() === `Momos`,
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
