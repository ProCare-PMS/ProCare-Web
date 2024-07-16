import { ColumnDef, CellContext } from "@tanstack/react-table";
import { DashboardTransactions, lowStockType } from "@/type";
import { formatDateMonthToYear } from "@/components/CustomFunction/CustomFunction";
import DashboardModal from "@/components/Modals/DashboardModal";
import { useState } from "react";



const ActionsCell = ({ row }:any) => {
      const payment = row.original;
      const [modal, setModal] = useState(false);
      const [selectedItem, setSelectedItem] =
        useState<DashboardTransactions | null>(null);
    
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


export const Column: ColumnDef<lowStockType>[] = [
      {
        accessorKey: "transactionId",
        header: "TransactionID",
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
        accessorKey: "itemSold",
        header: "Items Sold",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        id: "actions",
        cell: ActionsCell,
      },
    ];
    
