"use client";

import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Background with parallax */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0 bg-radial-gradient from-zinc-900 via-black to-black opacity-80"
            >
                {/* Abstract background shapes or image could go here */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
            </motion.div>

            <Container className="relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="inline-block"
                    >
                        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase text-zinc-400 backdrop-blur-sm">
                            The Next Evolution
                        </span>
                    </motion.div>

                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 pb-4">
                        Lumina Prime
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                        Experience sound and vision in their purest form. <br className="hidden md:block" />
                        Precision engineering meets artistic expression.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <MagneticButton size="lg" className="min-w-[160px] text-lg">
                            Pre-order
                        </MagneticButton>
                        <MagneticButton size="lg" variant="outline" className="min-w-[160px] text-lg">
                            Watch Film
                        </MagneticButton>
                    </div>
                </motion.div>
            </Container>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest text-zinc-600">Scroll</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent"
                />
            </motion.div>
        </section>
    );
}
