"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { useConfiguratorStore } from "@/store/useConfiguratorStore";

export function Model() {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);
    const { activeSection, hoveredSection, setHoveredSection } = useConfiguratorStore();

    // Derived state for visuals
    const isArchitectureActive = activeSection === 'architecture' || hoveredSection === 'architecture';
    const isCoreActive = activeSection === 'core' || hoveredSection === 'core';

    // Slow rotation
    useFrame((state, delta) => {
        if (meshRef.current) {
            // Rotate faster if core is active
            const speed = isCoreActive ? 2.0 : 0.2;
            meshRef.current.rotation.y += delta * speed;
        }
    });

    return (
        <Float floatIntensity={1} rotationIntensity={0.5} speed={1.5}>
            <group
                ref={meshRef}
                dispose={null}
                onPointerOver={() => { setHover(true); }}
                onPointerOut={() => { setHover(false); }}
            >
                {/* Abstract Procedural Earbud Shape - Architecture Layer */}
                <mesh
                    castShadow
                    receiveShadow
                    position={[0, 0, 0]}
                    onClick={(e) => { e.stopPropagation(); useConfiguratorStore.getState().setActiveSection('architecture'); }}
                    onPointerOver={() => useConfiguratorStore.getState().setHoveredSection('architecture')}
                    onPointerOut={() => useConfiguratorStore.getState().setHoveredSection(null)}
                >
                    <capsuleGeometry args={[0.8, 2, 4, 16]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        resolution={1024}
                        transmission={0.8}
                        roughness={0.1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        thickness={0.5}
                        ior={1.5}
                        chromaticAberration={0.06}
                        anisotropy={0.1}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.2}
                        color={isArchitectureActive ? "#3b82f6" : "#ffffff"} // Blue when active
                        background={new THREE.Color("#000000")}
                    />
                </mesh>

                {/* Inner Core - Core Layer */}
                <mesh
                    position={[0, 0, 0]}
                    onClick={(e) => { e.stopPropagation(); useConfiguratorStore.getState().setActiveSection('core'); }}
                    onPointerOver={() => useConfiguratorStore.getState().setHoveredSection('core')}
                    onPointerOut={() => useConfiguratorStore.getState().setHoveredSection(null)}
                >
                    <capsuleGeometry args={[0.5, 1.5, 4, 16]} />
                    <meshStandardMaterial
                        color="#1a1a1a"
                        emissive={new THREE.Color(isCoreActive ? "#6366f1" : (hovered ? "#4a90e2" : "#222"))} // Indigo when active
                        roughness={0.4}
                        metalness={0.8}
                    />
                </mesh>
            </group>
        </Float>
    );
}
