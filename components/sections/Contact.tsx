"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GradientHeadline } from "@/components/ui/AnimatedText";

const serviceOptions = [
  "Frosted Film",
  "Office Cabin Lines Frosted Film",
  "Sun Control Film (Window Glasses)",
  "One Way Vision + Heat Control Film",
  "Decorative Glass Film",
  "Black Out Film (Windows, Black Colour)",
  "Not Sure",
] as const;

const contactInfo = [
  {
    icon: "📍",
    label: "Address",
    value:
      "432, 5th Cross Rd, HBR Layout 2nd Block, 1st Stage, HBR Layout, Bengaluru, Karnataka 560043",
  },
  {
    icon: "📞",
    label: "Mobile",
    value: "8088320993",
    href: "tel:8088320993",
  },
  {
    icon: "🕐",
    label: "Hours",
    value: "9 AM – 6 PM, Monday–Saturday",
  },
  {
    icon: "📱",
    label: "Instagram",
    value: "@frostedfilm.in",
    href: "https://www.instagram.com/frostedfilm.in",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "frostedfilms389@gmail.com",
    href: "mailto:frostedfilms389@gmail.com",
  },
  {
    icon: "🌐",
    label: "Website",
    value: "frostedfilm.in",
    href: "https://frostedfilm.in",
  },
] as const;

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  area: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  service: serviceOptions[0],
  area: "",
  message: "",
};

const inputClass =
  "w-full bg-white/5 border-b border-mint/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-mint focus:shadow-[0_4px_12px_rgba(168,213,194,0.1)] rounded-t-xl rounded-b-none";

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.phone.trim()) next.phone = "Phone is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email";
    }
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section id="contact" className="flow-section relative overflow-hidden bg-deep">
      {/* Dark Zone Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute left-[-100px] bottom-[-100px] w-[400px] h-[400px] rounded-full opacity-[0.08] blur-[80px]"
          style={{ background: 'radial-gradient(circle, #A8D5C2 0%, transparent 70%)' }}
        />
        <div 
          className="absolute right-[-150px] top-[-100px] w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #C4B8E0 0%, transparent 70%)' }}
        />
        <div 
          className="absolute right-[10%] top-[40%] w-[600px] h-[600px] rounded-full opacity-5 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #A8D5C2 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-xl relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <GradientHeadline className="headline mb-4 text-[36px] font-normal tracking-tight text-white md:text-[44px] md:leading-tight">
              Let&apos;s Talk Glass
            </GradientHeadline>
            <p className="mb-10 text-base text-lavender-light/70">
              Visit us or drop a message. We&apos;ll get back to you within a
              few hours.
            </p>

            <ul className="space-y-6">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint/15 text-lg"
                    aria-hidden
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.label}
                    </p>
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        target={item.label === "Website" || item.label === "Instagram" ? "_blank" : undefined}
                        rel={item.label === "Website" || item.label === "Instagram" ? "noopener noreferrer" : undefined}
                        className="mt-0.5 text-sm leading-relaxed text-lavender-light/80 transition-colors hover:text-mint-light"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm leading-relaxed text-lavender-light/80">
                        {item.value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="pt-2">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/90">
                    Name <span className="text-mint-dark">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={cn(
                      inputClass,
                      "text-white",
                      errors.name && "border-red-400/60"
                    )}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white/90">
                      Phone <span className="text-mint-dark">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={cn(
                        inputClass,
                        "text-white",
                        errors.phone && "border-red-400/60"
                      )}
                      placeholder="10-digit mobile"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/90">
                      Email <span className="text-mint-dark">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={cn(
                        inputClass,
                        "text-white",
                        errors.email && "border-red-400/60"
                      )}
                      placeholder="you@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-white/90">
                    Service needed
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => updateField("service", e.target.value)}
                    className={cn(
                      inputClass,
                      "text-white [&>option]:bg-deep [&>option]:text-white"
                    )}
                  >
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="area" className="mb-1.5 block text-sm font-medium text-white/90">
                    Approximate area in sqft{" "}
                    <span className="font-normal text-white/40">(optional)</span>
                  </label>
                  <input
                    id="area"
                    type="number"
                    min="0"
                    step="0.1"
                    value={form.area}
                    onChange={(e) => updateField("area", e.target.value)}
                    className={cn(
                      inputClass,
                      "text-white"
                    )}
                    placeholder="e.g. 24"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white/90">
                    Message <span className="text-mint-dark">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className={cn(
                      inputClass,
                      "resize-none text-white",
                      errors.message && "border-red-400/60"
                    )}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-full bg-gradient-to-r from-mint to-lavender px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(168,213,194,0.45)]"
                >
                  Send Enquiry →
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-mint/30 bg-white px-5 py-4 shadow-[0_16px_48px_rgba(44,44,62,0.18)]"
            role="status"
          >
            <p className="text-center text-sm font-medium text-deep">
              Thank you! We&apos;ll call you back within a few hours.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-2 w-full text-center text-xs text-muted transition-colors hover:text-deep"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
