"use client";
import { useState } from "react";
import { PurchaseTabTable } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import DashboardModal from "../Modals/DashboardModal";
import PurchasesTableModal from "../Modals/PurchasesTableModal";

interface ActionsCellProps {
  row: {
    original: PurchaseTabTable;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const payment = row.original;
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PurchaseTabTable | null>(
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
        <PurchasesTableModal
          item={selectedItem}
          setModal={() => setSelectedItem(null)}
        />
      )} 
    </div>
  );
};

export const purchasesTabColumns: ColumnDef<PurchaseTabTable>[] = [
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
    header: "Quantity",
  },
  {
    accessorKey: "unitPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("unitPrice"));
      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "ghs",
      }).format(amount);

      return <div className="!text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
