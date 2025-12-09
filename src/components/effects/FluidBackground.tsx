"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

const FluidShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#000000") },
        uColor2: { value: new THREE.Color("#1a1a1a") },
        uColor3: { value: new THREE.Color("#0f172a") },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      float noise = snoise(vUv * 3.0 + uTime * 0.1);
      float noise2 = snoise(vUv * 2.0 - uTime * 0.05);
      
      vec3 color = mix(uColor1, uColor2, noise * 0.5 + 0.5);
      color = mix(color, uColor3, noise2 * 0.5 + 0.5);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

function GradientPlane() {
    const mesh = useRef<THREE.Mesh>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color("#050505") }, // Dark background
            uColor2: { value: new THREE.Color("#1e293b") }, // Slate hint
            uColor3: { value: new THREE.Color("#000000") }, // Deep black
            uMouse: { value: new THREE.Vector2(0, 0) },
        }),
        []
    );

    useFrame((state) => {
        if (mesh.current) {
            // @ts-ignore
            mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
            // @ts-ignore
            mesh.current.material.uniforms.uMouse.value.lerp(new THREE.Vector2(mouse.current.x, mouse.current.y), 0.05);
        }
    });

    // Update mouse ref on window mouse move
    // Note: ideally this should be done via R3F state.mouse but window listener acts globally for background
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        }
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <mesh ref={mesh}>
            <planeGeometry args={[20, 20]} />
            <shaderMaterial
                vertexShader={FluidShader.vertexShader}
                fragmentShader={FluidShader.fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export function FluidBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <GradientPlane />
            </Canvas>
        </div>
    );
}
