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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

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
  const [globalFilter, setGlobalFilter] = useState("");

  // Reset current page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Update global filter when search value changes
  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [searchValue]);

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

  // Improved page number generation with more intelligent display
  const pageNumbers = useMemo(() => {
    const totalPages = data.total_pages;
    const current = currentPage;
    
    if (totalPages <= 0) return [];

    // Always show first and last page
    const pages = new Set([1, totalPages]);

    // Add current page and its immediate neighbors
    pages.add(current);
    pages.add(current - 1);
    pages.add(current + 1);

    // Add ellipsis indicators if needed
    const sortedPages = Array.from(pages).filter(p => p > 0 && p <= totalPages).sort((a, b) => a - b);
    
    return sortedPages;
  }, [currentPage, data.total_pages]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= data.total_pages) {
      setCurrentPage(page);
      onPageChange?.(page);
    }
  };

  return (
    <div className="rounded-md w-full">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100 hover:bg-gray-200">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-bold text-sm text-gray-900 cursor-pointer whitespace-nowrap"
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
      </div>

      {!isLoading && data.total_pages > 0 && (
        <div className="flex gap-4 items-center justify-end between py-4 px-2">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            {/* First Page Button */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronsLeft className="h-5 w-5" />
            </button>

            {/* Previous Page Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {pageNumbers.map((pageNum, index) => {
                const isActive = pageNum === currentPage;
                
                return (
                  <React.Fragment key={pageNum}>
                    {index > 0 && pageNumbers[index - 1] + 1 < pageNum && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                        isActive 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Next Page Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data.total_pages}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Last Page Button */}
            <button
              onClick={() => handlePageChange(data.total_pages)}
              disabled={currentPage === data.total_pages}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronsRight className="h-5 w-5" />
            </button>
          </div>

          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Page {currentPage} of {data.total_pages} 
            <span className="ml-2 text-gray-500">
              ({data.count} total items)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;