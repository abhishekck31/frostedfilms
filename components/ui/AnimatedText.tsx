"use client";

import { motion, useInView, useReducedMotion, useMotionValue, useTransform, animate } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

function extractWords(node: React.ReactNode): React.ReactNode[] {
  if (typeof node === "string" || typeof node === "number") {
    return node.toString().split(/(\s+)/).filter(Boolean);
  }
  
  if (React.isValidElement(node)) {
    if (node.type === "br") return [node];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const children = React.Children.toArray((node.props as any).children);
    const words = children.flatMap(extractWords);
    
    return words.map((w, i) => {
      if (typeof w === "string" && !w.trim()) return w;
      if (React.isValidElement(w) && w.type === "br") return w;
      return React.cloneElement(node as React.ReactElement, { key: i, children: w });
    });
  }
  
  if (Array.isArray(node)) {
    return node.flatMap(extractWords);
  }
  
  return [];
}

export function RevealText({ children, className, delay = 0, as: Component = "h1" }: { children: React.ReactNode; className?: string; delay?: number; as?: React.ElementType }) {
  const shouldReduceMotion = useReducedMotion();
  const words = React.Children.toArray(children).flatMap(extractWords);
  const MotionComponent = motion[Component as keyof typeof motion] || motion.h1;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } }
      }}
    >
      {words.map((word, i) => {
        if (typeof word === "string" && !word.trim()) {
          return word;
        }
        if (React.isValidElement(word) && word.type === "br") {
          return word;
        }
        
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              variants={shouldReduceMotion ? {} : {
                hidden: { y: "110%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </MotionComponent>
  );
}

export function CountUp({ from = 0, to, duration = 2, suffix = "", className }: { from?: number; to: number; duration?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (latest > 0 && latest % 10 === 0 && !shouldReduceMotion && spanRef.current) {
        animate(spanRef.current, { scale: [1, 1.1, 1] }, { duration: 0.3, ease: "easeOut" });
      }
    });
    return () => unsubscribe();
  }, [rounded, shouldReduceMotion]);

  useEffect(() => {
    if (isInView) {
      if (shouldReduceMotion) {
        count.set(to);
      } else {
        animate(count, to, { duration, ease: "easeOut" });
      }
    }
  }, [isInView, to, duration, count, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      <motion.span ref={spanRef} className="inline-block">{rounded}</motion.span>{suffix}
    </span>
  );
}

export function GradientHeadline({ children, className, as: Component = "h2" }: { children: React.ReactNode; className?: string; as?: React.ElementType }) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[Component as keyof typeof motion] || motion.h2;

  return (
    <MotionComponent
      className={cn("bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: "linear-gradient(90deg, #A8D5C2, #C4B8E0, #A8D5C2)",
        backgroundSize: "200% 100%",
      }}
      animate={shouldReduceMotion ? {} : {
        backgroundPosition: ["0% 0%", "100% 0%"]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {children}
    </MotionComponent>
  );
}

export function SplitReveal({ children, className, delay = 0, as: Component = "span" }: { children: string; className?: string; delay?: number; as?: React.ElementType }) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[Component as keyof typeof motion] || motion.span;
  const chars = children.split("");

  return (
    <MotionComponent
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.02, delayChildren: delay } }
      }}
    >
      {chars.map((char, i) => {
        if (char === " ") return <span key={i}> </span>;
        return (
          <motion.span
            key={i}
            className="inline-block"
            variants={shouldReduceMotion ? {} : {
              hidden: { y: "-100%", rotate: 5, opacity: 0 },
              visible: { y: 0, rotate: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
}
