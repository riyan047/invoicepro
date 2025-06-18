import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            clientName: true,
            clientEmail: true,
            total: true,
            currency: true
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 7
    });
    return data;
}

export async function RecentInvoices() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent invoices</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
                    >
                        <Avatar className="hidden sm:flex size-9">
                            <AvatarFallback>
                                {item.clientName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-medium leading-none">
                                {item.clientName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {item.clientEmail}
                            </p>
                        </div>

                        <div className="text-right font-semibold text-sm">
                            +{formatCurrency({
                                amount: item.total,
                                currency: item.currency as any,
                            })}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

    )
}

