import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { InvoiceActions } from "./invoiceActions";
import prisma from "../utils/db";
import { requierUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";
import { Badge } from "@/components/ui/badge";

async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            clientName: true,
            total: true,
            createdAt: true,
            status: true,
            invoiceNumber: true,
            currency: true
        },
        orderBy: {
            createdAt: "desc",
        }
    })
    return data;
}


export async function InvoiceList() {
    const session = await requierUser()
    const data = await getData(session.user?.id as string)
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead >Status</TableHead>
                    <TableHead className="hidden md:inline-block md:pt-2.5">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>#{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.clientName}</TableCell>
                        <TableCell>
                            {formatCurrency({
                                amount: invoice.total,
                                currency: invoice.currency as any
                            })}
                        </TableCell>
                        <TableCell >
                            <Badge
                                className={
                                    invoice.status === "PAID"
                                        ? "bg-emerald-600 "
                                        : "bg-rose-600 "
                                }
                            >
                                {invoice.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:block mt-1.5">{new Intl.DateTimeFormat("en-US", {
                            dateStyle: "medium"
                        }).format(invoice.createdAt)
                        }
                        </TableCell>
                        <TableCell className="text-right">
                            <InvoiceActions id={invoice.id}
                                status={invoice.status}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}