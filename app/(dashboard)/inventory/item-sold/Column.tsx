import { ColumnDef, CellContext } from "@tanstack/react-table";
import { lowStockType } from "@/type";
import { formatDateMonthToYear } from "@/components/CustomFunction/CustomFunction";
import clsx from "clsx";

export const Column: ColumnDef<lowStockType>[] = [
  {
    header: "Product Name",
    accessorKey: "name",
    cell: (value: any) => (
      <p className="font-semibold text-[#242525]">
        <span>{value.getValue()}</span>
      </p>
    ),
  },
  {
    header: "Unit",
    accessorKey: "unit",
  },
  {
    header: "Brand",
    accessorKey: "brand",
  },
  {
    header: "Items Sold",
    accessorKey: "itemSold",
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: (value: any) => <div>{formatDateMonthToYear(value.getValue())}</div>,
  },
  {
    header: "Time",
    accessorKey: "time",
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "ghs",
      }).format(amount);

      return <div className="!text-left">{formatted}</div>;
    },
  },
];
