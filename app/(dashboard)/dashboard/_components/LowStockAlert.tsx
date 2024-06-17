import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { ExternalLink } from 'lucide-react';

const invoices = [
    {
        invoice: "Paracetamol - 500g",
        paymentStatus: "4",
        totalAmount: "12.09.2024",
    },
    {
        invoice: "Paracetamol - 500g",
        paymentStatus: "4",
        totalAmount: "12.09.2024",
    },
    {
        invoice: "Paracetamol - 500g",
        paymentStatus: "4",
        totalAmount: "12.09.2024",
    },
    {
        invoice: "Paracetamol - 500g",
        paymentStatus: "4",
        totalAmount: "12.09.2024",
    }
]

export function LowStock() {
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">Low Stock Alert</h2>

                <Link href="/" className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm">
                    Open
                    <ExternalLink className="text-[#2648EA]" />
                </Link>
            </div>
            <Table className="bg-white rounded-xl p-6 ">
                <TableHeader className="p-4 border-none">
                    <TableRow className="bg-[#F1F4F9] p-1 w-full  rounded-lg">
                        <TableHead className="w-[180px] text-[#202224] font-nunito_sans font-bold">Product Name</TableHead>
                        <TableHead className="text-[#202224] font-bold font-nunito_sans">Piece</TableHead>
                        <TableHead className="w-[150px] text-[#202224] font-nunito_sans font-bold">Last Restock</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-semibold font-inter text-sm text-[#242525]">{invoice.invoice}</TableCell>
                            <TableCell>
                                <span 
                                className="bg-[#FFEFEE] py-1 px-3 font-inter text-sm font-medium rounded-[30px] text-[#C8322B]">
                                    {invoice.paymentStatus}
                                </span>
                            </TableCell>
                            <TableCell className="font-nunito_sans">{invoice.totalAmount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
