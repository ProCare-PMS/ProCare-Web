import { ColumnDef, CellContext } from "@tanstack/react-table";
import { DashboardTransactions, lowStockType, dailySalesType } from "@/type";
import { formatDateMonthToYear } from "@/components/CustomFunction/CustomFunction";
import DashboardModal from "@/components/Modals/DashboardModal";
import { useState } from "react";
import clsx from "clsx";

const ActionsCell = ({ row }: any) => {
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

export const Column: ColumnDef<dailySalesType>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: (value: any) => (
      <p className="font-bold">
        <span>{value.getValue()}</span>
      </p>
    ),
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
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "ghs",
      }).format(amount);

      return <div className="!text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (value: any) => (
      <p className="">
        <span
          className={clsx(" rounded-3xl font-inter text-sm font-normal", {
            "text-[#219653] bg-[#21965314]  py-2 rounded-3xl px-3 ":
              value.getValue() === "Bank",
            "text-[#D34053] bg-[#D3405314] px-3  py-2 ":
              value.getValue() === "Cash",
            "text-orange-400 bg-[#D3405314] px-3  py-2 ":
              value.getValue() === "Momo",
          })}
        >
          {value.getValue()}
        </span>
      </p>
    ),
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
