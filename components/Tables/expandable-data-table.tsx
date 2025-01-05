"use client";

import React, { useEffect, useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  useReactTable,
  getFilteredRowModel,
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
import clsx from "clsx";
import { Fragment } from "react";
import ProductEmptyState from "../Inventory/ProductsTab/ProductsEmptyState";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchValue?: string;
  emptyState: string
}

export function ExpandableDataTable<TData, TValue>({
  columns,
  data,
  searchValue = "",
  emptyState
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(), // Enable expandable rows
    state: {
      globalFilter, // Added global filter state
      sorting,
    },
    getFilteredRowModel: getFilteredRowModel(), // Added global filtered row model
    onGlobalFilterChange: setGlobalFilter, // Handle global filter change
    onSortingChange: setSorting,
  });

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table?.getPageCount();

  useEffect(() => {
    setGlobalFilter(searchValue); // Update global filter when searchValue changes
  }, [searchValue]);

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-[#F1F4F9] hover:bg-slate-200 font-inter p-1 w-full rounded-[10px]"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="font-bold text-sm text-[#202224]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
              <Fragment key={row.id}>
                <TableRow
                  onClick={() => row.toggleExpanded()} // Toggle expansion on row click
                  data-state={row.getIsExpanded() ? "expanded" : undefined}
                  className={clsx("py-8 cursor-pointer", {
                    "bg-gray-100": row.getIsExpanded(), // Add a background for expanded rows
                  })}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <span
                        className={clsx(
                          "rounded-3xl font-inter text-sm font-normal",
                          {
                            "text-[#219653] bg-[#21965314] py-2 rounded-3xl px-3":
                              cell.getValue() === "Available",
                            "text-[#D34053] bg-[#D3405314] px-3 py-2":
                              cell.getValue() === "Unavailable",
                          }
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow>
                    <TableCell colSpan={columns?.length}>
                      {/* Expanded content */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p>Details for row {row.id}:</p>
                        <p>
                          Expanded content goes here. Customize this part to
                          show additional details for the selected row.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className="mt-24 mx-auto py-12">
               {emptyState === "products" ? <ProductEmptyState /> : "No Results" }
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-[#596574] text-sm font-normal">
            Total number of products:{" "}
            <span className="text-[#344054] text-base font-semibold">
              {data?.length}
            </span>{" "}
          </p>
          <div className="flex items-center justify-end space-x-2 py-4">
            <button
              className="border border-[#D0D5DD] w-full py-2 px-4 rounded-[6px] text-[#344054] font-semibold text-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className="border border-[#D0D5DD] w-full py-2 px-4 rounded-[6px] text-[#344054] font-semibold text-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
            <div className="flex justify-between items-center py-2">
              <p className="text-nowrap text-[#344054] font-medium text-sm">
                Results {currentPage} of {totalPages}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
