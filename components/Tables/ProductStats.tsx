"use client";
import React, { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Product {
    id: string;
    name: string;
    category__name: string | null;
    quantity: number;
    selling_price: number;
    total_sales: number;
    sales_value: number;
}

interface BestSellingProductsTableProps {
    products: Product[];
    searchValue?: string;
    isLoading?: boolean;
}

type SortField =
    | "name"
    | "quantity"
    | "selling_price"
    | "total_sales"
    | "sales_value";
type SortDirection = "asc" | "desc";

const BestSellingProductsTable: React.FC<BestSellingProductsTableProps> = ({
    products = [],
    searchValue = "",
    isLoading = false,
}) => {
    const [sortField, setSortField] = useState<SortField>("quantity");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter products based on search value
    const filteredProducts = useMemo(() => {
        if (!searchValue) return products;

        return products.filter(
            (product) =>
                product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                (product.category__name &&
                    product.category__name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()))
        );
    }, [products, searchValue]);

    // Sort products
    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortDirection === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
            }

            return 0;
        });
    }, [filteredProducts, sortField, sortDirection]);

    // Paginate products
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedProducts, currentPage]);

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return null;
        return sortDirection === "desc" ? " 🔽" : " 🔼";
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "GHS",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    // Loading skeleton
    const LoadingSkeleton = () => (
        <>
            {[...Array(10)].map((_, index) => (
                <TableRow key={`loading-row-${index}`} className="animate-pulse">
                    <TableCell>
                        <div className="h-6 bg-gray-200 rounded w-[80%]"></div>
                    </TableCell>
                    <TableCell>
                        <div className="h-6 bg-gray-200 rounded w-[60%]"></div>
                    </TableCell>
                    <TableCell>
                        <div className="h-6 bg-gray-200 rounded w-[40%]"></div>
                    </TableCell>
                    <TableCell>
                        <div className="h-6 bg-gray-200 rounded w-[50%]"></div>
                    </TableCell>
                    <TableCell>
                        <div className="h-6 bg-gray-200 rounded w-[40%]"></div>
                    </TableCell>
                    <TableCell>
                        <div className="h-6 bg-gray-200 rounded w-[50%]"></div>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );

    return (
        <div className="!rounded-[6px]">
            <Table>
                <TableHeader>
                    <TableRow className="bg-[#F1F4F9] font-inter p-1 w-full !rounded-[60px] hover:bg-[#dbdee2]">
                        <TableHead
                            className="font-bold text-sm text-[#202224] cursor-pointer"
                            onClick={() => handleSort("name")}
                        >
                            <div className="flex items-center font-inter">
                                Product Name{getSortIcon("name")}
                            </div>
                        </TableHead>
                        <TableHead className="font-bold text-sm text-[#202224]">
                            <div className="flex items-center font-inter">Category</div>
                        </TableHead>
                        <TableHead
                            className="font-bold text-sm text-[#202224] cursor-pointer"
                            onClick={() => handleSort("quantity")}
                        >
                            <div className="flex items-center font-inter">
                                Quantity{getSortIcon("quantity")}
                            </div>
                        </TableHead>
                        <TableHead
                            className="font-bold text-sm text-[#202224] cursor-pointer"
                            onClick={() => handleSort("selling_price")}
                        >
                            <div className="flex items-center font-inter">
                                Unit Price{getSortIcon("selling_price")}
                            </div>
                        </TableHead>
                        <TableHead
                            className="font-bold text-sm text-[#202224] cursor-pointer"
                            onClick={() => handleSort("total_sales")}
                        >
                            <div className="flex items-center font-inter">
                                Total Sales{getSortIcon("total_sales")}
                            </div>
                        </TableHead>
                        <TableHead
                            className="font-bold text-sm text-[#202224] cursor-pointer"
                            onClick={() => handleSort("sales_value")}
                        >
                            <div className="flex items-center font-inter">
                                Sales Value{getSortIcon("sales_value")}
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : paginatedProducts.length ? (
                        paginatedProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-inter text-[#202224] text-sm font-normal">
                                    {product.name}
                                </TableCell>
                                <TableCell className="font-inter text-[#202224] text-sm font-normal">
                                    {product.category__name || "-"}
                                </TableCell>
                                <TableCell className="font-inter text-[#202224] text-sm font-normal">
                                    {product.quantity.toLocaleString()}
                                </TableCell>
                                <TableCell className="font-inter text-[#202224] text-sm font-normal">
                                    {formatCurrency(product.selling_price)}
                                </TableCell>
                                <TableCell className="font-inter text-[#202224] text-sm font-normal">
                                    {product.total_sales.toLocaleString()}
                                </TableCell>
                                <TableCell className="font-inter text-[#202224] text-sm font-normal">
                                    {formatCurrency(product.sales_value)}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                                <span className="text-gray-400 font-bold text-lg">
                                    {searchValue
                                        ? "No products found matching your search"
                                        : "No products available"}
                                </span>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {!isLoading && paginatedProducts.length > 0 && (
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-2">
                        <button
                            className="border border-[#D0D5DD] font-inter py-2 px-4 rounded-[6px] text-[#344054] font-semibold text-sm disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="border border-[#D0D5DD] font-inter py-2 px-4 rounded-[6px] text-[#344054] font-semibold text-sm disabled:opacity-50"
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-nowrap text-[#344054] font-inter font-medium text-sm">
                            {totalPages > 0
                                ? `Page ${currentPage} of ${totalPages} (${sortedProducts.length} products)`
                                : "No results found"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BestSellingProductsTable;
