"use client";

import { Container } from "@/components/ui/Container";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function ScrollVideo() {
    const targetRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    // Since we don't have a real image sequence, we will programmatically draw a "frame"
    // based on the scroll progress to simulate the effect.

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set high res
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        ctx.scale(dpr, dpr);

        const render = (progress: number) => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            ctx.clearRect(0, 0, width, height);

            // Draw a "Product" that rotates/changes based on scroll
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) * 0.3;

            // Dynamic background circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(30, 30, 35, ${Math.min(1, progress * 2)})`;
            ctx.fill();

            // Rotating rect to simulate product rotation
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(progress * Math.PI * 2);

            // "Front" face
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(-radius / 2, -radius / 4, radius, radius / 2);

            // "Side" details
            ctx.fillStyle = "#3b82f6"; // Blue accent
            ctx.fillRect(-radius / 2 + 20, -radius / 4 + 10, 10, 10);

            ctx.restore();

            // Text overlay on canvas
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.sin(progress * Math.PI))})`;
            ctx.font = "bold 24px monospace";
            ctx.textAlign = "center";
            ctx.fillText(`FRAME: ${Math.floor(progress * 100)}`, centerX, centerY + radius + 40);
        };

        // Subscribe to scroll changes
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            render(latest);
        });

        // Initial render
        render(0);

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section ref={targetRef} className="h-[200vh] bg-black relative">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <Container className="relative z-10 flex flex-col items-center">
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]) }}
                        className="mb-8 text-center"
                    >
                        <span className="text-blue-500 font-mono text-sm uppercase tracking-widest">
                            Frame-by-Frame Precision
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
                            Unrivaled Smoothness.
                        </h2>
                    </motion.div>

                    <canvas
                        ref={canvasRef}
                        className="w-full max-w-2xl aspect-square bg-zinc-900/50 rounded-full border border-white/5"
                    />
                </Container>
            </div>
        </section>
    );
}
