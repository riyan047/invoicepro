"use client";
import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CallToAction() {
    //@ts-ignore
    const animation = useRef<AnimationPlaybackControls>();
    const [scope, animate] = useAnimate();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        animation.current = animate(
            scope.current,
            { x: "-50%" },
            { duration: 30, ease: "linear", repeat: Infinity }
        );
    }, []);

    useEffect(() => {
        if (animation.current) {
            animation.current.speed = isHovered ? 0.5 : 1;
        }
    }, [isHovered]);

    return (
        <section className="py-24 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="overflow-x-clip p-4 flex">
                <motion.div
                    ref={scope}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="flex flex-none gap-16 pr-16 text-6xl md:text-7xl font-medium group cursor-pointer whitespace-nowrap"
                >
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-8">
                            <span className="text-purple-400 text-6xl">&#10038;</span>
                            <span className="text-black group-hover:bg-gradient-to-r group-hover:from-[#a855f7] group-hover:to-[#6366f1] group-hover:bg-clip-text group-hover:text-transparent py-2 transition-colors duration-300">
                                Try it for free
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
