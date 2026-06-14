"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState("default");
  const [isTouch, setIsTouch] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const outerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const cursorState = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      
      if (cursorState) {
        setCursorType(cursorState);
      } else {
        const isButton = target.closest("button");
        const isLink = target.closest("a");
        if (isButton) setCursorType("button");
        else if (isLink) setCursorType("link");
        else setCursorType("default");
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 400);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const animate = () => {
      currentPos.current.x += (position.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (position.y - currentPos.current.y) * 0.12;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, isTouch]);

  if (isTouch) return null;

  const outerVariants = {
    default: {
      width: 36,
      height: 36,
      backgroundColor: "transparent",
      border: "1.5px solid var(--lavender)",
      borderRadius: "50%",
      opacity: 1,
    },
    button: {
      width: 56,
      height: 56,
      backgroundColor: "rgba(168, 213, 194, 0.2)",
      border: "1.5px solid transparent",
      borderRadius: "50%",
      opacity: 1,
    },
    view: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(196, 184, 224, 0.15)",
      border: "1.5px solid transparent",
      borderRadius: "50%",
      opacity: 1,
    },
    drag: {
      width: 72,
      height: 48,
      backgroundColor: "transparent",
      border: "1.5px solid var(--lavender)",
      borderRadius: "24px",
      opacity: 1,
    },
    link: {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: "1.5px solid var(--lavender)",
      borderRadius: "50%",
      opacity: 1,
    }
  };

  const innerVariants = {
    default: {
      scale: 1,
      opacity: 1,
    },
    button: {
      scale: 0,
      opacity: 0,
    },
    view: {
      scale: 0,
      opacity: 0,
    },
    drag: {
      scale: 0,
      opacity: 0,
    },
    link: {
      scale: 2,
      opacity: 1,
    }
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <motion.div
          animate={cursorType}
          variants={innerVariants}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: 8,
            height: 8,
            backgroundColor: "var(--mint)",
            borderRadius: "50%",
          }}
        />
      </div>

      <motion.div
        ref={outerRef}
        animate={cursorType}
        variants={outerVariants}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {cursorType === "button" && (
            <motion.span
              key="button-text"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                color: "var(--mint)",
                fontSize: "9px",
                fontFamily: "var(--font-sans)",
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              Click
            </motion.span>
          )}
          {cursorType === "view" && (
            <motion.span
              key="view-text"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                color: "var(--lavender)",
                fontSize: "10px",
                fontFamily: "var(--font-sans)",
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              View
            </motion.span>
          )}
          {cursorType === "drag" && (
            <motion.span
              key="drag-text"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                color: "var(--lavender)",
                fontSize: "10px",
                fontFamily: "var(--font-sans)",
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              Drag
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 1, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 0, x: "-50%", y: "-50%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: ripple.y,
            left: ripple.x,
            width: 60,
            height: 60,
            backgroundColor: "rgba(182, 199, 209, 0.3)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 9997,
          }}
        />
      ))}
    </>
  );
}
