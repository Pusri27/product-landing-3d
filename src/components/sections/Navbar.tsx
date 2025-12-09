"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    useEffect(() => {
        // Scroll Spy Logic
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                        // Update URL hash without jumping
                        window.history.replaceState(null, "", `#${entry.target.id}`);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -50% 0px", // Trigger when section is near center/top
                threshold: 0.1,
            }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "Design", href: "#design" },
        { name: "Specs", href: "#specs" },
    ];

    return (
        <motion.nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-black/50 backdrop-blur-md border-b border-white/10" : "bg-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container className="flex items-center justify-between h-20">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                    Lumina
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors relative",
                                activeSection === link.href.substring(1)
                                    ? "text-white"
                                    : "text-zinc-400 hover:text-white"
                            )}
                        >
                            {link.name}
                            {activeSection === link.href.substring(1) && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                    <MagneticButton size="sm" className="bg-white text-black hover:bg-zinc-200">
                        Pre-order
                    </MagneticButton>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center">
                    <button
                        className="text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </Container>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-black border-b border-white/10"
                >
                    <Container className="flex flex-col gap-4 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-base font-medium block",
                                    activeSection === link.href.substring(1)
                                        ? "text-white"
                                        : "text-zinc-400 hover:text-white"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <MagneticButton className="w-full">Pre-order</MagneticButton>
                    </Container>
                </motion.div>
            )}
        </motion.nav>
    );
}
