import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// Define the type for table props
interface TableProps {
  title: string;
  columns: ColumnDef<any, any>[]; // Use ColumnDef from @tanstack/react-table
  data: any[];
  link?: string;
}

export function MiniSubTable({ title, columns, data, link }: TableProps) {
  // Initialize the table with useReactTable hook
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white p-6 rounded-xl flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
          {title}
        </h2>
        <div className="flex gap-3">
          <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2 py-1">
            <span>
              <CalendarMonthIcon />
            </span>
            <span>October</span>
          </div>

          {link && (
            <Link
              href={link}
              className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
            >
              Full view
              <ExternalLink className="text-[#2648EA]" />
            </Link>
          )}
        </div>
      </div>

      <Table className="bg-white rounded-xl w-full table-fixed">
        {" "}
        {/* Add table-fixed class */}
        <TableHeader className="p-4 border-none">
          <TableRow className="bg-[#F1F4F9] p-1 w-full rounded-lg">
            <TableHead
              className="text-[#202224] font-nunito_sans font-bold p-2"
              style={{ width: "2rem" }} // Fixed width for row index column
            >
              #
            </TableHead>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className="text-[#202224] font-nunito_sans font-bold p-2"
                  style={{
                    width: index === 0 ? "30%" : "auto", // First column gets 50% width
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <TableRow key={row.id} className="w-full">
              <TableCell
                className="font-semibold text-sm font-inter text-[#242525] p-2"
                style={{ width: "0.4rem" }} // Fixed width for row index
              >
                {rowIndex + 1} {/* Render the index number */}
              </TableCell>
              {row.getVisibleCells().map((cell, cellIndex) => (
                <TableCell
                  key={cell.id}
                  className="font-semibold text-sm font-inter text-[#242525] p-2"
                  // style={{
                  //   width: cellIndex === 0 ? "50%" : "auto", // First column in body gets 50% width
                  // }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
