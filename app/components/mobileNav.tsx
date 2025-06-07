"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MenuIcon } from "lucide-react"
import { dashboardLinks } from "./dashboardLinks"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function MobileNav() {
    const [navigationIsVisible, setNavigationIsVisible] = useState(false)
    const pathname = usePathname()

    return (
        <>
            {/* Toggle button in header */}
            <button
                className="bg-white/5 border border-black rounded-md p-2 md:hidden"
                onClick={() => setNavigationIsVisible((v) => !v)}
            >
                <span className="sr-only">Toggle navigation</span>
                <MenuIcon className="size-5" />
            </button>

            {/* Animated sidebar overlay */}
            <motion.div
                initial="hidden"
                animate={navigationIsVisible ? "visible" : "hidden"}
                variants={{
                    hidden: {
                        width: 0,
                        transition: {
                            staggerChildren: 0.1,
                            staggerDirection: -1,
                            delay: (dashboardLinks.length - 2) * 0.1
                        }
                    },
                    visible: {
                        width: 200,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                className="fixed top-0 left-0 z-50 h-full bg-blue-600 p-3 text-white overflow-hidden md:hidden shadow-lg"
            >
                {/* Close button inside nav */}
                <button
                    className="bg-white/10 border border-white/20 rounded-md p-2 mb-4"
                    onClick={() => setNavigationIsVisible(false)}
                >
                    <MenuIcon className="size-5" />
                </button>

                <nav>
                    <ul>
                        {dashboardLinks.map((item) => (
                            <motion.li
                                key={item.id}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                className={`py-3 px-3 rounded-md cursor-pointer transition-colors hover:bg-white/10 ${pathname === item.href ? "bg-white/10 font-semibold" : ""
                                    }`}
                            >
                                <Link href={item.href} onClick={() => setNavigationIsVisible(false)}>
                                    {item.name}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </nav>
            </motion.div>
        </>
    )
}
