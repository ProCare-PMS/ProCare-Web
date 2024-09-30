"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import clsx from "clsx";

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
    accessorKey: "days",
    header: "Days at work",
  },
  {
    accessorKey: "time",
    header: "Time at work",
  },
  {
    accessorKey: "percentage",
    header: "Time at work (%)",
  },
  {
    accessorKey: "clockIn",
    header: "Clock-In",
  },
  {
    accessorKey: "clockOut",
    header: "Clock-Out",
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
