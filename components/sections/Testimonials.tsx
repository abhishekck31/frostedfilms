"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientHeadline, SplitReveal } from "@/components/ui/AnimatedText";

const testimonials = [
  {
    quote:
      "The frosted film installation was flawless. Our office feels so much more private now. Highly professional team.",
    author: "Rajesh K.",
    role: "HBR Layout Office",
  },
  {
    quote:
      "Sun control film on all our windows — the difference in heat is remarkable. Worth every rupee.",
    author: "Priya S.",
    role: "Apartment Owner",
  },
  {
    quote:
      "Got decorative film for our living room glass partition. The team was punctual, clean, and skilled.",
    author: "Anand M.",
    role: "Homeowner",
  },
] as const;



const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 80 64"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute -left-1 -top-2 h-16 w-20 text-lavender/25"
    >
      <path
        d="M20 8C10 8 4 16 4 26C4 38 12 46 22 46C18 54 12 58 4 60C14 62 28 54 32 40C34 28 28 8 20 8Z"
        fill="currentColor"
      />
      <path
        d="M56 8C46 8 40 16 40 26C40 38 48 46 58 46C54 54 48 58 40 60C50 62 64 54 68 40C70 28 64 8 56 8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="flow-section relative">
      <div className="container-xl">
        <header className="mx-auto mb-16 max-w-2xl text-center">
          <SplitReveal as="h2" className="eyebrow mb-4">
            Client Stories
          </SplitReveal>
          <GradientHeadline className="headline text-4xl font-normal tracking-tight text-deep md:text-[48px] md:leading-tight">
            Trusted by Bengaluru&apos;s Best
          </GradientHeadline>
        </header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={gridVariants}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.author}
              variants={cardVariants}
            >
              <GlassCard>
                <QuoteMark />

                <p className="mb-3 text-mint" aria-label="5 out of 5 stars">
                  ★★★★★
                </p>

                <p className="relative z-10 mb-6 flex-1 text-[15px] leading-relaxed text-muted">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <footer>
                  <cite className="not-italic">
                    <p className="text-[13px] font-semibold text-deep">
                      {item.author}
                    </p>
                    <p className="text-[13px] text-muted">{item.role}</p>
                  </cite>
                </footer>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
