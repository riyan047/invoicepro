import { RainbowButton } from "@/components/magicui/rainbow-button";
import Image from "next/image";
import Link from "next/link";
import DashboardImage from "@/public/dashboard.png"

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center py-12 lg:py-20 mt-2">
            <div className="text-center">
                <span
                    className="text-sm text-primary tracking-tight font-medium bg-primary/10 px-4 py-2 rounded-full"
                >
                    Introducing InvoicePro 1.0
                </span>
                <h1
                    className="mt-8 text-4xl sm:text-6xl md:text-7xl
                lg:text-8xl font-bold tracking-tighter"
                >
                    Invoicing made <span className="block -mt-2 bg-gradient-to-b from-indigo-600 to-purple-700 bg-clip-text text-transparent pb-1">super easy!</span>
                </h1>
                <p
                    className="max-w-xl mx-auto mt-4 lg:text-lg text-black/75"
                >
                    Tired of juggling invoices? <strong>InvoicePro</strong> makes billing effortless — from creation to reminders — all in one place.
                </p>
                <div className="mt-7 mb-12">
                    <Link href="/login"
                    >
                        <RainbowButton>Get Unlimited Access</RainbowButton>
                    </Link>
                </div>
            </div>
            <div className="relative items-center w-full py-12 mx-auto mt-12">
                <svg
                    className="absolute inset-0 -mt-24 blur-3xl"
                    style={{ zIndex: -1 }}
                    fill="none"
                    viewBox="0 0 400 400"
                    height="100%"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_10_20)">
                        <g filter="url(#filter0_f_10_20)">
                            <path
                                d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                                fill="#8B5CF6" 
      />
                            <path
                                d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                                fill="#7C3AED"
      />
                            <path
                                d="M320 400H400V78.75L106.2 134.75L320 400Z"
                                fill="#6366F1" 
      />
                            <path
                                d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                                fill="#4F46E5" 
      />
                        </g>
                    </g>
                    <defs>
                        <filter
                            id="filter0_f_10_20"
                            x="-160.333"
                            y="-160.333"
                            width="720.666"
                            height="720.666"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                            <feGaussianBlur stdDeviation="80.1666" result="effect1_foregroundBlur_10_20" />
                        </filter>
                    </defs>
                </svg>

                <Image src={DashboardImage} alt="DashboardImage"
                    className="border relative object-cover rounded-lg lg:rounded-2xl shadow-2xl"
                />
            </div>
        </section>
    )
}