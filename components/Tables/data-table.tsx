"use client";
import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchValue?: string;
}

function DataTable<TData, TValue>({
  columns,
  data,
  searchValue = "",
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter, // Added global filter state
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // Added sorted row model
    getFilteredRowModel: getFilteredRowModel(), // Added global filtered row model
    onGlobalFilterChange: setGlobalFilter, // Handle global filter change
    onSortingChange: setSorting,
  });

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  useEffect(() => {
    setGlobalFilter(searchValue); // Update global filter when searchValue changes
  }, [searchValue]);

  return (
    <div className="!rounded-[6px]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="bg-[#F1F4F9] font-inter p-1 w-full !rounded-[60px] hover:bg-[#dbdee2]"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="font-bold text-sm text-[#202224] cursor-pointer" // Made header clickable
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()} // Added sorting handler
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center font-inter">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <span className="ml-2"> 🔽</span>
                          ) : (
                            <span className="ml-2"> 🔼</span>
                          )
                        ) : null}
                        {/* {{
                            asc: ' 🔼', // Sorting direction indicator
                            desc: ' 🔽'
                          }[header.column.getIsSorted()  ? 'asc' : 'desc'] ?? null} */}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="font-inter text-[#202224] text-sm font-normal"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <button
          className="border border-[#D0D5DD] font-inter py-2 px-4 rounded-[6px] text-[#344054] font-semibold text-sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          className="border border-[#D0D5DD] font-inter py-2 px-4 rounded-[6px] text-[#344054] font-semibold text-sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <div className="flex justify-between items-center py-2">
          <p className="text-nowrap text-[#344054] font-inter font-medium text-sm">
            Results {currentPage} of {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
