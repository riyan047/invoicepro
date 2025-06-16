
import { signOut } from "@/app/utils/auth";
import { requierUser } from "../utils/hooks";
import { Button } from "@/components/ui/button";
import DashboardBlocks from "../components/dashboardBlocks";
import InvoiceGraph from "../components/invoiceGraph";
import { RecentInvoices } from "../components/recentInvoices";

export default async function Dashboard() {
    const session = await requierUser();
    return (
        <>
            <DashboardBlocks />
            <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
                <InvoiceGraph />
                <RecentInvoices />
            </div>
        </>
    )
}