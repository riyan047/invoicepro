import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle, DownloadCloud, Mail, MoreHorizontal, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";

interface iAppProps {
    id: string
}

export function InvoiceActions({ id }: iAppProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}`}>
                        <PencilIcon className="size-4 mr-2" />
                        Edit Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/">
                        <DownloadCloud className="size-4 mr-2" />
                        Download Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/">
                        <Mail className="size-4 mr-2" />
                        Reminder email
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/">
                        <Trash className="size-4 mr-2" />
                        Delete Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/">
                        <CheckCircle className="size-4 mr-2" />
                        Mark as paid
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}