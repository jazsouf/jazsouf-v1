"use client";

import { shaderMaterial, useFBO } from "@react-three/drei";
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
  uniform sampler2D uVelocityMap;
  uniform sampler2D uPrevMap;
  varying vec2 vUv;

  #define PI 3.14159265359

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
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
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
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

  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse / uResolution;
    
    // Velocity-based distortion
    vec2 velo = texture(uVelocityMap, uv).rg;
    uv += velo * 0.1;
    
    // Noise-based color
    float noise = snoise(uv * 3.0 + uTime * 0.1);
    
    // Color palette
    vec3 color1 = vec3(0.5, 0.8, 0.9);
    vec3 color2 = vec3(0.9, 0.7, 0.8);
    vec3 color3 = vec3(0.7, 0.9, 0.8);
    
    vec3 color = mix(color1, color2, noise);
    color = mix(color, color3, length(velo));
    
    // Hue shift based on mouse position
    vec3 hsv = rgb2hsv(color);
    hsv.x = fract(hsv.x + mouse.x * 0.1);
    color = hsv2rgb(hsv);
    
    // Vignette effect
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5));
    color *= vignette;
    
    // Blend with previous frame
    vec4 prev = texture(uPrevMap, uv);
    float blendFactor = 0.95;
    vec4 final = mix(vec4(color, 1.0), prev, blendFactor);
    
    gl_FragColor = final;
  }
`;

const GradientMaterial = shaderMaterial(
  {
    uMouse: [0, 0],
    uResolution: [1, 1],
    uTime: 0,
    uVelocityMap: null,
    uPrevMap: null,
  },
  vertexShader,
  fragmentShader,
);

extend({ GradientMaterial });

const VelocityMaterial = shaderMaterial(
  {
    uMouse: [0, 0],
    uResolution: [1, 1],
    uTime: 0,
  },
  vertexShader,
  `
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec2 mouse = uMouse / uResolution;
      vec2 dir = mouse - uv;
      float dist = length(dir);
      dir = normalize(dir);
      vec2 velocity = dir * (1.0 - smoothstep(0.0, 0.5, dist)) * 0.1;
      
      // Add some time-based variation
      velocity += vec2(sin(uTime + uv.x * 10.0), cos(uTime + uv.y * 10.0)) * 0.01;
      
      gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `,
);

extend({ VelocityMaterial });

function GradientPlane() {
  const materialRef = useRef();
  const velocityMaterialRef = useRef();
  const { size, viewport } = useThree();

  const velocityFBO = useFBO(size.width, size.height, {
    minFilter: "linear",
    magFilter: "linear",
    format: "rgba",
    type: "float",
  });

  const prevFBO = useFBO(size.width, size.height, {
    minFilter: "linear",
    magFilter: "linear",
    format: "rgba",
    type: "float",
  });

  useFrame(({ gl, scene, camera, pointer, clock }) => {
    if (materialRef.current && velocityMaterialRef.current) {
      const mouseX = (pointer.x * 0.5 + 0.5) * size.width;
      const mouseY = (1 - (pointer.y * 0.5 + 0.5)) * size.height;

      velocityMaterialRef.current.uMouse = [mouseX, mouseY];
      velocityMaterialRef.current.uTime = clock.getElapsedTime();
      velocityMaterialRef.current.uResolution = [size.width, size.height];

      // Update velocity map
      gl.setRenderTarget(velocityFBO);
      gl.render(scene, camera);
      gl.setRenderTarget(null);

      materialRef.current.uMouse = [mouseX, mouseY];
      materialRef.current.uTime = clock.getElapsedTime();
      materialRef.current.uResolution = [size.width, size.height];
      materialRef.current.uVelocityMap = velocityFBO.texture;
      materialRef.current.uPrevMap = prevFBO.texture;

      // Swap render targets
      const temp = prevFBO;
      prevFBO.texture = velocityFBO.texture;
      velocityFBO.texture = temp.texture;
    }
  });

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <gradientMaterial ref={materialRef} />
      </mesh>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <velocityMaterial ref={velocityMaterialRef} />
      </mesh>
    </>
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
