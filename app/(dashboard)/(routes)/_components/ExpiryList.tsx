import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { ExternalLink } from 'lucide-react';

const invoices = [
    {
        invoice: "Paracetamol - 500g",
        paymentStatus: "180",
        totalAmount: "12.09.2024",
    },
    {
        invoice: "Paracetamol - 500g",
        paymentStatus: "360",
        totalAmount: "12.09.2024",
    },
    {
        invoice: "Paracetamol - 500g",
        paymentStatus: "360",
        totalAmount: "12.09.2024",
    },
    {
        invoice: "Paracetamol - 500g",
        paymentStatus: "180",
        totalAmount: "12.09.2024",
    },
]

export function ExpiryList() {
    return (
        <div className="">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#202224]">Expiry List</h2>

            <Link href="/" className="text-[#2648EA] flex items-center gap-1 font-semibold text-sm">
                Open
                <ExternalLink className="text-[#2648EA]" />
            </Link>
        </div>
            <Table className="bg-white rounded-xl  p-6 ">
                <TableHeader className="p-4 border-none">
                    <TableRow className="bg-[#F1F4F9] p-1 w-full  rounded-lg">
                        <TableHead className="w-[180px]">Product Name</TableHead>
                        <TableHead>No.Remaining</TableHead>
                        <TableHead className="w-[150px]">Expiry Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                            <TableCell className="text-sm font-medium nunito_sans">{invoice.paymentStatus}</TableCell>
                            <TableCell className="">{invoice.totalAmount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
