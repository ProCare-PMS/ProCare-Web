"use client";
import { useState } from "react";
import { StockTransferTable } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { MoveRight } from 'lucide-react';
import StockTransferModal from "../Modals/StockTransferModal";

interface ActionsCellProps {
  row: {
    original: StockTransferTable;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const payment = row.original;
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockTransferTable | null>(
    null
  );

  return (
    <div>
      <span
        className="bg-[#2648EA] flex items-center gap-1 w-[80px] px-4 py-1 rounded-[16px] text-white cursor-pointer font-semibold text-sm"
        onClick={() => {
          setModal(true);
          setSelectedItem(payment);
        }}
      >
        View
        <MoveRight size={25} />
      </span>
      {selectedItem && (
        <StockTransferModal
          item={selectedItem}
          setModal={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export const stockTransferColumns: ColumnDef<StockTransferTable>[] = [
  {
    accessorKey: "pharmacyId",
    header: "Pharmacy ID",
    
  },
  {
    accessorKey: "pharmacyName",
    header: "Pharmacy Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionsCell,
  },
];
