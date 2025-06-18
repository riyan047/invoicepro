import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: { userId },
      select: { total: true, currency: true },
    }),
    prisma.invoice.findMany({
      where: { userId, status: "PENDING" },
      select: { id: true },
    }),
    prisma.invoice.findMany({
      where: { userId, status: "PAID" },
      select: { id: true },
    }),
  ]);


  const revenueByCurrency: Record<string, number> = {};
  data.forEach((invoice) => {
    if (!revenueByCurrency[invoice.currency]) {
      revenueByCurrency[invoice.currency] = 0;
    }
    revenueByCurrency[invoice.currency] += invoice.total;
  });

  return {
    revenueByCurrency,
    totalInvoices: data.length,
    paidInvoices: paidInvoices.length,
    openInvoices: openInvoices.length,
  };
}

export default async function DashboardBlocks() {
  const session = await requireUser();
  const {
    revenueByCurrency,
    totalInvoices,
    paidInvoices,
    openInvoices,
  } = await getData(session.user?.id as string);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Total Revenue</CardTitle>
          <DollarSign className="size-4 shrink-0 text-muted-foreground" />
        </CardHeader>
        <CardContent className="pb-4">
          <div className="font-medium text-sm space-y-1 pb-1">
            {Object.entries(revenueByCurrency).map(
              ([currency, total]) => (
                <div
                  key={currency}
                  className="flex items-center justify-between"
                >
                  <span className="text-muted-foreground">{currency}</span>
                  <span>
                    {formatCurrency({
                      amount: total,
                      currency: currency as "USD" | "EUR" | "INR",
                    })}
                  </span>
                </div>
              )
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on total volume
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Total Invoices Issued</CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-2xl pb-2 mt-4">+{totalInvoices}</h2>
          <p className="text-xs text-muted-foreground mt-4">Total Invoices Issued!</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Paid Invoices</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-2xl pb-2 mt-4">+{paidInvoices}</h2>
          <p className="text-xs text-muted-foreground mt-4">
            Total Invoices Which have been paid!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Pending Invoices</CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-2xl pb-2 mt-4">+{openInvoices}</h2>
          <p className="text-xs text-muted-foreground mt-4">
            Invoice which are currently pending!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
