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

const DashboardLowStockAlert = ({ title, data, isLoading }: TableProps) => {
  return (
    <div className="bg-white p-6 rounded-xl w-[450px] h-[428px] flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-[#202224]">{title}</h2>
        <Link
          href="/page_under_construction"
          className="text-[#2648EA] flex items-center gap-1 font-semibold text-sm"
        >
          Open <ExternalLink className="text-[#2648EA]" />
        </Link>
      </div>

      <Table className="bg-white rounded-xl">
        <TableHeader className="p-4 border-none">
          <TableRow className="bg-[#F1F4F9] p-1 w-full rounded-lg">
            <TableHead className="w-[180px] font-bold text-[#202224]">
              Product Name
            </TableHead>
            <TableHead className="font-bold text-[#202224]">No. Remaining</TableHead>
            <TableHead className="w-[150px] font-bold text-[#202224]">
              Expiry Date
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            [...Array(5)].map((_, index) => (
              <TableRow key={index}>
                {[...Array(3)].map((_, i) => (
                  <TableCell key={i}>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length ? (
            data.map((item) => (
              <TableRow key={item.invoice}>
                <TableCell className="font-semibold text-sm text-[#242525]">
                  {item.invoice}
                </TableCell>
                <TableCell className="text-sm font-medium text-[#202224]">
                  <span className="rounded-3xl text-sm font-normal text-[#D34053] bg-[#D3405314] px-6 py-2">
                    {item.piece}
                  </span>
                </TableCell>
                <TableCell className="font-semibold text-sm text-[#202224]">
                  {item.lastRestock}
                </TableCell>
              </TableRow>
            ))
          ) : (
            [...Array(5)].map((_, index) => (
              <TableRow key={index}>
                {[...Array(3)].map((_, i) => (
                  <TableCell key={i} className="text-center font-medium text-[#202224]">
                    -
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardLowStockAlert;
