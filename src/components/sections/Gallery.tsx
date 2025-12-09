"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const images = [
    { color: "from-blue-500 to-indigo-500", caption: "Deep Sea Blue" },
    { color: "from-zinc-500 to-zinc-700", caption: "Space Grey" },
    { color: "from-amber-200 to-yellow-500", caption: "Gold Dust" },
    { color: "from-emerald-500 to-green-700", caption: "Forest Green" },
];

export function Gallery() {
    return (
        <section className="py-32 bg-zinc-950">
            <Container>
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Gallery</h2>
                    <div className="h-1 w-20 bg-white" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900"
                        >
                            {/* Placeholder for actual image */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${img.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white font-mono opacity-20 text-9xl group-hover:scale-110 transition-transform duration-700">
                                    {index + 1}
                                </span>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                                <p className="text-white text-xl font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {img.caption}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
