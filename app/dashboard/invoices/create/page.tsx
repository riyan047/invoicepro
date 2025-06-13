import { CreateInvoice } from "@/app/components/createInvoice";
import prisma from "@/app/utils/db";
import { requierUser } from "@/app/utils/hooks";
import { useParams } from "next/navigation";

async function getUserData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            firstName: true,
            lastName: true,
            address: true,
            email: true
        }
    });
    return data
}

export default async function InvoiceCreationRoute() {
    const session = await requierUser();

    const data = await getUserData(session.user?.id as string);

    return (
        <CreateInvoice
            firstName={data?.firstName as string}
            lastName={data?.lastName as string}
            address={data?.address as string}
            email={data?.email as string}

        />
    );
}