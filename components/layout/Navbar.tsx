"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const SCROLL_THRESHOLD = 80;

const navLinks = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

const menuContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
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
        <clipPath id="shield-clip">
          <path d="M16 1.5L29 6.5V17.5C29 26.5 23 32.5 16 34.5C9 32.5 3 26.5 3 17.5V6.5L16 1.5Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#shield-clip)">
        <rect width="32" height="36" fill="#A8D5C2" />
        <path d="M0 0L32 36H0V0Z" fill="#C4B8E0" />
      </g>
      <path
        d="M16 1.5L29 6.5V17.5C29 26.5 23 32.5 16 34.5C9 32.5 3 26.5 3 17.5V6.5L16 1.5Z"
        stroke="rgba(44, 44, 62, 0.12)"
        strokeWidth="0.75"
      />
    </svg>
  );
}

function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <div className="relative flex flex-col items-center">
      <a
        href={href}
        onClick={(e) => onClick(e, href)}
        className={cn(
          "text-sm transition-colors duration-300 relative pb-1",
          isActive ? "text-deep font-medium" : "text-muted hover:text-deep"
        )}
      >
        {label}
      </a>
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute -bottom-[2px] h-[2px] w-[20px] bg-mint rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </div>
  );
}

export default function Navbar() {
  const scrollY = useScrollPosition();
  const { scrollYProgress } = useScroll();
  const lenis = useLenis();

  const isScrolled = scrollY > SCROLL_THRESHOLD;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [wipePhase, setWipePhase] = useState<"hidden" | "entering" | "exiting">("hidden");

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const sectionIds = Array.from(new Set(navLinks.map((l) => l.id)));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        let currentActive = activeSection;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentActive = entry.target.id;
          }
        });
        if (currentActive !== activeSection) {
          setActiveSection(currentActive);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (wipePhase !== "hidden") return;

    closeMenu();
    setWipePhase("entering");

    setTimeout(() => {
      const target = document.querySelector(href) as HTMLElement;
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { immediate: true });
        } else {
          target.scrollIntoView({ behavior: "instant" });
        }
      }
      setWipePhase("exiting");

      setTimeout(() => {
        setWipePhase("hidden");
      }, 200);
    }, 200);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-mint to-lavender origin-left z-[110] pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none"
        initial={false}
        animate={
          wipePhase === "hidden"
            ? { x: "-100%", transition: { duration: 0 } }
            : wipePhase === "entering"
            ? { x: "0%", transition: { duration: 0.2, ease: "easeOut" } }
            : { x: "100%", transition: { duration: 0.2, ease: "easeIn" } }
        }
        style={{
          background: "linear-gradient(135deg, rgba(168,213,194,0.7), rgba(196,184,224,0.7))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      <header
        id="navbar"
        className={cn(
          "sticky top-0 z-50 h-[60px] md:h-[72px]",
          "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-in-out",
          isScrolled
            ? "border-b border-lavender/30 bg-white/55 shadow-[0_1px_24px_rgba(196,184,224,0.12)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-xl flex h-full items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-deep transition-opacity hover:opacity-80"
            onClick={closeMenu}
          >
            <ShieldLogo className="h-8 w-7 shrink-0 md:h-9 md:w-8" />
            <span className="flex items-baseline leading-none">
              <span className="font-serif text-lg italic tracking-tight md:text-xl">
                Frosted
              </span>
              <span className="font-sans text-lg font-normal md:text-xl">
                films
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 md:flex"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                isActive={activeSection === link.id}
                onClick={handleNavClick}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="btn-primary !px-5 !py-2.5 !text-sm"
            >
              Get a Quote
            </a>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
            className="relative z-[60] flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-deep transition-colors hover:bg-white/40 md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-frost-gradient pt-[60px] md:hidden"
          >
            <motion.nav
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-1 flex-col items-center justify-center gap-8 px-6"
            >
              {navLinks.map((link) => (
                <motion.div key={link.label} variants={menuItemVariants}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "font-sans text-2xl font-medium transition-colors hover:text-deep relative pb-1",
                      activeSection === link.id ? "text-deep" : "text-muted"
                    )}
                  >
                    {link.label}
                    {activeSection === link.id && (
                       <motion.div
                         layoutId="mobile-nav-indicator"
                         className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-[20px] bg-mint rounded-full"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                       />
                    )}
                  </a>
                </motion.div>
              ))}

              <motion.div variants={menuItemVariants} className="mt-4">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="btn-primary w-full"
                >
                  Get a Quote
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
