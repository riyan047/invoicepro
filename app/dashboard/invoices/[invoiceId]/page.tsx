import { EditInvoice } from "@/app/components/editInvoice";
import prisma from "@/app/utils/db"
import { requierUser } from "@/app/utils/hooks";
import { notFound, useParams } from "next/navigation";

async function getData(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId
        }
    });
    if (!data) {
        return notFound();
    }
    return data;
}

type Params = Promise<{ invoiceId: string }>

export default async function EditInvoiceRoute({ params }: { params: Params }) {
    const { invoiceId } = await params;
    const session = await requierUser();

    const data = await getData(invoiceId, session.user?.id as string);

    return (
        <div>
            <EditInvoice data={data} />
        </div>
    )
}