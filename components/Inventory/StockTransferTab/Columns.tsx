"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

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
      <span
        className="text-[#2648EA] cursor-pointer font-semibold text-sm underline"
        onClick={() => {
          setModal(true);
          setSelectedItem(payment);
        }}
      >
        View
      </span>
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
