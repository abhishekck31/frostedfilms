import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { ServiceDetails } from "@/lib/services";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetails | null;
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && service && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-deep/40 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full md:w-[520px] h-full bg-deep overflow-y-auto shadow-2xl flex flex-col cursor-default"
          >
            {/* Ambient Orbs within Drawer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <AmbientOrbs count={3} />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Inner Content Frosted Panel */}
            <div className="relative z-10 flex-1 p-8 md:p-12">
              <div className="glass-card h-full rounded-3xl p-8 bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="mb-8">
                  <span className="inline-block px-3 py-1 bg-mint/20 text-mint-light rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
                    {service.name}
                  </span>
                  <h2 className="text-3xl font-semibold text-white mb-2">{service.name}</h2>
                  <p className="text-xl text-lavender-light/90 italic font-serif">&quot;{service.tagline}&quot;</p>
                </div>

                <div className="mb-8">
                  <div className="text-3xl text-mint font-light mb-1">
                    ₹{service.price} <span className="text-sm text-lavender-light/60 font-sans">{service.priceUnit}</span>
                  </div>
                  <hr className="border-white/10 mt-6" />
                </div>

                <p className="text-base text-lavender-light/80 leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-widest text-mint-light mb-4 font-semibold">Key Benefits</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-white/90 leading-relaxed">
                        <span className="text-mint shrink-0 mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-mint-light mb-4 font-semibold">Specifications</h3>
                  <div className="space-y-3">
                    {service.specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-white/60">{spec.label}</span>
                        <span className="text-white font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    onClose();
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-12 w-full rounded-full bg-gradient-to-r from-mint to-lavender px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(168,213,194,0.45)]"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
