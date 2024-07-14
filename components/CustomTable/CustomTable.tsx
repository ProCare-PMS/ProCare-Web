import { getCoreRowModel, RowModel, Table, useReactTable } from "@tanstack/react-table";
import { CustomTableProps } from "./types";

function CustomTable<D extends object>({
    columns,
    data,
}: CustomTableProps<D>) {
    const table = useReactTable<D>(
        { columns, data, getCoreRowModel: getCoreRowModel() }
      ) ;

      return (
        <></>
      )
}

export default CustomTable