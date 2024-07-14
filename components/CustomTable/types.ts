import { Column } from "@tanstack/react-table"

export type CustomTableProps<D extends object> = {
    data: D[],
    columns: Column<D>[]
}