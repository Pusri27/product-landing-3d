"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Cpu, Shield, Zap, Globe, Eye, Wifi } from "lucide-react";

const features = [
    {
        icon: Cpu,
        title: "Neural Engine",
        description: "Next-generation processing power that adapts to your workflow in real-time.",
    },
    {
        icon: Shield,
        title: "Titanium Grade",
        description: "Aerospace-grade titanium chassis for ultimate durability and featherlight weight.",
    },
    {
        icon: Zap,
        title: "All-Day Power",
        description: "Revolutionary battery technology providing up to 48 hours of continuous use.",
    },
    {
        icon: Globe,
        title: "Global Connectivity",
        description: "Ultra-fast 6G support ensuring you remain connected anywhere on Earth.",
    },
    {
        icon: Eye,
        title: "Retina XDR",
        description: "6000 nits peak brightness for crystal clear visibility in direct sunlight.",
    },
    {
        icon: Wifi,
        title: "Quantum Sync",
        description: "Instant data synchronization across all your devices with zero latency.",
    },
];

export function Features() {
    return (
        <section id="features" className="py-32 bg-black relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-900/80 hover:border-white/10 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
