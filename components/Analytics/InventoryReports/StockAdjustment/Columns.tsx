"use client";

import { DashboardTransactions, dashboardTransactions } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import DashboardModal from "@/components/Modals/DashboardModal";
import clsx from "clsx";

interface ActionsCellProps {
  row: {
    original: DashboardTransactions;
  };
}

// const ActionsCell = ({ row }: ActionsCellProps) => {
//   const payment = row.original;
//   const [modal, setModal] = useState(false);
//   const [selectedItem, setSelectedItem] =
//     useState<DashboardTransactions | null>(null);

//   return (
//     <div className="w-3">
//       <span
//         className="text-[#2648EA] cursor-pointer font-semibold text-sm underline"
//         onClick={() => {
//           setModal(true);
//           setSelectedItem(payment);
//         }}
//       >
//         View
//       </span>
//       {selectedItem && (
//         <DashboardModal
//           title="Transaction Details"
//           item={selectedItem}
//           setModal={() => setSelectedItem(null)}
//         />
//       )}
//     </div>
//   );
// };

export const Columns: ColumnDef<any>[] = [
  {
    accessorKey: "adjustmentId",
    header: "Adjustment ID",
    cell: ({ getValue }) => `adjustment# ${getValue()}`,
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
    accessorKey: "personnel",
    header: "Personnel",
  },
  {
    id: "actions",
    cell: ({ getValue }) => (
      <div
        style={{
          width: "5px !important",
          textAlign: "center",
        }}
      >
        <span className="text-[#2648EA] cursor-pointer font-semibold text-sm underline">
          View
        </span>
      </div> // Placeholder cell content
    ),
  },
];