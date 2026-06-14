"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export function useMagneticEffect<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      
      // Calculate boundaries within 80px
      const isNearX = e.clientX >= rect.left - 80 && e.clientX <= rect.right + 80;
      const isNearY = e.clientY >= rect.top - 80 && e.clientY <= rect.bottom + 80;

      if (isNearX && isNearY) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Max distance from center to trigger area edge roughly
        const maxDistX = rect.width / 2 + 80;
        const maxDistY = rect.height / 2 + 80;
        
        // Move max 12px
        x.set((distanceX / maxDistX) * 12);
        y.set((distanceY / maxDistY) * 12);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  return { ref, x: springX, y: springY };
}
