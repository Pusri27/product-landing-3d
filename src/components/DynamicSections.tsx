"use client";

import dynamic from 'next/dynamic';

import { ErrorBoundary } from "@/components/infrastructure/ErrorBoundary";

// Lazy load heavy 3D and interactive components
// ssr: false ensures they only load on the client, avoiding server-side mismatch and reducing initial bundle size

export const DynamicFluidBackground = dynamic(() => import("@/components/effects/FluidBackground").then(mod => mod.FluidBackground), { ssr: false });

export const DynamicProductConfigurator = dynamic(() => import("@/components/sections/ProductConfigurator").then(mod => mod.ProductConfigurator), {
    ssr: false,
    loading: () => <div className="h-screen bg-zinc-950/20" /> // Placeholder to prevent layout shift
});
// Wrapper to add resilience to the critical 3D path
export const ResilientProductConfigurator = () => (
    <ErrorBoundary moduleName="3D Configurator">
        <DynamicProductConfigurator />
    </ErrorBoundary>
);

export const DynamicScrollVideo = dynamic(() => import("@/components/sections/ScrollVideo").then(mod => mod.ScrollVideo), { ssr: false });

export const DynamicXRayTech = dynamic(() => import("@/components/sections/XRayTech").then(mod => mod.XRayTech), { ssr: false });
