"use client";

import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Story() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <section ref={containerRef} className="py-32 bg-black text-white overflow-hidden">
            <Container className="relative">
                <div className="max-w-4xl mx-auto space-y-32">
                    <StoryItem
                        text="It started with a single idea: absolute purity."
                        progress={scrollYProgress}
                        range={[0.1, 0.3]}
                    />
                    <StoryItem
                        text="We stripped away the unnecessary, leaving only the essential."
                        progress={scrollYProgress}
                        range={[0.3, 0.5]}
                        align="right"
                    />
                    <StoryItem
                        text="The result is not just a device. It is an extension of you."
                        progress={scrollYProgress}
                        range={[0.5, 0.7]}
                    />
                </div>
            </Container>
        </section>
    );
}

function StoryItem({
    text,
    progress,
    range,
    align = "left"
}: {
    text: string;
    progress: any;
    range: [number, number];
    align?: "left" | "right"
}) {
    const opacity = useTransform(progress, range, [0, 1]);
    const y = useTransform(progress, range, [50, 0]);

    return (
        <motion.div
            style={{ opacity, y }}
            className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}
        >
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight max-w-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                {text}
            </h3>
        </motion.div>
    );
}
