import { requierUser } from "../utils/hooks";
import DashboardBlocks from "../components/dashboardBlocks";
import InvoiceGraph from "../components/invoiceGraph";
import { RecentInvoices } from "../components/recentInvoices";
import prisma from "../utils/db";
import { EmptyState } from "../components/emptyState";

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
    const session = await requierUser();
    const data = await getData(session.user?.id as string);
    return (
        <>{
            data.length < 1 ? <>
                <EmptyState
                    title="No Invoices found"
                    description="Hey you haven't created any invoices. Please create one to enable analytics dashboard."
                    buttonText="Create invoice"
                    href="/dashboard/invoices/create"
                />
            </> :
                <>
                    <DashboardBlocks />
                    <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
                        <InvoiceGraph />
                        <RecentInvoices />
                    </div>
                </>}
        </>
    )
}