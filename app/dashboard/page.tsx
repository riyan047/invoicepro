import { requireUser } from "../utils/hooks";
import DashboardBlocks from "../components/dashboardBlocks";
import InvoiceGraph from "../components/invoiceGraph";
import { RecentInvoices } from "../components/recentInvoices";
import prisma from "../utils/db";
import { EmptyState } from "../components/emptyState";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId
        }, select: {
            id: true
        }
    });
    return data;
}

export default async function Dashboard() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    return (
        <>
            {
                data.length < 1 ? (
                    <EmptyState
                        title="No Invoices found"
                        description="You haven&apos;t created any invoices yet. Create one to enable the analytics dashboard."
                        buttonText="Create invoice"
                        href="/dashboard/invoices/create"
                    />
                ) :
                    (
                        <Suspense fallback={
                            <Skeleton className="w-full h-full flex-1" />
                        }>
                            <DashboardBlocks />
                            <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
                                <InvoiceGraph />
                                <RecentInvoices />
                            </div>
                        </Suspense>
                    )
            }
        </>
    )
}