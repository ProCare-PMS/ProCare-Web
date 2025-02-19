"use client";
import { ColumnDef } from "@tanstack/react-table";

interface BestPerformingProductType {
  id: string;
  name: string;
  category_name: string;
  quantity: number;
  selling_price: number;
  total_sales: number;
  sales_value: number;
}

export const Column: ColumnDef<BestPerformingProductType>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "total_sales",
    header: "Quantity Sold",
  },
  {
    accessorKey: "performance",
    header: "Performance (%)",
    cell: ({ getValue }) => (
      <span style={{ color: "green" }}>{getValue<string>()}</span>
    ),
  },
];


{/* 
  {
    accessorKey: "performance",
    header: "Performance (%)",
    cell: ({ getValue }) => (
      <span style={{ color: "green" }}>{getValue<string>()}</span>
    ),
  },
  */}