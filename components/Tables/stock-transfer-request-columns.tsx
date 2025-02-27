"use client";
import { useState } from "react";
import {
  StockTransferTable,
  StockTransferHistoryTable,
  StockTransferRequestsTable,
} from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { MoveRight } from "lucide-react";
import StockTransferHistoryModal from "../Modals/StockTransferHistoryModal";

interface ActionsCellProps {
  row: {
    original: StockTransferHistoryTable;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const payment = row.original;
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<StockTransferHistoryTable | null>(null);

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
        <StockTransferHistoryModal
          item={selectedItem}
          setModal={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export const stockTransferRequestColumns: ColumnDef<StockTransferRequestsTable>[] =
  [
    {
      accessorKey: "transferId",
      header: "Transfer ID",
    },
    {
      accessorKey: "requestedBy",
      header: "Reviewed By",
    },
    {
      accessorKey: "location",
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
    
  ];
