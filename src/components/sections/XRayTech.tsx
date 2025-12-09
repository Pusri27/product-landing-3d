"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { useState, useRef, MouseEvent, TouchEvent } from "react";

export function XRayTech() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        const position = clientX - left;
        const percentage = Math.max(0, Math.min(100, (position / width) * 100));
        setSliderPosition(percentage);
    };

    const onMouseMove = (e: MouseEvent) => {
        // Interactive on hover or drag
        handleMove(e.clientX);
    };

    return (
        <section className="py-32 bg-black overflow-hidden select-none">
            <Container>
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">See What Lies Within</h2>
                    <p className="text-zinc-400">Reveal the complex engineering beneath the seamless exterior.</p>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden cursor-ew-resize touch-none border border-white/10"
                    onMouseMove={onMouseMove}
                    onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                >
                    {/* Base Image (Internal/X-Ray) */}
                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                        {/* Placeholder for X-Ray Image */}
                        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="grid grid-cols-4 gap-4 w-3/4 h-3/4 opacity-30">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="border border-blue-500/50 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-500 text-xs font-mono">CHIP-{i}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="absolute bottom-8 right-8 font-mono text-blue-400 text-sm">INTERNAL ARCHITECTURE</p>
                    </div>

                    {/* Overflow Image (External/Product) */}
                    <motion.div
                        className="absolute inset-0 bg-zinc-800"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                        {/* Placeholder for External Image */}
                        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/5 backdrop-blur-3xl shadow-2xl" />
                        </div>
                        <p className="absolute bottom-8 left-8 font-mono text-white text-sm">EXTERIOR FINISH</p>
                    </motion.div>

                    {/* Slider Line */}
                    <div
                        className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl">
                            <div className="w-1 h-3 bg-black/50 rounded-full mx-0.5" />
                            <div className="w-1 h-3 bg-black/50 rounded-full mx-0.5" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
