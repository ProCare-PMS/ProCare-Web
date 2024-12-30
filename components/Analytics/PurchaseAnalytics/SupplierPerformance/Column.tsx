"use client";

import { DashboardTransactions, dashboardTransactions } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import SupplierPerfomanceDetails, {
  AnaliticSupplierPerfromanceType,
} from "./SupplierPerfomanceDetails";

interface ActionsCellProps {
  row: {
    original: AnaliticSupplierPerfromanceType;
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
        <SupplierPerfomanceDetails
          title="Supplier Performance Details"
          item={payment}
          setModal={handleCloseModal}
        />
      )}
    </div>
  );
};
export const Columns: ColumnDef<AnaliticSupplierPerfromanceType>[] = [
  {
    accessorKey: "name",
    header: "Supplier Name",
    cell: (item) => item.getValue(),
  },
  {
    accessorKey: "quantity",
    header: "Quantity Sold",
    cell: (item) => item.getValue(),
  },
  {
    accessorKey: "reorder_level",
    header: "Delivery Frequency",
    cell: (item) => item.getValue(),
  },
  {
    accessorKey: "markup_percentage",
    header: "Order Accuracy(%)",
    cell: (item) => item.getValue(),
  },
  {
    accessorKey: "unit_price",
    header: "Amount",
    cell: ({ getValue }) => `₵ ${getValue()}`,
  },
  {
    id: "actions",
    cell: ActionsCell, // Ensure you have the ActionsCell defined elsewhere in your code
  },
];
