import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Activity,
    CreditCard,
    DollarSign,
    Users
} from "lucide-react";
import prisma from "../utils/db";
import { requierUser } from "../utils/hooks";

async function getData(userId: string) {
    const [data, openInvoices, paidInvoices] = await Promise.all([
        prisma.invoice.findMany({
            where: {
                userId: userId
            }, select: {
                total: true
            }
        }),
        prisma.invoice.findMany({
            where: {
                userId: userId,
                status: "PENDING"
            }, select: {
                id: true
            }
        }),
        prisma.invoice.findMany({
            where: {
                userId: userId,
                status: "PAID"
            }, select: {
                id: true
            }
        })
    ]);
    return {
        data,
        openInvoices,
        paidInvoices
    }
}

export default async function DashboardBlocks() {
    const session = await requierUser();
    const { data, openInvoices, paidInvoices } = await getData(session.user?.id as string)
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4
    gap-4 md:gap-8 ">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-medium text-sm">Total Revenue</CardTitle>
                    <DollarSign className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold text-2xl pb-2">
                        {data.reduce((acc, invoice) => acc + invoice.total, 0)}
                    </h2>
                    <p className="text-xs text-muted-foreground">Based on the last 30 days</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-medium text-sm">Total Invoices Issued</CardTitle>
                    <Users className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold text-2xl pb-2">
                        +{data.length}
                    </h2>
                    <p className="text-xs text-muted-foreground">Total Invoices Issued!</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-medium text-sm">Paid Invoices</CardTitle>
                    <CreditCard className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold text-2xl pb-2">
                        +{paidInvoices.length}
                    </h2>
                    <p className="text-xs text-muted-foreground">Total Invoices Which have been paid!</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-medium text-sm">Open Invoices</CardTitle>
                    <Activity className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold text-2xl pb-2">
                        +{openInvoices.length}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Unpaid Invoices
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}