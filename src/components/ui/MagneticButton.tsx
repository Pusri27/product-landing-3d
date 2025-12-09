"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export function MagneticButton({
    children,
    className,
    onClick,
    variant = "primary",
    size = "md",
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * 0.35); // Adjust magnet strength
        y.set(distanceY * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const variants = {
        primary:
            "bg-white text-black hover:bg-zinc-200 border-none",
        secondary:
            "bg-zinc-800 text-white hover:bg-zinc-700",
        outline:
            "bg-transparent border border-zinc-700 text-white hover:bg-white/5",
        ghost: "bg-transparent text-white hover:bg-white/5",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <motion.button
            ref={ref}
            className={cn(
                "relative rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-2 overflow-hidden",
                variants[variant],
                sizes[size],
                className
            )}
            style={{
                x: springX,
                y: springY,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </motion.button>
    );
}
