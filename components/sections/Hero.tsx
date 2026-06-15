"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import { RevealText, SplitReveal } from "@/components/ui/AnimatedText";
import { useEffect, useState, useRef } from "react";

const phrases = [
  "Privacy & Beauty",
  "Style & Elegance",
  "Light & Comfort",
  "Calm & Safety"
];

const bgShifts = [
  "linear-gradient(135deg, rgba(168,213,194,0.15) 0%, rgba(196,184,224,0.15) 100%)",
  "linear-gradient(135deg, rgba(196,184,224,0.25) 0%, rgba(168,213,194,0.05) 100%)",
  "linear-gradient(135deg, rgba(234,229,245,0.3) 0%, rgba(168,213,194,0.2) 100%)",
  "linear-gradient(135deg, rgba(168,213,194,0.15) 0%, rgba(196,184,224,0.15) 100%)",
];

const shieldRotations = [-2, 2, -1, 1];

const buttonHover = {
  whileHover: { y: -2, scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

function AnimatedShield({ cycleIndex, parallaxY }: { cycleIndex: number, parallaxY: any }) {
  return (
    <motion.div
      style={{ y: parallaxY }}
      animate={{ rotate: shieldRotations[cycleIndex] }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="relative w-[320px] h-[360px] md:w-[480px] md:h-[540px]"
    >
      <svg
        viewBox="0 0 32 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="w-full h-full drop-shadow-[0_0_40px_rgba(168,213,194,0.4)]"
      >
        <defs>
          <clipPath id="hero-main-shield">
            <path d="M16 1.5L29 6.5V17.5C29 26.5 23 32.5 16 34.5C9 32.5 3 26.5 3 17.5V6.5L16 1.5Z" />
          </clipPath>
          <linearGradient id="shield-base" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D6EDE6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EAE5F5" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        
        <g clipPath="url(#hero-main-shield)">
          <rect width="32" height="36" fill="url(#shield-base)" />
          {/* SVG foreignObject lets us use normal CSS for the background pattern */}
          <foreignObject width="32" height="36">
            <div className="w-full h-full glass-pattern-drift opacity-60" />
          </foreignObject>
          <path d="M0 0L32 36H0V0Z" fill="rgba(255,255,255,0.15)" />
        </g>
        
        <path
          d="M16 1.5L29 6.5V17.5C29 26.5 23 32.5 16 34.5C9 32.5 3 26.5 3 17.5V6.5L16 1.5Z"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="0.4"
        />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const scrollY = useScrollPosition();
  const showScrollIndicator = scrollY < 80;

  const [cycleIndex, setCycleIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const eyebrowY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const h1Y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const shieldY = useTransform(scrollYProgress, [0, 1], [0, 80]); 

  return (
    <section
      id="hero"
      ref={targetRef}
      className="relative min-h-screen overflow-hidden flex flex-col justify-center"
    >
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ background: bgShifts[cycleIndex] }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      <AmbientOrbs count={6} />

      <div className="container-xl relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center px-6 py-28 md:py-32">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div style={{ y: eyebrowY }}>
             <SplitReveal as="p" className="mb-6 text-[13px] font-medium uppercase tracking-[0.15em] text-mint-dark">
               Bengaluru&apos;s Premier Glass Film Studio
             </SplitReveal>
          </motion.div>

          <motion.div style={{ y: h1Y }} className="relative flex flex-col items-center lg:items-start w-full">
            <h1 className="headline text-[36px] sm:text-[42px] md:text-[64px] font-normal leading-[1.1] tracking-tight text-deep">
              <RevealText
                as="span"
                delay={0.2}
                className="inline"
              >
                Transform Any Glass into Pure{" "}
              </RevealText>
              
              <span className="h-[1.2em] w-[260px] sm:w-[320px] md:w-[460px] overflow-hidden relative inline-flex items-end align-bottom -mb-[0.1em] text-left pl-1">
                <AnimatePresence>
                  <motion.span
                    key={cycleIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1, transition: { duration: 0.4, delay: 0.1, ease: [0.76, 0, 0.24, 1] } }}
                    exit={{ y: "-100%", opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
                    className="absolute left-0 bottom-0 bg-gradient-to-br from-mint to-lavender bg-clip-text text-transparent whitespace-nowrap"
                  >
                    {phrases[cycleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </motion.div>

          <motion.p
            style={{ y: subY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[500px] text-lg leading-[1.7] text-muted lg:mx-0 mx-auto"
          >
            Since 2018, FrostedFilms has been Bengaluru&apos;s trusted name for
            Frosted Films, Sun Control Films, Decorative Glass Films, Heat
            Control Films and more — crafted for homes, offices, and apartments.
          </motion.p>

          <motion.div
            style={{ y: ctaY }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <motion.div {...buttonHover}>
              <Link
                href="#services"
                className="btn-primary"
              >
                Explore Our Services
              </Link>
            </motion.div>

            <motion.div {...buttonHover}>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-lavender bg-transparent px-8 py-3.5 text-base font-semibold text-deep transition-colors duration-300 hover:bg-lavender-light/40"
              >
                Get Free Quote
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 text-[13px] text-muted lg:mx-0 mx-auto"
          >
            ★★★★★&nbsp; Trusted since 2018 &nbsp;·&nbsp; HBR Layout, Bengaluru
            &nbsp;·&nbsp; 100+ Happy Clients
          </motion.p>
        </div>

        <div className="flex justify-center lg:justify-end items-center pointer-events-none hidden md:flex">
           <AnimatedShield cycleIndex={cycleIndex} parallaxY={shieldY} />
        </div>
      </div>

      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollIndicator ? 1 : 0, y: showScrollIndicator ? [0, 6, 0] : 0 }}
        transition={{
          opacity: { duration: 0.3 },
          y: {
            duration: 1.8,
            repeat: showScrollIndicator ? Infinity : 0,
            ease: "easeInOut",
          },
        }}
        className={cn(
          "absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted transition-colors hover:text-deep",
          !showScrollIndicator && "pointer-events-none"
        )}
      >
        <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
      </motion.a>

      {/* Floating Transition Shield */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none opacity-[0.06]">
        <svg
          viewBox="0 0 32 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="w-[200px] h-[225px] animate-[spin_60s_linear_infinite]"
        >
          <path d="M16 1.5L29 6.5V17.5C29 26.5 23 32.5 16 34.5C9 32.5 3 26.5 3 17.5V6.5L16 1.5Z" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      {/* Gradient Fade Pulling to Services */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[120px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #F4F0FA)' }}
      />
    </section>
  );
}
