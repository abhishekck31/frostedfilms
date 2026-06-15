"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { GradientHeadline, SplitReveal } from "@/components/ui/AnimatedText";
import { section } from "framer-motion/client";

const pricingPlans = [
  {
    name: "Frosted Film",
    price: 100,
    features: [
      "Diffused privacy without blocking all light",
      "Ideal for bathrooms, offices & partitions",
      "Easy to maintain and long-lasting finish",
    ],
    popular: false,
  },
  {
    name: "Office Cabin Lines Frosted Film",
    price: 115,
    features: [
      "Professional striped frosted patterns",
      "Perfect for meeting rooms & cabins",
      "Enhances corporate aesthetics",
    ],
    popular: false,
  },
  {
    name: "Sun Control Film (Window Glasses)",
    price: 105,
    features: [
      "Blocks up to 99% harmful UV rays",
      "Reduces heat & glare significantly",
      "Maintains clear outward visibility",
    ],
    popular: false,
  },
  {
    name: "One Way Vision + Heat Control Film",
    price: 130,
    features: [
      "See out clearly, stay hidden from outside",
      "Superior heat rejection for windows",
      "Daytime privacy without curtains",
    ],
    popular: true,
  },
  {
    name: "Decorative Glass Film",
    price: 125,
    features: [
      "Artistic patterns & premium textures",
      "Transforms plain glass instantly",
      "Non-permanent, removable application",
    ],
    popular: false,
  },
  {
    name: "Black Out Film (Windows, Black Colour)",
    price: 110,
    features: [
      "Complete light blockage for total darkness",
      "Maximum privacy for bedrooms & media rooms",
      "Reduces heat transfer through glass",
    ],
    popular: false,
  },
] as const;



const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function Pricing() {
  const [selectedFilm, setSelectedFilm] = useState(0);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [directSqft, setDirectSqft] = useState("");
  const [quantity, setQuantity] = useState("1");

  const film = pricingPlans[selectedFilm];
  const widthNum = parseFloat(width) || 0;
  const heightNum = parseFloat(height) || 0;
  const quantityNum = Math.max(1, parseInt(quantity, 10) || 1);

  const areaSqft = useMemo(() => {
    if (widthNum > 0 && heightNum > 0) return widthNum * heightNum;
    return parseFloat(directSqft) || 0;
  }, [widthNum, heightNum, directSqft]);

  const estimatedTotal = areaSqft * film.price * quantityNum;

  const handleWidthHeightChange = (w: string, h: string) => {
    setWidth(w);
    setHeight(h);
    const wn = parseFloat(w) || 0;
    const hn = parseFloat(h) || 0;
    if (wn > 0 && hn > 0) {
      setDirectSqft(String(wn * hn));
    }
  };

  return (
    <section id="pricing" className="flow-section relative">
      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Left Aligned Inline Header */}
          <header className="lg:col-span-1 lg:sticky lg:top-32 h-fit mb-8 lg:mb-0">
            <SplitReveal as="h2" className="eyebrow mb-4">
              Transparent Pricing
            </SplitReveal>
            <GradientHeadline className="headline text-4xl font-normal tracking-tight text-deep md:text-[44px] md:leading-[1.1]">
              No Surprises. Just Quality.
            </GradientHeadline>
          </header>

          {/* Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={gridVariants}
            className="lg:col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
          >
            {pricingPlans.map((plan) => (
              <motion.article
                key={plan.name}
                variants={cardVariants}
                className={cn(
                  "glass-card relative flex flex-col p-6",
                  plan.popular && "ring-1 ring-lavender/40"
                )}
                style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(16px)' }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}

                <h3 className="mb-4 text-base font-semibold text-deep">
                  {plan.name}
                </h3>

                <p className="headline mb-4 text-deep">
                  <sup className="mr-0.5 align-super text-2xl font-normal">
                    ₹
                  </sup>
                  <span className="text-[42px] leading-none">{plan.price}</span>
                  <sub className="ml-1 align-sub font-sans text-base font-normal text-muted">
                    /sqft
                  </sub>
                </p>

                <hr className="mb-5 border-t border-mint/50" />

                <ul className="mb-2 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container-xl relative z-10 my-[120px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[700px] rounded-[24px] bg-[#2C2C3E] shadow-[0_32px_80px_rgba(44,44,62,0.15)] overflow-hidden"
        >
          <div className="p-8 pb-4 text-center">
            <GradientHeadline className="headline mb-3 text-[32px] font-normal tracking-tight text-white md:text-[40px] md:leading-tight">
              Calculate Your Quote
            </GradientHeadline>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[15px] text-lavender-light/70"
            >
              Get an instant estimate for your space
            </motion.p>
          </div>

          <div className="space-y-6 p-8 pt-6">
            <div>
              <label
                htmlFor="film-type"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                Step 1 — Select Film Type
              </label>
              <select
                id="film-type"
                value={selectedFilm}
                onChange={(e) => setSelectedFilm(Number(e.target.value))}
                className="touch-target w-full min-h-[44px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-mint focus:ring-2 focus:ring-mint/20"
              >
                {pricingPlans.map((plan, index) => (
                  <option key={plan.name} value={index}>
                    {plan.name} — ₹{plan.price}/sqft
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-white/90">
                Step 2 — Enter Area
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="width" className="mb-1.5 block text-xs text-white/50">
                    Width (ft)
                  </label>
                  <input
                    id="width"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g. 4"
                    value={width}
                    onChange={(e) =>
                      handleWidthHeightChange(e.target.value, height)
                    }
                    className="touch-target w-full min-h-[44px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-mint focus:ring-2 focus:ring-mint/20"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="mb-1.5 block text-xs text-white/50">
                    Height (ft)
                  </label>
                  <input
                    id="height"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g. 5"
                    value={height}
                    onChange={(e) =>
                      handleWidthHeightChange(width, e.target.value)
                    }
                    className="touch-target w-full min-h-[44px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-mint focus:ring-2 focus:ring-mint/20"
                  />
                </div>
              </div>
              <div className="relative my-4 flex items-center">
                <div className="flex-1 border-t border-white/10" />
                <span className="px-3 text-xs text-white/40">or enter sqft directly</span>
                <div className="flex-1 border-t border-white/10" />
              </div>
              <div>
                <label htmlFor="sqft" className="mb-1.5 block text-xs text-white/50">
                  Total Area (sqft)
                </label>
                <input
                  id="sqft"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 20"
                  value={directSqft}
                  onChange={(e) => {
                    setDirectSqft(e.target.value);
                    setWidth("");
                    setHeight("");
                  }}
                  className="touch-target w-full min-h-[44px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-mint focus:ring-2 focus:ring-mint/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                Step 3 — Quantity (windows / panels)
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="touch-target w-full min-h-[44px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-mint focus:ring-2 focus:ring-mint/20"
              />
            </div>

            <div className="rounded-2xl bg-white/5 px-5 py-6 text-center border border-white/5">
              <p className="mb-2 text-sm font-medium text-white/60">
                Estimated Total
              </p>
              <p className="headline bg-gradient-to-r from-mint to-lavender bg-clip-text text-[40px] font-normal leading-none text-transparent md:text-[48px]">
                ₹{formatCurrency(estimatedTotal)}
              </p>
              <p className="mt-3 text-sm text-white/50">
                {areaSqft > 0 ? areaSqft.toLocaleString("en-IN") : "0"} sqft ×
                ₹{film.price}/sqft × {quantityNum}{" "}
                {quantityNum === 1 ? "panel" : "panels"}
              </p>
            </div>

            <p className="text-center text-xs leading-relaxed text-white/40">
              *Final quote may vary based on site visit and installation
              complexity
            </p>

            <button
              type="button"
              onClick={scrollToContact}
              className="w-full rounded-full bg-gradient-to-r from-mint to-lavender px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(168,213,194,0.45)]"
            >
              Get Exact Quote
            </button>
          </div>
        </motion.div>
      </div>
    </div>
    </section >
  );
}
