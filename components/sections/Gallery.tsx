"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { GradientHeadline, SplitReveal } from "@/components/ui/AnimatedText";

type GalleryCategory = "Frosted" | "Sun Control" | "Decorative" | "Office";

const filters = ["All", "Frosted", "Sun Control", "Decorative", "Office"] as const;

const galleryItems: {
  label: string;
  category: GalleryCategory;
  height: number;
  variant: "mint" | "lavender" | "frost";
}[] = [
  { label: "Office Cabin Film", category: "Office", height: 500, variant: "mint" },
  { label: "Sun Control Install", category: "Sun Control", height: 420, variant: "lavender" },
  { label: "Decorative Film", category: "Decorative", height: 500, variant: "frost" },
  { label: "Frosted Bathroom Glass", category: "Frosted", height: 460, variant: "mint" },
  { label: "One Way Vision Window", category: "Sun Control", height: 500, variant: "lavender" },
  { label: "Corporate Partition Film", category: "Office", height: 440, variant: "frost" },
  { label: "Living Room Decorative", category: "Decorative", height: 500, variant: "mint" },
  { label: "Frosted Office Partitions", category: "Frosted", height: 420, variant: "lavender" },
  { label: "Blackout Film Install", category: "Frosted", height: 500, variant: "frost" },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [currentIndex, setCurrentIndex] = useState(1);

  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const scrollEnd = useMemo(() => {
    const total = filteredItems.length;
    if (total <= 2) return "0%";
    return `-${(total / galleryItems.length) * 66}%`;
  }, [filteredItems.length]);

  const x = useTransform(scrollYProgress, [0, 1], ["0%", scrollEnd]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = filteredItems.length;
    if (total === 0) return;
    const idx = Math.min(Math.floor(latest * total), total - 1);
    setCurrentIndex(idx + 1);
  });

  return (
    <section id="gallery" className="bg-frost-gradient relative">
      {/* DESKTOP LAYOUT (Horizontal Scroll) */}
      <div ref={targetRef} className="hidden md:block relative h-[300vh]">
        <div className="sticky top-0 h-[100vh] overflow-hidden flex">
          {/* LEFT COLUMN: Static Header */}
          <div className="w-[35%] h-full flex flex-col justify-center pl-[5vw] pr-12 z-10 border-r border-lavender/20 bg-frost-white/60 backdrop-blur-xl">
            <header className="mb-10">
              <SplitReveal as="p" className="mb-4 text-[13px] font-medium uppercase tracking-[0.15em] text-mint-dark">
                Our Work
              </SplitReveal>
              <GradientHeadline className="headline text-4xl font-normal tracking-tight text-deep md:text-[48px] md:leading-tight">
                See the Transformation
              </GradientHeadline>
              <p className="mt-6 text-base text-muted leading-relaxed">
                Explore our recent installations across Bengaluru. Scroll down to pan through the gallery.
              </p>
            </header>

            <div className="flex flex-wrap items-center gap-2 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    activeFilter === filter
                      ? "bg-mint text-white shadow-sm"
                      : "border border-lavender/40 bg-transparent text-muted hover:border-mint hover:text-deep"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* PROGRESS INDICATOR */}
            <div className="absolute bottom-12 left-[5vw] right-12">
              <div className="flex justify-between items-end mb-4 text-sm font-semibold text-deep">
                <span>{String(currentIndex).padStart(2, "0")}</span>
                <span className="text-muted">{String(filteredItems.length).padStart(2, "0")}</span>
              </div>
              <div className="w-full h-0.5 bg-lavender/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-mint to-lavender origin-left"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Horizontal Track */}
          <div ref={containerRef} className="w-[65%] h-full relative overflow-hidden flex items-center">
            <motion.div
              style={{ x }}
              drag="x"
              dragConstraints={containerRef}
              className="flex gap-6 px-12 w-max cursor-grab active:cursor-grabbing items-center"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={`${item.label}-${index}`}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={cn(
                    "glass-card relative overflow-hidden rounded-2xl shrink-0 flex items-end p-6 group",
                    "border border-white/40 shadow-[0_8px_32px_rgba(44,44,62,0.08)]"
                  )}
                  style={{ width: 380, height: item.height }}
                >
                  {/* Placeholder Gradient Background */}
                  <div
                    className={cn(
                      "absolute inset-0 -z-10",
                      item.variant === "mint"
                        ? "bg-mint-light/40"
                        : item.variant === "lavender"
                        ? "bg-lavender-light/40"
                        : "bg-frost-white/60"
                    )}
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-deep/0 transition-all duration-300 group-hover:bg-deep/45 flex flex-col justify-end p-6">
                    <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 w-full">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white mb-3">
                        {item.category}
                      </span>
                      <p className="text-xl font-semibold text-white">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT (Vertical) */}
      <div className="md:hidden py-24 px-6 section-pad">
        <header className="mb-10 text-center">
          <SplitReveal as="p" className="mb-4 text-[13px] font-medium uppercase tracking-[0.15em] text-mint-dark">
            Our Work
          </SplitReveal>
          <GradientHeadline className="headline text-[36px] font-normal tracking-tight text-deep leading-tight">
            See the Transformation
          </GradientHeadline>
        </header>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 min-h-[44px]",
                activeFilter === filter
                  ? "bg-mint text-white shadow-sm"
                  : "border border-lavender/40 bg-transparent text-muted hover:border-mint hover:text-deep"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.label}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card relative overflow-hidden rounded-2xl w-full flex flex-col justify-end p-6 border border-white/40"
              style={{ height: 380 }}
            >
              <div
                className={cn(
                  "absolute inset-0 -z-10",
                  item.variant === "mint"
                    ? "bg-mint-light/40"
                    : item.variant === "lavender"
                    ? "bg-lavender-light/40"
                    : "bg-frost-white/60"
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-deep/20 to-transparent p-6 flex flex-col justify-end">
                <span className="w-fit px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white mb-2">
                  {item.category}
                </span>
                <p className="text-xl font-semibold text-white">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
