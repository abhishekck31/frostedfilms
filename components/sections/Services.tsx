"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientHeadline, SplitReveal } from "@/components/ui/AnimatedText";

const services = [
  {
    name: "Frosted Film",
    price: 100,
    description:
      "Classic privacy solution for offices, bathrooms, and glass partitions",
    Icon: FrostedFilmIcon,
  },
  {
    name: "Office Cabin Lines Frosted Film",
    price: 115,
    description:
      "Professional striped frosted patterns for corporate spaces",
    Icon: CabinLinesIcon,
  },
  {
    name: "Sun Control Film (Window Glasses)",
    price: 105,
    description:
      "Blocks UV rays and heat while maintaining clear views",
    Icon: SunControlIcon,
  },
  {
    name: "One Way Vision + Heat Control Film",
    price: 130,
    description:
      "See out, not in. Superior heat rejection for windows",
    Icon: OneWayVisionIcon,
  },
  {
    name: "Decorative Glass Film",
    price: 125,
    description:
      "Artistic patterns and textures that elevate any space",
    Icon: DecorativeFilmIcon,
  },
  {
    name: "Black Out Film (Windows, Black Colour)",
    price: 110,
    description:
      "Complete light blockage for total privacy and darkness",
    Icon: BlackoutFilmIcon,
  },
] as const;



const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function IconWrapper({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: [0, -6, 0] }}
      viewport={{ once: false }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2,
      }}
      className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-light/50"
    >
      {children}
    </motion.div>
  );
}

function FrostedFilmIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-10 w-10">
      <rect
        x="10"
        y="8"
        width="28"
        height="32"
        rx="2"
        stroke="#A8D5C2"
        strokeWidth="1.75"
      />
      <line x1="14" y1="36" x2="34" y2="12" stroke="#A8D5C2" strokeWidth="1.5" />
      <line x1="18" y1="36" x2="38" y2="16" stroke="#A8D5C2" strokeWidth="1.5" />
      <line x1="10" y1="28" x2="30" y2="8" stroke="#A8D5C2" strokeWidth="1.5" />
      <line x1="14" y1="32" x2="34" y2="12" stroke="#A8D5C2" strokeWidth="1.5" />
    </svg>
  );
}

function CabinLinesIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-10 w-10">
      <rect
        x="10"
        y="8"
        width="28"
        height="32"
        rx="2"
        stroke="#A8D5C2"
        strokeWidth="1.75"
      />
      <line x1="18" y1="8" x2="18" y2="40" stroke="#A8D5C2" strokeWidth="1.5" />
      <line x1="24" y1="8" x2="24" y2="40" stroke="#A8D5C2" strokeWidth="1.5" />
      <line x1="30" y1="8" x2="30" y2="40" stroke="#A8D5C2" strokeWidth="1.5" />
    </svg>
  );
}

function SunControlIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-10 w-10">
      <circle cx="36" cy="12" r="5" stroke="#A8D5C2" strokeWidth="1.75" />
      <line x1="36" y1="4" x2="36" y2="6" stroke="#A8D5C2" strokeWidth="1.5" />
      <line x1="36" y1="18" x2="36" y2="20" stroke="#A8D5C2" strokeWidth="1.5" />
      <line x1="28" y1="12" x2="30" y2="12" stroke="#A8D5C2" strokeWidth="1.5" />
      <line x1="42" y1="12" x2="44" y2="12" stroke="#A8D5C2" strokeWidth="1.5" />
      <line x1="30.2" y1="6.2" x2="31.6" y2="7.6" stroke="#A8D5C2" strokeWidth="1.5" />
      <line x1="40.4" y1="16.4" x2="41.8" y2="17.8" stroke="#A8D5C2" strokeWidth="1.5" />
      <rect
        x="8"
        y="16"
        width="26"
        height="24"
        rx="2"
        stroke="#A8D5C2"
        strokeWidth="1.75"
      />
      <line x1="8" y1="28" x2="34" y2="28" stroke="#A8D5C2" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function OneWayVisionIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-10 w-10">
      <ellipse
        cx="22"
        cy="24"
        rx="10"
        ry="6"
        stroke="#A8D5C2"
        strokeWidth="1.75"
      />
      <circle cx="22" cy="24" r="2.5" fill="#A8D5C2" />
      <line x1="12" y1="32" x2="32" y2="16" stroke="#A8D5C2" strokeWidth="1.75" />
      <circle cx="38" cy="10" r="4" stroke="#A8D5C2" strokeWidth="1.5" />
      <line x1="38" y1="4" x2="38" y2="5.5" stroke="#A8D5C2" strokeWidth="1.25" />
      <line x1="38" y1="14.5" x2="38" y2="16" stroke="#A8D5C2" strokeWidth="1.25" />
      <line x1="32" y1="10" x2="33.5" y2="10" stroke="#A8D5C2" strokeWidth="1.25" />
      <line x1="42.5" y1="10" x2="44" y2="10" stroke="#A8D5C2" strokeWidth="1.25" />
    </svg>
  );
}

function DecorativeFilmIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-10 w-10">
      <rect
        x="10"
        y="8"
        width="28"
        height="32"
        rx="2"
        stroke="#A8D5C2"
        strokeWidth="1.75"
      />
      <circle cx="24" cy="24" r="6" stroke="#A8D5C2" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2" fill="#A8D5C2" />
      <path
        d="M24 18 C26 20, 28 22, 24 24 C20 22, 22 20, 24 18Z"
        stroke="#A8D5C2"
        strokeWidth="1.25"
      />
      <path
        d="M24 24 C26 26, 28 28, 24 30 C20 28, 22 26, 24 24Z"
        stroke="#A8D5C2"
        strokeWidth="1.25"
      />
      <path
        d="M18 24 C20 22, 22 20, 24 24 C22 28, 20 26, 18 24Z"
        stroke="#A8D5C2"
        strokeWidth="1.25"
      />
      <path
        d="M30 24 C28 22, 26 20, 24 24 C26 28, 28 26, 30 24Z"
        stroke="#A8D5C2"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function BlackoutFilmIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-10 w-10">
      <rect
        x="10"
        y="8"
        width="28"
        height="32"
        rx="2"
        stroke="#A8D5C2"
        strokeWidth="1.75"
      />
      <rect x="13" y="11" width="22" height="26" rx="1" fill="#2C2C3E" />
    </svg>
  );
}

export default function Services() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "start start"],
  });
  const eyebrowColor = useTransform(scrollYProgress, [0, 1], ["#6BB8A0", "#9B8CC8"]);

  return (
    <section id="services" ref={targetRef} className="flow-section relative">
      <div className="container-xl">
        <header className="mx-auto mb-16 max-w-2xl text-center">
          <motion.div style={{ color: eyebrowColor }}>
            <SplitReveal as="h2" className="eyebrow mb-4">
              What We Do
            </SplitReveal>
          </motion.div>
          <GradientHeadline className="headline text-4xl font-normal tracking-tight text-deep md:text-[48px] md:leading-tight">
            Six Ways to Transform Your Glass
          </GradientHeadline>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-text mx-auto max-w-[500px]"
          >
            Every film is professionally installed at your location across
            Bengaluru
          </motion.p>
        </header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={gridVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.article
              key={service.name}
              variants={cardVariants}
            >
              <GlassCard>
                <IconWrapper index={index}>
                  <service.Icon />
                </IconWrapper>

                <h3 className="mb-3 text-xl font-medium leading-snug text-deep">
                  {service.name}
                </h3>

                <span className="mb-4 inline-flex w-fit rounded-full bg-mint-light px-3 py-1 text-sm font-medium text-mint-dark">
                  ₹{service.price}/sqft
                </span>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                <Link
                  href="#contact"
                  className="text-sm font-medium text-lavender transition-colors hover:text-lavender-dark"
                >
                  Learn More →
                </Link>
              </GlassCard>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
