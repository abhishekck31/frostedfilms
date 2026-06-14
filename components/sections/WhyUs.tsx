"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import { GradientHeadline, SplitReveal, CountUp } from "@/components/ui/AnimatedText";

const benefits = [
  {
    icon: "🛡",
    title: "Quality Guaranteed",
    description: "Only premium-grade films from certified suppliers",
  },
  {
    icon: "📍",
    title: "Bengaluru-Based",
    description: "On-site installation across HBR Layout and nearby areas",
  },
  {
    icon: "🔧",
    title: "Expert Installation",
    description: "Trained professionals, bubble-free finish every time",
  },
  {
    icon: "💬",
    title: "Transparent Pricing",
    description: "No hidden charges. What you see is what you pay.",
  },
] as const;

const stats = [
  { value: 2018, suffix: "", label: "Established", numeric: true },
  { value: 6, suffix: "+", label: "Film Types", numeric: true },
  { value: 100, suffix: "+", label: "Projects Completed", numeric: true },
  { value: 0, suffix: "", label: "Available Daily", display: "9AM–6PM", numeric: false },
] as const;

const benefitContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const benefitItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};


function ShieldLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        <clipPath id="why-us-shield-clip">
          <path d="M16 1.5L29 6.5V17.5C29 26.5 23 32.5 16 34.5C9 32.5 3 26.5 3 17.5V6.5L16 1.5Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#why-us-shield-clip)">
        <rect width="32" height="36" fill="#A8D5C2" />
        <path d="M0 0L32 36H0V0Z" fill="#C4B8E0" />
      </g>
      <path
        d="M16 1.5L29 6.5V17.5C29 26.5 23 32.5 16 34.5C9 32.5 3 26.5 3 17.5V6.5L16 1.5Z"
        stroke="rgba(44, 44, 62, 0.15)"
        strokeWidth="0.75"
      />
    </svg>
  );
}

function WindowMockup() {
  return (
    <svg
      viewBox="0 0 360 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="mx-auto w-full max-w-[340px]"
    >
      <defs>
        <linearGradient id="why-us-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D6EDE6" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#F8F9FC" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#EAE5F5" stopOpacity="0.85" />
        </linearGradient>
        <filter id="why-us-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern
          id="why-us-frost"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="12"
            stroke="#A8D5C2"
            strokeWidth="1"
            opacity="0.35"
          />
        </pattern>
      </defs>

      <rect
        x="24"
        y="20"
        width="312"
        height="380"
        rx="8"
        fill="#F8F9FC"
        stroke="#C4B8E0"
        strokeWidth="2"
      />
      <rect
        x="40"
        y="36"
        width="280"
        height="348"
        rx="4"
        fill="url(#why-us-glass)"
        stroke="rgba(196, 184, 224, 0.4)"
        strokeWidth="1"
      />
      <rect
        x="40"
        y="36"
        width="280"
        height="348"
        rx="4"
        fill="url(#why-us-frost)"
      />

      <line
        x1="180"
        y1="36"
        x2="180"
        y2="384"
        stroke="rgba(196, 184, 224, 0.35)"
        strokeWidth="2"
      />
      <line
        x1="40"
        y1="210"
        x2="320"
        y2="210"
        stroke="rgba(196, 184, 224, 0.35)"
        strokeWidth="2"
      />

      <circle cx="180" cy="210" r="72" fill="#A8D5C2" opacity="0.12" />
      <circle cx="180" cy="210" r="48" fill="#C4B8E0" opacity="0.15" />

      <g filter="url(#why-us-glow)" transform="translate(148, 178) scale(2.2)">
        <ShieldLogo />
      </g>
    </svg>
  );
}

function StatItem({
  stat,
  isLast,
}: {
  stat: (typeof stats)[number];
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="relative flex flex-1 flex-col items-center px-4 py-2 text-center">
      <p className="headline text-[40px] font-normal leading-none text-white md:text-[52px]">
        {stat.numeric ? (
          <CountUp to={stat.value as number} suffix={stat.suffix} />
        ) : (
          stat.display
        )}
      </p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-2 text-[13px] text-lavender-light/70"
      >
        {stat.label}
      </motion.p>

      {!isLast && (
        <div
          aria-hidden
          className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-lavender/30 md:block"
        />
      )}
    </div>
  );
}

export default function WhyUs() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-80px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-80px" });

  return (
    <section id="why-us">
      <div className="section-pad bg-frost-gradient relative overflow-hidden">
        <AmbientOrbs count={4} />
        <div className="container-xl relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              ref={leftRef}
              initial={{ opacity: 0, x: -48 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <SplitReveal as="p" className="mb-4 text-[13px] font-medium uppercase tracking-[0.15em] text-mint-dark">
                Why Choose Us
              </SplitReveal>
              <GradientHeadline className="headline mb-10 text-[32px] font-normal leading-tight tracking-tight text-deep md:text-[42px]">
                We Don't Just Install Films. We Deliver Confidence.
              </GradientHeadline>

              <motion.div
                initial="hidden"
                animate={leftInView ? "visible" : "hidden"}
                variants={benefitContainerVariants}
                className="space-y-6"
              >
                {benefits.map((benefit) => (
                  <motion.div
                    key={benefit.title}
                    variants={benefitItemVariants}
                    className="flex gap-4"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-light/60 text-lg"
                      aria-hidden
                    >
                      {benefit.icon}
                    </span>
                    <div>
                      <p className="mb-1 text-[15px] font-semibold text-deep">
                        {benefit.title}
                      </p>
                      <p className="text-[15px] leading-relaxed text-muted">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              ref={rightRef}
              initial={{ opacity: 0, x: 48 }}
              animate={rightInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center justify-center"
            >
              <WindowMockup />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-deep py-14 md:py-16">
        <div className="container-xl">
          <div className="grid grid-cols-2 gap-8 md:flex md:items-center md:justify-between md:gap-4">
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                stat={stat}
                isLast={index === stats.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
