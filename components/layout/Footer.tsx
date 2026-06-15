import Link from "next/link";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const serviceLinks = [
  { label: "Frosted Film", href: "#services" },
  { label: "Sun Control Film", href: "#services" },
  { label: "Decorative Film", href: "#services" },
  { label: "Office Cabin Film", href: "#services" },
  { label: "One Way Vision Film", href: "#services" },
  { label: "Black Out Film", href: "#services" },
] as const;

const companyLinks = [
  { label: "About", href: "#why-us" },
  { label: "Gallery", href: "#gallery" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact Us", href: "#contact" },
] as const;

function ShieldLogoWhite({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        <clipPath id="footer-shield-clip">
          <path d="M16 1.5L29 6.5V17.5C29 26.5 23 32.5 16 34.5C9 32.5 3 26.5 3 17.5V6.5L16 1.5Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#footer-shield-clip)">
        <rect width="32" height="36" fill="#A8D5C2" />
        <path d="M0 0L32 36H0V0Z" fill="#C4B8E0" />
      </g>
      <path
        d="M16 1.5L29 6.5V17.5C29 26.5 23 32.5 16 34.5C9 32.5 3 26.5 3 17.5V6.5L16 1.5Z"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="0.75"
      />
    </svg>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-mint">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="relative text-white z-10 pt-8 bg-[#1E1E2E]">
      <div className="container-xl pb-14 md:pb-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <ShieldLogoWhite className="h-9 w-8 shrink-0" />
              <span className="flex items-baseline leading-none text-white">
                <span className="font-serif text-xl italic tracking-tight">
                  Frosted
                </span>
                <span className="font-sans text-xl font-normal">films</span>
              </span>
            </Link>
            <p className="max-w-[200px] text-sm leading-relaxed text-lavender-light/70">
              One Stop Solutions for All Your Glass Film Requirements
            </p>
          </div>

          <FooterColumn title="Services">
            <ul className="space-y-1">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-lavender-light/70 transition-colors hover:text-mint-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Company">
            <ul className="space-y-1">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-lavender-light/70 transition-colors hover:text-mint-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Get in Touch">
            <ul className="space-y-3 text-sm text-lavender-light/80">
              <li className="flex min-h-[44px] items-center gap-2.5">
                <span aria-hidden>📞</span>
                <a
                  href="tel:8088320993"
                  className="transition-colors hover:text-mint-light"
                >
                  8088320993
                </a>
              </li>
              <li className="flex min-h-[44px] items-center gap-2.5">
                <span aria-hidden>📍</span>
                <span>HBR Layout, Bengaluru</span>
              </li>
              <li className="flex min-h-[44px] items-center gap-2.5">
                <span aria-hidden>🕐</span>
                <span>9AM – 6PM</span>
              </li>
              <li>
                <a
                  href="https://instagram.com/Printing_Solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 text-lavender-light/80 transition-colors hover:text-mint-light"
                >
                  <InstagramIcon className="h-5 w-5" />
                  <span className="text-sm">Instagram</span>
                </a>
              </li>
            </ul>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-mint/30">
        <div className="container-xl py-6">
          <p className="text-center text-sm text-lavender-light/60">
            © 2024 FrostedFilms. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
