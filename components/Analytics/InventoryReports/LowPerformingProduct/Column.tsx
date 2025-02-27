"use client";
import { ColumnDef } from "@tanstack/react-table";

interface Type {
  id: string;
  name: string;
  category_name: string;
  quantity: number;
  selling_price: number;
  total_sales: number;
  sales_value: number;
}

export const Column: ColumnDef<Type>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "performance",
    header: "Performance(%)",
    cell: ({ getValue }) => (
      <span style={{ color: "red" }}>{getValue<string>()}%</span>
    ),
  },
  {
    accessorKey: "total_sales",
    header: "Quantity Sold",
  },
];
