
import SubmitButton from "@/app/components/submitButtons";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import PaidGif from "@/public/paid-gif.gif"
import { MarkAsPaidAction } from "@/app/actions";
import prisma from "@/app/utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "@/app/utils/hooks";

async function Authorize(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId
        }
    });
    if (!data) {
        return redirect("/dashboard/invoices")
    }
}
export default async function MarkAsPaid(
    { params }: {
        params: Promise<{ invoiceId: string }>
    }
) {
    const { invoiceId } = await params;
    const session = await requireUser()
    await Authorize(invoiceId, session.user?.id as string)
    return (
        <div className="flex flex-1 justify-center items-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>Mark as Paid?</CardTitle>
                    <CardDescription>
                        Are you sure that you want to mark this invoice as paid?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image
                        src={PaidGif}
                        alt="PaidGif"
                        className="rounded-lg" />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Link
                        href="/dashboard/invoices"
                        className={buttonVariants({ variant: "outline" })}
                    >Cancel
                    </Link>
                    <form action={
                        async () => {
                            "use server"
                            await MarkAsPaidAction(invoiceId)
                        }
                    } >
                        <SubmitButton text="Mark as Paid!"
                            variant="default"
                        />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}