"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BackendPaginationData {
  count: number;
  links: { next: string | null; previous: string | null };
  results: any[];
  total_pages: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: BackendPaginationData;
  searchValue?: string;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
}

function DataTable<TData, TValue>({
  columns,
  data,
  searchValue = "",
  isLoading = false,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => setCurrentPage(1), [data]);

  const table = useReactTable({
    data: data?.results || [],
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-100 hover:bg-gray-200">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="font-bold text-sm text-gray-900 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "desc" ? " 🔽" : header.column.getIsSorted() ? " 🔼" : ""}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            [...Array(10)].map((_, index) => (
              <TableRow key={`loading-${index}`} className="animate-pulse">
                {columns.map((_, colIndex) => (
                  <TableCell key={`loading-cell-${index}-${colIndex}`}>
                    <div className="h-6 bg-gray-200 rounded w-4/5"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data?.results?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center text-gray-500">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {!isLoading && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <button
            className="border border-gray-300 py-2 px-4 rounded-md text-gray-700 font-medium text-sm disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="border border-gray-300 py-2 px-4 rounded-md text-gray-700 font-medium text-sm disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === data.total_pages}
          >
            Next
          </button>
          <p className="text-gray-700 text-sm">
            {data.total_pages > 0 ? `Page ${currentPage} of ${data.total_pages}` : "No results"}
          </p>
        </div>
      )}
    </div>
  );
}

export default DataTable;
