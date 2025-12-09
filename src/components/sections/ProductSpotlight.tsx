"use client";

import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ProductSpotlight() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const rotateX = useTransform(scrollYProgress, [0.3, 0.7], [30, 0]);
    const scale = useTransform(scrollYProgress, [0.3, 0.7], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

    return (
        <section ref={containerRef} className="py-32 bg-zinc-950 overflow-hidden perspective-1000">
            <Container>
                <motion.div style={{ opacity }} className="space-y-4 mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        Designed for perfection.
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Every curve, every detail, meticulously crafted to elevate your experience.
                    </p>
                </motion.div>

                <motion.div
                    style={{ rotateX, scale }}
                    className="relative mx-auto w-full max-w-5xl aspect-video rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden"
                >
                    {/* Mock Product Visual */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
                    <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full bg-black shadow-[0_0_100px_rgba(255,255,255,0.1)] border border-white/5 flex items-center justify-center">
                        <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
                    </div>

                    <div className="absolute bottom-10 left-10 flex gap-4">
                        <div className="p-4 rounded-xl bg-black/50 backdrop-blur border border-white/10">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider">Dimension</p>
                            <p className="font-mono text-white">42mm</p>
                        </div>
                        <div className="p-4 rounded-xl bg-black/50 backdrop-blur border border-white/10">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider">Material</p>
                            <p className="font-mono text-white">Titanium</p>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
