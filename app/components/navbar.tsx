import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/dashboard.png"
import Logo from "@/public/logo_from_svg.png";
import { buttonVariants } from "@/components/ui/button";


export function Navbar() {
    return (
        <div className="flex justify-between items-center py-5 ">
            <Link href="/" className="flex items-center  ">
                <Image src={Logo} alt="Logo" className="size-10" />
                <span className="text-3xl font-bold leading-none flex items-center">
                    Invoice<span className="bg-gradient-to-b from-indigo-600 to-purple-700 bg-clip-text text-transparent">Pro</span>
                </span>
            </Link>
            <Link href={"/login"} className={buttonVariants()}>
                Get Started
            </Link>
        </div>
    )
}