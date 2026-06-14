import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import LenisProvider from "@/components/providers/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const siteTitle =
  "FrostedFilms | Frosted, Sun Control & Decorative Glass Films in Bengaluru";

const siteDescription =
  "Premium glass films for offices, homes & apartments in Bengaluru. Frosted Film ₹100/sqft, Sun Control Film ₹105/sqft, Decorative Film ₹125/sqft. Professional installation in HBR Layout & nearby areas.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "frosted film bangalore",
    "sun control film bangalore",
    "glass film hbr layout",
    "privacy film bengaluru",
    "decorative glass film",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://frostedfilm.in",
    siteName: "FrostedFilms",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <LenisProvider>
          {children}
          <ScrollToTop />
          <CustomCursor />
        </LenisProvider>
      </body>
    </html>
  );
}
