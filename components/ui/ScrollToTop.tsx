"use client";

import { useScroll, motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.4) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollYProgress]);

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleScrollToTop}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full glass-card text-mint-dark shadow-[0_4px_24px_rgba(168,213,194,0.3)] transition-colors hover:text-mint hover:shadow-[0_4px_32px_rgba(168,213,194,0.5)]"
          aria-label="Scroll to top"
        >
          <motion.div
            variants={{
              hover: { rotate: 15, y: -2 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
