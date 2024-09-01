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

const invoices = [
  {
    invoice: "INV001",
    date: "30/05/2024",
    time: "12:53PM",
    sold: 43,
    totalAmount: "$250.00",
    type: "Momo",
  },
  {
    invoice: "INV002",
    date: "30/05/2024",
    time: "12:53PM",
    sold: 43,
    totalAmount: "$250.00",
    type: "Momo",
  },
  {
    invoice: "INV003",
    date: "30/05/2024",
    time: "12:53PM",
    sold: 43,
    totalAmount: "$250.00",
    type: "Bank",
  },
  {
    invoice: "INV004",
    date: "30/05/2024",
    time: "12:53PM",
    sold: 43,
    totalAmount: "$250.00",
    type: "Bank",
  },
  {
    invoice: "INV005",
    date: "30/05/2024",
    time: "12:53PM",
    sold: 43,
    totalAmount: "$250.00",
    type: "Cash",
  },
  {
    invoice: "INV006",
    date: "30/05/2024",
    time: "12:53PM",
    sold: 43,
    totalAmount: "$250.00",
    type: "Cash",
  },
];

export function DashboardMainTable() {
  return (
    <div className="bg-white shadow-custom p-4 mb-24 rounded-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-nunito_sans font-bold text-[#202224]">
          Recent Transactions
        </h2>

        <div className="flex items-center gap-6">
          <span className="text-xs font-inter text-[#2B303466] border border-[#D4D4D4] px-2 py-1 font-medium">
            October
          </span>

          <Link
            href="/"
            className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
          >
            Open
            <ExternalLink className="text-[#2648EA]" />
          </Link>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F1F4F9] p-1 w-full  rounded-lg">
            <TableHead className="w-[150px] font-nunito_sans font-bold text-sm text-[#202224]">
              Transaction ID
            </TableHead>
            <TableHead className="font-bold font-nunito_sans text-sm text-[#202224]">
              Date
            </TableHead>
            <TableHead className="font-bold font-nunito_sans text-sm text-[#202224]">
              Time
            </TableHead>
            <TableHead className="font-bold font-nunito_sans text-sm text-[#202224]">
              Items Sold
            </TableHead>
            <TableHead className="font-bold font-nunito_sans text-sm text-[#202224]">
              Amount
            </TableHead>
            <TableHead className="font-bold font-nunito_sans text-sm text-[#202224]">
              Type
            </TableHead>
            <TableHead className="font-bold font-nunito_sans text-sm text-[#202224]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-semibold font-inter text-sm text-[#242525]">
                {invoice.invoice}
              </TableCell>
              <TableCell className="text-[#202224] font-inter font-normal text-sm">
                {invoice.date}
              </TableCell>
              <TableCell className="text-[#202224] font-inter font-normal text-sm">
                {invoice.time}
              </TableCell>
              <TableCell className="text-[#202224] font-inter font-normal text-sm">
                {invoice.sold}
              </TableCell>
              <TableCell className="text-[#202224] font-inter font-normal text-sm">
                {invoice.totalAmount}
              </TableCell>
              <TableCell>
                <span
                  className={clsx(
                    "bg-[#21965314] rounded-3xl w-[4.37em] py-1 px-3 font-inter text-sm font-normal",
                    {
                      "text-[#219653]": invoice.type === "Bank",
                      "text-[#D34053]": invoice.type === "Cash",
                      "text-[#FFA70B]": invoice.type === "Momo",
                    }
                  )}
                >
                  {invoice.type}
                </span>
              </TableCell>
              <TableCell>
                <Link
                  href="/view"
                  className="text-sm font-bold font-nunito_sans text-[#2648EA] cursor-pointer underline"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
