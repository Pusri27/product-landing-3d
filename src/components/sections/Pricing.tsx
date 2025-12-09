"use client";

import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
    {
        name: "Core",
        price: "$599",
        description: "Essential performance for everyday immersion.",
        features: ["Active Noise Cancellation", "24h Battery Life", "Basic Spatial Audio", "Silicone Ear Tips"],
    },
    {
        name: "Prime",
        price: "$899",
        featured: true,
        description: "The ultimate experience without compromise.",
        features: ["Adaptive Active Noise Cancellation", "48h Battery Life", "Pro Spatial Audio + Head Tracking", "Memory Foam Ear Tips", "Titanium Charging Case"],
    },
    {
        name: "Signature",
        price: "$1,299",
        description: "Bespoke materials and personalized tuning.",
        features: ["Everything in Prime", "Custom Engraving", "Priority Support", "Extended Warranty (2 Years)", "Limited Edition Colorways"],
    },
];

export function Pricing() {
    return (
        <section className="py-32 bg-black">
            <Container>
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Choose Your Reality</h2>
                    <p className="text-zinc-400 text-lg">Select the edition that fits your lifestyle.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative rounded-3xl p-8 border ${plan.featured ? "bg-zinc-900 border-white/20 scale-105 z-10 shadow-2xl" : "bg-black border-zinc-800"}`}
                        >
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mt-2">
                                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    </div>
                                    <p className="text-zinc-400 mt-2 text-sm">{plan.description}</p>
                                </div>

                                <div className="w-full h-px bg-white/10" />

                                <ul className="space-y-4 min-h-[200px]">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3 text-sm text-zinc-300">
                                            <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <MagneticButton
                                    className="w-full"
                                    variant={plan.featured ? "primary" : "outline"}
                                >
                                    Pre-order {plan.name}
                                </MagneticButton>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
