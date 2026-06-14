"use client";

import { ReactLenis } from "lenis/react";
import { useAnimationFrame } from "framer-motion";
import { ReactNode, useRef } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<any>(null);

  useAnimationFrame((time) => {
    lenisRef.current?.lenis?.raf(time);
  });

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
