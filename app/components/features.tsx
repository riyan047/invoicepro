"use client";

import { motion } from "framer-motion";
import { DotLottiePlayer } from "@dotlottie/react-player";

const features = [
    {
        title: "Beautiful Dashboard",
        description:
            "Track invoices, monitor payments, and manage clients — all in one unified interface.",
        lottie: "/assets/lottie/beautiful.lottie",
    },
    {
        title: "One-Click Sending",
        description:
            "Email invoices to clients instantly. No more switching apps or exporting PDFs.",
        lottie: "/assets/lottie/send.lottie",
    },
    {
        title: "Reminders",
        description:
            "Notify clients about upcoming and overdue payments.",
        lottie: "/assets/lottie/reminder.lottie",
        tag: "New",
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container max-w-6xl mx-auto text-center px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-black"
                >
                    Everything you need to bill smarter
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-black/70 text-lg max-w-2xl mx-auto mt-4"
                >
                    From creating invoices to sending reminders — <strong>InvoicePro</strong> handles it all so you don&apos;t have to.
                </motion.p>

                <div className="grid gap-8 md:grid-cols-3 mt-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                            className="group bg-white border border-zinc-200 rounded-2xl p-6 shadow-md hover:shadow-[0_8px_30px_rgba(168,85,247,0.25)] transition-shadow flex flex-col items-start text-left"

                        >
                            <div className="w-16 h-16 flex items-center justify-center rounded-xl border border-zinc-100 bg-zinc-50 mb-6 group-hover:scale-105 transition-transform">
                                <DotLottiePlayer
                                    src={feature.lottie}
                                    autoplay
                                    loop
                                    className="w-8 h-8"
                                    style={{ background: "transparent" }}
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                                {feature.title}
                                {feature.tag && (
                                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                                        {feature.tag}
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
