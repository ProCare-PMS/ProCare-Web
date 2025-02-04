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
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DashboardTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchValue?: string;
  isLoading?: boolean;
}

function DashboardTable<TData, TValue>({
  columns,
  data,
  searchValue = "",
  isLoading = false,
}: DashboardTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
  });

  const currentPage = table.getState()?.pagination?.pageIndex + 1 || 1;
  const totalPages = table?.getPageCount ? table?.getPageCount() : 0;

  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [searchValue]);

  // Loading skeleton for table rows
  const LoadingSkeleton = () => (
    <>
      {[...Array(10)].map((_, index) => (
        <TableRow key={`loading-row-${index}`} className="animate-pulse">
          {columns.map((_, colIndex) => (
            <TableCell key={`loading-cell-${index}-${colIndex}`}>
              <div className="h-6 bg-gray-200 rounded w-[80%]"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  return (
    <div className="!rounded-[6px]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="bg-[#F1F4F9] font-inter p-1 w-full !rounded-[60px] hover:bg-[#dbdee2]"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="font-bold text-sm text-[#202224] cursor-pointer"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
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
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <LoadingSkeleton />
          ) : table.getRowModel().rows?.length ? (
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
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            [...Array(10)].map((_, rowIndex) => (
              <TableRow key={`empty-row-${rowIndex}`}>
                {columns.map((column, colIndex) => (
                  <TableCell key={`empty-cell-${rowIndex}-${colIndex}`}>
                    <span className="text-gray-400 font-bold text-lg">-</span>
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {!isLoading && (
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
              {totalPages > 0
                ? `Results ${currentPage} of ${totalPages}`
                : "No results found"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardTable; 