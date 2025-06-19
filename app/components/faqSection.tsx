"use client";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const faqs = [
    {
        question: "What is InvoicePro and who is it for?",
        answer:
            "InvoicePro is a complete invoicing platform designed for freelancers, small businesses, and agencies. It lets you create, manage, and send professional invoices — all from one simple interface.",
    },
    {
        question: "Can I send invoices directly to my clients via email?",
        answer:
            "Absolutely! With InvoicePro, you can send invoices directly to your clients email addresses in just a click — no need to download PDFs or switch apps.",
    },
    {
        question: "Can I manually send payment reminders to clients?",
        answer:
            "Yes! InvoicePro allows you to send payment reminders to clients with just a click. It's an easy way to follow up on unpaid invoices without switching tools.",
    },
    {
        question: "Is there a limit on how many invoices I can create?",
        answer:
            "No limits on creativity or billing! InvoicePro allows you to create as many invoices as you need. Unlimited access is available.",
    },
    {
        question: "Is InvoicePro secure and private?",
        answer:
            "Yes, InvoicePro is built with security in mind. All your invoice data, client emails, and payment history are encrypted and stored safely.",
    },
];

export default function Faqs() {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <section className="py-24">
            <div className="container">
                <h2 className="text-6xl font-medium mt-6 text-center max-w-xl mx-auto">
                    Got questions? We&apos;ve got your back.
                </h2>

                <div className="mt-12 flex flex-col gap-6 max-w-xl mx-auto">
                    {faqs.map((faq, faqIndex) => (
                        <div
                            key={faq.question}
                            className={twMerge(
                                "rounded-2xl border border-black/10 p-6 transition-colors duration-300",
                                selectedIndex === faqIndex &&
                                "border-purple-500 bg-purple-50"
                            )}
                        >
                            <div
                                onClick={() =>
                                    setSelectedIndex(
                                        selectedIndex === faqIndex ? -1 : faqIndex
                                    )
                                }
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <h3 className="font-medium text-base md:text-lg">
                                    {faq.question}
                                </h3>
                                <PlusIcon
                                    className={twMerge(
                                        "flex-shrink-0 transition-transform duration-500",
                                        selectedIndex === faqIndex && "rotate-45"
                                    )}
                                />
                            </div>

                            <AnimatePresence initial={false}>
                                {selectedIndex === faqIndex && (
                                    <motion.div
                                        initial={{ height: 0, marginTop: 0 }}
                                        animate={{ height: "auto", marginTop: 24 }}
                                        exit={{ height: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
