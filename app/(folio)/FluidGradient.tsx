"use client";

import { shaderMaterial } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uTime;
  varying vec2 vUv;

  vec3 colorA = vec3(0.2, 0.3, 0.5);
  vec3 colorB = vec3(0.5, 0.3, 0.4);
  vec3 colorC = vec3(0.3, 0.5, 0.4);

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec2 mousePos = uMouse / uResolution.xy;
    
    // Slowly changing colors based on time and mouse position
    vec3 dynamicColorA = colorA + 0.2 * vec3(sin(uTime * 0.1 + mousePos.x), sin(uTime * 0.2 + mousePos.y), sin(uTime * 0.3));
    vec3 dynamicColorB = colorB + 0.2 * vec3(cos(uTime * 0.2 + mousePos.y), cos(uTime * 0.3 + mousePos.x), cos(uTime * 0.1));
    vec3 dynamicColorC = colorC + 0.2 * vec3(sin(uTime * 0.3 + mousePos.x * mousePos.y), sin(uTime * 0.1), sin(uTime * 0.2));
    
    vec3 color = mix(dynamicColorA, dynamicColorB, st.x);
    color = mix(color, dynamicColorC, st.y);
    
    float dist = distance(st, mousePos);
    float strength = smoothstep(0.5, 0.0, dist);
    
    vec3 finalColor = mix(color, vec3(1.0), strength * 0.5);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const GradientMaterial = shaderMaterial(
  {
    uMouse: [0, 0],
    uResolution: [1, 1],
    uTime: 0,
  },
  vertexShader,
  fragmentShader,
);

// Extend the GradientMaterial to make it available as a JSX element
extend({ GradientMaterial });

function GradientPlane() {
  const materialRef = useRef();
  const { size, viewport } = useThree();

  useFrame(({ clock, mouse }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uMouse.value = [
        (mouse.x * 0.5 + 0.5) * size.width,
        (1 - (mouse.y * 0.5 + 0.5)) * size.height,
      ];
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value = [size.width, size.height];
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <gradientMaterial ref={materialRef} />
    </mesh>
  );
}

function Scene() {
  return <GradientPlane />;
}

export default function GradientMouseInteractionScene() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
    </div>
  );
}
