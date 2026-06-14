"use client";

import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface OrbConfig {
  id: number;
  color: "mint" | "lavender" | "white";
  size: number;
  top: string;
  left: string;
  animationClass: string;
  repulsion: boolean;
}

export function AmbientOrbs({ count = 8 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();
  const orbsRef = useRef<(HTMLDivElement | null)[]>([]);

  const allOrbs: OrbConfig[] = [
    { id: 1, color: "mint", size: 300, top: "10%", left: "15%", animationClass: "animate-orb-1", repulsion: true },
    { id: 2, color: "lavender", size: 400, top: "60%", left: "80%", animationClass: "animate-orb-2", repulsion: false },
    { id: 3, color: "white", size: 250, top: "70%", left: "10%", animationClass: "animate-orb-3", repulsion: true },
    { id: 4, color: "mint", size: 450, top: "20%", left: "75%", animationClass: "animate-orb-4", repulsion: false },
    { id: 5, color: "lavender", size: 350, top: "40%", left: "40%", animationClass: "animate-orb-5", repulsion: true },
    { id: 6, color: "white", size: 500, top: "-5%", left: "55%", animationClass: "animate-orb-6", repulsion: false },
    { id: 7, color: "mint", size: 200, top: "85%", left: "50%", animationClass: "animate-orb-7", repulsion: true },
    { id: 8, color: "lavender", size: 280, top: "45%", left: "10%", animationClass: "animate-orb-8", repulsion: false },
  ];

  const orbs = allOrbs.slice(0, count);

  useEffect(() => {
    let animationFrameId: number;
    const currentTransforms = orbs.map(() => ({ x: 0, y: 0 }));

    const render = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = mousePos.current.x - containerRect.left;
      const mouseY = mousePos.current.y - containerRect.top;

      orbsRef.current.forEach((orbEl, index) => {
        if (!orbEl) return;
        
        const orbRect = orbEl.getBoundingClientRect();
        // Calculate center based on the wrapper's rect
        const orbX = orbRect.left - containerRect.left + orbRect.width / 2;
        const orbY = orbRect.top - containerRect.top + orbRect.height / 2;

        const dx = mouseX - orbX;
        const dy = mouseY - orbY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = 0;
        let targetY = 0;

        const config = orbs[index];

        if (config.repulsion) {
           const pushDist = Math.max(0, 500 - dist) / 500 * 20;
           if (dist > 0) {
             targetX = -(dx / dist) * pushDist;
             targetY = -(dy / dist) * pushDist;
           }
        } else {
           const pullDist = Math.min(dist, 1000) / 1000 * 8;
           if (dist > 0) {
             targetX = (dx / dist) * pullDist;
             targetY = (dy / dist) * pullDist;
           }
        }

        currentTransforms[index].x += (targetX - currentTransforms[index].x) * 0.05;
        currentTransforms[index].y += (targetY - currentTransforms[index].y) * 0.05;

        // Apply translation over the base -50% -50% to maintain center
        orbEl.style.transform = `translate(-50%, -50%) translate3d(${currentTransforms[index].x}px, ${currentTransforms[index].y}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [orbs, mousePos]);

  const getColor = (color: string) => {
    if (color === "mint") return "rgba(168,213,194,0.35)";
    if (color === "lavender") return "rgba(196,184,224,0.30)";
    return "rgba(255,255,255,0.5)";
  };

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {orbs.map((orb, index) => (
        <div
          key={orb.id}
          ref={(el) => {
            orbsRef.current[index] = el;
          }}
          className="absolute pointer-events-none"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className={`w-full h-full rounded-full ${orb.animationClass}`}
            style={{
              background: `radial-gradient(circle, ${getColor(orb.color)} 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
