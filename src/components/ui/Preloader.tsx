"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Simulate loading
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 800);
                    return 100;
                }
                return prev + 1;
            });
        }, 20); // Adjust speed here

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                >
                    <div className="relative overflow-hidden w-full max-w-md px-10">
                        <motion.div
                            className="flex justify-between items-end mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Loading Experience</span>
                            <span className="text-white font-mono text-4xl">{count}%</span>
                        </motion.div>

                        <div className="h-px w-full bg-zinc-800 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-white"
                                style={{ width: `${count}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
