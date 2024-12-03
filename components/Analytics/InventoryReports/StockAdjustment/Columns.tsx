"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import StockAdjustMentDetails, {
  StockAdjustMentTypes,
} from "./StokeAdjustMentDetails";

interface ActionsCellProps {
  row: {
    original: StockAdjustMentTypes;
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
      {isModalOpen && (
        <StockAdjustMentDetails
          title="View Stock Adjustment"
          details={details}
          setModal={handleCloseModal} // Pass the selected row data to the modal
        />
      )}
    </div>
  );
};

export const Columns: ColumnDef<any>[] = [
  {
    accessorKey: "adjustmentId",
    header: "Adjustment ID",
    cell: ({ getValue }) => `adjustment# ${getValue()}`,
  },
  {
    accessorKey: "created_at",
    header: "Date",
  },
  {
    accessorKey: "created_at",
    header: "Time",
  },
  {
    accessorKey: "employee",
    header: "Personnel",
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
