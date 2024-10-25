import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { dashboardSubTables } from "@/type";

const invoices: dashboardSubTables[] = [
  // Add your invoice data here, or leave it empty to test
]


interface TableProps {
  title: string;
}

export function DashboardSubTables({ title }: TableProps) {
  return (
    <div className="bg-white p-6 rounded-xl w-[450px] h-[428px] flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium font-nunito_sans text-[#202224]">
          {title}
        </h2>

        <Link
          href="/inventory?tab=4"
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
              No. Remaining
            </TableHead>
            <TableHead className="w-[150px] text-[#202224] font-nunito_sans font-bold">
              Expiry Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell className="font-semibold text-sm font-inter text-[#242525]">
                -
              </TableCell>
              <TableCell className="text-sm font-medium font-nunito_sans text-[#202224]">
                -
              </TableCell>
              <TableCell className="font-semibold text-sm font-nunito_sans text-[#202224]">
                -
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow key={invoice.productName}>
                <TableCell className="font-semibold text-sm font-inter text-[#242525]">
                  {invoice.productName}
                </TableCell>
                <TableCell className="text-sm font-medium font-nunito_sans text-[#202224]">
                  {invoice.noRemaining}
                </TableCell>
                <TableCell className="font-semibold text-sm font-nunito_sans text-[#202224]">
                  {invoice.expriyDate}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
