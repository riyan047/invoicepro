import { ReactNode } from "react";
import { requierUser } from "../utils/hooks";
import Link from "next/link";
import Logo from "@/public/logo.png"
import NewLogo from "@/public/logo_from_svg.png"
import Image from "next/image";
import { DashboardLinks } from "../components/dashboardLinks";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "../utils/auth";
import prisma from "../utils/db";
import { redirect } from "next/navigation";
import LogoSvg from "@/public/logo";
import { Toaster } from "@/components/ui/sonner";

async function getUser(userId: string) {
    //if the user has not finished unboarding we redirect them to onboarding to complete it 1st
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            firstName: true,
            lastName: true,
            address: true
        }
    });
    if (!data?.firstName || !data.lastName || !data.address) {
        redirect("/onboarding")
    }
}

export default async function DashboardLayout({ children }:
    { children: ReactNode }
) {
    const session = await requierUser();

    const data = await getUser(session.user?.id as string);


    return (
        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex flex-col max-h-screen h-full gap-2">
                        <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/" className="flex items-center gap-2 ">
                                <LogoSvg />
                                <span className="text-2xl font-bold leading-none flex items-center">
                                    Invoice<span className="text-blue-600">Pro</span>
                                </span>
                            </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 ml-3 text-sm font-mediumlf:px-4">
                                <DashboardLinks />
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <header className="flex h-14 items-center gap-4  border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="md:hidden"
                                >
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetTitle />
                            <SheetContent side="left">
                                <div className="flex items-center gap-2 pt-6">
                                    <Image src={NewLogo} alt="" className="size-10" />
                                    <span className="text-2xl font-bold leading-none flex items-center">
                                        Invoice<span className="text-blue-600">Pro</span>
                                    </span>
                                </div>
                                <nav className="grid gap-2 mt-10">
                                    <DashboardLinks />
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <div className="flex items-center ml-auto">
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full">
                                        <User2 />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/invoices">
                                            Invoices
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <form
                                            action={async () => {
                                                "use server"
                                                await signOut();
                                            }}
                                            className="w-full"
                                        >
                                            <button className="w-full text-left">Logout</button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
            <Toaster richColors closeButton theme="light" />
        </>
    );
}