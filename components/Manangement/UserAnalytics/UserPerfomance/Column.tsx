"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

interface ActionsCellProps {
  row: {
    original: any[];
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
      {/* {modal && (
        <TransactionDetails
          title="Transaction Details"
          item={payment}
          setModal={handleCloseModal}
        />
      )} */}
    </div>
  );
};

export const Columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "User Name",
  },
  {
    accessorKey: "volume",
    header: "Transaction Volume",
  },
  {
    accessorKey: "itemSold",
    header: "Item Sold",
  },
  {
    accessorKey: "worktime",
    header: "Work Time",
  },
  {
    accessorKey: "rating",
    header: () => (
      <div className="flex gap-1 w-full items-center whitespace-nowrap">
        <span>Customer Satisfaction</span>
      </div>
    ),
  },

  {
    id: "actions",
    cell: ActionsCell,
  },
];
