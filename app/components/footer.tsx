import Logo from "@/public/logo_from_svg.png";
import githubLogo from "@/public/github.png";
import linkedInLogo from "@/public/linkedin.svg";
import xLogo from "@/public/x.svg";

import Image from "next/image";
const footerLinks = [
    { href: "#", label: "Contact" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms & Conditions" },
];

export default function Footer() {
    return (
        <section className="py-16">
            <div className="container flex flex-col md:flex-row md:justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <Image src={Logo} alt="Logo" className="size-10" />
                    <span className="text-3xl font-bold leading-none tracking-tight">
                        Invoice
                        <span className="bg-gradient-to-b from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                            Pro
                        </span>
                    </span>
                </div>
                <div className="flex justify-between gap-12 flex-col md:flex-row items-center">
                    <nav className="flex gap-6">
                        {footerLinks.map(footerLink => (
                            <a key={footerLink.label} href={footerLink.href} className=" text-black/50 text-sm">{footerLink.label}</a>
                        ))}
                    </nav>
                    <div className="flex gap-6">
                        <a href="https://www.linkedin.com/in/riyan-g" target="_blank"><Image src={linkedInLogo} alt="LinkedIn" className="size-5 text-black" /></a>
                        <a href="https://x.com/Riyan50889755" target="_blank"><Image src={xLogo} alt="X" className="size-5 " /></a>
                        <a href="https://github.com/riyan047" target="_blank"><Image src={githubLogo} alt="Github" className="size-5 " /></a>
                    </div>
                </div>
            </div>
        </section>
    )
}