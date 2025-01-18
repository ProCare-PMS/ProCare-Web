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

interface TableProps {
  title: string;
  data: any[];
  isLoading?: boolean;
}

export function DashboardLowStockAlert({ title, data, isLoading }: TableProps) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl w-[450px] h-[428px] flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium font-nunito_sans text-[#202224]">
            {title}
          </h2>
          <Link
            href="/page_under_construction"
            className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
          >
            Open
            <ExternalLink className="text-[#2648EA]" />
          </Link>
        </div>
        <Table className="bg-white rounded-xl">
          <TableHeader className="p-4 border-none">
            <TableRow className="bg-[#F1F4F9] p-1 w-full rounded-lg">
              <TableHead className="w-[180px] font-nunito_sans text-[#202224] font-bold">
                Product Name
              </TableHead>
              <TableHead className="text-[#202224] font-nunito_sans font-bold">
                No.Remaining
              </TableHead>
              <TableHead className="w-[150px] text-[#202224] font-nunito_sans font-bold">
                Expiry Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="rounded-3xl w-24 mx-auto">
                    <div className="h-8 bg-gray-200 rounded-3xl animate-pulse"></div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl w-[450px] h-[428px] flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium font-nunito_sans text-[#202224]">
          {title}
        </h2>

        <Link
          href="/page_under_construction"
          className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
        >
          Open
          <ExternalLink className="text-[#2648EA]" />
        </Link>
      </div>
      <Table className="bg-white rounded-xl">
        <TableHeader className="p-4 border-none">
          <TableRow className="bg-[#F1F4F9] p-1 w-full rounded-lg">
            <TableHead className="w-[180px] font-nunito_sans text-[#202224] font-bold">
              Product Name
            </TableHead>
            <TableHead className="text-[#202224] font-nunito_sans font-bold">
              No.Remaining
            </TableHead>
            <TableHead className="w-[150px] text-[#202224] font-nunito_sans font-bold">
              Expiry Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-semibold text-sm font-inter text-[#242525]">
                  {invoice.invoice}
                </TableCell>
                <TableCell className="text-sm font-medium font-nunito_sans text-[#202224] nunito_sans">
                  <p className="rounded-3xl font-inter text-sm font-normal">
                    <span className="rounded-3xl font-inter text-sm font-normal text-[#D34053] bg-[#D3405314] px-6 py-2">
                      {invoice.piece}
                    </span>
                  </p>
                </TableCell>
                <TableCell className="font-semibold text-sm font-nunito_sans text-[#202224]">
                  {invoice.lastRestock}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center font-medium text-[#202224]">
                    -
                  </TableCell>
                  <TableCell className="text-center font-medium text-[#202224]">
                    -
                  </TableCell>
                  <TableCell className="text-center font-medium text-[#202224]">
                    -
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}