"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { GradientHeadline, SplitReveal } from "@/components/ui/AnimatedText";
import { WaveDivider } from "@/components/ui/WaveDivider";

import Image from "next/image";

type GalleryCategory = "Frosted" | "Sun Control" | "Office" | "Digital Printing" | "Blackout" | "Decorative";

const filters = ["All", "Frosted", "Sun Control", "Office", "Digital Printing", "Blackout", "Decorative"] as const;

const galleryItems: {
  label: string;
  category: GalleryCategory;
  height: number;
  image: string;
}[] = [
  { label: "Office Cabin Lines", category: "Office", height: 500, image: "/Lines frosted for office/image.png" },
  { label: "Office Cabin Lines 2", category: "Office", height: 420, image: "/Lines frosted for office/image copy.png" },
  { label: "Office Cabin Lines 3", category: "Office", height: 500, image: "/Lines frosted for office/image copy 2.png" },

  { label: "Sunfilm Reflective", category: "Sun Control", height: 460, image: "/Sunfilm reflective/image.png" },
  { label: "Sunfilm Reflective 2", category: "Sun Control", height: 500, image: "/Sunfilm reflective/image copy.png" },
  { label: "Sunfilm Reflective 3", category: "Sun Control", height: 440, image: "/Sunfilm reflective/image copy 2.png" },
  { label: "Sunfilm Reflective 4", category: "Sun Control", height: 500, image: "/Sunfilm reflective/image copy 3.png" },
  { label: "Sunfilm Reflective 5", category: "Sun Control", height: 420, image: "/Sunfilm reflective/image copy 4.png" },

  { label: "Frosted Film", category: "Frosted", height: 500, image: "/frostedfilm/image.png" },
  { label: "Frosted Film 2", category: "Frosted", height: 460, image: "/frostedfilm/image copy.png" },
  { label: "Frosted Film 3", category: "Frosted", height: 420, image: "/frostedfilm/image copy 2.png" },
  { label: "Frosted Film 4", category: "Frosted", height: 500, image: "/frostedfilm/image copy 3.png" },

  { label: "Digital Printing 1", category: "Digital Printing", height: 500, image: "/digitalprinting/WhatsApp Image 2026-06-30 at 3.19.47 PM.jpeg" },
  { label: "Digital Printing 2", category: "Digital Printing", height: 460, image: "/digitalprinting/WhatsApp Image 2026-06-30 at 3.19.48 PM.jpeg" },

  { label: "Decorative Film 1", category: "Decorative", height: 500, image: "/decorativefilm/WhatsApp Image 2026-06-30 at 3.23.28 PM.jpeg" },
  { label: "Decorative Film 2", category: "Decorative", height: 460, image: "/decorativefilm/WhatsApp Image 2026-06-30 at 3.23.37 PM.jpeg" },

  { label: "Blackout Film 1", category: "Blackout", height: 500, image: "/suncontrolfilm/WhatsApp Image 2026-06-30 at 3.25.20 PM.jpeg" },
  { label: "Blackout Film 2", category: "Blackout", height: 460, image: "/suncontrolfilm/WhatsApp Image 2026-06-30 at 3.25.39 PM.jpeg" },
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
    <section id="gallery" className="relative">
      {/* Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute left-[-100px] top-[20%] w-[500px] h-[500px] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #A8D5C2 0%, transparent 70%)' }}
        />
        <div 
          className="absolute right-[-150px] top-[50%] w-[600px] h-[600px] rounded-full opacity-25 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #C4B8E0 0%, transparent 70%)' }}
        />
      </div>

      {/* Watermark Header */}
      <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-12 z-20 items-start justify-center pointer-events-none">
        <div className="sticky top-[50vh] -rotate-90 whitespace-nowrap opacity-15">
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#2C2C3E' }}>
            Our Work
          </span>
        </div>
      </div>

      {/* DESKTOP LAYOUT (Horizontal Scroll) */}
      <div ref={targetRef} className="hidden md:block relative h-[300vh]">
        <div className="sticky top-0 h-[100vh] overflow-hidden flex">
          {/* LEFT COLUMN: Static Header */}
          <div className="w-[35%] h-full flex flex-col justify-center pl-[8vw] pr-12 z-10 border-r border-lavender/10 bg-transparent">
            <header className="mb-10">
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
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="absolute inset-0 -z-10 object-cover"
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
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="absolute inset-0 -z-10 object-cover"
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
      
      {/* Transition Out */}
      <WaveDivider fill="#EAF5F0" className="absolute bottom-0 w-full z-20 pointer-events-none" />
    </section>
  );
}
