"use client";
import { ColumnDef } from "@tanstack/react-table";

export const Column: ColumnDef<any>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "performance",
    header: "Performance(%)",
    cell: ({ getValue }) => (
      <span style={{ color: "red" }}>{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "quantitySold",
    header: "Quantity Sold",
  },
];
