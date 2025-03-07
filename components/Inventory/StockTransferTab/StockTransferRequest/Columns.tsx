"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { string } from "zod";
import { RequestsTransfers, requestsTransfers } from "./Data";
import StockRequestViewModal from "./StockRequestViewModal";

interface RequestProducts {
  name: string;
  price: string;
  quantity: number;
}
export interface RequestsType {
  id: string;
  transfer_id: string;
  requested_by: string;
  pharmacy_id: string;
  pharmacy_name: string;
  location: string;
  date: string;
  time: string;
  items: RequestProducts[];
}

interface ActionsCellProps {
  row: {
    original: RequestsTransfers;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const payment = row.original;
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RequestsTransfers | null>(
    null
  );

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
        <StockRequestViewModal
          item={selectedItem}
          setModal={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export const requestsColumns: ColumnDef<RequestsTransfers>[] = [
  {
    accessorKey: "transfer_id",
    header: "Transfer ID",
  },
  {
    accessorKey: "requested_by",
    header: "Requested By",
  },
  {
    accessorKey: "pharmacy_id",
    header: "Pharmacy Id",
  },
  {
    accessorKey: "location",
    header: "Location",
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
