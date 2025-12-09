"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "./Model";

export function Scene() {
    return (
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing" style={{ touchAction: 'pan-y' }}>
            <Canvas
                shadows
                dpr={[1, 1.5]} // Cap DPR to 1.5 for performance on Retina screens
                camera={{ position: [0, 0, 4], fov: 45 }}
                gl={{ antialias: true, alpha: true }} // alpha true for better blending if needed, remove preserveDrawingBuffer
            >
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={1024} castShadow />
                    <Model />
                    <ContactShadows resolution={512} scale={20} blur={2} opacity={0.5} far={4} color="#000000" />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2.5}
                        maxPolarAngle={Math.PI / 2}
                        makeDefault // Ensures these controls take precedence
                    />
                </Suspense>
            </Canvas>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none mb-10">
                <p className="text-white/50 text-xs uppercase tracking-widest bg-black/20 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                    Drag to rotate
                </p>
            </div>
        </div>
    );
}
