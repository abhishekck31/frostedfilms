"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  const highlightX = useTransform(rotateY, (value) => `${-value * 2}%`);
  const highlightY = useTransform(rotateX, (value) => `${-value * 2}%`);
  
  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("relative overflow-hidden transition-[box-shadow] duration-300 h-full rounded-2xl", className)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundColor: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          borderTop: "1px solid rgba(255,255,255,0.7)",
          borderLeft: "1px solid rgba(255,255,255,0.7)",
          borderBottom: "1px solid rgba(196,184,224,0.2)",
          borderRight: "1px solid rgba(196,184,224,0.2)",
        }}
        whileHover={{
          boxShadow: "0 24px 60px rgba(44,44,62,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
        initial={{
          boxShadow: "0 8px 32px rgba(44,44,62,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-[50%] z-10"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.0) 100%)",
            x: highlightX,
            y: highlightY,
          }}
        />
        <div className="relative z-20 h-full flex flex-col p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
