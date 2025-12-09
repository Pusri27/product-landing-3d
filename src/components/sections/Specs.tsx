"use client";

import { Container } from "@/components/ui/Container";

const specs = [
    { category: "Audio", details: ["Adaptive Active Noise Cancellation", "Spatial Audio with Dynamic Head Tracking", "Custom High-Excursion Driver"] },
    { category: "Connectivity", details: ["Bluetooth 5.4", "Ultra-Wideband (UWB) Chip", "MagSafe Wireless Charging"] },
    { category: "Sensors", details: ["Optical In-Ear Sensor", "Motion-Detecting Accelerometer", "Speech-Detecting Accelerometer"] },
    { category: "Battery", details: ["Up to 48 Hours Listening Time", "Fast Fuel: 5 mins = 4 hours", "USB-C Charging Case"] },
    { category: "Materials", details: ["Aerospace-Grade Titanium", "Memory Foam Ear Cushions", "Recycled Rare Earth Magnets"] },
];

export function Specs() {
    return (
        <section id="specs" className="py-32 bg-zinc-950">
            <Container>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">Technical Specifications</h2>

                <div className="space-y-12">
                    {specs.map((spec, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                            <h3 className="text-xl font-medium text-zinc-400">{spec.category}</h3>
                            <div className="md:col-span-2 space-y-4">
                                {spec.details.map((detail, dIndex) => (
                                    <p key={dIndex} className="text-lg text-white font-light">{detail}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="border-t border-white/10" />
                </div>
            </Container>
        </section>
    );
}
