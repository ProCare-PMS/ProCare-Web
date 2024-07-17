import { ColumnDef, CellContext } from "@tanstack/react-table";
import { lowStockType } from "@/type";
import { formatDateMonthToYear } from "@/components/CustomFunction/CustomFunction";

export const Column: ColumnDef<lowStockType>[] = [
  {
    header: "Name",
    accessorKey: "name",
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
    header: "Items Remaining",
    accessorKey: "itemRemaining",
    cell: (value: any) => (
      <p className="w-full ms-6">
        <span className="w-10 bg-red-200 p-2 rounded-xl flex justify-center items-center">
          {value.getValue()}
        </span>
      </p>
    ),
  },
  {
    header: "Last Restock Date",
    accessorKey: "lastRestockDate",
    cell: (value: any) => <div>{formatDateMonthToYear(value.getValue())}</div>,
  },
  {
    header: "Last Restock Time",
    accessorKey: "lastRestockTime",
  },
];
