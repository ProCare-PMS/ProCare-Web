"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { pharmacyExpenseType } from "../prop";

interface ActionsCellProps {
  row: {
    original: pharmacyExpenseType;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const details = row.original;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <span
        className="text-[#2648EA] cursor-pointer font-semibold text-sm underline"
        onClick={handleOpenModal}
      >
        View
      </span>
      {isModalOpen && <div></div>}
    </div>
  );
};

export const Columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Expense Name",
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
    cell: ({ getValue }) => `₵ ${getValue()}`,
  },
  {
    accessorKey: "aditionalInfo",
    header: "Amount",
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
