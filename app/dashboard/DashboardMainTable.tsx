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
import PaginationTab from "./_components/PaginationTab"

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
]

export function DashboardMainTable() {
    return (
        <div className='bg-white shadow-custom p-4 mb-24 rounded-md'>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#202224]">Recent Transactions</h2>

                <Link href="/" className="text-[#2648EA] font-semibold text-sm">Open</Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="bg-[#F1F4F9] p-1 w-full  rounded-lg">
                        <TableHead className="w-[150px]">Transaction ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Items Sold</TableHead>
                        <TableHead >Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-semibold text-sm text-[#242525]">{invoice.invoice}</TableCell>
                            <TableCell className="text-[#202224] font-normal text-sm">{invoice.date}</TableCell>
                            <TableCell className="text-[#202224] font-normal text-sm">{invoice.time}</TableCell>
                            <TableCell className="text-[#202224] font-normal text-sm">{invoice.sold}</TableCell>
                            <TableCell className="text-[#202224] font-normal text-sm">{invoice.totalAmount}</TableCell>
                            <TableCell>
                                <span className={`
                                ${invoice.type === "Bank" && "bg-[#21965314] rounded-3xl w-[4.37em] py-1 px-3 text-[#219653] text-sm font-normal"} 
                                ${invoice.type === "Cash" && "bg-[#D3405314] rounded-3xl w-[4.37em] py-1 px-3 text-[#D34053] text-sm font-normal"} 
                                ${invoice.type === "Momo" && "bg-[#FFA70B14] rounded-3xl w-[4.37em] py-1 px-3 text-[#FFA70B] text-sm font-normal"} 
                                `}>
                                    {invoice.type}
                                </span>
                            </TableCell>
                            <TableCell>...</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationTab />
        </div>
    )
}