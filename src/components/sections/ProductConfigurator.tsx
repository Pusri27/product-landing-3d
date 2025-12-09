"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Scene } from "@/components/3d/Scene";
import { useConfiguratorStore } from "@/store/useConfiguratorStore";
import { cn } from "@/lib/utils";

export function ProductConfigurator() {
    const { activeSection, hoveredSection, setActiveSection, setHoveredSection } = useConfiguratorStore();

    return (
        <section id="design" className="h-screen py-20 bg-zinc-950 overflow-hidden relative">
            <div className="absolute inset-x-0 top-20 text-center z-10 pointer-events-none">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                            Angle of Perfection.
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            Interact with the model directly or select a component below.
                        </p>
                    </motion.div>
                </Container>
            </div>

            <div className="w-full h-full relative z-0">
                <Scene />
            </div>

            <div className="absolute bottom-20 left-0 right-0 z-10 pointer-events-none">
                <Container className="flex justify-between items-end">
                    <motion.div
                        onHoverStart={() => setHoveredSection('architecture')}
                        onHoverEnd={() => setHoveredSection(null)}
                        onClick={() => setActiveSection(activeSection === 'architecture' ? null : 'architecture')}
                        className={cn(
                            "bg-black/40 backdrop-blur-md p-6 rounded-2xl border transition-all duration-300 cursor-pointer pointer-events-auto",
                            activeSection === 'architecture' || hoveredSection === 'architecture'
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-white/10"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <p className={cn(
                            "text-xs uppercase tracking-wider mb-1 transition-colors",
                            activeSection === 'architecture' ? "text-blue-400" : "text-zinc-500"
                        )}>Architecture</p>
                        <p className="font-mono text-white text-lg">Crystalline Housing</p>
                    </motion.div>

                    <motion.div
                        onHoverStart={() => setHoveredSection('core')}
                        onHoverEnd={() => setHoveredSection(null)}
                        onClick={() => setActiveSection(activeSection === 'core' ? null : 'core')}
                        className={cn(
                            "bg-black/40 backdrop-blur-md p-6 rounded-2xl border transition-all duration-300 cursor-pointer pointer-events-auto text-right",
                            activeSection === 'core' || hoveredSection === 'core'
                                ? "border-indigo-500 bg-indigo-500/10"
                                : "border-white/10"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <p className={cn(
                            "text-xs uppercase tracking-wider mb-1 transition-colors",
                            activeSection === 'core' ? "text-indigo-400" : "text-zinc-500"
                        )}>Core</p>
                        <p className="font-mono text-white text-lg">Quantum Driver</p>
                    </motion.div>
                </Container>
            </div>
        </section>
    );
}
