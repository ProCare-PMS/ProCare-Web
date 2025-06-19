"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoveRight } from "lucide-react";
import StockTransferListModal from "@/components/Modals/StockTransferListModal";
import { Button } from "@/components/ui/button";

export interface OtherPharmaciesType {
  id: string;
  pharmacy_id: string;
  pharmacy_name: string;
  location: string;
  contact: string;
}

interface ActionsCellProps {
  row: {
    original: OtherPharmaciesType;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const payment = row.original;
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OtherPharmaciesType | null>(
    null
  );

  return (
    <div>
      <Button
        type="button"
        className="text-white relative flex items-center gap-2 rounded-[20px] py-2 px-6 font-inter"
        variant="secondary"
        onClick={() => {
          setModal(true);
          setSelectedItem(payment);
        }}
      >
        View
        <MoveRight  />
      </Button>

      {selectedItem && (
        <StockTransferListModal
          item={selectedItem}
          setModal={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export const otherPharmaciesColumns: ColumnDef<OtherPharmaciesType>[] = [
  {
    accessorKey: "pharmacy_id",
    header: "Pharmacy ID",
  },
  {
    accessorKey: "pharmacy_name",
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
    cell: ({ row }) => <ActionsCell key={row.original.id} row={row} />,
  },
];
