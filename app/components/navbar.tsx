import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo_from_svg.png";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "../utils/auth";

export async function Navbar() {
    const session = await auth();
    return (
        <header className="w-full">
            <div className=" flex justify-between items-center py-5">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src={Logo}
                        alt="InvoicePro Logo"
                        className="w-10 h-10"
                        priority
                    />
                    <span className="text-3xl font-bold leading-none tracking-tight">
                        Invoice
                        <span className="bg-gradient-to-b from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                            Pro
                        </span>
                    </span>
                </Link>
                <Link
                    href="/login"
                    className={buttonVariants({ variant: "default" })}
                >
                    {session ? "Dashboard" : "Get Started"}
                </Link>
            </div>
        </header>
    );
}
