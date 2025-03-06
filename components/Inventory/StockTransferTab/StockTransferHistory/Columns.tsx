"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { string } from "zod";
import { HistoryTransfers, historyTransfers } from "./Data";
import StockTransferViewModal from "./StockTransferViewModal";

interface HistoryProducts {
  name: string;
  price: string;
  quantity: number;
  reason?: string;
  status: string;
}

export interface HistoryType {
  id: string;
  transfer_id: string;
  reviewed_by: string;
  pharmacy_id: string;
  pharmacy_name: string;
  location: string;
  date: string;
  items: HistoryProducts[];
  time: string;
  contact: string;
}

interface ActionsCellProps {
  row: {
    original: HistoryType;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const payment = row.original;
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HistoryType | null>(null);

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
        <StockTransferViewModal
          item={selectedItem}
          setModal={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export const historyColumns: ColumnDef<HistoryTransfers>[] = [
  {
    accessorKey: "transfer_id",
    header: "Transfer ID",
  },
  {
    accessorKey: "reviewed_by",
    header: "Reviewed By",
  },
  {
    accessorKey: "contact",
    header: "Contact",
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell key={row.original.transfer_id} row={row} />,
  },
];
