"use client";
import React, { useState, useEffect } from "react";
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
import { Loader2 } from "lucide-react";

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
  onPageSizeChange?: (pageSize: number) => void;
  pageSize?: number;
}

function DataTable<TData, TValue>({
  columns,
  data,
  searchValue = "",
  isLoading = false,
  onPageChange,
  onPageSizeChange,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageTransitioning, setPageTransitioning] = useState(false);

  // Update global filter when search value changes
  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [searchValue]);

  // Reset to page 1 when search value changes
  useEffect(() => {
    if (searchValue !== globalFilter) {
      setCurrentPage(1);
    }
  }, [searchValue, globalFilter]);

  const table = useReactTable({
    data: data?.results || [],
    columns,
    state: {
      globalFilter,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });



  const handlePageChange = (page: number) => {
    if (page > 0 && page <= data.total_pages && page !== currentPage) {
      setPageTransitioning(true);
      setCurrentPage(page);

      if (onPageChange) {
        onPageChange(page);
      }

      // Simulate network delay if necessary
      setTimeout(() => {
        setPageTransitioning(false);
      }, 300);
    }
  };



  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="bg-white">
          <div className="bg-[#F1F4F9] rounded-2xl">
            <Table>
              <TableHeader className="border-none">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-transparent border-none">
                    {headerGroup.headers.map((header, index) => (
                      <TableHead
                        key={header.id}
                        className={`font-bold text-sm text-[#202224] cursor-pointer whitespace-nowrap p-3 border-none ${
                          index === 0 ? 'rounded-tl-lg' : ''
                        } ${
                          index === headerGroup.headers.length - 1 ? 'rounded-tr-lg' : ''
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center gap-1">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <span className="inline-block w-4">
                              {header.column.getIsSorted() === "desc" ? " 🔽" : header.column.getIsSorted() ? " 🔼" : ""}
                            </span>
                          </div>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading || pageTransitioning ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-96">
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                        <span className="ml-2 text-gray-600">Loading data...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data?.results?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                                              <TableCell key={cell.id} className="text-sm text-gray-700 p-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-32 text-center text-gray-500">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {!isLoading && data.total_pages > 0 && (
        <div className="flex items-center justify-end gap-4 py-4 px-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading || pageTransitioning}
            className="px-4 py-2 border border-[#D1D5DB] rounded-[12px] bg-white text-[#374151] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Previous page"
          >
            Previous
          </button>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === data.total_pages || isLoading || pageTransitioning}
            className="px-4 py-2 border border-[#D1D5DB] rounded-[12px] bg-white text-[#374151] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Next page"
          >
            Next
          </button>

          {/* Result Info */}
          <span className="text-[#374151] font-medium">
            Result {currentPage} of {data.total_pages}
          </span>
        </div>
      )}
    </div>
  );
}

export default DataTable;
