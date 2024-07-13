"use client";
import { useState } from "react";
import { PurchaseTabTable } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import DashboardModal from "../Modals/DashboardModal";

interface ActionsCellProps {
  row: {
    original: PurchaseTabTable;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const payment = row.original;
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<PurchaseTabTable | null>(null);

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
        <DashboardModal
          title="Transaction Details"
          item={selectedItem}
          setModal={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export const purchaseTabColumn: ColumnDef<PurchaseTabTable>[] = [
  {
    accessorKey: "purchaseId",
    header: "Purchase ID",
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
  },
  {
    accessorKey: "quantity",
    header: "Qunatity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
