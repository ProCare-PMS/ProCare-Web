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
import clsx from "clsx";

interface TableProps {
  title: string;
  data: any[];
}

export function DashboardLowStockAlert({ title, data }: TableProps) {
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
          {data.map((invoice) => (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
